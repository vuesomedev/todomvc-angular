import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CopyRightComponent } from './copy-right.component';
import { CopyRightHarness } from './copy-right.component.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('CopyRightComponent', () => {
  let fixture: ComponentFixture<CopyRightComponent>;
  let harness: CopyRightHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CopyRightComponent]
}).compileComponents();

    fixture = TestBed.createComponent(CopyRightComponent);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, CopyRightHarness);
  });

  it('should have "app-copy-right" as the hostSelector for harness', async () => {
    expect(CopyRightHarness.hostSelector).toEqual('app-copy-right');
  });

  it('should render component', async () => {
    const info = await harness.getInfo();

    expect(info).toContain('Double-click to edit a todo');
    expect(info).toContain('Created by blacksonic');
    expect(info).toContain('Part of TodoMVC');
  });
});

