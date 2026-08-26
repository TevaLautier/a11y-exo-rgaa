import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'atomic-button-icon',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './atomic-button-icon.component.html',
  styleUrl: './atomic-button-icon.component.scss',
})
export class AtomicButtonIconComponent {
  readonly color = input<'primary' | 'secondary' | 'tertiary'>('primary');
  readonly icon = input.required<string>();
  readonly label = input<string>('Action');
  readonly link = input<any>();
  readonly action = output();
}
