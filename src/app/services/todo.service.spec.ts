import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { createStore } from '../store';
import { provideStore } from '@ngrx/store';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { TodoInterface } from './todo.interface';
import { AddTodo } from '../store/todo-state.interface';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore(createStore())]
    });
    service = TestBed.inject(TodoService);
  });

  it('should add a todo', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo' };

    service.addTodo(todo1);
    const totalTodos = subscribeSpyTo(service.getTodos()).getValues().length;

    expect(totalTodos).toEqual(1);
  });

  it('should add a todo that is complete', async () => {
    const expectedTodo: AddTodo = { id: '1', name: 'Demo', completed: true };

    service.addTodo(expectedTodo);
    const [[retrievedTodo]] = subscribeSpyTo(service.getTodos()).getValues();

    expect(retrievedTodo).toEqual(expectedTodo);
  });

  it('should update a todo by Id', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo' };

    service.addTodo(todo1);

    const retrievedTodo = subscribeSpyTo(service.getTodos()).getValues()[0][0];
    const expectedTodo = { id: retrievedTodo.id, name: 'Demo Updated', completed: false };

    service.updateTodo(expectedTodo);

    const retrievedTodos = subscribeSpyTo(service.getTodos()).getValues()[0][0];

    expect(retrievedTodos).toEqual(expectedTodo);
  });

  it('should get a todo by Id', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo' };

    service.addTodo(todo1);
    const totalTodos = subscribeSpyTo(service.getTodos()).getValues().length;

    expect(totalTodos).toEqual(1);
  });

  it('should delete a todo by Id', async () => {
    const todo1: AddTodo = { id: '1', name: 'Demo' };

    service.addTodo(todo1);
    const todo = subscribeSpyTo(service.getTodos()).getValues()[0][0];
    service.deleteTodo(todo.id);
    const retrievedTodo = subscribeSpyTo(service.getTodos()).getValues()[0][0];

    expect(retrievedTodo).toBeUndefined();
  });

  it('should get completed todos', async () => {
    const expectedTodo = { id: expect.any(String), name: 'Demo', completed: true };

    const todo1: AddTodo = { id: '1', name: 'Demo' };

    service.addTodo(todo1);
    const [[todo]] = subscribeSpyTo(service.getTodos()).getValues();
    service.updateTodo({ id: todo.id, completed: true });
    const totalTodos = subscribeSpyTo(service.getCompletedTodos()).getValues()[0][0];

    expect(totalTodos).toEqual(expectedTodo);
  });

  it('should get todo by Id', async () => {
    const expectedTodo = { id: expect.any(String), name: 'Demo', completed: false };

    const todo1: AddTodo = { id: '1', name: 'Demo' };

    service.addTodo(todo1);
    const todo = subscribeSpyTo(service.getTodos()).getValues()[0][0];
    const retrievedTodo = subscribeSpyTo(service.getTodoById(todo.id)).getValues()[0];

    expect(retrievedTodo).toEqual(expectedTodo);
  });

  it('should indicate if all todos are complete', async () => {
    const firstTodo: AddTodo = { id: '1', name: 'Demo' };
    const secondTodo: AddTodo = { id: '2', name: 'Demo' };

    service.addTodo(firstTodo);
    service.addTodo(secondTodo);

    const [[todo1, todo2]] = subscribeSpyTo(service.getTodos()).getValues();

    service.updateTodo({ id: todo1.id, completed: true });
    service.updateTodo({ id: todo2.id, completed: true });

    const [retrievedResult] = subscribeSpyTo(service.completedTodos()).getValues();

    expect(retrievedResult).toEqual(true);
  });

  it('should indicate if all todos are not complete', async () => {
    const firstTodo: AddTodo = { id: '1', name: 'Demo' };
    const secondTodo: AddTodo = { id: '2', name: 'Demo' };

    service.addTodo(firstTodo);
    service.addTodo(secondTodo);

    service.updateTodo({ id: firstTodo.id, completed: true });

    const [retrievedResult] = subscribeSpyTo(service.completedTodos()).getValues();

    expect(retrievedResult).toEqual(false);
  });

  it('should toggle all todos as completed', async () => {
    const firstTodo: AddTodo = { id: '1', name: 'Demo' };
    const secondTodo: AddTodo = { id: '2', name: 'Demo' };

    service.addTodo(firstTodo);
    service.addTodo(secondTodo);

    service.toggleCompleted();

    const todos = subscribeSpyTo(service.getTodos()).getValues()[0];

    expect(todos).toEqual([
      { id: expect.any(String), name: 'Demo', completed: true },
      { id: expect.any(String), name: 'Demo', completed: true }
    ]);
  });

  it('should delete todos by ids', async () => {
    const firstTodo: AddTodo = { id: '1', name: 'Demo' };
    const secondTodo: AddTodo = { id: '2', name: 'Demo' };

    service.addTodo(firstTodo);
    service.addTodo(secondTodo);

    service.deleteTodos([firstTodo.id, secondTodo.id]);
  });


  it('should return items left', async () => {
    
  });

  it('should return "item" text for 1 todo', async () => {
    
  });

  it('should return "items" for more than 1 todo', async () => {
    
  });

  it('should retrieve current filter', async () => {
    
  });
});
