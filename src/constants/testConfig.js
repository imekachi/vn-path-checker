import { sceneOrder } from './vnConfig'

export const start = 1
export const end = [100, 101]
export const scenes = {
  1: [2],
  2: [3, 4],
  3: [5],
  4: [6],
  5: [7, 100],
  6: [101],
  7: [101],
}

export default {
  start,
  end,
  scenes,
  sceneOrder,
}