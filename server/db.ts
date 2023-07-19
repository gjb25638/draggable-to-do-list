import * as admin from 'firebase-admin'

// used dotenv
// require('dotenv').config()
// const serviceAccount: Object = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY,
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
//   universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
// }

// used config
const config = require('config')
const serviceAccount: Object = {
  type: config.get('type'),
  project_id: config.get('project_id'),
  private_key_id: config.get('private_key_id'),
  private_key: config.get('private_key'),
  client_email: config.get('client_email'),
  client_id: config.get('client_id'),
  auth_uri: config.get('auth_uri'),
  token_uri: config.get('token_uri'),
  auth_provider_x509_cert_url: config.get('auth_provider_x509_cert_url'),
  client_x509_cert_url: config.get('client_x509_cert_url'),
  universe_domain: config.get('universe_domain'),
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db: FirebaseFirestore.Firestore = admin.firestore()
db.settings({ timestampsInSnapshots: true })

export default db


