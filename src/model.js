function generateUniqueId() {
    return `id_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

class Task{
    constructor(projKey, title, dueDate, description = "", priority = "p4", status ="to-do"){
        this.id = generateUniqueId();
        this.projKey = projKey;
        this.title = title; 
        this.dueDate = dueDate; //in JavaScript Date object
        this.description = description;
        this.priority = priority;
        this.status = status;
    }

    updateTaskStatus(newStatus){
        this.status = newStatus;
    }
}

class Project{
    constructor(title){
        this.title = title;
        this.projKey = title.toLowerCase().split(' ').join('_');
        this.taskList = {
            "to-do": {},
            "doing": {},
            "done": {}
        }
    }

    addTask(task){
        const id = task.id;
        this.taskList["to-do"][id] = task;
    }
}

class Db{
    static addProject(proj){
        const currDB = JSON.parse(localStorage.getItem("boardDB"));
        currDB[proj.projKey] = proj;
        localStorage.setItem("boardDB", JSON.stringify(currDB));
    }

    static addTask(projKey, task){
        const currDB = JSON.parse(localStorage.getItem("boardDB"));
        let updatedProj = currDB[projKey];
        updatedProj = new Project (updatedProj.projKey, updatedProj.title, updatedProj.dueDate, updatedProj.description, updatedProj.priority, updatedProj.status);
        updatedProj.addTask(task);
        currDB[projKey] = updatedProj;
        localStorage.setItem("boardDB", JSON.stringify(currDB));
    }

    static updateProjTaskList(activeProjKey, taskId, oldStatus, newStatus){
        const currDB = JSON.parse(localStorage.getItem("boardDB"));
        const task = currDB[activeProjKey].taskList[oldStatus][taskId];
        delete currDB[activeProjKey].taskList[oldStatus][taskId];
        task.status = newStatus;
        currDB[activeProjKey].taskList[newStatus][taskId] = task;
        localStorage.setItem("boardDB", JSON.stringify(currDB));
    }

    static getProj(projKey){
        const currDB = JSON.parse(localStorage.getItem("boardDB"));
        return currDB[projKey];
    }
}

export {Task, Project, Db};