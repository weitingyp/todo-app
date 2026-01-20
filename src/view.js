class TaskCard{
    constructor(task){
        this.card = document.createElement("div");
        this.card.className = "task-card";

        this.title = document.createElement("div");
        this.title.className = "task-title";
        this.title.innerText = task.title;

        this.dueDate = document.createElement("div");
        this.dueDate.className = "task-due-date";
        this.dueDate.innerText = `due ${task.dueDate}`;

        this.description = document.createElement("div");
        this.description.className = "task-description";
        this.description.innerText = task.description;

        for (const child of [this.title, this.dueDate, this.description]){
            this.card.appendChild(child);
        }
    }

    getNode(){
        return this.card;
    }
}

export {TaskCard};