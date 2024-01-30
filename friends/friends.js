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
const people = document.getElementById('people')
const search_input = document.getElementById('search_input')
const resultList = document.getElementById('resultList')


let posts = ''
let username = ''
let avatar = ''
let count = 0
let users = []
let resultArr = []
let userList = []
console.log(auth);


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        userQuerySnapshot.forEach((doc) => {
            userList[count] = doc.data()
            users = doc.data()
            console.log(userList);
            if (users.uid == uid) {
                username = users.username
                avatar = users.avatar
                sign_out.style.display = 'block'
                name.innerText = users.username
            }
            count++
            people.innerHTML += `<div class="user">
                <img id="avatar" src="${users.avatar}" alt="">
                <div class="name">
                    <h5>${users.username}</h5>
                    <p>@${users.username}</p>
                </div>
                <button type="submit" onclick="addfriend(${users.username})" class="add_btn btn btn-primary">add friend</button>
            </div>`
        });
    } else {
        sign_up.style.display = 'block'
        sign_in.style.display = 'block'
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




window.addfriend = async function addfriend(u) {
    await setDoc(doc(db, users, friends), {
      'friends': u,
    })
}


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