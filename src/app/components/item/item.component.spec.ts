import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { ItemHarness } from './item.component.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideStore } from '@ngrx/store';
import { createStore } from 'src/app/store';
import { TodoService } from 'src/app/services/todo.service';
import { TodoInterface } from 'src/app/services/todo.interface';

describe('ItemComponent', () => {
  let fixture: ComponentFixture<ItemComponent>;
  let component: ItemComponent;
  let todoService: TodoService;
  let harness: ItemHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent],
      providers: [provideStore(createStore())]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
  });

  it('should display todo item', async () => {
    component.todo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: false };
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ItemHarness);

    const label = await harness.getTodoLabel();

    expect(label).toEqual('Demo');
  });

  it('should mark todo item as completed', async () => {
    component.todo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: false };
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ItemHarness);

    component.update.subscribe(emittedTodo => (component.todo = emittedTodo));
    await harness.toggle();

    expect(component.todo.completed).toEqual(true);
  });

  it('should mark todo item as incomplete', async () => {
    component.todo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: true };
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ItemHarness);

    component.update.subscribe(emittedTodo => (component.todo = emittedTodo));
    await harness.toggle();

    expect(component.todo.completed).toEqual(false);
  });

  it('should enable edit mode', async () => {
    component.todo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: false };
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ItemHarness);

    await harness.enabledEditMode();
    const isEditEnabled = await harness.isEditModeEnabled();

    expect(isEditEnabled).toEqual(true);
  });

  it('should have edit mode off', async () => {
    component.todo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: false };
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ItemHarness);

    const isEditEnabled = await harness.isEditModeEnabled();

    expect(isEditEnabled).toEqual(false);
  });

  it('should notify about remove button', async () => {
    component.todo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: true };
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ItemHarness);
    let retrievedTodoId = '';

    component.remove.subscribe(id => (retrievedTodoId = id));
    await harness.remove();

    expect(retrievedTodoId).toEqual(component.todo.id);
  });

  it('should notify about update button', async () => {
    component.todo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: false };
    const expectedTodo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', completed: true };
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ItemHarness);
    let retrievedTodo: TodoInterface = { id: '', name: '', completed: false };

    component.update.subscribe(emittedTodo => (retrievedTodo = emittedTodo));

    await harness.edit({ name: 'Demo Update', completed: true });

    expect(retrievedTodo).toEqual(expectedTodo);
  });

  it('should get todo data', async () => {
    component.todo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: false };
    const expectedTodo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: false };
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ItemHarness);

    const todo = await harness.getTodoData();

    expect(todo).toEqual(expectedTodo);
  });
});
