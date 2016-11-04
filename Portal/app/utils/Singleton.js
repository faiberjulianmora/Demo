Ext.define('Portal.utils.Singleton', {
    singleton: true,
    app: {
        nombreApp: 'Hackathon',
        msgEsperar: 'Validando usuario ...',
        msgCerrarSesion: 'Desea cerrar sesión?',
        msgErrorLogin: 'Debe ingresar un usuario.',
        msgErrorCargaMenu: 'Ocurrió un error al cargar el menú, actualice la página.'
    },
    sesion: {
        codigoUsuario: null,
        fechaNacimiento: null,
        idTercero: null,
        idUsuario: null,
        identificacion: null,
        nombreCompleto: null
    },
    slide: {
        slideAdvertencia: 'Advertencia',
        slideError: 'Error'
    },
    portal: {
        nombreEmpresa: 'Csm-Educativo',
        infoBotonInformacion: 'Información',
        infoBotonMenu: 'Menú',
        year: new Date().getFullYear()
    }
});