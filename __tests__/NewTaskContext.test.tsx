import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TaskContextProvider, { TaskContext } from "../context/NewTaskContext";

describe("NewTaskContext", () => {
  let contextValue: any;

  const setup = () => {
    render(
      <TaskContextProvider>
        <TaskContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </TaskContext.Consumer>
      </TaskContextProvider>
    );
  };

  beforeEach(() => {
    contextValue = null;
    setup();
  });

  it("инициализируется с пустым списком задач и фильтром 'all'", () => {
    expect(contextValue.tasks).toEqual([]);
    expect(contextValue.filter).toBe("all");
  });

  it("добавляет новую задачу", () => {
    act(() => {
      contextValue.addTask("Новая задача");
    });

    expect(contextValue.tasks.length).toBe(1);
    expect(contextValue.tasks[0].task).toBe("Новая задача");
    expect(contextValue.tasks[0].state).toBe(false);
  });

  it("не добавляет пустые или дублирующиеся задачи", () => {
    let res: any;

    act(() => {
      res = contextValue.addTask("");
    });
    expect(res).toBe("Поле пустое");

    act(() => {
      contextValue.addTask("Задача 1");
    });

    act(() => {
      res = contextValue.addTask("Задача 1");
    });
    expect(res).toBe("Такая задача есть");

    expect(contextValue.tasks.length).toBe(1);
  });

  it("handleChange изменяет состояние задачи", () => {
    act(() => {
      contextValue.addTask("Задача для изменения");
    });

    const taskId = contextValue.tasks[0].id;
    expect(contextValue.tasks[0].state).toBe(false);

    act(() => {
      contextValue.handleChange(taskId);
    });
    expect(contextValue.tasks[0].state).toBe(true);

    act(() => {
      contextValue.handleChange(taskId);
    });
    expect(contextValue.tasks[0].state).toBe(false);
  });

  it("handleDelete удаляет завершенные задачи", () => {
    act(() => {
      contextValue.addTask("Активная");
      contextValue.addTask("Завершенная");
    });

    const completedId = contextValue.tasks[1].id;

    act(() => {
      contextValue.handleChange(completedId);
    });

    act(() => {
      contextValue.handleDelete();
    });

    expect(contextValue.tasks.length).toBe(1);
    expect(contextValue.tasks[0].task).toBe("Активная");
  });

  it("changeFilter изменяет фильтр", () => {
    act(() => {
      contextValue.changeFilter("complete");
    });
    expect(contextValue.filter).toBe("complete");

    act(() => {
      contextValue.changeFilter("active");
    });
    expect(contextValue.filter).toBe("active");
  });
});
