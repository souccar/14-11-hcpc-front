// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    hmr: false,
    appConfig: 'appconfig.json',
    buyUrl: 'https://1.envato.market/6NV1b',
   
    SCARF_ANALYTICS: false,
    adminRoot: '/app',
    apiUrl: 'https://api.coloredstrategies.com',
    defaultMenuType: 'menu-default',
    subHiddenBreakpoint: 1440,
    menuHiddenBreakpoint: 768,
    themeColorStorageKey: 'vien-themecolor',
    isMultiColorActive: true,
    /*
    Color Options:
    'light.blueyale', 'light.blueolympic', 'light.bluenavy', 'light.greenmoss',
    'light.greenlime', 'light.yellowgranola', 'light.greysteel', 'light.orangecarrot',
    'light.redruby', 'light.purplemonster'
  
    'dark.blueyale', 'dark.blueolympic', 'dark.bluenavy', 'dark.greenmoss',
    'dark.greenlime', 'dark.yellowgranola', 'dark.greysteel', 'dark.orangecarrot',
    'dark.redruby', 'dark.purplemonster'
    */
    defaultColor: 'light.blueyale',
    isDarkSwitchActive: true,
    defaultDirection: 'ltr',
    themeRadiusStorageKey: 'vien-themeradius',
    isAuthGuardActive: true,
    firebase: {
        apiKey: 'AIzaSyCqoNLB_jTw4nncO12qR-eDH9gAeWiZVaw',
        authDomain: 'vien-angular-login.firebaseapp.com',
        databaseURL: 'https://vien-angular-login.firebaseio.com',
        projectId: 'vien-angular-login',
        storageBucket: 'vien-angular-login.appspot.com',
        messagingSenderId: '16217062888',
        appId: '1:16217062888:web:6b08232ca0c9662fedb85d',
        measurementId: 'G-8ETT79WRRN'
    }
};
