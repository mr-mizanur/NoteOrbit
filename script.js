const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function showNotes(){
notesList.innerHTML = "";

const userName = localStorage.getItem("profileName") || "User";

notes.forEach((note, index) => {

const li = document.createElement("li");

li.className = "bg-white p-3 rounded-xl shadow hover:shadow-lg transition mb-2";

li.innerHTML = `
<div class="flex justify-between items-start">

<div>

<p class="text-xs text-gray-400 mb-1">${userName}</p>

<p class="text-gray-700 break-words">${note}</p>

</div>

<button onclick="deleteNote(${index})" 
class="text-red-500 hover:text-red-600 transition">
<i class="bi bi-trash"></i>
</button>

</div>
`;

notesList.appendChild(li);

});
}

function addNote(){

const note = noteInput.value;

if(note === "") return;

notes.push(note);

localStorage.setItem("notes",JSON.stringify(notes));

noteInput.value = "";

showNotes();

}


function deleteNote(index){
    notes.splice(index ,1)
    localStorage.setItem("notes",JSON.stringify(notes) )
    showNotes()
}
showNotes();

const profileName = document.getElementById("profileName");
const profileImage = document.getElementById("profileImage");
const profileUpload = document.getElementById("profileUpload");

function saveProfile(){

const name = profileName.value;

if(name){
localStorage.setItem("profileName", name);
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
profileName.value = savedName;
}

if(savedImage){
profileImage.src = savedImage;
}

}

loadProfile();