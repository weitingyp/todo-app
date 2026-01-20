import { Task, Project, Db } from "./model.js";
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

function renderProjTitle(proj){
    const projTitle = document.createElement("li");
    projTitle.className = "nav-proj-title";
    projTitle.innerText = proj.title;
    projList.appendChild(projTitle);
}

for (const proj of initBoardDB){
    renderProjTitle(proj);
}

// CREATE A NEW PROJECT

document.querySelector("body").appendChild(projectDialog);

// show new project form (modal) on button click
const createProjBtn = document.querySelector("#add-proj-btn");
createProjBtn.addEventListener('click', ()=>{
    projectDialog.showModal();
})

// function to create project and add to DB
function createProject(title){
    const newProj = new Project(title);
    Db.addProject(newProj);
    renderProjTitle(newProj);
}

// process form data
const createProjForm = document.querySelector("#create-proj-form");
createProjForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    createProject(formData.get("form-proj-title"));
    this.reset();
    projectDialog.close();
})