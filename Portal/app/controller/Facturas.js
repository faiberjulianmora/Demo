var _controllerFacturas;
var _editarVenta = false;
var _boxVentas;
Ext.define('Portal.controller.Facturas',{
	extend: 'Ext.app.Controller',
    alias: 'controller.facturas',
	stores: [
        'Portal.store.facturas.Facturas'
    ],
    views: ['Portal.view.facturas.Contenedor'],
	init: function(){
        _controllerFacturas = this;
        this.control({
            //Eventos Formulario Listar
            'frmListaFacturas':{
                onClickRefrescar: function(form, button){
                    _controllerFacturas.fnFiltroFacturas();
                }
            },
            //Eventos Formulario Editar
            'frmEditarFacturas':{
                onClickCancelar: function(){
                    Ext.getCmp('idContenedorFacturas').setActiveItem(0);
                    Ext.getCmp('idfrmEditarFacturas').reset();
                }
            },
            'gridControlExtend[id=frmListaVentas-gcListaFacturas]':{
                onClickVerGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
                    Ext.getCmp('idContenedorFacturas').setActiveItem(1);
                    var frmEditarFactura = Ext.getCmp('idfrmEditarFacturas');
                    frmEditarFactura.setTitulo('Factura ' + objData.getData().invoice_number);
                    frmEditarFactura.loadRecord(objData);
					console.log('objData',objData);
                }
            }
        });
    },
    fnFiltroFacturas: function(){
        _controllerFacturas.getStore('Portal.store.facturas.Facturas').load({
            params:{
                tipo: Ext.getCmp('typeFilterInvoices').getValue(),
                value: Ext.getCmp('valueFilterInvoices').getNumberValue()
            }
        });
    }
});