Ext.define('Portal.store.combo.Clientes', {
    extend: 'Ext.data.Store',
    alias: 'store.clientes_combo',
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
        url: '../Servicios/combo/clientes',
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