import { Component, Input } from '@angular/core';
import { FormGroup, NgForm }        from '@angular/forms';

import { BaseControl } from './control.base';
import { ControlService } from './control.service';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './form-control.html'
})
export class DynamicFormControlComponent {
  @Input() control: BaseControl<string>;
  @Input() form: FormGroup;
  @Input() index: number;
  @Input() primary: boolean = false;
  @Input() currentSubForm: NgForm;
  @Input() options: BaseControl<string>[] = [];
  
  constructor(private cs: ControlService) {}
  get isValid() { 
    return this.form.controls[this.control.key].valid;
  }
  get status() {
    let control = this.form.controls[this.control.key];
    if (!control.touched) {
      return {
        hasError: false,
        message: null
      }
    } else if (!control.valid){
      let message = this.cs.getErrorMessage(control);
      return {
        hasError: true,
        message
      }
    }
  }

  /**
   * 验证表单有效性
   */
  submit() {
    if (this.primary) {
      this.cs.submit();
    } else {
      this.cs.onSubmit(this.currentSubForm, this.options);
      if (this.currentSubForm.valid) this.cs.submit();
    }
  }
}
