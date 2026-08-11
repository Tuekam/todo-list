# Récapitulatif du projet Todo List — Next.js + Firebase + TypeScript

> **Objectif :** ce document sert de rappel rapide de tout ce qui a été implémenté dans le projet et des notions apprises.
> Le projet a progressivement évolué d'une simple Todo List vers une architecture modulaire avec séparation stricte des responsabilités.

---

# 1. Technologies utilisées

Le projet utilise principalement :

* **Next.js** avec App Router
* **React**
* **TypeScript**
* **Firebase**
* **Firestore**
* **pnpm**
* **pnpm Workspace**
* **Awilix** pour l'injection de dépendances

---

# 2. Fonctionnalités de la Todo List

L'application permet de :

* créer une tâche ;
* afficher les tâches ;
* modifier une tâche ;
* supprimer une tâche ;
* rechercher des tâches ;
* filtrer les tâches ;
* trier les tâches ;
* limiter le nombre de résultats ;
* parcourir les résultats avec une pagination ;
* gérer le chargement ;
* gérer les erreurs ;
* confirmer certaines suppressions avec une fenêtre de confirmation.

Les opérations principales sont :

```text
Create
Read
Update
Delete
```

---

# 3. API Next.js

Les API sont placées dans :

```text
apps/web/app/api/tasks/
```

Avec :

```text
route.ts
[id]/route.ts
```

## `route.ts`

Cette route gère principalement :

```text
GET
POST
```

### GET

Permet de récupérer les tâches.

La requête peut recevoir différents paramètres :

```text
completed
search
sort
direction
limit
lastDocId
```

Les paramètres sont récupérés depuis l'URL avec :

```ts
new URL(request.url)
```

puis :

```ts
searchParams.get(...)
```

---

## POST

Permet de créer une tâche.

Le frontend envoie les données au format JSON :

```text
fetch()
    ↓
POST
    ↓
request.json()
    ↓
données
```

Une validation du titre est effectuée avant la création.

---

# 4. API dynamique `[id]`

Le dossier :

```text
apps/web/app/api/tasks/[id]/
```

permet de travailler avec une tâche précise.

Il est utilisé pour :

```text
PATCH
DELETE
```

Le `id` permet d'identifier le document Firestore concerné.

Exemple conceptuel :

```text
/api/tasks/abc123
```

signifie :

> travailler avec la tâche dont l'identifiant est `abc123`.

---

# 5. Communication frontend → backend

Le frontend ne communique pas directement avec Firestore pour les opérations principales.

Il passe par l'API Next.js.

Le principe est :

```text
Composant React
    ↓
Hook
    ↓
fetch()
    ↓
API Next.js
    ↓
Use Case
    ↓
Repository
    ↓
Firestore
```

Pour récupérer la réponse :

```ts
const response = await fetch(...);

const data = await response.json();
```

La réponse HTTP est donc transformée en données JavaScript avec `response.json()`.

---

# 6. TypeScript

Le projet a été progressivement migré vers TypeScript.

Le type principal est `Task`.

Il représente la structure d'une tâche.

L'utilisation des types permet de savoir précisément :

* quelles propriétés possède une tâche ;
* quels paramètres accepte une fonction ;
* quelles données retourne une fonction ;
* quelles propriétés sont attendues par les composants.

Des utilitaires TypeScript ont également été utilisés, notamment :

```text
Partial
Omit
```

`Partial` permet de rendre les propriétés optionnelles.

`Omit` permet de créer un type en retirant certaines propriétés d'un autre type.

---

# 7. Firebase et Firestore

Firebase est utilisé comme infrastructure de données.

La base utilisée est :

```text
Cloud Firestore
```

Les tâches sont stockées dans une collection :

```text
tasks
```

Une tâche correspond à un document Firestore.

Les principales opérations Firestore utilisées sont :

```text
collection()
doc()
getDoc()
getDocs()
addDoc()
updateDoc()
deleteDoc()
```

---

# 8. Requêtes Firestore

Le projet ne se limite plus à :

```text
getDocs()
```

Des requêtes sont construites dynamiquement avec :

```text
query()
where()
orderBy()
limit()
startAfter()
```

Cela permet de construire une requête selon les paramètres reçus.

Par exemple :

```text
filtrer
+
trier
+
limiter
+
paginer
```

---

# 9. Filtrage

Les tâches peuvent être filtrées selon leur état.

Par exemple :

```text
completed=true
```

