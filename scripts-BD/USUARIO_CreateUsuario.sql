-- USUARIO definition

-- Drop table

-- DROP TABLE USUARIO;

CREATE TABLE USUARIO (
	CODUSUARIO INTEGER NOT NULL,
	NOMEUSUARIO VARCHAR(60),
	SENHA VARCHAR(12),
	MATRICULA INTEGER,
	PRIMARY KEY (CODUSUARIO)
);