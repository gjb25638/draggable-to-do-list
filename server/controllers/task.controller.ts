import { Task, taskConverter } from '../models/task'
import { DocumentData, DocumentReference, DocumentSnapshot } from '@google-cloud/firestore'
import { NextFunction, Request, Response } from 'express'
import db from '../db'
import FirestoreRepository from '../repositories/firestore.repository'
import CustomError from '../utils/error.interface'
import IController from './interfaces/controller.interface'
import Controller from './controller'
import { Console } from 'console'

export default class TaskController extends Controller implements IController {

  constructor(collectionName: string) {
    super(collectionName)
  }

  public async list(_, res: Response) {
    const snapshot = await db.collection('board').doc().collection('task').get()
    const tasks = snapshot.docs.map(doc => {
      return { id: doc.id, title: doc.data().title }
    })
    console.log({ tasks })
    res.send(tasks)
  }
  public async getListByBoardId(req: Request, res: Response) {
    const snapshot = await db.collection('board').doc(req.params.board_id).collection('task').get()
    const tasks = snapshot.docs.map(doc => {
      return { id: doc.id, title: doc.data().title }
    })
    res.send(tasks)
  }
  public async add(req: Request, res: Response) {
    const { title } = req.body
    const newTaskRef = await db.collection('board').doc(req.params.board_id).collection('task').doc()
    await newTaskRef.withConverter(taskConverter).set(new Task(newTaskRef.id, title))
    res.send()
  }
  public async change(req: Request, res: Response) {
    const taskRef = await db.collection('board').doc(req.params.board_id).collection('task').doc(req.params.task_id)
    await taskRef.update(req.body)
    res.send()
  }
  public async remove(req: Request, res: Response) {
    const taskRef = await db.collection('board').doc(req.params.board_id).collection('task').doc(req.params.task_id)
    await taskRef.delete()
    res.send()
  }
  public async removeAll(req: Request, res: Response) {
    await db.collection('board').doc(req.params.board_id).collection('task').listDocuments().then(tasks => {
      tasks.map((task) => task.delete())
    })
    res.send()
  }
}
