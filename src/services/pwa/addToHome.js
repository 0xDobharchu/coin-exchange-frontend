let deferredPrompt;

export const registerService = () => {
  return new Promise((resolve) => {
    // only run on browser
    if (!__CLIENT__) return;

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // Stash the event so it can be triggered later.
      e.preventDefault();
      deferredPrompt = e;
      resolve(e);
    });

    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;
      resolve(null);
    });
  });
};

export const addToHome = () => {
  // only run on browser
  if (!__CLIENT__) return Promise.resolve(null);

  if (!deferredPrompt) return Promise.resolve(null);

  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  return deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        return true;
      } else {
        return false;
      }
    });
};