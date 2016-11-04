Ext.define('Portal.view.productos.Lista',{
    extend: 'Portal.extend.FormExtend',
    alias: 'widget.frmListaProductos',
    titulo: 'Lista de Productos',
    habilitarNuevo: true,
    habilitarRefrescar: true,
    requires:[
        'Portal.extend.GridControlExtend',
        'Portal.extend.SearchFieldExtend'
    ],
    items:[{
        xtype: 'panel',
        layout:{ type:'hbox', align:'stretch' },
        padding: 10,
        items:[{
            xtype: 'searchFieldExtend',
            fieldLabel: 'Buscar',
            id: 'frmListaProductos-sfFiltroProductos',
            padding: '0 5 10 0',
            labelWidth: 50
        }]
    },{
        xtype: 'gridControlExtend',
        id: 'frmListaProductos-gcListaProductos',
        flex: 1,
        store: 'Portal.store.productos.Productos',
        habilitarEditar: true,
        columns:[{
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 1
        },{
            text: 'Marca',
            dataIndex: 'nombreMarca',
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
        }],
        dockedItems:[{
            xtype: 'pagingtoolbar',
            id: 'frmListaProductos-paginarProductos',
            store: 'Portal.store.productos.Productos',
            dock: 'bottom',
            displayInfo: true
        }]
    }]
});