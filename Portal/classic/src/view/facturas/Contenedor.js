Ext.define('Portal.view.facturas.Contenedor', {
    extend:'Portal.extend.ViewCardControl',
    alias: 'widget.frmContenedorFacturas',
    xtype: 'app-facturas',
    requires: [
    	'Portal.extend.FormExtend',
        'Portal.view.facturas.Lista',
        'Portal.view.facturas.Editar'
    ],
    layout: 'border',
    items: [{
    	xtype: 'panel',
    	layout: 'card',
    	region: 'center',
    	id: 'idContenedorFacturas',
    	items: [{
    		xtype: 'frmListaFacturas'
    	},{
            xtype: 'frmEditarFacturas'
        }]
    }]
});