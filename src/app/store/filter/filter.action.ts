import { createAction } from '@ngrx/store';
import { ACTION_TYPES } from '../../constants/action-type';

export const onFilterSelect = createAction(ACTION_TYPES.selectFilter, (filter: string) => ({ filter }));
