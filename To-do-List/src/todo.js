import { LoadTask } from "./storage.js";
let idNum = 0;
export function CreateTask(inputValue) {
    const task = inputValue;
    // idNum = GenerateID();
    return {
        id: idNum,
        title: task,
        status: false
    };
}
function GenerateID() {
}
console.log(LoadTask());
