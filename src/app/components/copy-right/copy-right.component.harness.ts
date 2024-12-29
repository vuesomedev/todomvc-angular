import { ComponentHarness } from '@angular/cdk/testing';

export class CopyRightHarness extends ComponentHarness {
  static readonly hostSelector = 'app-copy-right';

  async getInfo(): Promise<string> {
    return (await this.host()).text();
  }
}
