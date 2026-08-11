# RÉSUMÉ COMPLET : API + FIREBASE AVEC TYPESCRIPT

## Vue d'ensemble

Ce résumé reprend les notions essentielles sur les API avec **Next.js**, **Firebase** et **TypeScript**.

Il sert de support de révision et présente uniquement les concepts importants, sans entrer dans le code.

---

# PARTIE 1 — LES FONDAMENTAUX DU WEB

## Internet

Internet est un réseau mondial d'ordinateurs qui communiquent entre eux.

Deux acteurs interviennent :

* **Le client** : navigateur web (Chrome, Firefox, Edge...) ou application mobile.
* **Le serveur** : ordinateur qui héberge le site, les API et les données.

## Le protocole HTTP

HTTP est le protocole qui permet au client et au serveur d'échanger des informations.

## Structure d'une requête HTTP

Une requête HTTP contient notamment :

* **URL** : ressource demandée (`/api/users`)
* **Méthode** : action à effectuer (`GET`, `POST`, `PATCH`, `DELETE`)
* **Headers** : informations complémentaires
* **Body** : données envoyées au serveur

## Structure d'une réponse HTTP

Une réponse HTTP contient notamment :

* **Status Code** : résultat de la requête (`200`, `404`, `500`...)
* **Headers** : informations sur la réponse
* **Body** : données renvoyées (JSON, HTML...)

---

# PARTIE 2 — LES MÉTHODES HTTP

## Principe

Chaque méthode HTTP indique au serveur l'action à effectuer.

## GET

Lire ou récupérer des données.

## POST

Créer une nouvelle ressource.

## PUT

Remplacer entièrement une ressource.

## PATCH

Modifier uniquement certains champs.

## DELETE

Supprimer une ressource.

## Analogie : une bibliothèque

Les méthodes HTTP peuvent être vues comme différentes actions réalisées auprès d'une bibliothèque :

* **GET** → consulter un livre ;
* **POST** → ajouter un nouveau livre ;
* **PUT** → remplacer complètement un livre ;
* **PATCH** → modifier certaines informations d'un livre ;
* **DELETE** → supprimer un livre.

---

# PARTIE 3 — JSON

## Définition

Le **JSON (JavaScript Object Notation)** est le format standard utilisé pour échanger des données entre un client et un serveur.

Ses principaux avantages :

* léger ;
* lisible ;
* compatible avec la majorité des langages.

---

# PARTIE 4 — LES API AVEC NEXT.JS

## Le dossier `app/api`

Dans Next.js, chaque dossier situé dans `app/api` devient automatiquement une route API.

### Correspondance

```text
app/api/users/route.ts
        ↓
/api/users
```

```text
app/api/users/[id]/route.ts
        ↓
/api/users/1
```

```text
app/api/tasks/route.ts
        ↓
/api/tasks
```

## `page.tsx` et `route.ts`

`page.tsx` sert principalement à définir une **page de l'application**.

`route.ts` sert à définir une **route API**.

## Les Route Handlers

Les Route Handlers permettent de gérer les différentes méthodes HTTP d'une API Next.js.

Chaque méthode HTTP correspond à une fonction exportée.

---

# PARTIE 5 — RÉCUPÉRATION DES DONNÉES AVEC `fetch()`

## Rôle

`fetch()` permet d'envoyer une requête HTTP vers une API afin de récupérer ou d'envoyer des données.

Il peut notamment être utilisé pour :

* récupérer des données ;
* créer une ressource ;
* modifier une ressource ;
* supprimer une ressource.

## Intérêt du Server Component

L'utilisation d'un Server Component pour récupérer des données permet notamment :

* récupération des données avant l'affichage ;
* meilleur référencement ;
* absence de chargement visible ;
* code plus simple.

---

# PARTIE 6 — FIREBASE

## Présentation

Firebase est une plateforme proposée par Google pour développer rapidement des applications.

Les principaux services utilisés sont :

* **Firestore** : base de données NoSQL.
* **Authentication** : gestion des utilisateurs.
* **Storage** : stockage de fichiers.
* **Hosting** : hébergement.

## Firestore

Firestore est une base de données **NoSQL**.

### Comparaison

```text
SQL        → NoSQL
Tables     → Collections
Lignes     → Documents
```

## Organisation des données

Une **collection** contient plusieurs **documents**.

Chaque document contient les informations d'une ressource.

## Pourquoi utiliser Firebase ?

* mise en place rapide ;
* aucune configuration de serveur ;
* évolutif ;
* synchronisation en temps réel ;
* intégration simple avec Next.js.

---

# PARTIE 7 — ARCHITECTURE DU PROJET

## Les opérations CRUD

Les quatre opérations principales sont :

```text
CREATE
READ
UPDATE
DELETE
```

Elles correspondent aux opérations suivantes :

```text
CREATE
→ POST()
→ addDoc()

READ
→ GET()
→ getDocs()

UPDATE
→ PATCH()
→ updateDoc()

DELETE
→ DELETE()
→ deleteDoc()
```

L'objectif est de comprendre la correspondance entre :

* l'action effectuée par le client ;
* la méthode HTTP utilisée par l'API ;
* l'opération réalisée dans Firebase.

---

# PARTIE 8 — TYPESCRIPT

## Pourquoi TypeScript ?

TypeScript apporte plusieurs avantages :

* détection des erreurs avant l'exécution ;
* meilleure documentation du code ;
* autocomplétion dans l'éditeur ;
* maintenance facilitée.

## `.ts` et `.tsx`

* `.ts` : fichier TypeScript sans JSX.
* `.tsx` : fichier TypeScript pouvant contenir du JSX et des composants React.

## Les principaux types

### Interface

Une interface définit la structure d'un objet.

Elle permet notamment de décrire les données manipulées par l'application.

### Type

`type` permet de créer un type personnalisé.

### Props

Les Props définissent les données reçues par un composant React.

Elles permettent de préciser ce qu'un composant attend lorsqu'il est utilisé.

---

# PARTIE 9 — BONNES PRATIQUES

## Séparation des responsabilités

Chaque couche possède un rôle précis.

L'objectif est d'éviter de mélanger dans un même endroit :

* l'affichage ;
* la logique ;
* l'accès aux données ;
* la communication avec Firebase.

## Validation

Toujours vérifier les données côté serveur, même si elles sont déjà contrôlées côté client.

La validation côté serveur permet de ne pas faire confiance uniquement aux données provenant du navigateur.

## Gestion des erreurs

Prévoir des messages explicites et renvoyer les codes HTTP appropriés.

Cela permet au client de comprendre correctement le résultat de la requête.

## Variables d'environnement

Les informations sensibles ne doivent jamais être écrites directement dans le code.

### Développement

```text
.env.local
```

### Production

Les variables sont configurées directement dans les paramètres du projet sur Vercel.
