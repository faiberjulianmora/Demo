Ext.define('Portal.store.inicio.Sesion', {
    extend: 'Ext.data.Store',
    alias: 'store.sesion',
    model: 'Portal.model.inicio.Sesion',
    autoLoad: false,
    proxy: {
        type: 'rest',
        pageParam: false,
        noCache: false,
        url: '../Servicios/inicio/sesion',
        reader: {
            type: 'json',
            rootProperty: 'datos',
            successProperty: 'estado',
            messageProperty: 'mensaje',
            totalProperty: 'codigoMensaje'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});