import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAgXjPXQDVohsWqzuMViwP0Wu8it2Qegns',
  authDomain: 'camus-nexjts.firebaseapp.com',
  projectId: 'camus-nexjts',
  storageBucket: 'camus-nexjts.appspot.com',
  messagingSenderId: '549640372801',
  appId: '1:549640372801:web:cf3121844e7341802f7cc0',
  measurementId: 'G-X589G1M2H9'
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase
    .auth()
    .onAuthStateChanged(user => {
      const normalizedUser = user
        ? mapUserFromFirebaseAuthToUser(user)
        : null
      onChange(normalizedUser)
    })
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
}

export const addCard = ({ avatar, nombre, autor, image, descripcion, userId, userName }) => {
  return db.collection('cards').add({
    avatar,
    nombre,
    autor,
    image,
    descripcion,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date())
  })
}

export const fetchLatestCards = () => {
  return db
    .collection('cards')
    .orderBy('createdAt', 'desc')
    .get()
    .then(({ docs }) => {
      return docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate()
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
