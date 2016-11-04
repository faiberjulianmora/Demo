Ext.define('Portal.store.ciudad.Ciudad', {
    extend: 'Ext.data.Store',
    alias: 'store.ciudad',
    model: 'Portal.model.ciudad.Ciudad',
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
        url: '../Servicios/ciudad',
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