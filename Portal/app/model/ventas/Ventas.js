Ext.define('Portal.model.ventas.Ventas',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
        { name: 'id' , type: 'int' },
        { name: 'idCliente' , type: 'int' },
        { name: 'nombreCompleto' , type: 'string' },
        { name: 'totalCompra' , type: 'string' },
        { name: 'totalContado' , type: 'string' },
        { name: 'totalCredito' , type: 'string' },
        { name: 'fechaCompra' , type: 'string' }
    ]
});