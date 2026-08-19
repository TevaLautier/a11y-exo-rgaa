import { Component, input, output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'atomic-button',
  standalone: true,
  templateUrl: './atomic-button.component.html',
  styleUrl: './atomic-button.component.scss',
  imports: [MatIcon, RouterLink]
})
export class AtomicButtonComponent {
  readonly type = input<'button' | 'submit'>('button');
  readonly action = output();
  readonly icon = input<string | null>(null);
  readonly color = input<'primary' | 'secondary' | 'tertiary'>('primary');
  readonly iconPosition = input<'left' | 'right'>('left');
  readonly link = input<any>();
}
