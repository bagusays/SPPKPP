-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2018 at 05:09 AM
-- Server version: 8.0.11
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sppk_pp_saw`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeletePemesan` (IN `IdPemesanParam` INT)  BEGIN
	DELETE FROM sppk_pp.pp_datacontent where IdDataPemesan = IdPemesanParam;
	DELETE FROM sppk_pp.pp_datapemesan where IdDataPemesan = IdPemesanParam;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pp_customers`
--

CREATE TABLE `pp_customers` (
  `IdCustomer` int(11) NOT NULL,
  `CustomerName` varchar(50) NOT NULL,
  `PhoneNumber` varchar(15) NOT NULL,
  `Address` varchar(90) NOT NULL DEFAULT '-'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pp_customers`
--

INSERT INTO `pp_customers` (`IdCustomer`, `CustomerName`, `PhoneNumber`, `Address`) VALUES
(1, 'Ari', '083867298564', 'Jl. Kp. Melayu'),
(2, 'Joko', '083864522333', 'Jl. Tebet 2 no. 2'),
(3, 'Anwar', '081254964551', 'Jl. Dewi Sartika'),
(4, 'Rudi', '081246125491', 'Pondok labu 2'),
(8, 'Adi', '083867298564', 'Dewata');

-- --------------------------------------------------------

--
-- Table structure for table `pp_datacontent`
--

