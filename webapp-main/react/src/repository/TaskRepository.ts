import IRepository from "@savenkorodion/repository-interfaces/IRepository";
import authorize from "../decorators/authorize";
import localStorageConfigs from "../localStorageConfigs";
import { Task } from "../model/Task";

class TaskRepository implements IRepository<Task> {
  @authorize()
  create(task: Task) {
    const taskList: Task[] = this.getAll();
    taskList.push(task);

    localStorage.setItem(localStorageConfigs.task, JSON.stringify(taskList));
    return true;
  }

  @authorize()
  getAll() {
    const fromStorage = localStorage.getItem(localStorageConfigs.task) ?? "[]";
    const parsed: Task[] = JSON.parse(fromStorage);
    return parsed;
  }

  @authorize()
  delete(id: string): boolean {
    if (!id.trim()) return false;

    const taskList: Task[] = this.getAll();
    const index = taskList.map((e) => e.id).indexOf(id);

    if (index !== -1) {
      taskList.splice(index, 1);
      localStorage.setItem(localStorageConfigs.task, JSON.stringify(taskList));
      return true;
    } else return false;
  }

  @authorize()
  replace(task: Task): boolean {
    const taskList: Task[] = this.getAll();
    const index = taskList.map((e) => e.id).indexOf(task.id);
    if (index !== -1) {
      taskList.splice(index, 1, task);
      localStorage.setItem(localStorageConfigs.task, JSON.stringify(taskList));
      return true;
    } else return false;
  }
}

export default TaskRepository;
