import { Task, Project } from "./model.js";
import { TaskCard } from "./view.js";
import "./styles.css";

console.log("hello world!");

const grocery = new Task("Buy groceries", Date.now(), "Fish, eggs, milk");
console.log(grocery);
const card = new TaskCard(grocery);

console.log(card.getNode());

document.querySelector("#to-do").appendChild(card.getNode());