import { Component, input, output } from '@angular/core';

@Component({
  selector: 'atomic-input-text',
  standalone: true,
  templateUrl: './atomic-input-text.component.html',
  styleUrl: './atomic-input-text.component.scss'
})
export class AtomicInputTextComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly value = input<string>('');
  readonly valueChange = output<string>();

  onInput(event: Event): void {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }
}
