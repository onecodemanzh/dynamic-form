import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormGroupDirective } from '@angular/forms';

import { BaseControl } from './control.base';
import { isObject } from 'util';

/**
 * @property currentDynamicForm 当前的动态表单
 * @function toFormGroup 转换成FormGroup
 * @function submit 提交当前动态表单
 */
@Injectable({providedIn: 'root'})
export class ControlService {
  currentDynamicForm: NgForm;
  constructor() { }
  
  /**
   * 转换成FormGroup
   * @param controls BaseControl[string]
   */
  toFormGroup(controls: BaseControl<string>[] ) {
    let group: any = {};
    let sortControls: BaseControl<string>[] = controls.sort((a, b) => a.order - b.order);
    sortControls.forEach(control => {
      group[control.key] = control.required ? 
        new FormControl(control.value || '', { validators: Validators.required, updateOn: 'change'})
        : new FormControl(control.value || '', { updateOn: 'change'});
    });
    return new FormGroup(group);
  }

  /**
   * 提交当前动态表单
   */
  submit(): boolean {
    this.currentDynamicForm.ngSubmit.emit();
    return this.currentDynamicForm.valid;
  }
  
  /**
   * 获取当前动态表单的值
   */
  getFormValue(): any {
    return this.currentDynamicForm.value;
  }

  getErrorMessage(control: any): string {
    let errors = Object.keys(control.errors);
    let message: string;
    let lable = errors[0];
    let obj = control.errors[errors[0]];
    if (isObject(obj)) {
      let key = Object.keys(obj)[0];
      message = `'s ${lable} is ${obj[key]}`;
    } else {
      message = ` is ${lable}`;
    }
    return message;
  }

  /**
   * 设置焦点
   * @param key string
   * @param formName 当前子表单name，如果是主表单。值为空
   */
  setFocus(key: string) {
    let selector: string = `.ng-invalid[focus-handle=${key}]`;
    let el: HTMLElement = document.querySelector(selector);
    el && el.focus();
  }

  /**
   * 验证当前表单(子表单)值的有效性。
   * 如果有属性值无效，找到当前表单(子表单)，
   * 定位当前表单(子表单)的第一个属性值无效元素，并抛出错误
   * @param f NgForm 当前表单(子表单)
   * @param options BaseControl<string>[] 当前表单(子表单)生成表单元素的数据
   * @param formName 当前子表单name，如果是主表单。值为空
   */
  onSubmit(f: NgForm, options: BaseControl<string>[]) {
    let controls = f.form.controls;
    Object.keys(controls).forEach((key: any) => {
      if (controls[key].errors) {
        this.setFocus(key);
        let lable = options.filter(c => c.key === key)[0].label;
        let str = lable + '' + this.getErrorMessage(controls[key]);
        throw new Error(str);
      }
    })
  }

}
