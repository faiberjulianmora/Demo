Ext.define('Portal.store.consumo.Consumo', {
    extend: 'Ext.data.Store',
    alias: 'store.consumo',
    autoLoad: false,
    proxy: {
        type: 'rest',
        noCache: false,
        url: '../Servicios/consumo',
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