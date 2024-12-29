import { createAction } from '@ngrx/store';
import { ACTION_TYPES } from '../../constants/action-type';
import { TodoInterface } from '../../services/todo.interface';

export const onLoad = createAction(ACTION_TYPES.load, (todos: TodoInterface[]) => ({ todos }));

export const onCreate = createAction(ACTION_TYPES.create, (todo: TodoInterface) => ({ todo }));

export const onRemove = createAction(ACTION_TYPES.remove, (id: string) => ({ id }));

export const onUpdate = createAction(ACTION_TYPES.update, (values: TodoInterface) => ({ values }));

export const onCompleteAll = createAction(ACTION_TYPES.completeAll);

export const onClearCompleted = createAction(ACTION_TYPES.clearCompleted);
