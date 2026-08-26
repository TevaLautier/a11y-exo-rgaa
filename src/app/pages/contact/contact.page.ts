import { Component, signal } from '@angular/core';
import { email, form, required, FormField, pattern } from '@angular/forms/signals';
import {
  AtomicInputTextComponent,
  AtomicInputTextareaComponent,
  AtomicInputErrorComponent,
  AtomicButtonComponent,
} from '@so-ui';
import { markAllAsDirty } from '@lib/utils';

interface ContactData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    AtomicInputTextComponent,
    AtomicInputTextareaComponent,
    AtomicInputErrorComponent,
    AtomicButtonComponent,
    FormField,
  ],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss',
})
export class ContactPage {
  readonly model = signal<ContactData>({
    name: '',
    email: '',
    message: '',
  });

  readonly form = form(this.model, (schema) => {
    required(schema.name, { message: 'Le nom est obligatoire.' });
    required(schema.email, { message: "L'email est obligatoire." });
    pattern(schema.email, /^[a-z0-9._%+-]+@gmail\.com$/, {
      message: "L'email doit finir par gmail.com.",
    });
    email(schema.email, { message: "Format d'email invalide." });
    required(schema.message, { message: 'Le message est obligatoire.' });
  });

  submit(): void {
    if (this.form().invalid()) {
      markAllAsDirty(this.form);
      return;
    }
  }
}
