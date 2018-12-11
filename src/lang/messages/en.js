export default {
  app: {
    title: 'Coinbowl：购买和出售大量比特币',
    description: '大量购买和出售比特币和其他加密货币。 支持银行转账，现金和信用卡。 所有交易都有保险',
    keywords: '区块链技术，以太坊，比特币，加密货币，加密，交换平台，用现金购买比特币，购买大量比特币',
    name: 'Coinbowl',
    navigation: {
      me: 'Profile',
      coin: 'Coin',
      wallet: 'Wallet',
      home: 'Home'
    },
    common: {
      error: 'OH! something went wrong!',
      required: 'Required',
      copied: 'Copied',
      remove: 'Remove',
      save: 'Save',
      update: 'Update',
      delete: 'Delete',
      fileupload: 'Try dropping some files here, or click to select files to upload.'
    }
  },
  headerBar: {
    home: 'Home',
    promotionPrograms: 'Promotion Programs',
    contactUs: 'Contact Us',
    aboutUs: 'About Us',
    faq: 'FAQ',
    wallet: 'Wallet',
    signIn: 'Sign In',
    signUp: 'Sign Up'
  },
  error: {
    required: 'Required',
    requiredOne: 'You need to fill in one of these!',
    greaterThan: 'Must be greater than {min}',
    lessThan: 'Must be less than {max}',
    greaterThanEqual: 'Must be equal or greater than {min}',
    lessThanEqual: 'Must be less than or equal {max}',
    mustBeANumber: 'Must be a number',
    mustBeAPositiveInteger: 'Must be a integer number greater or equal 0',
    serverCode: {
      generalCode400: 'Something went wrong, please try again!',
      coinUserOverLimit: 'Over Coin limit',
      amountIsTooSmall: 'Amount is too small'
    }
  },
  me: {
    navigation: {
      accountInfo: 'My Profile',
      preferecens: 'Preferences',
      accountLevel: 'Account Level',
      history: 'History',
      bankInfo: 'Bank Info',
      referral: 'Referral'
    },
    accountInfo: {
      email: 'Email',
      nickname: 'Nickname',
      nickname_note: 'This name will be shown in your preview',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      changePassword: 'Change Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      legalName: 'Legal Name',
      country: 'Country',
      currency: 'Local Currency',
      language: 'Language',
      save: 'Save',
      userProfile: 'User Profile',
      personalDetails: 'Personal Details',
      personalDetailsDesc: 'Your personal information is never shown to other users',
      referralTitle: 'Referral',
      referralLink: 'Your Referral Link Here: ',
      referral: {
        name: 'Name',
        status: 'Status',
        date: 'Date'
      },
      referralEarningTitle: 'Referral Earning',
      referralEarning: {
        from: 'From',
        type: 'Type',
        value: 'Value',
        date: 'Date'
      },
      alert: {
        passwordSuccess: 'Update Password Success',
        passwordFailed: 'Update Password Failed',
        success: 'Success',
        failed: 'Failed',
      },
      validate: {
        newPasswordRequired: 'New Password is required'
      }
    },
    setting: {
      title: 'General Settings'
    },
    history: {
      title: 'Transaction History',
      date: 'Date',
      refcode: 'Ref Code',
      type: 'Type',
      amount: 'Amount',
      viewDetail: 'View Detail',
      status: 'Status',
      value: 'Value',
      link: 'Link',
      action: 'Action',
      cancel: 'Cancel',
      close: 'Close',
      detail: 'Transaction Detail',
      orderStatus: {
        pending: 'Pending',
        processing: 'Processing',
        fiat_transferring: 'Fiat Transferring',
        transferring: 'Transferring',
        transferred: 'Transferred',
        success: 'Success',
        transfer_failed: 'Transfer Failed',
        cancelled: 'Cancelled',
        rejected: 'Rejected',
        expired: 'Expired',
      },
      dialog: {
        cancel: {
          title: 'Cancel Order',
          body: 'Are you sure to cancel?',
          confirm: 'Yes',
          cancel: 'No',
        }
      },
      direction: {
        buy: 'Buy',
        sell: 'Sell'
      },
      alert: {
        cancelSuccess: 'Successfully Cancelled',
        cancelFailed: 'Failed To Cancel'
      }
    },
    accountLevel: {
      head_text: 'Our verification process typically takes just a few minutes. This may take slightly longer outside business hours. Your information will remain 100% private.',
      step1: 'Level 1 : Email Verification',
      step2: 'Level 2 : Phone Verification',
      step3: 'Level 3 : ID Card Verification',
      step4: 'Level 4 : Upload Photo Selfie',
      wrm1: 'Trade with a limit upto {limit} {currency} a day.',
      wrm2: 'Trade with the top limit of {limit} {currency} a day.',
      wrm3: 'Trade with the top limit of {limit} {currency} a day.',
      wrm4: 'Unlimited Amount.',
      lv3desc: 'To comply with relevant anti-money laundering (AML) and counter-terrorism financing (CTF) laws and regulations.',
      fullName: 'Full Name',
      fullNameDesc: 'Please enter your full name',
      documentType: 'Document Type',
      documentNumber: 'Document Number',
      documentNumberDesc: 'Document Number',
      emailDesc: 'Enter your email',
      phoneCode: 'Enter your code',
      emailButton: 'SEND',
      backPhoto: 'Back Photo',
      frontPhoto: 'Front Photo',
      selfiePhoto: 'Your Selfie Photo',
      submit: 'Submit',
      ok: 'OK',
      resend: 'Resend',
      alert: {
        lv2: 'Congratulation! Your level is upto level 2',
        lv3: 'Your request upto level 3 is sent',
        lv4: 'Your request upto level 4 is sent',
        invalidPhone: 'Invalid Phone',
        sendPhoneCodeSuccess: 'We sent the secret code to your phone.',
        sendEmailCodeSuccess: 'We sent a verification code to your email',
        imageIdentifierRequired: 'Back/Front Image is required',
        imageIdentifierPassportRequired: 'Passport Photo is requied',
        imageSelfieRequired: 'Image Selifie is required',
        overSMSLimit: 'You entered wrong verification code 10 times already. Please use the last code sent to your phone to verify.',
        invalidCode: 'Your code is incorrect, please try again!',
        error: 'OH! something went wrong! Please try again',
      },
      levelStatus: {
        pending: 'Pending',
        processing: 'Processing',
        rejected: 'Rejected',
        approved: 'Verified',
      },
      idTypes: {
        passport: 'Passport',
        driver_license: 'Driver License',
        id_card: 'Government ID Card'
      }
    },
    bankInfo: {
      title: 'Bank Info',
      desc: 'Add your bank account details now to receive attractive commission from referral programs and faster payment',
      bankName: 'Bank Name',
      bankAccountName: 'Account Name',
      bankAccountNumber: 'Account Number',
      bankNameHolder: 'Enter Bank Name',
      bankAccountNameHolder: 'Enter Bank Account Name',
      bankAccountNumberHolder: 'Enter Bank Account Number',
      alert: {
        success: 'Successfully Updated',
        failed: 'Failed To Update',
        deleteSuccess: 'Successfully Deleted',
        deleteFailed: 'Failed To Delete'
      },
      dialog: {
        update: {
          title: 'Confirm Update',
          body: 'Are you sure to update?',
          confirm: 'Yes',
          cancel: 'No'
        },
        delete: {
          title: 'Confirm Delete',
          body: 'Are you sure to delete?',
          confirm: 'Yes',
          cancel: 'No'
        }
      }
    }
  },
  COIN_EXCHANGE_LP_FAQ_TITLE: 'Frequently asked questions',
  'landing_page.label.footer': 'Coinbowl.com is an online exchange developed by Shanzhai Limited, a Hong Kong based company, offering bulk crypto purchasing at competitive prices with full delivery service.<br />Join the dojo: <a href="https://t.me/coin_bowl" class="landing-link">t.me/coin_bowl</a><br />Contact us: <a href="mailto:support@coin_bowl.com" class="landing-link" target="_top">support@coin_bowl.com</a>',
  user: {
    setting: 'Settings',
    logout: 'Sign out',
    login: {
      title: 'Sign in to Coinbowl',
      username: 'Your email',
      password: 'Password',
      loginButton: 'Sign in',
      keepSignin: 'Keep me signed in',
      registerButton: 'Don\'t have an account?',
      forgetPassword: 'Forget password?',
      requiredPassword: 'Please enter your password',
      notValidPassword: 'Password must be 8 characters or more',
      notValidUsername: 'Invalid email address',
      requiredUsername: 'Please enter your email',
      loginFailure: 'Email and password not match.',
      warningVerify: 'To start trading, please take a few minutes to verify your account. {action}',
      warningVerifyNow: 'Verify now'
    },
    forgetPassword: {
      title: 'Forgot your password?',
      description: 'Please type your email you used to sign in to reset your password. You may need to check your spam folder or unblock info@coinbowl.com',
      username: 'Your email',
      requiredUsername: 'Email is required',
      notValidUsername: 'Invalid email address',
      submitButton: 'Submit',
      resetPasswordIntro: 'We have sent a link to your email. Please follow the instruction to sign in with new password',
      newPasswordTitle: 'Enter a new password for your {email} account.',
      password: 'New password',
      requiredPassword: 'Password is required',
      notValidPassword: 'Password must be 8 characters or more',
      confirmPassword: 'Retype new password',
      notValidConfirmPassword: 'Confirm password not match',
      newPasswordIntro: 'Password of Coinbowl account for {email} has been changed',
      notRecoverPass: 'I can’t recover my account using this page'
    },
    register: {
      title: 'Create your account',
      firstName: 'First name',
      requiredFirstName: 'First name is required',
      placeholderFirstName: 'Enter your first name',
      lastName: 'Last name',
      placeholderLastName: 'Enter your last name',
      requiredLastName: 'Last name is required',
      placeholderNickName:'Enter your nick name',
      requiredNickName:'Nick name is required',
      notValidNickName: 'Nickname must be greater than 3 and less than 30 characters, Allowed characters are a-z, 0-9, _, - (dash), and .(dot).',
      username: 'Your email',
      requiredUsername: 'Username is required',
      notValidUsername: 'Invalid email address',
      password: 'Password',
      requiredPassword: 'Password is required',
      notValidPassword: 'Password must be 8 characters or more',
      placeholderPassword: 'Enter your password',
      confirmPassword: 'Confirm password',
      notValidConfirmPassword: 'Confirm password not match',
      placeholderConfirmPassword: 'Enter confirm password',
      country: 'Country',
      placeholderCountry: 'Please select your country',
      requiredCountry: 'Country is required',
      notValidReCaptcha: 'Please validate your reCAPTCHA.',
      agreement: 'I certify that I am 18 years of age or older, and I agree to the {action}',
      requiredAgreement: 'Please indicate that you have read and agree to the User Agreement and Privacy Policy',
      registerButton: 'Create account',
      loginButton: 'Already have an account?',
      registerSuccessfully: 'You have registered successfully. Don’t forget to verify your email later.',
      agreementAction: 'User Agreement and Privacy Policy.'
    }
  },
  landingPage: {
    contactUS:{
      title: 'Contact US',
      yourName: 'Your name',
      requiredYourName: 'Your name is required',
      placeholderYourName: 'Enter your name',
      email: 'Your email',
      placeholderYourEmail: 'Enter your email',
      requiredEmail: 'Your email is required',
      notValidEmail: 'Invalid email address',
      phone: 'Your phone',
      placeholderPhone: 'Enter your phone number',
      description: 'Your message',
      placeholderDescription: 'Enter your message',
      requiredDescription: 'Your message is required',
      contactButton: 'Submit',
      message: 'Thank you! Your message has been sent. You should receive a response from one of our representatives within 12-24 hours.'

    }
  },
  wallet: {
    title: 'Coinbowl Wallet',
    top_banner: {
      message: 'Shuriken Airdrop (limited)',
      button: 'Click here',
    },
    refers: {
      header: 'Shuriken Airdrop Mission',
      error: {
        submit_telegram: 'Couldn\'t find you on Telegram. Please exit the group and try again.',
        submit_twitter: 'You haven\'t followed us yet. Please try again.',
        confirm_code: 'Verification code is wrong. Please try again!',
        verify_code: 'Can\'t send verify email',
        get_token: 'Referral incomplete. Please try again.',
      },
      success: {
        submit_telegram: 'Welcome to our telegram group!',
        submit_twitter: 'Thanks for following us on Twitter.',
        confirm_code: 'Your email has been verified.',
        verify_code: 'Verification code has been sent to your email.',
        get_token: 'Success! 60 shurikens have been added to your wallet.',
        copy_link: 'Referral link copied to clipboard.',
      },
      button: {
        verified: 'Verified',
        verify: 'Verify',
        confirm: 'Confirm',
        reset_email: 'Reset email',
        get_token: 'Just give me tokens',
      },
      text: {
        title: '60 shiny Shurikens (SHURI).',
        telegram: 'Say hello on telegram.',
        telegram2: 'Leave your best joke for a chance to win more Shuri.',
        twitter: 'Twitter',
        twitter2: 'Our social media guy says we need followers on ',
        ninja_name: 'Receive your randomly generated ninja name.',
        referral_link: 'This is your super sexy referral link. You get 20 shurikens for every new ninja.',
        menu_amount: 'Shurikens straight into your pocket, when new ninjas bet through your referral link.',
        menu_total: 'ninja{0} you\'ve brought in.',
        profile_link: 'Share to get 20 free tokens.',
      },
      placeholder: {
        telegram_username: 'Your telegram alias',
        twitter_username: 'Your twitter username',
        email: 'Verification code',
        email2: 'Your favourite fake email',
      },
      label: {
        menu: 'Your clan',
        menu_description: 'Track your referrals and rewards here.',
      },
      table: {
        header: {
          user: 'User',
          date: 'Date',
          referalValue: 'Referal Value',
        },
      },
    },
    refers_dashboard: {
      header: 'Shuriken Airdrop Mission',
      title: 'This is your super sexy referral link. You get 20 shurikens for every new ninja.',
      text: {
        copy_link: 'Referral link copied to clipboard.',
        note: 'Do not change your alias or this link will be unvalid',
        number_ninjas: 'You brought {0} ninjas to the dojo.',
        number_total: 'Total reward: {0} SHURI',
      },
    },
    action: {
      payment: {
        button: {
          checkout: 'Checkout',
        },
        label: {
          from_wallet: 'From wallet',
          to_address: 'To address',
          wallet_balance: 'Wallet balance',
          email: 'Email',
          shop_id: 'Shop ID',
          confirm_url: 'Confirm URL',
          shop_name: 'Shop/App name',
          note: 'Note',
          crypto_currency: 'Crypto Currencies',
        },
        placeholder: {
          to_address: 'Wallet address...',
          select_wallet: 'Select a wallet',
        },
        error: {
          insufficient: 'You have insufficient coin to make the transfer.',
        },
        menu: {
          developer_docs: 'Developer Docs',
          payment_buttons: 'Payment Buttons',
          help: 'Help & Support',
        },
      },
      preferecens: {
        list_item: {
          wallet_name: 'Wallet Name',
          hide_balance: 'Hide Balance',
          backup_wallet: 'Backup Wallet',
          export_private_key: 'Export Private Key',
          delete_wallet: 'Delete Wallet',
        },
        update_name: {
          title: 'Wallet name',
          label: 'What do you call this wallet?',
          button: {
            save: 'Save',
          },
        },
      },
      redeem: {
        title: 'Redeem to coin',
        your_code: 'Reedem code',
        giftcard: 'Gift Amount',
        value: 'Value',
        agree_text: 'By clicking REDEEM, you agree to Gift Card & Promotional code {0} as applicable',
        button_redeem: 'Redeem now',
        button_check: 'Check redeem code',
        swipe_button_redeem: 'Swipe to redeem',
        find_code: 'How do find claim code?',
        invalid_code: 'Invalid redeem code'
      },
      remove: {
        title: 'Remove',
        header: 'Are you sure?',
        message: 'This will permanently delete your wallet.',
        button_yes: 'Yes, remove',
        button_cancel: 'Cancel',
      },
      transfer: {
        title: 'Transfer coins',
        header: 'Transfer coins',
        to_address: {
          placeholder: 'Specify receiving...',
        },
        label: {
          from_wallet: 'From wallet',
          to_address: 'To wallet address',
          to_address2: 'To address',
          amount: 'Amount',
          usd: 'USD',
          wallet_balance: 'Wallet balance',
          scan_qrcode: 'Scan QR code',
          init_scanner: 'Initiating Camera. Please wait',
          gas_limit: 'Gas Limit',
          data: 'Data',
          feel_level: 'Fee:',
          max_amount: 'Max amount',
          from_contact: 'From contacts',
        },
        placeholder: {
          to_address: 'Wallet address...',
          select_wallet: 'Select a wallet',
        },
        text: {
          confirm_transfer: 'Are you sure you want to transfer out ',
        },
        error: {
          not_enough_coin: 'You don\'t have enough coin right now.',
          max_amount: 'Your balance isn\'t enough to transaction fee.',
          wallet_not_found: ' wallet is not found to transfer.'

        },
        button: {
          transfer: 'Transfer',
          confirm: 'Confirm',
        },
      },
      copy: {
        title: 'Copy address to clipboard',
        message: 'Copy address to clipboard',
        success: 'Copied to clipboard',
      },
      default: {
        title: 'Set as default {0} wallet ',
      },
      cancel: {
        title: 'Cancel',
      },
      restore: {
        title: 'Restore wallets',
        error: 'Invalid wallets',
        header: 'Restore wallets',
        success: {
          restore: 'Your Wallet restore success',
        },
        button: {
          restore: 'Restore now',
        },
        description: 'Please enter your top secret recovery data to restore your wallet.',
      },
      export_private_key: {
        title: 'Export at your risk!',
        desc: 'Anyone with your Private Key will have FULL access to your wallet!!!',
      },
      setting: {
        title: 'Settings',
        error: 'Invalid wallets',
        header: 'Wallet Settings',
        success: {
          restore: 'Your Wallet restore success',
          save_alternative_currency: 'Save currency selected!',
          save_crypto_address: 'Save format crypto address seleted!',
        },
        label: {
          alternative_currency: 'Currency',
          select_alternative_currency: 'Select currency',
          crypto_address: 'Cryptocurrency address',
          select_crypto_address: 'Select cryptocurrency address',
          short_address: 'Show short address',
          shortest_address: 'Show shortest address',
          hide_address: 'Hide address',
          passcode: 'Passcode',
          push_notifications: 'Push Notifications',
          community: 'Community',
          wallet_account: 'Wallet Account',
          support: 'Support',
          address_book: 'Address Book',
          contact_name: 'Name',
          contact_email: 'Email',
          contact_address: 'Address',
          contact_send_money: 'Send Money',
          contact_remove: 'Remove',
          contact_empty_title: 'No contacts yet',
          contact_empty_desc: 'Get started by adding your first one.',
          contact_empty_button: 'Add contact',
          contact_add_contact_search_box: 'Search a contact ...',
          select_a_contact: 'Select a contact',
          add_new_address: '+ add new',
          remove_new_address: 'remove',
          update_button_text: 'Update',
          update_title_text: 'Update contact',
          select_an_address: 'Select an address',
        },
        button: {
          restore: 'Restore now',
        },
        description: 'Please enter your top secret recovery data to restore your wallet.',
      },
      import: {
        title: 'Add new / Import coin',
      },
      add_token: {
        title: 'Add custom token',
      },
      add_collectible: {
        title: 'Add collectible',
      },
      backup: {
        title: 'Backup wallets',
        header: 'Backup wallets',
        description: 'This data is the only way to restore your wallets. Keep it secret, keep it safe.',
        success: {
          copied: 'Recovery data copied to clipboard.',
        },
        button: {
          copy: 'Copy it somewhere safe',
        },
      },
      protect: {
        header: 'Secure this wallet',
        title: 'Secure this wallet',
        text: {
          step1_msg1: 'This passphrase will allow you to recover your funds if your phone is ever lost or stolen.',
          step1_msg2: 'Please make sure nobody has access to your passphrase. You can use a password manager or write it down and hide it under your mattress.',
          step1_label: 'I understand that if I lose my passphrase, I lose access to my account.',
          step2_msg1: 'Record these words carefully. Don\'t email it or screenshot it.',
          step3_msg1: 'Tap to put these words in the correct order.',
          need_secure: 'Need secure',
          need_backup: 'Needs Backup',
        },
        button: {
          continue: 'Continue',
          verify: 'Verify your passphrase',
          copy_clipboard: 'Copy to clipboard',
          ok: 'OK',
        },
        error: {
          confirm: 'These words are in the wrong order. Please try again.',
        },
        success: 'Your wallet has been secured!',
      },
      receive: {
        title: 'Receive coins',
        header: 'Wallet address',
        header2: 'Custom Amount',
        message: 'Share your public wallet address to receive',
        title2: 'MY DESPOSIT ADDRESS',
        label: {
          address: 'Address',
          amount: 'Amount',
          usd: 'USD',
        },
        placeholder: {
          amount: 'Specify amount ...',
          choose_wallet: 'Choose a wallet ...',
        },
        link: {
          copy_address: 'Copy address',
          download_qrcode: 'Download QR code',
        },
        button: {
          share: 'Copy to share',
          request_amount: 'Request Specific amount ➔',
          done: 'Done',
          text: 'Copy address',
        },
        success: {
          share: 'Wallet address copied to clipboard.',
        },
      },
      create: {
        header: 'Create new wallet',
        label: {
          select_coints: 'Select coins',
          wallet_key: 'Wallet key',
          main_net: 'Mainnet wallets',
          test_net: 'Testnet',
          header_coins: 'Cryptocurrencies',
          header_tokens: 'ERC20 Tokens',
          header_collectibles: 'ERC721 Collectibles',
        },
        text: {
          random: 'Random',
          specify_phrase: 'Specify recovery Phrase',
        },
        placeholder: {
          wallet_key: 'Wallet key',
          phrase: 'Type your 12 secret recovery words.',
        },
        button: {
          create: 'Create wallet',
          add_new: '+ Add new',
          done: 'Done',
          request_free_eth: 'Request free ETH',
        },
        error: {
          recovery_words_invalid: 'Cannot create wallet. Recovery words are invalid.',
          random: 'Cannot create wallet. Please reload and try again',
        },
      },
      scan_qrcode: {
        header: 'Scan QR code',
      },
      transaction: {
        header: 'Transaction details',
      },
      history: {
        title: 'View transaction history',
        header: 'Transaction history',
        label: {
          balance_hidden: 'Balance Hidden',
          failed: 'Failed',
          pending: 'Pending',
          unconfirmed: 'Unconfirmed',
          balance: 'Balance',
          transactions: 'Transactions',
          status: 'Status',
          confirmations: 'confirmations',
          success: 'success',
          error: 'Error',
          detail_etherscan: 'View detail on etherscan.io',
          detail_blockchaininfo: 'View detail on bitpay.com',
          view_all_etherscan: 'Watch etherscan',
          self: 'Self',
          sent: 'Sent',
          received: 'Received',
          create: 'Create',
          transfer: 'transfer',
          from: 'from',
          to: 'to',
          internal_transactions: 'Internal',
          no_trans: 'No transactions yet',
          no_internal_trans: 'No internal transactions yet',
          coming_soon: 'Coming soon ...',
          send: 'Send',
          receive: 'Receive',
        },
      },
    },
  },
  bitcoin: {
    error: {
      invalid_address: 'You can only send tokens to Bitcoin address',
      invalid_address2: 'Please enter a valid receiving address.',
      insufficient: 'You have insufficient coin to make the transfer.',
    },
    success: {
      transaction: 'Your transaction will appear on blockchain in about 30 seconds.',
    },
  },
  bitcoin_cash: {
    error: {
      invalid_address: 'You can only send tokens to BitcoinCash address',
      invalid_address2: 'Please enter a valid receiving address.',
      insufficient: 'You have insufficient coin to make the transfer.',
    },
    success: {
      transaction: 'Your transaction will appear on blockchain in about 30 seconds.',
    },
  },
  ethereum: {
    error: {
      invalid_address: 'You can only send tokens to Ethereum address',
      invalid_address2: 'Please enter a valid receiving address.',
      insufficient: 'You have insufficient coin to make the transfer.',
      insufficient_gas: 'You have insufficient coin to make the transfer with gas fee.',
    },
    success: {
      transaction: 'Your transaction will appear on blockchain in about 30 seconds.',
    },
  },
  ripple: {
    error: {
      invalid_address: 'You can only send tokens to Ripple address',
      invalid_address2: 'Please enter a valid receiving address.',
      insufficient: 'You have insufficient coin to make the transfer.',
      insufficient_gas: 'You have insufficient coin to make the transfer with gas fee.',
    },
    success: {
      transaction: 'Your transaction will appear on blockchain in about 30 seconds.',
    },
  },
  requirePassword: {
    passNotMatch: 'Password do not match, please try again.',
    title: 'Wallet Security',
    description: 'Please enter your password to Unlock wallet',
    btnUnlockText: 'Unlock',
  },
  review: {
    title: 'Review',
    label: {
      description: 'How is your experience with Coinbowl?',
      required: 'Please enter your comments',
      submitButtonTitle: 'Submit',
      loadMore: 'Load more',
      comments: '{numReview} comments',
      button: 'Submit',
    },
    thanksMessage: 'Thank you! Your message has been sent.'
  },
  coin: {
    buyTabTitle: 'BUY COIN',
    sellTabTitle: 'SELL COIN',
    introText: 'Buy & Sell Crypto at best prices',
    subIntroText: 'See how it works',
    buy: {
      orderSuccessMsg: 'Your order was created successfully!',
      orderFailedMsg: 'Create order failed, please try again!',
      userAddress: 'Address',
      userPhone: 'Phone',
      userNote: 'As soon as possible',
      buyBtn: 'Buy {amount} {currency}',
      confirmMsg: 'Do you want to buy {amount} {currency}?'
    },
    sell: {
      prepareOrderFailed: 'Failed while preparing to order, please try again',
      addPaymentInfoFailed: 'Failed while adding your payment info',
      orderSuccessful: 'Your order was created successfully',
      orderFailed: 'Error while making new order, pls try again',
      bankName: 'Bank name',
      accountNumber: 'Account number',
      accountName: 'Account name',
      phone: 'Phone number',
      sellBtn: 'Sell {amount} {currency}',
      confirmMsg: 'Do you want to sell {amount} {currency}?'
    },
    components: {
      bankTransferInfo: {
        noteTitle: 'IMPORTANT',
        noteDesc: 'You must send the exact amount & reference code as instructed and upload the payment proof below so we can proceed sending coins to you.',
        uploadBtn: 'Upload Your Receipt',
        saveBtn: 'Save',
        customerAmount: 'CUSTOMER AMOUNT',
        yourAmount: 'YOUR AMOUNT',
        accountName: 'ACCOUNT NAME',
        accountNumber: 'ACCOUNT NUMBER',
        bankName: 'BANK NAME',
        bankId: 'BANK ID',
        refCode: 'REFERENCE CODE',
        nameCard: 'BANK TRANSFER INFO',
        willExpiredIn: 'Will expired in',
        expiredText: 'Expired',
        saveReceiptSuccessMsg: 'Your receipt was uploaded successfully',
        saveReceiptFailedMsg: 'Your receipt was not uploaded, please try again',
        getBankInfoFailedMsg: 'Get bank info failed, please try again',
        retryGetBankInfo: 'No bank info data {retry}',
        retryBtn: 'Retry?'
      },
      paymentMethod: {
        wireTransferName: 'Wire transfer',
        codName: 'Cash on Delivery',
        tngName: 'TNG wallet',
        codInfo: 'State your time and place for meeting up and we will exchange in person.'
      },
      walletSelector: {
        qrScannerText: 'Scan QR code or copy wallet address',
        currency: 'Currency',
        invalidAddressMsg: 'The address and type of crypto don\'t match. Please check',
      },
      sellOrderInfo: {
        transferCoinFirst: 'You have to transfer coin to this address first',
        Receiving: 'Receiving',
        Selling: 'Selling',
        mainNote: 'NOTE: YOU HAVE TO CLICK "FINISH" TO COMPLETE THE TRANSACTION',
        subNote: '(Transaction may be lost if you forget to complete this step)',
        listNote: {
          note1: 'Please transfer the exact number to the above address',
          note2: 'The price of the crypto fluctuates constantly; therefore, we only keep this price for 5 minutes',
          note3: 'We will transfer the fiat to you as soon as there is 1 confirmation on the network.'
        },
        cardName: 'ORDER INFO',
        priceWillUpdateIn: 'Price will be updated after',
        orderBtn: 'Finish'
      },
      pricePanel: {
        buy: 'Buy',
        sell: 'Sell',
      },
      exchange: {
        amountLabel: 'Amount to {direction}',
        currency: 'Currency',
        buy: 'buy',
        sell: 'sell',
        exchangeFailed: 'Failed while exchanging, please try again',
        minAmount: '{currency} amount must be greater than {amount}'
      },
      phoneVerify: {
        submitPhoneSuccessMsg: 'We sent a code to your phone successfully',
        submitPhoneFailedMsg: 'Sent code failed, please try again',
        submitCodeSuccessMsg: 'Verify successfully',
        submitCodeFailedMsg: 'Verify failed, please try again',
        verifyCode: 'Verify code',
        submitCode: 'Submit Code',
        submitPhone: 'Submit'
      },
      sellBankInfo: {
        bankInfo: 'Your bank info',
        bankName: 'Bank name',
        bankAccountName: 'Account name',
        bankAccountNumber: 'Account number',
        gotoEdit: 'Edit your bank info?'
      },
      popularPlace: {
        invalidPlace: 'Invalid place',
        getPlacesFailed: 'Failed while getting popular places'
      },
      popularBanks: {
        invalidBank: 'Invalid bank',
        getBanksFailed: 'Failed while getting popular banks'
      }
    }
  },
  static_page: {
    userAgreement: 'User Agreement',
    privacyPolicy: 'Privacy Policy',
    promotionPrograms: 'Promotion Programs',
    aboutUs: 'About Us',
    howItworks: 'How It Works',
  },
  components: {
    userVerifyStatus: {
      level1Pending: 'To start trading, please take a few minutes to verify your account. {verify}',
      verifyBtn: 'Verify now',
      notLogin: 'Please sign in to start trading.{action}',
      notLoginBtn: 'Sign In Now'
    },
    confirmBtn: {
      defaultMsg: 'Please confirm',
      defaultConfirmText: 'Yes',
      defaultDeclineText: 'No',
      defaultLabelText: 'Confirm'
    }
  },
  promotion_programs: {
    termAndConditions: 'Term & Conditions',
    early_bird_program: {
      title: 'Early Bird Program',
      description: 'You will instantly receive 20 HKD after finishing the first three transactions.',
      numTermAndConditions: '4',
      termAndConditions: [
        'You must be one of the first 1,000 users.',
        'The total value of the first three transactions must be equal or more than 1,000 HKD.',
        'If the total value of the first two transactions already reached 1,000 HKD or more, you still have to complete the third transaction to receive 20 HKD.',
        'Once you make the first transaction, you have 5 days to finish two other transactions to get your reward.',
      ]
    },
    referral_program: {
      title: 'Referral Program',
      description: 'For users (who receive the referral link), you will instantly get back 45 HKD as soon as you buy or sell over 3,000 USD on CoinBowl.',
      user: {
        title: 'For users',
        description: '(who receive the referral link), you will instantly get back 45 HKD as soon as you buy or sell over 3,000 USD on CoinBowl.',
        numDescriptions: '0',
        termAndConditions: [
          'Visiting CoinBowl via referral link.',
          'Total amount of trading (both buy and sell are counted) is equal or more than 3,000 HKD.',
        ]
      },
      referrer: {
        title: 'For Referrer',
        description: '(who send the referral link), you will get 25 HKD instantly when your referred person trades over 3,000 HKD.',
        numDescriptions: '2',
        descriptions: [
          'In the first month, you will get 0.2% commission on every transaction from referred person.',
          'From the second month, you will still get 0.12% commission on every transactions from referred person.'
        ],
        termAndConditions: [
          'Only users visiting CoinBowl via your referral link are counted.',
          'You can only get 25 HKD for your first three referred people.',
          'Afterwards, you can only get the commission on their transactions.',
        ]
      }
    }
  }
};
