// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBkNQdiMw3oUZ3JQH2umjODpdtrKic6OLw",
    authDomain: "chat-application-api-3f88c.firebaseapp.com",
    databaseURL: "https://chat-application-api-3f88c-default-rtdb.firebaseio.com",
    projectId: "chat-application-api-3f88c",
    storageBucket: "chat-application-api-3f88c.appspot.com",
    messagingSenderId: "627221044300",
    appId: "1:627221044300:web:af204a7d20fad6feac68e9",
    measurementId: "G-E1DSQ9PWBX"
  },
  baseURL : "https://us-central1-chat-application-api-3f88c.cloudfunctions.net",
  subRoute: "user"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
