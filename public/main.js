//GETTING NEEDED ITEMS
const fbLoginBtn = document.getElementById('fbLogin');
const gLoginBtn = document.getElementById('gLogin');
const ghLoginBtn = document.getElementById('ghLogin');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const addTaskBtn = document.getElementById('addTask');
const taskName = document.getElementById('taskName');
const listModal = document.getElementById('listModal');
const todoListContent = document.getElementById('todoListContent');
const welcomeText = document.getElementById('welcomeText');
const loginModal = document.getElementById('loginModal');
loginModal.classList.add('ZIndex');

//GETTING INFO ABOUT CURRENT USER
let user = firebase.auth().currentUser;

//LOGIN BY FACEBOOK
function facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        user = result.user;
        welcomeText.textContent += user.displayName + '!';

        listModal.classList.add('listModalAnimation');
        loginModal.classList.remove('ZIndex');
        loginModal.classList.add('changeZIndexOfLoginModal');
    });
}

//LOGIN BY GOOGLE
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        user = result.user;
        welcomeText.textContent += user.displayName + '!';

        listModal.classList.add('listModalAnimation');
        loginModal.classList.remove('ZIndex');
        loginModal.classList.add('changeZIndexOfLoginModal');
    });
}

//LOGIN BY GITHUB
function githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        user = result.user;
        welcomeText.textContent += user.displayName + '!';

        listModal.classList.add('listModalAnimation');
        loginModal.classList.remove('ZIndex');
        loginModal.classList.add('changeZIndexOfLoginModal');
    });
}

//ADDING TASK TO DATABASE
function addTaskToDb() {
    if(taskName.value == null || taskName.value == '') {
        alert("Podaj nazwę zadania!");
    }
    else {
        let db = firebase.database().ref('tasks');
        let newTask = db.push();

        newTask.set({
            name: taskName.value,
            uid: user.uid
        });
    }
    taskName.value = '';
}
let span;
//READING DATA FROM DATABASE
listModal.addEventListener('animationend', () => {

    let db = firebase.database().ref('tasks');

    db.on('child_added', snapshot => {

        span = document.createElement('span');
        span.setAttribute('id', snapshot.key);
        span.setAttribute('class', 'listItem');
        span.setAttribute('onclick', 'deleteFromDb()');
        let textNode = document.createTextNode(snapshot.val().name + `\n`);
        span.appendChild(textNode);

        snapshot.forEach(() => {
            if(snapshot.val().uid == user.uid) {
                todoListContent.appendChild(span);
            }
        });
    });

    db.on('child_removed', () => {
        span.remove();
    });

});

//DELETING FORM DATABASE
function deleteFromDb() {
    let db = firebase.database().ref('tasks');
    let key = span.id;
    db.child(key).remove();
}

//EVENT LISTENERS
fbLoginBtn.addEventListener('click', facebookLogin);
gLoginBtn.addEventListener('click', googleLogin);
ghLoginBtn.addEventListener('click', githubLogin);
addTaskBtn.addEventListener('click', addTaskToDb);
