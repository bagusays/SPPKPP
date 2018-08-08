-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: sppk_pp_saw_fix
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pp_customers`
--

DROP TABLE IF EXISTS `pp_customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pp_customers` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerName` varchar(50) NOT NULL,
  `PhoneNumber` varchar(15) NOT NULL,
  `Address` varchar(90) NOT NULL DEFAULT '-',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pp_customers`
--

LOCK TABLES `pp_customers` WRITE;
/*!40000 ALTER TABLE `pp_customers` DISABLE KEYS */;
INSERT INTO `pp_customers` VALUES (1,'Aris','083867298564','Jl. Kp. Melayu'),(2,'Joko','083864522333','Jl. Tebet 2 no. 2'),(3,'Anwar','081254964551','Jl. Dewi Sartika'),(4,'Rudi','081246125491','Pondok labu 2'),(8,'Adi','083867298564','Dewata');
/*!40000 ALTER TABLE `pp_customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pp_datacontent`
--

DROP TABLE IF EXISTS `pp_datacontent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pp_datacontent` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdOrder` int(11) NOT NULL,
  `IdMasterCriteria` int(11) NOT NULL,
  `IdSubCriteria` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `DataContent_IdMasterCriteria_idx` (`IdMasterCriteria`),
  KEY `DataContent_IdSubCriteria_idx` (`IdSubCriteria`),
  KEY `DataContent_IdDataPemesan_idx` (`IdOrder`),
  CONSTRAINT `DataContent_IdDataPemesan` FOREIGN KEY (`IdOrder`) REFERENCES `pp_orders` (`id`),
  CONSTRAINT `DataContent_IdMasterCriteria` FOREIGN KEY (`IdMasterCriteria`) REFERENCES `pp_mastercriteria` (`id`),
  CONSTRAINT `DataContent_IdSubCriteria` FOREIGN KEY (`IdSubCriteria`) REFERENCES `pp_subcriteria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pp_datacontent`
--

