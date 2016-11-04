Ext.define('Portal.view.consumo.Contenedor', {
    extend:'Portal.extend.ViewCardControl',
    alias: 'widget.frmContenedorConsumo',
    xtype: 'app-consumo',
    requires: [
    	'Portal.extend.FormExtend',
        'Portal.view.consumo.Lista'
    ],
    layout: 'border',
    items: [{
    	xtype: 'panel',
    	layout: 'card',
    	region: 'center',
    	id: 'idContenedorConsumo',
    	items: [{
    		xtype: 'frmListaConsumo'
    	}]
    }]
});