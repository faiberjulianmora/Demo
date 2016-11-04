Ext.define('Portal.view.ventas.Contenedor', {
    extend:'Portal.extend.ViewCardControl',
    alias: 'widget.frmContenedorVentas',
    xtype: 'app-ventas',
    requires: [
    	'Portal.extend.FormExtend',
        'Portal.view.ventas.Lista',
        'Portal.view.ventas.Editar'
    ],
    layout: 'border',
    items: [{
    	xtype: 'panel',
    	layout: 'card',
    	region: 'center',
    	id: 'idContenedorVentas',
    	items: [{
    		xtype: 'frmListaVentas'
    	},{
            xtype: 'frmEditarVenta'
        }]
    }]
});