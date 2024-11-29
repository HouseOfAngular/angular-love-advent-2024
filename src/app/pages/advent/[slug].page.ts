import { injectContent, MarkdownComponent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

import PostAttributes from '../../shared/post-attributes';
import { postMetaResolver, postTitleResolver } from '../../shared/resolvers';

@Component({
  selector: 'ala-advent-day',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent],
  template: `
    @if (adventDay$ | async; as adventDay) {
      <div>
        <h1>
          Day #{{ adventDay.attributes.day }} - {{ adventDay.attributes.title }}
        </h1>
      </div>

      <article class="bg-background">
        <analog-markdown [content]="adventDay.content" />
      </article>
    }
  `,
})
export default class AdventDayComponent {
  readonly adventDay$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'advent',
  });
}

export const routeMeta: RouteMeta = {
  title: postTitleResolver,
  meta: postMetaResolver,
};
