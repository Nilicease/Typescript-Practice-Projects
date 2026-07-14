import { Task } from "./types.js";
import { SaveTask } from "./storage.js";
import { CreateTask } from "./todo.js"
import { LoadTask } from "./storage.js"
import { DisplayTask } from "./todo.js"
import { RemoveTask } from "./todo.js"
import { ClearAllTask } from "./storage.js"

const form = document.querySelector<HTMLFormElement>("#formReq");
const ListOfTask = document.querySelector<HTMLTableSectionElement>("#ListOfTask");
const ClearButton = document.querySelector<HTMLButtonElement>("#btn-clear");
let task: Task[] = [];

if (LoadTask() !== "No data") {
    task = JSON.parse(LoadTask()) as Task[];
}

DisplayTask();

form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = document.querySelector<HTMLInputElement>("#todo");
    if (!input) {
        return;
    }
    const inputValue = input.value;
    const item = CreateTask(inputValue);
    task.push(item)

    SaveTask(JSON.stringify(task))

    DisplayTask()
    input.value = ''
})

ListOfTask?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('btn-delete')) {
        const id = parseInt(target.id);
        RemoveTask(id)
        task = task.filter(t => t.id !== id);
        DisplayTask()
    }
})

ClearButton?.addEventListener('click', () => {
    ClearAllTask()
    task = [];
    DisplayTask()
})