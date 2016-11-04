Ext.define('Portal.model.clientes.Clientes',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
        { name: 'id' , type: 'int' },
        { name: 'idTercero' , type: 'int' },
        { name: 'idTipoIdentificacion' , type: 'int' },
        { name: 'identificacionCompuesta' , type: 'string' },
        { name: 'nombreCompleto' , type: 'string' },
        { name: 'fechaNacimiento' , type: 'string' },
        { name: 'direccion' , type: 'string' },
        { name: 'telefono' , type: 'string' },
        { name: 'email' , type: 'string' },
        { name: 'estado' , type: 'int' }
    ]
});