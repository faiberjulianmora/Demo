Ext.define('Portal.view.departamento.Contenedor', {
    extend:'Portal.extend.ViewCardControl',
    alias: 'widget.frmContenedorDepartamento',
    xtype: 'app-departamento',
    requires: [
    	'Portal.extend.FormExtend',
        'Portal.view.departamento.Lista',
        'Portal.view.departamento.Editar'
    ],
    layout: 'border',
    items: [{
    	xtype: 'panel',
    	layout: 'card',
    	region: 'center',
    	id: 'idContenedorDepartamento',
    	items: [{
    		xtype: 'frmListaDepartamento'
    	},{
            xtype: 'frmEditarDepartamento'
        }]
    }]
});