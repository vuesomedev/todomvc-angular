import { ComponentHarness, TestElement } from '@angular/cdk/testing';
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
    const toggle = await this._toggle();
    const isChecked = await toggle.hasClass('checked');
    if (!isChecked) {
      await this.toggle();
    }
  }

  async uncheck(): Promise<void> {
    const toggle = await this._toggle();
    const isChecked = await toggle.hasClass('checked');
    if (isChecked) {
      await this.toggle();
    }
  }

  async getId(): Promise<string | null> {
    const label = await this._todoLabel();
    return label.getAttribute('id');
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
    const isComplete = await this.isCompleted();
    const editInput = await this._editInput();
    const label = await this._todoLabel();
    if (name && editInput) {
      await editInput.clear();
      await editInput.sendKeys(name);
      await editInput.blur();
      await label.click();
    }
    if (completed !== isComplete) {
      await this.toggle();
    }
  }
}
