Ext.define('Portal.store.facturas.Facturas', {
    extend: 'Ext.data.Store',
    alias: 'store.facturas',
    autoLoad: true,
    proxy: {
        type: 'rest',
        pageParam: false,
        noCache: false,
        url: '../Servicios/zohoInvoice/facturas',
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