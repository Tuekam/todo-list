# PARTIE 1 — DÉCOUVRIR NEXT.JS

## Pourquoi utiliser Next.js ?

React est une bibliothèque très puissante, mais elle présente quelques limites lorsqu'on développe une application complète :

* **SEO limité** : le navigateur reçoit au départ une page HTML presque vide.
* **Chargement plus lent** : le JavaScript doit être téléchargé puis exécuté avant d'afficher la page.
* **Routage manuel** : il faut utiliser une bibliothèque comme React Router.
* **Backend séparé** : les API sont généralement développées dans un autre projet.

## Qu'est-ce que Next.js ?

Next.js est un framework basé sur **React** qui apporte toutes les fonctionnalités nécessaires pour développer une application web moderne.

## Les principaux avantages

* **SEO amélioré** : génération du HTML côté serveur.
* **Meilleures performances** : affichage plus rapide des pages.
* **Routing automatique** : les dossiers deviennent automatiquement des routes.
* **API intégrée** : création d'API directement dans `app/api`.

## Server-Side Rendering (SSR)

Principe :

* le serveur génère la page HTML ;
* le navigateur reçoit directement une page complète ;
* l'utilisateur voit immédiatement le contenu.

## CSS Modules

Les fichiers `.module.css` permettent d'isoler les styles de chaque composant afin d'éviter les conflits.

## TypeScript

* `.ts` : code TypeScript sans JSX
* `.tsx` : composants React avec JSX

---

# PARTIE 2 — ROUTING ET NAVIGATION

## Le routing

Le routing consiste à faire correspondre une URL à une page.

## Navigation avec `Link`

Le composant `Link` permet de naviguer entre les pages.

**Avantage :**

Les pages sont préchargées en arrière-plan, ce qui rend la navigation beaucoup plus fluide.

## `layout.tsx`

Le fichier `layout.tsx` est partagé par toutes les pages.

Il permet notamment de :

* créer un menu unique ;
* éviter de dupliquer la navigation sur chaque page.

## Routes dynamiques

Une route dynamique permet de gérer plusieurs pages avec un seul fichier.

Exemple :

```text
/projets/portfolio
/projets/blog
/projets/site-ecommerce
```

## `params`

`params` permet de récupérer la valeur dynamique présente dans l'URL.

## Page 404 personnalisée

Créer un fichier :

```text
not-found.tsx
```

Next.js l'utilisera automatiquement lorsqu'une page n'existe pas.

## `usePathname()`

Ce hook permet de connaître l'URL actuellement affichée.

Utilisation courante :

* mettre en évidence le lien actif dans le menu.

---

# PARTIE 3 — SERVER ET CLIENT COMPONENTS

## Principe

Dans Next.js, un composant peut être exécuté :

* sur le **serveur** ;
* ou dans le **navigateur**.

La directive :

```tsx
"use client";
```

indique qu'un composant doit être exécuté côté client.

## Server Component (par défaut)

Tous les composants sont des Server Components tant qu'ils ne contiennent pas `"use client"`.

### Avantages

* très rapide ;
* excellent pour le SEO ;
* aucun JavaScript inutile envoyé au navigateur ;
* code plus sécurisé.

### Limites

Impossible d'utiliser :

* `useState()`
* `useEffect()`
* `window`
* `localStorage`
* `onClick`

### Cas d'utilisation

* pages de contenu ;
* affichage de données ;
* mise en page.

## Client Component

Pour créer un Client Component :

```tsx
"use client";
```

au début du fichier.

### Avantages

* composants interactifs ;
* accès aux hooks React ;
* accès aux API du navigateur.

### Inconvénients

* plus de JavaScript téléchargé ;
* temps de chargement plus important.

### Cas d'utilisation

* boutons ;
* formulaires ;
* menus ;
* animations.

## Bonne pratique

Utiliser `"use client"` uniquement lorsque c'est nécessaire.

En règle générale :

* **Server Component** → affichage et contenu.
* **Client Component** → interactivité.

