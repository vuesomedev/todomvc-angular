export type FilterTypes = 'All' | 'Active' | 'Completed';

export type Filters = 'all' | 'active' | 'completed';

export type FiltersObj = {
  key: Filters;
  value: FilterTypes;
};

export const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed'
};
