import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, doc, setDoc, getDoc, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { FacebookAuthProvider, signInAnonymously, getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const db = getFirestore(app);
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
const home = document.getElementById('home')
const img = document.getElementById('img')
const image_input = document.getElementById('image-input')



let url = ''


home.addEventListener('click', () => {
   window.location.href = '../index.html'
})

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
         setAnonymous()
         async function setAnonymous() {
            const users = await addDoc(collection(db, "users"), {
               'uid': auth,
               'username': 'Anonymous'
            });
         }
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
   } else if (!username) {
      alert('Please enter the name first');
   } else if (password !== confirmPassword) {
      alert('Passwords do not match');
   } else {
      form.innerHTML = ``
      Toastify({
         text: "Sign up succesful!",
         duration: 3000,
         destination: "https://github.com/apvarun/toastify-js",
         newWindow: true,
         close: true,
         gravity: "top", // `top` or `bottom`
         position: "center", // `left`, `center` or `right`
         stopOnFocus: true, // Prevents dismissing of toast on hover
         style: {
             background: "linear-gradient(to right, #00b09b, #96c93d)",
         },
         onClick: function () { } // Callback after click
     }).showToast();
      createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // user.updateProfile({
            //    displayName: username
            // })
            setUsername()
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
         });
         window.location.href = '../index.html'
   }
})

facebook.addEventListener("click", LogInByFacebook)
anonymous.addEventListener("click", logInWithAnonymous)



const reader = new FileReader()
image_input.onchange = (event) => {
   const files = event.target.files;

   reader.readAsDataURL(files[0])

   reader.addEventListener("load", (event) => {
      url = event.target.result;
      img.src = url
   })
}



async function setUsername() {
   const users = await addDoc(collection(db, "users"), {
      'uid': userCredential.user.uid,
      'username': username,
      'avatar': img.src,
      'friends': '',
      'birthday': 'none'
   });
}
