Ext.define('Portal.store.tipoIdentificacion.TipoIdentificacion', {
    extend: 'Ext.data.Store',
    alias: 'store.tipoIdentificacion',
    model: 'Portal.model.tipoIdentificacion.TipoIdentificacion',
    autoLoad: true,
    pageSize: 25,
    baseParams: {
        texto: ''
    },
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: 'start',
        limitParam: 'limit',
        noCache: false,
        url: '../Servicios/tipoIdentificacion',
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