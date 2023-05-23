import { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { Task, taskConverter } from '../models/task'
import db from '../db'

class TaskController {
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
    console.log({ tasks })
    res.send()
  }
}

export default TaskController
