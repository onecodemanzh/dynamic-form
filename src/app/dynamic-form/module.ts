import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './form';
import { DynamicFormControlComponent } from './form-control';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ControlService } from './control.service';
import { DynamicFormSubComponent } from './form-sub';


const componets = [
  DynamicFormComponent,
  DynamicFormControlComponent,
  DynamicFormSubComponent
];

@NgModule({
  declarations: [
    ...componets
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ...componets
  ],
  providers: [ ControlService ]
})
export class DynamicFormModule { }
