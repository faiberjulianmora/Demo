Ext.formatoCsm = function () {
    return {
        fecha: function (fecha) {
			var dia = parseInt(fecha.substring(8,10));
			var mes = parseInt(fecha.substring(5,7));
			var año = fecha.substring(0,4);
			//var mesTexto = '';
			switch(mes){
				case 1:
					mesTexto = 'Enero';
					break;
				case 2:
					mesTexto = 'Febrero';
					break;
				case 3:
					mesTexto = 'Marzo';
					break;
				case 4:
					mesTexto = 'Abril';
					break;
				case 5:
					mesTexto = 'Mayo';
					break;
				case 6:
					mesTexto = 'Junio';
					break;
				case 7:
					mesTexto = 'Julio';
					break;
				case 8:
					mesTexto = 'Agosto';
					break;
				case 9:
					mesTexto = 'Septiembre';
					break;
				case 10:
					mesTexto = 'Octubre';
					break;
				case 11:
					mesTexto = 'Noviembre';
					break;
				case 12:
					mesTexto = 'Diciembre';
					break;
			}
			return dia + ' de ' + mesTexto + ' de ' + año; // 2 de febrero de 2016
        }
    };
}();