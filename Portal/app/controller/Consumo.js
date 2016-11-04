var _controllerConsumo;
Ext.define('Portal.controller.Consumo',{
	extend: 'Ext.app.Controller',
    alias: 'controller.consumo',
	stores: [
        'Portal.store.consumo.Consumo'
    ],
    views: ['Portal.view.consumo.Contenedor'],
	init: function(){
        _controllerConsumo = this;
        this.control({
            'frmListaConsumo':{
                afterrender: function(){
                    _controllerConsumo.getStore('Portal.store.consumo.Consumo').load({
                        params: {
                            idCliente: Portal.utils.Singleton.sesion.idCliente
                        }
                    })
                }
            }
        });
    }
});