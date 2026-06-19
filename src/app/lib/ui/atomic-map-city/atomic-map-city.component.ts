import { Component, AfterViewInit, input, effect, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

// Configurer les chemins des icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/assets/leaflet/marker-icon-2x.png',
  iconUrl: '/assets/leaflet/marker-icon.png',
  shadowUrl: '/assets/leaflet/marker-shadow.png'
});

@Component({
  selector: 'atomic-map-city',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atomic-map-city.component.html',
  styleUrl: './atomic-map-city.component.scss',
})
export class AtomicMapCityComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  readonly city = input.required<string>();

  private map: L.Map | undefined;
  private marker: L.Marker | undefined;

  constructor(private http: HttpClient) {
    effect(() => {
      const city = this.city();
      if (city && this.map) {
        this.geocodeCity(city);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Créer la carte avec OpenStreetMap
    this.map = L.map(this.mapContainer.nativeElement).setView([45.5, 2.5], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Invalider la taille pour que Leaflet recalcule
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);

    // Géocoder la ville immédiatement
    const city = this.city();
    if (city) {
      this.geocodeCity(city);
    }
  }

  private geocodeCity(city: string): void {
    if (!this.map) return;

    // Utiliser Nominatim (OpenStreetMap) pour géocoder la ville
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city + ', France')}&format=json&limit=1`;

    this.http.get<any[]>(nominatimUrl).subscribe({
      next: (results) => {
        if (results.length > 0) {
          const lat = parseFloat(results[0].lat);
          const lon = parseFloat(results[0].lon);

          // Centrer la carte
          this.map?.setView([lat, lon], 13);

          // Supprimer ancien marqueur
          if (this.marker) {
            this.marker.remove();
          }

          // Ajouter un nouveau marqueur
          this.marker = L.marker([lat, lon])
            .bindPopup(`<strong>${city}</strong>`)
            .addTo(this.map!);

          this.marker.openPopup();
        }
      },
      error: (err) => {
        console.error('Erreur géocodage:', err);
      }
    });
  }
}
