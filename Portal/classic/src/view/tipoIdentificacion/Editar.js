Ext.define('Portal.view.tipoIdentificacion.Editar',{
    extend:'Portal.extend.FormExtend',
    alias:'widget.frmEditarTipoIdentificacion',
    titulo:'Editar Tipo de Identificación',
    id: 'idFrmEditarTipoIdentificacion',
    bodyPadding: 10,
    autoScroll: true,
    habilitarGuardar: true,
    habilitarCancelar: true,
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
        xtype:'textFieldExtend',
        fieldLabel:'Nombre',
        blankText:'Debe ingresar el nombre de Tipo de Identificación.',
        name:'nombre'
    },{
        xtype:'textFieldExtend',
        fieldLabel:'Acrónimo',
        blankText:'Debe ingresar el acróinimo del Tipo de Identificación.',
        name:'acronimo'
    },{
        xtype: 'comboExtend',
        fieldLabel: 'Estado',
        store: {
            fields:['codigo','nombre'],
            data:[
                {'codigo':'0','nombre':'Inactivo'},
                {'codigo':'1','nombre':'Activo'}
            ]
        },
        queryMode:'local',
        displayField: 'nombre',
        valueField:'codigo',
        name: 'estado',
        blankText: 'Debe seleccionar un estado para el registro de Tipo de Identificación.'
    }]
});