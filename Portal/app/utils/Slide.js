Ext.slide = function () {
    var msgCt;
    function createBox(t, s, status) {
        var clsStatus = '';
        switch (status) {
            case 1:
                clsStatus = 'mensajeInformacion';
                break;
            case 2:
                clsStatus = 'mensajeAdvertencia';
                break;
            case 3:
                clsStatus = 'mensajeError';
                break;
            default:
                clsStatus = 'mensajeInformacion';
        }
        return ['<div class="', clsStatus, '">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><span class="x-title-slide">', t, '</span><p>', s, '</p></div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }
    return {
        message: function (title, format, status) {
            if (!msgCt) {
                msgCt = Ext.DomHelper.insertFirst(document.body, { id: 'msg-div' }, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, createBox(title, s, status), true);
            m.hide();
            m.slideIn('t').ghost('t', { delay: 3000, remove: true });
        }
    };
}();