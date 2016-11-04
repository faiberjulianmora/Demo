Ext.define('Portal.store.listas.Productos', {
    extend: 'Ext.data.Store',
    alias: 'store.productos_list',
    autoLoad: true,
    proxy: {
        type: 'rest',
        pageParam: false,
        noCache: false,
        url: '../Servicios/listas/productos',
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