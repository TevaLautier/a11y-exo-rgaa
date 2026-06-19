# Exercices RGAA - Mobiliere

Ce projet contient volontairement des erreurs d'accessibilite a corriger dans les templates HTML.

## Images et semantique
- Images d'annonces et d'agences avec alt generique `Image`.
- Hiarchie de titres volontairement fausse (`h2` avec style de `h1`).
- Utilisation de `div` non semantique dans la structure (header/main/footer).

## Formulaires et interactions
- Page contact: bouton envoyer code en `div (click)` avec largeur fixe.
- Filtres annonces: boutons de type pression avec gestion `aria-pressed` incoherente.
- Formulaire de recherche sans statut vocal `role=status` lors des mises a jour.

## Navigation et tableaux
- Tableau annonces sans `caption` ni `scope="col"`.
- Actions tableau avec icones sans libelles explicites.
- Pagination atomique avec boutons `<` et `>` sans noms accessibles.
- Breadcrumb statique et breadcrumb via route-data coexistants.

## Couleurs et contrastes
- Logo orange `#FF9100` sur fond blanc (contraste insuffisant).
- Element actif menu indique seulement par la couleur.
- Liens non soulignes en texte courant.
- Focus visible volontairement insuffisant sur bouton primaire.

## UX et comportement
- Carrousel automatique avec bouton pause place en bas.
- Texte d'aide oriente souris: "Cliquez sur le bouton en haut a droite...".
- Largeurs fixes sur titres/boutons provoquant des debordements a 200%.
- Langue de document forcee en anglais (`lang="en"`) pour un contenu francais.
- `mat-icon` utilise en mode texte (`<mat-icon>search</mat-icon>`).

## Fichiers de correction
Chaque composant concerne par une erreur majeure possede son equivalent `-correction` expliquant la correction attendue avec des commentaires.
