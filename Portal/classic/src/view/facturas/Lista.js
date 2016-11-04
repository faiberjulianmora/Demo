Ext.define('Portal.view.facturas.Lista',{
    extend: 'Portal.extend.FormExtend',
    alias: 'widget.frmListaFacturas',
    titulo: 'Lista de Facturas',
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
            xtype: 'comboExtend',
            fieldLabel: 'Filtro Total',
            padding: '0 5 10 0',
            labelWidth: 80,
            store: {
                fields:['codigo','nombre'],
                data:[
                    {'codigo':'0','nombre':'Ninguno'},
                    {'codigo':'1','nombre':'Menor que:'},
                    {'codigo':'2','nombre':'Menor igual que:'},
                    {'codigo':'3','nombre':'Mayor que:'},
                    {'codigo':'4','nombre':'Mayor igual que:'}
                ]
            },
            queryMode:'local',
            displayField: 'nombre',
            valueField:'codigo',
            blankText: 'Debe seleccionar un tipo de filtro.',
            value: '0',
            allowBlank: true,
            id: 'typeFilterInvoices',
            width: 300
        },{
            xtype: 'moneyFieldExtend',
            padding: '0 5 10 0',
            allowBlank: true,
            id: 'valueFilterInvoices',
            width: 200
        }]
    },{
        xtype: 'gridControlExtend',
        id: 'frmListaVentas-gcListaFacturas',
        flex: 1,
        store: 'Portal.store.facturas.Facturas',
        habilitarVisualizar: true,
        columns:[{
            text: 'Factura',
            dataIndex: 'invoice_number',
            flex: 1
        },{
            text: 'Cliente',
            dataIndex: 'customer_name',
            flex: 1
        },{
            text: 'Fecha',
            dataIndex: 'date',
            flex: 1
        },{
            text: 'Total',
            dataIndex: 'total',
            flex: 1,
            renderer: function (value) {
                if(value != null & value != ''){
                    return Ext.util.Format.number(value, "$ 000,000");
                }
            }
        },{
            text: 'Enviada',
            dataIndex: 'is_emailed',
            width: 80,
            tdCls: 'columna-estado',
            renderer: function (value) {
                if(value){
                    return 'Si';
                }else{
                    return 'No';
                }
            }
        }],
        viewConfig: {
            getRowClass: function (record, index) {
                var value = record.get('is_emailed');
                if (value) {
                    return 'rowActivoCls';
                }else {
                    return 'rowInactivoCls';
                }
            }
        }
    }]
});