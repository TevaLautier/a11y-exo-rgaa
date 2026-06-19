# Mobiliere - Lab RGAA

Application Angular 22 servant de support pedagogique pour des exercices d'accessibilite RGAA.

Le projet contient volontairement des erreurs d'accessibilite dans certains templates. Les apprenants doivent les corriger principalement cote HTML/Template.

## Stack

- Angular standalone components
- RxJS + services sur JSON local
- Angular Material (icones)
- ngx-toastr
- ngx-echarts
- SCSS avec design system `so-*`

## Lancer en local

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Arborescence

- `src/app/core`: shell/layout et init
- `src/app/modules`: blocs metier et data-access
- `src/app/pages`: pages routees
- `src/app/lib/ui`: composants atomiques du design system
- `public/data`: jeux de donnees JSON

## Exercices

La liste des erreurs introduites est documentee dans `README_EXERCICES.md`.

Les versions corrigees sont dans des fichiers `*-correction.*` exclus du build TypeScript applicatif.
