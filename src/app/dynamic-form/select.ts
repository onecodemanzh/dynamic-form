import { BaseControl } from './control.base';

/**
 * 表单文本框控件
 * @property value  值
 * @property key    key
 * @property label   标签,表单元素显示名称
 * @property required   是否必填
 * @property order  顺序
 * @property controlType 控件类型
 * @property type   值类型
 * @property options 选项
 */
export class SelectControl extends BaseControl<string> {
  controlType = 'select';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
