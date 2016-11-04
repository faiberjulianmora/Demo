Ext.define('Portal.model.pais.Pais',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
        { name: 'id' , type: 'int' },
        { name: 'nombre' , type: 'string' },
        { name: 'usuarioCreacion' , type: 'string' },
        { name: 'fechaCreacion' , type: 'string' }
    ]
});