import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AtomicButtonComponent } from "@so-ui";

@Component({
  selector: 'app-register-page',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AtomicButtonComponent],
})
export class RegisterPage {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      rue: [''],
      cp: ['', [Validators.pattern('^[0-9]{5}$')]],
      ville: [''],
      jj: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      mm: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      aaaa: ['', [Validators.required, Validators.min(1900), Validators.max(2026)]],
    });
  }

  valider() {
    this.submitted = true;
    if (this.form.valid) {
      alert('Formulaire envoyé !');
    }
  }
}
