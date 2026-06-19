import { Component, input, output } from '@angular/core';

@Component({
  selector: 'atomic-pagination',
  standalone: true,
  templateUrl: './atomic-pagination.component.html',
  styleUrl: './atomic-pagination.component.scss'
})
export class AtomicPaginationComponent {
  readonly page = input<number>(1);
  readonly totalPages = input<number>(1);
  readonly previous = output<void>();
  readonly next = output<void>();
}
