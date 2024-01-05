import { createReducer, on } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { TodoInterface } from '../../services/todo.interface';
import { onClearCompleted, onCompleteAll, onCreate, onLoad, onRemove, onUpdate } from './todo.action';
import { selectCompleted, selectNotCompleted } from './todo.selector';

const areAllCompleted = (state: ReadonlyArray<TodoInterface>) =>
  state.length && selectCompleted(state).length === state.length;

export const createTodoReducer = (initialState: ReadonlyArray<TodoInterface>) =>
  createReducer(
    initialState,
    on(onLoad, (state: ReadonlyArray<TodoInterface>, { todos }) => {
      return todos;
    }),
    on(onCreate, (state: ReadonlyArray<TodoInterface>, { todo }) => {
      return [...state, { id: todo.id ? todo.id : uuidv4(), name: todo.name, completed: false }];
    }),
    on(onUpdate, (state: ReadonlyArray<TodoInterface>, { values }) => {
      return state.map(todo => (todo.id === values.id ? { ...todo, ...values } : todo));
    }),
    on(onRemove, (state: ReadonlyArray<TodoInterface>, { id }) => {
      return state.filter(todo => todo.id !== id);
    }),
    on(onCompleteAll, (state: ReadonlyArray<TodoInterface>) => {
      return state.map(todo => ({ ...todo, ...{ completed: !areAllCompleted(state) } }));
    }),
    on(onClearCompleted, (state: ReadonlyArray<TodoInterface>) => {
      return selectNotCompleted(state);
    })
  );
