import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  simpleFacebook,
  simpleLinkedin,
  simpleX,
} from '@ng-icons/simple-icons';

@Component({
  standalone: true,
  selector: 'ala-footer',
  template: `
    <footer class="flex flex-col items-center justify-center gap-2 p-4">
      <strong>
        Made with
        <a class="text-primary underline" href="https://analogjs.org/">
          AnalogJS
        </a>
        ❤️
      </strong>
      <section class="flex gap-4">
        <a href="https://x.com/AngularLovePL">
          <ng-icon name="simpleX" class="text-2xl" />
        </a>

        <a href="https://www.linkedin.com/company/angular-love">
          <ng-icon name="simpleLinkedin" class="text-2xl" />
        </a>

        <a href="https://www.facebook.com/www.angular.love">
          <ng-icon name="simpleFacebook" class="text-2xl" />
        </a>
      </section>

      <span>Copyright © 2024</span>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  viewProviders: [provideIcons({ simpleX, simpleLinkedin, simpleFacebook })],
})
export class FooterComponent {}
