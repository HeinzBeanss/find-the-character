const config = {
  apiKey: "AIzaSyAG-z2QOtLeZUr8cjc00p29EvAqCjHXRyI",
  authDomain: "find-the-character-fd842.firebaseapp.com",
  projectId: "find-the-character-fd842",
  storageBucket: "find-the-character-fd842.appspot.com",
  messagingSenderId: "37428567468",
  appId: "1:37428567468:web:41f2700f728230468d2e09"
};

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
  }