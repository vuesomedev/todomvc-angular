import { createTodoReducer } from './todo.reducer';
import { onCreate, onLoad, onRemove, onUpdate } from './todo.action';

describe('todosReducer', () => {
  it('should set list of items on load', () => {
    const expectedTodos = [{ id: 'e2bb892a', name: 'Demo', completed: false }];

    const todos = createTodoReducer([])([], onLoad(expectedTodos));

    expect(todos).toEqual(expectedTodos);
    expect(todos.length).toEqual(1);
    expect(todos).toContain(expectedTodos[0]);
  });

  it('should create new todo', () => {
    const todos = createTodoReducer([])([], onCreate({ id: '1', name: 'Demo' }));

    expect(todos.length).toEqual(1);
    expect(todos[0].id).toEqual(expect.any(String));
    expect(todos[0].name).toEqual('Demo');
    expect(todos[0].completed).toEqual(false);
  });

  it('should update existing todo', () => {
    const initialState = [{ id: 'e2bb892a', name: 'Demo', completed: false }];

    const todos = createTodoReducer([])(initialState, onUpdate({ id: 'e2bb892a', name: 'Demo2' }));

    expect(todos[0].name).toEqual('Demo2');
  });

  it('should remove existing todo', () => {
    const initialState = [{ id: 'e2bb892a', name: 'Demo', completed: false }];

    const todos = createTodoReducer([])(initialState, onRemove('e2bb892a'));

    expect(todos.length).toEqual(0);
  });
});
