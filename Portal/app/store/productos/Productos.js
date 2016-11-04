Ext.define('Portal.store.productos.Productos', {
    extend: 'Ext.data.Store',
    alias: 'store.productos',
    model: 'Portal.model.productos.Productos',
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
        url: '../Servicios/productos',
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