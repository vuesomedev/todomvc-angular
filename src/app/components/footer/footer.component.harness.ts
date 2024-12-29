import { ComponentHarness, TestElement, parallel } from '@angular/cdk/testing';

type FilterTypes = 'All' | 'Active' | 'Completed';

export class FooterHarness extends ComponentHarness {
  static readonly hostSelector = 'app-footer';

  private _todoCount = this.locatorFor('.todo-count strong');
  private _todoCountText = this.locatorFor('.todo-count');
  private _clearCompleted = this.locatorForOptional('.clear-completed');
  private _filters = this.locatorForAll('.filters a');

  async getTodoCount(): Promise<number> {
    const todoCountEl = await this._todoCount();
    const count = await todoCountEl.text();
    return +count;
  }

  async getTodoCountText(): Promise<string> { 
    const todoCountEl = await this._todoCountText();
    return await todoCountEl.text();
  }

  async clearCompleted(): Promise<void> {
    const clearCompletedEl = await this._clearCompleted();
    if (clearCompletedEl) {
      await clearCompletedEl.click();
    }
  }

  async getFilters(): Promise<FilterTypes[]> {
    const filters = await this._filters();
    return await parallel(() =>
      filters.map(async filterEl => {
        const text = await filterEl.text();
        return text as FilterTypes;
      })
    );
  }

  async clickFilter(filterText: FilterTypes): Promise<void> {
    const filters = await this._filters();
    for (const filter of filters) {
      const text = await filter.text();
      if (text === filterText) {
        await filter.click();
      }
    }
  }

  async isFilterSelected(filterText: FilterTypes): Promise<boolean> {
    const filters = await this._filters();
    let selected: TestElement | null = null;

    for (const filter of filters) {
      const text = await filter.text();
      if (text === filterText) { 
        selected = filter;
      }
    }
    
    return selected ? selected.hasClass("selected") : false;
  }
}
