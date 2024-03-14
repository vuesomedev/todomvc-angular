import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TodoService } from 'src/app/services/todo.service';
import { AppComponent } from './app.component';
import { AppHarness } from './app.component.harness';
import { provideStore } from '@ngrx/store';
import { createStore } from 'src/app/store';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { AddTodo, UpdateTodo } from 'src/app/store/todo-state.interface';
import { TodoInterface } from 'src/app/services/todo.interface';
import { parallel } from '@angular/cdk/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let todoService: TodoService;
  let harness: AppHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [TodoService, provideStore(createStore())]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, AppHarness);
  });

  afterEach(async () => {
    const [todos] = subscribeSpyTo(todoService.getTodos()).getValues() as TodoInterface[][];
    todoService.deleteTodos(todos.map(todo => todo.id));
    await harness.viewAllTodos();
  });

  it('should return HeaderHarness', async () => {
    expect(await harness.getHeader()).toBeDefined();
  });

  it('should return a FooterHarness', async () => {
    const todoName = 'Test001';
    await harness.addTodo(todoName);

    expect(await harness.getFooter()).toBeDefined();
  });

  it('should return null for a FooterHarness if no todos are defined', async () => {
    const footerHarness = await harness.getFooter();

    expect(footerHarness).toBeNull();
  });

  it('should return null for a ListHarness if no todos are defined', async () => {
    const footerHarness = await harness.getFooter();

    expect(footerHarness).toBeNull();
  });

  it('should return a ListHarness', async () => {
    const todoName = 'Test001';
    await harness.addTodo(todoName);

    expect(await harness.getList()).toBeDefined();
  });

  it('should return a CopyRightHarness', async () => {
    const todoName = 'Test001';
    await harness.addTodo(todoName);

    expect(await harness.getCopyright()).toBeDefined();
  });

  it('should add a todo', async () => {
    const todoName = 'Test001';
    await harness.addTodo(todoName);

    const todos = subscribeSpyTo(todoService.getTodos()).getValues();

    expect(todos.length).toBe(1);
  });

  it('should update a todo by Id', async () => {
    const todoToAdd: AddTodo = { id: '1', name: 'Test001' };
    todoService.addTodo(todoToAdd);
    const updatedTodo: UpdateTodo = { name: 'Test002', completed: true };

    await harness.updateTodo(todoToAdd.id, updatedTodo);
    const [todo] = subscribeSpyTo(todoService.getTodoById(todoToAdd.id)).getValues();

    expect(todo).toEqual({
      id: todoToAdd.id,
      name: updatedTodo.name,
      completed: updatedTodo.completed
    });
  });

  it('should delete a todo by Id', async () => {
    const todoToAdd: AddTodo = { id: '1', name: 'Test001' };
    todoService.addTodo(todoToAdd);

    await harness.deleteTodo(todoToAdd.id);
    const [todo] = subscribeSpyTo(todoService.getTodos()).getValues();

    expect(todo.length).toEqual(0);
  });

  it('should mark all todos as complete', async () => {
    const todo1: AddTodo = { id: '1', name: 'Test001' };
    const todo2: AddTodo = { id: '2', name: 'Test002' };
    todoService.addTodo(todo1);
    todoService.addTodo(todo2);

    const expectedTodos: TodoInterface[] = [
      {
        ...todo1,
        completed: true
      },
      {
        ...todo2,
        completed: true
      }
    ];

    await harness.markAllTodosAsComplete();

    const [todos] = subscribeSpyTo(todoService.getTodos()).getValues() as TodoInterface[][];

    expect(todos).toEqual(expectedTodos);
  });

  it('should delete all todos', async () => {
    const todo1: AddTodo = { id: '1', name: 'Test001' };
    const todo2: AddTodo = { id: '2', name: 'Test002' };
    todoService.addTodo(todo1);
    todoService.addTodo(todo2);

    await harness.deleteTodos();
    const listHarness = await harness.getList();

    expect(listHarness).toBeNull();
  });

  it('should mark single todo by Id', async () => {
    const todo1: AddTodo = { id: '1', name: 'Test001' };
    const todo2: AddTodo = { id: '2', name: 'Test002' };
    todoService.addTodo(todo1);
    todoService.addTodo(todo2);

    await harness.markAsComplete(todo2.id);
    const listHarness = await harness.getList();
    if (listHarness) {
      const [todos] = await parallel(() => [listHarness.getTodoData()]);

      expect(todos).toEqual([
        {
          id: todo1.id,
          name: todo1.name,
          completed: false
        },
        {
          id: todo2.id,
          name: todo2.name,
          completed: true
        }
      ]);
    }
  });

  it('should delete a single todo by Id', async () => {
    const todo1: AddTodo = { id: '1', name: 'Test001' };
    const todo2: AddTodo = { id: '2', name: 'Test002' };
    todoService.addTodo(todo1);
    todoService.addTodo(todo2);
    const expectedTodo: TodoInterface = { id: '2', name: 'Test002', completed: false };

    await harness.deleteTodo(todo1.id);
    const [retrievedTodo] = await harness.getTodos();
    const retrievedTodoData = await retrievedTodo.getTodoData();

    expect(retrievedTodoData).toEqual(expectedTodo);
  });

  it('should return an empty array for no todos', async () => {
    const retrievedTodos = await harness.getTodos();

    expect(retrievedTodos).toEqual([]);
  });

  it('should display all todos', async () => {
    const expectedTodos = [
      {
        id: jasmine.any(String),
        name: 'Test001',
        completed: false
      },
      {
        id: jasmine.any(String),
        name: 'Test002',
        completed: false
      }
    ];
    const todo1 = 'Test001';
    const todo2 = 'Test002';
    await harness.addTodo(todo1);
    await harness.addTodo(todo2);

    const retrievedTodos = await harness.getTodosData();

    expect(retrievedTodos).toEqual(expectedTodos);
  });

  it('should return empty todo data', async () => {
    const retrievedTodos = await harness.getTodosData();

    expect(retrievedTodos).toEqual([]);
  });

  it('should display active todos', async () => {
    const expectedTodo = [
      {
        id: jasmine.any(String),
        name: 'Test002',
        completed: false
      }
    ];

    const todo1 = 'Test001';
    const todo2 = 'Test002';
    await harness.addTodo(todo1);
    await harness.addTodo(todo2);

    const [firsTodoHarness] = await harness.getTodos();

    await firsTodoHarness.check();

    await harness.viewActiveTodos();
    const todos = await harness.getTodosData();

    expect(todos).toEqual(expectedTodo);
  });

  it('should show completed todos', async () => {
    const expectedTodo = [
      {
        id: jasmine.any(String),
        name: 'Test001',
        completed: true
      }
    ];

    const todo1 = 'Test001';
    const todo2 = 'Test002';
    await harness.addTodo(todo1);
    await harness.addTodo(todo2);

    const [firsTodoHarness] = await harness.getTodos();

    await firsTodoHarness.check();

    await harness.viewCompletedTodos();

    const todos = await harness.getTodosData();

    expect(todos).toEqual(expectedTodo);
  });

  it('should clear completed todos', async () => {});
});
