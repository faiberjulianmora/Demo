Ext.define('Portal.Application', {
    extend: 'Ext.app.Application',
    name: 'Portal',
    launch: function(){
        Ext.getCmp('codigo').focus();
    }
});
