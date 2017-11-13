import _ from 'lodash'
import { isInArr } from './util/array'
import { Int } from './util/primitive'

// lodash version
/**
 * find sceneId that are not linked with others
 *
 * @param config {object} that has {scenes, ends, start}
 * @return deadScenes {Array}
 */
export const deadScenes = ({ scenes, ends, start }) => {
  // make item in array Integer so it can be compared with others later
  const sceneIds = Object.keys(scenes).map(_.parseInt)
  // merge all connected scenes into one big array
  const scenePool = _.flattenDeep(Object.values(scenes))

  // return scenesIds that are not in scene pool, ends, start
  return _.without(sceneIds, ...scenePool, ...ends, start)
}

// manual version
export const deadScenesManual = ({ scenes, ends, start }) => {
  const flattenScenes = Object.values(scenes).reduce((all, item) => [...all, ...item])
  const scenePool = [...flattenScenes, ...Object.keys(scenes)]
  const occurrence = scenePool.reduce((occur, scene) => {
    occur[scene] = occur.hasOwnProperty(scene) ? (occur[scene] + 1) : 1
    return occur
  }, {})

  const deadScene = []
  const notStoryScenes = [...ends, start]
  for (let [scene, freq] of Object.entries(occurrence)) {
    scene = Int(scene)
    if (freq <= 1 && !isInArr(scene, notStoryScenes) ) deadScene.push(scene)
  }

  return deadScene
}