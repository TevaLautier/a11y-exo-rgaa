import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listing-edit-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listing-edit.page.html'
})
export class ListingEditPage {
  private readonly route = inject(ActivatedRoute);
  readonly id = this.route.snapshot.paramMap.get('id');
}
