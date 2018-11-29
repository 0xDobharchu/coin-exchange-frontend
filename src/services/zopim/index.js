import injectScript from 'src/utils/injectScript';

function init() {
  if (__CLIENT__ && !window.$zopim) {
    injectScript({ fromSrc: 'https://v2.zopim.com/?69pW4ZhZDGKoPiRyW2Ka7BiJBBZXgaVe' }).then(() => {
      console.log('Chat was loaded successfully!');
      window?.$zopim?.livechat?.button?.setOffsetVerticalMobile(70);
    }).catch(console.error);
  }
}

export default {
  init
};
