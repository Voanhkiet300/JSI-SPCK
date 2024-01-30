import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, doc, setDoc, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const postsQuerySnapshot = await getDocs(collection(db, "posts"));
const userQuerySnapshot = await getDocs(collection(db, "users"));
// console.log(userQuerySnapshot);

let name = ''
let posts = ''
let userid


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        userQuerySnapshot.forEach((doc) => {
            const users = doc.data()
            // console.log(doc.data());
            if (users.uid == uid) {
                userid = doc.id
                name = users.username;
                console.log(name);
            }
        });
    } else {
        window.location.href = 'account/signUp.html'
    }
});

onAuthStateChanged(auth, (post) => {
    if (post) {
        postsQuerySnapshot.forEach((doc) => {
            posts = doc.data()
            console.log(posts);
        });
    }
});



let myContent = document.getElementById('my_content')
let Newpost = document.getElementById('Newpost')
let image_box = document.getElementById('image_box')
let image_input = document.getElementById("image-input")
let img = document.getElementById('img')
let label = document.getElementById('label')
let caption = document.getElementById("caption")
let content = document.getElementById('contentInput')
let url = ''

Newpost.addEventListener("submit", (event) => {
    event.preventDefault()
    createPost()
    async function createPost() {
        const newPost = await addDoc(collection(db, "posts"), {
            'userid': userid,
            'username': name,
            'caption': caption.value,
            'content': content.value,
            'image': url || ''
        });
        // img.src = ''
        // label.style.display = 'block'
        // image_input.style.display = 'block'
        // caption.value = ''
        // content.value = ''
        window.location.href = '../index.html'
    }
    Toastify({
        text: "Đăng bài thành công!",
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
})

const reader = new FileReader()
image_input.onchange = (event) => {
    const files = event.target.files;

    reader.readAsDataURL(files[0])

    reader.addEventListener("load", (event) => {
        url = event.target.result;
        img.src = url
        label.style.display = 'none'
        image_input.style.display = 'none'
    })
}
