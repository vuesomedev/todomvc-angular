import { ComponentHarness, parallel } from '@angular/cdk/testing';
import { HeaderHarness } from '../header/header.component.harness';
import { ListHarness } from '../list/list.component.harness';
import { FooterHarness } from '../footer/footer.component.harness';
import { UpdateTodo } from 'src/app/store/todo-state.interface';
import { CopyRightHarness } from '../copy-right/copy-right.component.harness';

export class AppHarness extends ComponentHarness {
  static readonly hostSelector = 'app-root';

  #headerHarness = this.locatorFor(HeaderHarness);
  #listHarness = this.locatorForOptional(ListHarness);
  #footerHarness = this.locatorForOptional(FooterHarness);
  #copyRightHarness = this.locatorFor(CopyRightHarness);

  async getHeader(): Promise<HeaderHarness> {
    return await this.#headerHarness();
  }

  async getList(): Promise<ListHarness | null> {
    return await this.#listHarness();
  }

  async getFooter(): Promise<FooterHarness | null> {
    return await this.#footerHarness();
  }

  async getCopyright(): Promise<CopyRightHarness> {
    return await this.#copyRightHarness();
  }

  async addTodo(name: string): Promise<void> {
    const header = await this.#headerHarness();
    await header.addTodo(name);
  }

  async updateTodo(todo: UpdateTodo) {
    const list = await this.#listHarness();
    if (list !== null) {
      const { id } = todo;
      const todoRetrieved = await list.getTodoById(id);
      if (todoRetrieved !== undefined) await todoRetrieved.edit(todo);
    }
  }

  async deleteTodo(id: string) {
    const list = await this.#listHarness();
    if (list) {
      const todoRetrieved = await list.getTodoById(id);
      if (todoRetrieved) await todoRetrieved.remove();
    }
  }

  async deleteTodos() {
    const list = await this.#listHarness();
    if (list) await list.removeAllTodos();
  }

  async markAllTodosAsComplete() {
    const todoList = await this.#listHarness();
    if (todoList) await todoList.markAllTodosAsComplete();
  }

  async markAsComplete(id: string) {
    const list = await this.#listHarness();
    if (list) {
      const todoRetrieved = await list.getTodoById(id);
      if(!todoRetrieved) throw Error(`Failed to find todo with id ${id}`);
      return todoRetrieved.check();
    }
  }

  async getTodos() {
    const listHarness = await this.#listHarness();
    return listHarness ? await listHarness.getTodos() : [];
  }

  async getTodosData() {
    const listHarness = await this.#listHarness();
    return listHarness ? await listHarness.getTodoData() : [];
  }

  async viewActiveTodos() {
    const footerHarness = await this.#footerHarness();
    if (!footerHarness) throw Error('Footer not found');
    await footerHarness.clickFilter('Active');
  }

  async viewAllTodos() {
    const footerHarness = await this.#footerHarness();
    if (!footerHarness) throw Error('Footer not found');
    await footerHarness.clickFilter('All');
  }

  async viewCompletedTodos() {
    const footerHarness = await this.#footerHarness();
    if (!footerHarness) throw Error('Footer not found');
    await footerHarness.clickFilter('Completed');
  }
}
