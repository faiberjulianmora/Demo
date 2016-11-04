Ext.define('Portal.view.registroClientes.Editar',{
    extend: 'Portal.extend.FormExtend',
    alias: 'widget.frmEdiartClientes',
    titulo: 'Registro Clientes',
    id: 'idRegistroClientesEditar',
    bodyPadding: 10,
    autoScroll: true,
    habilitarGuardar: true,
    habilitarCancelar: true,
    requires:[
        'Portal.extend.TextFieldExtend',
        'Portal.extend.NumberFieldExtend',
        'Portal.extend.ComboExtend',
        'Portal.extend.DateFieldExtend'
    ],
    items:[{
        xtype: 'textFieldExtend',
        allowBlank: true,
        name: 'id',
        hidden: true
    },{
        xtype: 'comboExtend',
        fieldLabel: 'Tipo Identificación',
        store: 'Portal.store.tipoIdentificacion.TipoIdentificacion',
        queryMode: 'local',
        displayField: 'nombre',
        valueField: 'id',
        blankText: 'Debe seleccionar el Tipo de Identificación',
        name: 'idTipoIdentificacion'
    },{
        xtype: 'numberFieldExtend',
        fieldLabel: 'Identificación',
        blankText: 'Debe ingresar el número de identificación.',
        name: 'identificacion'
    },{
        xtype:'textFieldExtend',
        fieldLabel:'Nombre(s)',
        blankText:'Debe ingresar el(los) nombre(s).',
        name:'nombres'
    },{
        xtype:'textFieldExtend',
        fieldLabel:'Apellido(s)',
        blankText:'Debe ingresar el(los) apellido(s).',
        name:'apellidos'
    },{
        xtype: 'dateFieldExtend',
        fieldLabel: 'Fecha Nacimiento',
        blankText: 'Debe ingresar la fecha de nacimiento.',
        name: 'fechaNacimiento',
        id: 'frmRegistroClientes-dfFechaNacimientoEstudiante',
        maxValue: new Date()
    },{
        xtype: 'textFieldExtend',
        fieldLabel: 'Dirección',
        allowBlank: true,
        name: 'direccion'
    },{
        xtype:'numberFieldExtend',
        fieldLabel:'Teléfono',
        allowBlank: true,
        name:'telefono'    },{
        xtype:'textFieldExtend',
        fieldLabel:'Correo Electrónico',
        allowBlank: true,
        name:'email',
        vtype: 'email'
    },{
        xtype: 'comboExtend',
        fieldLabel: 'Estado',
        store: {
            fields:['codigo','nombre'],
            data:[
                {'codigo':'1', 'nombre':'Activo'},
                {'codigo':'0', 'nombre':'Inactivo'}
            ]
        },
        queryMode:'local',
        displayField: 'nombre',
        valueField:'codigo',
        name: 'estado',
        blankText: 'Debe seleccionar el sexo o genero..'
    }]
});