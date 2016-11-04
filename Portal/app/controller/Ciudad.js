var _controllerCiudad;
var _boxMsg;
var editarCiudad = false;
Ext.define('Portal.controller.Ciudad',{
	extend: 'Ext.app.Controller',
	stores: [
        'Portal.store.ciudad.Ciudad',
        'Portal.store.departamento.Departamento',
        'Portal.store.pais.Pais'
    ],
	views: ['Portal.view.ciudad.Contenedor'],
	init: function(){
        _controllerCiudad = this;
        this.control({
        	'frmListaCiudad':{
        		onClickNuevo: function(form, button){
        			Ext.getCmp('idContenedorCiudad').setActiveItem(1);
        			Ext.getCmp('idFrmEditarCiudad').setTitulo('Nuevo Registro de Ciudad');
        			editarCiudad = false;
        		},
                onClickRefrescar: function(form, button){
                    _controllerCiudad.cargarStore();
                },
                onClickBuscarSearchField: function(){
                    _controllerCiudad.cargarStore();
                },
                onClickLimpiarSearchField: function(){
                    _controllerCiudad.cargarStore();
                },
                onClickEditarGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
                    var _frmEditarCiudad = Ext.getCmp('idFrmEditarCiudad');
                    var paisSeleccionado = _controllerCiudad.getStore('Portal.store.ciudad.Ciudad').getAt(rowIndex);
                    _frmEditarCiudad.loadRecord(paisSeleccionado);
                    _frmEditarCiudad.setTitulo('Editar Registro Pais');
                    editarCiudad = true;
                    Ext.getCmp('idContenedorCiudad').setActiveItem(1);
                }
        	},
        	'frmEditarCiudad':{
        		onClickCancelar: function(form, button){
        			form.reset();
        			Ext.getCmp('idContenedorCiudad').setActiveItem(0);
        		},
        		onClickGuardar: function(form, button){
        			var _frmEditarCiudad = Ext.getCmp('idFrmEditarCiudad');
        			if(_frmEditarCiudad.isValid()){
        				var values = _frmEditarCiudad.getValues();
                        values.usuario = Portal.utils.Singleton.sesion.codigoUsuario;
        				if(editarCiudad == true){//Editar registro
        					var record = _frmEditarCiudad.getRecord();
        					record.set(values);
        					if(record.dirty ==  true){
        						_controllerCiudad.guardarInformacion(form);
        					}else{//cuando no se modifican los registros y dan click en guardar
        						form.reset();
        						Ext.getCmp('idContenedorCiudad').setActiveItem(0);
        					}
	        			}else{//Nuevo Registro
	        				_controllerCiudad.getStore('Portal.store.ciudad.Ciudad').add(values);
	        				_controllerCiudad.guardarInformacion(form);
	        			}
        			}else{
        				Ext.slide.message('Error', 'Complete la información correspondiente.', 3);
        			}
        		},
                onKeyDownPais: function(form, componente){
                    form.down('comboExtend[name=idDepartamento]').focus();
                },
                onSelectPais: function(form, component, record){
                    _controllerCiudad.getStore('Portal.store.departamento.Departamento').load({
                        params:{
                            idPais: record.getData().id
                        }
                    });
                },
                onKeyDownDepartamento: function(form, componente){
                    form.down('textFieldExtend[name=nombreCiudad]').focus();
                },
                onKeyDownNombre: function(form, componente){
                    form.fireEvent('onClickGuardar', form, componente);
                }
        	},
            'pagingtoolbar[id=frmListaCiudad-paginarCiudad]':{
                beforechange:function(){
                    _controllerCiudad.getStore('Portal.store.ciudad.Ciudad').getProxy().setExtraParam('texto', Ext.getCmp('frmListaCiudad-sfFiltroCiudad').getValue());
                }
            }
        });
    },
    guardarInformacion: function(form){
    	_boxMsg = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
		_controllerCiudad.getStore('Portal.store.ciudad.Ciudad').sync({
            callback: function(record, operation, success){
                _boxMsg.hide();
            },
            success: function(){
                form.reset();
                _controllerCiudad.getStore('Portal.store.ciudad.Ciudad').load();
                Ext.getCmp('idContenedorCiudad').setActiveItem(0);
                Ext.slide.message('Hackathon', 'Información registrada correctamente.', 1);
            },
            failure:function(result){
                Ext.slide.message('Hackathon', result.exceptions[0].error, 3);
            }
		});
    },
    cargarStore: function(){
        _controllerCiudad.getStore('Portal.store.ciudad.Ciudad').load({
            params:{
                start: 0,
                limit: 25,
                texto: Ext.getCmp('frmListaCiudad-sfFiltroCiudad').getValue()
            }
        });
    }
});