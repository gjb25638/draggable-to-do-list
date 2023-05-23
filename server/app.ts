import express from 'express'
import ViteExpress from 'vite-express'
import cors from 'cors'
import morgan from 'morgan'
import { router } from './router'

// const ref = db.collection('board').where('__name__', '==', '1')
// ref.get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     console.log(doc.id, doc.data())
//   })
// })
// task.get().then(item => console.log(item.data()))

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
// ViteExpress.config({ mode: 'production' })

// load router
for (const route of router) {
  app.use(route.getPrefix(), route.getRouter())
}

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
)