-- Database: TP4_Livraison

-- DROP DATABASE IF EXISTS "TP4_Livraison";

-- TODO ADD UNIQUE CONSTRAINTS TO RELATIVE FIELDS
-- TODO ADD CHECK CONSTRAINTS TO RELATIVE FIELDS
-- TODO ADD SERIAL TO RELATIVE FIELDS (IDs and auto-incremented fields)

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
	numérofournisseur CHAR(4) PRIMARY KEY,
	nomfournisseur VARCHAR(20),
	adressefournisseur VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS Client(
	numéroclient CHAR(4) PRIMARY KEY,
	nomclient VARCHAR(20) NOT NULL,
	prénomclient VARCHAR(20) NOT NULL,
	adressecourrielclient VARCHAR(200) NOT NULL,
	rueclient VARCHAR(200) NOT NULL,
	villeclient VARCHAR(20) NOT NULL,
	codepostalclient VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Téléphone(
	numéroclient CHAR(4),
	numérodetéléphone VARCHAR(15),
	PRIMARY KEY (numérodetéléphone, numéroclient),
	CONSTRAINT FK_Téléphne_Client FOREIGN KEY (numéroclient) REFERENCES Client
);

CREATE TABLE IF NOT EXISTS Planrepas(
	numéroplan CHAR(4) PRIMARY KEY,
	catégorie VARCHAR(20),
	fréquence VARCHAR(20),
	nbrpersonnes INT,
	nbrcalories INT,
	prix INT NOT NULL,
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
	description VARCHAR(300) NOT NULL,
	numéroplan CHAR(4) NOT NULL,
	CONSTRAINT FK_Kitrepas_Planrepas FOREIGN KEY (numéroplan) REFERENCES Planrepas
);

CREATE TABLE IF NOT EXISTS Ingrédient(
	numéroingrédient CHAR(4) PRIMARY KEY,
	nomingrédient VARCHAR(20) NOT NULL,
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
	numéroimage CHAR(5) PRIMARY KEY,
	données VARCHAR(300),
	numérokitrepas CHAR(4) NOT NULL,
	CONSTRAINT FK_Image_Kitrepas FOREIGN KEY (numérokitrepas) REFERENCES Kitrepas
);

CREATE TABLE IF NOT EXISTS Étape(
	numérokitrepas CHAR(4) PRIMARY KEY,
	descriptionétape VARCHAR(300) NOT NULL,
	duréeétape VARCHAR(20) NOT NULL,
	êtreconposéede VARCHAR(20),
	CONSTRAINT FK_Étape_Kitrepas FOREIGN KEY (numérokitrepas) REFERENCES Kitrepas
);

INSERT INTO Fournisseur VALUES ('F001', 'UberEats', '9970 Chem. de la Côte-de-Liesse');
INSERT INTO Fournisseur VALUES ('F002', 'DoorDash', '5995 Boul Gouin O Suite #218');
INSERT INTO Fournisseur VALUES ('F003', 'AB Transport', '1000 Rue Sherbrooke O');
INSERT INTO Fournisseur VALUES ('F004', 'QC Transport', '234 Rue Sainte-Catherine');

INSERT INTO Client VALUES ('C001', 'Tero', 'Fadi', 'faditero@gmail.com', '398 Rue Ouimet', 'Montréal', 'H4L5M9');
INSERT INTO Client VALUES ('C002', 'Chazbek', 'Rachad', 'rachachazbek@gmail.com', '15 Boulevard La Fayette', 'Longueuil', 'J4K0B2');
INSERT INTO Client VALUES ('C003', 'Sidi', 'Ahmed', 'ahmed.sidi@polymtl.ca', '2345 Boulevard Édouart Mon Petit', 'Montréal', 'H3H3H3');

INSERT INTO Téléphone VALUES ('C001', '514-111-1111');
INSERT INTO Téléphone VALUES ('C002', '514-561-7179');
INSERT INTO Téléphone VALUES ('C003', '514-568-1345');

INSERT INTO Planrepas VALUES ('P001', 'Méditéranien', '2 Fois par semaine', 1, 1000, 25, 'F001');
INSERT INTO Planrepas VALUES ('P002', 'Italien', '1 Fois par semaine', 2, 1500, 15, 'F002');
INSERT INTO Planrepas VALUES ('P003', 'cétogène', '3 Fois par semaine', 1, 2000, 20, 'F003');
INSERT INTO Planrepas VALUES ('P004', 'Mix', '2 Fois par semaine', 4, 4000, 17.5, 'F002');
INSERT INTO Planrepas VALUES ('P005', 'Libanais', '2 Fois par semaine', 3, 2000, 45, 'F004');

INSERT INTO Abonner VALUES ('C001', 'P001', '1 Mois');
INSERT INTO Abonner VALUES ('C001', 'P004', '1 Mois');
INSERT INTO Abonner VALUES ('C001', 'P003', '3 Semaines');
INSERT INTO Abonner VALUES ('C002', 'P002', '2 Semaines');
INSERT INTO Abonner VALUES ('C003', 'P003', '1 An');
INSERT INTO Abonner VALUES ('C002', 'P005', '4 Semaines');

INSERT INTO Pescétarien VALUES ('P001', 'Saumon');
INSERT INTO Pescétarien VALUES ('P002', 'Truite');

INSERT INTO Végétarien VALUES ('P002', 'Lasagne aux Épinards');
INSERT INTO Végétarien VALUES ('P003', 'Salade de Quinoa');

INSERT INTO Famille VALUES ('P002');
INSERT INTO Famille VALUES ('P003');

INSERT INTO Facile VALUES ('P002');

INSERT INTO Rapide VALUES ('P003');

INSERT INTO Kitrepas VALUES ('K001', 'Savoureux', 'P001');
INSERT INTO Kitrepas VALUES ('K002', 'Sweet et Crémeux!', 'P002');
INSERT INTO Kitrepas VALUES ('K003', 'Sweet', 'P003');
INSERT INTO Kitrepas VALUES ('K004', 'Suprise!', 'P004');
INSERT INTO Kitrepas VALUES ('K005', 'Basic', 'P007');

INSERT INTO Ingrédient VALUES ('I001', 'Chili', 'Mexique');
INSERT INTO Ingrédient VALUES ('I002', 'Cury', 'Inde');
INSERT INTO Ingrédient VALUES ('I003', 'Riz', 'Chine');
INSERT INTO Ingrédient VALUES ('I004', 'Tomate', 'Italie');
INSERT INTO Ingrédient VALUES ('I005', 'Farine', 'France');
INSERT INTO Ingrédient VALUES ('I006', 'Poulet', 'États-Unis');
INSERT INTO Ingrédient VALUES ('I007', 'Poisson', 'États-Unis');

INSERT INTO Contenir VALUES ('I001', 'K001');
INSERT INTO Contenir VALUES ('I002', 'K001');
INSERT INTO Contenir VALUES ('I003', 'K001');
INSERT INTO Contenir VALUES ('I004', 'K002');
INSERT INTO Contenir VALUES ('I005', 'K002');
INSERT INTO Contenir VALUES ('I006', 'K002');
INSERT INTO Contenir VALUES ('I004', 'K003');
INSERT INTO Contenir VALUES ('I007', 'K003');
INSERT INTO Contenir VALUES ('I001', 'K004');
INSERT INTO Contenir VALUES ('I002', 'K004');
INSERT INTO Contenir VALUES ('I007', 'K004');

INSERT INTO Image VALUES ('Im001', '0x12AB31C4', 'K001');
INSERT INTO Image VALUES ('Im002', '0x95DB42B4', 'K002');
INSERT INTO Image VALUES ('Im003', '0xABD21457', 'K003');
INSERT INTO Image VALUES ('Im004', '0x12AB31C4', 'K004');

INSERT INTO Étape VALUES ('K001', 'Couper les légumes en des morceaux', '5 minutes', '4 étapes');
INSERT INTO Étape VALUES ('K002', 'Prépare la sauce teriaki', '3 heures', '2 étapes');
INSERT INTO Étape VALUES ('K003', 'Mariné le Saumon avec votre sauce pendant toute la nuit', '2 heures', NULL);
INSERT INTO Étape VALUES ('K004', 'Ajouter du soy sauce', 'Instant', NULL);