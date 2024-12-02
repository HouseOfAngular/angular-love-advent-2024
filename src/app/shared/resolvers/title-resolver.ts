import { ResolveFn } from '@angular/router';

import { injectActivePostAttributes } from './meta-resolver';

export const postTitleResolver: ResolveFn<string> = (route) =>
  `Angular.love Advent - ${injectActivePostAttributes(route).title}`;
