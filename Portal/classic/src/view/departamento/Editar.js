Ext.define('Portal.view.departamento.Editar',{
    extend: 'Portal.extend.FormExtend',
    alias: 'widget.frmEditarDepartamento',
    titulo: 'Editar Departamento',
    id: 'idFrmEditarDepartamento',
    bodyPadding: 10,
    autoScroll: true,
    habilitarGuardar: true,
    habilitarCancelar: true,
    defaultFocus: 'comboExtend[name=idPais]',
    requires:[
        'Portal.extend.GridControlExtend',
        'Portal.extend.TextFieldExtend'
    ],
    items:[{
        xtype: 'textFieldExtend',
        allowBlank: true,
        name: 'id',
        hidden: true
    },{
        xtype: 'comboExtend',
        fieldLabel: 'País',
        store: 'Portal.store.pais.Pais',
        displayField: 'nombre',
        blankText: 'Debe seleccionar el país para el departamento.',
        valueField: 'id',
        name: 'idPais',
        listeners: {
            keydown: function(control, tecla){
                if (tecla.getKey() == tecla.ENTER) {
                    this.up('frmEditarDepartamento').fireEvent('onSelectPais', this.up('frmEditarDepartamento'), this);
                }
            },
            select: function(){
                this.up('frmEditarDepartamento').fireEvent('onSelectPais', this.up('frmEditarDepartamento'), this);
            }
        }
    },{
        xtype: 'textFieldExtend',
        fieldLabel: 'Departamento',
        blankText: 'Debe ingresar el nombre del Departamento.',
        name: 'nombreDepartamento',
        listeners: {
            keydown: function(control, tecla){
                if (tecla.getKey() == tecla.ENTER) {
                    this.up('frmEditarDepartamento').fireEvent('onKeyDownNombre', this.up('frmEditarDepartamento'), this);
                }
            }
        }
    }]
});