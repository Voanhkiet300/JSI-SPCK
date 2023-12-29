import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { FacebookAuthProvider, signInAnonymously, getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
   apiKey: "AIzaSyCZaAS7Nr2eWOAZsKxKELXBflulsCN7zJM",
   authDomain: "jsi-20-835ec.firebaseapp.com",
   projectId: "jsi-20-835ec",
   storageBucket: "jsi-20-835ec.appspot.com",
   messagingSenderId: "776351076612",
   appId: "1:776351076612:web:8203bebc439fb07b708051",
   measurementId: "G-DMCRBRP1X1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new FacebookAuthProvider();
const auth = getAuth();
auth.languageCode = 'it';

provider.setCustomParameters({
   'display': 'popup'
});
const facebook = document.getElementById('facebook')
const anonymous = document.getElementById('anonymous')
const emailMethod = document.getElementById('emailMethod')
const method1 = document.getElementById('method1')
const method2 = document.getElementById('method2')
const submitbtn = document.getElementById('submitbtn')


method2.addEventListener('change', () => {
   emailMethod.innerHTML = ''
   submitbtn.innerHTML = ''
   facebook.style.display = "block"
   anonymous.style.display = "block"
})
method1.addEventListener('change', () => {
   emailMethod.innerHTML = `<img style="border-radius: 100%; width: 40%; align-self: center;"
   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHetp8si0yFM0rxP1lrLl36cwucMfwWNR7g&usqp=CAU"
   alt="">
<!-- username -->
<div class="form-group m-4 my-2">
   <div class="input-group">
       <div class="input-group-prepend">
           <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
       </div>
       <input type="text" id="username" class="form-control" id="exampleInputPassword1"
           placeholder="Username">
   </div>
</div>

<!-- email -->
<div class="form-group m-4 my-2">
   <div class="input-group">
       <div class="input-group-prepend">
           <div class="input-group-text">@</div>
       </div>
       <input type="email" id="email" class="form-control" id="exampleInputEmail1"
           aria-describedby="emailHelp" placeholder="Enter email">
   </div>
</div>

<!-- password -->
<div class="form-group m-4 my-2 mb-0">
   <div class="input-group">
       <div class="input-group-prepend">
           <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
       </div>
       <input type="password" id="password" class="form-control" id="exampleInputPassword1"
           placeholder="Password">
   </div>
</div>
<div class="form-group m-4 my-2">
   <div class="input-group">
       <div class="input-group-prepend">
           <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
       </div>
       <input type="password" id="confirm-password" class="form-control" id="exampleInputPassword1"
           placeholder="confirmPassword">
   </div>
</div>`
submitbtn.innerHTML = '<button type="submit" class="btn btn-primary submit my-0 mb-4">Submit</button>'
facebook.style.display = "none"
anonymous.style.display = "none"
})

function logInWithAnonymous() {
   signInAnonymously(auth)
      .then(() => {
         // Signed in..
         alert('Signed in..')
      })
      .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         // ...
      });
}

function LogInByFacebook() {
   signInWithPopup(auth, provider)
      .then((result) => {
         // The signed-in user info.
         const user = result.user;

         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
         const credential = FacebookAuthProvider.credentialFromResult(result);
         const accessToken = credential.accessToken;

         // IdP data available using getAdditionalUserInfo(result)
         // ...
      })
      .catch((error) => {
         // Handle Errors here.
         const errorCode = error.code;
         const errorMessage = error.message;
         // The email of the user's account used.
         const email = error.customData.email;
         // The AuthCredential type that was used.
         const credential = FacebookAuthProvider.credentialFromError(error);

         // ...
      });
}

const LogOut = () => {
   setUser(null)
}


let form = document.querySelector('form')
form.addEventListener("submit", (e) => {
   e.preventDefault();


   const username = document.getElementById('username').value;
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const confirmPassword = document.getElementById('confirm-password').value;

   const lowerCaseLetters = /[a-z]/g;
   const upperCaseLetters = /[A-Z]/g;
   const numbers = /[0-9]/g;

   if (password.length < 8) {
      alert('Password must be at least 8 characters');
   } else if (password !== confirmPassword) {
      alert('Passwords do not match');
   } else if (!password.match(lowerCaseLetters)) {
      alert('Password must contain at least one lowercase letter');
   } else if (!password.match(upperCaseLetters)) {
      alert('Password must contain at least one uppercase letter');
   } else if (!password.match(numbers)) {
      alert('Password must contain at least one number');
   } else {
      alert('Registration successful');
   }
})

facebook.addEventListener("click", LogInByFacebook)
anonymous.addEventListener("click", logInWithAnonymous)



