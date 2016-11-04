var _controllerVentas;
var _editarVenta = false;
var _boxVentas;
Ext.define('Portal.controller.Ventas',{
	extend: 'Ext.app.Controller',
    alias: 'controller.clientes',
	stores: [
        'Portal.store.ventas.Ventas', 
        'Portal.store.ventas.VentasDetalle',
        'Portal.store.combo.Clientes',
        'Portal.store.listas.Productos'
    ],
    views: ['Portal.view.ventas.Contenedor'],
	init: function(){
        _controllerVentas = this;
        this.control({
            //Eventos Formulario Listar
            'frmListaVentas':{
                onClickNuevo:function(){
                    Ext.getCmp('idContenedorVentas').setActiveItem(1);
                    Ext.getCmp('idfrmEditarVenta').setTitulo('Nueva Venta');
                    Ext.getCmp('frmEditarVenta-gcDetalleCompra').getStore().removeAll();
                    Ext.getCmp('frmRegistroClientes-dfFechaVenta').setValue(new Date());
                    _editarVenta = false;
                },
                onClickRefrescar: function(form, button){
                    _controllerVentas.fnFiltroVentas();
                }
            },
            'searchFieldExtend[id=frmListaVentas-sfFiltroVentas]':{
                onClickBuscarSearchField: function(value){
                    _controllerVentas.fnFiltroVentas();
                },
                onClickLimpiarSearchField: function(){
                	_controllerVentas.fnFiltroVentas();
                }
            },
            //Eventos Formulario Editar
            'frmEditarVenta':{
                onClickCancelar: function(){
                    Ext.getCmp('idContenedorVentas').setActiveItem(0);
                    Ext.getCmp('idfrmEditarVenta').reset();
                },
                onClickGuardar: function(){
                    var frmEditarVenta = Ext.getCmp('idfrmEditarVenta');
                    var detalle = Ext.Array.pluck(Ext.getCmp('frmEditarVenta-gcDetalleCompra').getStore().getModifiedRecords(),'data');
                    console.log('count', detalle.length);
                    if(frmEditarVenta.isValid() && detalle.length > 0){
                        var values = frmEditarVenta.getValues();
                        values.usuario = Portal.utils.Singleton.sesion.codigoUsuario;
                        values.totalContado = Ext.getCmp('frmEditarVenta-mfTotalContado').getNumberValue();
                        values.totalCredito = Ext.getCmp('frmEditarVenta-mfTotalCredito').getNumberValue();
                        values.totalCompra = Ext.getCmp('frmEditarVenta-mfValorTotal').getNumberValue();
                        values.ventaDetalle  = detalle;
                        _controllerVentas.getStore('Portal.store.ventas.Ventas').rejectChanges()
                        if (_editarVenta == true) {//Editando Registr del Cliente
                            var record = frmEditarVenta.getRecord();
                            record.set(values);
                            _boxVentas = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
                        }else {//Agregando Nuevo Cliente
                            _controllerVentas.getStore('Portal.store.ventas.Ventas').add(values);
                            _boxVentas = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
                        }
                        _controllerVentas.fnGuardarInformacion(frmEditarVenta);
                    }else{
                        Ext.slide.message('Error', 'Complete toda la información', 3);
                    }
                },
                cambioTotal: function(){
                    var grid = Ext.getCmp('frmEditarVenta-gcDetalleCompra');
                    var arrayEdit = Array();
                    var totalCompra = 0;
                    Ext.Array.forEach(grid.getStore().getData().items, function(item){
                        var totalText = item.getData().totalProducto;
                        totalText = totalText.replace(/\D/g,'');
                        totalCompra += parseInt(totalText);
                        arrayEdit.push(item.getData());
                    });
                    Ext.getCmp('frmEditarVenta-mfValorTotal').setValue(totalCompra);
                    Ext.getCmp('frmEditarVenta-mfTotalCredito').setValue(0);
                    Ext.getCmp('frmEditarVenta-mfTotalContado').setValue(totalCompra);
                }
            },
            'gridControlExtend[id=frmListaVentas-gcListaVentas]':{
                onClickEditarGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
					Ext.getCmp('idContenedorVentas').setActiveItem(1);
                    var frmEditarVenta = Ext.getCmp('idfrmEditarVenta');
                    frmEditarVenta.setTitulo('Editar Venta');
                    frmEditarVenta.loadRecord(objData);
                    //DEBE CARGAR EL DETALLE DE LA VENTA
                    _controllerVentas.getStore('Portal.store.ventas.VentasDetalle').load({
                        params:{
                            idVenta: objData.getData().id
                        }
                    })
                    _editarVenta = true;
                }
            },
            'moneyFieldExtend[id=frmEditarVenta-mfTotalCredito]':{
                blur: function(component){
                    var totalContado = Ext.getCmp('frmEditarVenta-mfTotalContado'),
                        totalVenta = Ext.getCmp('frmEditarVenta-mfValorTotal'),
                        totalCredito = Ext.getCmp('frmEditarVenta-mfTotalCredito');
                    if(parseInt(totalCredito.getNumberValue()) > parseInt(totalVenta.getNumberValue())){
                        Ext.slide.message('Error','El valor del credito no puede ser mayor al de la compra.',3);
                        totalCredito.setValue(0);
                        totalContado.setValue(totalVenta.getNumberValue());
                    }else{
                        totalContado.setValue(parseInt(totalVenta.getNumberValue()) - parseInt(totalCredito.getNumberValue()));
                    }
                }
            },
            'moneyFieldExtend[id=frmEditarVenta-mfTotalContado]':{
                blur: function(component){
                    var totalContado = Ext.getCmp('frmEditarVenta-mfTotalContado'),
                        totalVenta = Ext.getCmp('frmEditarVenta-mfValorTotal'),
                        totalCredito = Ext.getCmp('frmEditarVenta-mfTotalCredito');
                    if(parseInt(totalContado.getNumberValue()) > parseInt(totalVenta.getNumberValue())){
                        Ext.slide.message('Error','El valor de contado no puede ser mayor al de la compra.',3);
                        totalCredito.setValue(0);
                        totalContado.setValue(totalVenta.getNumberValue());
                    }else{
                        totalCredito.setValue(parseInt(totalVenta.getNumberValue()) - parseInt(totalContado.getNumberValue()));
                    }
                }
            },
            'pagingtoolbar[id=frmListaVentas-paginarVentas]':{
                beforechange:function(){
                    _controllerVentas.getStore('Portal.store.ventas.Ventas').getProxy().setExtraParam('texto',Ext.getCmp('frmListaVentas-sfFiltroVentas').getValue());
                }
            },
            /*EVENTOS POPUP*/
            'button[id=btnAgregarProducto]':{
                click: function(button){
                    var popup = button.up('popupListaProductos');
                    var grid = popup.down('gridControlExtend[name=popupListaProductos-gcListaProductos]');
                    var listProductos = new Array();
                    Ext.Array.forEach(grid.selModel.selected.items, function(item){
                        listProductos.push(item.getData())
                        Ext.getCmp('frmEditarVenta-gcDetalleCompra').getStore().add({
                            idProducto: item.getData().id,
                            nombreProducto: item.getData().nombre,
                            valorUnidadProducto: item.getData().precio,
                            cantidadProducto: 0,
                            totalProducto: '$ 0'
                        });
                    });

                }
            }
        });
    },
    fnFiltroVentas: function(){
        _controllerVentas.getStore('Portal.store.ventas.Ventas').load({
            params:{
                start: 0,
                limit: 25,
                texto: Ext.getCmp('frmListaVentas-sfFiltroVentas').getValue()
            }
        });
    },
    fnGuardarInformacion: function(form){
        _boxMsg = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
        _controllerVentas.getStore('Portal.store.ventas.Ventas').sync({
            callback: function(record, operation, success){
                _boxMsg.hide();
            },
            success: function(){
                form.reset();
                _controllerVentas.getStore('Portal.store.ventas.Ventas').load();
                Ext.getCmp('idContenedorVentas').setActiveItem(0);
                Ext.slide.message('Hackathon', 'Información registrada correctamente.', 1);
            },
            failure:function(result){
                Ext.slide.message('Hackathon - Error', result.exceptions[0].error, 3);
            }
        });
    }
});