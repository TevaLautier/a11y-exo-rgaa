import { Component, computed, input, model } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { AtomicInputErrorComponent } from './atomic-input-error.component';
import { UIDGenerator } from '../../utils/uid-generator';

@Component({
  selector: 'atomic-input-text',
  standalone: true,
  imports: [AtomicInputErrorComponent],
  templateUrl: './atomic-input-text.component.html',
  styleUrl: './atomic-input-text.component.scss',
})
export class AtomicInputTextComponent implements FormValueControl<string> {
  // 1. Contrat requis par FormValueControl
  readonly value = model<string>('');

  readonly gid = input<string>(UIDGenerator.nextId());
  readonly label = input.required<string>();
  readonly mandatory = input<boolean>(false);

  // 2. Signaux d'états alimentés AUTOMATIQUEMENT par la directive parent [formField]
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly dirty = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly touched = model<boolean>(false);


  readonly placeholder = input<string>('');
  readonly autocomplete = input<string>();

  readonly showError = computed<boolean>(() => {
    return this.dirty() && this.invalid();
  });

  readonly errorMessages = computed<string[]>(() => {
    const errs = this.errors();
    if (!errs) return [];
    return errs
      .map((e) => (e && typeof e === 'object' && 'message' in e ? e.message : null))
      .filter((msg): msg is string => !!msg);
  });

  onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
