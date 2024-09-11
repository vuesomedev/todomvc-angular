import { ComponentHarness, TestElement, TestKey, parallel } from '@angular/cdk/testing';
import { TodoInterface } from 'src/app/services/todo.interface';
import { UpdateTodo } from 'src/app/store/todo-state.interface';

export class ItemHarness extends ComponentHarness {
  static readonly hostSelector = 'app-item';

  #toggle = this.locatorFor('.toggle');
  #todoLabel = this.locatorFor('label');
  #listItem = this.locatorFor('li');
  #editInput = this.locatorForOptional('.edit');
  #remove = this.locatorFor('.destroy');

  async toggle(): Promise<void> {
    const toggle = await this.#toggle();
    await toggle.click();
  }

  async check(): Promise<void> {
    const isChecked = await this.isCompleted();
    if (!isChecked) {
      await this.toggle();
    }
  }

  async uncheck(): Promise<void> {
    const isChecked = await this.isCompleted();
    if (isChecked) {
      await this.toggle();
    }
  }

  async getId(): Promise<string> {
    const label = await this.#todoLabel();
    const id = await label.getAttribute('id');
    return id ?? '';
  }

  async getTodoLabel(): Promise<string> {
    const label = await this.#todoLabel();
    return label.text();
  }

  async isCompleted(): Promise<boolean> {
    const toggle = await this.#listItem();
    return toggle.hasClass('completed');
  }

  async isEditModeEnabled(): Promise<boolean> {
    const toggle = await this.#editInput();
    return toggle ? toggle.hasClass('edit') : false;
  }

  async remove(): Promise<void> {
    const remove = await this.#remove();
    await remove.click();
  }

  async enabledEditMode(): Promise<void> {
    const label = await this.#todoLabel();
    await label.dispatchEvent('dblclick');
  }

  async disableEditMode(): Promise<void> {
    const editInput = await this.#editInput();
    if (editInput) {
      await editInput.blur();
    }
  }

  async edit(todoToUpdate: UpdateTodo): Promise<void> {
    const { name, completed } = todoToUpdate;
    await this.enabledEditMode();
    const [editInput, isComplete] = await parallel(() => [
      this.#editInput(),
      this.isCompleted()
    ]);
    if (name && editInput) {
      await editInput.clear();
      await editInput.sendKeys(name);
      await this.disableEditMode();
    }
    if (completed && completed !== isComplete) {
      await this.toggle();
    }
  }

  async getTodoData(): Promise<TodoInterface | undefined> {
    const [id, name, completed] = await parallel(() => [this.getId(), this.getTodoLabel(), this.isCompleted()]);
    return { id, name, completed };
  }
}
