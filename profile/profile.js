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
const profile_avatar = document.getElementById('profile_avatar')
const profile_name = document.getElementById('profile_name')
const information_btn = document.getElementById('information_btn')
const friends_btn = document.getElementById('friends_btn')
const posts_btn = document.getElementById('posts_btn')
const profile_info = document.getElementById('profile_info')
const birthday = document.getElementById('birthday')
const friend_box = document.getElementById('friend_box')
const friend = document.getElementById('friend')
const post_box = document.getElementById('post_box')

let posts = ''
let username = ''
let avatar = ''


console.log(auth);
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        userQuerySnapshot.forEach((doc) => {
            const users = doc.data()
            if (users.uid == uid) {
                username = users.username
                avatar = users.avatar
                console.log(users.username);
                sign_out.style.display = 'block'
                name.innerText = users.username
                profile_name.innerText = users.username
                profile_avatar.src = avatar
                if (users.birthday !== undefined) {
                    birthday.innerHTML = users.birthday
                } else {
                    birthday.innerHTML = "add birthday"
                }
            }
            friend_box.innerHTML += `<div class="user">
                <img id="avatar" src="${users.avatar}" alt="">
                <div class="name">
                    <h5>${users.username}</h5>
                    <p>${users.username}</p>
                </div>
            </div>`
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
            if (posts.username == username) {
                post_box.innerHTML += `
                <div class="post" loading="lazy">
                    <div class="post_user">
                        <img class="user_avatar"
                            src="${avatar}"
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
            }
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



profile_info.style.display = 'flex'
profile_info.style.flexDirection = 'column'
friend.style.display = 'none'
post_box.style.display = 'none'



information_btn.addEventListener('click', () => {
    profile_info.style.display = 'flex'
    profile_info.style.flexDirection = 'column'
    friend.style.display = 'none'
    post_box.style.display = 'none'
})
friends_btn.addEventListener('click', () => {
    profile_info.style.display = 'none'
    friend.style.display = 'flex'
    friend.style.flexDirection = 'column'
    post_box.style.display = 'none'
})
posts_btn.addEventListener('click', () => {
    profile_info.style.display = 'none'
    friend.style.display = 'none'
    post_box.style.display = 'flex'
    post_box.style.flexDirection = 'column'
})