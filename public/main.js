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
    let db = firebase.database().ref('user/' + user.uid);
    let newTask = db.push();

    newTask.set({
        name: taskName.value,
    });

    taskName.value = '';
}

//READING DATA FROM DATABASE
listModal.addEventListener('animationend', () => {

    listModal.classList.remove('listModalAnimation');
    listModal.classList.add('listModalSize');

    let db = firebase.database().ref('user/' + user.uid);

    db.on('child_added', snapshot => {

        let span = document.createElement('span');
        span.setAttribute('class', 'listItem');
        let textNode = document.createTextNode(snapshot.val().name + `\n`);
        span.appendChild(textNode);

        snapshot.forEach(() => {
            todoListContent.appendChild(span);
        });
    });

});

//EVENT LISTENERS
fbLoginBtn.addEventListener('click', facebookLogin);
gLoginBtn.addEventListener('click', googleLogin);
ghLoginBtn.addEventListener('click', githubLogin);
addTaskBtn.addEventListener('click', addTaskToDb);
