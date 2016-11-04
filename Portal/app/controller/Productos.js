var _controllerProductos;
var _editarProducto = false;
var _boxClientes;
var _permisosAdm = false;
Ext.define('Portal.controller.Productos',{
	extend: 'Ext.app.Controller',
    alias: 'controller.clientes',
	stores: [
        'Portal.store.productos.Productos', 
        'Portal.store.combo.Marcas'
    ],
    views: ['Portal.view.productos.Contenedor'],
	init: function(){
        _controllerProductos = this;
        this.control({
            //Eventos Formulario Listar
            'frmListaProductos':{
                onClickNuevo:function(){
                    Ext.getCmp('idContenedorProductos').setActiveItem(1);
                    Ext.getCmp('idFrmEditarProductos').setTitulo('Nuevo Producto');
                    _editarProducto = false;
                },
                onClickRefrescar: function(form, button){
                    _controllerProductos.fnFiltroProductos();
                },
                afterrender: function(form){
                	if(Portal.utils.Singleton.sesion.idRoll == '1'){
                		_permisosAdm = true;
                	}else{
                		_permisosAdm = false;
                	}
                }
            },
            'searchFieldExtend[id=frmListaProductos-sfFiltroProductos]':{
                onClickBuscarSearchField: function(value){
                    _controllerProductos.fnFiltroProductos();
                },
                onClickLimpiarSearchField: function(){
                	_controllerProductos.fnFiltroProductos();
                }
            },
            //Eventos Formulario Editar
            'frmEditarProductos':{
                onClickCancelar: function(){
                    Ext.getCmp('idContenedorProductos').setActiveItem(0);
                    Ext.getCmp('idFrmEditarProductos').reset();
                },
                onClickGuardar: function(){
                    var frmProductosEditar = Ext.getCmp('idFrmEditarProductos');
                    if(frmProductosEditar.isValid()){
                        var values = frmProductosEditar.getValues();
                        values.usuario = Portal.utils.Singleton.sesion.codigoUsuario;
                        values.precio = Ext.getCmp('frmEditarProductos-mfPrecio').getNumberValue();
                        _controllerProductos.getStore('Portal.store.productos.Productos').rejectChanges()
                        if (_editarProducto == true) {//Editando Registr del Cliente
                            var record = frmProductosEditar.getRecord();
                            record.set(values);
                            _boxClientes = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
                        }else {//Agregando Nuevo Cliente
                            _controllerProductos.getStore('Portal.store.productos.Productos').add(values);
                            _boxClientes = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
                        }
                        _controllerProductos.fnGuardarInformacion(frmProductosEditar);
                    }
                }
            },
            'gridControlExtend[id=frmListaProductos-gcListaProductos]':{
                onClickEditarGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
                    if(_permisosAdm){
						Ext.getCmp('idContenedorProductos').setActiveItem(1);
	                    var frmProductosEditar = Ext.getCmp('idFrmEditarProductos');
	                    frmProductosEditar.setTitulo('Editar Producto');
	                    frmProductosEditar.loadRecord(objData);
	                    _editarProducto = true;
                    }else{
                    	Ext.slide.message('Hackathon', 'No tiene permisos para editar la información', 2);
                    }
                }
            },
            'pagingtoolbar[id=frmListaProductos-paginarProductos]':{
                beforechange:function(){
                    _controllerProductos.getStore('Portal.store.productos.Productos').getProxy().setExtraParam('texto',Ext.getCmp('frmListaProductos-sfFiltroProductos').getValue());
                }
            }
        });
    },
    fnFiltroProductos: function(){
        _controllerProductos.getStore('Portal.store.productos.Productos').load({
            params:{
                start: 0,
                limit: 25,
                texto: Ext.getCmp('frmListaProductos-sfFiltroProductos').getValue()
            }
        });
    },
    fnGuardarInformacion: function(form){
        _boxMsg = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
        _controllerProductos.getStore('Portal.store.productos.Productos').sync({
            callback: function(record, operation, success){
                _boxMsg.hide();
            },
            success: function(){
                form.reset();
                _controllerProductos.getStore('Portal.store.productos.Productos').load();
                Ext.getCmp('idContenedorProductos').setActiveItem(0);
                Ext.slide.message('Hackathon', 'Información registrada correctamente.', 1);
            },
            failure:function(result){
                Ext.slide.message('Hackathon - Error', result.exceptions[0].error, 3);
            }
        });
    }
});