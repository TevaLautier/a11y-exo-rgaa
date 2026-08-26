import { Component, input } from '@angular/core';

@Component({
  selector: 'atomic-input-error',
  standalone: true,
  templateUrl: './atomic-input-error.component.html',
  styleUrl: './atomic-input-error.component.scss'
})
export class AtomicInputErrorComponent {
  readonly id = input.required<string>();
  readonly visible = input<boolean>(false);
  readonly messages = input<string[]>([]);
}
