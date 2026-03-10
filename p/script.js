const div = document.createElement("div");

div.innerHTML = `

<div class="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl w-full max-w-xl p-6">

<h1 class="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
<i class="bi bi-journal-text text-blue-500"></i>
My Notes
</h1>

<div class="flex items-center gap-3 mb-6 bg-gray-100 p-4 rounded-xl">

<img 
id="profileImage"
src="https://i.pravatar.cc/100"
class="w-14 h-14 rounded-full object-cover"
/>

<h2 id="displayName" class="font-semibold text-lg">
User Name
</h2>

</div>

<div class="mb-6 space-y-2">

<input
id="profileName"
type="text"
placeholder="Edit name"
class="input input-bordered w-full"
/>

<input
id="profileUpload"
type="file"
accept="image/*"
class="file-input file-input-bordered w-full"
/>

<button onclick="saveProfile()" class="btn btn-secondary w-full">
Update Profile
</button>

</div>

<div class="flex gap-3 mb-6">

<input 
id="noteInput"
type="text"
placeholder="Write your note..."
class="input input-bordered w-full"
/>

<button onclick="addNote()" class="btn btn-primary">
<i class="bi bi-plus-lg"></i>
</button>

</div>

<ul id="notesList" class="space-y-3"></ul>

<p id="emptyMsg" class="text-center text-gray-400 text-sm mt-6">
No notes yet
</p>

</div>
`;

document.body.appendChild(div);


const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");
const emptyMsg = document.getElementById("emptyMsg");

const profileName = document.getElementById("profileName");
const profileImage = document.getElementById("profileImage");
const profileUpload = document.getElementById("profileUpload");
const displayName = document.getElementById("displayName");

const themeToggle = document.getElementById("themeToggle");


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

li.className =
"flex justify-between items-start bg-white p-3 rounded-xl shadow";

li.innerHTML = `
<div class="flex flex-col flex-1">
<span class="text-gray-700">${note.text}</span>
<span class="text-xs text-gray-400">${note.date}</span>
</div>

<div class="flex gap-2">

<button onclick="editNote(${index})" class="text-blue-500">
<i class="bi bi-pencil"></i>
</button>

<button onclick="deleteNote(${index})" class="text-red-500">
<i class="bi bi-trash"></i>
</button>

</div>
`;

notesList.appendChild(li);

});

}

function addNote(){

const note = noteInput.value.trim();

if(note === "") return;

const noteObj = {
text: note,
date: new Date().toLocaleString()
};

notes.push(noteObj);

localStorage.setItem("notes", JSON.stringify(notes));

noteInput.value = "";

showNotes();

}

function deleteNote(index){

notes.splice(index,1);

localStorage.setItem("notes", JSON.stringify(notes));

showNotes();

}

function editNote(index){

const newNote = prompt("Edit note", notes[index].text);

if(newNote !== null){

notes[index].text = newNote;
notes[index].date = new Date().toLocaleString();

localStorage.setItem("notes", JSON.stringify(notes));

showNotes();

}

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

function loadTheme(){

const savedTheme = localStorage.getItem("theme");

if(savedTheme){

document.documentElement.setAttribute("data-theme", savedTheme);

if(savedTheme === "dark"){
themeToggle.checked = true;
}

}

}

themeToggle.addEventListener("change", () => {

const theme = themeToggle.checked ? "dark" : "light";

document.documentElement.setAttribute("data-theme", theme);

localStorage.setItem("theme", theme);

});


loadTheme();
loadProfile();
showNotes();