import { ComponentHarness, parallel } from '@angular/cdk/testing';
import { ItemHarness } from '../item/item.component.harness';
import { UpdateTodo } from 'src/app/store/todo-state.interface';
import { TodoInterface } from 'src/app/services/todo.interface';

type TodoFilter = { isCompleted?: boolean };

export class ListHarness extends ComponentHarness {
  static readonly hostSelector = 'app-list';

  private todos = this.locatorForAll(ItemHarness);

  async getTodos({ isCompleted }: TodoFilter = {}) {
    const todos = await this.todos();
    const todoList: ItemHarness[] = [];
    if (isCompleted === undefined) {
      return todos;
    }
    for (const todo of todos) {
      const isComplete = await todo.isCompleted();
      if (isComplete === isCompleted) todoList.push(todo);
    }
    return todoList;
  }

  async getTodoById(id: string): Promise<ItemHarness | undefined> {
    const todoList = await this.getTodos();
    for (const todo of todoList) {
      const todoId = await todo.getId();
      if (todoId === id) {
        return todo;
      }
    }
    return;
  }

  async getTodoDataById(todoId: string): Promise<TodoInterface | undefined> {
    const todoList = await this.getTodos();

    const todos = await parallel(() => todoList.map((todo) => parallel(() => [todo.getId(), todo.getTodoLabel(), todo.isCompleted()])));
    const todoFound = todos.find(todo => todo[0] === todoId);
    if (!todoFound) return;
    const [id, name, completed] = todoFound;
    const todo: TodoInterface = {
      id: id ?? '',
      name,
      completed,
    }
    return todo;
  }

  async removeTodoById(id: string) {
    const todo = await this.getTodoById(id);
    if (todo) await todo.remove();
  }

  async removeAllTodos() {
    const todoList = await this.getTodos();
    for (const todo of todoList) {
      await todo.remove();
    }
  }

  async updateTodo(id: string, todo: UpdateTodo) {
    const todoItem = await this.getTodoById(id);
    if (todoItem) await todoItem.edit(todo);
  }

  async markAllTodosAsComplete() {
    const todoList = await this.getTodos();
    for (const todo of todoList) {
      await todo.check();
    }
  }

  async areAllTodosCompleted(): Promise<boolean>{
    const todoList = await this.getTodos();
    for (const todo of todoList) {
      const isComplete = await todo.isCompleted();
      if (!isComplete) return isComplete;
    }
    return true;
  }
}
