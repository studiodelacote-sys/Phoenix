# PHOENIX V0.458 — PWA iPhone/iPad

PHOENIX est une Progressive Web App autonome, sans framework. La séance dure 15 minutes programmées et fonctionne hors connexion après une première ouverture réussie en ligne.

La V0.458 industrialise les deux mouvements pilotes **Squat vers chaise** et **Tirage un bras avec appui**. Un catalogue JSON unique alimente désormais leurs métadonnées dans le Rituel, leur fiche Library responsive et le gabarit partagé `PhoenixA4Poster`. Les autres mouvements conservent leur architecture historique comme solution de repli.

Dans **Autres vues → Fiche détaillée**, ces deux mouvements ouvrent automatiquement le composant partagé et préservent l’état du Rituel. Le marqueur visible `MOVEMENT MODEL · V0.458` permet de vérifier la bonne version. Le bouton **VOIR LA FICHE A4** rend le gabarit A4 à partir du même objet mouvement. Les masters V2 restent disponibles comme références visuelles et fallback. Routes directes de test :

- `?library=squat-chair` — Squat vers chaise ;
- `?library=one-arm-row` — Tirage à un bras ;
- `?library=glute-bridge` — Pont fessier ;
- `?library=mini-stepper` — Mini-stepper ;
- `?library=floor-press` — Développé couché au sol ;
- `?library=thoracic-opening` — Ouverture thoracique ;
- `?library=breathing` — Respiration calme.

Les miniatures « Autres vues » réutilisent provisoirement les compositions `ritualImage` existantes. Les futurs assets dédiés pourront remplacer ces sources dans les données sans changer le composant.

### Architecture pilote V0.458

Schéma et données :

- `data/movements/schema.json` ;
- `data/movements/squat-chair.json` ;
- `data/movements/one-arm-row.json` ;
- `js/movement-catalog.js` pour le chargement centralisé.

Composants partagés :

- `components/RitualExercise.js` hydrate les métadonnées des étapes portant un `movementId` ;
- `components/LibraryDetail.js` rend la fiche mobile depuis l’objet mouvement ;
- `components/PhoenixA4Poster.js` rend l’affiche A4 partagée depuis le même objet ;
- `components/LibraryDetail.css` et `components/PhoenixA4Poster.css` portent leurs styles.

Les champs partagés sont `id`, `name`, `posterNumber`, `category`, `subtitle`, `muscleGroups`, `equipment`, `level`, `objective`, `instructions`, `cadence`, `volume`, `avoid`, `sequence`, `sideSupport`, `professionalStatus`, `ritual` et `assets`.

Les étapes pilotes de `js/app.js` référencent explicitement `movementId`. Le tirage précise également `side: right/left`. Le titre, la consigne et les phases sont injectés depuis le catalogue avant le premier rendu.

### Masters A4 V2 conservés

Nouveaux masters :

- `assets/posters/v2/squat-vers-chaise-a4-v2.webp` pour `squat-chair` ;
- `assets/posters/v2/tirage-un-bras-appui-a4-v2.webp` pour `one-arm-row`.

Les nouveaux assets réutilisables se trouvent dans `assets/movements/squat-chair/` et `assets/movements/one-arm-row/` : `hero.webp`, `sequence.webp` et la vue d’alignement propre au mouvement. Les anciens masters et leurs découpes ne sont ni écrasés ni supprimés.

Les routes `?library=squat-chair` et `?library=one-arm-row`, ainsi que les liens **Autres vues → Fiche détaillée** correspondants dans le Rituel, utilisent `components/LibraryDetail.js`. Elles ne génèrent aucune ancienne `.library-card`. Les autres routes continuent à employer le composant historique de `js/app.js`.

## Mouvements canoniques de la Séance 01

- `mini-stepper` : exercice 1 ;
- `squat-chair` : exercices 2 et 7 ;
- `one-arm-row` : exercices 3, 4, 8 et 9 (`side: right/left`) ;
- `glute-bridge` : exercices 5 et 10 ;
- `floor-press` : exercices 6 et 11 ;
- `thoracic-opening` : exercice 12 ;
- `breathing` : exercice 13.

