import { ComponentHarness, parallel } from '@angular/cdk/testing';
import { ItemHarness } from '../item/item.component.harness';
import { UpdateTodo } from 'src/app/store/todo-state.interface';
import { TodoInterface } from 'src/app/services/todo.interface';

export class ListHarness extends ComponentHarness {
  static readonly hostSelector = 'app-list';

  #todos = this.locatorForAll(ItemHarness);
  #allCompleted = this.locatorFor('label');

  async getTodos(): Promise<ItemHarness[]> {
    const todos = await this.#todos();
    return todos;
  }

  async getCompletedTodos(): Promise<ItemHarness[]> {
    const todoList = await this.getTodos();
    const todos = await this.getTodoData();
    return todoList.filter((_todo, index) => todos[index]?.completed ?? false);
  }

  async getIncompleteTodos(): Promise<ItemHarness[]> {
    const todoList = await this.getTodos();
    const todos = await this.getTodoData();
    return todoList.filter((_todo, index) => !todos[index]?.completed);
  }

  async getTodoById(id: string): Promise<ItemHarness | undefined> {
    let indexOfTodo = -1;
    const todoList = await this.getTodos();
    const todosData = await this.getTodoData();
    if (!todosData) return;
    todosData.find((_todoData, index) => {
      if (_todoData?.id === id) indexOfTodo = index;
    });
    return todoList[indexOfTodo];
  }

  async getTodoDataById(todoId: string): Promise<TodoInterface | undefined> {
    const todos = await this.getTodoData();
    return todos.find(todo => todo?.id === todoId);
  }

  async getTodoData() {
    const todoList = await this.getTodos();
    const todos = await parallel(() => todoList.map(todo => todo.getTodoData()));
    return todos.filter((todo) => todo !== undefined);
  }

  async removeTodoById(id: string) {
    const todo = await this.getTodoById(id);
    if (todo) await todo.remove();
  }

  async removeAllTodos() {
    const todoList = await this.getTodos();
    await parallel(() => todoList.map(todo => todo.remove()));
  }

  async updateTodo(id: string, todo: UpdateTodo) {
    const todoItem = await this.getTodoById(id);
    if (todoItem) await todoItem.edit(todo);
  }

  async markAllTodosAsComplete() {
    const markAsComplete = await this.#allCompleted();
    await markAsComplete.click();
  }

  async areAllTodosComplete(): Promise<boolean> {
    const todoList = (await this.getTodoData()).map(
      todo => todo != undefined && todo.completed !== undefined && todo.completed
    );
    return todoList.every(todo => todo);
  }
}