ou :

```text
completed=false
```

Le principe est de transformer le paramètre reçu par l'API en contrainte Firestore.

Conceptuellement :

```text
URL
↓
searchParams
↓
completed
↓
where()
↓
Firestore
```

---

# 10. Tri

Le projet permet également de trier les résultats.

Les paramètres utilisés sont notamment :

```text
sort
direction
```

La direction peut être :

```text
asc
desc
```

Firestore utilise ensuite :

```text
orderBy()
```

pour effectuer le tri.

---

# 11. Recherche

Une fonctionnalité de recherche a été ajoutée.

Le projet utilise notamment une valeur comme :

```text
titleLower
```

pour faciliter la recherche sur le titre.

L'idée est de préparer les données de manière à pouvoir effectuer plus facilement certaines requêtes Firestore.

---

# 12. Pagination

Une pagination a été ajoutée afin de ne pas récupérer toutes les tâches en une seule fois.

Le projet utilise une pagination basée sur un curseur.

Les notions importantes sont :

```text
limit()
startAfter()
lastDocId
nextCursor
hasMore
```

Le fonctionnement général est :

```text
première requête
↓
récupération d'une partie des tâches
↓
récupération du curseur
↓
requête suivante
↓
startAfter()
↓
suite des tâches
```

`lastDocId` permet d'indiquer à partir de quel document continuer.

`nextCursor` permet de transmettre au frontend la position nécessaire pour récupérer la page suivante.

`hasMore` permet de savoir s'il reste encore des résultats.

---

# 13. Architecture en couches

Le projet a ensuite été restructuré pour séparer les responsabilités.

Les principales parties sont :

```text
apps
core
domain
data
presentation
```

L'objectif est d'éviter que toutes les responsabilités soient mélangées.

---

# 14. `apps/web`

Cette partie représente l'application Next.js.

Elle contient notamment :

```text
app/
├── page.tsx
├── layout.tsx
└── api/
```

Elle contient donc les éléments directement liés à Next.js :

* pages ;
* routes API ;
* configuration de l'application ;
* éléments nécessaires à l'exécution du frontend.

---

# 15. `core`

Le Core contient les éléments fondamentaux et indépendants des technologies utilisées.

On y trouve notamment :

```text
core/
└── src/
    ├── models/
    ├── interfaces/
    └── utils/
```

Le Core ne doit pas dépendre de Firebase ou de React.

---

# 16. Model

Le modèle représente les données utilisées par l'application.

Le modèle principal est :

```text
Task
```

Il permet à toutes les couches de parler de la même structure de tâche.

Le modèle ne dépend pas de Firestore.

Il représente simplement la donnée métier.

---

# 17. Interface Repository

Une interface de repository définit un contrat.

Elle indique les opérations qu'un repository doit fournir.

L'interface ne contient pas l'implémentation Firestore.

Elle dit essentiellement :

> voici ce qu'un repository doit savoir faire.

Mais elle ne dit pas :

> voici comment il doit le faire.

C'est la base de l'abstraction utilisée dans le projet.

---

# 18. Abstraction

L'abstraction consiste à séparer :

```text
ce qu'on veut faire
```

de :

```text
comment on le fait.
```

Par exemple, le Domain peut demander :

```text
récupérer les tâches
```

sans avoir besoin de connaître :

```text
Firestore
getDocs()
where()
orderBy()
```

Le détail technique est placé dans Data.

---

# 19. Repository Pattern

La couche Data contient les implémentations concrètes des repositories.

Actuellement, le projet possède notamment :

```text
CreateTaskRepositoryImpl
GetTasksRepositoryImpl
UpdateTaskRepositoryImpl
DeleteTaskRepositoryImpl
```

Ces classes connaissent Firebase/Firestore.

Elles réalisent réellement les opérations sur la base.

La séparation est donc :

```text
Core
→ contrat

Data
→ implémentation
```

---

# 20. DATA

La couche Data est responsable de l'accès aux données.

Elle contient notamment :

```text
data/
├── firebase/
│   └── firebase.ts
│
└── repositories/
    ├── CreateTaskRepositoryImpl.ts
    ├── GetTasksRepositoryImpl.ts
    ├── UpdateTaskRepositoryImpl.ts
    └── DeleteTaskRepositoryImpl.ts
```

C'est donc cette couche qui connaît concrètement Firestore.

---

# 21. DOMAIN

La couche Domain contient les règles et opérations métier.

