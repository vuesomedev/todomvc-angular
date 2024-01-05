import { TodoInterface } from '../services/todo.interface';

export interface TodoStateInterface {
  todos: TodoInterface[];
  filter: string;
}

export type AddTodo = Omit<TodoInterface, 'complete'>;

export type UpdateTodo = Omit<TodoInterface, 'id'>;
