<?php
header('Content-Type: text/html; charset=utf-8');
class Conexion{
    
    private static $instancia;
    private $conexion;
    private $consulta;
    
    private function __construct(){
            $this->conexion = new PDO('mysql:host=localhost;dbname=hackathon;charset=utf8', 'root', '');
            //$this->conexion = new PDO('mysql:host=mysql.csmtecnologiasas.com;dbname=csmagronomo;charset=utf8', 'sacsm', 'csm.-tec');
            //$this->conexion = new PDO('mysql:host=mysql.csmtecnologiasas.com;dbname=arcadiaprueba;charset=utf8', 'sacsm', 'csm.-tec');
            $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            set_time_limit(1200); //300 segundos --- 20 min
    }
    
    public static function crearConexion(){
        if(!isset(self::$instancia)){
            $miclase = __CLASS__;
            self::$instancia = new $miclase;
        }
        return self::$instancia;
    }
    
      // Evita que el objeto se pueda clonar
    public function __clone()
    {
        trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR);
    }
    
    public function prepararConsulta($consulta){
        $this->consulta = $this->conexion->prepare($consulta);
        return $this->consulta;
    }
    
    public function parametro($parametro, $valor, $tipo = PDO::PARAM_STR){
        $this->consulta->bindParam($parametro, $valor, $tipo);
    }
    
    public function ejecutarConsulta(){
        $this->consulta->execute();
        return $this->consulta;
    }
    
    public function obtenerLista(){
        return $this->consulta->fetchAll(PDO::FETCH_CLASS);
    }

    public function obtenerUltimoId(){
        return $this->conexion->lastInsertId();
    }

    public function ejecutarConsultaRapida($consulta){
        $this->consulta = $this->conexion->prepare($consulta);
        $this->consulta->execute();
        return $this->consulta->fetchAll(PDO::FETCH_CLASS);
    }

    public function empezarTransaccion() {
        $this->conexion->beginTransaction();
    }

    public function ejecutarTransaccion() {
       $this->conexion->commit();
    }

    public function cancelarTransaccion() {
        $this->conexion->rollback();
    }
}
?>