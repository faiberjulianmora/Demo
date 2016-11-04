Ext.define('Portal.extend.ComboExtend', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboExtend',
    requires:['Portal.extend.Clear'],
    labelWidth: 150,
    labelClsExtra: 'lblFieldExtendCls',
    forceSelection: true,
    enableKeyEvents: true,
    editable: false,
    anchor: '100%',
    maxWidth: 700,
    queryParam: 'texto',
    allowBlank: false,
    triggers: {
        clear: {
          type: 'triggerClear'
        }
    }
});