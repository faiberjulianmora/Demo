Ext.define('Portal.extend.PopupExtend',{
    extend: 'Ext.window.Window',
    alias: 'widget.popupExtend',
    modal: true,
    bodyPadding: '20 5 5 5',
    layout: { type: 'vbox', align: 'stretch' },
    draggable: true,
    constrain: true,
    resizable: false,
    listeners:{
        close: function(me){
            me.destroy();
        },
        hide: function(me){
            me.destroy();
        }
    },
    setAnimateTarget: function(animateTarget){
        if(animateTarget != null){
            this.animateTarget = animateTarget;
        }
    }
});