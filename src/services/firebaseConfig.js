// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBeFKSQqymqaHcW7tpDNAKmEj_wT9ieu2c',
  authDomain: 'theater-app-78a8a.firebaseapp.com',
  projectId: 'theater-app-78a8a',
  storageBucket: 'theater-app-78a8a.appspot.com',
  messagingSenderId: '154112953013',
  appId: '1:154112953013:web:b4556dd39176a1b70f8cfc',
  measurementId: 'G-2BS1V72B59'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
