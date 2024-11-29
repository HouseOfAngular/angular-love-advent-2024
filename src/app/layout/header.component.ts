import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHouse, lucideInfo } from '@ng-icons/lucide';

@Component({
  standalone: true,
  selector: 'ala-header',
  template: `
    <nav class="flex items-center justify-between">
      <a class="flex items-center gap-2" [routerLink]="['/advent']">
        <img
          src="angular-love-logo.webp"
          alt="Home Page"
          width="36"
          height="42"
        />
        <span class="text-primary hidden font-bold md:block">angular.love</span>
      </a>

      <section class="flex gap-4">
        <a class="flex items-center gap-2" [routerLink]="['/advent']">
          <ng-icon name="lucideHouse" class="" />
          Home
        </a>

        <a class="flex items-center gap-2" [routerLink]="['/advent', 'about']">
          <ng-icon name="lucideInfo" class="" />
          About
        </a>
      </section>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RouterLink],
  viewProviders: [provideIcons({ lucideHouse, lucideInfo })],
})
export class HeaderComponent {}
