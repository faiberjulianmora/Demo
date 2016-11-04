Ext.define('Portal.view.departamento.Lista',{
    extend: 'Portal.extend.FormExtend',
    alias: 'widget.frmListaDepartamento',
    titulo: 'Lista de Departamentos',
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
            id: 'frmListaDepartamento-sfFiltroDepartamento',
            padding: '0 5 10 0',
            labelWidth: 50,
            listeners: {
                onClickBuscarSearchField: function(value){
                    this.up('frmListaDepartamento').fireEvent('onClickBuscarSearchField', this.up('frmListaDepartamento'), this, value);
                },
                onClickLimpiarSearchField: function(value){
                    this.up('frmListaDepartamento').fireEvent('onClickLimpiarSearchField', this.up('frmListaDepartamento'), this, value);
                }
            }
        }]
    },{
        xtype: 'gridControlExtend',
        id: 'frmListaDepartamento-gcListaDepartamento',
        flex: 1,
        store: 'Portal.store.departamento.Departamento',
        habilitarEditar: true,
        columns:[{
            text: 'Departamento',
            dataIndex: 'nombreDepartamento',
            flex: 2
        },{
            text: 'País',
            dataIndex: 'nombrePais',
            flex: 2
        }],
        dockedItems:[{
            xtype: 'pagingtoolbar',
            id: 'frmListaDepartamento-paginarDepartamento',
            store: 'Portal.store.departamento.Departamento',
            dock: 'bottom',
            displayInfo: true
        }],
        listeners: {
            onClickEditarGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
                this.up('frmListaDepartamento').fireEvent('onClickEditarGridControl', grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass);
            }
        }
    }]
});