Ext.define('Portal.view.ciudad.Contenedor', {
    extend:'Portal.extend.ViewCardControl',
    alias: 'widget.frmContenedorCiudad',
    xtype: 'app-ciudad',
    requires: [
    	'Portal.extend.FormExtend',
        'Portal.view.ciudad.Lista',
        'Portal.view.ciudad.Editar'
    ],
    layout: 'border',
    items: [{
    	xtype: 'panel',
    	layout: 'card',
    	region: 'center',
    	id: 'idContenedorCiudad',
    	items: [{
    		xtype: 'frmListaCiudad'
    	},{
            xtype: 'frmEditarCiudad'
        }]
    }]
});