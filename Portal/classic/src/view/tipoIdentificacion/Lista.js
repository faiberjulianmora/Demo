Ext.define('Portal.view.tipoIdentificacion.Lista',{
    extend: 'Portal.extend.FormExtend',
    alias: 'widget.frmListaTipoIdentificacion',
    titulo: 'Lista de Tipos de Identificación',
    habilitarNuevo:true,
    habilitarBuscar:true,
    requires:[
        'Portal.extend.GridControlExtend',
        'Portal.extend.SearchFieldExtend'
    ],
    items:[{
        xtype:'panel',
        layout:{ type:'hbox',align:'stretch' },
        padding:'20 10 20 10',
        items:[{
            xtype:'searchFieldExtend',
            fieldLabel:'Buscar',
            id:'frmListaTipoIdentificacion-sfFiltro',
            padding:'0 5 10 0',
            labelWidth:50,
            listeners: {
                onClickBuscarSearchField: function(value){
                    this.up('frmListaTipoIdentificacion').fireEvent('onClickBuscarSearchField', this.up('frmListaTipoIdentificacion'), this, value);
                },
                onClickLimpiarSearchField: function(value){
                    this.up('frmListaTipoIdentificacion').fireEvent('onClickLimpiarSearchField', this.up('frmListaTipoIdentificacion'), this, value);
                }  
            }              
        }]
    },{
        xtype:'gridControlExtend',
        id: 'frmListaTipoIdentificacion-gcListaTipoIdentificacion',
        flex: 1,
        store: 'Portal.store.tipoIdentificacion.TipoIdentificacion',
        habilitarEditar: true,
        columns:[{
            text: 'Acronimo',
            dataIndex: 'acronimo',
            flex: 1
        },{
            text: 'Tipo de Identificacion',
            dataIndex: 'nombre',
            flex: 1
        },{
            text: 'Estado',
            dataIndex: 'estado',
            flex: 1,
            renderer: function(value){
                if(value == 1){
                    return 'Activo'
                }else{
                    return 'Inactivo'
                }
            }
        }],
        dockedItems:[{
            xtype:'pagingtoolbar',
            id:'frmTipoIdentificacion-paginarIdentificacion',
            store:'Portal.store.tipoIdentificacion.TipoIdentificacion',
            dock:'bottom',
            displayInfo:true
        }],
        listeners: {
            onClickEditarGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
                this.up('frmListaTipoIdentificacion').fireEvent('onClickEditarGridControl', grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass);
            }
        }
    }]
});