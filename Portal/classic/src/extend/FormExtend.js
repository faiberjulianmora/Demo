Ext.define('Portal.extend.FormExtend', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formExtend',
    habilitarNuevo: false,
    habilitarGuardar: false,
    habilitarRefrescar: false,
    habilitarCancelar: false,
    habilitarImprimir: false,
    habilitarExportar: false,
    habilitarSincronizar: false,
    visualizarSincronizar: false,
    visualizarImprimir: false,
    visualizarImportar: false,
    habilitarCultivo: false,
    visualizarTitulo: true,
    layout:{
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems: [{
        xtype: 'panel',
        dock: 'top',
        height: 45,
        name: 'contenedorTitulo',
        layout: { type: 'hbox', align: 'middle' },
        items: [{
            xtype: 'label',
            name: 'lblFormExtend',
            margin: '0 0 0 10',
            cls: 'titleFormExtendCls'
        }]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        autoScroll: true,
        items: [{
            name: 'btnNuevo',
            text: 'Nuevo',
            cls: 'btnFormCls',
            //iconCls: 'iconoAgregar',
            iconCls: 'x-fa fa-plus btnFormClsIcon',
            iconAlign: 'left',
            scale: 'medium',
            tooltip: 'Nuevo',
            //width: 60,
            listeners: {
                click: function(){
                    this.up('formExtend').fireEvent('onClickNuevo', this.up('formExtend'), this);
                }
            }
        }, {
            name: 'btnGuardar',
            text: 'Guardar',
            cls: 'btnFormCls',
            //iconCls: 'iconoGuardar',
            iconCls: 'x-fa fa-save btnFormClsIcon',
            iconAlign: 'left',
            scale: 'medium',
            tooltip: 'Guardar',
            //width: 60,
            listeners: {
                click: function(){
                    this.up('formExtend').fireEvent('onClickGuardar', this.up('formExtend'), this);
                }
            }
        }, {
            name: 'btnRefrescar',
            text: 'Refrescar',
            cls: 'btnFormCls',
            //iconCls: 'iconoBuscar',
            iconCls: 'x-fa fa-refresh btnFormClsIcon',
            iconAlign: 'left',
            scale: 'medium',
            tooltip: 'Refrecar',
            //width: 60,
            listeners: {
                click: function(){
                    this.up('formExtend').fireEvent('onClickRefrescar', this.up('formExtend'), this);
                }
            }
        }, {
            name: 'btnCancelar',
            text: 'Cancelar',
            cls: 'btnFormCls',
            //iconCls: 'iconoCancelar',
            iconCls: 'x-fa fa-close btnFormClsIcon',
            iconAlign: 'left',
            scale: 'medium',
            tooltip: 'Cancelar',
            //width: 60,
            listeners: {
                click: function(){
                    this.up('formExtend').fireEvent('onClickCancelar', this.up('formExtend'), this);
                }
            }
        }, {
            name: 'btnImprimir',
            text: 'Imprimir',
            cls: 'btnFormCls',
            //iconCls: 'iconoImprimir ',
            iconCls: 'x-fa fa-print btnFormClsIcon',
            iconAlign: 'left',
            scale: 'medium',
            tooltip: 'Imprimir',
            //width: 60,
            listeners: {
                click: function(){
                    this.up('formExtend').fireEvent('onClickImprimir', this.up('formExtend'), this);
                }
            }
        },{
            name: 'btnExportar',
            text: 'Exportar',
            cls: 'btnFormCls',
            //iconCls: 'iconPrintCls',
            iconCls: 'x-fa fa-upload btnFormClsIcon',
            scale: 'medium',
            hidden: true,
            iconAlign: 'left',
            tooltip: 'Exportar',
            //width: 60,
            menu: {
                items: [],
            listeners: {
                click: function( menu, item, e, eOpts ){
                    this.up('formExtend').fireEvent('onClickExportar', this.up('formExtend'), this, item.name);
                }
            }
            },
            scale: 'medium'
        },{
            name: 'btnImportar',
            text: 'Importar',
            cls: 'btnFormCls',
            //iconCls: 'iconoSincronizar',
            iconCls: 'x-fa fa-download btnFormClsIcon',
            iconAlign: 'left',
            scale: 'medium',
            tooltip: 'Importar',
            //width: 60,
            listeners: {
                click: function(){
                    this.up('formExtend').fireEvent('onClickImportar', this.up('formExtend'), this);
                }
            }
        },{
            name: 'btnCultivo',
            text: 'Cultivo',
            cls: 'btnFormCls',
            iconCls: 'x-fa fa-crosshairs btnFormClsIcon',
            iconAlign: 'left',
            scale: 'medium',
            tooltip: 'Cultivo',
            //width: 60,
            listeners: {
                click: function(){
                    this.up('formExtend').fireEvent('onClickSelectCultivo', this.up('formExtend'), this);
                }
            }
        }]
    }],

    constructor: function (config) {
        this.callParent(config);
        this.setTitulo(this.titulo);
        this.setVisualizarTitulo(this.visualizarTitulo);
        //this.setImage(this.imagen);
        //visualizar boton
        this.setVisualizarNuevo(this.visualizarNuevo);
        this.setVisualizarGuardar(this.visualizarGuardar);
        this.setVisualizarRefrescar(this.visualizarRefrescar);
        this.setVisualizarCancelar(this.visualizarCancelar);
        this.setVisualizarImprimir(this.visualizarImprimir);
        this.setVisualizarImportar(this.visualizarImportar);
        this.setVisualizarExportar(this.visualizarExportar);
        //habilitar boton
        this.setHabilitarNuevo(this.habilitarNuevo);
        this.setHabilitarGuardar(this.habilitarGuardar);
        this.setHabilitarRefrescar(this.habilitarRefrescar);
        this.setHabilitarCancelar(this.habilitarCancelar);
        this.setHabilitarImprimir(this.habilitarImprimir);
        this.setHabilitarImportar(this.habilitarImportar);
        this.setHabilitarExportar(this.habilitarExportar);
        this.setHabilitarCultivo(this.habilitarCultivo);
    },

    setTitulo: function (text) {
        this.down('label[name=lblFormExtend]').setText(text);
    },

    setVisualizarTitulo: function (visualizar) {
        this.down('panel[name=contenedorTitulo]').setHidden(!visualizar);
    },

    //--------------------------------Habilitar--------------------------------//
    setHabilitarEnviar: function (habilita) {
        if (habilita != null) {
            this.down('button[name="btnEnviar"]').setDisabled(!habilita);

        }
    },
    setHabilitarImprimir: function (habilita) {
        if (habilita != null) {
            this.down('button[name="btnImprimir"]').setDisabled(!habilita);

        }
    },
    setHabilitarImportar: function (habilita) {
        if (habilita != null) {
            this.down('button[name="btnImportar"]').setDisabled(!habilita);

        }
    },
    setHabilitarCancelar: function (habilita) {
        if (habilita != null) {
            this.down('button[name="btnCancelar"]').setDisabled(!habilita);
        }
    },
    setHabilitarRefrescar: function (habilita) {
        if (habilita != null) {
            this.down('button[name="btnRefrescar"]').setDisabled(!habilita);

        }
    },
    setHabilitarGuardar: function (habilita) {
        if (habilita != null) {
            this.down('button[name="btnGuardar"]').setDisabled(!habilita);

        }
    },
    setHabilitarNuevo: function (habilita) {
        if (habilita != null) {
            this.down('button[name="btnNuevo"]').setDisabled(!habilita);
        }
    },
    setHabilitarExportar: function (habilita) {
        if (habilita != null) {
            this.down('button[name="btnExportar"]').setDisabled(!habilita);
        }
    },
    setHabilitarCultivo: function (habilita) {
        if (habilita != null) {
            this.down('button[name="btnCultivo"]').setHidden(!habilita);
        }
    },


    //--------------------------------Visualizar--------------------------------//
    setVisualizarEnviar: function (visualiza) {
        if (visualiza != null) {
            this.down('button[name="btnEnviar"]').setHidden(!visualiza);
        }
    },
    setVisualizarImprimir: function (visualiza) {
        if (visualiza != null) {
            this.down('button[name="btnImprimir"]').setHidden(!visualiza);
        }
    },
    setVisualizarImportar: function (visualiza) {
        if (visualiza != null) {
            this.down('button[name="btnImportar"]').setHidden(!visualiza);
        }
    },
    setVisualizarCancelar: function (visualiza) {
        if (visualiza != null) {
            this.down('button[name="btnCancelar"]').setHidden(!visualiza);
        }
    },
    setVisualizarRefrescar: function (visualiza) {
        if (visualiza != null) {
            this.down('button[name="btnRefrescar"]').setHidden(!visualiza);
        }
    },
    setVisualizarGuardar: function (visualiza) {
        if (visualiza != null) {
            this.down('button[name="btnGuardar"]').setHidden(!visualiza);
        }
    },
    setVisualizarNuevo: function (visualiza) {
        if (visualiza != null) {
            this.down('button[name="btnNuevo"]').setHidden(!visualiza);
        }
    },
    setVisualizarExportar: function (visualiza) {
        if (visualiza != null) {
            if(this.exportar.length > 0){
                this.down('button[name="btnExportar"]').setHidden(!visualiza);
                var menu = this.down('button[name="btnExportar"]').getMenu();
                menu.removeAll();
                this.exportar.forEach(function(item){
                    menu.add({
                        text: item.nombre,
                        iconCls: 'iconPrintCls',
                        name:item.id
                    });
                });
            }else{
                this.down('button[name="btnExportar"]').setHidden(true);
            }
        }
    },
    open: function(verb, url, data, target) {
      var form = document.createElement("form");
      form.action = url;
      form.method = verb;
      form.target = target || "_blank";
      if (data) {
        for (var key in data) {
          var input = document.createElement("textarea");
          input.name = key;
          input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
          form.appendChild(input);
        }
      }
      form.style.display = 'none';
      document.body.appendChild(form);
      form.submit();
    }
});