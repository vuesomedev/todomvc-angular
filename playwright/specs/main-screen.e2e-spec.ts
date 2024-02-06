import { expect, createTest } from '@ngx-playwright/test';

import { MainScreen } from '../screens/main-screen.js';

const test = createTest(MainScreen);
test.use({ harnessEnvironmentOptions: { useLocators: true }, enableAutomaticStabilization: false });

test.describe('the main screen of the application', () => {
  test.beforeEach(({}) => {});

  test('it should have a title', ({ $: { title } }) => {
    expect(title).toBeTruthy();
  });

  test('should return an empty list of todos', async ({ $: { getTodos } }) => {
    expect(getTodos).toHaveLength(0);
  });

  test('should add a todo', async ({ harnessEnvironment }) => {
    const harness = await harnessEnvironment.getHarness(MainScreen);

    await harness.addTodo('Hang Washing');
    const expectedTodos = await harness.getTodosData();

    expect(expectedTodos).toEqual([{ id: expect.any(String), name: 'Hang Washing', completed: false }]);
  });

  test('should update a todo', async ({ harnessEnvironment }) => {
    const harness = await harnessEnvironment.getHarness(MainScreen);

    await harness.addTodo('Hang Washing');
    const [firstTodo] = await harness.getTodosData();
    await harness.updateTodo(firstTodo.id, { name: 'Fold Washing' });
    const retrievedTodos = await harness.getTodosData();

    expect(retrievedTodos).toEqual([{ id: expect.any(String), name: 'Fold Washing', completed: false }]);
  });

  test('should mark all todos as complete', async ({ harnessEnvironment }) => {
    const harness = await harnessEnvironment.getHarness(MainScreen);

    await harness.addTodo('Hang Washing');
    await harness.addTodo('Fold Washing');
    await harness.markAllTodosAsComplete();

    const retrievedTodos = await harness.getTodosData();

    expect(retrievedTodos).toEqual([
      { id: expect.any(String), name: 'Hang Washing', completed: true },
      { id: expect.any(String), name: 'Fold Washing', completed: true }
    ]);
  });
  
  test('should clear all completed todos', async ({ harnessEnvironment, $: { host } }) => {
    const harness = await harnessEnvironment.getHarness(MainScreen);

    await harness.addTodo('Hang Washing');
    await harness.addTodo('Fold Washing');
    await harness.markAllTodosAsComplete();
    await harness.clearAllCompletedTodos();

    const retrievedTodos = await harness.getTodosData();

    const el = harnessEnvironment.getPlaywrightLocator(host);

    expect(retrievedTodos).toEqual([]);
    expect(el).toHaveScreenshot("test.png")
  });
});
