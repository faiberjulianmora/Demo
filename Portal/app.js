Ext.enableAriaButtons = false;
Ext.override(Ext.data.proxy.Ajax, { timeout: 120000 }); //2 minutos
Ext.application({
    name: 'Portal',
    extend: 'Portal.Application',
    requires: [
        'Portal.view.inicio.Contenedor',
        'Portal.utils.Singleton',
        'Portal.controller.Inicio'
    ],
    controllers:['Inicio'],
    mainView: 'Portal.view.inicio.Contenedor'
});