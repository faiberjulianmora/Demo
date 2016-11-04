Ext.define('Portal.view.inicio.Sesion', {
    autoScroll: true,
    extend: 'Ext.panel.Panel',
    alias: 'widget.frmSesion',
    layout: 'border',
    bodyStyle: { 'background-color': 'transparent' },
    cls: 'imgBackgroundSesion',
    items: [{
        region: 'center',
        bodyStyle: { 'background-color': 'transparent' },
        flex: 1,
        layout: { type: 'hbox', align: 'stretch' },
        items: [{
            xtype: 'tbspacer',
            flex: 2
        },{
            xtype: 'panel',
            bodyStyle: { 'background-color': 'transparent' },
            cls: 'franjaTransparente',
            layout: { type: 'vbox', align: 'stretch' },
            width: 320,
            items:[{
                xtype: 'tbspacer',
                flex: 1
            },{
                xtype: 'image',
                width: 350,
                height: 300,
                imgCls: 'imgLoginFrmSesion'
            },{
                xtype: 'textfield',
                emptyText: 'Código',
                width: '100%',
                margin: '0 20 0 20',
                labelClsExtra: 'textSesion',
                allowBlank: false,
                blankText: 'Debe ingresar el código de usuario.',
                enableKeyEvents: true,
                id: 'codigo',
                value: 'fjmora'
            },{
                xtype: 'textfield',
                emptyText: 'Contraseña',
                inputType: 'password',
                width: '100%',
                margin: '15 20 10 20',
                labelClsExtra: 'textSesion',
                allowBlank: false,
                blankText: 'Debe ingresar la contraseña de usuario.',
                enableKeyEvents: true,
                id: 'clave',
                value: '123'
            },{
                xtype: 'button',
                id: 'btnIngresarFrmSesion',
                text: 'Entrar',
                cls: 'btnIngresar',
                margin: '20 80 0 80'
            },{
                xtype: 'tbspacer',
                flex: 4
            }]
        },{
            xtype: 'tbspacer',
            flex: 2
        }]
    }]
});