Ext.define('Portal.controller.ReporteConsumo', {
    extend: 'Ext.app.Controller',
    alias: 'controller.recumenCostos',
    stores: ['Portal.store.combo.Clientes'],
    views:['Portal.view.reporteConsumo.Contenedor'],
    init: function(){
        _resumenCostos = this;
        this.control({
            'button[name=generarReporte]':{
                click: function(button){
                    var cliente = Ext.getCmp('listaClientesReporte').getValue();
                    if(cliente != null && cliente != ''){
                        Ext.getCmp('ContainerReporte').update('<iframe style="overflow:auto;position:absolute;width:100%;height:100%;" frameborder="0"  src="../Reportes/reporteConsumo/?idCliente='+ cliente +'"></iframe>');
                    }else{
                        Ext.slide.message('Error', 'Debe seleccionar el cliente para el reporte.', 3);
                    }
                }
            }
        });
    }
});