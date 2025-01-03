import "./App.css";
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodoList = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type TasksStateType = {
  [todoListId: string]: Task[];
};

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<TodoList[]>([
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to read", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Mushishi", isDone: true },
      { id: v1(), title: "Hellsing", isDone: true },
      { id: v1(), title: "Jujutsu Kaisen 0", isDone: true },
      { id: v1(), title: "Spice and wolf", isDone: false },
      { id: v1(), title: "Tongari Boushi no Atelier", isDone: false },
      { id: v1(), title: "Vinland Saga", isDone: false },
      { id: v1(), title: "Mahoutsukai no Yome", isDone: false },
      { id: v1(), title: "Spy x Family", isDone: false },
    ],
  });

  const deleteTask = (taskId: string, todoListId: string) => {
    // const filteredTasks = tasks.filter((task) => {
    //   return task.id !== taskId;
    // });
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId),
    });
  };

  const changeTodoListFilter = (filter: FilterValues, todoListId: string) => {
    setTodoLists(
      todoLists.map((tl) => (tl.id === todoListId ? { ...tl, filter } : tl))
    );
  };

  const deleteTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListId));
    delete tasks[todoListId];
  };

  const createTask = (title: string, todoListId: string) => {
    const newTask = { id: v1(), title, isDone: false };
    setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] });
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id == taskId ? { ...t, isDone } : t
      ),
    });
  };

  const todoListComponents = todoLists.map((tl) => {
    let filteredTasks = tasks[tl.id];
    if (tl.filter === "active") {
      filteredTasks = filteredTasks.filter((task) => !task.isDone);
    }
    if (tl.filter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.isDone);
    }
    return (
      <TodolistItem
        key={tl.id}
        todoListId={tl.id}
        title={tl.title}
        filter={tl.filter}
        tasks={filteredTasks}
        createTask={createTask}
        deleteTask={deleteTask}
        deleteTodoList={deleteTodoList}
        changeTaskStatus={changeTaskStatus}
        changeTodoListFilter={changeTodoListFilter}
      />
    );
  });

  return <div className="app">{todoListComponents}</div>;
};