Elle contient notamment :

```text
domain/
└── use-cases/
    └── TaskUseCases.ts
```

Les Use Cases représentent les actions de l'application :

```text
Créer une tâche
Récupérer les tâches
Modifier une tâche
Supprimer une tâche
```

Le Domain ne doit pas être dépendant directement de Firebase.

---

# 22. Use Case

Un Use Case représente une action que l'application doit réaliser.

Par exemple :

```text
GetTasks
```

signifie :

> récupérer les tâches.

Le Use Case utilise les abstractions nécessaires pour réaliser cette opération.

Il ne devrait pas avoir besoin de connaître directement les détails de Firestore.

---

# 23. Inversion des dépendances

Une idée importante de l'architecture est d'éviter :

```text
Domain
    ↓
Firebase
```

On cherche plutôt à avoir :

```text
Domain
    ↓
Interface
    ↑
Data
```

Le Domain dépend donc d'une abstraction.

Data fournit l'implémentation concrète.

Cela permet de remplacer plus facilement la technologie utilisée pour les données.

---

# 24. Injection de dépendances

Le projet utilise l'injection de dépendances.

Au lieu qu'une classe crée elle-même ses dépendances :

```text
new Repository()
```

elle reçoit les dépendances dont elle a besoin.

Par exemple, le Use Case reçoit ses repositories.

Le principe est :

```text
Use Case
    ↑
reçoit
    ↑
Repository
```

La classe n'est donc pas responsable de construire elle-même toutes ses dépendances.

---

# 25. Awilix

Pour gérer automatiquement l'injection de dépendances, le projet utilise :

```text
Awilix
```

Le container enregistre les différentes dépendances.

Il sait notamment comment construire :

```text
db
repositories
use cases
```

Puis une dépendance peut être récupérée avec le container.

Le container devient donc le lieu où les différentes implémentations sont assemblées.

---

# 26. Composition

L'idée de composition est :

> réunir les différentes implémentations nécessaires pour faire fonctionner l'application.

Par exemple :

```text
Firestore
+
Repository
+
Use Case
+
Presentation
```

sont assemblés au niveau approprié.

Les autres parties de l'application n'ont pas besoin de savoir comment chaque objet est construit.

---

# 27. `index.ts`

Des fichiers `index.ts` ont été ajoutés dans les packages.

Ils servent à centraliser les exports.

Cela permet d'avoir des imports plus propres et d'éviter de dépendre directement de la structure interne des dossiers.

Par exemple, au lieu de connaître le chemin exact d'un fichier interne, un package peut exposer publiquement ce dont les autres packages ont besoin.

---

# 28. PRESENTATION

La couche Presentation contient tout ce qui concerne l'interface utilisateur.

Elle contient notamment :

```text
presentation/
├── components/
├── hooks/
└── pages/
```

Les composants présents comprennent :

```text
TaskForm
TaskItem
TaskList
TaskFilters
ConfirmationModal
```

---

# 29. `TaskPage`

`TaskPage` représente la page principale liée aux tâches.

Elle orchestre les différents composants :

```text
TaskForm
TaskFilters
TaskList
```

Elle reçoit également certaines dépendances au lieu de tout construire directement.

Cela permet d'améliorer la séparation entre la page et la logique de récupération des données.

---

# 30. Custom Hook `useTasks`

Le projet possède un hook :

```text
useTasks
```

Il centralise une grande partie de la logique frontend liée aux tâches.

Il permet notamment de gérer :

```text
chargement
création
modification
suppression
récupération
pagination
erreurs
```

Cela évite de mettre toute cette logique directement dans les composants.

---

# 31. Gestion des états React

Le frontend utilise les états React pour gérer les informations nécessaires à l'interface.

On retrouve notamment des états liés à :

```text
tasks
loading
error
filtres
recherche
tri
pagination
```

L'état permet à React de mettre automatiquement l'interface à jour lorsque les données changent.

---

# 32. `useCallback`

`useCallback` a été utilisé pour mémoriser certaines fonctions.

L'objectif est d'éviter de recréer inutilement certaines fonctions à chaque rendu lorsque cela est pertinent.

---

# 33. `useMemo`

`useMemo` permet de mémoriser une valeur calculée.

Il peut être utilisé lorsque certaines valeurs dépendent de plusieurs états et qu'on souhaite éviter de refaire inutilement le calcul.

---

# 34. Debounce

La recherche utilise également le principe du debounce.

