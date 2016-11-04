Ext.define('Portal.view.ventas.Editar',{
    extend:'Portal.extend.FormExtend',
    alias:'widget.frmEditarVenta',
    titulo:'Editar Venta',
    id: 'idfrmEditarVenta',
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
        xtype: 'comboExtend',
        fieldLabel: 'Cliente',
        store: 'Portal.store.combo.Clientes',
        queryMode: 'local',
        displayField: 'nombreCompuesto',
        valueField: 'id',
        blankText: 'Debe seleccionar el cliente que hace la compra',
        name: 'idCliente'
    },{
        xtype: 'dateFieldExtend',
        fieldLabel: 'Fecha de la Venta',
        blankText: 'Debe ingresar la fecha de la venta.',
        name: 'fechaCompra',
        id: 'frmRegistroClientes-dfFechaVenta',
        maxValue: new Date(),
        disabled: true
    },{
        xtype: 'moneyFieldExtend',
        fieldLabel: 'Pago de Contado',
        allowBlank: true,
        blankText: 'Debe ingresar el valor que desea pagar de contado',
        name: 'totalContado',
        id: 'frmEditarVenta-mfTotalContado'
    },{
        xtype: 'moneyFieldExtend',
        fieldLabel: 'Pago a Credito',
        allowBlank: true,
        blankText: 'Debe ingresar el valor que desea pagar a credito',
        name: 'totalCredito',
        id: 'frmEditarVenta-mfTotalCredito'
    },{
        xtype: 'moneyFieldExtend',
        fieldLabel: 'Valor Total',
        name: 'totalCompra',
        id: 'frmEditarVenta-mfValorTotal',
        disabled: true
    },{
        xtype: 'gridControlExtend',
        title: 'Lotes',
        id: 'frmEditarVenta-gcDetalleCompra',
        flex: 1,
        plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1,
                listeners: {
                    edit: function (editor, context) {
                        if (context.value != '' && context.value != null) {
                            var precioNumber = context.record.getData().valorUnidadProducto
                            precioNumber = precioNumber.replace(/\D/g,'');
                            var total = parseInt(context.value) * parseInt(precioNumber);
                            context.record.set({
                                totalProducto: Ext.util.Format.number(total, "$ 000,000"),
                                totalProductoNumero: total
                            });
                            editor.grid.up('frmEditarVenta').fireEvent('cambioTotal');
                        }
                    }
                }
            })
        ],
        store: 'Portal.store.ventas.VentasDetalle',
        columns:[{
            text: 'idProducto',
            dataIndex: 'idProducto',
            hidden: true 
        },{
            text: 'Producto',
            dataIndex: 'nombreProducto',
            flex: 1
        },{
            text: 'Valor Unidad',
            dataIndex: 'valorUnidadProducto',
            flex: 2,
            renderer: function (value) {
                if(value != null & value != ''){
                    var valText = value.replace(/\D/g,'');
                    return Ext.util.Format.number(valText, "$ 000,000");
                }
            }
        },{
            text: 'Cantidad',
            dataIndex: 'cantidadProducto',
            flex: 1,
            editor: {
                xtype: 'numberFieldExtend',
                thousandSeparator: ' . ',
                name: 'editorCantidad'
            }
        },{
            text: 'Total',
            dataIndex: 'totalProducto',
            flex: 1,
            renderer: function (value) {
                if(value != null & value != ''){
                    var valText = value.replace(/\D/g,'');
                    return Ext.util.Format.number(valText, "$ 000,000");
                }
            }
        }],
        tools:[{
            type: 'plus',
            tooltip: 'Agregar producto.',
            handler: function(event, toolEl, panelHeader){
                Ext.create('Portal.view.ventas.ListaProductos-Popup').show();
            }
        }]
    }]
});