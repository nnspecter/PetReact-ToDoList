import React from "react";
import { render, screen } from "@testing-library/react";
import CurrentTasks from "../pages/tasks/current/CurrentTasks";
import { TaskContext } from "../context/NewTaskContext";

describe("CurrentTasks component", () => {
  const tasks = [
    { id: "1", task: "Task 1", state: false },
    { id: "2", task: "Task 2", state: true },
    { id: "3", task: "Task 3", state: false },
  ];

  const renderWithContext = () => {
    return render(
      <TaskContext.Provider value={{ tasks }}>
        <CurrentTasks />
      </TaskContext.Provider>
    );
  };

  it("рендерит заголовок", () => {
    renderWithContext();
    expect(screen.getByText("Текущие задачи:")).toBeInTheDocument();
  });

  it("показывает только активные задачи (state === false)", () => {
    renderWithContext();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).toBeNull();
  });
});
