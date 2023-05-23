import * as admin from 'firebase-admin'

const serviceAccount = require('./trello-to-do-list-firebase-adminsdk-5capb-0d4097bef5.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db: FirebaseFirestore.Firestore = admin.firestore()
db.settings({ timestampsInSnapshots: true })

export default db


