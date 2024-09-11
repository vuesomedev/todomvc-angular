import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
// import { cold } from 'jasmine-marbles';
import { createStore } from './index';
import { TodoStateInterface } from './todo-state.interface';
import { onCreate } from './todo/todo.action';

describe('createStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(createStore())]
    });
  });

  it("", async() => {});

  // it('should create a new instance of store', () => {
  //   const store: Store<TodoStateInterface> = TestBed.inject(Store);

  //   const expectedTodos = cold('a', { a: [] });
  //   const expectedFilter = cold('a', { a: 'all' });
  //   expect(store.select('todos')).toBeObservable(expectedTodos);
  //   expect(store.select('filter')).toBeObservable(expectedFilter);
  // });

  // it('should add new todo', () => {
  //   const store: Store<TodoStateInterface> = TestBed.inject(Store);

  //   store.dispatch(onCreate({ id: '1', name: 'Demo' }));

  //   const expectedTodos = cold('a', { a: [{ id: expect.any(String), name: 'Demo', completed: false }] });
  //   expect(store.select('todos')).toBeObservable(expectedTodos);
  // });
});
