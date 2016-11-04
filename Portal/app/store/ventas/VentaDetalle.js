Ext.define('Portal.store.ventas.VentasDetalle', {
    extend: 'Ext.data.Store',
    alias: 'store.ventasDetalle',
    autoLoad: false,
    proxy: {
        type: 'rest',
        noCache: false,
        url: '../Servicios/ventasDetalle',
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