import TaskController from '../controllers/task.controller'
import Route from './route'

class TaskRoute extends Route {
  private taskController = new TaskController('task')

  constructor() {
    super()
    this.prefix = '/api/task'
    this.setRoutes()
  }

  protected setRoutes() {
    this.router.get('/:board_id/list', this.taskController.getListByBoardId)
    this.router.get('/list', this.taskController.list)
    this.router.post('/add', this.taskController.add)
  }
}

export default TaskRoute