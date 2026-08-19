import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AtomicButtonComponent } from '@so-ui';

function dateNaissanceValidator(): (group: AbstractControl) => ValidationErrors | null {
  return (group: AbstractControl): ValidationErrors | null => {
    const jj = group.get('jj')?.value;
    const mm = group.get('mm')?.value;
    const aaaa = group.get('aaaa')?.value;

    const jjNum = Number(jj);
    const mmNum = Number(mm);
    const aaaaNum = Number(aaaa);

    if (!jj && !mm && !aaaa) {
      return { dateVide: true };
    }

    if (!jj || !mm || !aaaa) {
      return { dateIncomplete: true };
    }

    if (
      isNaN(jjNum) ||
      isNaN(mmNum) ||
      isNaN(aaaaNum) ||
      jjNum < 1 ||
      jjNum > 31 ||
      mmNum < 1 ||
      mmNum > 12 ||
      aaaaNum < 1900 ||
      aaaaNum > new Date().getFullYear()
    ) {
      return { dateInvalide: true };
    }

    const date = new Date(aaaaNum, mmNum - 1, jjNum);
    if (
      date.getFullYear() !== aaaaNum ||
      date.getMonth() !== mmNum - 1 ||
      date.getDate() !== jjNum
    ) {
      return { dateInexistante: true };
    }

    return null;
  };
}

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
  anneeMax = new Date().getFullYear();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      rue: [''],
      cp: ['', [Validators.pattern('^[0-9]{5}$')]],
      ville: [''],
      dateNaissance: this.fb.group(
        {
          jj: [''],
          mm: [''],
          aaaa: [''],
        },
        { validators: [dateNaissanceValidator()] },
      ),
    });
  }

  valider() {
    this.submitted = true;
    if (this.form.valid) {
      alert('Formulaire envoyé !');
    }
  }
}