Les six premiers mouvements disposent du poster A4 historique. La fiche mobile `breathing` est complète, mais son asset A4 n’existe pas encore : son bouton indique donc **Fiche A4 indisponible**.

L’état de séance distingue désormais explicitement `idle`, `running`, `paused`, `completed` et `interrupted`. La commande globale est accessible par le bouton `•••` du header pendant les exercices et les transitions. Elle ne remplace pas le bouton **Interrompre**, qui continue à agir uniquement sur le timer courant.

## Lancer le projet localement sur Mac

Un service worker ne fonctionne pas correctement en ouvrant directement `index.html` depuis le Finder. Il faut utiliser un petit serveur local.

1. Ouvrir Terminal.
2. Se placer dans le dossier du projet :

   ```bash
   cd /chemin/vers/phoenix
   ```

3. Lancer le serveur avec l’une de ces commandes :

   ```bash
   python3 -m http.server 8000
   ```

   Si Python 3 n’est pas disponible :

   ```bash
   ruby -run -e httpd . -p 8000
   ```

4. Ouvrir `http://localhost:8000` dans Safari.
5. Pour arrêter le serveur, revenir dans Terminal et appuyer sur `Control-C`.

`localhost` est accepté pour les tests PWA sur le Mac. L’installation sur iPhone exige une URL HTTPS.

## Publier sur GitHub Pages

1. Créer un nouveau dépôt GitHub, par exemple `phoenix`.
2. Dans Terminal, depuis le dossier du projet :

   ```bash
   git init
   git add .
   git commit -m "Publier PHOENIX PWA"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/phoenix.git
   git push -u origin main
   ```

3. Sur GitHub, ouvrir **Settings → Pages**.
4. Dans **Build and deployment**, choisir **Deploy from a branch**.
5. Sélectionner la branche **main**, le dossier **/(root)**, puis cliquer sur **Save**.
6. Attendre la publication, puis ouvrir l’URL HTTPS indiquée par GitHub, généralement `https://VOTRE-COMPTE.github.io/phoenix/`.

Les chemins de l’application sont relatifs : elle fonctionne donc aussi bien à la racine d’un domaine que dans le sous-dossier créé par GitHub Pages.

## Installer PHOENIX sur un iPhone

1. Ouvrir l’URL HTTPS publiée dans **Safari** sur l’iPhone.
2. Attendre que la page et les illustrations soient complètement chargées une première fois.
3. Toucher le bouton **Partager** de Safari.
4. Faire défiler la feuille de partage et choisir **Ajouter à l’écran d’accueil**.
5. Conserver le nom **PHOENIX**, puis toucher **Ajouter**.
6. Lancer PHOENIX depuis son icône sur l’écran d’accueil. L’application s’ouvre en plein écran, sans l’interface de Safari.

Pour vérifier le hors-ligne, ouvrir PHOENIX une première fois en ligne, fermer l’application, activer le mode avion, puis la relancer depuis son icône.

## Mettre à jour une nouvelle version

1. Modifier les fichiers du projet.
2. Dans `service-worker.js`, changer la valeur de `CACHE_VERSION`, par exemple :

   ```js
   const CACHE_VERSION = 'phoenix-v0459-1';
   ```

   Cette étape est indispensable lorsque des fichiers, illustrations ou icônes changent : l’ancien cache sera supprimé à l’activation de la nouvelle version.

3. Enregistrer et publier les modifications :

   ```bash
   git add .
   git commit -m "Mettre à jour PHOENIX"
   git push
   ```

4. Attendre la fin du déploiement GitHub Pages.
5. Ouvrir PHOENIX avec une connexion Internet. La nouvelle version du service worker est téléchargée et prend le contrôle. Si l’ancienne version reste affichée, fermer complètement l’application puis la rouvrir.

Les sons ne sont pas des fichiers externes : les bips sont générés localement par l’API audio du navigateur et restent disponibles hors connexion.
