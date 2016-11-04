Ext.define('Portal.store.ventas.Ventas', {
    extend: 'Ext.data.Store',
    alias: 'store.ventas',
    model: 'Portal.model.ventas.Ventas',
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
        url: '../Servicios/ventas',
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