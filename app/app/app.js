// declare what firebase db we want to use e.g. https://<YOUR-FIREBASE-APP>.firebaseio.com
var firebase = config.firebase;

// create a firebase reference
var ref = new Firebase(firebase);

// we can now interact with the firebase db through ref
var userRef = ref.child('users');


// form elements
var loginForm = document.querySelector('.login'),
  loginButton = document.querySelector('.login-button'),
  registerLink = document.querySelector('.register-link');


// add bindings to form elements
loginForm.addEventListener('submit',function(e){
  e.preventDefault();
  console.log('subitted form');

  login(email(), password());
});

registerLink.addEventListener('click',function(e){
  e.preventDefault();
  console.log('register button');

  register(email(), password());
});


// register users
function register(email, password) {
  ref.createUser({
    email: email,
    password : password
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
    }
  });
}


// login using email/password
function login(email, password) {
  ref.authWithPassword({
    email: email,
    password: password
  }, authHandler);
}


// callback for after auth
function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}


// return email address
function email() {
  return document.querySelector('#email').value;
}


// return password
function password() {
  return document.querySelector('#password').value;
}



// we need to rethink how we handle notes now that we have users

// get our note element
var el = document.querySelectorAll('.note-content')[0];

// add an event listener to update firebase when the element's content changes
el.addEventListener('input',function(){
  console.log('the note changed', this);

  // get the note name and content
  var content = this.innerText;
    name = this.getAttribute('data-note-name');

  // call the update fn
  updateNote(name,content);

});

function updateNote(name,content) {
  // create a reference to the note we want to change, if it doesn't already
  // exist firebase will create a new node for it when we save or update it
  var note = notesRef.child(name);

  // let's try a transaction instead
  note.transaction(function(currentData){
    return {content: content};
  });
}
