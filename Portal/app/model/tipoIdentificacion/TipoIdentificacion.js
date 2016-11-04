Ext.define('Portal.model.tipoIdentificacion.TipoIdentificacion',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
        { name: 'id', type: 'int' },
        { name: 'acronimo', type: 'string' },
        { name: 'nombre', type: 'string' },
        { name: 'estado', type: 'int' }
    ]
});