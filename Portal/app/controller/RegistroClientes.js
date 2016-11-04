var _controllerClientes;
var _editaCliente = false;
var _boxClientes;
Ext.define('Portal.controller.RegistroClientes',{
	extend: 'Ext.app.Controller',
    alias: 'controller.clientes',
	stores: [
        'Portal.store.clientes.Clientes', 
        'Portal.store.tipoIdentificacion.TipoIdentificacion'
    ],
    views: ['Portal.view.registroClientes.Contenedor'],
	init: function(){
        _controllerClientes = this;
        this.control({
            //Eventos Formulario Listar
            'frmListaClientes':{
                onClickNuevo:function(){
                    Ext.getCmp('idContenedorRegistroClientes').setActiveItem(1);
                    Ext.getCmp('idRegistroClientesEditar').setTitulo('Nuevo Cliente');
                    _editaCliente = false;
                },
                onClickRefrescar: function(form, button){
                    _controllerClientes.fnFiltroClientes();
                }
            },
            'searchFieldExtend[id=frmRegistroClientesLista-sfBuscarClientes]':{
                onClickBuscarSearchField: function(value){
                    _controllerClientes.fnFiltroClientes();
                }
            },
            //Eventos Formulario Editar
            'frmEdiartClientes':{
                onClickCancelar: function(){
                    Ext.getCmp('idContenedorRegistroClientes').setActiveItem(0);
                    Ext.getCmp('idRegistroClientesEditar').reset();
                },
                onClickGuardar: function(){
                    var frmEditarCliente = Ext.getCmp('idRegistroClientesEditar');
                    if(frmEditarCliente.isValid()){
                        var values = frmEditarCliente.getValues();
                        values.usuario = Portal.utils.Singleton.sesion.codigoUsuario;
                        _controllerClientes.getStore('Portal.store.clientes.Clientes').rejectChanges()
                        if (_editaCliente == true) {//Editando Registr del Cliente
                            var record = frmEditarCliente.getRecord();
                            record.set(values);
                            _boxClientes = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
                        }else {//Agregando Nuevo Cliente
                            _controllerClientes.getStore('Portal.store.clientes.Clientes').add(values);
                            _boxClientes = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
                        }
                        _controllerClientes.fnGuardarInformacion(frmEditarCliente);
                    }
                }
            },
            'gridControlExtend[id=frmRegistroClientesLista-gcClientes]':{
                onClickEditarGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
                    Ext.getCmp('idContenedorRegistroClientes').setActiveItem(1);
                    var frmEditarCliente = Ext.getCmp('idRegistroClientesEditar');
                    frmEditarCliente.setTitulo('Editar Cliente');
                    frmEditarCliente.loadRecord(objData);
                    _editaCliente = true;
                }
            },
            'pagingtoolbar[id=frmRegistroClientesLista-paginarClientes]':{
                beforechange:function(){
                    _controllerClientes.getStore('Portal.store.clientes.Clientes').getProxy().setExtraParam('texto',Ext.getCmp('frmRegistroClientesLista-sfBuscarClientes').getValue());
                }
            }
        });
    },
    fnFiltroClientes: function(){
        _controllerClientes.getStore('Portal.store.clientes.Clientes').load({
            params:{
                start: 0,
                limit: 25,
                texto: Ext.getCmp('frmRegistroClientesLista-sfBuscarClientes').getValue()
            }
        });
    },
    fnGuardarInformacion: function(form){
        _boxMsg = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
        _controllerClientes.getStore('Portal.store.clientes.Clientes').sync({
            callback: function(record, operation, success){
                _boxMsg.hide();
            },
            success: function(){
                form.reset();
                _controllerClientes.getStore('Portal.store.clientes.Clientes').load();
                Ext.getCmp('idContenedorRegistroClientes').setActiveItem(0);
                Ext.slide.message('Hackathon', 'Información registrada correctamente.', 1);
            },
            failure:function(result){
                Ext.slide.message('Hackathon - Error', result.exceptions[0].error, 3);
            }
        });
    }
});