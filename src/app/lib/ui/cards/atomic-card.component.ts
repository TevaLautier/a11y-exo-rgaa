import { Component, input } from '@angular/core';

@Component({
  selector: 'atomic-card',
  standalone: true,
  templateUrl: './atomic-card.component.html'
})
export class AtomicCardComponent {
  imageSrc = input<string>();
}
