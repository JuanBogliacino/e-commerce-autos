-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-03-2023 a las 16:00:02
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `e-commerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autos`
--

CREATE TABLE `autos` (
  `id` int(11) NOT NULL,
  `model` varchar(45) NOT NULL,
  `price` double NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `marca_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `autos`
--

INSERT INTO `autos` (`id`, `model`, `price`, `discount`, `description`, `img`, `user_id`, `marca_id`) VALUES
(1, 'Renault Twingo', 2061935, 30, 'es un puto Twingo joder mola que flipas', 'twingo.jpg', 1, 2),
(2, 'Ford Focus', 309289, 0, '', 'fordFocus.jpg-1677526359631.jpg', 3, 6),
(5, 'Mercedes-AMG GT R', 309289, 25, '', 'mercedesAMG-GTR.jpg', 8, 4),
(7, 'Porsche 911', 309289, 10, 'porsche nashex usado por messi', 'porsche-911jpg.jpg-1677526237390.jpg', 6, 11),
(8, 'Honda NSX', 309289, 20, '', 'hondaNSX.jpg', 4, 8),
(9, 'Lamborghini huracán', 309289, 20, 'Lamborghini amarillo bacano', 'lamborginiHuracan.jpg', 9, 9),
(10, 'Lamborghini Aventador', 309289, 0, '', 'lamborginiAventador.jpg-1677525660262.jpg', 7, 9),
(11, 'Ferrari F8', 309289, 30, '', 'ferrari-1.jpg', 7, 1),
(31, 'Ferrari F12', 25000, 20, 'es brillante', 'ferrari-amarillo.jpg-1677525869905.jpg', NULL, 1),
(40, 'Porsche Cayman', 30000, 0, 'es brillante', 'porsche-cayman.jpg-1677525368486.jpg', NULL, 11),
(75, 'Toyota Supra', 100000, 50, '', 'toyota-supra.jpg-1677617475281.jpg', NULL, 3),
(76, 'Lamborghini Murcielago', 100000, 20, '', 'LamborghiniMurcielago.jpg-1677634495237.jpg', NULL, 9),
(77, 'Lamborghini Veneno', 100000, 20, '', 'lamborginhiVeneno.jpg-1677634837765.jpg', NULL, 9),
(79, 'Lamborghini Diablo', 12000, 0, '', 'Lamborghini-Diablo.jpg-1677642654959.jpg', NULL, 9),
(80, 'Ferrari 448', 100000, 0, '', 'ferrari448.jpg-1677642324934.jpg', NULL, 1),
(81, 'Ferrari LaFerrari', 100000, 15, '', 'ferrariLaferrari.jpg-1677642501536.jpg', NULL, 1),
(82, 'Fenec', 1000000, 1, 'es el puto Fenec tio', 'Fenec..jpg-1677797863951.jpg', 11, 6),
(96, 'Honda Deportivo 2000', 250000, 30, '', 'Honda2000.jpg-1677798457041.jpg', 11, 8),
(97, 'Audi R8', 10000, 20, '', 'audiR8.jpg-1677798606118.jpg', 11, 5),
(98, 'Ferrari 458', 300000, 15, 'es italiano y brillante ', 'ferrari-458-speciale1.jpg-1677798897384.jpg', 11, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id`, `name`) VALUES
(1, 'Ferrari'),
(2, 'Renault'),
(3, 'Toyota'),
(4, 'Mercedes'),
(5, 'Audi'),
(6, 'Ford'),
(7, 'Fiat'),
(8, 'Honda'),
(9, 'Lamborghini'),
(10, 'Peugeot'),
(11, 'Porsche');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `mail`, `password`) VALUES
(1, 'Messi', 'lionelmessi@gmail.com', 'passwordmessi'),
(2, 'Neymar', 'neymarJR@gmail.com', 'passwordneymar'),
(3, 'Suarez', 'luizsuarez@gmail.com', 'passwordsuarez'),
(4, 'Ronaldo', 'cr7@gmail.com', 'passwordcr7'),
(5, 'Pedro', 'pedroleon@gmail.com', 'passwordpedro'),
(6, 'Iniesta', 'andresiniesta@gmail.com', 'passwordiniesta'),
(7, 'Xavi', 'xavihernandez@gmail.com', 'passwordxavi'),
(8, 'Davo', 'davooxeneize@gmail.com', 'passworddavo'),
(9, 'Lautaro', 'lautaromartinez@gmail.com', 'passwordlautaro'),
(10, 'Will', 'willsmith@gmail.com', 'passwordwill'),
(11, 'juan', 'juanboglia12@gmail.com', 'contraseña123'),
(12, 'dibu', 'dibumartinez@gmail.com', 'contraseña123'),
(15, 'zidane', 'zidane@gmail.com', 'password124'),
(16, 'wilirexXD', 'wilirex@gmail.com', 'contraseña123'),
(17, 'maldini', 'maldini@gmail.com', 'contraseña123'),
(18, 'agusneta', 'agusneta@gmail.com', '12345'),
(19, 'lebron', 'lebronjames@gmail.com', '12345'),
(25, 'usuarioName1', 'usuario1@gmail.com', '$2a$10$tbpAX94LiGBHLk2coDNXn.5uafRE1mj1uol1Yz'),
(26, 'usuarioName2', 'usuario2@gmail.com', '$2a$10$cvG5W2GIflbT9f.byDN5AO4XLDEz40Lna94x88'),
(27, 'usuarioName3', 'usuario3@gmail.com', '$2a$10$UrCub8hO/qG78XZzx.KYuu4QFNyCZxEC4cFSqy'),
(28, 'usuarioName4', 'usuario4@gmail.com', '123'),
(29, 'usuarioName5', 'usuario5@gmail.com', '$2a$10$IfPTYPuShZOeXsGwhxgxMOsXPHWv2PP678H.SJ');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autos`
--
ALTER TABLE `autos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idautos_idx` (`marca_id`),
  ADD KEY `idusers_idx` (`user_id`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autos`
--
ALTER TABLE `autos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `autos`
--
ALTER TABLE `autos`
  ADD CONSTRAINT `idmarcas` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idusers` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
