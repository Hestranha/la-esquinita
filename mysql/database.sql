-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: bk2vflwvqhuuf3gxsgxy-mysql.services.clever-cloud.com    Database: bk2vflwvqhuuf3gxsgxy
-- ------------------------------------------------------
-- Server version	8.0.22-13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'a05a675a-1414-11e9-9c82-cecd01b08c7e:1-491550428,
a38a16d0-767a-11eb-abe2-cecd029e558e:1-457390878';

--
-- Table structure for table `acceso`
--

DROP TABLE IF EXISTS `acceso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acceso` (
  `id_acceso` int NOT NULL AUTO_INCREMENT,
  `id_cargo` int NOT NULL,
  `id_privilegio` int NOT NULL,
  `estado_cargo` tinyint NOT NULL,
  PRIMARY KEY (`id_acceso`),
  KEY `fk_acceso_cargo1_idx` (`id_cargo`),
  KEY `fk_acceso_privilegios1_idx` (`id_privilegio`),
  CONSTRAINT `fk_acceso_cargo1` FOREIGN KEY (`id_cargo`) REFERENCES `cargo` (`id_cargo`),
  CONSTRAINT `fk_acceso_privilegios1` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegios` (`id_privilegio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acceso`
--

LOCK TABLES `acceso` WRITE;
/*!40000 ALTER TABLE `acceso` DISABLE KEYS */;
/*!40000 ALTER TABLE `acceso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alerta_stock`
--

DROP TABLE IF EXISTS `alerta_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alerta_stock` (
  `id_alerta_stock` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `mensaje` text NOT NULL,
  `estado_stock` tinyint NOT NULL,
  PRIMARY KEY (`id_alerta_stock`),
  KEY `fk_alerta_stock_producto1_idx` (`id_producto`),
  CONSTRAINT `fk_alerta_stock_producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alerta_stock`
--

LOCK TABLES `alerta_stock` WRITE;
/*!40000 ALTER TABLE `alerta_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `alerta_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boleta`
--

DROP TABLE IF EXISTS `boleta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boleta` (
  `numero_boleta` varchar(10) NOT NULL,
  `DNI_empleado` varchar(8) NOT NULL,
  `id_cliente` int NOT NULL,
  `id_metodo_pago` int NOT NULL,
  `metodo_entrega` enum('En Tienda','Envío') NOT NULL DEFAULT 'En Tienda',
  `fecha_boleta` datetime NOT NULL,
  `total_boleta` varchar(45) NOT NULL,
  PRIMARY KEY (`numero_boleta`),
  KEY `fk_boleta_cliente1_idx` (`id_cliente`),
  KEY `fk_boleta_empleado1_idx` (`DNI_empleado`),
  KEY `fk_boleta_metodo_pago1_idx` (`id_metodo_pago`),
  CONSTRAINT `fk_boleta_cliente1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `fk_boleta_empleado1` FOREIGN KEY (`DNI_empleado`) REFERENCES `empleado` (`DNI_empleado`),
  CONSTRAINT `fk_boleta_metodo_pago1` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodo_pago` (`id_metodo_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleta`
--

LOCK TABLES `boleta` WRITE;
/*!40000 ALTER TABLE `boleta` DISABLE KEYS */;
INSERT INTO `boleta` VALUES ('000010','01234567',10,5,'En Tienda','2023-10-01 19:00:00','1000.00'),('0000101','01234567',39,1,'En Tienda','2024-07-22 13:52:31','72.25'),('00001011','01234567',40,1,'En Tienda','2024-07-22 13:59:37','72.25'),('1012','01234567',41,1,'En Tienda','2024-07-22 14:02:45','72.25'),('BOL0003','01234567',42,1,'En Tienda','2024-07-22 14:08:32','72.25'),('BOL0004','01234567',43,1,'En Tienda','2024-07-22 14:13:44','72.25'),('BOL0005','01234567',44,1,'En Tienda','2024-07-22 14:15:22','72.25'),('BOL0006','01234567',45,1,'En Tienda','2024-07-22 14:16:52','34.49'),('BOL0007','01234567',46,6,'En Tienda','2024-07-22 14:17:27','34.49'),('BOL0008','01234567',47,1,'Envío','2024-07-22 14:17:46','34.49'),('BOL0009','01234567',48,1,'En Tienda','2024-07-22 14:33:42','39.98'),('BOL001','12345678',1,1,'En Tienda','2023-01-01 10:00:00','100.00'),('BOL0010','01234567',49,1,'En Tienda','2024-07-22 14:37:51','1.25'),('BOL002','23456789',2,2,'En Tienda','2023-02-01 11:00:00','200.00'),('BOL003','34567890',3,3,'En Tienda','2023-03-01 12:00:00','300.00'),('BOL004','45678901',4,4,'En Tienda','2023-04-01 13:00:00','400.00'),('BOL005','56789012',5,5,'En Tienda','2023-05-01 14:00:00','500.00'),('BOL006','67890123',6,1,'En Tienda','2023-06-01 15:00:00','600.00'),('BOL007','78901234',7,2,'En Tienda','2023-07-01 16:00:00','700.00'),('BOL008','89012345',8,3,'En Tienda','2023-08-01 17:00:00','800.00'),('BOL009','90123456',9,4,'En Tienda','2023-09-01 18:00:00','900.00');
/*!40000 ALTER TABLE `boleta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargo` (
  `id_cargo` int NOT NULL AUTO_INCREMENT,
  `nombre_cargo` varchar(70) NOT NULL,
  `descripcion_cargo` text,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
INSERT INTO `cargo` VALUES (1,'Cargo 1','Descripción del Cargo 1'),(2,'Cargo 2','Descripción del Cargo 2'),(3,'Cargo 3','Descripción del Cargo 3'),(4,'Cargo 4','Descripción del Cargo 4'),(5,'Cargo 5','Descripción del Cargo 5');
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(45) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Categoría 1'),(2,'Categoría 2'),(3,'Categoría 3'),(4,'Categoría 4'),(5,'Categoría 5'),(6,'Categoría 6'),(7,'Categoría 7'),(8,'Categoría 8'),(9,'Categoría 9'),(10,'Categoría 10'),(11,'Categoría 11'),(12,'Categoría 12'),(13,'Categoría 13'),(14,'Categoría 14'),(15,'Categoría 15'),(16,'Categoría 16'),(17,'Categoría 17'),(18,'Categoría 18'),(19,'Categoría 19'),(20,'Categoría 20'),(21,'Categoría 21'),(22,'Categoría 22'),(23,'Categoría 23'),(24,'Categoría 24'),(25,'Categoría 25'),(26,'Categoría 26'),(27,'Categoría 27'),(28,'Categoría 28'),(29,'Categoría 29'),(30,'Categoría 30'),(31,'Categoría 1'),(32,'Categoría 2'),(33,'Categoría 3'),(34,'Categoría 4'),(35,'Categoría 5'),(36,'Categoría 6'),(37,'Categoría 7'),(38,'Categoría 8'),(39,'Categoría 9'),(40,'Categoría 10'),(41,'Categoría 11'),(42,'Categoría 12'),(43,'Categoría 13'),(44,'Categoría 14'),(45,'Categoría 15'),(46,'Categoría 16'),(47,'Categoría 17'),(48,'Categoría 18'),(49,'Categoría 19'),(50,'Categoría 20'),(51,'Categoría 21'),(52,'Categoría 22'),(53,'Categoría 23'),(54,'Categoría 24'),(55,'Categoría 25'),(56,'Categoría 26'),(57,'Categoría 27'),(58,'Categoría 28'),(59,'Categoría 29'),(60,'Categoría 30');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(80) NOT NULL,
  `celular_cliente` varchar(15) DEFAULT NULL,
  `direccion_cliente` varchar(100) DEFAULT NULL,
  `fecha_registro_cliente` date NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Cliente 1','912345678','Dirección Cliente 1','2023-01-01'),(2,'Cliente 2','923456789','Dirección Cliente 2','2023-02-01'),(3,'Cliente 3','934567890','Dirección Cliente 3','2023-03-01'),(4,'Cliente 4','945678901','Dirección Cliente 4','2023-04-01'),(5,'Cliente 5','956789012','Dirección Cliente 5','2023-05-01'),(6,'Cliente 6','967890123','Dirección Cliente 6','2023-06-01'),(7,'Cliente 7','978901234','Dirección Cliente 7','2023-07-01'),(8,'Cliente 8','989012345','Dirección Cliente 8','2023-08-01'),(9,'Cliente 9','990123456','Dirección Cliente 9','2023-09-01'),(10,'Cliente 10','900234567','Dirección Cliente 10','2023-10-01'),(11,'Cliente 11','911345678','Dirección Cliente 11','2023-11-01'),(12,'Cliente 12','922456789','Dirección Cliente 12','2023-12-01'),(13,'Cliente 13','933567890','Dirección Cliente 13','2024-01-01'),(14,'Cliente 14','944678901','Dirección Cliente 14','2024-02-01'),(15,'Cliente 15','955789012','Dirección Cliente 15','2024-03-01'),(16,'Cliente 16','966890123','Dirección Cliente 16','2024-04-01'),(17,'Cliente 17','977901234','Dirección Cliente 17','2024-05-01'),(18,'Cliente 18','988012345','Dirección Cliente 18','2024-06-01'),(19,'Cliente 19','999123456','Dirección Cliente 19','2024-07-01'),(20,'Cliente 20','900234567','Dirección Cliente 20','2024-08-01'),(21,'Cliente 21','911345678','Dirección Cliente 21','2024-09-01'),(22,'Cliente 22','922456789','Dirección Cliente 22','2024-10-01'),(23,'Cliente 23','933567890','Dirección Cliente 23','2024-11-01'),(24,'Cliente 24','944678901','Dirección Cliente 24','2024-12-01'),(25,'Cliente 25','955789012','Dirección Cliente 25','2025-01-01'),(26,'Cliente 26','966890123','Dirección Cliente 26','2025-02-01'),(27,'Cliente 27','977901234','Dirección Cliente 27','2025-03-01'),(28,'Cliente 28','988012345','Dirección Cliente 28','2025-04-01'),(29,'Cliente 29','999123456','Dirección Cliente 29','2025-05-01'),(30,'Cliente 30','900234567','Dirección Cliente 30','2025-06-01'),(31,'Davis Ccoica','','','2024-07-22'),(32,'Davis Ccoica','','','2024-07-22'),(33,'Cristhian Chavez','','','2024-07-22'),(34,'Federico Castilla','','','2024-07-22'),(35,'Federico Castilla','','','2024-07-22'),(36,'Federico Castilla','','','2024-07-22'),(37,'Federico Castilla','','','2024-07-22'),(38,'Federico Castilla','','','2024-07-22'),(39,'Prueba 1','','','2024-07-22'),(40,'Prueba 1','','','2024-07-22'),(41,'Prueba 1','','','2024-07-22'),(42,'Prueba 1','','','2024-07-22'),(43,'Prueba 1','','','2024-07-22'),(44,'Prueba 1','','','2024-07-22'),(45,'Cliente Anonimo','','','2024-07-22'),(46,'Cliente Anonimo','23123123','','2024-07-22'),(47,'Cliente Anonimo','123213123','asdasd','2024-07-22'),(48,'Mr Beast','','','2024-07-22'),(49,'Manty','','','2024-07-22');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrato`
--

DROP TABLE IF EXISTS `contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contrato` (
  `id_contrato` int NOT NULL AUTO_INCREMENT,
  `DNI_empleado` varchar(8) NOT NULL,
  `fecha_inicio_contrato` date NOT NULL,
  `fecha_fin_contrato` date NOT NULL,
  `salario_contrato` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_contrato`),
  KEY `fk_contrato_empleado1_idx` (`DNI_empleado`),
  CONSTRAINT `fk_contrato_empleado1` FOREIGN KEY (`DNI_empleado`) REFERENCES `empleado` (`DNI_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrato`
--

LOCK TABLES `contrato` WRITE;
/*!40000 ALTER TABLE `contrato` DISABLE KEYS */;
INSERT INTO `contrato` VALUES (1,'12345678','2023-01-01','2023-12-31',1000.00),(2,'23456789','2023-02-01','2023-12-31',1200.00),(3,'34567890','2023-03-01','2023-12-31',1100.00),(4,'45678901','2023-04-01','2023-12-31',1300.00),(5,'56789012','2023-05-01','2023-12-31',1250.00),(6,'67890123','2023-06-01','2023-12-31',1150.00),(7,'78901234','2023-07-01','2023-12-31',1400.00),(8,'89012345','2023-08-01','2023-12-31',1350.00),(9,'90123456','2023-09-01','2023-12-31',1450.00),(10,'01234567','2023-10-01','2023-12-31',1500.00);
/*!40000 ALTER TABLE `contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_boleta`
--

DROP TABLE IF EXISTS `detalle_boleta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_boleta` (
  `numero_boleta` varchar(10) NOT NULL,
  `id_producto` int NOT NULL,
  `precio_venta` decimal(5,2) NOT NULL,
  `cantidad_venta` int NOT NULL,
  KEY `fk_boleta_has_producto_producto1_idx` (`id_producto`),
  KEY `fk_boleta_has_producto_boleta1_idx` (`numero_boleta`),
  CONSTRAINT `fk_boleta_has_producto_boleta1` FOREIGN KEY (`numero_boleta`) REFERENCES `boleta` (`numero_boleta`),
  CONSTRAINT `fk_boleta_has_producto_producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_boleta`
--

LOCK TABLES `detalle_boleta` WRITE;
/*!40000 ALTER TABLE `detalle_boleta` DISABLE KEYS */;
INSERT INTO `detalle_boleta` VALUES ('000010',10,100.00,10),('0000101',3,20.75,62),('00001011',3,20.75,62),('1012',3,20.75,62),('BOL0003',3,20.75,62),('BOL0004',3,20.75,62),('BOL001',1,100.00,1),('BOL002',2,100.00,2),('BOL003',3,100.00,3),('BOL004',4,100.00,4),('BOL005',5,100.00,5),('BOL006',6,100.00,6),('BOL007',7,100.00,7),('BOL008',8,100.00,8),('BOL009',9,100.00,9),('BOL0005',3,20.75,62),('BOL0005',1,10.00,10),('BOL0006',4,8.99,9),('BOL0006',2,15.50,16),('BOL0006',1,10.00,10),('BOL0007',4,8.99,9),('BOL0007',2,15.50,16),('BOL0007',1,10.00,10),('BOL0008',4,8.99,9),('BOL0008',2,15.50,16),('BOL0008',1,10.00,10),('BOL0009',80,19.99,40),('BOL0010',73,1.25,1);
/*!40000 ALTER TABLE `detalle_boleta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_factura`
--

DROP TABLE IF EXISTS `detalle_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_factura` (
  `numero_factura` varchar(15) NOT NULL,
  `id_producto` int NOT NULL,
  `precio_compra` decimal(5,2) NOT NULL,
  `cantidad_compra` int NOT NULL,
  PRIMARY KEY (`numero_factura`),
  KEY `fk_Proveedor_has_Producto_Producto1_idx` (`id_producto`),
  KEY `fk_compra_factura1_idx` (`numero_factura`),
  CONSTRAINT `fk_compra_factura1` FOREIGN KEY (`numero_factura`) REFERENCES `factura` (`numero_factura`),
  CONSTRAINT `fk_Proveedor_has_Producto_Producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_factura`
--

LOCK TABLES `detalle_factura` WRITE;
/*!40000 ALTER TABLE `detalle_factura` DISABLE KEYS */;
INSERT INTO `detalle_factura` VALUES ('FAC001',1,10.00,10),('FAC002',2,13.33,15),('FAC003',3,15.00,20),('FAC004',4,16.00,25),('FAC005',5,16.67,30),('FAC006',6,17.14,35),('FAC007',7,17.50,40),('FAC008',8,17.78,45),('FAC009',9,18.00,50),('FAC010',10,18.18,55);
/*!40000 ALTER TABLE `detalle_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `DNI_empleado` varchar(8) NOT NULL,
  `id_cargo` int NOT NULL,
  `nombre_empleado` varchar(50) NOT NULL,
  `apellido_empleado` varchar(30) NOT NULL,
  `celular_empleado` varchar(15) NOT NULL,
  `direccion_empleado` varchar(100) NOT NULL,
  `sexo` enum('M','F') NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `estado_empleado` enum('Activo','Inactivo') NOT NULL DEFAULT 'Activo',
  `usuario_empleado` varchar(45) NOT NULL,
  `contrasena_empleado` varchar(45) NOT NULL,
  PRIMARY KEY (`DNI_empleado`),
  KEY `fk_empleado_cargo1_idx` (`id_cargo`),
  CONSTRAINT `fk_empleado_cargo1` FOREIGN KEY (`id_cargo`) REFERENCES `cargo` (`id_cargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES ('01234567',5,'Empleado 10','Apellido 10','900234567','Dirección Empleado 10','F','1999-10-01','Activo','usuario10','contrasena10'),('12345678',1,'Empleado 1','Apellido 1','912345678','Dirección Empleado 1','M','1990-01-01','Activo','usuario1','contrasena1'),('23456789',2,'Empleado 2','Apellido 2','923456789','Dirección Empleado 2','F','1991-02-01','Activo','usuario2','contrasena2'),('34567890',3,'Empleado 3','Apellido 3','934567890','Dirección Empleado 3','M','1992-03-01','Activo','usuario3','contrasena3'),('45678901',4,'Empleado 4','Apellido 4','945678901','Dirección Empleado 4','F','1993-04-01','Activo','usuario4','contrasena4'),('56789012',5,'Empleado 5','Apellido 5','956789012','Dirección Empleado 5','M','1994-05-01','Activo','usuario5','contrasena5'),('67890123',1,'Empleado 6','Apellido 6','967890123','Dirección Empleado 6','F','1995-06-01','Activo','usuario6','contrasena6'),('78901234',2,'Empleado 7','Apellido 7','978901234','Dirección Empleado 7','M','1996-07-01','Activo','usuario7','contrasena7'),('89012345',3,'Empleado 8','Apellido 8','989012345','Dirección Empleado 8','F','1997-08-01','Activo','usuario8','contrasena8'),('90123456',4,'Empleado 9','Apellido 9','999123456','Dirección Empleado 9','M','1998-09-01','Activo','usuario9','contrasena9');
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `numero_factura` varchar(15) NOT NULL,
  `id_proveedor` varchar(12) NOT NULL,
  `id_metodo_pago` int NOT NULL,
  `fecha_factura` datetime NOT NULL,
  `total_factura` decimal(10,2) NOT NULL,
  `url_foto_factura` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`numero_factura`),
  KEY `fk_factura_proveedor1_idx` (`id_proveedor`),
  KEY `fk_factura_metodo_pago1_idx` (`id_metodo_pago`),
  CONSTRAINT `fk_factura_metodo_pago1` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodo_pago` (`id_metodo_pago`),
  CONSTRAINT `fk_factura_proveedor1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`RUC_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES ('FAC001','12345678901',1,'2023-01-01 10:00:00',100.00,'url1.jpg'),('FAC002','23456789012',2,'2023-02-01 11:00:00',200.00,'url2.jpg'),('FAC003','34567890123',3,'2023-03-01 12:00:00',300.00,'url3.jpg'),('FAC004','45678901234',4,'2023-04-01 13:00:00',400.00,'url4.jpg'),('FAC005','56789012345',5,'2023-05-01 14:00:00',500.00,'url5.jpg'),('FAC006','67890123456',1,'2023-06-01 15:00:00',600.00,'url6.jpg'),('FAC007','78901234567',2,'2023-07-01 16:00:00',700.00,'url7.jpg'),('FAC008','89012345678',3,'2023-08-01 17:00:00',800.00,'url8.jpg'),('FAC009','90123456789',4,'2023-09-01 18:00:00',900.00,'url9.jpg'),('FAC010','01234567890',5,'2023-10-01 19:00:00',1000.00,'url10.jpg');
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `id_marca` int NOT NULL AUTO_INCREMENT,
  `nombre_marca` varchar(45) NOT NULL,
  PRIMARY KEY (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'Marca 1'),(2,'Marca 2'),(3,'Marca 3'),(4,'Marca 4'),(5,'Marca 5'),(6,'Marca 6'),(7,'Marca 7'),(8,'Marca 8'),(9,'Marca 9'),(10,'Marca 10'),(11,'Marca 11'),(12,'Marca 12'),(13,'Marca 13'),(14,'Marca 14'),(15,'Marca 15'),(16,'Marca 16'),(17,'Marca 17'),(18,'Marca 18'),(19,'Marca 19'),(20,'Marca 20'),(21,'Marca 21'),(22,'Marca 22'),(23,'Marca 23'),(24,'Marca 24'),(25,'Marca 25'),(26,'Marca 26'),(27,'Marca 27'),(28,'Marca 28'),(29,'Marca 29'),(30,'Marca 30'),(31,'Marca 1'),(32,'Marca 2'),(33,'Marca 3'),(34,'Marca 4'),(35,'Marca 5'),(36,'Marca 6'),(37,'Marca 7'),(38,'Marca 8'),(39,'Marca 9'),(40,'Marca 10'),(41,'Marca 11'),(42,'Marca 12'),(43,'Marca 13'),(44,'Marca 14'),(45,'Marca 15'),(46,'Marca 16'),(47,'Marca 17'),(48,'Marca 18'),(49,'Marca 19'),(50,'Marca 20'),(51,'Marca 21'),(52,'Marca 22'),(53,'Marca 23'),(54,'Marca 24'),(55,'Marca 25'),(56,'Marca 26'),(57,'Marca 27'),(58,'Marca 28'),(59,'Marca 29'),(60,'Marca 30');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodo_pago`
--

DROP TABLE IF EXISTS `metodo_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodo_pago` (
  `id_metodo_pago` int NOT NULL AUTO_INCREMENT,
  `nombre_metodo_pago` varchar(30) NOT NULL,
  PRIMARY KEY (`id_metodo_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_pago`
--

LOCK TABLES `metodo_pago` WRITE;
/*!40000 ALTER TABLE `metodo_pago` DISABLE KEYS */;
INSERT INTO `metodo_pago` VALUES (1,'Efectivo'),(2,'Tarjeta de Crédito'),(3,'Tarjeta de Débito'),(4,'Transferencia Bancaria'),(5,'Paypal'),(6,'Yape');
/*!40000 ALTER TABLE `metodo_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilegios`
--

DROP TABLE IF EXISTS `privilegios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilegios` (
  `id_privilegio` int NOT NULL AUTO_INCREMENT,
  `nombre_privilegio` varchar(70) NOT NULL,
  `descripcion_privilegio` text,
  PRIMARY KEY (`id_privilegio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilegios`
--

LOCK TABLES `privilegios` WRITE;
/*!40000 ALTER TABLE `privilegios` DISABLE KEYS */;
/*!40000 ALTER TABLE `privilegios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `id_marca` int NOT NULL,
  `id_categoria` int NOT NULL,
  `id_ubicacion` int NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `precio_unitario` decimal(5,2) NOT NULL,
  `stock_alerta` int NOT NULL DEFAULT '20',
  `stock_disponible` int NOT NULL,
  `estado_producto` enum('Disponible','No Disponible') NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `fk_Producto_Marca1_idx` (`id_marca`),
  KEY `fk_Producto_Categoria1_idx` (`id_categoria`),
  KEY `fk_producto_ubicacion1_idx` (`id_ubicacion`),
  CONSTRAINT `fk_Producto_Categoria1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `fk_Producto_Marca1` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`),
  CONSTRAINT `fk_producto_ubicacion1` FOREIGN KEY (`id_ubicacion`) REFERENCES `ubicacion` (`id_ubicacion`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,1,1,1,'Producto 1',10.00,20,100,'Disponible'),(2,2,2,2,'Producto 2',15.50,20,80,'Disponible'),(3,3,3,3,'Producto 3',20.75,20,60,'No Disponible'),(4,4,4,4,'Producto 4',8.99,20,90,'Disponible'),(5,5,5,5,'Producto 5',12.49,20,50,'Disponible'),(6,6,6,6,'Producto 6',9.99,20,70,'No Disponible'),(7,7,7,7,'Producto 7',7.89,20,110,'Disponible'),(8,8,8,8,'Producto 8',6.79,20,120,'Disponible'),(9,9,9,9,'Producto 9',14.39,20,40,'No Disponible'),(10,10,10,10,'Producto 10',18.29,20,130,'Disponible'),(11,11,11,11,'Producto 11',11.00,20,100,'Disponible'),(12,12,12,12,'Producto 12',16.50,20,80,'Disponible'),(13,13,13,13,'Producto 13',21.75,20,60,'No Disponible'),(14,14,14,14,'Producto 14',9.99,20,90,'Disponible'),(15,15,15,15,'Producto 15',13.49,20,50,'Disponible'),(16,16,16,16,'Producto 16',10.99,20,70,'No Disponible'),(17,17,17,17,'Producto 17',8.89,20,110,'Disponible'),(18,18,18,18,'Producto 18',7.79,20,120,'Disponible'),(19,19,19,19,'Producto 19',15.39,20,40,'No Disponible'),(20,20,20,20,'Producto 20',19.29,20,130,'Disponible'),(21,21,21,21,'Producto 21',12.00,20,100,'Disponible'),(22,22,22,22,'Producto 22',17.50,20,80,'Disponible'),(23,23,23,23,'Producto 23',22.75,20,60,'No Disponible'),(24,24,24,24,'Producto 24',10.99,20,90,'Disponible'),(25,25,25,25,'Producto 25',14.49,20,50,'Disponible'),(26,26,26,26,'Producto 26',11.99,20,70,'No Disponible'),(27,27,27,27,'Producto 27',9.89,20,110,'Disponible'),(28,28,28,28,'Producto 28',8.79,20,120,'Disponible'),(29,29,29,29,'Producto 29',16.39,20,40,'No Disponible'),(30,30,30,30,'Producto 30',20.29,20,130,'Disponible'),(71,1,1,1,'Lápiz HB',1.50,20,100,'Disponible'),(72,2,2,2,'Cuaderno universitario',5.99,20,80,'Disponible'),(73,3,3,3,'Goma de borrar',1.25,20,60,'Disponible'),(74,4,4,4,'Regla de plástico',2.49,20,90,'Disponible'),(75,5,5,5,'Estuche de lápices de colores',8.99,20,50,'Disponible'),(76,6,6,6,'Corrector líquido',3.99,20,70,'Disponible'),(77,7,7,7,'Cinta adhesiva',1.99,20,110,'Disponible'),(78,8,8,8,'Resaltadores',4.29,20,120,'Disponible'),(79,9,9,9,'Sacapuntas',1.99,20,40,'Disponible'),(80,10,10,10,'Calculadora científica',19.99,20,130,'Disponible'),(81,11,11,11,'Tijeras escolares',3.50,20,100,'Disponible'),(82,12,12,12,'Pegamento escolar',2.99,20,80,'Disponible'),(83,13,13,13,'Compás',4.75,20,60,'Disponible'),(84,14,14,14,'Borrador de pizarra blanca',1.99,20,90,'Disponible'),(85,15,15,15,'Agenda escolar',6.49,20,50,'Disponible'),(86,16,16,16,'Lápices de colores',7.99,20,70,'Disponible'),(87,17,17,17,'Cuaderno de dibujo',4.89,20,110,'Disponible'),(88,18,18,18,'Papel bond',3.79,20,120,'Disponible'),(89,19,19,19,'Pizarra blanca',12.39,20,40,'Disponible'),(90,20,20,20,'Marcadores de pizarra blanca',8.29,20,130,'Disponible'),(91,21,21,21,'Compás geométrico',3.00,20,100,'Disponible'),(92,22,22,22,'Lápiz de grafito',0.99,20,80,'Disponible'),(93,23,23,23,'Agenda de planificación semanal',7.75,20,60,'Disponible'),(94,24,24,24,'Pegamento en barra',2.49,20,90,'Disponible'),(95,25,25,25,'Corrector en cinta',3.99,20,50,'Disponible'),(96,26,26,26,'Lápiz adhesivo',1.99,20,70,'Disponible'),(97,27,27,27,'Portaminas',2.89,20,110,'Disponible'),(98,28,28,28,'Bolígrafos de gel',4.79,20,120,'Disponible'),(99,29,29,29,'Carpeta de archivos',3.39,20,40,'Disponible'),(100,30,30,30,'Plumón de pizarra blanca',6.29,20,130,'Disponible'),(101,1,1,1,'Estuche de marcadores',4.50,20,100,'Disponible'),(102,2,2,2,'Libreta de hojas cuadriculadas',3.99,20,80,'Disponible'),(103,3,3,3,'Bolígrafo negro',0.75,20,60,'Disponible'),(104,4,4,4,'Compás de precisión',7.49,20,90,'Disponible'),(105,5,5,5,'Papel milimetrado',2.99,20,50,'Disponible'),(106,6,6,6,'Estuche de marcadores de colores',6.99,20,70,'Disponible'),(107,7,7,7,'Portaminas recargable',4.59,20,110,'Disponible'),(108,8,8,8,'Corrector en barra',2.29,20,120,'Disponible'),(109,9,9,9,'Borrador de pizarrón',1.29,20,40,'Disponible'),(110,10,10,10,'Calculadora básica',9.99,20,130,'Disponible'),(111,11,11,11,'Lápiz 2B',1.75,20,100,'Disponible'),(112,12,12,12,'Cuaderno rayado',4.99,20,80,'Disponible'),(113,13,13,13,'Borrador de formas',1.49,20,60,'Disponible'),(114,14,14,14,'Compás escolar',3.99,20,90,'Disponible'),(115,15,15,15,'Estuche de rotuladores',6.49,20,50,'Disponible'),(116,16,16,16,'Corrector en lápiz',2.29,20,70,'Disponible'),(117,17,17,17,'Cinta de doble cara',2.99,20,110,'Disponible'),(118,18,18,18,'Marcadores fluorescentes',5.99,20,120,'Disponible'),(119,19,19,19,'Sacapuntas con depósito',1.79,20,40,'Disponible'),(120,20,20,20,'Calculadora básica',9.99,20,130,'Disponible'),(121,21,21,21,'Tijeras de precisión',4.50,20,100,'Disponible'),(122,22,22,22,'Pegamento en barra lavable',3.99,20,80,'Disponible'),(123,23,23,23,'Set de geometría',8.75,20,60,'Disponible'),(124,24,24,24,'Borrador de tiza',1.49,20,90,'Disponible'),(125,25,25,25,'Agenda de organización mensual',7.99,20,50,'Disponible'),(126,26,26,26,'Lápices de grafito HB',2.99,20,70,'Disponible'),(127,27,27,27,'Cuaderno de espiral',5.89,20,110,'Disponible'),(128,28,28,28,'Papel milimetrado A3',4.79,20,120,'Disponible'),(129,29,29,29,'Pizarra verde',14.39,20,40,'Disponible'),(130,30,30,30,'Borradores de pizarra',2.99,20,130,'Disponible'),(131,1,1,1,'Estuche de bolígrafos',7.50,20,100,'Disponible'),(132,2,2,2,'Libreta de hojas blancas',2.99,20,80,'Disponible'),(133,3,3,3,'Bolígrafo azul',0.75,20,60,'Disponible'),(134,4,4,4,'Compás de precisión avanzado',8.49,20,90,'Disponible'),(135,5,5,5,'Papel vegetal',3.49,20,50,'Disponible'),(136,6,6,6,'Estuche de marcadores metálicos',9.99,20,70,'Disponible'),(137,7,7,7,'Portaminas de dibujo',5.59,20,110,'Disponible'),(138,8,8,8,'Corrector líquido de precisión',3.29,20,120,'Disponible'),(139,9,9,9,'Borrador de pizarra magnética',2.49,20,40,'Disponible'),(140,10,10,10,'Calculadora científica avanzada',29.99,20,130,'Disponible'),(141,1,1,1,'Producto 1',10.00,20,100,'Disponible'),(142,2,2,2,'Producto 2',15.50,20,80,'Disponible'),(143,3,3,3,'Producto 3',20.75,20,60,'No Disponible'),(144,4,4,4,'Producto 4',8.99,20,90,'Disponible'),(145,5,5,5,'Producto 5',12.49,20,50,'Disponible'),(146,6,6,6,'Producto 6',9.99,20,70,'No Disponible'),(147,7,7,7,'Producto 7',7.89,20,110,'Disponible'),(148,8,8,8,'Producto 8',6.79,20,120,'Disponible'),(149,9,9,9,'Producto 9',14.39,20,40,'No Disponible'),(150,10,10,10,'Producto 10',18.29,20,130,'Disponible'),(151,11,11,11,'Producto 11',11.00,20,100,'Disponible'),(152,12,12,12,'Producto 12',16.50,20,80,'Disponible'),(153,13,13,13,'Producto 13',21.75,20,60,'No Disponible'),(154,14,14,14,'Producto 14',9.99,20,90,'Disponible'),(155,15,15,15,'Producto 15',13.49,20,50,'Disponible'),(156,16,16,16,'Producto 16',10.99,20,70,'No Disponible'),(157,17,17,17,'Producto 17',8.89,20,110,'Disponible'),(158,18,18,18,'Producto 18',7.79,20,120,'Disponible'),(159,19,19,19,'Producto 19',15.39,20,40,'No Disponible'),(160,20,20,20,'Producto 20',19.29,20,130,'Disponible'),(161,21,21,21,'Producto 21',12.00,20,100,'Disponible'),(162,22,22,22,'Producto 22',17.50,20,80,'Disponible'),(163,23,23,23,'Producto 23',22.75,20,60,'No Disponible'),(164,24,24,24,'Producto 24',10.99,20,90,'Disponible'),(165,25,25,25,'Producto 25',14.49,20,50,'Disponible'),(166,26,26,26,'Producto 26',11.99,20,70,'No Disponible'),(167,27,27,27,'Producto 27',9.89,20,110,'Disponible'),(168,28,28,28,'Producto 28',8.79,20,120,'Disponible'),(169,29,29,29,'Producto 29',16.39,20,40,'No Disponible'),(170,30,30,30,'Producto 30',20.29,20,130,'Disponible');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `RUC_proveedor` varchar(12) NOT NULL,
  `nombre_proveedor` varchar(70) NOT NULL,
  `celular_proveedor` varchar(15) NOT NULL,
  `direccion_proveedor` varchar(100) NOT NULL,
  PRIMARY KEY (`RUC_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES ('01234567890','Proveedor 10','098765432','Dirección 10'),('12345678901','Proveedor 1','987654321','Dirección 1'),('23456789012','Proveedor 2','876543210','Dirección 2'),('34567890123','Proveedor 3','765432109','Dirección 3'),('45678901234','Proveedor 4','654321098','Dirección 4'),('56789012345','Proveedor 5','543210987','Dirección 5'),('67890123456','Proveedor 6','432109876','Dirección 6'),('78901234567','Proveedor 7','321098765','Dirección 7'),('89012345678','Proveedor 8','210987654','Dirección 8'),('90123456789','Proveedor 9','109876543','Dirección 9');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubicacion` (
  `id_ubicacion` int NOT NULL AUTO_INCREMENT,
  `nombre_ubicacion` varchar(20) NOT NULL,
  PRIMARY KEY (`id_ubicacion`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES (1,'Ubicación 1'),(2,'Ubicación 2'),(3,'Ubicación 3'),(4,'Ubicación 4'),(5,'Ubicación 5'),(6,'Ubicación 6'),(7,'Ubicación 7'),(8,'Ubicación 8'),(9,'Ubicación 9'),(10,'Ubicación 10'),(11,'Ubicación 11'),(12,'Ubicación 12'),(13,'Ubicación 13'),(14,'Ubicación 14'),(15,'Ubicación 15'),(16,'Ubicación 16'),(17,'Ubicación 17'),(18,'Ubicación 18'),(19,'Ubicación 19'),(20,'Ubicación 20'),(21,'Ubicación 21'),(22,'Ubicación 22'),(23,'Ubicación 23'),(24,'Ubicación 24'),(25,'Ubicación 25'),(26,'Ubicación 26'),(27,'Ubicación 27'),(28,'Ubicación 28'),(29,'Ubicación 29'),(30,'Ubicación 30'),(31,'Ubicación 1'),(32,'Ubicación 2'),(33,'Ubicación 3'),(34,'Ubicación 4'),(35,'Ubicación 5'),(36,'Ubicación 6'),(37,'Ubicación 7'),(38,'Ubicación 8'),(39,'Ubicación 9'),(40,'Ubicación 10'),(41,'Ubicación 11'),(42,'Ubicación 12'),(43,'Ubicación 13'),(44,'Ubicación 14'),(45,'Ubicación 15'),(46,'Ubicación 16'),(47,'Ubicación 17'),(48,'Ubicación 18'),(49,'Ubicación 19'),(50,'Ubicación 20'),(51,'Ubicación 21'),(52,'Ubicación 22'),(53,'Ubicación 23'),(54,'Ubicación 24'),(55,'Ubicación 25'),(56,'Ubicación 26'),(57,'Ubicación 27'),(58,'Ubicación 28'),(59,'Ubicación 29'),(60,'Ubicación 30');
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-22 18:57:36
