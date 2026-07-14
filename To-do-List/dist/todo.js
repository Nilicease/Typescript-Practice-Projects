import { LoadTask } from "./storage.js";
let idNum = 0;
export function CreateTask(inputValue) {
    const task = inputValue;
    idNum = GenerateID();
    return {
        id: idNum,
        title: task,
        status: false
    };
}
export function DisplayTask() {
    const raw = LoadTask();
    const data = raw === "No data" ? [] : JSON.parse(raw);
    const ListOfTask = document.querySelector("#ListOfTask");
    ListOfTask.innerHTML = data.map(tasks => `
        <tr>
            <td><input class="status" type="checkbox" ${tasks.status ? 'checked' : ''}></td>
            <td>${tasks.title}</td>
            <td><button class="btn-delete" id="${tasks.id}">Delete</button></td>
        </tr>
        `).join('');
}
// Removing Task from LocalStorage
export function RemoveTask(id) {
    const data = localStorage.getItem("tasks");
    if (!data)
        return;
    const tasks = JSON.parse(data);
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
export function UpdateTaskStatus(id, status) {
    const raw = LoadTask();
    const data = raw === "No data" ? [] : JSON.parse(raw);
    const updatedTasks = data.map(task => {
        if (task.id === id) {
            return { ...task, status: status };
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
function GenerateID() {
    const raw = LoadTask();
    const data = raw === "No data" ? [] : JSON.parse(raw);
    if (data.length === 0) {
        return 1;
    }
    const lastTask = data.length - 1;
    return data[lastTask].id + 1;
}
//# sourceMappingURL=todo.js.map