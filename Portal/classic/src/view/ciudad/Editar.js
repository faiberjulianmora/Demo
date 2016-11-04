Ext.define('Portal.view.ciudad.Editar',{
    extend:'Portal.extend.FormExtend',
    alias:'widget.frmEditarCiudad',
    titulo:'Editar Ciudad',
    id: 'idFrmEditarCiudad',
    bodyPadding: 10,
    autoScroll: true,
    habilitarGuardar: true,
    habilitarCancelar: true,
    defaultFocus: 'comboExtend[name=idPais]',
    requires:[
        'Portal.extend.GridControlExtend',
        'Portal.extend.TextFieldExtend',
        'Portal.extend.ComboExtend'
    ],
    items:[{
        xtype: 'textFieldExtend',
        allowBlank: true,
        name: 'id',
        hidden: true
    },{
        xtype: 'comboExtend',
        fieldLabel: 'Pais',
        store: 'Portal.store.pais.Pais',
        queryMode: 'local',
        displayField: 'nombre',
        valueField: 'id',
        blankText: 'Debe seleccionar un Pais!',
        name: 'idPais',
        listeners: {
            keydown: function(control, tecla){
                if (tecla.getKey() == tecla.ENTER) {
                    this.up('frmEditarCiudad').fireEvent('onKeyDownPais', this.up('frmEditarCiudad'), this);
                }
            },
            select: function(component, record, eOpts){
                this.up('frmEditarCiudad').fireEvent('onSelectPais', this.up('frmEditarCiudad'), this, record);
            }
        }
    },{
        xtype: 'comboExtend',
        fieldLabel: 'Departamento',
        store: 'Portal.store.departamento.Departamento',
        queryMode: 'local',
        displayField: 'nombreDepartamento',
        valueField: 'id',
        blankText: 'Debe seleccionar un Departamento!',
        name: 'idDepartamento',
        pageSize: 20,
        listConfig: {
            id: 'frmEditarCiudad-boundListDepartamento',
            loadingText: 'Cargando...',
            emptyText: 'No hay datos.',
            getInnerTpl: function() {
                return '<a><strong>{nombreDepartamento}</strong><br/>{nombrePais}</a>';
            }
        },
        listeners: {
            keydown: function(control, tecla){
                if (tecla.getKey() == tecla.ENTER) {
                    this.up('frmEditarCiudad').fireEvent('onKeyDownDepartamento', this.up('frmEditarCiudad'), this);
                }
            }
        }
    },{
        xtype: 'textFieldExtend',
        fieldLabel: 'Nombre de la Ciudad',
        blankText: 'Debe ingresar el nombre la Ciudad',
        name: 'nombreCiudad',
        listeners: {
            keydown: function(control, tecla){
                if (tecla.getKey() == tecla.ENTER) {
                    this.up('frmEditarCiudad').fireEvent('onKeyDownNombre', this.up('frmEditarCiudad'), this);
                }
            }
        }
    }]
});