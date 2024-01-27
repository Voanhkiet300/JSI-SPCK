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
const search_input = document.getElementById('search_input')
const resultList = document.getElementById('resultList')


let posts = ''
let username = ''
let avatar = ''
let users = []
let count = 0
let resultArr = []
let userList = []
let postList = []


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        userQuerySnapshot.forEach((doc) => {
            userList[count] = doc.data()
            count++
            console.log(userList);
            if (userList.uid == uid) {
                username = userList.username
                avatar = userList.avatar
                sign_out.style.display = 'block'
                name.innerText = userList.username
            }
        });
    } else {
        sign_up.style.display = 'block'
        sign_in.style.display = 'block'
    }
});
count = 0

onAuthStateChanged(auth, (post) => {
    if (post) {
        postsQuerySnapshot.forEach((doc) => {
            posts = doc.data()
            postList[count] = posts
            count++
            box_center.innerHTML += `
            <div class="post" loading="lazy">
                <div class="hea_post">
                    <div class="post_user">
                        <img class="user_avatar"
                            src="${avatar}"
                            alt="">
                        <h3>${posts.username}</h3>
                    </div>
                    <button onclick="delete_post(${posts.caption})" id="delete" class="btn btn-outline-danger">delete</button>
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



function delete_post() {
    deleteDoc(doc(db, "posts", "aaaaaaaa"));
    var dPost = db.collection('posts').where('caption', '==', "aaaaaaaa");
    dPost.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });
}


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

search_input.addEventListener('input', async () => {
    count = 0
    resultArr = []
    for (const user of userList) {
        if (user.username.toLowerCase().includes(search_input.value.toLowerCase())) {
            console.log(user.username);
            resultArr[count] = user.username
            count++
        }
    }
    resultList.innerHTML = ''
    for (const result of resultArr) {
        resultList.innerHTML += `
    <li class='sub-1'><a href=''>${result}</a></li>`
    }

})
