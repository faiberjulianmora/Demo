/*
 * +------------------------------------------------+
 * |Modulo              :Paises                     |
 * |Nombre de Archivo   :Lista.js                   |
 * |Desarrollo Por      :Faiber Julian Mora         |
 * |Fecha Creación      :29/12/2015                 |
 * |Tipo                :View                       |
 * |Actualizado Por     :                           |
 * |Fecha Actualización :                           |
 * +------------------------------------------------+
 */
Ext.define('Portal.view.pais.Lista',{
    extend: 'Portal.extend.FormExtend',
    alias: 'widget.frmListaPais',
    titulo: 'Lista de Paises',
    habilitarNuevo:true,
    habilitarRefrescar:true,
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
            id:'frmListaPais-sfFiltro',
            padding:'0 5 10 0',
            labelWidth:50,
            listeners: {
                onClickBuscarSearchField: function(value){
                    this.up('frmListaPais').fireEvent('onClickBuscarSearchField', this.up('frmListaPais'), this, value);
                },
                onClickLimpiarSearchField: function(value){
                    this.up('frmListaPais').fireEvent('onClickLimpiarSearchField', this.up('frmListaPais'), this, value);
                }
            }
        }]
    },{
        xtype:'gridControlExtend',
        id: 'frmListaPais-gcListaPaises',
        flex: 1,
        store: 'Portal.store.pais.Pais',
        habilitarEditar: true,
        columns:[{
            text: 'Nombre del Pais',
            dataIndex: 'nombre',
            flex: 1
        }],
        dockedItems:[{
            xtype:'pagingtoolbar',
            id:'frmPais-paginarPais',
            store:'Portal.store.pais.Pais',
            dock:'bottom',
            displayInfo:true
        }],
        listeners: {
            onClickEditarGridControl: function(grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass){
                this.up('frmListaPais').fireEvent('onClickEditarGridControl', grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass);
            }
        }
    }]
});