LOCK TABLES `pp_datacontent` WRITE;
/*!40000 ALTER TABLE `pp_datacontent` DISABLE KEYS */;
INSERT INTO `pp_datacontent` VALUES (11,2,1,1),(12,2,1,2),(13,2,2,8),(14,2,3,11),(15,2,4,14),(17,2,6,45),(18,2,7,49),(21,3,2,8),(22,3,3,11),(23,3,4,14),(25,3,6,45),(26,3,7,49),(27,4,1,1),(29,4,2,8),(30,4,3,11),(31,4,4,14),(33,4,6,45),(34,4,7,51),(38,3,1,5),(39,3,1,6),(40,3,1,4),(41,3,1,3),(42,3,1,2),(77,3,1,1),(78,13,1,1),(80,13,2,63),(81,13,3,64),(82,13,4,65),(83,13,6,45),(84,13,7,48),(86,13,1,5);
/*!40000 ALTER TABLE `pp_datacontent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pp_deadlinecriteria`
--

DROP TABLE IF EXISTS `pp_deadlinecriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pp_deadlinecriteria` (
  `Id` int(11) NOT NULL,
  `IdMasterCriteria` int(11) NOT NULL,
  `CriteriaName` varchar(20) NOT NULL,
  `CriteriaValue` double(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pp_deadlinecriteria`
--

LOCK TABLES `pp_deadlinecriteria` WRITE;
/*!40000 ALTER TABLE `pp_deadlinecriteria` DISABLE KEYS */;
INSERT INTO `pp_deadlinecriteria` VALUES (3,5,'3',1.00),(4,5,'4',0.75),(5,5,'5',0.75),(6,5,'6',0.50),(2,5,'2',1.00),(7,5,'7',0.50),(8,5,'8',0.25),(9,5,'9',0.25),(10,5,'10',0.25),(11,5,'11',0.25),(12,5,'12',0.25),(13,5,'13',0.25),(14,5,'14',0.25),(15,5,'15',0.10),(16,5,'16',0.10),(17,5,'17',0.10),(18,5,'18',0.10),(19,5,'19',0.10),(20,5,'20',0.10),(21,5,'21',0.10),(22,5,'22',0.10),(23,5,'23',0.10),(24,5,'24',0.10),(25,5,'25',0.10),(26,5,'26',0.10),(27,5,'27',0.10),(28,5,'28',0.10),(29,5,'29',0.10),(30,5,'30',0.10);
/*!40000 ALTER TABLE `pp_deadlinecriteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pp_fuzzyjeniskuecriteria`
--

DROP TABLE IF EXISTS `pp_fuzzyjeniskuecriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pp_fuzzyjeniskuecriteria` (
  `Id` int(11) NOT NULL,
  `CriteriaName` int(11) NOT NULL,
  `CriteriaValue` double(4,2) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pp_fuzzyjeniskuecriteria`
--

LOCK TABLES `pp_fuzzyjeniskuecriteria` WRITE;
/*!40000 ALTER TABLE `pp_fuzzyjeniskuecriteria` DISABLE KEYS */;
INSERT INTO `pp_fuzzyjeniskuecriteria` VALUES (1,1,0.10),(2,2,0.10),(3,3,0.25),(4,4,0.25),(5,5,0.25),(6,6,0.50),(7,7,0.50),(8,8,0.50),(9,9,0.75),(10,10,0.75),(11,11,0.75),(12,12,1.00),(13,13,1.00),(14,14,1.00),(15,15,1.00);
/*!40000 ALTER TABLE `pp_fuzzyjeniskuecriteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pp_mastercriteria`
--

DROP TABLE IF EXISTS `pp_mastercriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pp_mastercriteria` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CriteriaName` varchar(30) NOT NULL,
  `CriteriaValue` double(4,2) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pp_mastercriteria`
--

LOCK TABLES `pp_mastercriteria` WRITE;
/*!40000 ALTER TABLE `pp_mastercriteria` DISABLE KEYS */;
INSERT INTO `pp_mastercriteria` VALUES (1,'Jenis Kue',0.20),(2,'Kebawelan Pelanggan',0.05),(3,'Kesulitan Bahan Pokok',0.15),(4,'Jarak Pengiriman',0.10),(5,'Deadline Hari',0.30),(6,'Tenaga Kerja',0.05),(7,'Kuantitas Pesanan',0.15);
/*!40000 ALTER TABLE `pp_mastercriteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pp_orders`
--

DROP TABLE IF EXISTS `pp_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pp_orders` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdCustomer` int(11) NOT NULL,
  `TotalQuantity` int(11) NOT NULL,
  `DeadlineDate` date NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `PP_Customer_IdCustomer` (`IdCustomer`),
  CONSTRAINT `PP_Customer_IdCustomer` FOREIGN KEY (`IdCustomer`) REFERENCES `pp_customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pp_orders`
--

LOCK TABLES `pp_orders` WRITE;
/*!40000 ALTER TABLE `pp_orders` DISABLE KEYS */;
INSERT INTO `pp_orders` VALUES (2,2,30,'2018-07-12'),(3,3,30,'2018-07-27'),(4,4,10,'2018-07-25'),(13,8,40,'2018-07-18');
/*!40000 ALTER TABLE `pp_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pp_subcriteria`
--

DROP TABLE IF EXISTS `pp_subcriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pp_subcriteria` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdMasterCriteria` int(11) NOT NULL,
  `CriteriaName` varchar(30) NOT NULL,
  `CriteriaValue` double(4,2) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdMasterCriteria_SubCriteria_idx` (`IdMasterCriteria`),
  CONSTRAINT `IdMasterCriteria_SubCriteria` FOREIGN KEY (`IdMasterCriteria`) REFERENCES `pp_mastercriteria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pp_subcriteria`
--

LOCK TABLES `pp_subcriteria` WRITE;
/*!40000 ALTER TABLE `pp_subcriteria` DISABLE KEYS */;
INSERT INTO `pp_subcriteria` VALUES (1,1,'Nastar',4.00),(2,1,'Kastengel',3.00),(3,1,'Chocochips',3.00),(4,1,'Putri Salju',2.00),(5,1,'Kue Almond',2.00),(6,1,'Sagu Keju',1.00),(7,2,'Bacot',1.00),(8,2,'Sedang',0.50),(9,2,'Asik',0.10),(10,3,'Sulit',1.00),(11,3,'Sedang',0.50),(12,3,'Mudah',0.10),(13,4,'Jauh',1.00),(14,4,'Sedang',0.50),(15,4,'Dekat',0.10),(16,5,'30',0.10),(17,5,'29',0.10),(18,5,'28',0.10),(19,5,'27',0.10),(20,5,'26',0.10),(21,5,'25',0.10),(22,5,'24',0.10),(23,5,'23',0.10),(24,5,'22',0.10),(25,5,'21',0.10),(26,5,'20',0.10),(27,5,'19',0.10),(28,5,'18',0.10),(29,5,'17',0.10),(30,5,'16',0.10),(31,5,'15',0.10),(32,5,'14',0.25),(33,5,'13',0.25),(34,5,'12',0.25),(35,5,'11',0.25),(36,5,'10',0.25),(37,5,'9',0.25),(38,5,'8',0.25),(39,5,'7',0.50),(40,5,'6',0.50),(41,5,'5',0.75),(42,5,'4',0.75),(43,5,'3',1.00),(44,5,'2',1.00),(45,6,'1',1.00),(46,6,'2',0.50),(47,6,'3',0.10),(48,7,'37-50',1.00),(49,7,'26-36',0.75),(50,7,'16-25',0.50),(51,7,'7-15',0.25),(52,7,'1-6',0.10),(63,2,'Agak Bacot',0.80),(64,3,'Agak Sulit',0.80),(65,4,'Agak Jauh',0.80);
/*!40000 ALTER TABLE `pp_subcriteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pp_user`
--

DROP TABLE IF EXISTS `pp_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pp_user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(10) NOT NULL,
  `Password` varchar(10) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pp_user`
--

LOCK TABLES `pp_user` WRITE;
/*!40000 ALTER TABLE `pp_user` DISABLE KEYS */;
INSERT INTO `pp_user` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `pp_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-09  6:24:18
