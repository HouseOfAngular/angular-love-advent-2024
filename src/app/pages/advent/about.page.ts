import { injectContent, MarkdownComponent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

import PostAttributes from '../../shared/post-attributes';

@Component({
  selector: 'ala-advent-about',
  standalone: true,
  template: `
    <article>
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
  title: 'Angular.love Advent - About',
  meta: [
    {
      name: 'description',
      content: 'TODO Description', // todo
    },
    {
      name: 'author',
      content: 'angular.love',
    },
    {
      property: 'og:title',
      content: 'Angular.love Advent Day Home',
    },
    {
      property: 'og:description',
      content: 'Angular.love Advent Day Home',
    },
    {
      property: 'og:image',
      content: 'todo', // todo
    },
  ],
};
