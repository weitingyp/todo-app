import { Task, Project, Db } from "./model.js";
import { TaskCard, projectDialog, taskColumns } from "./view.js";
import "./styles.css";

// INSTANTIATE BOARD WITH PROJECT LIST
// if (!localStorage.getItem("boardDB")){

    const defaultProj = new Project("My To-Do List");
    let activeProjKey = defaultProj.projKey;
    
    const defaultTask1 = new Task(activeProjKey, "Buy groceries", Date.now(), "Fish, eggs, milk");
    const defaultTask2 = new Task(activeProjKey, "Read my book", Date.now());
    const defaultTask3 = new Task(activeProjKey, "Journal", Date.now());
    for (const task of [defaultTask1, defaultTask2, defaultTask3]){
        defaultProj.addTask(task);
    }
    Db.addProject(defaultProj);

// }

// load and display projects
const projList = document.querySelector("#proj-list");
const initBoardDB = JSON.parse(localStorage.getItem("boardDB"));

function renderProjTitle(proj){
    const projTitle = document.createElement("li");
    projTitle.className = "nav-proj-title";
    projTitle.innerText = proj.title;
    projList.appendChild(projTitle);
}

let activeProj = null;
for (const proj in initBoardDB){
    if (!activeProj) activeProj = initBoardDB[proj];
    renderProjTitle(initBoardDB[proj]);
}

// load and display active project's tasks

function renderProjTasks(proj){
    console.log(`now rendering:`);
    console.log(proj);
    for (const list of ["to-do", "doing", "done"]){
        for (const taskId in proj.taskList[list]){
            console.log(taskId);
            taskColumns[list].appendChild(new TaskCard(proj.taskList[list][taskId]).getNode());
        }
    }
}

renderProjTasks(activeProj);

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