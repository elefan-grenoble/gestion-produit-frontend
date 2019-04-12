# Gestion Produit Frontend

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Serveur de développement (en local)

Lancer la commande `ng serve --proxy-config proxy.conf.json` pour lancer le serveur de développement en local. 
Ensuite naviguer vers `http://localhost:4200/`. L'application se rechargera automatiquement si les fichiers sources sont modifiés.

## Génération de code

Pour générer un composant lancer `ng generate component components/component-name`. 
Tu peux aussi utiliser `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Tests unitaires

Lancer `ng test` pour executer les tests avec [Karma](https://karma-runner.github.io).

## Mise en production

### Création d'une release

* Merger les développements dans la branche `develop` via une pull request.
* Dans la branche `develop` lancer `ng build --prod` pour compiler le projet pour la prod. La destination des artefacts du build est le dossier `dist/`.
* Créer un tag `git tag -a v1.4` avec la version correspondante.
* Pousser tous les changements.

### Deploiement de la release en production

TODO
 



## Plus d'aide

Pour obtenir plus d'aide sur Angular CLI lancer `ng help` ou aller voir le [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
