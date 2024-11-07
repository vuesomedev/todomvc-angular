import { ComponentHarness, TestElement, parallel } from '@angular/cdk/testing';
import { TodoInterface } from 'src/app/services/todo.interface';
import { UpdateTodo } from 'src/app/store/todo-state.interface';

export class ItemHarness extends ComponentHarness {
  static readonly hostSelector = 'app-item';

  private _toggle = this.locatorFor('.toggle');
  private _todoLabel = this.locatorFor('label');
  private _listItem = this.locatorFor('li');
  private _editInput = this.locatorForOptional('.edit');
  private _remove = this.locatorFor('.destroy');

  async toggle(): Promise<void> {
    const toggle = await this._toggle();
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
    const label = await this._todoLabel();
    const id = await label.getAttribute('id');
    return id ?? '';
  }

  async getTodoLabel(): Promise<string> {
    const label = await this._todoLabel();
    return label.text();
  }

  async isCompleted(): Promise<boolean> {
    const toggle = await this._listItem();
    return toggle.hasClass('completed');
  }

  async isEditModeEnabled(): Promise<boolean> {
    const toggle = await this._editInput();
    return toggle ? toggle.hasClass('edit') : false;
  }

  async remove(): Promise<void> {
    const remove = await this._remove();
    await remove.click();
  }

  async enabledEditMode(): Promise<void> {
    const label = await this._todoLabel();
    await label.dispatchEvent('dblclick');
  }

  async edit(todoToUpdate: UpdateTodo): Promise<void> {
    const { name, completed } = todoToUpdate;
    await this.enabledEditMode();
    const [label, editInput, isComplete] = await parallel(() => [
      this._todoLabel(),
      this._editInput(),
      this.isCompleted()
    ]);
    if (name && editInput) {
      await editInput.clear();
      await editInput.sendKeys(name);
      await editInput.blur();
      await label.click();
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
