Ext.define('Portal.view.ventas.Lista',{
    extend: 'Portal.extend.FormExtend',
    alias: 'widget.frmListaVentas',
    titulo: 'Lista de Ventas',
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
            id: 'frmListaVentas-sfFiltroVentas',
            padding: '0 5 10 0',
            labelWidth: 50
        }]
    },{
        xtype: 'gridControlExtend',
        id: 'frmListaVentas-gcListaVentas',
        flex: 1,
        store: 'Portal.store.ventas.Ventas',
        habilitarEditar: true,
        columns:[{
            text: 'Fecha',
            dataIndex: 'fechaCompra',
            flex: 1
        },{
            text: 'Cliente',
            dataIndex: 'nombreCompleto',
            flex: 1
        },{
            text: 'Credito',
            dataIndex: 'totalCredito',
            flex: 1,
            renderer: function (value) {
                if(value != null & value != ''){
                    var valText = value.replace(/\D/g,'');
                    return Ext.util.Format.number(valText, "$ 000,000");
                }
            }
        },{
            text: 'Contado',
            dataIndex: 'totalContado',
            flex: 1,
            renderer: function (value) {
                if(value != null & value != ''){
                    var valText = value.replace(/\D/g,'');
                    return Ext.util.Format.number(valText, "$ 000,000");
                }
            }
        },{
            text: 'Total',
            dataIndex: 'totalCompra',
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
            id: 'frmListaVentas-paginarVentas',
            store: 'Portal.store.ventas.Ventas',
            dock: 'bottom',
            displayInfo: true
        }]
    }]
});