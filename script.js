// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCnAavMQS-DsombXqRSgY5b_eXxuAXeVrM',
  authDomain: 'sketchbook-42013.firebaseapp.com',
  projectId: 'sketchbook-42013',
  storageBucket: 'sketchbook-42013.appspot.com',
  messagingSenderId: '397728278681',
  appId: '1:397728278681:web:473fc0a5b41568f594b008',
  measurementId: 'G-M59MWS6208',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById('loginbutton');
googleLogin.addEventListener('click', function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      onAuthStateChanged(user);
      // window.location.href = 'main.html';
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      //   const email = error.customData.email;
      // The AuthCredential type that was used.
      //   const credential = GoogleAuthProvider.credentialFromError(error);
      //   // ...
    });
});

function updateuserinfo(user) {
  const email = user.email;
  const username = user.username;
  const profileimage = user.profileimage;
  localStorage.setItem('username', user.username);
  localStorage.setItem('useremail', user.email);
  localStorage.setItem('userimage', user.profileimage);
  window.location.replace('main.html');

  // Manipulate browser history to prevent going back to index.html
  window.history.replaceState(null, '', 'main.html');
  document.getElementById('usernamefetched').innerText = username;
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    updateuserinfo(user);
    localStorage.setItem('username', user.username);
    localStorage.setItem('useremail', user.email);
    localStorage.setItem('userimage', user.profileimage);
    const uid = user.uid;
    return uid;
  } else {
    console.log('Go login first');
  }
});
const signoutbtn = document.getElementById('singoutbutton');
signoutbtn.addEventListener('click', signoutmain);

function signoutmain() {
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log('User signed out successfully.');
      window.location.replace('index.html'); // Redirect to the login page after signout
    })
    .catch((error) => {
      // An error happened.
      console.error('Error signing out:', error);
    });
}

// updateuserinfo(user);

function updateinthemainpage() {}
