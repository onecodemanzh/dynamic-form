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
export class TextboxControl extends BaseControl<string> {
  controlType = 'textbox';
  type: string;

  /**
   * 前缀
   */
  prefix: any;

  /**
   * 后缀
   */
  suffix: any;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.prefix = options['prefix'] || '';
    this.suffix = options['suffix'] || '';
    this.minlength = options['minlength'] || null;
    this.maxlength = options['maxlength'] || null;
  }
}
