import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskPreview from "../pages/tasks/TaskPreview/TaskPreview";
import { TaskContext } from "../context/NewTaskContext";


jest.mock("../TaskPreview.module.scss", () => ({
  taskContainer: "taskContainer",
  currentTask: "currentTask",
  taskText: "taskText",
  completed: "completed"
}));

describe("TaskPreview component", () => {
  const mockHandleChange = jest.fn();

  const renderWithContext = (task: any) => {
    return render(
      <TaskContext.Provider value={{ handleChange: mockHandleChange }}>
        <TaskPreview task={task} />
      </TaskContext.Provider>
    );
  };

  beforeEach(() => {
    mockHandleChange.mockClear();
  });

  it("не рендерится, если task === undefined", () => {
    const { container } = renderWithContext(undefined);
    expect(container).toBeEmptyDOMElement();
  });

  it("рендерит текст задачи", () => {
    const task = { id: "1", task: "Сделать ToDo", state: false };
    renderWithContext(task);

    expect(screen.getByText("Сделать ToDo")).toBeInTheDocument();
  });

  it("отображает чекбокс с unchecked состоянием, если state === false", () => {
    const task = { id: "1", task: "Проверить почту", state: false };
    renderWithContext(task);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it("отображает чекбокс с checked состоянием, если state === true", () => {
    const task = { id: "2", task: "Закончить проект", state: true };
    renderWithContext(task);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("вызов handleChange при клике по чекбоксу", () => {
    const task = { id: "3", task: "Выучить тестирование", state: false };
    renderWithContext(task);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    expect(mockHandleChange).toHaveBeenCalledWith("3");
  });

  it("применяет класс completed, если state === true", () => {
    const task = { id: "4", task: "Закрыть таск", state: true };
    renderWithContext(task);

    const taskText = screen.getByText("Закрыть таск");
    expect(taskText).toHaveClass("completed");
  });
});
