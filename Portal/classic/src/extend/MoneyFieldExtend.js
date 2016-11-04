Ext.define('Portal.extend.MoneyFieldExtend', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.moneyFieldExtend',
    enableKeyEvents: true,
    anchor: '100%',
    maxWidth: 700,
    labelWidth: 150,
    allowBlank: false,
    blankText: 'Definir propiedad del control bankText!',
    value: '$ ',
    thousandSeparator: '.',
    validator: function(value){
        if(this.allowBlank == false){
            if(value == '$ ' || value == '$' || value == '$ 0'){
                return 'Complete la información correctamente.';
            }else{
                return true;
            }
        }else{
            return true;
        }
    },
    listeners:{
        keydown: function(control, tecla){
            this.validador();
        },
        keyup: function(control, tecla){
            this.validador();
        },
        keypress: function(control, tecla){
            this.validador();
        },
        change: function(control, newValue, oldValue){
            this.validador();
        }
    },
    getNumberValue: function(){
        if(this.getValue().replace(/\D/g,'') != '' || this.getValue().replace(/\D/g,'') != null){
            return this.getValue().replace(/\D/g,'');
        }else{
            return 0;
        }
    },
    validador: function(){
        Ext.util.Format.thousandSeparator = this.thousandSeparator;
    	var textoCompleto = this.getValue();
        textoCompleto = textoCompleto.replace(/\D/g,'');
        this.setValue(Ext.util.Format.number(textoCompleto, "$ 000,000"));
    }
});