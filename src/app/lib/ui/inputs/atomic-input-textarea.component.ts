import { Component} from '@angular/core';
import { AtomicInputErrorComponent } from './atomic-input-error.component';
import { AtomicInputTextComponent } from './atomic-input-text.component';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'atomic-input-textarea',
  standalone: true,
  imports: [AtomicInputErrorComponent],
  templateUrl: './atomic-input-textarea.component.html',
})
export class AtomicInputTextareaComponent extends AtomicInputTextComponent implements FormValueControl<string> {

}
