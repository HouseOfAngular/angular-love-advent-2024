import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../layout';

@Component({
  selector: 'ala-advent-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <ala-header />

    <main>
      <router-outlet />
    </main>
  `,
})
export default class AdventLayoutComponent {}
