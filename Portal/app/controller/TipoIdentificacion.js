var _controllerTipoIdentificacion;
var _boxMsg;
var _editarTipoIdentificacion = false;
Ext.define('Portal.controller.TipoIdentificacion',{
    extend: 'Ext.app.Controller',
    stores: [
        'Portal.store.tipoIdentificacion.TipoIdentificacion'
    ],
    views: ['Portal.view.tipoIdentificacion.Contenedor'],
    init: function(){
        _controllerTipoIdentificacion = this;
        this.control({
            'frmListaTipoIdentificacion':{
                onClickNuevo: function(form, button){
                    Ext.getCmp('idContenedorTipoIdentificacion').setActiveItem(1);
                    Ext.getCmp('idFrmEditarTipoIdentificacion').setTitulo('Nuevo Tipo de Identificacion');
                    _editarTipoIdentificacion = false;
                },
                onClickRefrescar: function(form, button){
                    _controllerTipoIdentificacion.cargarStore();
                },
                onClickBuscarSearchField: function(){
                    _controllerTipoIdentificacion.cargarStore();
                },
                onClickLimpiarSearchField: function(){
                    _controllerTipoIdentificacion.cargarStore();
                },
                onClickEditarGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
                    var _frmEditarTipoIdentificacion = Ext.getCmp('idFrmEditarTipoIdentificacion');
                    var tipoIdentificacionSeleccionado = _controllerTipoIdentificacion.getStore('Portal.store.tipoIdentificacion.TipoIdentificacion').getAt(rowIndex);
                    console.log('tipoIdentificacionSeleccionado',tipoIdentificacionSeleccionado);
                    _frmEditarTipoIdentificacion.loadRecord(tipoIdentificacionSeleccionado);
                    _frmEditarTipoIdentificacion.setTitulo('Editar Tipo de Identificacion');
                    _editarTipoIdentificacion = true;
                    Ext.getCmp('idContenedorTipoIdentificacion').setActiveItem(1);
                }
            },
            'frmEditarTipoIdentificacion':{
                onClickCancelar: function(form, button){
                    form.reset();
                    Ext.getCmp('idContenedorTipoIdentificacion').setActiveItem(0);
                },
                onClickGuardar: function(form, button){
                    var _frmEditarTipoIdentificacion = Ext.getCmp('idFrmEditarTipoIdentificacion');
                    if(_frmEditarTipoIdentificacion.isValid()){
                        var values = _frmEditarTipoIdentificacion.getValues();
                        if(_editarTipoIdentificacion == true){//Editar registro
                            var record = _frmEditarTipoIdentificacion.getRecord();
                            record.set(values);
                            if(record.dirty ==  true){
                                _controllerTipoIdentificacion.guardarInformacion(form);
                            }else{//cuando no se modifican los registros y dan click en guardar
                                form.reset();
                                Ext.getCmp('idContenedorTipoIdentificacion').setActiveItem(0);
                            }
                        }else{//Nuevo Registro
                            _controllerTipoIdentificacion.getStore('Portal.store.tipoIdentificacion.TipoIdentificacion').add(values);
                            _controllerTipoIdentificacion.guardarInformacion(form);
                        }
                    }else{
                        Ext.slide.message('Error', 'Complete la información correspondiente.', 3);
                    }
                }
            },
            'pagingtoolbar[id=frmTipoIdentificacion-paginarIdentificacion]':{
                beforechange:function(){
                    _controllerTipoIdentificacion.getStore('Portal.store.tipoIdentificacion.TipoIdentificacion').getProxy().setExtraParam('texto', Ext.getCmp('frmListaTipoIdentificacion-sfFiltro').getValue());
                }
            }
        });
    },
    guardarInformacion: function(form){
        _boxMsg = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
        _controllerTipoIdentificacion.getStore('Portal.store.tipoIdentificacion.TipoIdentificacion').sync({
            callback: function(record, operation, success){
                _boxMsg.hide();
            },
            success: function(){
                form.reset();
                _controllerTipoIdentificacion.cargarStore();
                Ext.getCmp('idContenedorTipoIdentificacion').setActiveItem(0);
                Ext.slide.message('Hackathon', 'Información registrada correctamente.', 1);
            },
            failure:function(result){
                Ext.slide.message('Hackathon', result.exceptions[0].error, 3);
            }
        });
    },
    cargarStore: function(){
        _controllerTipoIdentificacion.getStore('Portal.store.tipoIdentificacion.TipoIdentificacion').load({
            params:{
                start: 0,
                limit: 25,
                texto: Ext.getCmp('frmListaTipoIdentificacion-sfFiltro').getValue()
            }
        });
    }
});