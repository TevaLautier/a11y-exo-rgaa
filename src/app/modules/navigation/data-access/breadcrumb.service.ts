import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  buildFromRoute(route: ActivatedRouteSnapshot): { label: string; link: string }[] {
    const trail: { label: string; link: string }[] = [];
    let current: ActivatedRouteSnapshot | null = route.root;
    let fullPath = '';

    while (current) {
      const segment = current.url.map((part) => part.path).join('/');
      if (segment) {
        fullPath += `/${segment}`;
      }
      const breadcrumbSource = current.data['breadcrumb'] as
        | string
        | ((snapshot: ActivatedRouteSnapshot) => string)
        | undefined;
      const breadcrumb =
        typeof breadcrumbSource === 'function' ? breadcrumbSource(current) : breadcrumbSource;
      if (breadcrumb) {
        trail.push({ label: breadcrumb, link: fullPath || '/' });
      }
      current = current.firstChild;
    }

    return trail;
  }
}
