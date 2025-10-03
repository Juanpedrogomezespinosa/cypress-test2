class TodoPage {
  elements = {
    inputNewTodo: () => cy.get("input.new-todo"),
    todoItemLabel: (itemText) => cy.contains("label", itemText),
    todoItems: () => cy.get(".todo-list li"),
    deleteButton: (itemText) =>
      this.elements.todoItemLabel(itemText).parent().find("button.destroy"),
    toggleButton: (itemText) =>
      this.elements.todoItemLabel(itemText).parent().find("input.toggle"),
    filterActive: () => cy.contains("a", "Active"),
    filterCompleted: () => cy.contains("a", "Completed"),
    filterAll: () => cy.contains("a", "All"),
  };

  addTodo(taskName) {
    this.elements.inputNewTodo().type(`${taskName}{enter}`);
  }

  deleteTodo(taskName) {
    this.elements.deleteButton(taskName).click({ force: true });
  }

  validateTodoExists(taskName) {
    this.elements.todoItemLabel(taskName).should("be.visible");
  }

  validateTodoNotExists(taskName) {
    this.elements.todoItemLabel(taskName).should("not.exist");
  }

  editTodo(oldName, newName) {
    cy.contains(".todo-list li", oldName).dblclick();
    cy.get("input.new-todo")
      .filter(":visible")
      .first()
      .type("{selectall}{backspace}")
      .type(`${newName}{enter}`);
    this.validateTodoExists(newName);
  }

  markCompleted(taskName) {
    this.elements.toggleButton(taskName).check();
  }

  unmarkCompleted(taskName) {
    this.elements.toggleButton(taskName).uncheck();
  }

  validateCompleted(taskName) {
    this.elements
      .todoItemLabel(taskName)
      .closest("li")
      .should("have.class", "completed");
  }

  validateNotCompleted(taskName) {
    this.elements
      .todoItemLabel(taskName)
      .closest("li")
      .should("not.have.class", "completed");
  }

  filterActive() {
    this.elements.filterActive().click();
  }

  filterCompleted() {
    this.elements.filterCompleted().click();
  }

  filterAll() {
    this.elements.filterAll().click();
  }
}

export default TodoPage;
