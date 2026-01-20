import { Task, Project } from "./model.js";
import { TaskCard, projectDialog } from "./view.js";
import "./styles.css";

console.log("hello world!");

const grocery = new Task("Buy groceries", Date.now(), "Fish, eggs, milk");
console.log(grocery);
const card = new TaskCard(grocery);

console.log(card.getNode());

document.querySelector("#to-do").appendChild(card.getNode());

// INSTANTIATE BOARD WITH PROJECT LIST
if (!localStorage.getItem("boardDB")){
    localStorage.setItem("boardDB", JSON.stringify([new Project("Task List")]));
}

// load and display projects
const projList = document.querySelector("#proj-list");
const initBoardDB = JSON.parse(localStorage.getItem("boardDB"));
for (const proj of initBoardDB){
    const projTitle = document.createElement("li");
    projTitle.className = "nav-proj-title";
    projTitle.innerText = proj.title;
    projList.appendChild(projTitle);
}

// CREATE A NEW PROJECT

document.querySelector("body").appendChild(projectDialog);

// show new project form (modal) on button click
const createProjBtn = document.querySelector("#add-proj-btn");
createProjBtn.addEventListener('click', ()=>{
    projectDialog.showModal();
})

// process form data
const createProjForm = document.querySelector("#create-proj-form");
createProjForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const newProj = new Project(formData.get("form-proj-title"));
})