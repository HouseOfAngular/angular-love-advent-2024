import { injectContentFiles } from '@analogjs/content';
import { MetaTag } from '@analogjs/router';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import PostAttributes from '../post-attributes';

export function injectActivePostAttributes(
  route: ActivatedRouteSnapshot,
): PostAttributes {
  const file = injectContentFiles<PostAttributes>().find((contentFile) => {
    return (
      contentFile.filename === `/src/content/${route.params['slug']}.md` ||
      contentFile.slug === route.params['slug']
    );
  });

  return file!.attributes;
}

export const postMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const postAttributes = injectActivePostAttributes(route);

  return [
    {
      name: 'description',
      content: postAttributes.description,
    },
    {
      name: 'author',
      content: 'angular.love',
    },
    {
      property: 'og:title',
      content: postAttributes.title,
    },
    {
      property: 'og:description',
      content: postAttributes.description,
    },
    {
      property: 'og:image',
      content: postAttributes.coverImage,
    },
  ];
};
