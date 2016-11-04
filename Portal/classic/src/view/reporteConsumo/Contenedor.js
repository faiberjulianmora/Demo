Ext.define('Portal.view.reporteConsumo.Contenedor', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteConsumo',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items:[{
        xtype: 'panel',
        bodyPadding: 4,
        margin: '10 0 15 0',
        layout: {
            type: 'hbox'
        },
        items:[{
            xtype: 'comboExtend',
            fieldLabel: 'Cliente',
            store: 'Portal.store.combo.Clientes',
            queryMode: 'local',
            displayField: 'nombreCompuesto',
            valueField: 'id',
            blankText: 'Debe seleccionar el cliente que hace la compra',
            name: 'idCliente',
            id: 'listaClientesReporte',
            width: 600,
            margin: 5
        },{
            xtype: 'button',
            name: 'generarReporte',
            text: 'Generar',
            width: 100,
            margin: 5
        }]
    },{
        xtype: 'panel',
        name: 'contenedorReporte',
        flex:1,
        margins: '0 0 0 0',
        autoScroll: true,
        id: 'ContainerReporte'
    }]
});