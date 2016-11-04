-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: hackathon
-- ------------------------------------------------------
-- Server version	5.6.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accion`
--

DROP TABLE IF EXISTS `accion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `estado` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla donde se crean las acciones que puede ejecutar algun formulario';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accion`
--

LOCK TABLES `accion` WRITE;
/*!40000 ALTER TABLE `accion` DISABLE KEYS */;
INSERT INTO `accion` VALUES (1,'A01','Nuevo',1),(2,'A02','Guardar',1),(3,'A03','Modificar',1),(4,'A04','Eliminar',1),(5,'A05','Sincronizar',1),(6,'A06','Imprimir',1),(7,'A07','Bloquear',1),(8,'A08','Listar',1);
/*!40000 ALTER TABLE `accion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carpeta`
--

DROP TABLE IF EXISTS `carpeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carpeta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `idCarpeta` int(11) DEFAULT NULL COMMENT 'relacion con carpeta padre',
  `estado` tinyint(4) NOT NULL COMMENT '1 - Activo\n0 - Inactivo',
  `iconCls` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carpeta_carpeta_idx` (`idCarpeta`),
  CONSTRAINT `carpeta_carpeta` FOREIGN KEY (`idCarpeta`) REFERENCES `carpeta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla de carpetas o contenedores de formularios';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carpeta`
--

LOCK TABLES `carpeta` WRITE;
/*!40000 ALTER TABLE `carpeta` DISABLE KEYS */;
INSERT INTO `carpeta` VALUES (1,'Seguridad',NULL,1,'x-fa fa-lock csm-icon-menu'),(2,'Configuración',NULL,1,'x-fa fa-gears csm-icon-menu'),(3,'Reportes',NULL,1,'x-fa fa-area-chart'),(4,'Cafeteria',NULL,1,'x-fa fa-folder');
/*!40000 ALTER TABLE `carpeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciudad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `idDepartamento` int(11) NOT NULL,
  `usuarioCreacion` varchar(20) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `usuarioModificacion` varchar(20) DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Ciu_Dep_Id` (`idDepartamento`),
  CONSTRAINT `ciudad_departamento` FOREIGN KEY (`idDepartamento`) REFERENCES `departamento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (1,'Neiva',18,'fjmora','2015-12-30 00:00:00','fjmora','2016-03-18 07:42:50'),(3,'Campoalegre',18,'AdmCsm','2015-12-31 06:25:43','AdmCsm','2016-03-04 13:17:22'),(4,'Rivera',18,'AdmCsm','2015-12-31 06:29:39','AdmCsm','2016-03-04 13:17:26'),(5,'Algeciras',18,'AdmCsm','2015-12-31 06:37:42','AdmCsm','2016-03-04 13:17:31'),(6,'El Juncal',18,'AdmCsm','2016-01-07 02:05:28','AdmCsm','2016-03-04 13:17:37'),(7,'Aipe',18,'fjmora','2016-03-18 05:09:14',NULL,NULL),(8,'Hobo',18,'fjmora','2016-08-31 22:00:05',NULL,NULL);
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idTercero` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cliente_tercero_idx` (`idTercero`),
  CONSTRAINT `fk_cliente_tercero` FOREIGN KEY (`idTercero`) REFERENCES `tercero` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,2),(6,19),(7,20),(8,21);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCliente` int(11) NOT NULL,
  `totalCompra` bigint(20) NOT NULL,
  `totalContado` bigint(20) DEFAULT NULL,
  `totalCredito` bigint(20) DEFAULT NULL,
  `fechaCompra` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,1,30500,30500,0,'2016-09-01'),(2,1,21500,11500,10000,'2016-09-01'),(3,1,75000,25000,50000,'2016-09-01'),(4,6,30000,30000,0,'2016-09-01'),(5,1,119000,119000,0,'2016-09-01'),(6,1,14000,9000,5000,'2016-09-01'),(7,7,15000,15000,0,'2016-09-01'),(8,8,16000,6000,10000,'2016-09-01');
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra_detalle`
--

DROP TABLE IF EXISTS `compra_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compra_detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCompra` int(11) NOT NULL COMMENT 'Estado del producto en la compra:\n1 - Contado\n2 - Credito',
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra_detalle`
--

LOCK TABLES `compra_detalle` WRITE;
/*!40000 ALTER TABLE `compra_detalle` DISABLE KEYS */;
INSERT INTO `compra_detalle` VALUES (1,1,3,2),(2,2,3,3),(3,2,1,2),(4,1,1,3),(5,1,2,4),(6,3,1,30),(7,4,2,10),(8,5,2,14),(9,5,3,14),(10,6,2,3),(11,6,1,2),(12,7,2,5),(13,8,4,3),(14,8,3,1);
/*!40000 ALTER TABLE `compra_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `idPais` int(11) NOT NULL,
  `usuarioCreacion` varchar(20) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `usuarioModificacion` varchar(20) DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Dep_Pais_Id` (`idPais`),
  CONSTRAINT `departamento_pais` FOREIGN KEY (`idPais`) REFERENCES `pais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,'Amazonas',1,'JuanPolania','2016-03-04 12:45:04',NULL,NULL),(2,'Antioquia',1,'JuanPolania','2016-03-04 12:45:11',NULL,NULL),(3,'Arauca',1,'JuanPolania','2016-03-04 12:45:21',NULL,NULL),(4,'Atlántico',1,'fjmora','2015-12-31 23:31:00',NULL,NULL),(5,'Bogotá',1,'fjmora','2015-12-31 23:31:00',NULL,NULL),(6,'Bolívar',1,'JuanPolania','2016-03-04 12:45:36',NULL,NULL),(7,'Boyacá',1,'JuanPolania','2016-03-04 12:45:45',NULL,NULL),(8,'Caldas',1,'JuanPolania','2016-03-04 12:45:52',NULL,NULL),(9,'Caquetá',1,'JuanPolania','2015-12-31 04:53:04',NULL,NULL),(10,'Casanare',1,'JuanPolania','2016-03-04 12:46:06',NULL,NULL),(11,'Cauca',1,'JuanPolania','2015-12-31 05:15:03',NULL,NULL),(12,'Cesar',1,'JuanPolania','2016-03-04 12:46:18',NULL,NULL),(13,'Chocó',1,'JuanPolania','2016-03-04 12:46:29',NULL,NULL),(14,'Cundinamarca',1,'JuanPolania','2016-03-04 12:46:49',NULL,NULL),(15,'Córdoba',1,'JuanPolania','2016-03-04 12:46:39',NULL,NULL),(16,'Guainía',1,'JuanPolania','2016-03-04 12:46:56',NULL,NULL),(17,'Guaviare',1,'JuanPolania','2016-03-04 12:47:06',NULL,NULL),(18,'Huila',1,'juanPolania','2015-12-30 00:00:00',NULL,NULL),(19,'La Guajira',1,'JuanPolania','2016-03-04 12:47:16',NULL,NULL),(20,'Magdalena',1,'JuanPolania','2016-03-04 12:47:22',NULL,NULL),(21,'Meta',1,'fjmora','2015-12-31 23:31:00',NULL,NULL),(22,'Nariño',1,'JuanPolania','2016-03-04 12:47:31',NULL,NULL),(23,'Norte de Santander',1,'JuanPolania','2015-12-31 04:53:05',NULL,NULL),(24,'Norte de Santander',1,'JuanPolania','2016-03-04 12:47:37',NULL,NULL),(25,'Putumayo',1,'fjmora','2015-12-31 23:31:00',NULL,NULL),(26,'Quindío',1,'JuanPolania','2016-03-04 12:49:31',NULL,NULL),(27,'Risaralda',1,'JuanPolania','2016-03-04 12:50:51',NULL,NULL),(28,'San Andrés y Providencia',1,'JuanPolania','2016-03-04 12:52:07',NULL,NULL),(29,'Santander',1,'JuanPolania','2016-03-04 12:52:18',NULL,NULL),(30,'Sucre',1,'fjmora','2016-04-03 12:00:00',NULL,NULL),(31,'Tolima',1,'fjmora','2015-12-31 23:31:00',NULL,NULL),(32,'Valle del Cauca',1,'fjmora','2016-04-03 12:00:00',NULL,NULL),(33,'Vaupés',1,'fjmora','2016-04-03 12:00:00',NULL,NULL),(34,'Vichada',1,'fjmora','2016-04-03 12:00:00',NULL,NULL);
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario`
--

DROP TABLE IF EXISTS `formulario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formulario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `tipo` tinyint(4) NOT NULL COMMENT 'Especifica el tipo de formulario que es \n1 - Formulario Integrado\n2- Url',
  `referencia` text COLLATE utf8_spanish_ci NOT NULL COMMENT 'Especifica la referencia del formulario, es decir que si es un formulario integrado seria la ruta o namespace del view de ese formulario, pero si es URL pues aca iria la URL de la pagina que se quiere abrir',
  `controlador` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `iconCls` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `idCarpeta` int(11) NOT NULL COMMENT 'id de la carpeta donde esta contenido el formulario',
  `estado` tinyint(4) NOT NULL COMMENT '0 - Inactivo\n1 - Activo',
  PRIMARY KEY (`id`),
  KEY `formulario_carpeta_idx` (`idCarpeta`),
  CONSTRAINT `formulario_carpeta` FOREIGN KEY (`idCarpeta`) REFERENCES `carpeta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla de formularios de la aplicacion';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario`
--

LOCK TABLES `formulario` WRITE;
/*!40000 ALTER TABLE `formulario` DISABLE KEYS */;
INSERT INTO `formulario` VALUES (1,'Usuarios',1,'usuarios','Usuarios','x-fa fa-file',1,1),(2,'Roles',1,'roles','Roles','x-fa fa-file',1,1),(3,'Carpetas',1,'carpetas','Carpetas','x-fa fa-file',1,1),(4,'Formularios',1,'formularios','Formularios','x-fa fa-file',1,1),(5,'País',1,'pais','Pais','x-fa fa-file',2,1),(6,'Departamento',1,'departamento','Departamento','x-fa fa-file',2,1),(7,'Ciudad',1,'ciudad','Ciudad','x-fa fa-file',2,1),(8,'Tipo Identificación',1,'tipoIdentificacion','TipoIdentificacion','x-fa fa-file',2,1),(9,'Registro Clientes',1,'registroClientes','RegistroClientes','x-fa fa-file',2,1),(10,'Productos',1,'productos','Productos','x-fa fa-file',4,1),(11,'Consumo',1,'consumo','Consumo','x-fa fa-file',4,1),(12,'Reporte Consumo',1,'reporteConsumo','ReporteConsumo','x-fa fa-file',3,1),(13,'Ventas',1,'ventas','Ventas','x-fa fa-file',4,1),(14,'Facturas',1,'facturas','Facturas','x-fa fa-file',3,1);
/*!40000 ALTER TABLE `formulario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario_accion`
--

DROP TABLE IF EXISTS `formulario_accion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formulario_accion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idFormulario` int(11) NOT NULL,
  `idAccion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `formularioaccion_formulario_idx` (`idFormulario`),
  KEY `formularioaccion_accion_idx` (`idAccion`),
  CONSTRAINT `formularioaccion_accion` FOREIGN KEY (`idAccion`) REFERENCES `accion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `formularioaccion_formulario` FOREIGN KEY (`idFormulario`) REFERENCES `formulario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla donde se guarda el formulario que accciones puede ejecutar';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario_accion`
--

LOCK TABLES `formulario_accion` WRITE;
/*!40000 ALTER TABLE `formulario_accion` DISABLE KEYS */;
INSERT INTO `formulario_accion` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,2,1),(10,2,2),(11,2,3),(12,2,4),(13,2,5),(14,2,6),(15,2,7),(16,2,8),(17,3,1),(18,3,2),(19,3,3),(20,3,4),(21,3,5),(22,3,6),(23,3,7),(24,3,8),(25,4,1),(26,4,2),(27,4,3),(28,4,4),(29,4,5),(30,4,6),(31,4,7),(32,4,8),(33,5,1),(34,5,2),(35,5,3),(36,5,4),(37,5,5),(38,5,6),(39,5,7),(40,5,8),(41,6,1),(42,6,2),(43,6,3),(44,6,4),(45,6,5),(46,6,6),(47,6,7),(48,6,8),(49,7,1),(50,7,2),(51,7,3),(52,7,4),(53,7,5),(54,7,6),(55,7,7),(56,7,8),(57,8,1),(58,8,2),(59,8,3),(60,8,4),(61,8,5),(62,8,6),(63,8,7),(64,8,8),(65,9,1),(66,9,2),(67,9,3),(68,9,4),(69,9,5),(70,9,6),(71,9,7),(72,9,8),(73,10,1),(74,10,2),(75,10,3),(76,10,4),(77,10,5),(78,10,6),(79,10,7),(80,10,8),(81,11,1),(82,11,2),(83,11,3),(84,11,4),(85,11,5),(86,11,6),(87,11,7),(88,11,8),(89,12,1),(90,12,2),(91,12,3),(92,12,4),(93,12,5),(94,12,6),(95,12,7),(96,12,8),(97,13,1),(98,13,2),(99,13,3),(100,13,4),(101,13,5),(102,13,6),(103,13,7),(104,13,8),(105,14,1),(106,14,2),(107,14,3),(108,14,4),(109,14,5),(110,14,6),(111,14,7),(112,14,8);
/*!40000 ALTER TABLE `formulario_accion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Postobon'),(2,'Coca Cola'),(3,'Nacional de Chocolates'),(4,'Colombina'),(5,'Nestle'),(6,'Condor');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `usuarioCreacion` varchar(20) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `usuarioModificacion` varchar(20) DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Pais_Nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'Colombia','fjmora','2015-12-29 00:00:00',NULL,NULL),(2,'Argentina','fjmora','2015-12-29 00:00:00','fjmora','2015-12-30 09:10:47'),(3,'Brasil Test','fjmora','2015-12-29 00:00:00','fjmora','2016-02-10 02:50:44'),(4,'Perú','fjmora','2015-12-29 00:00:00',NULL,NULL),(5,'Ecuador','AdmCsm','2015-12-30 08:52:32','AdmCsm','2015-12-31 06:32:32');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `idMarca` int(11) NOT NULL,
  `precio` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_producto_marca_idx` (`idMarca`),
  CONSTRAINT `fk_producto_marca` FOREIGN KEY (`idMarca`) REFERENCES `marcas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Cola Condor 1.5L',6,2500),(2,'Coca Cola 1.5 L',2,3000),(3,'Coca Cola 3L',2,5500),(4,'Test Producto',1,3500);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roll`
--

DROP TABLE IF EXISTS `roll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `estado` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla de roles';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roll`
--

LOCK TABLES `roll` WRITE;
/*!40000 ALTER TABLE `roll` DISABLE KEYS */;
INSERT INTO `roll` VALUES (1,'R01','Administrador',1),(3,'R02','Cliente',1);
/*!40000 ALTER TABLE `roll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roll_formulario_accion`
--

DROP TABLE IF EXISTS `roll_formulario_accion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roll_formulario_accion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idRoll` int(11) NOT NULL,
  `idFormularioAccion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rollFormularioAccion_roll_idx` (`idRoll`),
  KEY `rollFormularioAccion_FormularioAccion_idx` (`idFormularioAccion`),
  CONSTRAINT `rollFormularioAccion_FormularioAccion` FOREIGN KEY (`idFormularioAccion`) REFERENCES `formulario_accion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rollFormularioAccion_roll` FOREIGN KEY (`idRoll`) REFERENCES `roll` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla donde se especifica el roll que acciones de que formulaio puede ejecutar';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roll_formulario_accion`
--

LOCK TABLES `roll_formulario_accion` WRITE;
/*!40000 ALTER TABLE `roll_formulario_accion` DISABLE KEYS */;
INSERT INTO `roll_formulario_accion` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),(17,1,17),(18,1,18),(19,1,19),(20,1,20),(21,1,21),(22,1,22),(23,1,23),(24,1,24),(25,1,25),(26,1,26),(27,1,27),(28,1,28),(29,1,29),(30,1,30),(31,1,31),(32,1,32),(33,1,33),(34,1,34),(35,1,35),(36,1,36),(37,1,37),(38,1,38),(39,1,39),(40,1,40),(41,1,41),(42,1,42),(43,1,43),(44,1,44),(45,1,45),(46,1,46),(47,1,47),(48,1,48),(49,1,49),(50,1,50),(51,1,51),(52,1,52),(53,1,53),(54,1,54),(55,1,55),(56,1,56),(57,1,57),(58,1,58),(59,1,59),(60,1,60),(61,1,61),(62,1,62),(63,1,63),(64,1,64),(65,1,65),(66,1,66),(67,1,67),(68,1,68),(69,1,69),(70,1,70),(71,1,71),(72,1,72),(73,1,73),(74,1,74),(75,1,75),(76,1,76),(77,1,77),(78,1,78),(79,1,79),(80,1,80),(81,3,81),(82,3,82),(83,3,83),(84,3,84),(85,3,85),(86,3,86),(87,3,87),(88,3,88),(89,3,73),(90,3,74),(91,3,75),(92,3,76),(93,3,77),(94,3,78),(95,3,79),(96,3,80),(97,1,89),(98,1,90),(99,1,91),(100,1,92),(101,1,93),(102,1,94),(103,1,95),(104,1,96),(105,1,97),(106,1,98),(107,1,99),(108,1,100),(109,1,101),(110,1,102),(111,1,103),(112,1,104),(113,1,105),(114,1,106),(115,1,107),(116,1,108),(117,1,109),(118,1,110),(119,1,111),(120,1,112);
/*!40000 ALTER TABLE `roll_formulario_accion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tercero`
--

DROP TABLE IF EXISTS `tercero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tercero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idTipoIdentificacion` int(11) NOT NULL,
  `identificacion` varchar(40) NOT NULL,
  `nombres` varchar(150) NOT NULL,
  `apellidos` varchar(150) DEFAULT NULL,
  `nombreCompleto` varchar(300) NOT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL COMMENT '0 - Inactivo\n1 - Activo',
  `usuarioCreacion` varchar(20) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `usuarioModificacion` varchar(20) DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identificacion_UNIQUE` (`identificacion`),
  KEY `_idx` (`idTipoIdentificacion`),
  CONSTRAINT `tercero_tipoidentificacion` FOREIGN KEY (`idTipoIdentificacion`) REFERENCES `tipo_identificacion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 COMMENT='Tabla de vendedores';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tercero`
--

LOCK TABLES `tercero` WRITE;
/*!40000 ALTER TABLE `tercero` DISABLE KEYS */;
INSERT INTO `tercero` VALUES (1,1,'1079180619','Faiber Julian','Mora Dussan','Faiber Julian Mora Dussan','1993-02-03','Carrera 27 # 20-38','3124944958','faiberjulianmora@gmail.com',1,'fjmora','2015-12-31 00:00:00','fjmora','2016-02-20 23:48:10'),(2,1,'1079179690','Andres','Mora','Andres Mora','1991-02-03','Carrera 27 # 20-38','3124944958','anjamo2908@hotmail.com',1,'fjmora','2015-12-31 00:00:00',NULL,NULL),(19,1,'83087479','Armando','Paredes','Armando Paredes','0000-00-00','Calle falsa 123','3124322312','arpa@hackathon.com',1,'fjmora','2016-09-01 10:51:32',NULL,NULL),(20,1,'102030','Ejemplo 1','Apellido 1','Ejemplo 1 Apellido 1','0000-00-00','ASDD','1231323','ejemplo@hackathon.com',1,'fjmora','2016-09-01 17:15:25',NULL,NULL),(21,1,'321','test','test 1','test test 1','0000-00-00','321','6543','asd@asasa.com',1,'fjmora','2016-09-01 17:28:24',NULL,NULL);
/*!40000 ALTER TABLE `tercero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_identificacion`
--

DROP TABLE IF EXISTS `tipo_identificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_identificacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `acronimo` varchar(5) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `estado` tinyint(1) NOT NULL COMMENT '1 - Activo\n0 - Inactivo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `acronimo_UNIQUE` (`acronimo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='Tabla de tipo de Identificacion';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_identificacion`
--

LOCK TABLES `tipo_identificacion` WRITE;
/*!40000 ALTER TABLE `tipo_identificacion` DISABLE KEYS */;
INSERT INTO `tipo_identificacion` VALUES (1,'CC','Cédula de Ciudadania',1),(2,'TI','Tarjeta de Identidad',1);
/*!40000 ALTER TABLE `tipo_identificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `clave` text COLLATE utf8_spanish_ci NOT NULL,
  `idTercero` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL COMMENT '1--> Activo\n0--> Desactivado',
  `bloqueado` tinyint(4) NOT NULL,
  `intentosFallidos` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  KEY `usuario_tercero_idx` (`idTercero`),
  CONSTRAINT `usuario_tercero` FOREIGN KEY (`idTercero`) REFERENCES `tercero` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla de usuarios';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'fjmora','40bd001563085fc35165329ea1ff5c5ecbdbbeef',1,1,0,0),(2,'cliente','40bd001563085fc35165329ea1ff5c5ecbdbbeef',2,1,0,0),(5,'83087479','40bd001563085fc35165329ea1ff5c5ecbdbbeef',19,1,0,0),(6,'102030','40bd001563085fc35165329ea1ff5c5ecbdbbeef',20,1,0,0),(7,'321','40bd001563085fc35165329ea1ff5c5ecbdbbeef',21,1,0,0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_roll`
--

DROP TABLE IF EXISTS `usuario_roll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_roll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idRoll` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioroll_usuario_idx` (`idUsuario`),
  KEY `usuarioroll_roll_idx` (`idRoll`),
  CONSTRAINT `usuarioroll_roll` FOREIGN KEY (`idRoll`) REFERENCES `roll` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `usuarioroll_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='tabla donde se especifica que roles tiene el usuario';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_roll`
--

LOCK TABLES `usuario_roll` WRITE;
/*!40000 ALTER TABLE `usuario_roll` DISABLE KEYS */;
INSERT INTO `usuario_roll` VALUES (1,1,1),(2,2,3),(4,5,3),(5,6,3),(6,7,3);
/*!40000 ALTER TABLE `usuario_roll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hackathon'
--

--
-- Dumping routines for database 'hackathon'
--
/*!50003 DROP PROCEDURE IF EXISTS `carpetasPermisoUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `carpetasPermisoUsuario`(idUsuario int)
BEGIN
	drop table if exists carpetasTmp;
	CREATE TABLE carpetasTmp (id int, `text` varchar(45), idCarpeta int, iconCls varchar(100)) ENGINE = MEMORY;
    #Inserto las carpetas que tengan los formularios
    insert into carpetasTmp
    select distinct c.id, c.nombre, c.idCarpeta, c.iconCls from usuario_roll ur
	inner join roll_formulario_accion AS rfa ON ur.idRoll = rfa.idRoll 
	inner join roll AS r ON rfa.idRoll = r.id
	inner join formulario_accion AS fa ON rfa.idFormularioAccion = fa.id
	inner join formulario AS f ON fa.idFormulario = f.id
	inner join carpeta c on c.id = f.idCarpeta 
	where c.estado = 1 and ur.idUsuario = idUsuario AND r.estado = 1 AND f.estado = 1
	order by c.idCarpeta, c.nombre;
    SET @@max_sp_recursion_depth = 254 ;
	call consultarCarpetaRecursivo();

    select id, `text`, coalesce(idCarpeta,'') as idCarpeta, iconCls from carpetasTmp order by idCarpeta, `text`;
    drop table if exists carpetasTmp;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `consultarCarpetaRecursivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarCarpetaRecursivo`()
BEGIN
	
    insert into carpetasTmp
    select id, nombre, idCarpeta, iconCls
    from carpeta where id in 
		(select tmp1.idCarpeta from carpetasTmp as tmp1 where tmp1.idCarpeta is not null and tmp1.idCarpeta not in 
			(select id from carpetasTmp as tmp2));
    if (select count(*) from carpetasTmp where idCarpeta not in (select id from carpetasTmp)) > 0 then
		call consultarCarpetaRecursivo();
    end if;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-04  6:09:36
