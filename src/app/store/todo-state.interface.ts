import { TodoInterface } from '../services/todo.interface';

export interface TodoStateInterface {
  todos: TodoInterface[];
  filter: string;
}

export type AddTodo = { __typename?: 'AddTodo' } & Omit<TodoInterface, 'complete'>;

export type UpdateTodo = { __typename?: "UpdateTodo" } & TodoInterface;
