Ext.define('Portal.extend.GridControlExtend', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridControlExtend',
    overflowY: 'auto',
    habilitarEditar: false,
    habilitarEliminar: false,
    habilitarVisualizar:false,
        viewConfig: {
        stripeRows: false,
        getRowClass: function (record, index) {
            if (parseInt(index) % 2 == 0) {
                return 'gridItemAlt';
            } else {
                return 'gridItemFirst';
            }
        }
    },
    constructor: function (config) {
        this.callParent([config]);
        if (this.habilitarEditar == true) {
            var eColumn = Ext.create('Ext.grid.column.Action', {
                width: 30,
                items: [{
                    iconCls: 'iconoEditar',
                    tooltip: 'Editar',
                    handler: function (grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass) {
                        this.up('gridControlExtend').fireEvent('onClickEditarGridControl', grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass);
                    }
                }]
            });
            this.headerCt.insert(this.columns.length, eColumn);
        }
        if (this.habilitarEliminar == true) {
            var column = Ext.create('Ext.grid.column.Action', {
                width: 30,
                items: [{
                    iconCls: 'iconoEliminar',
                    tooltip: 'Eliminar',
                    handler: function (grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass) {
                        this.up('gridControlExtend').fireEvent('onClickEliminarGridControl', grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass);
                    }
                }]
            });
            this.headerCt.insert(this.columns.length, column);
        }
        if (this.habilitarVisualizar == true) {
            var column = Ext.create('Ext.grid.column.Action', {
                width: 30,
                items: [{
                    iconCls: 'iconoVisualizar',
                    tooltip: 'Visualizar',
                    handler: function (grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass) {
                        this.up('gridControlExtend').fireEvent('onClickVerGridControl', grid, rowIndex, colIndex, buttonAction, eventActionButton, objData, trClass);
                    }
                }]
            });
            this.headerCt.insert(this.columns.length, column);
        }
    }
});