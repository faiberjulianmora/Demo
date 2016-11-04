Ext.define('Portal.extend.NumberFieldExtend', {
    extend: 'Ext.form.field.Number',
    alias: 'widget.numberFieldExtend',
    hideTrigger: true,
    keyNavEnabled: false,
    mouseWheelEnabled: false,
    labelClsExtra: 'lblFieldExtendCls',
    enableKeyEvents: true,
    anchor: '100%',
    maxWidth: 700,
    labelWidth: 150,
    allowBlank: false,
    blankText: 'Definir propiedad del control bankText!'
});