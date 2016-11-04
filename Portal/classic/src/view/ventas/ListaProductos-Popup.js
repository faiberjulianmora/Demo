Ext.define('Portal.view.ventas.ListaProductos-Popup',{
    extend: 'Portal.extend.PopupExtend',
    name: 'windowListaProductos',
    alias: 'widget.popupListaProductos',
    title: 'Lote',
    height: 300,
    width: 400,
    require:[
        'Portal.extend.TextFieldExtend',
        'Portal.extend.NumberFieldExtend',
        'Portal.extend.ComboExtend'
    ],
    items:[{
        xtype: 'gridControlExtend',
        name: 'popupListaProductos-gcListaProductos',
        flex: 1,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'MULTI'
        },
        store: 'Portal.store.listas.Productos',
        columns:[{
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 1
        },{
            text: 'Precio',
            dataIndex: 'precio',
            flex: 1,
            renderer: function (value) {
                if(value != null & value != ''){
                    var valText = value.replace(/\D/g,'');
                    return Ext.util.Format.number(valText, "$ 000,000");
                }
            }
        }]
    }],
    buttons: [{
        text: 'Agregar',
        name: 'btnAgregarLote',
        id: 'btnAgregarProducto',
        width: '100%'
    }]
});