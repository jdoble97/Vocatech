-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-01-2021 a las 00:55:28
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vocatech`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `card`
--

CREATE TABLE `card` (
  `ID` int(11) NOT NULL,
  `Learned` tinyint(1) NOT NULL DEFAULT 0,
  `FK_DeckID` int(11) NOT NULL,
  `SpanishName` varchar(50) NOT NULL,
  `EnglishName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `card`
--

INSERT INTO `card` (`ID`, `Learned`, `FK_DeckID`, `SpanishName`, `EnglishName`) VALUES
(1, 0, 1, 'prueba1-1', 'test1-1'),
(2, 0, 1, 'prueba1-2', 'test1-2'),
(3, 0, 1, 'prueba1-3', 'test1-3'),
(4, 0, 2, 'prueba2-1', 'test2-1'),
(5, 0, 2, 'prueba2-2', 'test2-2'),
(6, 0, 2, 'prueba2-1', 'test2-3'),
(7, 0, 3, 'prueba3-1', 'test3-1'),
(8, 0, 3, 'prueba3-2', 'test3-2'),
(9, 0, 3, 'prueba3-3', 'test3-3'),
(10, 0, 4, 'prueba4-1', 'test4-1'),
(11, 0, 4, 'prueba4-2', 'test4-2'),
(12, 0, 4, 'prueba4-3', 'test4-3'),
(13, 0, 5, 'prueba5-1', 'test5-1'),
(14, 0, 5, 'prueba5-2', 'test5-2'),
(15, 0, 5, 'prueba5-3', 'test5-3'),
(18, 0, 18, 'Perro', 'Dog'),
(19, 0, 18, 'Gato', 'Cat'),
(20, 0, 18, 'Cebra', 'Zebra'),
(21, 0, 19, 'Mesa', 'Desk'),
(22, 0, 19, 'Silla', 'Chair'),
(23, 0, 19, 'Nevera', 'Fridge'),
(24, 0, 20, 'Comer', 'Eat'),
(25, 0, 20, 'Beber', 'Drink'),
(26, 0, 20, 'Dormir', 'Sleep'),
(27, 0, 21, 'Rosa', 'Rose'),
(28, 0, 21, 'Tulipán', 'Tulip'),
(29, 0, 21, 'Lirio', 'Lily'),
(30, 0, 22, 'Bombero', 'Firefighter'),
(31, 0, 22, 'Panadero', 'Baker'),
(32, 0, 22, 'Abogado', 'Lawyer');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deck`
--

CREATE TABLE `deck` (
  `FK_Email` varchar(50) NOT NULL,
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Favorite` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `deck`
--

INSERT INTO `deck` (`FK_Email`, `ID`, `Name`, `Favorite`) VALUES
('test@gmail.com', 1, 'test1', 0),
('test@gmail.com', 2, 'test2', 0),
('test@gmail.com', 3, 'test3', 0),
('test@gmail.com', 4, 'test4', 0),
('test@gmail.com', 5, 'test5', 0),
('test@gmail.com', 6, 'test6', 0),
('test@gmail.com', 7, 'test7', 0),
('test@gmail.com', 8, 'test8', 0),
('test@gmail.com', 9, 'test9', 0),
('test@gmail.com', 10, 'test10', 0),
('test@gmail.com', 11, 'test11', 0),
('test@gmail.com', 12, 'test12', 0),
('test@gmail.com', 13, 'test13', 0),
('test@gmail.com', 14, 'test14', 0),
('test@gmail.com', 15, 'test15', 0),
('prueba@gmail.com', 18, 'Animales', 0),
('prueba@gmail.com', 19, 'Casa', 0),
('prueba@gmail.com', 20, 'Verbos', 0),
('prueba@gmail.com', 21, 'Flores', 0),
('prueba@gmail.com', 22, 'Profesiones', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `EMAIL` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Pass` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`EMAIL`, `Name`, `Pass`) VALUES
('prueba@gmail.com', 'Prueba', 'prueba123'),
('test@gmail.com', 'test', 'test123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `deckID` (`FK_DeckID`);

--
-- Indices de la tabla `deck`
--
ALTER TABLE `deck`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `email` (`FK_Email`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`EMAIL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `card`
--
ALTER TABLE `card`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `deck`
--
ALTER TABLE `deck`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `card`
--
ALTER TABLE `card`
  ADD CONSTRAINT `card_ibfk_1` FOREIGN KEY (`FK_DeckID`) REFERENCES `deck` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `deck`
--
ALTER TABLE `deck`
  ADD CONSTRAINT `deck_ibfk_1` FOREIGN KEY (`FK_Email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
