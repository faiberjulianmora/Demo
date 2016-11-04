Ext.define('Portal.view.tipoIdentificacion.Contenedor', {
    extend:'Portal.extend.ViewCardControl',
    alias: 'widget.frmContenedorTipoIdentificacion',
    xtype: 'app-tipoIdentificacion',
    requires: [
        'Portal.extend.FormExtend',
        'Portal.view.tipoIdentificacion.Lista',
        'Portal.view.tipoIdentificacion.Editar'
    ],
    layout: 'border',
    items: [{
        xtype: 'panel',
        layout: 'card',
        region: 'center',
        id: 'idContenedorTipoIdentificacion',
        items: [{
            xtype: 'frmListaTipoIdentificacion'
        },{
            xtype: 'frmEditarTipoIdentificacion'
        }]
    }]
});