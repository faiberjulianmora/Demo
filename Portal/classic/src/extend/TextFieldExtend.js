Ext.define('Portal.extend.TextFieldExtend', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.textFieldExtend',
    enableKeyEvents: true,
    anchor: '100%',
    maxWidth: 700,
    labelWidth: 150,
    allowBlank: false,
    blankText: 'Definir propiedad del control bankText!'
});