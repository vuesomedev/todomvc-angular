import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { FooterComponent } from './footer.component';
import { FooterHarness } from './footer.component.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { createStore } from 'src/app/store';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let harness: FooterHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideStore(createStore())]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, FooterHarness);
  });

  it('should have 3 filters "All", "Active" and "Completed"', async () => {
    const filters = await harness.getFilters();

    expect(filters).toEqual(['All', 'Active', 'Completed']);
  });

  it('should have the "All" filter active by default', async () => {
    const isAllFilterSelected = await harness.isFilterSelected('All');

    expect(isAllFilterSelected).toBe(true);
  });

  it('should have the "Active" filter selected', async () => {
    await harness.clickFilter('Active');

    const isActiveFilterSelected = await harness.isFilterSelected('Active');

    expect(isActiveFilterSelected).toBe(true);
  });

  it('should have the "Completed" filter selected', async () => {
    await harness.clickFilter('Completed');

    const isActiveFilterSelected = await harness.isFilterSelected('Completed');

    expect(isActiveFilterSelected).toBe(true);
  });

  it('should not have the "Active" selected when "Completed" is selected', async () => {
    await harness.clickFilter('Completed');

    const isActiveFilterSelected = await harness.isFilterSelected('Active');

    expect(isActiveFilterSelected).toBe(false);
  });

  it('should return the total amount of todos left', async () => {
    const totalTodos = await harness.getTodoCount();

    expect(totalTodos).toBe(0);
  });

  it('should return the total amount of todos left in the form of text', async () => {
    const totalTodosText = await harness.getTodoCountText();

    expect(totalTodosText).toBe('0 items left');
  });

  it('should clear all completed todos', async () => {
    await harness.clearCompleted();
  });
});