CREATE TABLE `pp_datacontent` (
  `IdDataContent` int(11) NOT NULL,
  `IdOrder` int(11) NOT NULL,
  `IdMasterCriteria` int(11) NOT NULL,
  `IdSubCriteria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pp_datacontent`
--

INSERT INTO `pp_datacontent` (`IdDataContent`, `IdOrder`, `IdMasterCriteria`, `IdSubCriteria`) VALUES
(1, 1, 1, 6),
(2, 1, 1, 5),
(3, 1, 1, 2),
(4, 1, 1, 4),
(5, 1, 2, 8),
(6, 1, 3, 11),
(7, 1, 4, 14),
(9, 1, 6, 45),
(10, 1, 7, 50),
(11, 2, 1, 1),
(12, 2, 1, 2),
(13, 2, 2, 8),
(14, 2, 3, 11),
(15, 2, 4, 14),
(17, 2, 6, 45),
(18, 2, 7, 49),
(21, 3, 2, 8),
(22, 3, 3, 11),
(23, 3, 4, 14),
(25, 3, 6, 45),
(26, 3, 7, 49),
(27, 4, 1, 1),
(29, 4, 2, 8),
(30, 4, 3, 11),
(31, 4, 4, 14),
(33, 4, 6, 45),
(34, 4, 7, 51),
(37, 3, 1, 1),
(38, 3, 1, 5),
(39, 3, 1, 6),
(40, 3, 1, 4),
(41, 3, 1, 3),
(42, 3, 1, 2),
(70, 11, 1, 5),
(71, 11, 1, 4),
(72, 11, 2, 8),
(73, 11, 3, 11),
(74, 11, 4, 14),
(75, 11, 6, 45),
(76, 11, 7, 50);

-- --------------------------------------------------------

--
-- Table structure for table `pp_deadlinecriteria`
--

CREATE TABLE `pp_deadlinecriteria` (
  `IdDeadlineCriteria` int(11) NOT NULL,
  `IdMasterCriteria` int(11) NOT NULL,
  `CriteriaName` varchar(20) NOT NULL,
  `CriteriaValue` double(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pp_deadlinecriteria`
--

INSERT INTO `pp_deadlinecriteria` (`IdDeadlineCriteria`, `IdMasterCriteria`, `CriteriaName`, `CriteriaValue`) VALUES
(3, 5, '3', 1.00),
(4, 5, '4', 0.75),
(5, 5, '5', 0.75),
(6, 5, '6', 0.50),
(2, 5, '2', 1.00),
(7, 5, '7', 0.50),
(8, 5, '8', 0.25),
(9, 5, '9', 0.25),
(10, 5, '10', 0.25),
(11, 5, '11', 0.25),
(12, 5, '12', 0.25),
(13, 5, '13', 0.25),
(14, 5, '14', 0.25),
(15, 5, '15', 0.10),
(16, 5, '16', 0.10),
(17, 5, '17', 0.10),
(18, 5, '18', 0.10),
(19, 5, '19', 0.10),
(20, 5, '20', 0.10),
(21, 5, '21', 0.10),
(22, 5, '22', 0.10),
(23, 5, '23', 0.10),
(24, 5, '24', 0.10),
(25, 5, '25', 0.10),
(26, 5, '26', 0.10),
(27, 5, '27', 0.10),
(28, 5, '28', 0.10),
(29, 5, '29', 0.10),
(30, 5, '30', 0.10);

-- --------------------------------------------------------

--
-- Table structure for table `pp_fuzzyjeniskuecriteria`
--

CREATE TABLE `pp_fuzzyjeniskuecriteria` (
  `IdFuzzy` int(11) NOT NULL,
  `CriteriaName` varchar(10) NOT NULL,
  `CriteriaValue` double(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pp_fuzzyjeniskuecriteria`
--

INSERT INTO `pp_fuzzyjeniskuecriteria` (`IdFuzzy`, `CriteriaName`, `CriteriaValue`) VALUES
(1, '1', 0.10),
(2, '2', 0.10),
(3, '3', 0.25),
(4, '4', 0.25),
(5, '5', 0.25),
(6, '6', 0.50),
(7, '7', 0.50),
(8, '8', 0.50),
(9, '9', 0.75),
(10, '10', 0.75),
(11, '11', 0.75),
(12, '12', 1.00),
(13, '13', 1.00),
(14, '14', 1.00),
(15, '15', 1.00);

-- --------------------------------------------------------

--
-- Table structure for table `pp_mastercriteria`
--

CREATE TABLE `pp_mastercriteria` (
  `IdMasterCriteria` int(11) NOT NULL,
  `CriteriaName` varchar(30) NOT NULL,
  `CriteriaValue` double(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pp_mastercriteria`
--

INSERT INTO `pp_mastercriteria` (`IdMasterCriteria`, `CriteriaName`, `CriteriaValue`) VALUES
(1, 'Jenis Kue', 0.20),
(2, 'Kebawelan Pelanggan', 0.05),
(3, 'Kesulitan Bahan Pokok', 0.15),
(4, 'Jarak Pengiriman', 0.10),
(5, 'Deadline Hari', 0.30),
(6, 'Tenaga Kerja', 0.05),
(7, 'Kuantitas Pesanan', 0.15);

-- --------------------------------------------------------

--
-- Table structure for table `pp_orders`
--

CREATE TABLE `pp_orders` (
  `IdOrder` int(11) NOT NULL,
  `IdCustomer` int(11) NOT NULL,
  `TotalQuantity` int(11) NOT NULL,
  `DeadlineDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pp_orders`
--

INSERT INTO `pp_orders` (`IdOrder`, `IdCustomer`, `TotalQuantity`, `DeadlineDate`) VALUES
(1, 1, 20, '2018-06-14'),
(2, 2, 30, '2018-06-23'),
(3, 3, 30, '2018-06-25'),
(4, 4, 10, '2018-06-11'),
(11, 8, 20, '2018-06-21');

-- --------------------------------------------------------

--
-- Table structure for table `pp_subcriteria`
--

CREATE TABLE `pp_subcriteria` (
  `IdSubCriteria` int(11) NOT NULL,
  `IdMasterCriteria` int(11) NOT NULL,
  `CriteriaName` varchar(30) NOT NULL,
  `CriteriaValue` double(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pp_subcriteria`
--

INSERT INTO `pp_subcriteria` (`IdSubCriteria`, `IdMasterCriteria`, `CriteriaName`, `CriteriaValue`) VALUES
(1, 1, 'Nastar', 4.00),
(2, 1, 'Kastengel', 3.00),
(3, 1, 'Chocochips', 3.00),
(4, 1, 'Putri Salju', 2.00),
(5, 1, 'Kue Almond', 2.00),
(6, 1, 'Sagu Keju', 1.00),
(7, 2, 'Bawel', 1.00),
(8, 2, 'Sedang', 0.50),
(9, 2, 'Asik', 0.10),
(10, 3, 'Sulit', 1.00),
(11, 3, 'Sedang', 0.50),
(12, 3, 'Mudah', 0.10),
(13, 4, 'Jauh', 1.00),
(14, 4, 'Sedang', 0.50),
(15, 4, 'Dekat', 0.10),
(16, 5, '30', 0.10),
(17, 5, '29', 0.10),
(18, 5, '28', 0.10),
(19, 5, '27', 0.10),
(20, 5, '26', 0.10),
(21, 5, '25', 0.10),
(22, 5, '24', 0.10),
(23, 5, '23', 0.10),
(24, 5, '22', 0.10),
(25, 5, '21', 0.10),
(26, 5, '20', 0.10),
(27, 5, '19', 0.10),
(28, 5, '18', 0.10),
(29, 5, '17', 0.10),
(30, 5, '16', 0.10),
(31, 5, '15', 0.10),
(32, 5, '14', 0.25),
(33, 5, '13', 0.25),
(34, 5, '12', 0.25),
(35, 5, '11', 0.25),
(36, 5, '10', 0.25),
(37, 5, '9', 0.25),
(38, 5, '8', 0.25),
(39, 5, '7', 0.50),
(40, 5, '6', 0.50),
(41, 5, '5', 0.75),
(42, 5, '4', 0.75),
(43, 5, '3', 1.00),
(44, 5, '2', 1.00),
(45, 6, '1 Orang', 1.00),
(46, 6, '2 Orang', 0.50),
(47, 6, '3 Orang', 0.10),
(48, 7, '36-50', 1.00),
(49, 7, '26-36', 0.75),
(50, 7, '16-25', 0.50),
(51, 7, '7-15', 0.25),
(52, 7, '1-6', 0.10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pp_customers`
--
ALTER TABLE `pp_customers`
  ADD PRIMARY KEY (`IdCustomer`);

--
-- Indexes for table `pp_datacontent`
--
ALTER TABLE `pp_datacontent`
  ADD PRIMARY KEY (`IdDataContent`),
  ADD KEY `DataContent_IdMasterCriteria_idx` (`IdMasterCriteria`),
  ADD KEY `DataContent_IdSubCriteria_idx` (`IdSubCriteria`),
  ADD KEY `DataContent_IdDataPemesan_idx` (`IdOrder`);

--
-- Indexes for table `pp_fuzzyjeniskuecriteria`
--
ALTER TABLE `pp_fuzzyjeniskuecriteria`
  ADD PRIMARY KEY (`IdFuzzy`);

--
-- Indexes for table `pp_mastercriteria`
--
ALTER TABLE `pp_mastercriteria`
  ADD PRIMARY KEY (`IdMasterCriteria`);

--
-- Indexes for table `pp_orders`
--
ALTER TABLE `pp_orders`
  ADD PRIMARY KEY (`IdOrder`),
  ADD KEY `PP_Customer_IdCustomer` (`IdCustomer`);

--
-- Indexes for table `pp_subcriteria`
--
ALTER TABLE `pp_subcriteria`
  ADD PRIMARY KEY (`IdSubCriteria`),
  ADD KEY `IdMasterCriteria_SubCriteria_idx` (`IdMasterCriteria`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pp_customers`
--
ALTER TABLE `pp_customers`
  MODIFY `IdCustomer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pp_datacontent`
--
ALTER TABLE `pp_datacontent`
  MODIFY `IdDataContent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `pp_fuzzyjeniskuecriteria`
--
ALTER TABLE `pp_fuzzyjeniskuecriteria`
  MODIFY `IdFuzzy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `pp_mastercriteria`
--
ALTER TABLE `pp_mastercriteria`
  MODIFY `IdMasterCriteria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pp_orders`
--
ALTER TABLE `pp_orders`
  MODIFY `IdOrder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pp_subcriteria`
--
ALTER TABLE `pp_subcriteria`
  MODIFY `IdSubCriteria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pp_datacontent`
--
ALTER TABLE `pp_datacontent`
  ADD CONSTRAINT `DataContent_IdDataPemesan` FOREIGN KEY (`IdOrder`) REFERENCES `pp_orders` (`IdOrder`),
  ADD CONSTRAINT `DataContent_IdMasterCriteria` FOREIGN KEY (`IdMasterCriteria`) REFERENCES `pp_mastercriteria` (`idmastercriteria`),
  ADD CONSTRAINT `DataContent_IdSubCriteria` FOREIGN KEY (`IdSubCriteria`) REFERENCES `pp_subcriteria` (`IdSubCriteria`);

--
-- Constraints for table `pp_orders`
--
ALTER TABLE `pp_orders`
  ADD CONSTRAINT `PP_Customer_IdCustomer` FOREIGN KEY (`IdCustomer`) REFERENCES `pp_customers` (`IdCustomer`);

--
-- Constraints for table `pp_subcriteria`
--
ALTER TABLE `pp_subcriteria`
  ADD CONSTRAINT `IdMasterCriteria_SubCriteria` FOREIGN KEY (`IdMasterCriteria`) REFERENCES `pp_mastercriteria` (`idmastercriteria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
