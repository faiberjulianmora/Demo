Ext.define('Portal.view.facturas.Editar',{
    extend:'Portal.extend.FormExtend',
    alias:'widget.frmEditarFacturas',
    titulo:'Editar Facturas',
    id: 'idfrmEditarFacturas',
    bodyPadding: 10,
    autoScroll: true,
    habilitarCancelar: true,
    requires:[
        'Portal.extend.GridControlExtend',
        'Portal.extend.TextFieldExtend'
    ],
    items:[{
        xtype: 'dateFieldExtend',
        fieldLabel: 'Fecha',
        name: 'date',
        id: 'frmEditarFactura-dfFecha'
    },{
        xtype: 'comboExtend',
        fieldLabel: 'Enviada al Cliente',
        store: {
            fields:['codigo','nombre'],
            data:[
                {'codigo':true,'nombre':'Si'},
                {'codigo':false,'nombre':'No'}
            ]
        },
        queryMode:'local',
        displayField: 'nombre',
        valueField:'codigo',
        name: 'is_emailed'
    },{
        xtype: 'comboExtend',
        fieldLabel: 'Vista por el Cliente',
        store: {
            fields:['codigo','nombre'],
            data:[
                {'codigo':true,'nombre':'Si'},
                {'codigo':false,'nombre':'No'}
            ]
        },
        queryMode:'local',
        displayField: 'nombre',
        valueField:'codigo',
        name: 'is_viewed_by_client'
    },{
        xtype: 'moneyFieldExtend',
        fieldLabel: 'Total',
        name: 'total',
        id: 'frmEditarFactura-mfTotal'
    }]
});