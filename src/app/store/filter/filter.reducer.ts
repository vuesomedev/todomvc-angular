import { createReducer, on } from '@ngrx/store';
import { FILTERS } from '../../constants/filter';
import { onFilterSelect } from './filter.action';

export const createFilterReducer = (initialState: string = FILTERS.all) =>
  createReducer(
    initialState,
    on(onFilterSelect, (_state, { filter }) => {
      return filter;
    })
  );
