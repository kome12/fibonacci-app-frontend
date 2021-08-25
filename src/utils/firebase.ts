import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/firestore'

const clientCredentials = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials)
}

// Uncomment out when need to use firestore DB
// export const db = firebase.firestore()

export default firebase
