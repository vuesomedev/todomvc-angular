import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngrx/store';
import { HeaderComponent } from './header.component';
import { createStore } from '../../store/index';
import { HeaderHarness } from './header.component.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let harness: HeaderHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideStore(createStore())]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, HeaderHarness);
  });

  it('should add new todo to store', async () => {
    const expectedTodos = of([{ id: expect.any(String), name: 'Demo', completed: false }]);
    const expected = subscribeSpyTo(expectedTodos).getValues();
    const store = TestBed.inject(Store);

    await harness.addTodo('Demo');

    const actual = subscribeSpyTo(store.select('todos')).getValues();

    expect(actual).toEqual(expected);
  });
});
