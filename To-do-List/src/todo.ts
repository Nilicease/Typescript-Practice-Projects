import { Task } from "./types.js";
import { LoadTask } from "./storage.js";

let idNum: number = 0;

export function CreateTask(inputValue: string): Task {

    const task: string = inputValue;
    idNum = GenerateID();

    return {
        id: idNum,
        title: task,
        status: false
    }
}

export function DisplayTask() {
    const raw = LoadTask();
    const data = raw === "No data" ? [] : (JSON.parse(raw) as Task[]);
    const ListOfTask = document.querySelector<HTMLTableSectionElement>("#ListOfTask")!;

    ListOfTask.innerHTML = data.map( tasks => 
        `
        <tr>
            <td><input type="checkbox" ${tasks.status ? 'checked' : ''}></td>
            <td>${tasks.title}</td>
            <td><button class="btn-delete" id="${tasks.id}">Delete</button></td>
        </tr>
        `).join('')
}

// Removing Task from LocalStorage
export function RemoveTask(id: number): void {
    const data = localStorage.getItem("tasks");

    if (!data) return;

    const tasks: Task[] = JSON.parse(data);

    const updatedTasks = tasks.filter(task => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function GenerateID(): number {
    const raw = LoadTask();
    const data = raw === "No data" ? [] : JSON.parse(raw);

    if (data.length === 0) {
        return 1;
    }

    const lastTask = data.length - 1;
    return data[lastTask].id + 1;
}