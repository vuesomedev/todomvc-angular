import { createTodoReducer } from './todo/todo.reducer';
import { FILTERS } from '../constants/filter';
import { TodoStateInterface } from './todo-state.interface';
import { createFilterReducer } from './filter/filter.reducer';

export const createStore = (initialState: TodoStateInterface = { todos: [], filter: FILTERS.all }) => ({
  todos: createTodoReducer(initialState.todos),
  filter: createFilterReducer(initialState.filter)
});
