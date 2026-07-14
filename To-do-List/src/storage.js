// Save all new task
export function SaveTask(task) {
    localStorage.setItem("tasks", task);
}
// Loading all task from LocalStorage
export function LoadTask() {
    const items = localStorage.getItem("tasks");
    if (!items) {
        return Error("No items in local storage");
    }
    return items;
}
// Removing Task from LocalStorage
export function RemoveTask() {
}
