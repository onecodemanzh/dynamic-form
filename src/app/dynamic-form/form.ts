import { Component, OnInit, Input, HostListener, ElementRef, 
  Renderer2, EventEmitter, Output, forwardRef, ViewChild } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm, FormGroupDirective } from '@angular/forms';
import { BaseControl } from './control.base';
import { ControlService } from './control.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators'

export const EXE_DYNAMIC_FORM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => DynamicFormComponent),
  multi: true
};

/**
 * @description 动态表单
 * @example <dynamic-form [options]="options" [(ngModel)]="formValue" [form]="form" (onChange)="getValue($event)"></dynamic-form>
 * @example <a dynamic-form [options]="options" [(ngModel)]="formValue" [form]="form" (onChange)="getValue($event)"></a>
 */
@Component({
  selector: 'dynamic-form, [dynamic-form]',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(dynamicForm)" #dynamicForm="ngForm">
      <div *ngFor="let control of options; index as i;" class="form-row">
          <app-dynamic-form-control [control]="control" [index]="i" [form]="form" [primary]="true"></app-dynamic-form-control>
      </div>
    </form>
  `,
  exportAs: 'dynamicForm',
  providers: [ EXE_DYNAMIC_FORM_VALUE_ACCESSOR ]
})
export class DynamicFormComponent implements OnInit, ControlValueAccessor {
  @HostListener('input', ['$event']) onInput(event: any) {
    this.triggerInput();
  }
  @HostListener('change', ['$event']) onChange(event: any) {
    this.triggerInput();
    of(null).pipe(delay(50)).subscribe(() => this.change.emit(this.form.value));
  }
  /**
   * 生成动态表单的根表单数据
   */
  @Input() options: BaseControl<string>[] = [];
  @Input() _value = null;
  /**
   * 根表单
   */
  @Input() form: FormGroup;
  /**
   * 输出事件，输出根表单的值
   */
  @Output('onChange') change = new EventEmitter<any>();

  @ViewChild('dynamicForm', { static: true }) dynamicForm: NgForm;

  /**
   * 是否重新赋值过
   */
  isExecRecode: boolean = false;

  constructor(
    private cs: ControlService,
    public elementRef: ElementRef,
    public renderer: Renderer2
  ) {  }

  ngOnInit() {
    this.setDynamicForm();
  }

  /**
   * 设置当前动态表单的根表单
   */
  setDynamicForm() {
    this.cs.currentDynamicForm = this.dynamicForm;
  }
  /**
   * 重新赋值表单,只执行一次
   */
  recode() {
    this.isExecRecode = true;
    this.form.setValue(this.value)
  }

  /**
   * 提交表单
   * @param f NgForm
   */
  onSubmit(f: NgForm) {
    this.cs.onSubmit(f, this.options);
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
      this.value = this.form.value;
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.form.value);    
    });
  }

  _onChange = (_: any) => { };
  _onTouched = (_: any) => { };

  writeValue(value: any) {
    if (value) {
      this.value = value;
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
      !this.isExecRecode && this.recode();
    }
  }

  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) { 
    this._onTouched = fn;
  }
}
