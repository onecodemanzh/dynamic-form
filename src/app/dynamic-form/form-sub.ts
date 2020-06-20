import { Component, OnInit, Input, HostListener, ElementRef, 
  Renderer2, EventEmitter, Output, forwardRef, ViewChild } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { BaseControl } from './control.base';
import { ControlService } from './control.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators'

export const EXE_DYNAMIC_SUB_FORM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => DynamicFormSubComponent),
  multi: true
};

/**
 * @example <div dynamic-sub-form [options]="options" [form]="form" name="subform" (onChange)="getValue1($event)"></div>
 * @example <dynamic-sub-form [options]="options" [form]="form" name="subform" (onChange)="getValue1($event)"></dynamic-sub-form>
 */
@Component({
  selector: 'dynamic-sub-form, [dynamic-sub-form]',
  template: `
    <form [formGroup]="subForm" (ngSubmit)="onSubmit(dynamicSubForm)" #dynamicSubForm="ngForm">
      <div *ngFor="let control of options; index as i;" class="form-row">
          <app-dynamic-form-control 
              [control]="control" 
              [index]="i" 
              [form]="subForm"
              [options]="options"
              [currentSubForm]="dynamicSubForm">
          </app-dynamic-form-control>
      </div>
    </form>
  `,
  exportAs: 'dynamicSubForm',
  providers: [ EXE_DYNAMIC_SUB_FORM_VALUE_ACCESSOR ]
})
export class DynamicFormSubComponent implements OnInit, ControlValueAccessor {
  @HostListener('input', ['$event']) onInput(event: any) {
    this.triggerInput();
  }
  @HostListener('change', ['$event']) onChange(event: any) {
    this.triggerInput();
    of(null).pipe(delay(50)).subscribe(() => this.change.emit(this.subForm.value));
  }
  /**
   * 生成动态表单的子表单数据
   */
  @Input() options: BaseControl<string>[] = [];
  @Input() _value = null;
  /**
   * 根本单
   */
  @Input() form: FormGroup;
  /**
   * 子表单在根表单中对应的控件名
   */
  @Input() name: string;
  /**
   * 输出事件，输出子表单的值
   */
  @Output('onChange') change = new EventEmitter<any>();

  @ViewChild('dynamicForm', { static: true }) dynamicForm: NgForm;

  subForm: FormGroup;
  constructor(
    private cs: ControlService,
    public elementRef: ElementRef,
    public renderer: Renderer2
  ) {  }

  ngOnInit() {
    this.setSubForm();
  }

  /**
   * 设置子表单，把生成的子表单添加到根表单上去
   */
  setSubForm() {
    this.subForm = this.cs.toFormGroup(this.options);
    this.form.addControl(this.name, this.subForm);
  }

  /**
   * 提交表单
   * @param f NgForm
   */
  onSubmit(f: NgForm) {
    this.cs.onSubmit(f, this.options,);
  }

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this._onChange(this._value);
  }

  /**
   * 触发input事件
   */
  async triggerInput() {
    of(null).pipe(delay(50)).subscribe(() => {
      this.value = this.subForm.value;
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.subForm.value);    
    });
  }

  _onChange = (_: any) => { };
  _onTouched = (_: any) => { };

  writeValue(value: any) {
    if (value) {
      this.value = value;
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    }
  }

  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) { 
    this._onTouched = fn;
  }
}
