import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, doc, setDoc, getDocs, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const auth = getAuth();
const db = getFirestore(app);
const userQuerySnapshot = await getDocs(collection(db, "users"));
const postsQuerySnapshot = await getDocs(collection(db, "posts"));


const nav_right = document.getElementById('nav_right')
const sign_up = document.getElementById('sign_up')
const sign_in = document.getElementById('sign_in')
const sign_out = document.getElementById('sign_out')
const name = document.getElementById('name')
const box_center = document.getElementById('box_center')

let posts = ''
let username = ''

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        userQuerySnapshot.forEach((doc) => {
            const users = doc.data()
            if (users.uid == uid) {
                username = users.username
                console.log(users.username);
                sign_out.style.display = 'block'
                name.innerText = users.username
            }
        });
    } else {
        sign_up.style.display = 'block'
        sign_in.style.display = 'block'
    }
});


onAuthStateChanged(auth, (post) => {
    if (post) {
        postsQuerySnapshot.forEach((doc) => {
            posts = doc.data()
            console.log(posts);
            box_center.innerHTML += `
            <div class="post" loading="lazy">
                <div class="post_user">
                    <img class="user_avatar"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHetp8si0yFM0rxP1lrLl36cwucMfwWNR7g&usqp=CAU"
                        alt="">
                    <h3>${username}</h3>
                </div>
                <h4 class="caption">${posts.caption}</h4>
                <p class="post_content">${posts.content}</p>
                <div class="post_content image_box">
                    <img class="post_image"
                        src="${posts.image}"
                        alt="">
                </div>
            </div>`
        });
    }
});




sign_up.addEventListener('click', () => {
    window.location.href = 'account/signUp.html'
})
sign_in.addEventListener('click', () => {
    window.location.href = 'account/signIn.html'
})
sign_out.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = './'
    }).catch((error) => {
        // An error happened.
    })
})
