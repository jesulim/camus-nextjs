import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAgXjPXQDVohsWqzuMViwP0Wu8it2Qegns",
  authDomain: "camus-nexjts.firebaseapp.com",
  projectId: "camus-nexjts",
  storageBucket: "camus-nexjts.appspot.com",
  messagingSenderId: "549640372801",
  appId: "1:549640372801:web:cf3121844e7341802f7cc0",
  measurementId: "G-X589G1M2H9"
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase
    .auth()
    .onAuthStateChanged(user => {
      const normalizedUser = user ?
      mapUserFromFirebaseAuthToUser(user) : null
      onChange(normalizedUser)
  })
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
}
