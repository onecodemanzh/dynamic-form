import { Component, ViewChild, ElementRef } from '@angular/core';
import { BaseControl } from './dynamic-form/control.base';
import { FormGroup } from '@angular/forms';
import { ControlService } from './dynamic-form/control.service';
import { SelectControl } from './dynamic-form/select';
import { TextboxControl } from './dynamic-form/textbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('input', { static: true } ) input: ElementRef
  options: BaseControl<string>[] = [];
  form: FormGroup;
  formValue: any;
  constructor(private cs: ControlService) { }

  ngOnInit(): void {
    this.options = [
    
      new SelectControl({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        required: true,
        order: 3
      }),
  
      new TextboxControl({
        key: 'firstName',
        label: 'First name',
        value: '',
        required: true,
        order: 1,
        autocomplete: false,
        minlength: 5
      }),
  
      new TextboxControl({
        key: 'lastName',
        label: 'last name',
        value: '',
        required: true,
        order: 4,
        // ref: this.input,
        autocomplete: false
      }),
  
      new TextboxControl({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
        required: true,
      })
    ];
    this.form = this.cs.toFormGroup(this.options);
    /* this.formValue = {
        brave: "222",
        emailAddress: "333",
        firstName: "444",
        lastName: "",
        subform: {
          brave: "",
          emailAddress: "666",
          firstName: "111",
          lastName: "000"
        },
        subform1: {
          brave: "",
          emailAddress: "666",
          firstName: "111",
          lastName: "000"
        }
      };
    */
  }
  getValue(event: any) {
    // console.log(this.form);
    console.log(this.formValue);
  }

  getValue1(event: any) {
    // console.log(event);
    // console.log(this.form);
    // console.log(this.formValue);
  }

  submit() {
    console.log(this.form);
    console.log(this.cs.submit())
  }
}
