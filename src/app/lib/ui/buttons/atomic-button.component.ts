import { Component, input } from '@angular/core';

@Component({
  selector: 'atomic-button',
  standalone: true,
  templateUrl: './atomic-button.component.html',
  styleUrl: './atomic-button.component.scss'
})
export class AtomicButtonComponent {
  readonly type = input<'button' | 'submit'>('button');
  readonly action = input<() => void>(() => {});
  readonly color = input<'primary' | 'secondary' | 'tertiary'>('primary');
}
