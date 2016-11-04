Ext.define('Portal.store.PermisosFormulario', {
    extend: 'Ext.data.Store',
    alias: 'store.permisosFormularioStore',
    model: 'Portal.model.PermisosFormulario',
    autoLoad: false,
    baseParams: {
        idUsuario: 0,
        idFormulario: 0
    },
    proxy: {
        type: 'rest',
        pageParam: false,
        noCache: false,
        url: '../Servicios/permisosFormulario',
        reader: {
            type: 'json',
            rootProperty: 'datos',
            successProperty: 'estado',
            messageProperty: 'mensaje',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});