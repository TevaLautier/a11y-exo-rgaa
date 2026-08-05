import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AtomicInputTextComponent, AtomicButtonComponent } from '@so-ui';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, AtomicInputTextComponent, AtomicButtonComponent],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage {
  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    message: new FormControl('', { nonNullable: true })
  });

  submit(): void {
    if (this.form.valid) {
      this.form.reset();
    }
  }
}
