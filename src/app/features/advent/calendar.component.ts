import { injectContentFiles } from '@analogjs/content';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import PostAttributes from '../../shared/post-attributes';

import { CalendarItemComponent } from './calendar-item.component';

@Component({
  standalone: true,
  selector: 'ala-calendar',
  template: `
    <div class="bg-background space-y-8 rounded-2xl p-6 shadow-lg">
      <h1
        class="bg-gradient-to-r from-[#0546FF] via-[#8514F5] to-[#FA2C04] bg-clip-text pb-2 text-center font-bold text-transparent"
      >
        Angular.love Calendar {{ currentYear }}
      </h1>

      <div class="grid grid-cols-7 gap-1 md:gap-2 lg:gap-4">
        @for (day of daysInWeek; track $index) {
          <div class="text-center font-semibold text-gray-600">
            {{ day }}
          </div>
        }

        @for (day of calendarDays; track $index) {
          @if (day) {
            <ala-calendar-item [day]="day.idx" [content]="day.content" />
          } @else {
            <div class="h-full w-full"></div>
          }
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CalendarItemComponent],
})
export class CalendarComponent {
  readonly currentYear = new Date().getFullYear();
  readonly decemberFirst = new Date(this.currentYear, 11, 1);
  readonly startingDayOfWeek = this.decemberFirst.getDay();

  readonly contents = injectContentFiles<PostAttributes>(
    (content) => !!content.attributes.day,
  ).sort((a, b) => Number(a.attributes.day) - Number(b.attributes.day));

  readonly calendarDays = Array(this.startingDayOfWeek)
    .fill(null)
    .concat(
      [...Array(24)].map((_, i) => ({
        idx: i + 1,
        content: this.contents[i] ?? null,
      })),
    );

  readonly daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}
