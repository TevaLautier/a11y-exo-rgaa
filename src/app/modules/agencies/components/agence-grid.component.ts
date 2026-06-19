import { Component, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Agency } from '../../models';
import { AtomicCardComponent } from '@so-ui';

@Component({
  selector: 'app-agence-grid',
  standalone: true,
  imports: [RouterLink, AtomicCardComponent],
  templateUrl: './agence-grid.component.html',
  styleUrl: './agence-grid.component.scss'
})
export class AgenceGridComponent {
  readonly agencies = input.required<Agency[]>();

  constructor(private readonly router: Router) {}

  openAgency(id: number): void {
    this.router.navigate(['/agences/recherche', id]);
  }
}
