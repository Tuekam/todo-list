````markdown
# RÉSUMÉ COMPLET : API + FIREBASE AVEC TYPESCRIPT

## Vue d'ensemble

Ce résumé reprend les notions essentielles sur les API avec **Next.js**, **Firebase** et **TypeScript**. Il sert de support de révision et présente uniquement les concepts importants, sans entrer dans le code.


# PARTIE 1 — LES FONDAMENTAUX DU WEB

## Internet

Internet est un réseau mondial d'ordinateurs qui communiquent entre eux.

Deux acteurs interviennent :

- Le client : navigateur web (Chrome, Firefox, Edge...) ou application mobile.
- Le serveur : ordinateur qui héberge le site, les API et les données.


## Le protocole HTTP

HTTP est le protocole qui permet au client et au serveur d'échanger des informations.

## Structure d'une requête HTTP

URL : Ressource demandée (`/api/users`) 
Méthode : Action à effectuer (`GET`, `POST`, `PATCH`, `DELETE`) 
Headers : Informations complémentaires
Body : Données envoyées au serveur 


## Structure d'une réponse HTTP


Status Code : Résultat de la requête (`200`, `404`, `500`...) 
Headers : Informations sur la réponse |
Body : Données renvoyées (JSON, HTML...) |


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

# PARTIE 3 — JSON

## Définition

Le **JSON (JavaScript Object Notation)** est le format standard utilisé pour échanger des données entre un client et un serveur.

Ses principaux avantages :

- léger ;
- lisible ;
- compatible avec la majorité des langages.


# PARTIE 4 — LES API AVEC NEXT.JS

## Le dossier `app/api`

Dans Next.js, chaque dossier situé dans `app/api` devient automatiquement une route API.

### Correspondance

app/api/users/route.ts   --->  /api/users

app/api/users/[id]/route.ts   ---> /api/users/1

app/api/tasks/route.ts   ---> /api/tasks


## `page.tsx` et `route.ts`


## Les Route Handlers

Chaque méthode HTTP correspond à une fonction exportée.


# PARTIE 5 — RÉCUPÉRATION DES DONNÉES AVEC `fetch()`

## Rôle

`fetch()` permet d'envoyer une requête HTTP vers une API afin de récupérer ou d'envoyer des données.


## Intérêt du Server Component

- récupération des données avant l'affichage ;
- meilleur référencement ;
- absence de chargement visible ;
- code plus simple.


# PARTIE 6 — FIREBASE

## Présentation

Firebase est une plateforme proposée par Google pour développer rapidement des applications.

Les principaux services utilisés sont :

- **Firestore** : base de données NoSQL.
- **Authentication** : gestion des utilisateurs.
- **Storage** : stockage de fichiers.
- **Hosting** : hébergement.


## Firestore

### Comparaison

SQL : NoSQL 
Tables : Collections
Lignes : Documents 

## Organisation des données

Une **collection** contient plusieurs **documents**.


Chaque document contient les informations d'une ressource.

## Pourquoi utiliser Firebase ?

- mise en place rapide ;
- aucune configuration de serveur ;
- évolutif ;
- synchronisation en temps réel ;
- intégration simple avec Next.js.

# PARTIE 7 — ARCHITECTURE DU PROJET

## Les opérations CRUD

| Opération | API | Firebase |
|-----------|-----|-----------|
| CREATE | `POST()` | `addDoc()` |
| READ | `GET()` | `getDocs()` |
| UPDATE | `PATCH()` | `updateDoc()` |
| DELETE | `DELETE()` | `deleteDoc()` |


# PARTIE 8 — TYPESCRIPT

## Pourquoi TypeScript ?

TypeScript apporte plusieurs avantages :

- détection des erreurs avant l'exécution ;
- meilleure documentation du code ;
- autocomplétion dans l'éditeur ;
- maintenance facilitée.


## `.ts` et `.tsx`


## Les principaux types

### Interface

Définit la structure d'un objet.

### Type

Permet de créer un type personnalisé.

### Props

Définissent les données reçues par un composant React.

# PARTIE 9 — BONNES PRATIQUES

## Séparation des responsabilités

Chaque couche possède un rôle précis.


## Validation

Toujours vérifier les données côté serveur, même si elles sont déjà contrôlées côté client.


## Gestion des erreurs

Prévoir des messages explicites et renvoyer les codes HTTP appropriés.

## Variables d'environnement

Les informations sensibles ne doivent jamais être écrites directement dans le code.

- Développement : `.env.local`
- Production : paramètres du projet sur Vercel.
