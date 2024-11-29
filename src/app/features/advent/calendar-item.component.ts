import { ContentFile } from '@analogjs/content';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSnowflake } from '@ng-icons/lucide';

import PostAttributes from '../../shared/post-attributes';

@Component({
  standalone: true,
  selector: 'ala-calendar-item',
  template: `
    <a
      class="group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-lg p-2 font-medium shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
      [ngClass]="{
        'bg-background hover:bg-muted hover:shadow-lg focus:ring-[#8514F5]':
          content(),
        'bg-muted text-muted-foreground cursor-not-allowed blur-sm': !content(),
      }"
      [routerLink]="link()"
      [tabindex]="content() ? '0' : '-1'"
    >
      <span class="relative z-10 flex items-center text-sm md:text-xl">
        <ng-icon
          name="lucideSnowflake"
          class="mr-2 !p-0 text-blue-400 duration-300"
          [class.transition-transform]="content()"
          [class.group-hover:rotate-45]="content()"
        />
        <span class="flex items-center self-center text-center">
          {{ day() }}
        </span>
      </span>

      <span
        class="absolute bottom-0 left-0 h-1 w-full translate-y-full transform bg-gradient-to-r from-[#0546FF] via-[#8514F5] to-[#FA2C04] transition-transform duration-300"
        [class.group-hover:translate-y-0]="!!content()"
        [class.opacity-50]="!content()"
      ></span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RouterLink, NgClass],
  viewProviders: [provideIcons({ lucideSnowflake })],
})
export class CalendarItemComponent {
  readonly day = input.required<number>();
  readonly content = input<ContentFile<PostAttributes> | null>();

  readonly link = computed(() =>
    this.content() ? ['/event/', this.content()?.attributes.slug] : [],
  );
}
