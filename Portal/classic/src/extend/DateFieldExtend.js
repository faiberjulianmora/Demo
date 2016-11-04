Ext.define('Portal.extend.DateFieldExtend', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.dateFieldExtend',
    enableKeyEvents: true,
    anchor: '100%',
    maxWidth: 700,
    labelWidth: 150,
    editable: false,
    format: 'j \\de F \\de Y',
    allowBlank: false,
    blankText: 'Definir propiedad del control bankText!',
    getSimpleDate: function () {
        var dia = this.getValue().getDate();
        var mes = this.getValue().getMonth() + 1;
        var año = this.getValue().getFullYear();
        return año + '-' + this.formatoDosDigitos(mes) + '-' + this.formatoDosDigitos(dia);
    },
    formatoDosDigitos: function(entero){
        if(entero <= 9){
            switch(entero){
                case 1:
                    return '01';
                    break;
                case 2:
                    return '02';
                    break;
                case 3:
                    return '03';
                    break;
                case 4:
                    return '04';
                    break;
                case 5:
                    return '05';
                    break;
                case 6:
                    return '06';
                    break;
                case 7:
                    return '07';
                    break;
                case 8:
                    return '08';
                    break;
                case 9:
                    return '09';
                    break;
            }
        }else{
            return entero;
        }
    }
});