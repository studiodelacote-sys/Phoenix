# PHOENIX V0.442 — PWA iPhone/iPad

PHOENIX est une Progressive Web App autonome, sans framework. La séance dure 15 minutes programmées et fonctionne hors connexion après une première ouverture réussie en ligne.

La V0.442 ajoute une jauge continue sur chaque répétition complète, des annotations SVG légères dans le plein écran du squat, du tirage et du pont fessier, ainsi que le Screen Wake Lock lorsqu’il est disponible. En fin de séance, **Recommencer** revient au premier exercice sans le démarrer et **Quitter** revient à l’accueil en nettoyant entièrement la session.

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
   const CACHE_VERSION = 'phoenix-v044-1';
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