Le but est d'éviter d'envoyer une requête à chaque caractère tapé.

Au lieu de faire :

```text
t → requête
te → requête
tes → requête
test → requête
```

on attend que l'utilisateur arrête momentanément de taper avant d'effectuer la recherche.

---

# 35. Monorepo

Le projet est maintenant organisé comme un monorepo avec :

```text
pnpm-workspace.yaml
```

La structure principale est :

```text
apps/
packages/
core/
```

L'objectif est de pouvoir séparer les différentes parties du projet en packages indépendants tout en les développant dans le même dépôt.

---

# 36. `apps`

`apps` contient les applications finales.

Dans ton projet :

```text
apps/
└── web/
```

représente l'application Next.js.

---

# 37. `packages`

`packages` contient les différentes parties réutilisables ou indépendantes de l'application.

Tu as notamment :

```text
packages/
├── data/
├── domain/
└── presentation/
```

Chaque package possède son propre code source et sa propre configuration TypeScript/package.

---

# 38. Séparation stricte des responsabilités

Le principe général que tu as progressivement mis en place est :

```text
APP
→ entrée de l'application

PRESENTATION
→ interface utilisateur

DOMAIN
→ logique métier

DATA
→ accès aux données

CORE
→ modèles et contrats communs
```

L'objectif est que chaque couche fasse principalement **une seule catégorie de travail**.

---

# 39. Ce que je retiens de l'architecture


Il faut retenir la logique :

```text
Presentation
→ demande une action

Domain
→ réalise l'action métier

Core
→ fournit les contrats

Data
→ réalise l'accès concret aux données

Firebase
→ stocke les données
```

Et Next.js sert notamment de point d'entrée HTTP entre le frontend et le backend.

---

# 40. Flux complet d'une récupération de tâches

Quand l'utilisateur ouvre la liste des tâches, le chemin logique est maintenant :

```text
Utilisateur
↓
React
↓
useTasks
↓
fetch()
↓
Route Handler Next.js
↓
TaskUseCases
↓
Repository
↓
Firestore
↓
résultat
↓
API JSON
↓
useTasks
↓
état React
↓
TaskList
↓
Utilisateur
```

C'est probablement **le flux le plus important à garder en mémoire**.

---

# 41. Flux d'une création

Pour créer une tâche :

```text
TaskForm
↓
useTasks
↓
fetch POST
↓
API Next.js
↓
Use Case
↓
CreateTaskRepository
↓
Firestore
↓
réponse
↓
frontend
↓
mise à jour de la liste
```

---

# 42. Flux d'une modification

Pour modifier :

```text
TaskItem
↓
useTasks
↓
PATCH /api/tasks/:id
↓
API
↓
Use Case
↓
UpdateTaskRepository
↓
Firestore
↓
réponse
↓
frontend
```

---

# 43. Flux d'une suppression

Pour supprimer :

```text
TaskItem
↓
ConfirmationModal
↓
useTasks
↓
DELETE /api/tasks/:id
↓
API
↓
Use Case
↓
DeleteTaskRepository
↓
Firestore
```

---

# 44. Ce que tu as réellement construit

Ton projet est donc passé de :

```text
Todo List simple
```

à :

```text
Todo List
+
Next.js
+
React
+
TypeScript
+
API REST
+
Firebase
+
Firestore
+
CRUD
+
filtres
+
tri
+
recherche
+
pagination
+
architecture en couches
+
abstraction
+
interfaces
+
Repository Pattern
+
Use Cases
+
Dependency Injection
+
Awilix
+
pnpm Workspace
+
packages
+
hooks
+
debounce
+
barrel files
```

---

# 45. Les notions à maîtriser maintenant

Pour continuer ton apprentissage dans le bon ordre, les notions déjà implémentées peuvent être étudiées ainsi :

```text
1. Architecture en couches

2. Core
   ├── Models
   └── Interfaces

3. Abstraction

4. Repository Pattern

5. Domain

6. Use Cases

7. Inversion des dépendances

8. Dependency Injection

9. Awilix

10. Composition Root

11. Next.js Route Handlers

12. API REST

13. Firebase

14. Firestore CRUD

15. Requêtes Firestore

16. Filtres

17. Tri

18. Recherche

19. Pagination par curseur

20. React Hooks

21. Custom Hooks

22. Debounce

23. Injection côté Presentation

24. index.ts / Barrel Files

25. pnpm Workspace

26. Communication entre packages
```
