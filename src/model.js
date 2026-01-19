class Task{
    constructor(title, dueDate, description = "", priority = "p4", status ="to do"){
        this.title = title; 
        this.dueDate = dueDate; //in JavaScript Date object
        this.description = description;
        this.priority = priority;
        this.status = status;
    }
}

class Project{
    #taskList = [];

    constructor(title){
        this.title = title;
    }

    addTask(task){
        this.#taskList.push(task);
    }
}

export {Task, Project};