import { FILTERS } from '../../constants/filter';
import { TodoInterface } from '../../services/todo.interface';
import { TodoStateInterface } from '../todo-state.interface';
import { createSelector } from '@ngrx/store';

export function selectVisible({ todos, filter }: TodoStateInterface) {
  switch (filter) {
    case FILTERS.all:
      return [...todos];
    case FILTERS.completed:
      return selectCompleted(todos);
    case FILTERS.active:
      return selectNotCompleted(todos);
    default:
      return [...todos];
  }
}

export const selectAllCompleted = createSelector(
  (state: TodoStateInterface) => state.todos,
  (todos: ReadonlyArray<TodoInterface>) => todos.length && todos.every(todo => todo.completed)
);

export const selectItemsLeft = createSelector(
  (state: TodoStateInterface) => state.todos,
  (todos: ReadonlyArray<TodoInterface>) => selectNotCompleted(todos).length
);

export const selectCompletedCount = createSelector(
  (state: TodoStateInterface) => state.todos,
  (todos: ReadonlyArray<TodoInterface>) => selectCompleted(todos).length
);

export function selectNotCompleted(todos: ReadonlyArray<TodoInterface>): ReadonlyArray<TodoInterface> {
  return todos.filter(todo => !todo.completed);
}

export function selectCompleted(todos: ReadonlyArray<TodoInterface>): ReadonlyArray<TodoInterface> {
  return todos.filter(todo => todo.completed);
}
