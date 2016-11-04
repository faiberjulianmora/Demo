Ext.define('Portal.model.departamento.Departamento',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
        { name: 'id' , type: 'int' },
        { name: 'nombreDepartamento' , type: 'string' },
        { name: 'idPais' , type: 'int' },
        { name: 'nombrePais' , type: 'string' },
        { name: 'usuarioCreacion' , type: 'string' },
        { name: 'fechaCreacion' , type: 'string' },
        { name:'usuarioModificacion' , type: 'string' },
        { name:'fechaModificacion' , type: 'string' }
    ]
});