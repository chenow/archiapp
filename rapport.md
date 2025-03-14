# Rapport de Mise en oeuvre du Micro-Service de Gestion de Messages

frontend: https://archiapp-1.onrender.com/
serveur: https://archiapp-p5sb.onrender.com

## Introduction

Ce rapport décrit la construction d'un micro-service de gestion de messages. Le micro-service permet de stocker, récupérer, et ajouter des messages via des appels HTTP. Il inclut également une interface utilisateur simple pour interagir avec le micro-service.

## Choix de Mise en oeuvre

- **Nodejs et Express**: Pour la gestion des rotes et des requêtes HTTP.
- **Stockage des Messages**: Utilisation d'un tableau global `allMsgs`.
- **Routes**:
  - `/msg/post/[le-message-à-poster]`: Ajoute un message.
  - `/msg/get/[le-numéro-du-message]`: Récupère un message par son numéro.
  - `/msg/getAll`: Récupère tous les messages
  - `/msg/nber`: Récupère le nombre de messages.
  - `/msg/del/[le-numero-du-message]`: Efface un message.
- **Interface Utilisateur**: Page html avec utilisation de `fetch` pour les appels AJAX

#### Structure de Données

Les messages sont stocké dans un tableau global `allMsgs`, où chaque message est un objet contenant `msg`, `pseudo`, et `createdAt`.

```javascript
var allMsgs = [
  {
    msg: "Hello World",
    pseudo: "Antoine",
    createdAt: Date(),
  },
  // ...
];
```

## Fonctionnalités Principales

1. **Ajout de Messages**:
   - Route `/msg/post/[le-message-à-poster]`: Ajoute un message décodé avec `unescape`.

2. **Récupération de Messages**:
   - Route `/msg/get/[le-numéro-du-message]`: Récupère un message par son index.
   - Route `/msg/getAll`: Récupère tous les messages.
   - Route `/msg/nber`: Récupère le nombre de messages.

3. **Suppression de Messages**:
   - Route `/msg/del/[le-numero-du-message]`: Supprime un message par son index.

## Interface Utilisateur

L'interface permet de voir et poster des messages via des appels AJAX.

1. **Chargement des Messages**: Appel AJAX pour récupérer et afficher les messages au chargement de la page.

2. **Publication de Messages**: Appel AJAX pour poster un nouveau message et mettre à jour la liste.

## Conclusion

Ce micro-service est une démonstration fonctionnelle de la gestion de messages via des appels HTTP. Il peut être étendu pour une utilisation en production, notamment en utilisant une base de données.
