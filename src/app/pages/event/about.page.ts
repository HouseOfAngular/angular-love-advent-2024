import { injectContent, MarkdownComponent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

import PostAttributes from '../../shared/post-attributes';

@Component({
  selector: 'ala-advent-about',
  standalone: true,
  template: `
    <article class="bg-background">
      @if (aboutPost | async; as content) {
        <analog-markdown [content]="content.content" />
      }
    </article>
  `,
  imports: [AsyncPipe, MarkdownComponent],
})
export default class AboutAdventComponent {
  readonly aboutPost = injectContent<PostAttributes>({
    customFilename: 'about',
  });
}

export const routeMeta: RouteMeta = {
  title: 'Angular.love Advent',
  meta: [
    {
      name: 'description',
      content: 'Learn about Angular.love Advent 2024: a daily celebration of the Angular community, featuring highlights, reflections, and gratitude for contributors and creators.',
    },
    {
      name: 'author',
      content: 'angular.love',
    },
    {
      property: 'og:title',
      content: 'About Angular.love Advent 2024',
    },
    {
      property: 'og:description',
      content: 'Discover the story behind Angular.love Advent 2024! Join us in celebrating the creativity and passion of the Angular community with daily highlights and reflections.',
    },
    {
      property: 'og:image',
      content: 'https://wp.angular.love/wp-content/uploads/2024/11/AL_Advent_callendar_1200x628.png',
    },
    {
      property: 'og:url',
      content: 'https://advent.angular.love/event/about',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'About Angular.love Advent 2024',
    },
    {
      name: 'twitter:description',
      content: 'Angular.love Advent 2024: Celebrating the Angular community with daily highlights, blogs, and reflections. Learn about the event and join the journey!',
    },
    {
      name: 'twitter:image',
      content: 'https://wp.angular.love/wp-content/uploads/2024/11/AL_Advent_callendar_1200x628.png',
    },
  ],
};
