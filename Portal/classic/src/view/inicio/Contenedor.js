Ext.define('Portal.view.inicio.Contenedor', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-inicio',
    requires: [
        'Ext.plugin.Viewport',
        'Portal.view.inicio.Sesion',
        'Portal.view.inicio.Portal'
    ],
    layout: 'border',
    items: [{
        xtype: 'panel',
        layout: 'card',
        region: 'center',
        id: 'idInicioContenedor',
        items: [{
            xtype: 'frmSesion'
        },{
            xtype: 'frmPortal'
        }]
    }]
});