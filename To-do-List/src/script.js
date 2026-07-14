import { SaveTask } from "./storage";
import { CreateTask } from "./todo";
import { LoadTask } from "./storage";
const form = document.querySelector("#formReq");
const task = [];
form?.addEventListener('submit', (event) => {
    const input = document.querySelector("#todo");
    if (!input) {
        return;
    }
    const inputValue = input.value;
    const item = CreateTask(inputValue);
    task.push(item);
    SaveTask(JSON.stringify(task));
    event.preventDefault();
});
console.log(LoadTask());
