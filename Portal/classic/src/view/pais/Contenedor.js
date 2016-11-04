Ext.define('Portal.view.pais.Contenedor', {
    extend:'Portal.extend.ViewCardControl',
    alias: 'widget.frmContenedorPais',
    xtype: 'app-pais',
    requires: [
    	'Portal.extend.FormExtend',
        'Portal.view.pais.Lista',
        'Portal.view.pais.Editar'
    ],
    layout: 'border',
    items: [{
    	xtype: 'panel',
    	layout: 'card',
    	region: 'center',
    	id: 'idContenedorPais',
    	items: [{
    		xtype: 'frmListaPais'
    	},{
            xtype: 'frmEditarPais'
        }]
    }]
});