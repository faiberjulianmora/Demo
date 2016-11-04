var _controllerDepartamento;
var _boxMsg;
var editarDepartamento = false;
Ext.define('Portal.controller.Departamento',{
	extend: 'Ext.app.Controller',
	stores: [
		'Portal.store.departamento.Departamento',
		'Portal.store.pais.Pais'
	],
	views: ['Portal.view.departamento.Contenedor'],
	init: function(){
		_controllerDepartamento = this;
		this.control({
			'frmListaDepartamento':{
				onclickNuevo: function(form, button){
					Ext.getCmp('idContenedorDepartamento').setActiveItem(1);
					Ext.getCmp('idFrmEditarDepartamento').setTitulo('Nuevo Registro de Departamento');
					editarDepartamento = false;
				},
				onClickRefrescar: function(form, button){
					_controllerDepartamento.cargarStore();
				},
				onClickBuscarSearchField: function(){
                    _controllerDepartamento.cargarStore();
                },
                onClickLimpiarSearchField: function(){
                    _controllerDepartamento.cargarStore();
                },
                onclickEditarGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
					var _frmEditarDepartamento = Ext.getCmp('idFrmEditarDepartamento');
					var departamentoSeleccionado = _controllerDepartamento.getStore('Portal.store.departamento.Departamento').getAt(rowIndex);
					_frmEditarDepartamento.loadRecord(departamentoSeleccionado);
					_frmEditarDepartamento.setTitulo('Editar Registro Departamento');
					editarDepartamento = true;
					Ext.getCmp('idContenedorDepartamento').setActiveItem(1);
				}
			},
			'frmEditarDepartamento':{
				onClickCancelar: function(form, button){
					form.reset();
					Ext.getCmp('idContenedorDepartamento').setActiveItem(0);
					//_controllerDepartamento.cargarStore();
				},
				onClickGuardar: function(form, button){
					var _frmEditarDepartamento = Ext.getCmp('idFrmEditarDepartamento');
					if(_frmEditarDepartamento.isValid()){
						var values = _frmEditarDepartamento.getValues();
						values.usuario = Portal.utils.Singleton.sesion.codigoUsuario;
						if(editarDepartamento == true){//Editar Registro
							var record = _frmEditarDepartamento.getRecord();
							record.set(values);
							if(record.dirty == true){
								_controllerDepartamento.guardarInformacion(form);
							}else{//cuando no se modifican los registros y dan click en guardar
        						form.reset();
        						Ext.getCmp('idContenedorDepartamento').setActiveItem(0);
        					}
						}else{//Nuevo Registro
	        				_controllerDepartamento.getStore('Portal.store.departamento.Departamento').add(values);
	        				_controllerDepartamento.guardarInformacion(form);
	        			}
					}else{
        				Ext.slide.message('Error', 'Complete la información correspondiente.', 3);
        			}
				},
				onSelectPais: function(form, componente){
					form.down('textFieldExtend[name=nombreDepartamento]').focus();
				},
				onKeyDownNombre: function(form, componente){
					form.fireEvent('onClickGuardar', form, componente);
				}
			}
		});
    },
    guardarInformacion: function(form){
    	_boxMsg = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
		_controllerDepartamento.getStore('Portal.store.departamento.Departamento').sync({
			scope: _controllerDepartamento,
			callback: function(record, operation, success){
				_boxMsg.hide();
			},
			success: function(){
				form.reset();
				_controllerDepartamento.cargarStore();
				Ext.getCmp('idContenedorDepartamento').setActiveItem(0);
				Ext.slide.message('Hackathon', 'Información registrada correctamente.', 1);
			},
			failure:function(result){
                Ext.slide.message('Hackathon', result.exceptions[0].error, 3);
            }
		});
    },
    cargarStore: function(){
        _controllerDepartamento.getStore('Portal.store.departamento.Departamento').load({
            params:{
                start: 0,
                limit: 25,
                texto: Ext.getCmp('frmListaDepartamento-sfFiltroDepartamento').getValue()
            }
        });
    },
    'pagingtoolbar[id=frmListaDepartamento-paginarDepartamento]':{
        beforechange:function(){
        	_controllerDepartamento.getStore('Portal.store.departamento.Departamento').getProxy().setExtraParam('texto', Ext.getCmp('frmListaDepartamento-sfFiltroDepartamento').getValue());A
        }
    }
});