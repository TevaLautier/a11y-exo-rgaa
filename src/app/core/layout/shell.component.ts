import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AtomicButtonIconComponent } from '@so-ui';
import { SkipLinksComponent } from "../skip-links/skip-links.component";

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AtomicButtonIconComponent, SkipLinksComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  currentTheme: 'light' | 'dark' = 'light';
  isAccessible = false;

  constructor() {
    const htmlElement = document.documentElement;
    const existingTheme = htmlElement.dataset['theme'];

    this.currentTheme = existingTheme === 'dark' ? 'dark' : 'light';
    htmlElement.dataset['theme'] = this.currentTheme;
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset['theme'] = this.currentTheme;
  }

  toggleAccessible(): void {
    this.isAccessible = !this.isAccessible;
    if (this.isAccessible) {
      document.documentElement.dataset['contrast'] = 'accessible';
    } else {
      delete document.documentElement.dataset['contrast'];
    }
  }
}
