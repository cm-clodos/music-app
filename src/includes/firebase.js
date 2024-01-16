// ab Version 9 firebase/compat/app
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDs_f8V7583yNwKwocjRdIzJ1HIqqX20QU',
  authDomain: 'music-62539.firebaseapp.com',
  projectId: 'music-62539',
  storageBucket: 'music-62539.appspot.com',
  messagingSenderId: '583139420264',
  appId: '1:583139420264:web:aae490d8dc27d14ab533dd'
}

// initialize Firebase
firebase.initializeApp(firebaseConfig)

// services export
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

// collection erstellen
const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')

export { auth, db, usersCollection, songsCollection, storage }
