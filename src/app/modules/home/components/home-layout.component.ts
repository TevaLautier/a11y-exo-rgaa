import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AtomicYoutubeVideoComponent, AtomicButtonComponent } from '@so-ui';
import { CarouselComponent } from '../../listings/components/carousel.component';
import { Agency, Listing } from '../../models';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [RouterLink, CarouselComponent, AtomicYoutubeVideoComponent, AtomicButtonComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent {
  readonly featuredListings = input.required<Listing[]>();
  readonly agencies = input.required<Agency[]>();
}
