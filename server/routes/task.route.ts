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
    this.router.get('/list', this.taskController.list)
    this.router.post('/add', this.taskController.add)
    this.router.get('/:board_id/tasks', this.taskController.getListByBoardId)
  }
}

export default TaskRoute