const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");
const emptyMsg = document.getElementById("emptyMsg");

const profileName = document.getElementById("profileName");
const profileImage = document.getElementById("profileImage");
const profileUpload = document.getElementById("profileUpload");
const displayName = document.getElementById("displayName");

let notes = JSON.parse(localStorage.getItem("notes")) || [];


function showNotes(){

notesList.innerHTML = "";

if(notes.length === 0){
emptyMsg.style.display = "block";
}else{
emptyMsg.style.display = "none";
}

notes.forEach((note, index) => {

const li = document.createElement("li");

li.className = "flex justify-between items-center bg-white p-3 rounded-xl shadow hover:shadow-lg transition";

li.innerHTML = `
<span class="text-gray-700 break-words">${note}</span>

<button onclick="deleteNote(${index})"
class="text-red-500 hover:text-red-600 transition">
<i class="bi bi-trash"></i>
</button>
`;

notesList.appendChild(li);

});

}


function addNote(){

const note = noteInput.value;

if(note === "") return;

notes.push(note);

localStorage.setItem("notes", JSON.stringify(notes));

noteInput.value = "";

showNotes();

}


function deleteNote(index){

notes.splice(index, 1);

localStorage.setItem("notes", JSON.stringify(notes));

showNotes();

}


function saveProfile(){

const name = profileName.value;

if(name){
localStorage.setItem("profileName", name);
displayName.innerText = name;
}

const file = profileUpload.files[0];

if(file){

const reader = new FileReader();

reader.onload = function(e){

localStorage.setItem("profileImage", e.target.result);
profileImage.src = e.target.result;

};

reader.readAsDataURL(file);

}

}


function loadProfile(){

const savedName = localStorage.getItem("profileName");
const savedImage = localStorage.getItem("profileImage");

if(savedName){
displayName.innerText = savedName;
profileName.value = savedName;
}

if(savedImage){
profileImage.src = savedImage;
}

}

loadProfile();
showNotes();