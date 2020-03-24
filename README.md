# signaleo

Mobile app to share news in the street , car and taxi-pooling.

# environnement et outil de dev

## Vscode

- install vscode
- ### outils et plugin pour bien coder
      cherchez dans marketplace de vscode
      > prettier
      > Git Graph (ra sanatry mipoka ny gitkraken)
      > gitlens (ahitana izay nanao le modif par ligne de code)
      > Auto import
      > ES7 React/Redux/GraphQL/React-Native snippets
      > React Native snippets
      > turbo console log
- ### files > preferences > settings > (en haut a droite) open settings (json)
      	conf a insérer dans le fichier settings.json de vsCode afin d'avoir les auto-formatages et avoir la même structure de code pour tout le monde.

```javascript
{
"editor.formatOnSave": true,
"typescript.updateImportsOnFileMove.enabled": "always",
"javascript.updateImportsOnFileMove.enabled": "always",
"prettier.singleQuote": true,
"prettier.trailingComma": "all",
"editor.tabSize": 2,
"editor.wordWrap": "on",
}
```

## Nodejs

Installer NVM pour pouvoir swittcher rapidement et facilement de version de nodejs

[https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)

**ou**

[https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/)

## Yarn

- Installer yarn et l'utiliser à la place de npm

## Typescript

- Eviter les erreurs d'exécution car strict
- Permet d'avoir de l'autocompletion

## android studio

- Nous avons uniquement besoin de sdkmanager et de adb et java mais c'est plus simple d'installer entièrement android studio
- config env variable :

### - ubuntu et macOS (plus ou moins similaire), copier coller dans ~/.bashrc

    export ANDROID_HOME=$HOME/Android/Sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    export PATH=$PATH:$ANDROID_HOME/platform-tools

    export JAVA_HOME='/usr/local/android-studio/jre'

### - windows (mila mijery tuto)

https://developer.android.com/studio/command-line/variables

https://stackoverflow.com/questions/23042638/how-do-i-set-android-sdk-home-environment-variable

## watchman

[https://facebook.github.io/watchman/docs/install.html](https://facebook.github.io/watchman/docs/install.html)

## doc officiel

[https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
