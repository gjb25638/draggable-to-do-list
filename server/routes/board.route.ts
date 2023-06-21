import BoardController from '../controllers/board.controller'
import Route from './route'

class BoardRoute extends Route {
  private boardController = new BoardController('board')

  constructor() {
    super()
    this.prefix = '/api/board'
    this.setRoutes()
  }

  protected setRoutes() {
    this.router.get('/list', this.boardController.readAll)
    this.router.post('/add', this.boardController.create)
    this.router.put('/:id/update', this.boardController.update)
    this.router.delete('/:id/delete', this.boardController.delete)
  }
}

export default BoardRoute