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
        this.status.setAttribute("data-task-id", task.id);
        this.status.setAttribute("data-old-status", task.status);
        this.status.className = "task-status";
        this.status.innerHTML = `
            <option value="to-do">to do</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
        `;

        for (const child of [this.title, this.dueDate, this.description, this.status]){
            this.card.appendChild(child);
        }
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

const taskDialog = document.createElement("dialog");
taskDialog.id = "task-dialog";
taskDialog.innerHTML = `
    <form id="create-task-form">
        <h3>Create Task</h3>
        <label for="form-task-title">New task: </label>
        <input type="text" id="form-task-title" name="form-task-title">
        <label for="form-task-desc">Description</label>
        <input type="text" id="form-task-desc" name="form-task-desc">
        <label for="form-task-duedate">Due date</label>
        <input type="date">
        <label for="form-task-status">Status</label>
        <select id="form-task-status" name="form-task-status">
            <option value="to-do">to do</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
        </select>
        <input type="submit">
    </form>
`;

// Render a project's tasks
const taskColumns = {
    "to-do": document.querySelector("#to-do-list"),
    "doing": document.querySelector("#doing-list"),
    "done": document.querySelector("#done-list")
}

export {TaskCard, projectDialog, taskDialog, taskColumns};