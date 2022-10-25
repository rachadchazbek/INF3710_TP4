-- Database: TP4_Livraison

-- DROP DATABASE IF EXISTS "TP4_Livraison";

CREATE DATABASE "TP4_Livraison"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS Fournisseur(
	numérofournissuer CHAR(4) PRIMARY KEY,
	nomfournisseur VARCHAR(20),
	adressefournisseur VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Client(
	numéroclient CHAR(4) PRIMARY KEY,
	nomclient VARCHAR(20),
	prénomclient VARCHAR(20),
	adressecourrielclient VARCHAR(20),
	rueclient VARCHAR(20),
	villeclient VARCHAR(20),
	codepostalclient VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Téléphone(
	numéroclient CHAR(4),
	numérodetéléphone VARCHAR(15),
	PRIMARY KEY (numérodetéléphone, numéroclient),
	CONSTRAINT FK_Téléphne_Client FOREIGN KEY (numérodetéléphone) REFERENCES Client
);

CREATE TABLE IF NOT EXISTS Planrepas(
	numéroplan CHAR(4) PRIMARY KEY,
	catégorie VARCHAR(20),
	fréquence VARCHAR(20),
	nbrpersonnes INT,
	nbrcalories INT,
	prix INT,
	numérofournisseur CHAR(4) NOT NULL, 
	CONSTRAINT FK_Planrepas_Fournisseur FOREIGN KEY (numérofournisseur) REFERENCES Fournisseur
);

CREATE TABLE IF NOT EXISTS Abonner(
	numéroclient CHAR(4),
	numéroplan CHAR(4),
	durée VARCHAR(20) NOT NULL,
	PRIMARY KEY (numéroclient, numéroplan),
	CONSTRAINT FK_Abonner_Client FOREIGN KEY (numéroclient) REFERENCES Client,
	CONSTRAINT FK_Abonner_Planrepas FOREIGN KEY (numéroplan) REFERENCES Planrepas
);

CREATE TABLE IF NOT EXISTS Pescétarien(
	numéroplan CHAR(4) PRIMARY KEY,
	typepoisson VARCHAR(20),
	CONSTRAINT FK_Pescétarien_Planrepas FOREIGN KEY (numéroplan) REFERENCES Planrepas
);

CREATE TABLE IF NOT EXISTS Végétarien(
	numéroplan CHAR(4) PRIMARY KEY,
	typederepas VARCHAR(20),
	CONSTRAINT FK_Végétarien_Planrepas FOREIGN KEY (numéroplan) REFERENCES Planrepas

);

CREATE TABLE IF NOT EXISTS Famille(
	numéroplan CHAR(4) PRIMARY KEY,
	CONSTRAINT FK_Famille_Planrepas FOREIGN KEY (numéroplan) REFERENCES Planrepas
);

CREATE TABLE IF NOT EXISTS Facile(
	numéroplan CHAR(4) PRIMARY KEY,
	CONSTRAINT FK_Facile_Famille FOREIGN KEY (numéroplan) REFERENCES Famille

);

CREATE TABLE IF NOT EXISTS Rapide(
	numéroplan CHAR(4) PRIMARY KEY,
	CONSTRAINT FK_Rapide_Famille FOREIGN KEY (numéroplan) REFERENCES Famille
);

CREATE TABLE IF NOT EXISTS Kitrepas(
	numérokitrepas CHAR(4) PRIMARY KEY,
	description VARCHAR(300),
	numéroplan CHAR(4) NOT NULL,
	CONSTRAINT FK_Kitrepas_Planrepas FOREIGN KEY (numéroplan) REFERENCES Planrepas
);

CREATE TABLE IF NOT EXISTS Ingrédient(
	numéroingrédient CHAR(4) PRIMARY KEY,
	nomingrédient VARCHAR(20),
	paysingrédient VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Contenir(
	numéroingrédient CHAR(4), 
	numérokitrepas CHAR(4),
	PRIMARY KEY (numéroingrédient, numérokitrepas),
	CONSTRAINT FK_Contenir_Ingrédient FOREIGN KEY (numéroingrédient) REFERENCES Ingrédient,
	CONSTRAINT FK_Contenir_Kitrepas FOREIGN KEY (numérokitrepas) REFERENCES Kitrepas
);

CREATE TABLE IF NOT EXISTS Image(
	numéroimage CHAR(4) PRIMARY KEY,
	données VARCHAR(300),
	numérokitrepas CHAR(4) NOT NULL,
	CONSTRAINT FK_Image_Kitrepas FOREIGN KEY (numérokitrepas) REFERENCES Kitrepas
);

CREATE TABLE IF NOT EXISTS Étape(
	numérokitrepas CHAR(4) PRIMARY KEY,
	descriptionétape VARCHAR(300),
	duréeétape VARCHAR(20),
	êtreconposéede VARCHAR(20),
	CONSTRAINT FK_Étape_Kitrepas FOREIGN KEY (numérokitrepas) REFERENCES Kitrepas
);
