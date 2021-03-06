import _ from 'lodash'
import config from './constants/vnConfig'
import { isInArr } from './util/array'
import { Int } from './util/primitive'
import { prettyLog } from './util/print'
import { deadScenes } from './DeadScenes'
import { userScene, userScenes } from './UserScenes'

/**
 * find all scenes that link with input scene
 *
 * @param target {number}
 * @param scenes [object=config.scenes]
 * @returns {Array}
 */
export const findInScenes = (target, scenes = config.scenes) => {
  let result = []
  for (let [scene, choices] of Object.entries(scenes)) {
    if (isInArr(target, choices)) {
      result.push(scene)
    }
  }

  return result
}

window.findInScenes = findInScenes

export const indentIn = (name) => {
  //console.group(name)
}

export const indentOut = () => {
  // console.log('<< out')
  //console.groupEnd()
}

export const pathChecker = (specificScene, scenesData = config) => {
  const { start, ends, scenes, sceneOrder } = scenesData

  // run check deadScenes first
  // if found, then return user mapped ids that are dead
  const deadSceneIds = deadScenes(scenesData)
  if ( deadSceneIds.length > 0 ) {
    return userScenes(deadSceneIds, sceneOrder)
  }

  let possiblePath = {} // that will be printed out at the end
  let breadcrumb = [] // cache which scenes we have checked, so we won't have to check again
  let safeScenes = [] // cache some scenes that we're so sure that this will definitely lead to an end scene
  let errorFound = false

  const isStartScene = (sceneId) => sceneId === start

  const traceBack = (sceneId) => {
    sceneId = Int(sceneId, 10)
    if (errorFound) return []

    // make sure it's integer
    breadcrumb.push(sceneId)
    if (isStartScene(sceneId)) {
      return [sceneId]
    }

    const prevScenes = findInScenes(sceneId, scenes)
    let buffer = []

    console.log('>> tracing: ', sceneId, prevScenes)
    // if more than 1 way can come to this scene
    if (prevScenes.length > 1) {
      let route
      let breakLoop = false
      for (let prevSceneId of prevScenes) {
        if (breakLoop) break

        prevSceneId = Int(prevSceneId) // make sure it's integer

        // if this scene has been checked, just skip
        // return the start and this scene because we know for sure it will lead to it
        if (isInArr(prevSceneId, breadcrumb)) {
          return [start, prevSceneId]
        }

        route = traceBack(prevSceneId)
        const lastStoppedScene = _.first(route)
        if (!isStartScene(lastStoppedScene) && !isInArr(prevSceneId, safeScenes)) {
          let isStoppedSceneInt = _.isNumber(lastStoppedScene)
          console.log('isInt', isStoppedSceneInt)
          !isStoppedSceneInt && console.log('door: ', lastStoppedScene)
          console.error(`DEAD By: ${prevSceneId}(${userScene(prevSceneId, sceneOrder)}) from: ${sceneId}(${userScene(sceneId, sceneOrder)})`)
          console.warn('DEAD', route)
          breakLoop = true
          return route
        } else {
          safeScenes.push(prevSceneId)
        }
      }

      return route

      // this is kinda end
    } else if (prevScenes.length < 1) {
      return [`not found from ${sceneId}`]

      // only 1 way to here
    } else {
      const prevSceneId = Int(prevScenes[0])

      if (isStartScene(prevSceneId)) {
        buffer.push(prevSceneId)
        buffer.push(sceneId)
        console.log('LAST: ', prevSceneId)
        indentOut()
        return buffer
      } else {
        if (isInArr(prevSceneId, breadcrumb)) {
          return [start, prevSceneId]
        } else {
          indentIn()
          buffer = [...buffer, ...traceBack(prevSceneId)]
        }
      }
    }
    indentOut()
    buffer.push(sceneId)
    return buffer
  }

  // prettyLog(traceBack(100))
  if ( !specificScene ) {
    ends.map((endSceneId) => {
      return possiblePath[endSceneId] = traceBack(endSceneId)
    })
  } else {
    possiblePath[specificScene] = traceBack(specificScene)
  }

  prettyLog(possiblePath)
  return possiblePath
}

export default pathChecker