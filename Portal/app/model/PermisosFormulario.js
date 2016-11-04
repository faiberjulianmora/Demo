Ext.define('Portal.model.PermisosFormulario',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
        { name:'id',type:'int'},
        { name:'codigo',type:'string'},
        { name:'nombre',type:'string'}
    ]
});