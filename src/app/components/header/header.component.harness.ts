import { ComponentHarness, TestKey } from '@angular/cdk/testing';

export class HeaderHarness extends ComponentHarness {
  static readonly hostSelector = 'app-header';

  private _addTodo = this.locatorFor('input');

  async addTodo(name: string): Promise<void> {
    const input = await this._addTodo();
    await input.clear();
    await input.sendKeys(name, TestKey.ENTER);
  }
}
