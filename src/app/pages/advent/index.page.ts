import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';

@Component({
  selector: 'ala-advent-home',
  standalone: true,
  template: `
    Hello world!
  `,
})
export default class AdventIndexPage {}

export const routeMeta: RouteMeta = {
  title: 'Angular.love Advent',
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
