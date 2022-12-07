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
	numerofournisseur CHAR(4) PRIMARY KEY,
	nomfournisseur VARCHAR(20),
	adressefournisseur VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS Client(
	numeroclient CHAR(4) PRIMARY KEY,
	nomclient VARCHAR(20) NOT NULL,
	prenomclient VARCHAR(20) NOT NULL,
	adressecourrielclient VARCHAR(200) NOT NULL,
	rueclient VARCHAR(200) NOT NULL,
	villeclient VARCHAR(20) NOT NULL,
	codepostalclient VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Telephone(
	numeroclient CHAR(4),
	numerodetelephone VARCHAR(15),
	PRIMARY KEY (numerodetelephone, numeroclient),
	CONSTRAINT FK_Telephne_Client FOREIGN KEY (numeroclient) REFERENCES Client
);

CREATE SEQUENCE tag_seq START WITH 101;

CREATE TABLE IF NOT EXISTS Planrepas(
	numeroplan TEXT NOT NULL DEFAULT 'P' || nextval('tag_seq') UNIQUE,
	categorie VARCHAR(20),
	frequence VARCHAR(20),
	nbrpersonnes INT,
	nbrcalories INT,
	prix INT NOT NULL,
	numerofournisseur CHAR(4) NOT NULL, 
	CONSTRAINT FK_Planrepas_Fournisseur FOREIGN KEY (numerofournisseur) REFERENCES Fournisseur
);

CREATE TABLE IF NOT EXISTS Abonner(
	numeroclient CHAR(4),
	numeroplan CHAR(4),
	duree VARCHAR(20) NOT NULL,
	PRIMARY KEY (numeroclient, numeroplan),
	CONSTRAINT FK_Abonner_Client FOREIGN KEY (numeroclient) REFERENCES Client,
	CONSTRAINT FK_Abonner_Planrepas FOREIGN KEY (numeroplan) REFERENCES Planrepas ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Pescetarien(
	numeroplan CHAR(4) PRIMARY KEY,
	typepoisson VARCHAR(20),
	CONSTRAINT FK_Pescetarien_Planrepas FOREIGN KEY (numeroplan) REFERENCES Planrepas ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Vegetarien(
	numeroplan CHAR(4) PRIMARY KEY,
	typederepas VARCHAR(20),
	CONSTRAINT FK_Vegetarien_Planrepas FOREIGN KEY (numeroplan) REFERENCES Planrepas ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Famille(
	numeroplan CHAR(4) PRIMARY KEY,
	CONSTRAINT FK_Famille_Planrepas FOREIGN KEY (numeroplan) REFERENCES Planrepas ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Facile(
	numeroplan CHAR(4) PRIMARY KEY,
	CONSTRAINT FK_Facile_Famille FOREIGN KEY (numeroplan) REFERENCES Famille ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS Rapide(
	numeroplan CHAR(4) PRIMARY KEY,
	CONSTRAINT FK_Rapide_Famille FOREIGN KEY (numeroplan) REFERENCES Famille ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Kitrepas(
	numerokitrepas CHAR(4) PRIMARY KEY,
	description VARCHAR(300) NOT NULL,
	numeroplan CHAR(4) NOT NULL,
	CONSTRAINT FK_Kitrepas_Planrepas FOREIGN KEY (numeroplan) REFERENCES Planrepas ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Ingredient(
	numeroingredient CHAR(4) PRIMARY KEY,
	nomingredient VARCHAR(20) NOT NULL,
	paysingredient VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Contenir(
	numeroingredient CHAR(4), 
	numerokitrepas CHAR(4),
	PRIMARY KEY (numeroingredient, numerokitrepas),
	CONSTRAINT FK_Contenir_Ingredient FOREIGN KEY (numeroingredient) REFERENCES Ingredient,
	CONSTRAINT FK_Contenir_Kitrepas FOREIGN KEY (numerokitrepas) REFERENCES Kitrepas ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Image(
	numeroimage CHAR(5) PRIMARY KEY,
	donnees VARCHAR(300),
	numerokitrepas CHAR(4) NOT NULL,
	CONSTRAINT FK_Image_Kitrepas FOREIGN KEY (numerokitrepas) REFERENCES Kitrepas ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Etape(
	numerokitrepas CHAR(4) PRIMARY KEY,
	descriptionetape VARCHAR(300) NOT NULL,
	dureeetape VARCHAR(20) NOT NULL,
	êtreconposeede VARCHAR(20),
	CONSTRAINT FK_Etape_Kitrepas FOREIGN KEY (numerokitrepas) REFERENCES Kitrepas ON DELETE CASCADE
);

INSERT INTO Fournisseur VALUES ('F001', 'UberEats', '9970 Chem. de la Côte-de-Liesse');
INSERT INTO Fournisseur VALUES ('F002', 'DoorDash', '5995 Boul Gouin O Suite #218');
INSERT INTO Fournisseur VALUES ('F003', 'AB Transport', '1000 Rue Sherbrooke O');
INSERT INTO Fournisseur VALUES ('F004', 'QC Transport', '234 Rue Sainte-Catherine');
INSERT INTO Fournisseur VALUES ('F005', 'Foodora', '9402 Rue Ontario E');
INSERT INTO Fournisseur VALUES ('F006', 'SkipTheDishes', '1000 902 avenue du Mont-Royal E');
INSERT INTO Fournisseur VALUES ('F007', 'JustEat', '2314 Rue Sainte Hyacinthe');

INSERT INTO Client VALUES ('C001', 'Tero', 'Fadi', 'faditero@gmail.com', '398 Rue Ouimet', 'Montreal', 'H4L5M9');
INSERT INTO Client VALUES ('C002', 'Chazbek', 'Rachad', 'rachachazbek@gmail.com', '15 Boulevard La Fayette', 'Longueuil', 'J4K0B2');
INSERT INTO Client VALUES ('C003', 'Sidi', 'Ahmed', 'ahmed.sidi@polymtl.ca', '2345 Boulevard Edouart Mon Petit', 'Montreal', 'H3H3H3');

INSERT INTO Telephone VALUES ('C001', '514-111-1111');
INSERT INTO Telephone VALUES ('C002', '514-561-7179');
INSERT INTO Telephone VALUES ('C003', '514-568-1345');

INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Mediteranien', '2 Fois par semaine', 1, 1000, 25, 'F001');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Italien', '1 Fois par semaine', 2, 1500, 15, 'F002');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Cetogene', '3 Fois par semaine', 1, 2000, 20, 'F003');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Mix', '2 Fois par semaine', 4, 4000, 17.5, 'F002');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Libanais', '2 Fois par semaine', 3, 2000, 45, 'F004');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Vegan', '1 Fois par semaine', 1, 1000, 25, 'F001');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Vegetarien', '5 Fois par semaine', 2, 1500, 15, 'F002');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Pescetarien', '3 Fois par semaine', 1, 2000, 20, 'F003');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Famille', '2 Fois par semaine', 4, 4000, 17.5, 'F007');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Asiatique', '2 Fois par semaine', 3, 2000, 45, 'F006');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Americain', '1 Fois par semaine', 1, 1000, 25, 'F005');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Mexicain', '5 Fois par semaine', 2, 1500, 15, 'F004');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Francais', '3 Fois par semaine', 1, 2000, 20, 'F007');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Grec', '2 Fois par semaine', 4, 4000, 17.5, 'F006');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Indien', '2 Fois par semaine', 3, 2000, 45, 'F005');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Japonais', '1 Fois par semaine', 1, 1000, 25, 'F004');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Chinois', '5 Fois par semaine', 2, 1500, 15, 'F003');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Marocain', '3 Fois par semaine', 1, 2000, 20, 'F006');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Turc', '2 Fois par semaine', 4, 4000, 17.5, 'F001');
INSERT INTO Planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES ('Libanais', '2 Fois par semaine', 3, 2000, 45, 'F004');

INSERT INTO Abonner VALUES ('C001', 'P101', '1 Mois');
INSERT INTO Abonner VALUES ('C001', 'P104', '1 Mois');
INSERT INTO Abonner VALUES ('C001', 'P103', '3 Semaines');
INSERT INTO Abonner VALUES ('C002', 'P102', '2 Semaines');
INSERT INTO Abonner VALUES ('C003', 'P103', '1 An');
INSERT INTO Abonner VALUES ('C002', 'P105', '4 Semaines');

INSERT INTO Pescetarien VALUES ('P101', 'Saumon');
INSERT INTO Pescetarien VALUES ('P102', 'Truite');

INSERT INTO Vegetarien VALUES ('P102', 'Lasagne aux Epinards');
INSERT INTO Vegetarien VALUES ('P103', 'Salade de Quinoa');

INSERT INTO Famille VALUES ('P102');
INSERT INTO Famille VALUES ('P103');


INSERT INTO Facile VALUES ('P102');

INSERT INTO Rapide VALUES ('P103');

INSERT INTO Kitrepas VALUES ('K001', 'Savoureux', 'P101');
INSERT INTO Kitrepas VALUES ('K002', 'Sweet et Cremeux!', 'P102');
INSERT INTO Kitrepas VALUES ('K003', 'Sweet', 'P103');
INSERT INTO Kitrepas VALUES ('K004', 'Suprise!', 'P104');
INSERT INTO Kitrepas VALUES ('K005', 'Basic', 'P107');

INSERT INTO Ingredient VALUES ('I001', 'Chili', 'Mexique');
INSERT INTO Ingredient VALUES ('I002', 'Cury', 'Inde');
INSERT INTO Ingredient VALUES ('I003', 'Riz', 'Chine');
INSERT INTO Ingredient VALUES ('I004', 'Tomate', 'Italie');
INSERT INTO Ingredient VALUES ('I005', 'Farine', 'France');
INSERT INTO Ingredient VALUES ('I006', 'Poulet', 'Etats-Unis');
INSERT INTO Ingredient VALUES ('I007', 'Poisson', 'Etats-Unis');

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

INSERT INTO Etape VALUES ('K001', 'Couper les legumes en des morceaux', '5 minutes', '4 etapes');
INSERT INTO Etape VALUES ('K002', 'Prepare la sauce teriaki', '3 heures', '2 etapes');
INSERT INTO Etape VALUES ('K003', 'Marine le Saumon avec votre sauce pendant toute la nuit', '2 heures', NULL);
INSERT INTO Etape VALUES ('K004', 'Ajouter du soy sauce', 'Instant', NULL);