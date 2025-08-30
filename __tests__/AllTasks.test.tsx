import React from "react";
import { render, screen } from "@testing-library/react";
import AllTasks from "../pages/tasks/all/AllTasks";
import { TaskContext } from "../context/NewTaskContext";

describe("AllTasks component", () => {
  const tasks = [
    { id: "1", task: "Task 1", state: false },
    { id: "2", task: "Task 2", state: true },
    { id: "3", task: "Task 3", state: false },
  ];

  const renderWithContext = (filter = "all") => {
    return render(
      <TaskContext.Provider value={{ tasks, filter }}>
        <AllTasks />
      </TaskContext.Provider>
    );
  };

  it("показывает сообщение, если нет задач и filter === 'all'", () => {
    render(
      <TaskContext.Provider value={{ tasks: [], filter: "all" }}>
        <AllTasks />
      </TaskContext.Provider>
    );
    expect(screen.getByText("Вы не добавили ни одной задачи")).toBeInTheDocument();
  });

  it("рендерит все задачи, если filter === 'all'", () => {
    renderWithContext("all");
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });

  it("рендерит только завершенные задачи, если filter === 'complete'", () => {
    render(
      <TaskContext.Provider value={{ tasks, filter: "complete" }}>
        <AllTasks />
      </TaskContext.Provider>
    );
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).toBeNull();
    expect(screen.queryByText("Task 3")).toBeNull();
  });

  it("рендерит только активные задачи, если filter === 'active'", () => {
    render(
      <TaskContext.Provider value={{ tasks, filter: "active" }}>
        <AllTasks />
      </TaskContext.Provider>
    );
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).toBeNull();
  });

  it("показывает сообщение, если нет активных задач", () => {
    render(
      <TaskContext.Provider value={{ tasks: tasks.map(t => ({ ...t, state: true })), filter: "active" }}>
        <AllTasks />
      </TaskContext.Provider>
    );
    expect(screen.getByText("Нет активных задач")).toBeInTheDocument();
  });

  it("показывает сообщение, если нет завершенных задач", () => {
    render(
      <TaskContext.Provider value={{ tasks: tasks.map(t => ({ ...t, state: false })), filter: "complete" }}>
        <AllTasks />
      </TaskContext.Provider>
    );
    expect(screen.getByText("Нет завершенных задач")).toBeInTheDocument();
  });
});
