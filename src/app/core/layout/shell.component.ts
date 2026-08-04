import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AtomicButtonIconComponent } from '@so-ui';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AtomicButtonIconComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  currentTheme: 'light' | 'dark' = 'light';

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
}
