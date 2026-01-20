class Task{
    constructor(projKey, title, dueDate, description = "", priority = "p4", status ="to do"){
        this.projKey = projKey;
        this.title = title; 
        this.dueDate = dueDate; //in JavaScript Date object
        this.description = description;
        this.priority = priority;
        this.status = status;
    }
}

class Project{
    constructor(title){
        this.title = title;
        this.taskList = {
            "to-do": [],
            "doing": [],
            "done": []
        }
    }

    addTask(task){
        this.taskList["to-do"].push(task);
    }
}

class Db{
    static addProject(proj){
        const currDB = JSON.parse(localStorage.getItem("boardDB"));
        const projKey = proj.title.toLowerCase().split(' ').join('_');
        currDB[projKey] = proj;
        localStorage.setItem("boardDB", JSON.stringify(currDB));
    }
}

export {Task, Project, Db};