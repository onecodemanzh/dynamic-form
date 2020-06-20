import { ElementRef } from '@angular/core';

/**
 * 表单基本控件
 * @property value  值
 * @property key    key
 * @property label   标签,表单元素显示名称
 * @property required   是否必填
 * @property order  顺序
 * @property controlType 控件类型
 * @property type   值类型
 * @property options 选项
 * @property autocomplete 自动完成
 */
export class BaseControl<T> {
    /**
     * 值
     */
    value: T;

    /**
     * key
     */
    key: string;

    /**
     * 标签,表单元素显示名称
     */
    label: string;

    /**
     * 是否必填
     */
    required: boolean;

    /**
     * 顺序
     */
    order: number;

    /** 
     * 控件类型
     */
    controlType: string;

    /**
     * 值类型
     */
    type: string;
    
    /**
     * 选项
     */
    options: { key: string, value: string }[];
    
    /**
     * 自动完成
     */
    autocomplete: boolean;

    /**
     * 禁用
     */
    disabled: boolean;

    /**
     * 只读
     */
    readonly: boolean;

    /**
     * 模板引用
     */
    ref: ElementRef;

    /**
     * 最小长度
     */
    minlength: number;

    /**
     * 最大长度
     */
    maxlength: number;

    /**
     * 最大字符数
     */
    size: number;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        type?: string,
        autocomplete?: boolean,
        disabled?: boolean,
        readonly?: boolean,
        ref?: ElementRef,
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.autocomplete = options.autocomplete === false ? false : true;
        this.disabled = options.disabled || false;
        this.readonly = options.readonly || false;
        this.ref = options.ref || null;
    }
}
