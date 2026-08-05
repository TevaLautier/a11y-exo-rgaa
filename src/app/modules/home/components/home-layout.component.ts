import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AtomicYoutubeVideoComponent } from '@so-ui';
import { Agency, Listing } from '../../models';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, AtomicYoutubeVideoComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent {
  readonly featuredListings = input.required<Listing[]>();
  readonly agencies = input.required<Agency[]>();
}
