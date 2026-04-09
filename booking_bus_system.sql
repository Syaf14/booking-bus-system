/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 8.0.30 : Database - booking_bus_system
*********************************************************************
*/

CREATE DATABASE IF NOT EXISTS booking_bus_system;
USE booking_bus_system;

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `bookings` */

DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `scheduled_id` bigint unsigned DEFAULT NULL,
  `seat_id` bigint unsigned DEFAULT NULL,
  `booking_type` enum('normal','class') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `class_id` bigint unsigned DEFAULT NULL,
  `status` enum('confirmed','pending','failed','cancelled','expired') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bookings_scheduled` (`scheduled_id`),
  KEY `fk_bookings_seat` (`seat_id`),
  KEY `fk_user_id` (`user_id`),
  KEY `fk_booking_class` (`class_id`),
  CONSTRAINT `fk_booking_class` FOREIGN KEY (`class_id`) REFERENCES `student_classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_bookings_scheduled` FOREIGN KEY (`scheduled_id`) REFERENCES `scheduled_bus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bookings_seat` FOREIGN KEY (`seat_id`) REFERENCES `bus_seats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `bookings` */

insert  into `bookings`(`id`,`user_id`,`scheduled_id`,`seat_id`,`booking_type`,`class_id`,`status`,`created_at`,`updated_at`,`deleted_at`) values 
(5,1,1,1,'class',3,'cancelled','2026-02-27 21:33:24','2026-03-11 23:13:01','2026-03-11 23:13:01'),
(6,1,43,12,'class',3,'confirmed','2026-03-03 23:56:39','2026-03-11 23:14:08','2026-03-11 23:14:06'),
(7,1,1,11,'class',3,'cancelled','2026-03-05 00:35:41','2026-03-11 23:13:01','2026-03-11 23:13:01'),
(8,5,1,4,'normal',3,'cancelled','2026-03-05 01:02:03','2026-03-11 23:18:26','2026-03-11 23:18:26'),
(9,7,1,12,'normal',3,'confirmed','2026-03-05 18:07:48','2026-03-11 23:11:44',NULL),
(10,7,1,8,'normal',3,'expired','2026-03-05 18:46:15','2026-03-11 23:29:47',NULL),
(11,7,1,16,'class',3,'cancelled','2026-03-06 07:10:30','2026-03-11 23:13:01','2026-03-11 23:13:01'),
(12,7,2,10,'class',3,'cancelled','2026-03-06 07:47:26','2026-03-11 23:09:10','2026-03-11 23:09:10'),
(13,6,1,18,'class',3,'cancelled','2026-03-06 16:08:19','2026-03-11 23:13:01','2026-03-11 23:13:01'),
(14,6,1,42,'class',3,'cancelled','2026-03-06 16:12:17','2026-03-11 23:13:01','2026-03-11 23:13:01'),
(15,5,2,11,'class',3,'cancelled','2026-03-11 13:40:39','2026-03-11 23:09:10','2026-03-11 23:09:10'),
(16,5,1,3,'normal',3,'cancelled','2026-03-11 22:56:01','2026-03-11 23:18:36','2026-03-11 23:18:36'),
(17,5,2,4,'class',3,'cancelled','2026-03-11 22:56:24','2026-03-11 23:09:10','2026-03-11 23:09:10'),
(18,7,1,26,'class',3,'cancelled','2026-03-11 23:15:13','2026-03-11 23:16:39','2026-03-11 23:16:39'),
(19,8,1,18,'class',3,'cancelled','2026-03-11 23:15:33','2026-03-28 13:00:49','2026-03-28 13:00:49'),
(20,6,1,25,'class',3,'cancelled','2026-03-11 23:15:50','2026-03-11 23:16:39','2026-03-11 23:16:39'),
(21,5,1,17,'class',3,'cancelled','2026-03-11 23:16:16','2026-03-11 23:16:39','2026-03-11 23:16:39'),
(22,6,1,3,'normal',3,'cancelled','2026-03-11 23:18:52','2026-03-11 23:18:56','2026-03-11 23:18:56'),
(23,8,1,18,'normal',3,'confirmed','2026-03-28 13:02:33','2026-03-28 13:02:33',NULL),
(24,8,44,11,'class',3,'cancelled','2026-03-28 13:03:03','2026-03-28 13:05:32','2026-03-28 13:05:32'),
(25,9,44,1,'class',3,'cancelled','2026-03-28 13:05:26','2026-03-28 13:05:32','2026-03-28 13:05:32'),
(26,9,23,19,'class',3,'confirmed','2026-03-28 13:14:21','2026-03-28 13:14:21',NULL);

