CREATE TABLE IF NOT EXISTS `entradas` (
  `nroEntrada` INTEGER PRIMARY KEY AUTOINCREMENT,
  `asientoNro` INTEGER NOT NULL,
  `asientoFila` TEXT NOT NULL,
  `idUsuario` INTEGER NOT NULL,
  `idFuncion` INTEGER NOT NULL,
  `fechaCompra` DATE NOT NULL,
  `comprada` INTEGER DEFAULT 0 CHECK (`comprada` IN (0, 1)),
  FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  FOREIGN KEY (`idFuncion`) REFERENCES `funciones` (`idFuncion`)
);

INSERT INTO `entradas` (`asientoNro`, `asientoFila`, `idUsuario`, `idFuncion`, `fechaCompra`, `comprada`) VALUES
(1, 'a', 1, 1, '2023-07-03', 1),
(2, 'a', 1, 1, '2023-07-03', 1),
(3, 'a', 1, 1, '2023-07-03', 1),
(1, 'b', 1, 1, '2023-07-03', 1),
(2, 'b', 1, 1, '2023-07-03', 1),
(3, 'b', 1, 1, '2023-07-03', 1),
(1, 'd', 2, 1, '2023-07-03', 1);


CREATE TABLE IF NOT EXISTS `funciones` (
  `idFuncion` INTEGER PRIMARY KEY AUTOINCREMENT,
  `horario` TEXT NOT NULL,
  `horaFinal` TEXT NOT NULL,
  `fecha` DATE NOT NULL,
  `idPelicula` INTEGER NOT NULL,
  FOREIGN KEY (`idPelicula`) REFERENCES `peliculas` (`idPelicula`)
);

INSERT INTO `funciones` (`horario`, `horaFinal`, `fecha`, `idPelicula`) VALUES
('14:00:00', '17:00:00', '2023-07-11', 1),
('17:00:00', '20:00:00', '2023-07-11', 2),
('20:00:00', '23:00:00', '2023-07-11', 3),
('23:00:00', '03:00:00', '2023-07-11', 3),
('14:00:00', '17:00:00', '2023-07-12', 2),
('17:00:00', '20:00:00', '2023-07-12', 2),
('20:00:00', '23:00:00', '2023-07-12', 3),
('23:00:00', '02:00:00', '2023-07-12', 1),
('14:00:00', '17:00:00', '2023-07-13', 1),
('17:00:00', '20:00:00', '2023-07-13', 2),
('20:00:00', '23:00:00', '2023-07-13', 1),
('23:00:00', '03:00:00', '2023-07-13', 3),
('14:00:00', '17:00:00', '2023-07-14', 3),
('17:00:00', '20:00:00', '2023-07-14', 2),
('20:00:00', '23:00:00', '2023-07-14', 3),
('23:00:00', '02:00:00', '2023-07-14', 1),
('14:00:00', '17:00:00', '2023-07-15', 3),
('17:00:00', '20:00:00', '2023-07-15', 2),
('20:00:00', '23:00:00', '2023-07-15', 1),
('23:00:00', '03:00:00', '2023-07-15', 1),
('14:00:00', '17:00:00', '2023-07-16', 2),
('17:00:00', '20:00:00', '2023-07-16', 2),
('20:00:00', '23:00:00', '2023-07-16', 3),
('23:00:00', '02:00:00', '2023-07-16', 1),
('14:00:00', '17:00:00', '2023-07-17', 2),
('17:00:00', '20:00:00', '2023-07-17', 2),
('20:00:00', '23:00:00', '2023-07-17', 1),
('23:00:00', '02:00:00', '2023-07-17', 3);

CREATE TABLE IF NOT EXISTS `peliculas` (
  `idPelicula` INTEGER PRIMARY KEY AUTOINCREMENT,
  `titulo` TEXT NOT NULL,
  `genero` TEXT NOT NULL,
  `duracion` TEXT NOT NULL,
  `descripcion` TEXT NOT NULL,
  `urlPoster` TEXT NOT NULL
);

INSERT INTO `peliculas` (`titulo`, `genero`, `duracion`, `descripcion`, `urlPoster`) VALUES
('Spider-Man: A través del Spider-Verso', 'Acción, Aventura', '02:20:00', 'Después de reunirse con Gwen Stacy, Miles Morales, el amigable Spider-Man del vecindario de tiempo c', 'https://image.tmdb.org/t/p/w154/qqXTerrQYwg9pIMhb1GFbxa3WUz.jpg'),
('Barbie', 'Comedia, Fantasía', '01:54:00', 'Una muñeca que vive en Barbieland es expulsada al mundo real por no ser lo suficientemente perfect', 'https://image.tmdb.org/t/p/w154/fNtqD4BTFj0Bgo9lyoAtmNFzxHN.jpg'),
('Mission: Impossible - Dead Reckoning Part One', 'Acción, Aventura', '02:44:00', 'Ethan Hunt y su equipo del FMI, se embarcan en su misión más peligrosa hasta la fecha', 'https://image.tmdb.org/t/p/w154/83sGKvCv2T2CulYbd40Aeduc7n2.jpg');

CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nombre` TEXT NOT NULL,
  `apellido` TEXT NOT NULL,
  `dni` INTEGER NOT NULL,
  `email` TEXT NOT NULL
);

INSERT INTO `usuarios` (`nombre`, `apellido`, `dni`, `email`) VALUES
('victor', 'usuario1', 11111111, 'camposmancilla@outlook.com'),
('jesus', 'usuario2', 22222222, 'sebastian.geronimoo@gmail.com'),
('ramiro', 'usuario3', 33333333, 'flechamenescardi@gmail.com');

CREATE INDEX IF NOT EXISTS `idx_idUsuario` ON `entradas` (`idUsuario`);
CREATE INDEX IF NOT EXISTS `idx_idFuncion` ON `entradas` (`idFuncion`);
CREATE INDEX IF NOT EXISTS `idx_idPelicula` ON `funciones` (`idPelicula`);
