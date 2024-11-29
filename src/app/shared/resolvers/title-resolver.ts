import {ResolveFn} from "@angular/router";
import {injectActivePostAttributes} from "./meta-resolver";

export const postTitleResolver: ResolveFn<string> = (route) =>
  injectActivePostAttributes(route).title;
