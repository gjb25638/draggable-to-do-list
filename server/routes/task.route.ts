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
    this.router.post('/:board_id/add', this.taskController.add)
    this.router.put('/:board_id/:task_id/update', this.taskController.change)
    this.router.delete('/:board_id/:task_id/delete', this.taskController.remove)
    this.router.delete('/:board_id/delete', this.taskController.removeAll)
  }
}

export default TaskRoute