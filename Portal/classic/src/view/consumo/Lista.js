Ext.define('Portal.view.consumo.Lista',{
    extend: 'Portal.extend.FormExtend',
    alias: 'widget.frmListaConsumo',
    titulo: 'Lista de Consumos',
    habilitarNuevo: true,
    habilitarRefrescar: true,
    requires:[
        'Portal.extend.GridControlExtend'
    ],
    items:[{
        xtype: 'gridControlExtend',
        flex: 1,
        store: 'Portal.store.consumo.Consumo',
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
        }]
    }]
});