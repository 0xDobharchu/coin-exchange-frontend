import injectScript from 'src/utils/injectScript';

function init() {
  if (__CLIENT__ && !window.$zopim) {
    injectScript({ fromSrc: 'https://v2.zopim.com/?69pW4ZhZDGKoPiRyW2Ka7BiJBBZXgaVe' }).then(() => {
      if (APP_ENV.ZOPIM_CHAT_ACCOUNT_KEY) {
        window?.zChat?.init({
          account_key: APP_ENV.ZOPIM_CHAT_ACCOUNT_KEY
        });
        
        window?.$zopim?.livechat?.button?.setOffsetVerticalMobile(70);
      } else {
        console.warn('Missing zopim account key!');
      }
    }).catch(console.error);
  }
}

export default {
  init
};
