import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore'
import { NextFunction, Request, Response } from 'express'
import db from '../db'
import FirestoreRepository from '../repositories/firestore.repository'
import CustomError from '../utils/error.interface'
import IController from './interfaces/controller.interface'
import Controller from './controller'

export default class BoardController extends Controller implements IController {

  constructor(collectionName: string) {
    super(collectionName)
  }

  // async list(_, res: Response) {
  //   const snapshot = await db.collection('board').get()
  //   const boards = snapshot.docs.map(doc => {
  //     return { id: doc.id, title: doc.data().title }
  //   })
  //   // console.log({ boards })
  //   res.send(boards)
  // }
  // async add(req: Request, res: Response) {
  //   const { title } = req.body
  //   const newBoardRef = await db.collection('board').doc()
  //   newBoardRef.withConverter(boardConverter).set(new Board(newBoardRef.id, title))
  //   res.send()
  // }
  // async delete(req: Request, res: Response) {
  //   const docRef = db.collection('board').doc(req.params.board_id)
  //   docRef.delete().then(() => {
  //     res.status(200).send('The board was deleted.')
  //   })
  // }
}