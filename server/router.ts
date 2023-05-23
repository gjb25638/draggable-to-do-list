import Route from './routes/route'
import BoardRoute from './routes/board.route'
import TaskRoute from './routes/task.route'

export const router: Array<Route> = [
  new BoardRoute(),
  new TaskRoute()
]