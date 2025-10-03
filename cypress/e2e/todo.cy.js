import TodoPage from "../support/pages/TodoPage";

describe("Gestión de tareas con POM", () => {
  const todoPage = new TodoPage();

  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/react/dist/");
  });

  it("Debe permitir crear una tarea", () => {
    const taskName = "Aprender Cypress";
    todoPage.addTodo(taskName);
    todoPage.validateTodoExists(taskName);
  });

  it("Debe permitir borrar una tarea", () => {
    const taskName = "Eliminar esta tarea";
    todoPage.addTodo(taskName);
    todoPage.deleteTodo(taskName);
    todoPage.validateTodoNotExists(taskName);
  });

  it("Debe permitir editar una tarea", () => {
    const oldName = "Aprender Cypress";
    const newName = "Aprender Cypress + Cucumber";
    todoPage.addTodo(oldName);
    todoPage.editTodo(oldName, newName);
  });

  it("Debe permitir marcar una tarea como completada", () => {
    const taskName = "Estudiar JavaScript";
    todoPage.addTodo(taskName);
    todoPage.markCompleted(taskName);
    todoPage.validateCompleted(taskName);
  });

  it("Debe permitir desmarcar una tarea completada", () => {
    const taskName = "Hacer ejercicio";
    todoPage.addTodo(taskName);
    todoPage.markCompleted(taskName);
    todoPage.unmarkCompleted(taskName);
    todoPage.validateNotCompleted(taskName);
  });

  it("Debe permitir filtrar tareas completadas y activas", () => {
    const task1 = "Tarea 1";
    const task2 = "Tarea 2";
    todoPage.addTodo(task1);
    todoPage.addTodo(task2);
    todoPage.markCompleted(task1);

    todoPage.filterCompleted();
    todoPage.validateTodoExists(task1);
    todoPage.validateTodoNotExists(task2);

    todoPage.filterActive();
    todoPage.validateTodoExists(task2);
    todoPage.validateTodoNotExists(task1);

    todoPage.filterAll();
    todoPage.validateTodoExists(task1);
    todoPage.validateTodoExists(task2);
  });
});
