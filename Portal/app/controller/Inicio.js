var _controllerInicio;
var _msg;
var collapsePanel = false;
Ext.define('Portal.controller.Inicio',{
	extend: 'Ext.app.Controller',
	stores: [
        'Portal.store.inicio.Sesion',
        'Portal.store.PermisosFormulario'
    ],
	init: function(){
        _controllerInicio = this;
        _controllerInicio.getStore('Portal.store.inicio.Sesion').on('load', this.InicioSesion);
        this.control({
            'frmPortal':{
                clickBtnMenu: function() {
                    var csmLogo = Ext.getCmp('csm-logo'),
                        container = Ext.getCmp('mainContainer'),
                        navigationList = Ext.getCmp('treeMenu'),
                        collapsing = navigationList.getMicro(),
                        new_width = collapsing ? 250 : 64,
                        contenedorMenu = Ext.getCmp('contenedorMenu');
                    if(collapsing){
                        csmLogo.animate({dynamic: true, to: {width: new_width}});
                        contenedorMenu.setWidth(new_width);
                        navigationList.setWidth(new_width);
                        navigationList.setMicro(false);
                    }else{
                        contenedorMenu.setWidth(new_width);
                        navigationList.setWidth(new_width);
                        csmLogo.animate({
                            duration: 0,
                            dynamic: true, 
                            to: {width: new_width}
                        });
                        navigationList.setMicro(true);
                    }
                    container.updateLayout({isRoot: true});
                },
                clickMenu: function(form, componente, record){
                    if (record.getData().type == 2) {//verifica si el item seleccionado es de type form o url
                        window.open(record.getData().referencia);
                    } else {
                        var containerTabPanels = Ext.getCmp('tabPanelPortal');
                        var tabCreate = containerTabPanels.down('panel[name=tab' + record.getData().referencia + ']');
                        if (tabCreate == null) {
                            _msg = Ext.MessageBox.wait('Cargando Formulario...', 'Csm Cultivos');
                            _controllerInicio.getStore('Portal.store.PermisosFormulario').load({
                                params:{
                                    idUsuario: Portal.utils.Singleton.sesion.idUsuario,
                                    idFormulario: record.getData().idFormulario
                                },
                                callback: function(records, operation, success) {
                                    _msg.hide();
                                    if(success == true){
                                        Portal.utils.Singleton.sesion.permisos[record.getData().referencia] = Ext.Array.pluck(records, 'data');
                                        this.getController(record.getData().controlador);
                                        tabCreate = Ext.create('Portal.view.' + record.getData().referencia + '.Contenedor', {
                                            title: record.getData().text,
                                            name: 'tab' + record.getData().referencia,
                                            controllerName: record.getData().controlador,
                                            closable: true
                                        });
                                        tabCreate.on('close', function(panel){
                                            Portal.app.destroyController(panel.controllerName);
                                        });
                                        containerTabPanels.add(tabCreate);
                                        containerTabPanels.setActiveTab(tabCreate);
                                    }else{
                                        Ext.slide.message('Error', 'Ocurrio un error al cargar el formulario, por favor intentelo mas tarde', 3);
                                    }
                                },
                                scope: this
                            });
                        }else{
                            containerTabPanels.setActiveTab(tabCreate);
                        }
                    }
                }
            },
            'textfield[id=codigo]':{
                keydown: function(component, e){
                    if(e.getKey() == e.ENTER) {
                        if(component.getValue() != ''){
                            Ext.getCmp('clave').focus();
                        }else{
                            Ext.slide.message('Advertencia', 'Debe ingresar el código de usuario.', 2);
                        }
                    }
                }
            },
            'textfield[id=clave]':{
                keydown: function(component, e){
                    if(e.getKey() == e.ENTER) {
                        if(component.getValue() != ''){
                            Ext.getCmp('btnIngresarFrmSesion').focus();
                        }else{
                            Ext.slide.message('Advertencia', 'Debe ingresar la contraseña de usuario.', 2);
                        }
                    }
                }
            },
        	'button[id=btnIngresarFrmSesion]':{
        		click: function(){
                    _msg = Ext.MessageBox.wait('Validando información...', 'Hackathon');
                    var codigo = Ext.getCmp('codigo');
                    var clave = Ext.getCmp('clave');
                    codigo.setValue(Ext.util.Format.trim(codigo.getValue()));
                    clave.setValue(Ext.util.Format.trim(clave.getValue()));
                    if (codigo.isValid() && clave.isValid()) {
                        _controllerInicio.getStore('Portal.store.inicio.Sesion').load({
                            params:{
                                codigo: codigo.getValue(),
                                clave: CryptoJS.SHA1(clave.getValue()).toString()
                            }
                        });
                    }else{
                        _msg.hide();
                        Ext.slide.message('Advertencia', 'Complete la información para ingresar', 2);
                    }
                }
        	},
            'button[id=btnInformacionUsuarioPortal]':{
                click: function() {
                    alert('Información de Usuario');
                }
            }
        });
    },
    InicioSesion: function(store, records, success, operation){
        if(success == true){
            var store = Ext.create('Ext.data.TreeStore',{
                proxy: {
                    type: 'memory'
                }
            });
            store.setRootNode(records[0].getData().seguridad);
            Ext.getCmp('treeMenu').setStore(store);
            /*-------------------------------- Datos del Usuario que inicia sesion -------------------------------*/
            Portal.utils.Singleton.sesion.codigoUsuario = records[0].getData().usuario.CodigoUsuario;
            Portal.utils.Singleton.sesion.fechaNacimiento = records[0].getData().usuario.fechaNacimiento;
            Portal.utils.Singleton.sesion.idTercero = records[0].getData().usuario.idTercero;
            Portal.utils.Singleton.sesion.idUsuario = records[0].getData().usuario.idUsuario;
            Portal.utils.Singleton.sesion.identificacion = records[0].getData().usuario.identificacion;
            Portal.utils.Singleton.sesion.nombreCompleto = records[0].getData().usuario.nombreCompleto;
            Portal.utils.Singleton.sesion.idRoll = records[0].getData().idRoll;
            Portal.utils.Singleton.sesion.idCliente = records[0].getData().idCliente;
            Portal.utils.Singleton.sesion.permisos = new Array();
            /*----------------------------------------------------------------------------------------------------*/
            Ext.getCmp('frmPortal-txtNombreUsuario').setText(Portal.utils.Singleton.sesion.nombreCompleto);
            Ext.getCmp('idInicioContenedor').setActiveItem(1);
        }else{
            Ext.slide.message('Error', operation.getResultSet().getMessage(), 3);
        }
        _msg.hide();
    }
});