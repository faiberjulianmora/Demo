Ext.define('Portal.model.inicio.Sesion',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
        { name: 'id', type: 'int' },
        { name: 'usuario', type: 'auto' },
        { name: 'seguridad', type: 'auto' }
    ]
});