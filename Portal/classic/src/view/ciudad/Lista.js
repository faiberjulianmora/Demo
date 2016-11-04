Ext.define('Portal.view.ciudad.Lista',{
    extend: 'Portal.extend.FormExtend',
    alias: 'widget.frmListaCiudad',
    titulo: 'Lista de Ciudades',
    habilitarNuevo: true,
    habilitarRefrescar: true,
    requires:[
        'Portal.extend.GridControlExtend',
        'Portal.extend.SearchFieldExtend'
    ],
    items:[{
        xtype: 'panel',
        layout:{ type:'hbox', align:'stretch' },
        padding: 10,
        items:[{
            xtype: 'searchFieldExtend',
            fieldLabel: 'Buscar',
            id: 'frmListaCiudad-sfFiltroCiudad',
            padding: '0 5 10 0',
            labelWidth: 50,
            listeners: {
                onClickBuscarSearchField: function(value){
                    this.up('frmListaCiudad').fireEvent('onClickBuscarSearchField', this.up('frmListaCiudad'), this, value);
                },
                onClickLimpiarSearchField: function(value){
                    this.up('frmListaCiudad').fireEvent('onClickLimpiarSearchField', this.up('frmListaCiudad'), this, value);
                }
            }
        }]
    },{
        xtype:'gridControlExtend',
        id: 'frmListaCiudad-gcListaCiudad',
        flex: 1,
        store: 'Portal.store.ciudad.Ciudad',
        habilitarEditar: true,
        columns:[{
            text: 'Ciudad',
            dataIndex: 'nombreCiudad',
            flex: 1
        },{
            text: 'Departamento',
            dataIndex: 'nombreDepartamento',
            flex: 1
        },{
            text: 'Pais',
            dataIndex: 'nombrePais',
            flex: 1
        }],
        dockedItems:[{
            xtype: 'pagingtoolbar',
            id: 'frmListaCiudad-paginarCiudad',
            store: 'Portal.store.ciudad.Ciudad',
            dock: 'bottom',
            displayInfo:true
        }],
        listeners: {
            onClickEditarGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
                this.up('frmListaCiudad').fireEvent('onClickEditarGridControl', grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass);
            }
        }
    }]
});