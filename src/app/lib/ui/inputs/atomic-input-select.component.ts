import { Component, input, output } from '@angular/core';

@Component({
  selector: 'atomic-input-select',
  standalone: true,
  templateUrl: './atomic-input-select.component.html',
  styleUrl: './atomic-input-select.component.scss'
})
export class AtomicInputSelectComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly options = input.required<{ label: string; value: string }[]>();
  readonly value = input<string>('');
  readonly valueChange = output<string>();

  onChange(event: Event): void {
    this.valueChange.emit((event.target as HTMLSelectElement).value);
  }
}
