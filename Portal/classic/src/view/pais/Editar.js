Ext.define('Portal.view.pais.Editar',{
    extend:'Portal.extend.FormExtend',
    alias:'widget.frmEditarPais',
    titulo:'Editar Pais',
    id: 'idFrmEditarPais',
    bodyPadding:10,
    autoScroll:true,
    habilitarGuardar:true,
    habilitarCancelar:true,
    requires:[
        'Portal.extend.GridControlExtend',
        'Portal.extend.TextFieldExtend'
    ],
    items:[{
        xtype: 'textFieldExtend',
        allowBlank: true,
        name: 'id',
        hidden: true
    },{
        xtype:'textFieldExtend',
        fieldLabel:'Nombre del Pais',
        blankText:'Debe ingresar el nombre del Pais',
        name:'nombre'
    }]
});