/*Table structure for table `bus_routes` */

DROP TABLE IF EXISTS `bus_routes`;

CREATE TABLE `bus_routes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bus_id` bigint unsigned DEFAULT NULL,
  `depart_location` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `depart_time` time DEFAULT NULL,
  `arrive_location` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `arrive_time` time DEFAULT NULL,
  `day_assigned` enum('isnin','selasa','rabu','khamis','jumaat') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bus_routes_bus` (`bus_id`),
  CONSTRAINT `fk_bus_routes_bus` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `bus_routes` */

insert  into `bus_routes`(`id`,`bus_id`,`depart_location`,`depart_time`,`arrive_location`,`arrive_time`,`day_assigned`,`created_at`,`updated_at`,`deleted_at`) values 
(1,1,'Seksyen 7','07:30:00','Seksyen 9','19:30:00',NULL,'2026-02-16 16:29:40','2026-02-22 00:56:19','2026-02-19 16:35:17'),
(2,1,'KMPUS BERTARI','07:30:00','KMPUS BERCHAM','12:00:00',NULL,'2026-02-19 16:39:25','2026-02-26 22:57:42','2026-02-26 22:57:42'),
(3,1,'KMPUS BESTARI','12:00:00','KMPUS BERCHAM','18:30:00',NULL,'2026-02-19 16:50:23','2026-02-26 22:57:44','2026-02-26 22:57:44'),
(4,25,'KAMPUS BESTARI','12:30:00','KAMPUS BERCHAM','18:30:00',NULL,'2026-02-22 02:04:56','2026-02-26 22:57:45','2026-02-26 22:57:45'),
(5,26,'KAMPUS BESTARI','12:30:00','KAMPUS BERCHAM','18:30:00',NULL,'2026-02-23 01:44:16','2026-02-26 22:57:47','2026-02-26 22:57:47'),
(6,1,'KAMPUS BESTARI','07:00:00','KAMPUS BERCHAM','09:00:00','isnin','2026-02-26 22:58:33','2026-02-26 23:37:06',NULL),
(7,2,'KAMPUS BESTARI','07:00:00','KAMPUS BERCHAM','09:00:00','isnin','2026-02-26 22:59:51','2026-02-26 23:37:00',NULL),
(8,3,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','isnin','2026-02-26 23:00:48','2026-02-26 23:37:16',NULL),
(9,25,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','isnin','2026-02-26 23:39:46','2026-02-26 23:39:46',NULL),
(10,26,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','isnin','2026-02-26 23:40:23','2026-02-26 23:40:23',NULL),
(11,27,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','isnin','2026-02-26 23:40:34','2026-02-26 23:40:34',NULL),
(12,28,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','isnin','2026-02-26 23:40:38','2026-02-26 23:40:38',NULL),
(13,1,'KAMPUS BESTARI','09:00:00','KAMPUS BERCHAM','12:00:00','isnin','2026-02-26 23:43:49','2026-02-26 23:43:49',NULL),
(14,2,'KAMPUS BESTARI','09:00:00','KAMPUS BERCHAM','12:00:00','isnin','2026-02-26 23:48:34','2026-02-26 23:48:34',NULL),
(15,3,'KAMPUS BESTARI','09:00:00','KAMPUS BERCHAM','12:00:00','isnin','2026-02-26 23:48:37','2026-02-26 23:48:37',NULL),
(16,25,'KAMPUS BESTARI','09:00:00','KAMPUS BERCHAM','12:00:00','isnin','2026-02-26 23:48:39','2026-02-26 23:48:39',NULL),
(17,1,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','17:00:00','isnin','2026-02-26 23:49:33','2026-02-26 23:49:33',NULL),
(18,2,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','17:00:00','isnin','2026-02-26 23:49:36','2026-02-26 23:49:36',NULL),
(19,3,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','17:00:00','isnin','2026-02-26 23:49:39','2026-02-26 23:49:39',NULL),
(20,25,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','17:00:00','isnin','2026-02-26 23:49:42','2026-02-26 23:49:42',NULL),
(21,26,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','17:00:00','isnin','2026-02-26 23:49:44','2026-02-26 23:49:44',NULL),
(22,27,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','17:30:00','isnin','2026-02-26 23:50:58','2026-02-27 13:23:37','2026-02-27 13:23:37'),
(23,29,'KAMPUS BESTARI','07:00:00','KAMPUS BERCHAM','09:00:00','selasa','2026-02-26 23:52:42','2026-02-26 23:52:42',NULL),
(24,30,'KAMPUS BESTARI','07:00:00','KAMPUS BERCHAM','09:00:00','selasa','2026-02-26 23:52:48','2026-02-26 23:52:48',NULL),
(25,27,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','selasa','2026-02-26 23:53:40','2026-02-26 23:53:40',NULL),
(26,28,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','selasa','2026-02-26 23:53:48','2026-02-26 23:53:48',NULL),
(27,31,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','selasa','2026-02-26 23:53:51','2026-02-26 23:53:51',NULL),
(28,32,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','selasa','2026-02-26 23:53:53','2026-02-26 23:53:53',NULL),
(29,33,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','selasa','2026-02-26 23:53:55','2026-02-26 23:53:55',NULL),
(30,1,'KAMPUS BESTARI','09:00:00','KAMPUS BERCHAM','12:00:00','selasa','2026-02-27 13:17:02','2026-02-27 13:17:02',NULL),
(31,2,'KAMPUS BESTARI','09:00:00','KAMPUS BERCHAM','12:00:00','selasa','2026-02-27 13:17:04','2026-02-27 13:17:04',NULL),
(32,27,'KAMPUS BESTARI','09:00:00','KAMPUS BERCHAM','12:00:00','selasa','2026-02-27 13:17:09','2026-02-27 13:17:09',NULL),
(33,28,'KAMPUS BERCHAM','12:00:00','KAMPUS BESTARI','13:00:00','selasa','2026-02-27 13:18:07','2026-02-27 13:18:07',NULL),
(34,29,'KAMPUS BERCHAM','12:00:00','KAMPUS BESTARI','13:00:00','selasa','2026-02-27 13:18:12','2026-02-27 13:18:12',NULL),
(35,30,'KAMPUS BERCHAM','12:00:00','KAMPUS BESTARI','13:00:00','selasa','2026-02-27 13:18:15','2026-02-27 13:18:15',NULL),
(36,1,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','18:00:00','selasa','2026-02-27 13:18:43','2026-02-27 13:18:43',NULL),
(37,2,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','18:00:00','selasa','2026-02-27 13:18:45','2026-02-27 13:18:45',NULL),
(38,3,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','18:00:00','selasa','2026-02-27 13:18:47','2026-02-27 13:18:47',NULL),
(39,25,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','18:00:00','selasa','2026-02-27 13:18:49','2026-02-27 13:18:49',NULL),
(40,26,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','18:00:00','selasa','2026-02-27 13:18:52','2026-02-27 13:18:52',NULL),
(41,27,'KAMPUS BERCHAM','14:00:00','KAMPUS BESTARI','18:00:00','selasa','2026-02-27 13:19:05','2026-02-27 13:19:05',NULL),
(42,28,'KAMPUS BERCHAM','14:00:00','KAMPUS BESTARI','18:00:00','selasa','2026-02-27 13:19:08','2026-02-27 13:19:08',NULL),
(43,29,'KAMPUS BERCHAM','17:00:00','KAMPUS BESTARI','18:00:00','selasa','2026-02-27 13:19:13','2026-02-27 13:19:13',NULL),
(44,1,'KAMPUS BERCHAM','17:00:00','KAMPUS BESTARI','18:00:00','isnin','2026-02-27 13:25:07','2026-02-27 13:25:07',NULL),
(45,2,'KAMPUS BERCHAM','17:00:00','KAMPUS BESTARI','18:00:00','isnin','2026-02-27 13:25:14','2026-02-27 13:25:14',NULL),
(46,3,'KAMPUS BERCHAM','17:00:00','KAMPUS BESTARI','18:00:00','isnin','2026-02-27 13:25:17','2026-02-27 13:25:17',NULL),
(47,28,'KAMPUS BERCHAM','17:00:00','KAMPUS BESTARI','18:00:00','isnin','2026-02-27 13:25:19','2026-02-27 13:25:19',NULL),
(48,27,'KAMPUS BERCHAM','17:30:00','KAMPUS BESTARI','18:00:00','isnin','2026-02-27 13:25:33','2026-02-27 13:25:33',NULL),
(49,2,'KAMPUS BESTARI','07:00:00','KAMPUS BERCHAM','09:00:00','rabu','2026-02-27 13:50:56','2026-02-27 13:50:56',NULL),
(50,3,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','rabu','2026-02-27 13:51:10','2026-02-27 13:51:10',NULL),
(51,25,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','rabu','2026-02-27 13:51:12','2026-02-27 13:51:12',NULL),
(52,26,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','rabu','2026-02-27 13:51:14','2026-02-27 13:51:14',NULL),
(53,27,'KAMPUS BESTARI','09:00:00','KAMPUS BERCHAM','12:00:00','rabu','2026-02-27 13:52:05','2026-02-27 13:52:05',NULL),
(54,1,'KAMPUS BERCHAM','12:00:00','KAMPUS BESTARI','13:00:00','rabu','2026-03-06 14:51:01','2026-03-06 14:51:01',NULL),
(55,2,'KAMPUS BERCHAM','12:00:00','KAMPUS BESTARI','13:00:00','rabu','2026-03-06 14:51:06','2026-03-06 14:51:06',NULL),
(56,3,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','13:00:00','rabu','2026-03-06 14:52:54','2026-03-06 14:52:54',NULL),
(57,25,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','13:00:00','rabu','2026-03-06 14:55:41','2026-03-06 14:55:41',NULL),
(58,26,'KAMPUS BERCHAM','17:00:00','KAMPUS BESTARI','18:00:00','rabu','2026-03-06 14:56:15','2026-03-06 14:56:15',NULL),
(59,1,'KAMPUS BESTARI','07:00:00','KAMPUS BERCHAM','09:00:00','khamis','2026-03-06 14:58:19','2026-03-06 14:58:19',NULL),
(60,2,'KAMPUS BESTARI','07:00:00','KAMPUS BERCHAM','09:00:00','khamis','2026-03-06 14:58:29','2026-03-06 14:58:29',NULL),
(61,3,'KAMPUS BESTARI','07:00:00','KAMPUS BERCHAM','09:00:00','khamis','2026-03-06 14:58:31','2026-03-06 14:58:31',NULL),
(62,25,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','khamis','2026-03-06 14:58:53','2026-03-06 14:58:53',NULL),
(63,26,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','khamis','2026-03-06 14:58:57','2026-03-06 14:58:57',NULL),
(64,27,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','khamis','2026-03-06 14:58:59','2026-03-06 14:58:59',NULL),
(65,28,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','khamis','2026-03-06 14:59:02','2026-03-06 14:59:02',NULL),
(66,29,'KAMPUS BESTARI','07:40:00','KAMPUS BERCHAM','09:00:00','khamis','2026-03-06 14:59:06','2026-03-06 14:59:06',NULL),
(67,32,'KAMPUS BESTARI','09:00:00','KAMPUS BERCHAM','12:00:00','khamis','2026-03-06 14:59:28','2026-03-06 14:59:28',NULL),
(68,33,'KAMPUS BESTARI','14:00:00','KAMPUS BERCHAM','18:00:00','khamis','2026-03-06 14:59:47','2026-03-06 14:59:47',NULL),
(69,1,'KAMPUS BERCHAM','12:00:00','KAMPUS BESTARI','13:00:00','khamis','2026-03-06 15:00:39','2026-03-06 15:00:39',NULL),
(70,2,'KAMPUS BERCHAM','12:00:00','KAMPUS BESTARI','13:00:00','khamis','2026-03-06 15:00:41','2026-03-06 15:00:41',NULL),
(71,3,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','14:00:00','khamis','2026-03-06 15:00:50','2026-03-06 15:00:50',NULL),
(72,25,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','14:00:00','khamis','2026-03-06 15:00:54','2026-03-06 15:00:54',NULL),
(73,26,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','14:00:00','khamis','2026-03-06 15:00:56','2026-03-06 15:00:56',NULL),
(74,27,'KAMPUS BERCHAM','13:00:00','KAMPUS BESTARI','14:00:00','khamis','2026-03-06 15:00:59','2026-03-06 15:00:59',NULL),
(75,1,'KAMPUS BERCHAM','17:00:00','KAMPUS BESTARI','18:00:00','khamis','2026-03-06 15:01:14','2026-03-06 15:01:14',NULL),
(76,2,'KAMPUS BERCHAM','17:00:00','KAMPUS BESTARI','18:00:00','khamis','2026-03-06 15:01:16','2026-03-06 15:01:16',NULL),
(77,3,'KAMPUS BERCHAM','17:00:00','KAMPUS BESTARI','18:00:00','khamis','2026-03-06 15:01:18','2026-03-06 15:01:18',NULL),
(78,25,'KAMPUS BERCHAM','17:00:00','KAMPUS BESTARI','18:00:00','khamis','2026-03-06 15:01:20','2026-03-06 15:01:20',NULL),
(79,26,'KAMPUS BERCHAM','17:00:00','KAMPUS BESTARI','18:00:00','khamis','2026-03-06 15:01:24','2026-03-06 15:01:24',NULL),
(80,29,'KAMPUS BERCHAM','17:30:00','KAMPUS BESTARI','18:00:00','khamis','2026-03-06 15:01:34','2026-03-06 15:01:34',NULL);

/*Table structure for table `bus_seats` */

DROP TABLE IF EXISTS `bus_seats`;

CREATE TABLE `bus_seats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `seat_number` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seat_type` enum('normal','standing') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `bus_seats` */

insert  into `bus_seats`(`id`,`seat_number`,`seat_type`,`active`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'A1','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(2,'A2','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(3,'A3','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(4,'A4','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(5,'B1','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(6,'B2','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(7,'B3','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(8,'B4','normal',1,'2026-02-22 13:36:56','2026-02-22 14:31:42',NULL),
(9,'C1','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(10,'C2','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(11,'C3','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(12,'C4','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(13,'D1','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(14,'D2','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(15,'D3','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(16,'D4','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(17,'E1','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(18,'E2','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(19,'E3','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(20,'E4','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(21,'F1','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(22,'F2','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(23,'F3','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(24,'F4','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(25,'G1','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(26,'G2','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(27,'G3','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(28,'G4','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(29,'H1','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(30,'H2','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(31,'H3','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(32,'H4','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(33,'I1','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(34,'I2','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(35,'I3','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(36,'I4','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(37,'J1','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(38,'J2','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(39,'J3','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(40,'J4','normal',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(41,'S1','standing',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(42,'S2','standing',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(43,'S3','standing',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(44,'S4','standing',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(45,'S5','standing',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(46,'S6','standing',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(47,'S7','standing',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(48,'S8','standing',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(49,'S9','standing',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL),
(50,'S10','standing',1,'2026-02-22 13:36:56','2026-02-22 13:36:56',NULL);

/*Table structure for table `buses` */

DROP TABLE IF EXISTS `buses`;

CREATE TABLE `buses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bus_code` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `bus_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `driver_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `driver_contact` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `plate_no` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `capacity_seat` int DEFAULT NULL,
  `capacity_standing` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bus_code` (`bus_code`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `buses` */

insert  into `buses`(`id`,`bus_code`,`bus_name`,`driver_name`,`driver_contact`,`plate_no`,`capacity_seat`,`capacity_standing`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'BUS001','BUS PUO',NULL,NULL,'DDG4578',40,10,'2026-02-13 17:49:57','2026-03-11 13:41:27',NULL),
(2,'BUS002','BUS PUO',NULL,NULL,'JHK1543',40,10,'2026-02-13 18:19:51','2026-02-26 22:53:14',NULL),
(3,'BUS003','BUS PUO',NULL,NULL,'FRD4435',40,10,'2026-02-13 18:20:16','2026-02-26 22:53:06',NULL),
(20,'B005','Rapid KL',NULL,NULL,NULL,40,20,'2026-02-22 01:37:10','2026-02-22 01:52:53','2026-02-22 01:52:53'),
(25,'BUS004','BUSPUO',NULL,NULL,'DDD9878',40,10,'2026-02-22 02:02:48','2026-02-26 22:51:07',NULL),
(26,'BUS005','BUS PUO',NULL,NULL,'AMD3233',40,10,'2026-02-23 01:41:58','2026-02-26 22:51:14',NULL),
(27,'BUS006','BUS PUO',NULL,NULL,'PHG6432',40,10,'2026-02-23 01:42:24','2026-02-26 22:51:24',NULL),
(28,'BUS007','BUS PUO',NULL,NULL,'BDR2334',40,10,'2026-02-23 01:43:39','2026-02-26 22:51:35',NULL),
(29,'BUS008','BUS PUO',NULL,NULL,'SBP1234',40,10,'2026-02-26 22:52:45','2026-02-26 22:52:45',NULL),
(30,'BUS009','BUS PUO',NULL,NULL,'DDF8585',40,10,'2026-02-26 22:55:26','2026-02-26 22:55:26',NULL),
(31,'BUS010','BUS PUO',NULL,NULL,'GJK7893',40,10,'2026-02-26 22:55:44','2026-02-26 22:55:44',NULL),
(32,'BUS011','BUS PUO',NULL,NULL,'SDH4537',40,10,'2026-02-26 22:56:55','2026-02-26 22:56:55',NULL),
(33,'BUS012','BUS PUO',NULL,NULL,'DFY3459',40,10,'2026-02-26 22:57:09','2026-02-26 22:57:09',NULL);

/*Table structure for table `profiles` */

DROP TABLE IF EXISTS `profiles`;

CREATE TABLE `profiles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone_no` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `class_id` bigint unsigned DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `college_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `student_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_profiles_user` (`user_id`),
  KEY `fk_classes` (`class_id`),
  CONSTRAINT `fk_classes` FOREIGN KEY (`class_id`) REFERENCES `student_classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_profiles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `profiles` */

insert  into `profiles`(`id`,`user_id`,`full_name`,`phone_no`,`class_id`,`gender`,`college_name`,`student_id`,`created_at`,`updated_at`,`deleted_at`) values 
(1,6,'Wafiq','0112223344',3,NULL,NULL,'2026112233','2026-03-02 09:15:32','2026-03-04 22:02:18',NULL),
(2,7,'Hakim','0111223112',3,NULL,NULL,'2026123456','2026-03-02 09:24:39','2026-03-04 22:02:19',NULL),
(3,8,'Aqilah','0123433454',3,NULL,NULL,'2026332153','2026-03-02 09:28:16','2026-03-04 22:02:20',NULL),
(4,9,'Irfan','0122334456',3,NULL,NULL,'2026908765','2026-03-02 14:29:25','2026-03-04 22:02:21',NULL),
(5,10,'Asyraf','0178245363',3,NULL,NULL,'2026467896','2026-03-02 14:34:19','2026-03-04 22:02:22',NULL),
(6,5,'Syafrul','0172892440',7,NULL,NULL,'20267654543','2026-03-03 23:55:00','2026-03-28 12:49:38',NULL),
(7,13,'Walid','0110229337',4,NULL,NULL,'2026176587','2026-03-06 16:07:28','2026-03-28 12:48:56',NULL),
(8,1,'Aiman','0126456873',2,NULL,NULL,'2023474484','2026-03-11 23:36:47','2026-03-11 23:37:01',NULL);

/*Table structure for table `reports` */

DROP TABLE IF EXISTS `reports`;

CREATE TABLE `reports` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` enum('Bus Delay','Driver Behavior','App Bug','Others') NOT NULL,
  `description` text NOT NULL,
  `status` enum('Pending','In Progress','Resolved') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_report` (`user_id`),
  CONSTRAINT `fk_user_report` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `reports` */

insert  into `reports`(`id`,`user_id`,`title`,`category`,`description`,`status`,`created_at`,`updated_at`) values 
(1,5,'I dont understand','Others','How i submit report','Pending','2026-03-28 13:38:30','2026-03-28 13:38:30'),
(2,5,'bus late','Bus Delay','20 minutes late','Resolved','2026-03-28 13:45:46','2026-03-29 11:39:57'),
(3,5,'bus late','Bus Delay','20 minutes late','Resolved','2026-03-28 13:49:25','2026-03-29 11:39:46');

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `roles` */

insert  into `roles`(`id`,`name`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'student','2026-03-11 13:49:59','2026-03-11 13:49:59',NULL),
(2,'class rep','2026-03-11 13:49:59','2026-03-11 13:49:59',NULL),
(3,'admin_hep','2026-03-11 13:49:59','2026-03-11 13:49:59',NULL),
(4,'admin_bus','2026-03-11 13:49:59','2026-03-11 13:49:59',NULL),
(5,'superadmin','2026-03-11 13:49:59','2026-03-11 13:49:59',NULL);

/*Table structure for table `scheduled_bus` */

DROP TABLE IF EXISTS `scheduled_bus`;

CREATE TABLE `scheduled_bus` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bus_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `route_id` bigint unsigned DEFAULT NULL,
  `day_assigned` enum('isnin','selasa','rabu','khamis','jumaat') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_scheduled_bus_bus_route` (`route_id`),
  CONSTRAINT `fk_scheduled_bus_bus_route` FOREIGN KEY (`route_id`) REFERENCES `bus_routes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `scheduled_bus` */

insert  into `scheduled_bus`(`id`,`bus_id`,`route_id`,`day_assigned`,`start_time`,`end_time`,`created_at`,`deleted_at`) values 
(1,NULL,6,NULL,NULL,NULL,'2026-02-27 21:07:06',NULL),
(2,NULL,7,NULL,NULL,NULL,'2026-02-27 21:09:56',NULL),
(3,NULL,8,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(4,NULL,9,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(5,NULL,10,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(6,NULL,11,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(7,NULL,12,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(8,NULL,13,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(9,NULL,14,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(10,NULL,15,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(11,NULL,16,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(12,NULL,17,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(13,NULL,18,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(14,NULL,19,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(15,NULL,20,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(16,NULL,21,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(17,NULL,44,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(18,NULL,45,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(19,NULL,46,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(20,NULL,47,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(21,NULL,48,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(22,NULL,23,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(23,NULL,24,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(24,NULL,25,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(25,NULL,26,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(26,NULL,27,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(27,NULL,28,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(28,NULL,29,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(29,NULL,32,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(30,NULL,30,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(31,NULL,31,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(32,NULL,33,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(33,NULL,34,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(34,NULL,35,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(35,NULL,38,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(36,NULL,39,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(37,NULL,40,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(38,NULL,36,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(39,NULL,37,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(40,NULL,41,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(41,NULL,42,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(42,NULL,43,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(43,NULL,49,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(44,NULL,50,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(45,NULL,51,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(46,NULL,52,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL),
(47,NULL,53,NULL,NULL,NULL,'2026-02-27 21:15:01',NULL);

/*Table structure for table `student_classes` */

DROP TABLE IF EXISTS `student_classes`;

CREATE TABLE `student_classes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `semester` enum('1','2') NOT NULL,
  `capacity_class` int unsigned DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_class_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `student_classes` */

insert  into `student_classes`(`id`,`name`,`semester`,`capacity_class`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'DFI 1','1',18,'2026-02-26 22:48:08','2026-02-26 22:48:08',NULL),
(2,'DAC 1','1',36,'2026-02-26 22:48:08','2026-02-26 22:48:08',NULL),
(3,'DIF 1','1',7,'2026-02-26 22:48:08','2026-03-28 12:20:58',NULL),
(4,'DPM 1','1',47,'2026-02-26 22:48:08','2026-02-26 22:48:08',NULL),
(5,'DRM 1','1',24,'2026-02-26 22:48:08','2026-02-26 22:48:08',NULL),
(6,'DAC 2C','2',31,'2026-02-26 22:48:08','2026-02-26 22:48:08',NULL),
(7,'DAC 2B','2',32,'2026-02-26 22:48:08','2026-02-26 22:48:08',NULL),
(8,'DAC 2A','2',33,'2026-02-26 22:48:08','2026-02-26 22:48:08',NULL),
(9,'DFI 2','2',46,'2026-02-26 22:48:08','2026-02-26 22:48:08',NULL),
(10,'DIF 2','2',57,'2026-02-26 22:48:08','2026-02-26 22:48:08',NULL),
(11,'DPM 2','2',41,'2026-02-26 22:48:08','2026-02-26 22:48:08',NULL),
(12,'DRM 2','2',40,'2026-02-26 22:48:08','2026-02-26 22:48:08',NULL);

/*Table structure for table `trips` */

DROP TABLE IF EXISTS `trips`;

CREATE TABLE `trips` (
  `trip_id` int NOT NULL AUTO_INCREMENT,
  `bus_id` int DEFAULT NULL,
  `route_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`trip_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `trips` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('student','admin','class rep') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'student',
  `status` enum('active','inactive') COLLATE utf8mb4_general_ci DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`password`,`role`,`status`,`created_at`,`deleted_at`) values 
(1,'Aiman','example@gmail.com','$2b$10$e5RkRzjyNAC1dY7zaGMwDeUYMmdomfBXaWwQKxVnqDxknhma7Z9Ti','student','active','2026-02-12 10:18:00',NULL),
(2,'admin_system','admin@gmail.com','$2y$10$o7mN1vGGfYUyaVCgRWOeD.ZgQJVGdAICJH8mTsLzoReZDHH/4q5CG','admin','active','2026-02-12 14:11:09',NULL),
(3,'system_admin','admin1@gmail.com','$2b$10$wqOkyoiUV1pW68o2XmwdUOr6EKgEJIW2KSmH3LY0/IBgmtVONamk6','admin','active','2026-02-12 14:45:57',NULL),
(4,'user1','example2@gmail.com','$2b$10$ytno97tXO9WVH1oO6ItnSe6WNwUP0hFXGlf.OYHJwgMdlwvf.29zS','student','active','2026-02-13 13:12:52',NULL),
(5,'Syafrul','classrep@gmail.com','$2b$10$KTPV83io1V4br7FZnA7ql.pZEV74b7E5/S.4.WGUHSi15sszhEb2q','class rep','active','2026-02-26 22:18:11',NULL),
(6,'Wafiq','wafiq@gmail.com','$2b$10$umzNpOIZXBavrOLxcmhJm.QRcpurRP6VeOUsdi.CHviI9AOhUBT3S','student','active','2026-03-02 09:15:32',NULL),
(7,'Hakim','hakim@gmail.com','$2b$10$AZyVb2NJCtse.ZAOxOl0RO2XmvVx062WL3ykqL9LXH/7ZbvUR3DDG','student','active','2026-03-02 09:24:39',NULL),
(8,'Aqilah','aqilah@gmail.com','$2b$10$yxohRz/8hetZZWcdnLmtyuMw.o7XP.0e/pvH9Bk4Pucwe5pxGeIQu','student','active','2026-03-02 09:28:16',NULL),
(9,'Irfan','irfan@gmail.com','$2b$10$jtJVRa0YHOz.CPN28sibReD.BpVaUVrCJ5i5kDoWuJ59Ynq/ymfg.','class rep','active','2026-03-02 14:29:25',NULL),
(10,'Asyraf','acap@gmail.com','$2b$10$Wv4XNF8X4S9aUVMsQFM76u3QvizFUsxw7AXaB8gGpD6tG.xqNoRYi','student','active','2026-03-02 14:34:19',NULL),
(13,'Walid','walid@gmail.com','$2b$10$P13UszXFBn2K1rp1GwRyR.qBQAOVV433kewMY8CPI0qVvpLDpLiJG','class rep','active','2026-03-06 16:07:28',NULL),
(14,'Admin Student Class','adminStudent@gmail.com','$2b$10$DPolOOT//jZd8oRMUNzpuOmn5I1mvupDbEwdb/jFocTS6lgVabN92','admin','active','2026-03-17 13:03:29',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
