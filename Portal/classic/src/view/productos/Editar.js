Ext.define('Portal.view.productos.Editar',{
    extend:'Portal.extend.FormExtend',
    alias:'widget.frmEditarProductos',
    titulo:'Editar Productos',
    id: 'idFrmEditarProductos',
    bodyPadding: 10,
    autoScroll: true,
    habilitarGuardar: true,
    habilitarCancelar: true,
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
        xtype: 'textFieldExtend',
        fieldLabel: 'Nombre',
        blankText: 'Debe ingresar el nombre del Producto',
        name: 'nombre'
    },{
        xtype: 'comboExtend',
        fieldLabel: 'Marca',
        store: 'Portal.store.combo.Marcas',
        queryMode: 'local',
        displayField: 'nombre',
        valueField: 'id',
        blankText: 'Debe seleccionar el Tipo de Identificación',
        name: 'idMarca'
    },{
        xtype: 'moneyFieldExtend',
        fieldLabel: 'Precio',
        blankText: 'Debe ingresar el precio del producto.',
        name: 'precio',
        id: 'frmEditarProductos-mfPrecio'
    }]
});