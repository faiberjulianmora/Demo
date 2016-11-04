Ext.define('Portal.model.productos.Productos',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
        { name: 'id' , type: 'int' },
        { name: 'nombre' , type: 'string' },
        { name: 'idMarca' , type: 'int' },
        { name: 'precio' , type: 'string' },
        { name: 'nombreMarca' , type: 'string' }
    ]
});