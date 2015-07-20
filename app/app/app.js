// declare what firebase db we want to use e.g. https://fire-foo-1234.firebaseio.com/
var firebase = config.firebase;

// create a firebase reference
var ref = new Firebase(firebase);

// we can now interact with the firebase db through ref
var notesRef = ref.child('notes');

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
