import { ACTION_TYPES } from "./action-type";

describe('ActionType', () => {










it('should create an instance', () => {
  expect(ACTION_TYPES).toEqual({
      clearCompleted: 'CLEAR_COMPLETED',
      completeAll: 'COMPLETE_ALL',
      create: 'CREATE',
      load: 'LOAD',
      remove: 'REMOVE',
      selectFilter: 'SELECT_FILTER',
      update: 'UPDATE'
  });
});});
