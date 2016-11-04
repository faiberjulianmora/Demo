Ext.define('Portal.extend.SearchFieldExtend', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.searchFieldExtend',
    name: 'searchFieldName',
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
    hasSearch : false,
    paramName : 'query',
    initComponent: function(){
        this.callParent(arguments);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
        this.on('change', function(sender){
            if(this.getValue() != ''){
                this.triggerEl.item(0).setDisplayed('block');
            }else{
                this.triggerEl.item(0).setDisplayed('none');
            }
        }, this);
    },
    afterRender: function(){
        this.callParent();
        this.triggerEl.item(0).setDisplayed('none');
    },
    onTrigger1Click : function(sender, trigger, event){//Limpiar
        this.setValue('');
        this.triggerEl.item(0).setDisplayed('none');
        this.fireEvent('onClickLimpiarSearchField');
    },
    onTrigger2Click : function(sender, trigger, event){//Buscar
        if(this.getValue() != ''){
            this.triggerEl.item(0).setDisplayed('block');
        }else{
            this.triggerEl.item(0).setDisplayed('none');
        }
        this.fireEvent('onClickBuscarSearchField', this.getValue());
    }
});