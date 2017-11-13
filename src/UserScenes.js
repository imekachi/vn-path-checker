export const userScene = (sceneId, sceneOrderArr) => sceneOrderArr.indexOf(sceneId) + 1
export const userScenes = (sceneIdArr, sceneOrderArr) => sceneIdArr.map(id => userScene(id, sceneOrderArr))