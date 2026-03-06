export interface Task {
  id: number;
  name: string;
  due_date: string;
  priority: number;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = 'todo_tasks';

export const getTasks = (): Task[] => {
  const tasksStr = sessionStorage.getItem(STORAGE_KEY);
  if (!tasksStr) return [];
  try {
    return JSON.parse(tasksStr);
  } catch (e) {
    console.error('Failed to parse tasks from session storage', e);
    return [];
  }
};

export const saveTasks = (tasks: Task[]) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const getTaskById = (id: number): Task | undefined => {
  return getTasks().find((task) => task.id === id);
};

export const addTask = (name: string, due_date: string, priority: number) => {
  const tasks = getTasks();
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const now = new Date().toISOString();
  const newTask: Task = {
    id: nextId,
    name,
    due_date,
    priority,
    completed: false,
    created_at: now,
    updated_at: now,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTask = (id: number, updates: Partial<Omit<Task, 'id' | 'created_at'>>) => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return;

  const now = new Date().toISOString();
  tasks[index] = {
    ...tasks[index],
    ...updates,
    updated_at: now,
  };
  saveTasks(tasks);
};

export const deleteTask = (id: number) => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter((t) => t.id !== id);
  saveTasks(filteredTasks);
};

export const toggleTaskCompleted = (id: number) => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return;

  const now = new Date().toISOString();
  tasks[index] = {
    ...tasks[index],
    completed: !tasks[index].completed,
    updated_at: now,
  };
  saveTasks(tasks);
};
