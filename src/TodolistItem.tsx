import { ChangeEvent } from "react";
import type { FilterValues, Task } from "./App";
import { Button } from "./Button";
import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";

type Props = {
  todoListId: string;
  title: string;
  tasks: Task[];
  filter: FilterValues;
  deleteTask: (taskId: string, todoListId: string) => void;
  deleteTodoList: (todoListId: string) => void;
  changeTodoListFilter: (filter: FilterValues, todoListId: string) => void;
  createTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeTodoListTitle: (todolistId: string, title: string) => void;
};

export const TodolistItem = (props: Props) => {
  const {
    todoListId,
    title,
    tasks,
    filter,
    deleteTask,
    deleteTodoList,
    changeTodoListFilter,
    createTask,
    changeTaskStatus,
    changeTaskTitle,
    changeTodoListTitle,
  } = props;

  const createTaskHandler = (title: string) => {
    createTask(title, todoListId);
  };

  const deleteTodoListHandler = () => deleteTodoList(todoListId);

  const changeTodoListTitleHandler = (title: string) => {
    changeTodoListTitle(todoListId, title);
  };

  return (
    <div>
      <h3>
        <EditableSpan
          title={title}
          changeTitle={changeTodoListTitleHandler}
        />
        <Button title="X" onClick={deleteTodoListHandler} />
      </h3>
      <div>
        <CreateItemForm createItem={createTaskHandler} />
        {/* <input
          className={error ? "error" : ""}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={"+"} onClick={createTaskHandler} />
        {error && <div className={"error-message"}>{error}</div>} */}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(task.id, todoListId);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, todoListId);
            };

            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(todoListId, task.id, title);
            };

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <EditableSpan
                  title={task.title}
                  changeTitle={changeTaskTitleHandler}
                />
                <Button title={"x"} onClick={deleteTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClick={() => changeTodoListFilter("all", todoListId)}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeTodoListFilter("active", todoListId)}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeTodoListFilter("completed", todoListId)}
        />
      </div>
    </div>
  );
};
