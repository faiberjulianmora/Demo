var _controllerPais;
var _boxMsg;
var editarPais = false;
Ext.define('Portal.controller.Pais',{
	extend: 'Ext.app.Controller',
	stores: [
        'Portal.store.pais.Pais'
    ],
	views: ['Portal.view.pais.Contenedor'],
	init: function(){
        _controllerPais = this;

        this.control({
        	'frmListaPais':{
        		onClickNuevo: function(form, button){
        			Ext.getCmp('idContenedorPais').setActiveItem(1);
        			Ext.getCmp('idFrmEditarPais').setTitulo('Nuevo Registro de Pais');
        			editarPais = false;
        		},
                onClickRefrescar: function(form, button){
                    _controllerPais.cargarStore();
                },
                onClickBuscarSearchField: function(){
                    _controllerPais.cargarStore();
                },
                onClickLimpiarSearchField: function(){
                    _controllerPais.cargarStore();
                },
                onClickEditarGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
                    var _frmEditarPais = Ext.getCmp('idFrmEditarPais');
                    var paisSeleccionado = _controllerPais.getStore('Portal.store.pais.Pais').getAt(rowIndex);
                    _frmEditarPais.loadRecord(paisSeleccionado);
                    _frmEditarPais.setTitulo('Editar Registro Pais');
                    editarPais = true;
                    Ext.getCmp('idContenedorPais').setActiveItem(1);
                }
         	},
        	'frmEditarPais':{
        		onClickCancelar: function(form, button){
        			form.reset();
        			Ext.getCmp('idContenedorPais').setActiveItem(0);
        		},
        		onClickGuardar: function(form, button){
        			var _frmEditarPais = Ext.getCmp('idFrmEditarPais');
        			if(_frmEditarPais.isValid()){
        				var values = _frmEditarPais.getValues();
                        values.usuario = Portal.utils.Singleton.sesion.codigoUsuario;
        				if(editarPais == true){//Editar registro
        					var record = _frmEditarPais.getRecord();
        					record.set(values);
        					if(record.dirty ==  true){
        						_controllerPais.guardarInformacion(form);
        					}else{//cuando no se modifican los registros y dan click en guardar
        						form.reset();
        						Ext.getCmp('idContenedorPais').setActiveItem(0);
        					}
	        			}else{//Nuevo Registro
	        				_controllerPais.getStore('Portal.store.pais.Pais').add(values);
	        				_controllerPais.guardarInformacion(form);
	        			}
        			}else{
        				Ext.slide.message('Error', 'Complete la información correspondiente.', 3);
        			}
        		}
        	},
            'pagingtoolbar[id=frmPais-paginarPais]':{
                beforechange:function(){
                    _controllerPais.getStore('Portal.store.pais.Pais').getProxy().extraParams.texto = Ext.getCmp('sfBuscarPaisFrmListaPais').getValue();
                }
            },
            'gridControl[id=gcListaPaisesFrmListaPais]':{
                onClickEditarGridControl: function (grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClas) {
                    console.log('grid', grid);
                }
            }
        });
    },
    guardarInformacion: function(form){
    	_boxMsg = Ext.MessageBox.wait('Por favor espere un momento', 'Guardando información');
		_controllerPais.getStore('Portal.store.pais.Pais').sync({
			callback: function(record, operation, success){
				_boxMsg.hide();
			},
            success: function(){
                form.reset();
                _controllerPais.cargarStore();
                Ext.getCmp('idContenedorPais').setActiveItem(0);
                Ext.slide.message('Hackathon', 'Información registrada correctamente.', 1);
            },
            failure:function(result){
                Ext.slide.message('Hackathon', result.exceptions[0].error, 3);
            }
        });
    },
    cargarStore: function(){
       _controllerPais.getStore('Portal.store.pais.Pais').load({
            params:{
                start: 0,
                limit: 25,
                texto: Ext.getCmp('frmListaPais-sfFiltro').getValue()
            }
        });
    }
});