import { Task, taskConverter } from '../models/task'
import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore'
import { NextFunction, Request, Response } from 'express'
import db from '../db'
import FirestoreRepository from '../repositories/firestore.repository'
import CustomError from '../utils/error.interface'
import IController from './interfaces/controller.interface'
import Controller from './controller'

export default class TaskController extends Controller implements IController {

  constructor(collectionName: string) {
    super(collectionName)
  }

  async list(_, res: Response) {
    const snapshot = await db.collection('task').get()
    const tasks = snapshot.docs.map(doc => {
      return { id: doc.id, title: doc.data().title }
    })
    console.log({ tasks })
    res.send(tasks)
  }
  async add(req: Request, res: Response) {
    const { title } = req.body
    const newTaskRef = await db.collection('task').doc()
    newTaskRef.withConverter(taskConverter).set(new Task(newTaskRef.id, title))
    res.send()
  }
  async getListByBoardId(req: Request, res: Response) {
    const snapshot = await db.collection('board').doc(req.params.board_id).collection('task').get()
    const tasks = snapshot.docs.map(doc => {
      return { id: doc.id, title: doc.data().title }
    })
    res.send(tasks)
  }
}
