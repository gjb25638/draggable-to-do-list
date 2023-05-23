import BoardController from '../controllers/board'
import Route from './route'

class BoardRoute extends Route {
  private boardController = new BoardController()

  constructor() {
    super()
    this.prefix = '/api/board'
    this.setRoutes()
  }

  protected setRoutes() {
    this.router.get('/list', this.boardController.list)
    this.router.post('/add', this.boardController.add)
    this.router.post('/:board_id/delete', this.boardController.delete)
  }
}

export default BoardRoute