L'idéal est d'isoler les parties interactives dans de petits composants.

---

# PARTIE 4 — GESTION DES DONNÉES

## Principe

Séparer les données du code React.

Les données sont stockées dans un fichier externe, puis importées dans les composants.

## Pourquoi éviter les données directement dans le composant ?

Cette approche entraîne :

* de la duplication ;
* une maintenance plus difficile ;
* un code moins organisé.

## Utiliser un fichier JSON

Le fichier JSON joue le rôle d'une petite base de données.

## Importer les données

Les données sont importées puis utilisées dans les composants React.

## Afficher une liste avec `.map()`

Le tableau est parcouru pour créer un composant pour chaque élément.

## Rechercher avec `.find()`

`.find()` parcourt le tableau et renvoie le premier élément correspondant à la condition.

## Résultat du build

| Symbole | Signification             |
| :-----: | ------------------------- |
|   `○`   | Page statique             |
|   `ƒ`   | Page générée à la demande |

## `generateStaticParams()`

Cette fonction permet de pré-générer les routes dynamiques au moment du build.

Exemple :

```text
/projets/portfolio
/projets/blog
/projets/application-mobile
```

Les pages sont déjà prêtes avant même la première visite.

## Évolution

Le fichier JSON pourra ensuite être remplacé par une API ou une base de données.

---

# PARTIE 5 — OPTIMISATION DES PERFORMANCES

## Objectif

Améliorer :

* les performances ;
* le référencement ;
* l'expérience utilisateur.

## Images HTML classiques

Les images HTML présentent plusieurs limites :

* pas d'optimisation automatique ;
* formats parfois volumineux ;
* chargement de toutes les images dès l'ouverture de la page ;
* risque de décalage de mise en page (CLS).

## Composant `Image`

Next.js fournit le composant `Image`.

Il offre automatiquement :

* compression des images ;
* formats modernes (WebP, AVIF) ;
* lazy loading ;
* optimisation des performances.

Les propriétés `width` et `height` sont obligatoires afin de réserver l'espace de l'image avant son chargement.

L'option `preload` permet de charger en priorité l'image principale.

## Images distantes

Les domaines autorisés doivent être déclarés dans :

```text
next.config.mjs
```

Par mesure de sécurité, Next.js bloque les autres domaines.

## Images locales

Tout fichier placé dans :

```text
public/
```

est directement accessible.

## Les polices avec `next/font`

Au lieu de télécharger les polices à chaque visite, Next.js les récupère lors du build.

Résultat :

* affichage plus rapide ;
* pas de changement brutal de police ;
* meilleures performances.

## Metadata

Chaque page peut définir :

* un titre ;
* une description.

Pour les routes dynamiques, on utilise `generateMetadata()`.

Ces informations améliorent le référencement.

## Open Graph

Les balises Open Graph permettent d'afficher un aperçu enrichi lors du partage d'un lien sur les réseaux sociaux.

Exemple :

* image ;
* titre ;
* description.

## Core Web Vitals

Les Core Web Vitals regroupent les principaux indicateurs utilisés pour mesurer les performances d'un site web.

---

# PARTIE 6 — DÉPLOIEMENT

## Objectif

Mettre l'application en ligne avec **Vercel**.

## Les principales commandes

| Commande        | Rôle                                   |
| :-------------- | -------------------------------------- |
| `npm run dev`   | Développement                          |
| `npm run build` | Génération de la version de production |
| `npm run start` | Exécution de la version de production  |

## Déploiement avec Vercel

Étapes :

1. créer un compte Vercel ;
2. connecter GitHub ;
3. sélectionner le dépôt ;
4. lancer le déploiement.

## Continuous Deployment

Après la configuration, chaque :

```bash
git push
```

déclenche automatiquement un nouveau déploiement.

Aucune intervention manuelle n'est nécessaire.

## Variables d'environnement

Les informations sensibles ne doivent jamais être écrites directement dans le code.

### En développement

```text
.env.local
```

### En production

Les variables sont configurées directement dans les paramètres du projet Vercel.
