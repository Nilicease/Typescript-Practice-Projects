// Save all new task
export function SaveTask(task) {
    localStorage.setItem("tasks", task);
    console.log("I saved the new tasks");
}
// Loading all task from LocalStorage
export function LoadTask() {
    const items = localStorage.getItem("tasks");
    if (!items) {
        console.log("hi");
        return "No data";
    }
    return items;
}
// Clear All Task from LocalStorage
export function ClearAllTask() {
    localStorage.removeItem("tasks");
    return "Clear All List";
}
//# sourceMappingURL=storage.js.map