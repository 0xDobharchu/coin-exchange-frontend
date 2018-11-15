import injectScript from 'src/utils/injectScript';

function init() {
  const initCode = `window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
    d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
    _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute("charset","utf-8");
    $.src="https://v2.zopim.com/?69pW4ZhZDGKoPiRyW2Ka7BiJBBZXgaVe";z.t=+new Date;$.
    type="text/javascript";e.parentNode.insertBefore($,e)})(document,"script");
  `;
  if (__CLIENT__) {
    injectScript({ fromCode: initCode }).then(() => {
      if (APP_ENV.ZOPIM_CHAT_ACCOUNT_KEY) {
        window?.zChat?.init({
          account_key: APP_ENV.ZOPIM_CHAT_ACCOUNT_KEY
        });
      } else {
        console.warn('Missing zopim account key!');
      }
    }).catch(console.error);
  }
}

export default {
  init
};
