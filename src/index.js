import { Task, Project, Db } from "./model.js";
import { TaskCard, setTaskSelected, projectDialog, taskDialog, taskColumns } from "./view.js";
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

    const secondProj = new Project("Second List");
    Db.addProject(secondProj);

// }

// load and display projects
const projList = document.querySelector("#proj-list");
const initBoardDB = JSON.parse(localStorage.getItem("boardDB"));

function renderProjTitle(proj){
    const projTitle = document.createElement("li");
    projTitle.className = "nav-proj-title";
    projTitle.innerText = proj.title;
    projList.appendChild(projTitle);

    projTitle.addEventListener("click", function(event){
        renderProjTasks(proj);
    })
}

let activeProj = null;
for (const proj in initBoardDB){
    if (!activeProj) activeProj = initBoardDB[proj];
    renderProjTitle(initBoardDB[proj]);
}

// load and display active project's tasks

function renderProjTasks(proj){
    for (const list of ["to-do", "doing", "done"]){
        taskColumns[list].innerHTML = "";
        for (const taskId in proj.taskList[list]){
            taskColumns[list].appendChild(new TaskCard(proj.taskList[list][taskId]).getNode());
        }
    }

    document.querySelectorAll(".task-status").forEach(
        selector => {
            setTaskSelected(selector, selector.getAttribute("data-old-status"));
            selector.addEventListener("change", function(event){
                const newStatus = this.value;
                const oldStatus = this.getAttribute("data-old-status")
                const taskId = this.getAttribute("data-task-id");
                Db.updateProjTaskList(activeProjKey, taskId, oldStatus, newStatus);
                this.setAttribute("data-old-status", newStatus);
                renderProjTasks(Db.getProj(activeProjKey));
                setTaskSelected(selector, newStatus);
            })
        }
    );
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

// CREATE A NEW TASK
document.querySelector("body").appendChild(taskDialog);
const createTaskBtn = document.querySelector("#add-task-btn");
createTaskBtn.addEventListener('click', ()=>{
    taskDialog.showModal();
});

// process form data
const createTaskForm = document.querySelector("#create-task-form");

function createTask(projKey, title, dueDate, description = "", priority = "p4", status = "to do"){
    const task = new Task(projKey, title, dueDate, description = "", priority = "p4", status = "to do");
    Db.addTask(projKey, task);
    renderProjTasks(JSON.parse(localStorage.getItem("boardDB"))[projKey]);
}

createTaskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    createTask(activeProjKey
        , formData.get("form-task-title")
        , formData.get("form-task-duedate")
        , formData.get("form-task-desc")
        , formData.get("form-task-status"));
    this.reset();
    taskDialog.close();
})

// UPDATE