Ext.define('Portal.model.ciudad.Ciudad',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
        { name: 'id' , type: 'int' },
        { name: 'idCiudad' , type: 'int' },
        { name: 'nombreCiudad' , type: 'string' },
        { name: 'idDepartamento' , type: 'int' },
        { name: 'nombreDepartamento' , type: 'string' },
        { name: 'idPais' , type: 'int' },
        { name: 'nombrePais' , type: 'string' },
        { name: 'usuarioCreacion' , type: 'string' },
        { name: 'fechaCreacion' , type: 'string' },
        { name: 'usuarioModificacion' , type: 'string' },
        { name: 'fechaModificacion' , type: 'string' }
    ]
});