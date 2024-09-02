import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { BreadCrumbService } from '../../services/bread-crumb.service';
import { BreadcrumbDTO } from '../../models/breadcrumb';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '../base/base.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [CommonModule, RouterLink,MatIconModule],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss',
})
export class BreadCrumbComponent extends BaseComponent {
  breadcrumbs: Array<BreadcrumbDTO> = [];
  cdr= inject(ChangeDetectorRef)

  constructor() {
    super()
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        this.cdr.detectChanges()
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<BreadcrumbDTO> = []
  ): Array<BreadcrumbDTO> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url: url });
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
