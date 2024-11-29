import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent, HeaderComponent } from '../layout';

@Component({
  selector: 'ala-advent-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <ala-header />

    <main>
      <router-outlet />
    </main>

    <ala-footer />
  `,
})
export default class AdventLayoutComponent {}
