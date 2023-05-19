import express from 'express'
import ViteExpress from 'vite-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import * as admin from 'firebase-admin'

const serviceAccount = require('./trello-to-do-list-firebase-adminsdk-5capb-0d4097bef5.json')
const db = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}).firestore()

// const ref = db.collection('board').where('__name__', '==', '1')
// ref.get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     console.log(doc.id, doc.data())
//   })
// })
// task.get().then(item => console.log(item.data()))

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
// ViteExpress.config({ mode: 'production' })

app.get('/api/board/hello', (_, res) => {
  res.send('Hello Vite + Vue + TypeScript!')
})

//---board

app.get('/api/board/list', async (_, res) => {
  const snapshot = await db.collection('board').get()
  const boards = snapshot.docs.map(doc => {
    return { id: doc.id, title: doc.data().title }
  })
  console.log({ boards })
  res.send(boards)
})

//---task

app.get('/api/:board_id/tasks', async (req, res) => {
  const snapshot = await db.collection('board').doc(req.params.board_id).collection('task').get()
  const tasks = snapshot.docs.map(doc => {
    return { id: doc.id, title: doc.data().title }
  })
  console.log({ tasks })
  res.send()
})

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
)
