import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent, HeaderComponent } from '../layout';
import { FallingSnowService } from '../shared/services';

@Component({
  selector: 'ala-advent-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  providers: [FallingSnowService],
  template: `
    <ala-header />

    <main>
      <router-outlet />
    </main>

    <ala-footer />
  `,
})
export default class AdventLayoutComponent {
  private readonly _snowService = inject(FallingSnowService);

  constructor() {
    afterNextRender(() => {
      this._snowService.init();
    });
  }
}
