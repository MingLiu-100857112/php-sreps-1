import * as firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyDMY_A5Y0PqvqxZk27gkjhe5UOjAZ1yZXs',
  authDomain: 'php-sreps.firebaseapp.com',
  databaseURL: 'https://php-sreps.firebaseio.com',
  projectId: 'php-sreps',
  storageBucket: 'php-sreps.appspot.com',
  messagingSenderId: '137723334567'
})

export const database = firebase.database().ref()

export function updateLocation(location, value) {
  database.child(location).transaction(data => {
    data = (data !== null) ? +data : 0
    data = data + value
    return data
  })
}
