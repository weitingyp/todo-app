import { Task, Project } from "./model.js";
import { TaskCard, projectDialog } from "./view.js";
import "./styles.css";

console.log("hello world!");

const grocery = new Task("Buy groceries", Date.now(), "Fish, eggs, milk");
console.log(grocery);
const card = new TaskCard(grocery);

console.log(card.getNode());

document.querySelector("#to-do").appendChild(card.getNode());

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