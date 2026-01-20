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

        this.status = document.createElement("select");
        this.status.className = "task-status";
        this.status.innerHTML = `
            <option value="to-do">to do</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
        `;

        for (const child of [this.title, this.dueDate, this.description, this.status]){
            this.card.appendChild(child);
        }

        this.status.addEventListener("change", function(event){
            const newStatus = this.status.value;
            task.status = newStatus;
        });
    }

    getNode(){
        return this.card;
    }
}

// Create dialog for creating a new project
const projectDialog = document.createElement("dialog");
projectDialog.innerHTML = `
    <form id="create-proj-form">
        <label for="form-proj-title">New project: </label>
        <input type="text" id="form-proj-title" name="form-proj-title">
        <input type="submit" name="submit">
    </form>
`;

// Render a project's tasks
const taskColumns = {
    "to-do": document.querySelector("#to-do"),
    "doing": document.querySelector("#doing"),
    "done": document.querySelector("#done")
}

export {TaskCard, projectDialog, taskColumns};