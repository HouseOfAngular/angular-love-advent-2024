import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';

import { CalendarComponent } from '../../features';

@Component({
  selector: 'ala-advent-home',
  standalone: true,
  template: `
    <ala-calendar class="w-full max-w-5xl" />
  `,
  imports: [CalendarComponent],
  host: {
    class: 'flex justify-center w-full',
  },
})
export default class AdventIndexPage {}

export const routeMeta: RouteMeta = {
  title: 'Angular.love Advent',
  meta: [
    {
      name: 'description',
      content: 'Celebrate the Angular.love Advent! Each day of December, revisit highlights from the Angular community—blog posts, meetup recordings, and insights from contributors who inspire us.',
    },
    {
      name: 'author',
      content: 'angular.love',
    },
    {
      property: 'og:title',
      content: 'Angular.love Advent Event',
    },
    {
      property: 'og:description',
      content: 'Join the Angular.love Advent event! Discover daily throwbacks to valuable content, discussions, and memories from the Angular community. Celebrate and reflect with us!',
    },
    {
      property: 'og:image',
      content: 'https://wp.angular.love/wp-content/uploads/2024/11/AL_Advent_callendar_2024.png',
    },
    {
      property: 'og:url',
      content: 'https://advent.angular.love/event',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Angular.love Advent 2024',
    },
    {
      name: 'twitter:description',
      content: 'Rediscover Angular insights! Celebrate Angular.love Advent with daily highlights, blogs, and community contributions.',
    },
    {
      name: 'twitter:image',
      content: 'https://wp.angular.love/wp-content/uploads/2024/11/AL_Advent_callendar_2024.png',
    },
  ],
};
