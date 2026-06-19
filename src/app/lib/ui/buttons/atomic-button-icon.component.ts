import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'atomic-button-icon',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './atomic-button-icon.component.html',
  styleUrl: './atomic-button-icon.component.scss'
})
export class AtomicButtonIconComponent {
  readonly color = input<'primary' | 'secondary' | 'tertiary'>('primary');
  readonly icon = input.required<string>();
  readonly label = input<string>('Action');
}
