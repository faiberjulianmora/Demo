Ext.define('Portal.view.productos.Contenedor', {
    extend:'Portal.extend.ViewCardControl',
    alias: 'widget.frmContenedorProductos',
    xtype: 'app-productos',
    requires: [
    	'Portal.extend.FormExtend',
        'Portal.view.productos.Lista',
        'Portal.view.productos.Editar'
    ],
    layout: 'border',
    items: [{
    	xtype: 'panel',
    	layout: 'card',
    	region: 'center',
    	id: 'idContenedorProductos',
    	items: [{
    		xtype: 'frmListaProductos'
    	},{
            xtype: 'frmEditarProductos'
        }]
    }]
});