# alias-game

Alias online game at https://alias-game.web.app/.

## Setup locally

`yarn && yarn dev`

## Firebase Hosting & Deploy

Firstly, set Firebase CLI (https://firebase.google.com/docs/hosting/quickstart#install-cli).

`firebase login` - sign in to Google

`yarn && yarn build` - build prod bundle

`firebase serve` - test project locally

`firebase deploy` || `firebase deploy -m "Deploying the best new feature ever."` - deploy || deploy with message

`firebase logout` - logout from Google

Serve files must be located in public folder.
