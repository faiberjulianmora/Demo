Ext.define('Portal.view.registroClientes.Contenedor', {
    extend:'Portal.extend.ViewCardControl',
    alias: 'widget.frmContenedorRegistroClientes',
    xtype: 'app-registroClientesContenedor',
    requires: [
        'Portal.extend.FormExtend',
        'Portal.view.registroClientes.Lista',
        'Portal.view.registroClientes.Editar'
    ],
    layout: 'border',
    items: [{
        xtype: 'panel',
        layout: 'card',
        region: 'center',
        id: 'idContenedorRegistroClientes',
        items: [{
            xtype: 'frmListaClientes'
        },{
            xtype: 'frmEdiartClientes'
        }]
    }]
});