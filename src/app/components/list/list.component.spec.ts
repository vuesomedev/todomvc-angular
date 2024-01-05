import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { provideStore } from '@ngrx/store';
import { createStore } from 'src/app/store';
import { ListHarness } from './list.component.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TodoService } from 'src/app/services/todo.service';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { TodoInterface } from 'src/app/services/todo.interface';
import { AddTodo } from 'src/app/store/todo-state.interface';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let component: ListComponent;
  let harness: ListHarness;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [TodoService, provideStore(createStore())]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ListHarness);
  });

  it('should return an empty list of todo items', async () => {
    const todos = await harness.getTodos();

    expect(todos.length).toEqual(0);
  });

  it('should return a list of todo items', async () => {
    const todo: AddTodo = { id: '1', name: 'Demo' };
    todoService.addTodo(todo);

    const todos = await harness.getTodos();

    expect(todos.length).toEqual(1);
  });

  it('should return a list of completed todos', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo' };
    const todo2: AddTodo = { id: '2', name: 'Demo' };
    todoService.addTodo(todo1);
    todoService.addTodo(todo2);

    const [firstTodo] = subscribeSpyTo(todoService.getTodos()).getValues()[0];
    todoService.updateTodo({ id: firstTodo.id, completed: true });

    const completedTodos = await harness.getTodos({ isCompleted: true });

    expect(completedTodos.length).toEqual(1);
  });

  it('should return a list of incomplete todos', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo' };
    const todo2: AddTodo = { id: '2', name: 'Demo' };
    todoService.addTodo(todo1);
    todoService.addTodo(todo2);

    const [firstTodo] = subscribeSpyTo(todoService.getTodos()).getValues()[0];
    todoService.updateTodo({ id: firstTodo.id, completed: true });

    const completedTodos = await harness.getTodos({ isCompleted: false });

    expect(completedTodos.length).toEqual(1);
  });

  // it('should remove all todos with a specific name', async () => {
  //   const todo1: AddTodo = { id: '1', name: 'Demo' };
  //   const todo2: AddTodo = { id: '2', name: 'Demo' };
  //   const todo3: AddTodo = { id: '3', name: 'Demo' };
  //   todoService.addTodo(todo1);
  //   todoService.addTodo(todo2);
  //   todoService.addTodo(todo3);

  //   await harness.removeAllTodos();
  //   const todos = await harness.getTodos();

  //   expect(todos.length).toEqual(0);
  // });

  it('should return undefined for a todo that does not exist', async () => {
    const todo = await harness.getTodoById('1');

    expect(todo).toBeUndefined();
  });

  it('should return undefined for todo data that does not exist', async () => {
    const todo = await harness.getTodoDataById('1');

    expect(todo).toBeUndefined();
  });

  it('should remove a todo by Id', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo' };
    todoService.addTodo(todo1);

    await harness.removeTodoById(todo1.id);
    const todos = await harness.getTodos();

    expect(todos.length).toEqual(0);
  });

  it('should update a todo', async () => {
    const expectedTodo: TodoInterface = { id: '1', name: 'Demo 2', completed: true };
    const todo1: AddTodo = { id: '1', name: 'Demo', completed: false };
    todoService.addTodo(todo1);

    await harness.updateTodo(todo1.id, { name: 'Demo 2', completed: true });
    const retrievedTodo = await harness.getTodoDataById(todo1.id);

    expect(retrievedTodo).not.toBeUndefined();
    expect(retrievedTodo).toEqual(expectedTodo);
  });

  it('should mark all todos as complete', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo' };
    const todo2: AddTodo = { id: '2', name: 'Demo' };
    todoService.addTodo(todo1);
    todoService.addTodo(todo2);

    await harness.markAllTodosAsComplete();
    const areAllTodoComplete = await harness.areAllTodosCompleted();

    expect(areAllTodoComplete).toBe(true);
  });

  it('should return false if all todos are not completed', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo' };
    const todo2: AddTodo = { id: '2', name: 'Demo', completed: true };
    todoService.addTodo(todo1);
    todoService.addTodo(todo2);

    const areAllTodoComplete = await harness.areAllTodosCompleted();

    expect(areAllTodoComplete).toBe(false);
  });

  it('should uncheck todo when checked', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo' };
    todoService.addTodo(todo1);

    const todo = await harness.getTodoById(todo1.id);
    if (todo) await todo.check();
    const retrievedTodo = await harness.getTodoDataById(todo1.id);

    expect(retrievedTodo?.completed).toEqual(true);
  });

  it('should check todo when unchecked', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo', completed: true };
    todoService.addTodo(todo1);

    const todo = await harness.getTodoById(todo1.id);
    if (todo) await todo.uncheck();
    const retrievedTodo = await harness.getTodoDataById(todo1.id);

    expect(retrievedTodo?.completed).toEqual(false);
  });

  it('should not uncheck todo when already unchecked', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo' };
    todoService.addTodo(todo1);

    const todo = await harness.getTodoById(todo1.id);
    if (todo) await todo.uncheck();
    const retrievedTodo = await harness.getTodoDataById(todo1.id);

    expect(retrievedTodo?.completed).toEqual(false);
  });

  it('should not check todo when already checked', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo', completed: false };
    todoService.addTodo(todo1);

    const todo = await harness.getTodoById(todo1.id);
    if (todo) await todo.uncheck();
    const retrievedTodo = await harness.getTodoDataById(todo1.id);

    expect(retrievedTodo?.completed).toEqual(false);
  });
});
