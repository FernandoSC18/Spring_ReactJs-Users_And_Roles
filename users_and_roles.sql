--
-- Base de datos: `users_and_roles`
--
 
DROP DATABASE IF EXISTS `users_and_roles`;
CREATE DATABASE `users_and_roles`;
USE `users_and_roles`;

SET NAMES utf8;
SET character_set_client = utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu_routes`
--

CREATE TABLE `menu_routes` (
  `route_id` bigint(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `menu_routes`
--

INSERT INTO `menu_routes` (`route_id`, `name`, `description`) VALUES
(1, 'Inicio', 'Pagina Principal'),
(2, 'Usuarios', 'Permite administrar los usuarios, crear, eliminar, cambiar roles.'),
(3, 'Roles', 'Gestiona los roles que se pueden asignar a un usuario, se pueden crear, eliminar y editar estos mismos.'),
(4, 'Configuraciones', 'Opciones del sistema, se puede editar el tiempo de sesiones y algunos otros ajustes.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `role_id` bigint(5) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(250) NOT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'APP',
  `list_menus_allows` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`role_id`, `name`, `description`, `type`, `list_menus_allows`) VALUES
(1, 'ROLE_DEV', 'este rol tiene acceso a todo, y existe para funciones de desarrollo y configuraciones del mismo, el usuario con este rol se complementa con los roles de tipo SYSTEM_DB de esta misma tabla.', 'SYSTEM', '1,2,3,4'),
(2, 'ROLE_ADMIN', 'tiene acceso a todas las paginas del menu, excepto a las que son para fines de desarrollo', 'SYSTEM', '1,2,3'),
(3, 'ROLE_USER', 'Tiene acceso a paginas especificas', 'SYSTEM', '1,2'),
(4, 'ROLE_PUT', 'PERMITE EDITAR EN LA DB', 'SYSTEM_DB', ''),
(5, 'ROLE_POST', 'PERMITE CREAR EN LA DB', 'SYSTEM_DB', ''),
(6, 'ROLE_DELETE', 'PERMITE ELIMINAR EN LA DB', 'SYSTEM_DB', ''),
(7, 'ROLE_GET', 'PERMITE CONSULTAR DE LA DB', 'SYSTEM_DB', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `system_config`
--

CREATE TABLE `system_config` (
  `config_id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `value` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `system_config`
--

INSERT INTO `system_config` (`config_id`, `name`, `description`, `value`) VALUES
(1, 'session_timeout', 'controla el tiempo de sesión permitido en la pagina', '10');

-- --------------------------------------------------------
 
--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `second_name` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `user_roles` varchar(250) NOT NULL DEFAULT '3,7',
  `password` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `second_name`, `email`, `user_roles`, `password`) VALUES
(1, 'all', 'roles', 'all', 'dev@dev.com', '1,2,3,4,5,6,7', '$2a$10$JPS9QJlNNXY5YvOrzp5HOevg/teRgZPPl4rq4ahUB869b1iU0evFq'),
(2, 'admin', '', '', 'admin@admin.com', '2,3,4,5,6,7', '$2a$10$3SEe315oX7kShnNZ955B9O7pBYbmxMalH/8oOmhuZQqpodyr/0Ef.'),
(3, 'user', '', '', 'user@user.com', '3,7', '$2a$10$hUr0A/V.ZFlZD1G/U/GZT.uCbI9giZlxd8QXRN8YimGXHkJOjWLGO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `menu_routes`
--
ALTER TABLE `menu_routes`
  ADD PRIMARY KEY (`route_id`) USING BTREE,
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indices de la tabla `system_config`
--
ALTER TABLE `system_config`
  ADD PRIMARY KEY (`config_id`); 

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);
    
--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `menu_routes`
--
ALTER TABLE `menu_routes`
  MODIFY `route_id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` bigint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `system_config`
--
ALTER TABLE `system_config`
  MODIFY `config_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

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