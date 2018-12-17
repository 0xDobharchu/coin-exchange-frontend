import LANDINGPAGE_ACTION from './type';

const initState = {
  faqContent: [],
};

export default (state = initState, { type, data }) => {
  switch (type) {
    case `${LANDINGPAGE_ACTION.GET_ABOUT_CONTENT}_SUCCESS`: {
      return {
        ...state,
        aboutContent: data?.content,
        staticTitle: data?.title,
      };
    }
    case `${LANDINGPAGE_ACTION.GET_FAQ_CONTENT}_SUCCESS`: {
      return {
        ...state,
        faqContent: data,
      };
    }
    case `${LANDINGPAGE_ACTION.GET_USER_AGREEMENT_CONTENT}_SUCCESS`: {
      return {
        ...state,
        userAgreementContent: data?.content,
      };
    }
    case `${LANDINGPAGE_ACTION.GET_PRIVACY_CONTENT}_SUCCESS`: {
      return {
        ...state,
        privacyContent: data?.content,
      };
    }
    case `${LANDINGPAGE_ACTION.GET_PROMOTION_CONTENT}_SUCCESS`: {
      return {
        ...state,
        promotionContent: data?.content,
      };
    }
    case `${LANDINGPAGE_ACTION.GET_HOW_IT_WORKS_CONTENT}_SUCCESS`: {
      return {
        ...state,
        howItWorksContent: data?.content,
      };
    }

    default:
      return state;
  }
};
