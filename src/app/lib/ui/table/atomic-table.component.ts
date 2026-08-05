import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, input, output } from '@angular/core';

type SortDirection = 'asc' | 'desc' | '';

@Component({
  selector: 'atomic-table',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './atomic-table.component.html',
  styleUrl: './atomic-table.component.scss'
})
export class AtomicTableComponent {
  readonly headers = input.required<{ key: string; label: string; sortable?: boolean }[]>();
  readonly rows = input.required<Record<string, unknown>[]>();
  readonly sortColumn = input<string>('');
  readonly sortDirection = input<SortDirection>('');
  readonly customColumns = input<string[]>([]);
  readonly cellTemplate = input<TemplateRef<{ $implicit: Record<string, unknown>; key: string }> | null>(null);
  readonly sortChange = output<string>();

  isSortable(key: string): boolean {
    const header = this.headers().find((item) => item.key === key);
    return header?.sortable !== false;
  }

  isCustomColumn(key: string): boolean {
    return this.customColumns().includes(key);
  }

  iconFor(key: string): string {
    if (this.sortColumn() !== key) {
      return 'unfold_more';
    }
    if (this.sortDirection() === 'asc') {
      return 'north';
    }
    if (this.sortDirection() === 'desc') {
      return 'south';
    }
    return 'unfold_more';
  }

  ariaSortFor(key: string): 'ascending' | 'descending' | 'none' {
    if (this.sortColumn() !== key) {
      return 'none';
    }

    if (this.sortDirection() === 'asc') {
      return 'ascending';
    }

    if (this.sortDirection() === 'desc') {
      return 'descending';
    }

    return 'none';
  }

  sortLabelFor(key: string): string {
    if (this.sortColumn() !== key) {
      return 'non triee';
    }

    if (this.sortDirection() === 'asc') {
      return 'tri croissant';
    }

    if (this.sortDirection() === 'desc') {
      return 'tri decroissant';
    }

    return 'non triee';
  }
}
