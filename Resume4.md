# RÉSUMÉ COMPLET (PARTIE 4) : PERSISTANCE FIRESTORE AVANCÉE

## Introduction

Utiliser une base de données ne se limite pas à lire et écrire. Pour une application performante, il faut savoir filtrer, trier et paginer les données sans surcharger le serveur ou le client.

---

# PARTIE 1 — REQUÊTES DYNAMIQUES DANS FIRESTORE

Firestore permet de construire des requêtes complexes en combinant plusieurs méthodes.

## 1. Filtrage avec `where()`
Permet de ne récupérer que certains documents.
*   **Exemple** : `where("completed", "==", true)` pour les tâches terminées.

## 2. Tri avec `orderBy()`
Permet d'organiser les résultats.
*   **Ascendant** (`asc`) ou **Descendant** (`desc`).
*   **Exemple** : Trier par `createdAt` pour avoir les plus récentes en premier.

---

# PARTIE 2 — LA PAGINATION (CURSOR-BASED)

Charger 1000 tâches d'un coup ralentirait l'application. On utilise la **pagination par curseur**.

## Le principe du Curseur
1.  On charge les 10 premiers documents.
2.  On garde en mémoire l'ID du dernier document chargé (le **Curseur**).
3.  Pour la page suivante, on demande à Firestore de commencer **après** ce curseur avec `startAfter()`.

## Avantages :
*   **Vitesse** : L'app reste fluide même avec des millions de données.
*   **Coût** : Vous ne payez que pour les données réellement affichées à l'utilisateur.

---

# PARTIE 3 — LES INDEX COMPOSITES

C'est une notion technique cruciale de Firestore.

## Qu'est-ce qu'un Index ?
C'est comme l'index à la fin d'un livre. Il permet à Firestore de trouver les données instantanément sans parcourir toute la collection.

## L'Index Composite
Quand vous combinez un filtre (`where`) et un tri (`orderBy`) sur deux champs différents, Firestore exige un **Index Composite**.
*   **Exemple** : Filtrer par "En cours" ET trier par "Titre".
*   **Comment le créer ?** : Firestore génère un lien dans les logs d'erreur de votre console de développement. Il suffit de cliquer dessus pour le créer automatiquement.

---

# PARTIE 4 — OPTIMISATION DE LA RECHERCHE

Firestore ne supporte pas nativement la recherche textuelle floue (type SQL `LIKE %text%`).

## La technique du `titleLower`
Pour permettre une recherche insensible à la casse :
1.  Lors de la création d'une tâche, on enregistre une version en minuscules du titre (`titleLower`).
2.  Lors de la recherche, on utilise des bornes :
    *   `>=` le texte recherché.
    *   `<` le texte recherché + un caractère spécial (`\uf8ff`).

Cela simule une recherche de type "commence par" de manière très performante.

---

# PARTIE 5 — GESTION DES DATES (TIMESTAMP)

Firestore utilise son propre type `Timestamp`.
*   **Problème** : Les API JSON et le Web préfèrent les dates ISO ou JavaScript.
*   **Solution** : Dans le Repository, on convertit toujours le `Timestamp` Firestore en objet `Date` JavaScript avec la méthode `.toDate()`. Cela garantit que le reste de l'application manipule des dates standards.

**Bilan :** Une bonne gestion de la donnée assure une application **rapide**, **économique** et **scalable**.
