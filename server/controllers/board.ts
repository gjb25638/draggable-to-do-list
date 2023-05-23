import { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { Board, boardConverter } from '../models/board'
import db from '../db'

class BoardController {
  async list(_, res: Response) {
    const snapshot = await db.collection('board').get()
    const boards = snapshot.docs.map(doc => {
      return { id: doc.id, title: doc.data().title }
    })
    // console.log({ boards })
    res.send(boards)
  }
  async add(req: Request, res: Response) {
    const { title } = req.body
    const newBoardRef = await db.collection('board').doc()
    newBoardRef.withConverter(boardConverter).set(new Board(newBoardRef.id, title))
    res.send()
  }
  async delete(req: Request, res: Response) {
    const docRef = db.collection('board').doc(req.params.board_id)
    docRef.delete().then(() => {
      res.status(200).send('The board was deleted.')
    })
  }
}

export default BoardController
