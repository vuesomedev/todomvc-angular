import { createSelector } from '@ngrx/store';

export const selectFilter = (state: { filter: string }) => state.filter;
