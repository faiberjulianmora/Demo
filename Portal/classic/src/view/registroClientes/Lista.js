Ext.define('Portal.view.registroClientes.Lista',{
    extend: 'Portal.extend.FormExtend',
    alias: 'widget.frmListaClientes',
    titulo: 'Lista de Clientes',
    habilitarNuevo: true,
    habilitarRefrescar: true,
    requires:[
        'Portal.extend.GridControlExtend',
        'Portal.extend.SearchFieldExtend',
        'Portal.extend.ComboExtend'
    ],
    items:[{
        xtype: 'panel',
        layout:{ type:'hbox',align:'stretch' },
        padding: 10,
        items:[{
            xtype: 'searchFieldExtend',
            fieldLabel: 'Buscar',
            id: 'frmRegistroClientesLista-sfBuscarClientes',
            padding: '0 5 10 0',
            labelWidth: 50
        }]
    },{
        xtype: 'gridControlExtend',
        id: 'frmRegistroClientesLista-gcClientes',
        flex: 1,
        store: 'Portal.store.clientes.Clientes',
        habilitarEditar: true,
        columns:[{
            text: 'Identificación',
            dataIndex: 'identificacionCompuesta',
            flex: 1
        },{
            text: 'Nombre',
            dataIndex: 'nombreCompleto',
            flex: 2
        },{
            text: 'Dirección',
            dataIndex: 'direccion',
            flex: 1
        },{
            text: 'Teléfono',
            dataIndex: 'telefono',
            flex: 1
        },{
            text: 'Correo Electrónico',
            dataIndex: 'email',
            flex: 1
        },{
            text: 'Estado',
            dataIndex: 'estado',
            width: 90,
            renderer: function (value) {
                if(value == 1){
                    return 'Activo';
                }else{
                    return 'Inactivo';
                }
            }
        }],
        dockedItems:[{
            xtype: 'pagingtoolbar',
            id: 'frmRegistroClientesLista-paginarClientes',
            store: 'Portal.store.clientes.Clientes',
            dock: 'bottom',
            displayInfo: true
        }]
    }]
});