# RÉSUMÉ COMPLET (PARTIE 6) : DÉPLOIEMENT ET VARIABLES D'ENVIRONNEMENT

## Introduction

Une application ne sert à rien si elle reste sur votre ordinateur. Le passage en production nécessite une configuration rigoureuse pour garantir la sécurité et la performance.

---

# PARTIE 1 — LE DÉPLOIEMENT AVEC VERCEL

Next.js étant créé par Vercel, le déploiement y est optimisé et quasi automatique.

## 1. La connexion Git (CI/CD)
Nous utilisons le **Déploiement Continu** :
*   Chaque fois que vous faites un `git push` sur la branche principale, Vercel détecte le changement.
*   Il lance automatiquement le `build` (compilation).
*   Si le build réussit, l'application est mise à jour en quelques secondes.

## 2. Le processus de Build
Pendant le build, Next.js :
*   Vérifie les types TypeScript.
*   Optimise les images et les polices.
*   Minifie le code (réduit la taille des fichiers).
*   Génère les pages statiques.

---

# PARTIE 2 — LES VARIABLES D'ENVIRONNEMENT

C'est le concept de **sécurité** le plus important. Les clés secrètes (comme les clés API Firebase) ne doivent jamais être visibles dans le code public.

## 1. Fichiers locaux (`.env.local`)
Ce fichier contient vos clés pour le développement. Il est ignoré par Git (via `.gitignore`) pour ne pas être partagé.

## 2. Configuration sur Vercel
En production, les variables sont saisies dans l'interface de Vercel. L'application les récupère au moment de l'exécution.

---

# PARTIE 3 — MODES DE RENDU EN PRODUCTION

Next.js choisit le meilleur mode pour chaque page :
*   **Static (○)** : La page est une simple image fixe, ultra-rapide.
*   **Dynamic (ƒ)** : La page est recalculée à chaque visite (nécessaire pour la liste des tâches qui change tout le temps).

**Bilan :** Un bon déploiement garantit que votre application est **accessible**, **sécurisée** et **toujours à jour**.
