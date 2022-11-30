-- 4.1- Affichez les numéros (numéroclient) et les noms (nomclient) des clients qui ont commandé un repas 
-- avec un prix compris entre 20 dollars et 40 dollars.  (2pts) 
SELECT C.numéroclient, C.nomclient 
FROM Client C, Abonner A, Planrepas P
WHERE C.numéroclient = A.numéroclient AND A.numeroplan = P.numeroplan AND P.prix BETWEEN 20 AND 40;


-- 4.2- Afficher les numéros des plans repas (numeroplan) qui ne proviennent pas du fournisseur au nom de 
-- 'QC Transport'. (2pts) 
SELECT P.numeroplan
FROM Planrepas P, Fournisseur F
WHERE P.numerofournisseur = F.numerofournisseur AND F.nomfournisseur != 'QC Transport';

-- 4.3-  Affichez  la  liste  des  numéros  des  plans  Famille  (numeroplan)  dont  la  categorie  du  plan  repas 
-- correspond à 'cétogène'. (2pts) 
SELECT F.numeroplan 
FROM Famille F, Planrepas P
WHERE P.numeroplan = F.numeroplan AND P.categorie = 'cétogène';

-- 4.4- Affichez le nombre de fournisseurs n’ayant pas de nom dans leur dossier (la valeur de nomfournisseur 
-- est NULL). (2pts) 
SELECT count(*) FROM fournisseur
Where nomfournisseur IS NULL

-- 4.5- Affichez les noms des fournisseurs (nomfournisseur) ayant fait des livraisons de plans repas dont le 
-- montant est supérieur aux livraisons faites par le fournisseur dont le nom est 'AB Transport'. (2pts) 
SELECT F.nomfournisseur
FROM Fournisseur F, Planrepas P
WHERE F.numerofournisseur = P.numerofournisseur AND P.prix > (SELECT P.prix FROM Fournisseur F, Planrepas P WHERE F.nomfournisseur = 'AB Transport' AND F.numerofournisseur = P.numerofournisseur);

-- 4.6- Affichez les noms des fournisseurs (nomfournisseur), les adresses (adressefournisseur) et le montant 
-- total des prix des livraisons de plans repas des fournisseurs ayant les deux plus larges montants de livraison 
-- sur la plateforme. (2pts) 
SELECT F.nomfournisseur, F.adressefournisseur, SUM(P.prix) AS 'Montant total'
FROM Fournisseur F, Planrepas P
WHERE F.numerofournisseur = P.numerofournisseur
GROUP BY F.nomfournisseur, F.adressefournisseur
ORDER BY SUM(P.prix) DESC
LIMIT 2;

-- 4.7- Affichez le nombre de kit repas qui n’ont jamais été réservés chez les fournisseurs. (2pts)
SELECT count(*) 
FROM Kitrepas K
WHERE K.numeroplan NOT IN (SELECT P.numeroplan FROM Planrepas P);

-- 4.8- Affichez les numéros (numéroclient), les noms (nomclient) et les prénoms (prénomclient) des clients 
-- dont  le  prénom  ne  commence  pas  par  une  voyelle  (en  majuscule  ou  en  minuscule)  et qu’ils habitent 
-- (villeclient)  à  la  même  adresse  (adressefournisseur)  que  le  fournisseur  'Benjamin'.  Ordonnez  ces  clients 
-- alphabétiquement selon le nom. (2pts)

--PostGre error
SELECT C.numéroclient, C.nomclient, C.prénomclient
FROM Client C, Fournisseur F
WHERE C.villeclient = F.villefournisseur AND C.adresseclient = F.adressefournisseur AND F.nomfournisseur = 'Benjamin' AND C.prénomclient NOT REGEXP '^[aeiouyAEIOUY]';

-- 4.9-  Affichez  le  pays  des  ingrédients  (paysingrédient)  et  le  nombre  d’ingrédients  par  pays  dont  le 
-- paysingrédient ne contient pas la lettre g à la troisième position de la fin; triés par ordre décroissant selon 
-- le pays de l’ingrédient (paysingrédient). (2pts) 
SELECT I.paysingrédient, count(*) AS 'Nombre d''ingrédients'
FROM Ingrédient I
WHERE I.paysingrédient NOT LIKE '%g__' 
GROUP BY I.paysingrédient
ORDER BY I.paysingrédient DESC;

-- 4.10-  Créez  une  vue  'V_fournisseur'  contenant  la  categorie  du  plan  repas  'V_categorie', l’adresse  du 
-- fournisseur 'V_adresse' et le total des prix de tous les plans repas desservis par ce fournisseur 'V_tot'. Cette 
-- vue  doit  uniquement  contenir  les  fournisseurs  dont  V_tot  est  supérieur  à  12  500$  et  dont  le  nom  de  la 
-- categorie du plan repas contient la lettre 'e' et la lettre 'o' à la troisième position de la fin; triés par ordre 
-- croissant  selon  le  nom  de  la  categorie  du  plan  repas  et  par  ordre  décroissant  selon  'V_tot'.  Finalement, 
-- afficher le résultat de cette vue. 5pts 
CREATE VIEW V_fournisseur
AS
SELECT P.categorie AS 'V_categorie', F.adressefournisseur AS 'V_adresse', SUM(P.prix) AS 'V_tot' 
FROM Fournisseur F, Planrepas P
WHERE F.numerofournisseur = P.numerofournisseur AND P.categorie LIKE '%e__o' --Check if the category contains the letters 'e' and 'o' at the third position of the end
GROUP BY P.categorie, F.adressefournisseur --Group by the category and the address
HAVING SUM(P.prix) > 12500 --Having the sum of the prices greater than 12500$
ORDER BY P.categorie ASC, V_tot DESC; --Order by the category and the sum of the prices