<?php
require 'Slim/Slim.php';
require 'Utils/Conexion.php';
require 'Utils/Resultado.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$app->contentType('text/html; charset=utf-8');
$app->response()->header('Content-Type', 'application/json;charset=utf-8');
date_default_timezone_set('America/Bogota');

/*
 * +-----------------------------------------------------------+
 * |Desarrollador Por  :                                       |
 * |Fecha Desarrollo   : --/--/----                            |
 * |Desarrollador Edita:                                       |
 * |Fecha Edicion      :                                       |
 * |Descripcion Edicion:                                       |
 * |Para el Modulo     :                                       |
 * |Descripción        :                                       |
 * |Metodos            :                                       |
 * +-----------------------------------------------------------+
 */
$app->get(
    '/inicio/sesion',
    function() use ($app) {
        $request = $app->request();
        $codigo = $request->get('codigo');
        $clave = $request->get('clave');
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $con->prepararConsulta("SELECT 
                u.id AS idUsuario, 
                codigo AS CodigoUsuario, 
                u.clave, 
                u.idTercero, 
                t.identificacion, 
                t.nombreCompleto, 
                t.fechaNacimiento, 
                u.estado, 
                u.bloqueado, 
                u.intentosFallidos 
                FROM usuario AS u INNER JOIN tercero t ON u.idTercero = t.id WHERE u.codigo = ?");
            $con->parametro('1',$codigo);
            $con->ejecutarConsulta();
            $data = $con->obtenerLista();
            if(count($data) > 0) {
                if($data[0]->bloqueado == 0) {
                    if($data[0]->estado == 1) {
                        if($data[0]->clave == $clave) {
                            if($data[0]->intentosFallidos > 0) { //Verifico para ver si tiene intentos fallidos. Si los tiene los pongo en cero (0)                       
                                $con->prepararConsulta("UPDATE usuario SET intentosFallidos=? WHERE id = ?");
                                $con->parametro('1',0);
                                $con->parametro('2',$data[0]->idUsuario);
                                $con->ejecutarConsulta();                                
                            }
                            $data[0]->clave = '';
                            $con->prepararConsulta("SELECT idRoll FROM usuario_roll WHERE idUsuario = ?");
                            $con->parametro("1", $data[0]->idUsuario);
                            $con->ejecutarConsulta();
                            $listRol = $con->obtenerLista();

                            $arrayResult = array();
                            $arrayResult["id"] = $data[0]->idUsuario;
                            $arrayResult["idRoll"] = $listRol[0]->idRoll;
                            $con->prepararConsulta("SELECT id FROM clientes where idTercero = ?");
                            $con->parametro("1", $data[0]->idTercero);
                            $con->ejecutarConsulta();
                            $infoCliente = $con->obtenerLista();
                            $arrayResult["idCliente"] = $infoCliente[0]->id;
                            $arrayResult["usuario"] = $data[0];
                            $root = new stdClass;
                            $root->expanded = true;
                            $con->prepararConsulta("call carpetasPermisoUsuario(?)");
                            $con->parametro('1',$data[0]->idUsuario);
                            $con->ejecutarConsulta();
                            $carpetasArray = $con->obtenerLista();
                            $con->prepararConsulta("SELECT 
                                distinct f.id as idFormulario, 
                                f.nombre as `text`, 
                                1 as leaf, 
                                f.tipo as `type`, 
                                f.referencia,
                                f.controlador, 
                                f.iconCls, 
                                f.idCarpeta 
                                FROM 
                                usuario AS u LEFT JOIN
                                usuario_roll AS ur ON u.id = ur.idUsuario INNER JOIN
                                roll_formulario_accion AS rfa ON ur.idRoll = rfa.idRoll LEFT JOIN
                                roll AS r ON rfa.idRoll = r.id LEFT JOIN
                                formulario_accion AS fa ON rfa.idFormularioAccion = fa.id LEFT JOIN
                                formulario AS f ON fa.idFormulario = f.id LEFT JOIN
                                accion AS a ON fa.idAccion = a.id
                                WHERE u.id = ? AND r.estado = 1 AND f.estado = 1 GROUP BY f.nombre");
                            $con->parametro('1',$data[0]->idUsuario);
                            $con->ejecutarConsulta();
                            $formulariosArray = $con->obtenerLista();
                            //Incluyo los formularios dentro de las carpetas
                            foreach($carpetasArray as $carpetaItem){
                                foreach($formulariosArray as $formularioItem){
                                    if ($formularioItem->idCarpeta == $carpetaItem->id){
                                        $carpetaItem->selectable = false;
                                        $carpetaItem->expanded = false;
                                        $formularioItem->selectable = true;
                                        $formularioItem->expandable = false;
                                        $formularioItem->disabled = false;
                                        $carpetaItem->children[] = $formularioItem;
                                    }
                                }
                            }
                            //recorro las carpetas para meterlas unas dentro de otras
                             foreach($carpetasArray as $carpetaItem){
                                foreach($carpetasArray as $carpetaItemHijo){
                                    if ($carpetaItemHijo->idCarpeta == $carpetaItem->id){
                                        $carpetaItem->children[] = $carpetaItemHijo;
                                        //Borro la carpeta hija ya que no puede estar contenida dentro de otra carpeta
                                        $key = array_search($carpetaItemHijo, $carpetasArray);
                                        unset($carpetasArray[$key]);
                                    }
                                }
                            }
                            $root->children = $carpetasArray;
                            $arrayResult["seguridad"] = $root;
                            $result->datos = $arrayResult;
                        }else {
                            if(($data[0]->intentosFallidos + 1) == 3) {
                                $con->prepararConsulta("UPDATE usuario SET bloqueado=?, intentosFallidos = intentosFallidos + 1 WHERE id = ?");
                                $con->parametro('1', 1);
                                $con->parametro('2', $data[0]->idUsuario);
                                $con->ejecutarConsulta();
                                $result->estado = false;
                                $result->codigoMensaje = "5";
                                $result->mensaje = "Intentos de fallidos 3 de 3, Usuario bloqueado!.";
                            } else {
                                $con->prepararConsulta("UPDATE usuario SET intentosFallidos = intentosFallidos + 1 WHERE id = ?");
                                $con->parametro('1',$data[0]->idUsuario);
                                $con->ejecutarConsulta();
                                $result->estado = false;
                                $result->codigoMensaje = "4";
                                $result->mensaje = "La clave que ingreso no es correcta! <br>Intentos ". ($data[0]->intentosFallidos + 1) .' de 3.';
                            }
                        }
                    } else {
                        $result->estado = false;
                        $result->codigoMensaje = "3";
                        $result->mensaje = "El usuario " . $codigo . " se encuentra desactivado.";
                    }
                } else {
                    $result->estado = false;
                    $result->codigoMensaje = "2";
                    $result->mensaje = "El usuario " . $codigo . " se encuentra bloqueado.";
                }                    
            } else {
                $result->estado = false;
                $result->codigoMensaje = "1";
                $result->mensaje = "El usuario " . $codigo . " no esta registrado.";
            }
        } catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->get(
    '/permisosFormulario',
    function() use ($app) {
        $request = $app->request();
        $idUsuario = $request->get('idUsuario');
        $idFormulario = $request->get('idFormulario');
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $sql = "SELECT DISTINCT a.id,a.codigo,a.nombre
                FROM formulario AS f
                INNER JOIN formulario_accion AS fa ON fa.idFormulario = f.id
                INNER JOIN accion a ON fa.idAccion = a.id
                INNER JOIN roll_formulario_accion rfa ON rfa.idFormularioAccion = fa.id
                INNER JOIN roll ON roll.id = rfa.idRoll
                INNER JOIN usuario_roll ur ON ur.idRoll = roll.Id
                WHERE roll.estado = 1 AND a.estado = 1 AND f.estado = 1 AND f.id = ? AND ur.idUsuario = ?";
            $con->prepararConsulta($sql);
            $con->parametro('1', $idFormulario);
            $con->parametro('2', $idUsuario);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

/*
 * +-----------------------------------------------------------+
 * |Desarrollador Por  :                                       |
 * |Fecha Desarrollo   : --/--/----                            |
 * |Desarrollador Edita:                                       |
 * |Fecha Edicion      :                                       |
 * |Descripcion Edicion:                                       |
 * |Para el Modulo     :                                       |
 * |Descripción        :                                       |
 * |Metodos            :                                       |
 * +-----------------------------------------------------------+
 */

$app->get(
    '/departamento',
    function() use ($app) {
        $request = $app->request();
        $texto = $request->get('texto');
        $start = $request->get('start');
        $limit = $request->get('limit');
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $sqlSelect = "SELECT
                d.id,
                d.nombre AS nombreDepartamento,
                d.idPais,
                p.nombre AS nombrePais,
                d.usuarioCreacion,
                d.fechaCreacion";
            $sqlFrom = " FROM departamento AS d INNER JOIN pais AS p ON d.idPais = p.id WHERE 1 = 1";
            if($texto != '' && $texto != null){
                $sqlFrom .= " AND p.nombre LIKE'%" . $texto . 
                "%' OR d.nombre LIKE '%" . $texto . "%'";
            }
            $con->prepararConsulta("SELECT COUNT(*) AS Cantidad" . $sqlFrom);
            $con->ejecutarConsulta();
            $totalSql = $con->obtenerLista();
            $result->total = $totalSql[0]->Cantidad;
            $sqlFrom .= " LIMIT ". $start .",". $limit;
            $con->prepararConsulta($sqlSelect . $sqlFrom);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->put(
    '/departamento/:idDepartamento',
    function ($idDepartamento) use ($app){
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $informacion = json_decode($app->request()->getBody());
            $arrayResult = array();
            $fechaActual = new DateTime();
            $con->empezarTransaccion();
            $con->prepararConsulta("UPDATE departamento SET 
                nombre = ?,
                idPais = ?,
                usuarioModificacion = ?,
                fechaModificacion = ? WHERE id = ?");
            $con->parametro("1", $informacion->nombreDepartamento);
            $con->parametro("2", $informacion->idPais);
            $con->parametro("3", $informacion->usuario);
            $con->parametro("4", $fechaActual->format('Y\-m\-d\ H:i:s'));
            $con->parametro("5", $idDepartamento);
            $con->ejecutarConsulta();
            $con->ejecutarTransaccion();
            $result->mensaje = "Se actualizó correctamente el departamento.";
        }catch(Exception $ex){
            $con->cancelarTransaccion();
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->post(
    '/departamento',
    function () use ($app){
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $informacion = json_decode($app->request()->getBody());
            $arrayResult = array();
            $fechaActual = new DateTime();
            $con->empezarTransaccion();
            $con->prepararConsulta("INSERT INTO departamento(
                    nombre,
                    idPais,
                    usuarioCreacion,
                    fechaCreacion) 
                VALUES (?,?,?,?)");
            $con->parametro("1", $informacion->nombreDepartamento);
            $con->parametro("2", $informacion->idPais);
            $con->parametro("3", $informacion->usuario);
            $con->parametro("4", $fechaActual->format('Y\-m\-d\ H:i:s'));
            $con->ejecutarConsulta();
            $con->ejecutarTransaccion();
            $result->mensaje = "Sincronización exitosa.";
        }catch(Exception $ex){
            $con->cancelarTransaccion();
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

/*
 * +-----------------------------------------------------------+
 * |Desarrollador Por  :                                       |
 * |Fecha Desarrollo   : --/--/----                            |
 * |Desarrollador Edita:                                       |
 * |Fecha Edicion      :                                       |
 * |Descripcion Edicion:                                       |
 * |Para el Modulo     :                                       |
 * |Descripción        :                                       |
 * |Metodos            :                                       |
 * +-----------------------------------------------------------+
 */

$app->get(
    '/pais',
    function() use ($app) {
        $request = $app->request();
        $start = $request->get('start');
        $limit = $request->get('limit');
        $texto = $request->get('texto');
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $sqlSelect = "SELECT id, nombre, usuarioCreacion, fechaCreacion";
            $sqlFrom = " FROM pais WHERE 1 = 1";
            if($texto != '' && $texto != null){
                $sqlFrom .= " AND nombre LIKE'%" . $texto ."%'";
            }
            $con->prepararConsulta("SELECT COUNT(*) AS Cantidad". $sqlFrom);
            $con->ejecutarConsulta();
            $totalSql = $con->obtenerLista();
            $result->total = $totalSql[0]->Cantidad;
            $sqlFrom .= " LIMIT ". $start .",". $limit;
            $con->prepararConsulta($sqlSelect . $sqlFrom);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->put(
    '/pais/:idPais',
    function ($idPais) use ($app){
    $result = new Resultado();
    try{
        $con = Conexion::crearConexion();
        $informacion = json_decode($app->request()->getBody());
        $datetime = new DateTime();
        $con->empezarTransaccion();
        $con->prepararConsulta("UPDATE pais SET 
            nombre = ?, 
            usuarioModificacion = ?,
            fechaModificacion = ? 
            WHERE id = ?");
        $con->parametro("1", $informacion->nombre);
        $con->parametro("2", $informacion->usuario);
        $con->parametro("3", $datetime->format('Y\-m\-d\ H:i:s'));
        $con->parametro("4", $idPais);
        $con->ejecutarConsulta();
        $con->ejecutarTransaccion();
        $result->mensaje = "Registro actualizado correctamente.";
        }catch(Exception $ex){
            $con->cancelarTransaccion();
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->post(
    '/pais',
    function () use ($app){
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $informacion = json_decode($app->request()->getBody());
            $datetime = new DateTime();
            $con->empezarTransaccion();
            $con->prepararConsulta("INSERT INTO pais(
                nombre,
                usuarioCreacion,
                fechaCreacion)
                VALUES (?,?,?)");
            $con->parametro("1", $informacion->nombre);
            $con->parametro("2", $informacion->usuario);
            $con->parametro("3", $datetime->format('Y\-m\-d\ H:i:s'));
            $con->ejecutarConsulta();
            $con->ejecutarTransaccion();
            $result->mensaje = "Datos almacenados correctamente.";
        }catch(Exception $ex){
            $con->cancelarTransaccion();
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

/*
 * +-----------------------------------------------------------+
 * |Desarrollador Por  :                                       |
 * |Fecha Desarrollo   : --/--/----                            |
 * |Desarrollador Edita:                                       |
 * |Fecha Edicion      :                                       |
 * |Descripcion Edicion:                                       |
 * |Para el Modulo     :                                       |
 * |Descripción        :                                       |
 * |Metodos            :                                       |
 * +-----------------------------------------------------------+
 */

$app->get(
    '/tipoIdentificacion',
    function() use ($app) {
        $request = $app->request();
        $texto = $request->get("texto");
        $start = $request->get("start");
        $limit = $request->get("limit");
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $sqlSelect = "SELECT id, nombre, estado, acronimo";
            $sqlFrom = " FROM tipo_identificacion WHERE 1 = 1";
            if($texto != null && $texto != ''){
                $sqlFrom .= " AND (nombre LIKE'%" . $texto . "%' OR acronimo LIKE'%". $texto . "%')";
            }
            $con->prepararConsulta("SELECT COUNT(*) AS Cantidad". $sqlFrom);
            $con->ejecutarConsulta();
            $totalSql = $con->obtenerLista();
            $result->total = $totalSql[0]->Cantidad;
            $sqlFrom .= " LIMIT ". $start .",". $limit;
            $con->prepararConsulta($sqlSelect . $sqlFrom);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->post(
    '/tipoIdentificacion',
    function () use ($app){
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $informacion = json_decode($app->request()->getBody());
            $arrayResult = array();
            $datetime = new DateTime();
            $con->empezarTransaccion();
            $con->prepararConsulta("INSERT INTO tipo_identificacion(
                nombre,
                estado,
                acronimo)
                VALUES (?,?,?)");
            $con->parametro("1", $informacion->nombre);
            $con->parametro("2", $informacion->estado);
            $con->parametro("3", $informacion->acronimo);
            $con->ejecutarConsulta();
            $con->ejecutarTransaccion();
            $result->mensaje = "Datos almacenados correctamente.";
        }catch(Exception $ex){
            $con->cancelarTransaccion();
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->put(
    '/tipoIdentificacion/:idTipoIdentificacion',
    function ($idTipoIdentificacion) use ($app){
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $informacion = json_decode($app->request()->getBody());
            $con->empezarTransaccion();
            $con->prepararConsulta("UPDATE tipo_identificacion SET 
                nombre = ?,
                estado = ?,
                acronimo = ?
                WHERE id = ?");
            $con->parametro("1", $informacion->nombre);
            $con->parametro("2", $informacion->estado);
            $con->parametro("3", $informacion->acronimo);
            $con->parametro("4", $idTipoIdentificacion);
            $con->ejecutarConsulta();
            $con->ejecutarTransaccion();
            $result->mensaje = "Registro actualizado correctamente.";
        }catch(Exception $ex){
            $con->cancelarTransaccion();
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

/*
 * +-----------------------------------------------------------+
 * |Desarrollador Por  :                                       |
 * |Fecha Desarrollo   : --/--/----                            |
 * |Desarrollador Edita:                                       |
 * |Fecha Edicion      :                                       |
 * |Descripcion Edicion:                                       |
 * |Para el Modulo     :                                       |
 * |Descripción        :                                       |
 * |Metodos            :                                       |
 * +-----------------------------------------------------------+
 */

$app->get(
    '/ciudad',
    function() use ($app) {
        $request = $app->request();
        $texto = $request->get('texto');
        $start = $request->get('start');
        $limit = $request->get('limit');
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $sqlSelect = "SELECT 
                c.id, 
                c.nombre AS nombreCiudad, 
                c.idDepartamento, 
                d.nombre AS nombreDepartamento, 
                p.id AS idPais, 
                p.nombre AS nombrePais, 
                c.usuarioCreacion, 
                c.fechaCreacion";
            $sqlFrom = " FROM ciudad AS c 
                INNER JOIN departamento AS d ON c.idDepartamento = d.id 
                INNER JOIN pais AS p ON d.idPais = p.id 
                WHERE 1 = 1";
            if($texto != '' && $texto != null){
                $sqlFrom .= " AND c.nombre LIKE'%" . $texto . "%' OR d.nombre LIKE'%" . $texto . "%' OR p.nombre LIKE'%" . $texto . "%'";
            }
            $con->prepararConsulta("SELECT COUNT(*) AS Cantidad". $sqlFrom);
            $con->ejecutarConsulta();
            $totalSql = $con->obtenerLista();
            $result->total = $totalSql[0]->Cantidad;
            $sqlFrom .= " LIMIT ". $start .",". $limit;
            $con->prepararConsulta($sqlSelect . $sqlFrom);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->put(
    '/ciudad/:idCiudad',
    function ($idCiudad) use ($app){
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $informacion = json_decode($app->request()->getBody());
            $arrayResult = array();
            $datetime = new DateTime();
            $con->empezarTransaccion();
            $con->prepararConsulta("UPDATE ciudad SET 
                nombre = ?,
                idDepartamento = ?,
                usuarioModificacion = ?,
                fechaModificacion = ?
                WHERE id = ?");
            $con->parametro("1", $informacion->nombreCiudad);
            $con->parametro("2", $informacion->idDepartamento);
            $con->parametro("3", $informacion->usuario);
            $con->parametro("4", $datetime->format('Y\-m\-d\ H:i:s'));
            $con->parametro("5", $idCiudad);
            $con->ejecutarConsulta();
            $con->ejecutarTransaccion();
            $result->mensaje = "Registro actualizado correctamente.";
        }catch(Exception $ex){
            $con->cancelarTransaccion();
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->post(
    '/ciudad',
    function () use ($app){
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $informacion = json_decode($app->request()->getBody());
            $arrayResult = array();
            $datetime = new DateTime();
            $con->empezarTransaccion();
            $con->prepararConsulta("INSERT INTO ciudad(
                nombre,
                idDepartamento,
                usuarioCreacion,
                fechaCreacion)
                VALUES (?,?,?,?)");
            $con->parametro("1", $informacion->nombreCiudad);
            $con->parametro("2", $informacion->idDepartamento);
            $con->parametro("3", $informacion->usuario);
            $con->parametro("4", $datetime->format('Y\-m\-d\ H:i:s'));
            $con->ejecutarConsulta();
            $con->ejecutarTransaccion();
            $result->mensaje = "Datos almacenados correctamente.";
        }catch(Exception $ex){
            $con->cancelarTransaccion();
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

/*
 * +-----------------------------------------------------------+
 * |Desarrollador Por  :                                       |
 * |Fecha Desarrollo   : --/--/----                            |
 * |Desarrollador Edita:                                       |
 * |Fecha Edicion      :                                       |
 * |Descripcion Edicion:                                       |
 * |Para el Modulo     :                                       |
 * |Descripción        :                                       |
 * |Metodos            :                                       |
 * +-----------------------------------------------------------+
 */

$app->get(
    '/clientes',
    function() use ($app) {
        $request = $app->request();
        $texto = $request->get('texto');
        $start = $request->get('start');
        $limit = $request->get('limit');
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $sqlSelect = "SELECT
                c.id,
                t.id as idTercero,
                ti.id as idTipoIdentificacion,
                CONCAT(ti.acronimo, ': ', t.identificacion) as identificacionCompuesta,
                t.nombreCompleto,
                t.fechaNacimiento,
                t.direccion,
                t.telefono,
                t.email,
                t.estado";
            $sqlFrom = " FROM clientes as c 
                INNER JOIN tercero as t on c.idTercero = t.id
                INNER JOIN tipo_identificacion as ti on t.idTipoIdentificacion = ti.id WHERE 1 = 1";
            if($texto != '' && $texto != null){
                $sqlFrom .= " AND (t.nombreCompleto LIKE'%" . $texto . "%' OR t.identificacion LIKE'%" . $texto . "%' OR d.direccion LIKE '%" . $texto . "%')";
            }
            $con->prepararConsulta("SELECT COUNT(*) AS Cantidad" . $sqlFrom);
            $con->ejecutarConsulta();
            $totalSql = $con->obtenerLista();
            $result->total = $totalSql[0]->Cantidad;
            $sqlFrom .= " LIMIT ". $start .",". $limit;
            $con->prepararConsulta($sqlSelect . $sqlFrom);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);


$app->post(
    '/clientes',
    function () use ($app){
        $result = new Resultado();
        $con = Conexion::crearConexion();
        try{
            $informacion = json_decode($app->request()->getBody());
            $fechaActual = new DateTime();
            $con->empezarTransaccion();
            /**** Se agrega el tercero ***/
            /*---- Verificacion Existencia de Registro ----*/
            $con->prepararConsulta("SELECT COUNT(*) AS Verficacion FROM tercero where identificacion = ?");
            $con->parametro("1", $informacion->identificacion);
            $con->ejecutarConsulta();
            $datos = $con->obtenerLista();
            if($datos["0"]->Verficacion == 0){//no hay registros con esa identificaicon
                $con->prepararConsulta("INSERT INTO tercero(
                    idTipoIdentificacion,
                    identificacion,
                    nombres,
                    apellidos,
                    nombreCompleto,
                    fechaNacimiento,
                    direccion,
                    telefono,
                    email,
                    estado,
                    usuarioCreacion,
                    fechaCreacion) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
                $con->parametro("1", $informacion->idTipoIdentificacion);
                $con->parametro("2", $informacion->identificacion);
                $con->parametro("3", $informacion->nombres);
                $con->parametro("4", $informacion->apellidos);
                $con->parametro("5", $informacion->nombres . ' ' .$informacion->apellidos);
                $con->parametro("6", $informacion->fechaNacimiento);
                $con->parametro("7", $informacion->direccion);
                $con->parametro("8", $informacion->telefono);
                $con->parametro("9", $informacion->email);
                $con->parametro("10", $informacion->estado);
                $con->parametro("11", $informacion->usuario);
                $con->parametro("12", $fechaActual->format('Y\-m\-d\ H:i:s'));
                $con->ejecutarConsulta();
                $idTercero = $con->obtenerUltimoId();

                /**** Se agrega el cliente ****/
                $con->prepararConsulta("INSERT INTO clientes(
                    idTercero) 
                    VALUES (?)");
                $con->parametro("1", $idTercero);
                $con->ejecutarConsulta();

                /**** Se agrega el usuario ****/
                $con->prepararConsulta("INSERT INTO usuario(
                    codigo, 
                    clave, 
                    idTercero, 
                    estado, 
                    bloqueado, 
                    intentosFallidos) 
                    VALUES (?,?,?,?,?,?)");
                $con->parametro("1", $informacion->identificacion);
                $con->parametro("2", "40bd001563085fc35165329ea1ff5c5ecbdbbeef");//123
                $con->parametro("3", $idTercero);
                $con->parametro("4", 1);
                $con->parametro("5", 0);
                $con->parametro("6", 0);
                $con->ejecutarConsulta();
                $idUsuario = $con->obtenerUltimoId();

                /**** Se agrega el rol al usuario ****/
                $con->prepararConsulta("INSERT INTO usuario_roll(
                    idUsuario,
                    idRoll) 
                    VALUES (?,?)");
                $con->parametro("1", $idUsuario);
                $con->parametro("2", 3);
                $con->ejecutarConsulta();

                $con->ejecutarTransaccion();
                $result->mensaje = "Se guardo correctamente la información.";
            }else{
                $con->cancelarTransaccion();
                $result->estado = false;
                $result->codigoMensaje = 1;
                $result->mensaje = "El estudiante ya se esta registrado en el sistema.";
            }
        }catch(Exception $ex){
            $con->cancelarTransaccion(); 
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->put(
    '/clientes/:idCliente',
    function ($idCliente) use ($app){
        $result = new Resultado();
        $con = Conexion::crearConexion();
        try{
            $informacion = json_decode($app->request()->getBody());
            $arrayResult = array();
            $fechaActual = new DateTime();
            $con->empezarTransaccion();

            /****** Se actualiza el registro en la tabla tercero ******/
            $con->prepararConsulta("UPDATE tercero SET 
                idTipoIdentificacion = ?,
                identificacion = ?,
                nombres = ?,
                apellidos = ?,
                nombreCompleto = ?,
                fechaNacimiento = ?,
                direccion = ?,
                telefono = ?,
                email = ?,
                usuarioModificacion = ?,
                fechaModificacion = ?
                WHERE id = ?");
            $con->parametro("1", $informacion->idTipoIdentificacion);
            $con->parametro("2", $informacion->identificacion);
            $con->parametro("3", $informacion->nombres);
            $con->parametro("4", $informacion->apellidos);
            $con->parametro("5", $informacion->nombreCompleto);
            $con->parametro("6", $informacion->fechaNacimiento);
            $con->parametro("7", $informacion->direccion);
            $con->parametro("8", $informacion->telefono);
            $con->parametro("9", $informacion->email);
            $con->parametro("10", $informacion->usuario);
            $con->parametro("11", $fechaActual->format('Y\-m\-d\ H:i:s'));
            $con->parametro("12", $informacion->idTercero);
            $con->ejecutarConsulta();

            
            $con->ejecutarTransaccion();
            $result->mensaje = "Se actualizó correctamente la información.";
        }catch(Exception $ex){
            $con->cancelarTransaccion();
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);


/*
 * +-----------------------------------------------------------+
 * |Desarrollador Por  :                                       |
 * |Fecha Desarrollo   : --/--/----                            |
 * |Desarrollador Edita:                                       |
 * |Fecha Edicion      :                                       |
 * |Descripcion Edicion:                                       |
 * |Para el Modulo     :                                       |
 * |Descripción        :                                       |
 * |Metodos            :                                       |
 * +-----------------------------------------------------------+
 */

$app->get(
    '/productos',
    function() use ($app) {
        $request = $app->request();
        $texto = $request->get('texto');
        $start = $request->get('start');
        $limit = $request->get('limit');
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $sqlSelect = "SELECT
                p.id,
                p.nombre,
                p.idMarca,
                p.precio,
                m.nombre as nombreMarca";
            $sqlFrom = " FROM productos as p 
                inner join marcas as m on p.idMarca = m.id WHERE 1 = 1";
            if($texto != '' && $texto != null){
                $sqlFrom .= " AND (p.nombre LIKE'%" . $texto . "%' OR p.precio LIKE'%" . $texto . "%' OR m.nombre LIKE '%" . $texto . "%')";
            }
            $con->prepararConsulta("SELECT COUNT(*) AS Cantidad" . $sqlFrom);
            $con->ejecutarConsulta();
            $totalSql = $con->obtenerLista();
            $result->total = $totalSql[0]->Cantidad;
            $sqlFrom .= " LIMIT ". $start .",". $limit;
            $con->prepararConsulta($sqlSelect . $sqlFrom);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);


$app->post(
    '/productos',
    function () use ($app){
        $result = new Resultado();
        $con = Conexion::crearConexion();
        try{
            $informacion = json_decode($app->request()->getBody());
            $fechaActual = new DateTime();
            $con->empezarTransaccion();
            /**** Se agrega el tercero ***/

            $con->prepararConsulta("INSERT INTO productos(
                nombre,
                idMarca,
                precio) 
                VALUES (?,?,?)");
            $con->parametro("1", $informacion->nombre);
            $con->parametro("2", $informacion->idMarca);
            $con->parametro("3", $informacion->precio);
            $con->ejecutarConsulta();
            $idTercero = $con->obtenerUltimoId();

            $con->ejecutarTransaccion();
            $result->mensaje = "Se guardo correctamente la información.";
        
        }catch(Exception $ex){
            $con->cancelarTransaccion(); 
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->put(
    '/productos/:idProducto',
    function ($idProducto) use ($app){
        $result = new Resultado();
        $con = Conexion::crearConexion();
        try{
            $informacion = json_decode($app->request()->getBody());
            $arrayResult = array();
            $fechaActual = new DateTime();
            $con->empezarTransaccion();
            $con->prepararConsulta("UPDATE productos SET 
                nombre = ?,
                idMarca = ?,
                precio = ?
                WHERE id = ?");
            $con->parametro("1", $informacion->nombre);
            $con->parametro("2", $informacion->idMarca);
            $con->parametro("3", $informacion->precio);
            $con->parametro("4", $idProducto);
            $con->ejecutarConsulta();
            $con->ejecutarTransaccion();
            $result->mensaje = "Se actualizó correctamente la información.";
        }catch(Exception $ex){
            $con->cancelarTransaccion();
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

/*
 * +-----------------------------------------------------------+
 * |Desarrollador Por  :                                       |
 * |Fecha Desarrollo   : --/--/----                            |
 * |Desarrollador Edita:                                       |
 * |Fecha Edicion      :                                       |
 * |Descripcion Edicion:                                       |
 * |Para el Modulo     :                                       |
 * |Descripción        :                                       |
 * |Metodos            :                                       |
 * +-----------------------------------------------------------+
 */

$app->get(
    '/ventas',
    function() use ($app) {
        $request = $app->request();
        $texto = $request->get('texto');
        $mes = $request->get('mes');
        $start = $request->get('start');
        $limit = $request->get('limit');
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $sqlSelect = "SELECT
                co.id,
                co.idCliente,
                t.nombreCompleto,
                co.totalCompra,
                co.totalContado,
                co.totalCredito,
                co.fechaCompra";
            $sqlFrom = " FROM compra as co 
                inner join clientes as c on co.idCliente = c.id
                inner join tercero as t on c.idTercero = t.id WHERE 1 = 1";
            if($texto != '' && $texto != null){
                $sqlFrom .= " AND (t.nombreCompleto LIKE'%" . $texto . "%' OR co.totalCompra LIKE'%" . $texto . "%' OR  co.totalCredito LIKE '%" . $texto . "%')";
            }
            if($mes != null && $mes != ''){
                $sql .= " AND date_format(co.fechaCompra, '%M') LIKE'%". $mes . "%'";
            }
            $con->prepararConsulta("SELECT COUNT(*) AS Cantidad" . $sqlFrom);
            $con->ejecutarConsulta();
            $totalSql = $con->obtenerLista();
            $result->total = $totalSql[0]->Cantidad;
            $sqlFrom .= " LIMIT ". $start .",". $limit;
            $con->prepararConsulta($sqlSelect . $sqlFrom);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->put(
    '/ventas/:idVenta',
    function ($idVenta) use ($app){
        $result = new Resultado();
        $con = Conexion::crearConexion();
        try{
            $informacion = json_decode($app->request()->getBody());
            $arrayResult = array();
            $fechaActual = new DateTime();
            $con->empezarTransaccion();
            $con->prepararConsulta("UPDATE compra SET 
                idCliente = ?,
                totalCompra = ?,
                totalContado = ?,
                totalCredito = ?,
                fechaCompra = ?
                WHERE id = ?");
            $con->parametro("1", $informacion->idCliente);
            $con->parametro("2", $informacion->totalCompra);
            $con->parametro("3", $informacion->totalContado);
            $con->parametro("4", $informacion->totalCredito);
            $con->parametro("5", date_format($fechaActual, 'Y-m-d'));
            $con->parametro("6", $idVenta);
            $con->ejecutarConsulta();
            if(!is_null($informacion->ventaDetalle)){
                foreach ($informacion->ventaDetalle as $_detalle) {
                    $con->prepararConsulta("INSERT INTO compra_detalle
                        (idCompra,
                        idProducto,
                        cantidad)values(?,?,?)");
                    $con->parametro("1", $idVenta);
                    $con->parametro("2", $_detalle->idProducto);
                    $con->parametro("3", $_detalle->cantidadProducto);
                    $con->ejecutarConsulta();
                }
            }
            $con->ejecutarTransaccion();
            $result->mensaje = "Se actualizó correctamente la información.";
        }catch(Exception $ex){
            $con->cancelarTransaccion();
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->post(
    '/ventas',
    function () use ($app){
        $result = new Resultado();
        $con = Conexion::crearConexion();
        try{
            $informacion = json_decode($app->request()->getBody());
            $fechaActual = new DateTime();
            $con->empezarTransaccion();
            $con->prepararConsulta("INSERT INTO compra(
                idCliente,
                totalCompra,
                totalContado,
                totalCredito,
                fechaCompra) 
                VALUES (?,?,?,?,?)");
            $con->parametro("1", $informacion->idCliente);
            $con->parametro("2", $informacion->totalCompra);
            $con->parametro("3", $informacion->totalContado);
            $con->parametro("4", $informacion->totalCredito);
            $con->parametro("5", date_format($fechaActual, 'Y-m-d'));
            $con->ejecutarConsulta();
            $idVenta = $con->obtenerUltimoId();
            if(!is_null($informacion->ventaDetalle)){
                foreach ($informacion->ventaDetalle as $_detalle) {
                    $con->prepararConsulta("INSERT INTO compra_detalle
                        (idCompra,
                        idProducto,
                        cantidad)values(?,?,?)");
                    $con->parametro("1", $idVenta);
                    $con->parametro("2", $_detalle->idProducto);
                    $con->parametro("3", $_detalle->cantidadProducto);
                    $con->ejecutarConsulta();
                }
            }
            $con->ejecutarTransaccion();
            $result->mensaje = "Se guardo correctamente la información.";
        
        }catch(Exception $ex){
            $con->cancelarTransaccion(); 
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode;
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->get(
    '/ventasDetalle',
    function() use ($app) {
        $request = $app->request();
        $idVenta = $request->get('idVenta');
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();

            $con->prepararConsulta("SELECT
                cd.id,
                cd.idProducto,
                p.precio as valorUnidadProducto,
                p.nombre as nombreProducto,
                cd.cantidad as cantidadProducto,
                (p.precio * cd.cantidad) as totalProducto 
                FROM compra_detalle as cd 
                inner join productos as p on cd.idProducto = p.id where idCompra = ?");
            $con->parametro("1", $idVenta);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

/*
 * +-----------------------------------------------------------+
 * |Desarrollador Por  :                                       |
 * |Fecha Desarrollo   : --/--/----                            |
 * |Desarrollador Edita:                                       |
 * |Fecha Edicion      :                                       |
 * |Descripcion Edicion:                                       |
 * |Para el Modulo     :                                       |
 * |Descripción        :                                       |
 * |Metodos            :                                       |
 * +-----------------------------------------------------------+
 */

$app->get(
    '/consumo',
    function() use ($app) {
        $request = $app->request();
        $idCliente = $request->get('idCliente');
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $con->prepararConsulta("SELECT
                co.id,
                co.idCliente,
                t.nombreCompleto,
                co.totalCompra,
                co.totalContado,
                co.totalCredito,
                co.fechaCompra
                FROM compra as co 
                inner join clientes as c on co.idCliente = c.id
                inner join tercero as t on c.idTercero = t.id
                WHERE co.idCliente = ?");
            $con->parametro("1", $idCliente);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

/*
 * +------------------------------------------------------------------------------------------------+
 * |                                                                                                |
 * |                                        SERVICIOS PARA COMBOBOX                                 |
 * |                                                                                                |
 * +------------------------------------------------------------------------------------------------+
 */

$app->get(
    '/combo/departamentoCiudad',
    function() use ($app) {
        $request = $app->request();
        $texto = $request->get("texto");
        $start = $request->get("start");
        $limit = $request->get("limit");
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $sqlSelect = "SELECT
                d.id AS idDepartamento, 
                d.nombre AS nombreDepartamento, 
                c.id AS idCiudad, 
                c.nombre AS nombreCiudad";
            $sqlFrom = " FROM departamento AS d INNER JOIN ciudad AS c ON c.idDepartamento = d.id WHERE 1 = 1";
            if($texto != null && $texto != ''){
                $sqlFrom .= " AND (d.nombre LIKE'%". $texto ."%' OR c.nombre LIKE'%". $texto . "%')";
            }
            $con->prepararConsulta("SELECT COUNT(*) AS Cantidad". $sqlFrom);
            $con->ejecutarConsulta();
            $totalSql = $con->obtenerLista();
            $result->total = $totalSql[0]->Cantidad;
            $sqlFrom .= " LIMIT ". $start .",". $limit;
            $con->prepararConsulta($sqlSelect . $sqlFrom);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->get(
    '/combo/marcas',
    function() use ($app) {
        $request = $app->request();
        $texto = $request->get("texto");
        $start = $request->get("start");
        $limit = $request->get("limit");
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $sqlSelect = "SELECT
                id,
                nombre";
            $sqlFrom = " FROM marcas WHERE 1 = 1";
            if($texto != null && $texto != ''){
                $sqlFrom .= " AND (nombre LIKE'%". $texto ."%')";
            }
            $con->prepararConsulta("SELECT COUNT(*) AS Cantidad". $sqlFrom);
            $con->ejecutarConsulta();
            $totalSql = $con->obtenerLista();
            $result->total = $totalSql[0]->Cantidad;
            $sqlFrom .= " LIMIT ". $start .",". $limit;
            $con->prepararConsulta($sqlSelect . $sqlFrom);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->get(
    '/combo/clientes',
    function() use ($app) {
        $request = $app->request();
        $texto = $request->get("texto");
        $start = $request->get("start");
        $limit = $request->get("limit");
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $sqlSelect = "SELECT
                c.id,
                CONCAT(CONCAT(ti.acronimo, ': ',t.identificacion),' - ', t.nombreCompleto) as nombreCompuesto";
            $sqlFrom = " FROM clientes as c 
                inner join tercero as t on c.idTercero = t.id
                inner join tipo_identificacion as ti on t.idTipoIdentificacion = ti.id WHERE 1 = 1";
            if($texto != null && $texto != ''){
                $sqlFrom .= " AND (t.nombreCompleto LIKE'%". $texto ."%' OR t.identificacion LIKE '%" . $texto . "%')";
            }
            $con->prepararConsulta("SELECT COUNT(*) AS Cantidad". $sqlFrom);
            $con->ejecutarConsulta();
            $totalSql = $con->obtenerLista();
            $result->total = $totalSql[0]->Cantidad;
            $sqlFrom .= " LIMIT ". $start .",". $limit;
            $con->prepararConsulta($sqlSelect . $sqlFrom);
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

/*
 * +------------------------------------------------------------------------------------------------+
 * |                                                                                                |
 * |                                        SERVICIOS PARA LISTAS                                   |
 * |                                                                                                |
 * +------------------------------------------------------------------------------------------------+
 */
$app->get(
    '/listas/productos',
    function() use ($app) {
        $request = $app->request();
        $result = new Resultado();
        try{
            $con = Conexion::crearConexion();
            $con->prepararConsulta("SELECT
                p.id,
                p.nombre,
                p.idMarca,
                p.precio,
                m.nombre as nombreMarca FROM productos as p 
                inner join marcas as m on p.idMarca = m.id");
            $con->ejecutarConsulta();
            $result->datos = $con->obtenerLista();
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);


/*
 * +------------------------------------------------------------------------------------------------+
 * |                                                                                                |
 * |                                        SERVICIOS ZOHO INVOICE                                  |
 * |                                                                                                |
 * +------------------------------------------------------------------------------------------------+
 */
$app->get(
    '/zohoInvoice/facturas',
    function() use ($app) {
        $request = $app->request();
        $tipo = $request->get("tipo");
        $value = $request->get("value");
        $result = new Resultado();
        try{
            $apiUrl = "https://invoice.zoho.com/api/v3/invoices?authtoken=c9c08b9f0e31760f001dbd0b475abc5f&organization_id=636945905";
            if($tipo != null && $tipo != '' && $tipo != 0){
                if($value != null && $value != '' && $value != 0){
                    switch ($tipo) {
                        case 1:
                            $apiUrl .= "&total_less_than=".$value;
                            break;
                        case 2:
                            $apiUrl .= "&total_less_equals=".$value;
                            break;
                        case 3:
                            $apiUrl .= "&total_greater_than=".$value;
                            break;
                        case 4:
                            $apiUrl .= "&total_greater_equals=".$value;
                            break;
                    }
                } 
            }
            $content = @file_get_contents($apiUrl);
            if (strpos($http_response_header[0], "200")) { 
                $result->estado = true;
                $dataDecode = json_decode($content, TRUE);
                if($dataDecode["message"] == "success"){
                    $result->estado = true;
                    $result->total = count($dataDecode["invoices"]);
                    $result->datos = $dataDecode["invoices"];
                }else{
                    $result->mensaje = "No se cargaron los datos correctaente desde Zoho Invoice.";
                    $result->codigoMensaje = "02";
                    $result->estado = false;
                }
            } else { 
                $result->mensaje = "El servicio de Zoho Invoce no responde.";
                $result->codigoMensaje = "01";
                $result->estado = false;
            }
        }catch(PDOException $ex) {
            $result->estado = false;
            $result->codigoMensaje = $ex->getCode();
            $result->mensaje = $ex->getMessage();
        }
        echo json_encode($result);
    }
);

$app->run();