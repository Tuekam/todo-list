# RÉSUMÉ COMPLET (PARTIE 3) : ARCHITECTURE MODULAIRE ET INJECTION

## Introduction

À mesure qu'une application grandit, mélanger la logique métier, les appels réseau et l'affichage dans un seul fichier devient ingérable. Nous avons mis en place une **Architecture Propre (Clean Architecture)** pour garantir la maintenabilité et l'évolution du projet.

---

# PARTIE 1 — L'ARCHITECTURE EN COUCHES (LAYERS)

L'objectif est de séparer les responsabilités dans des "paquets" (packages) indépendants.

## 1. La couche CORE (Les Fondations)
*   **Rôle** : Contient les éléments qui ne changent jamais et qui sont partagés par tout le monde.
*   **Contenu** : Les modèles de données (interfaces TypeScript) et les interfaces des contrats (Repository).
*   **Règle** : Elle ne dépend d'aucune autre couche.

## 2. La couche DOMAIN (Le Cerveau)
*   **Rôle** : Contient la logique métier pure (les "Use Cases").
*   **Exemple** : "On ne peut pas créer une tâche sans titre".
*   **Indépendance** : Elle ne sait pas si les données viennent de Firebase ou d'une simple liste. Elle travaille uniquement avec des abstractions.

## 3. La couche DATA (L'Infrastructure)
*   **Rôle** : C'est ici qu'on implémente la technique (Firestore, Axios, etc.).
*   **Miroir** : Elle réalise techniquement les contrats définis dans le CORE.

## 4. La couche PRESENTATION (Le Visage)
*   **Rôle** : L'interface utilisateur (React). Elle demande des actions au DOMAIN et affiche les résultats.

---

# PARTIE 2 — LE REPOSITORY PATTERN

Le **Repository Pattern** agit comme une façade entre votre logique et votre base de données.

## Pourquoi l'utiliser ?
1.  **Découplage** : Si vous voulez passer de Firestore à MongoDB, vous ne changez que la couche DATA. Le reste de l'app ne s'en rend même pas compte.
2.  **Tests facilités** : On peut facilement remplacer un "vrai" fournisseur de données par un "faux" pour faire des tests.

## Analogie : Le Guichet
Le Repository est comme un guichet de banque. Vous (le domaine) demandez de l'argent. Vous ne savez pas si l'argent sort d'un coffre-fort ou d'une autre banque. Vous interagissez juste avec le guichetier.

---

# PARTIE 3 — L'INJECTION DE DÉPENDANCES (DI)

L'injection de dépendances consiste à ne jamais écrire `new Service()` à l'intérieur d'une classe. On "injecte" (donne) le service à la classe.

## Awilix (Le Chef d'Orchestre)
Dans notre projet, nous utilisons **Awilix** pour gérer ce processus automatiquement.

### Le Container
C'est une boîte centrale qui contient toutes les instances de vos services (Repositories, Use Cases).

### Avantages :
*   **Atomicité** : Chaque fichier est indépendant. Il reçoit ce dont il a besoin par son constructeur.
*   **Maintenance** : Toutes les connexions entre vos classes sont centralisées dans un seul fichier de configuration (le `container.ts`).

---

# PARTIE 4 — L'ABSTRACTION

L'abstraction est le fait de dépendre d'un **contrat** (Interface) plutôt que d'une **implémentation** (Code réel).

### Flux de communication :
```text
Presentation (Screen)
    ↓ appelle
Domain (UseCase)
    ↓ appelle (via interface)
Core (Contract)
    ↑ implémenté par
Data (Repository)
```

**Bilan :** Grâce à cette architecture, votre code est **robuste**, **modulaire** et prêt à passer à l'échelle (Scalability), exactement comme dans les projets professionnels de grande envergure.
