Ext.define('Portal.view.inicio.Portal', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.frmPortal',
    layout: 'border',
    items:[{
        //Header
        region: 'north',
        xtype: 'toolbar',
        height: 64,
        padding: 0,
        items: [{
            xtype: 'component',
            id: 'csm-logo',
            html: '<div class="csm-logo"><img src="resources/Img/logo/Logo250x63.png"></div>',
            width: 250,
            height: 64
        },{
            margin: '0 0 0 8',
            iconCls:'x-fa fa-navicon',
            tooltip: 'Menú',
            id: 'btnMenuPortal',
            cls: 'iconoBarraCabecera',
            listeners: {
                click: function(){
                    this.up('frmPortal').fireEvent('clickBtnMenu');
                }
            }
        },{
            xtype: 'tbspacer',
            flex: 1
        },{
            xtype: 'tbtext',
            text: '',
            cls: 'nombreUsuarioCabecera',
            id: 'frmPortal-txtNombreUsuario'
        },{
            iconCls:'x-fa fa-user',
            tooltip: 'Perfil',
            id: 'btnInformacionUsuarioPortal',
            cls: 'iconoBarraCabecera'
        }]
    },{
        //MainContainer
        xtype: 'panel',
        region: 'center',
        layout: { 
            type: 'hbox', 
            align: 'stretch',
            animate: true,
            animatePolicy: {
                x: true,
                width: true
            }
        },
        bodyStyle: 'background:#EDEDED',
        id: 'mainContainer',
        items:[{
            xtype: 'panel',
            scrollable: 'y',
            id: 'contenedorMenu',
            width: 250,
            bodyStyle: 'background:#24241E',
            items:[{
                //menu
                xtype: 'treelist',
                ui: 'navigation',
                id: 'treeMenu',
                width: 250,
                expanderFirst: false,
                expanderOnly: false,
                singleExpand: true,
                listeners: {
                    selectionchange: function (component, seleccionado) {
                        this.up('frmPortal').fireEvent('clickMenu', this.up('frmPortal'), component, seleccionado);
                    }
                }
            }]
        },{
            //tabpanel
            xtype: 'tabpanel',
            id: 'tabPanelPortal',
            bodyStyle: 'background:#FFF',
            activeTab: 0,
            layoutOnTabChange: true,
            resizeTabs: true,
            defaults: { layout: 'fit', autoScroll: true },
            layoutConfig: { deferredRender: true },
            padding: 15,
            flex: 1,
            items: [{
                title: 'Inicio',
                bodyStyle: 'background:#FFFFFF',
                html: 'HACKATHON INDIGO 2016',
                margin: '20 0 0 20',
                width: '100%',
                height: '100%'
            }]
        }]
    }]
});