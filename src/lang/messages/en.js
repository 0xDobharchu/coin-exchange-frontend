
export default {
  appTitle: 'Here is the title lang en',
  helloWorld: 'Hello World',
  app: {
    title: 'khoa {name}',
    name: '<p style="color: #00adb5;">Test En html</p>',
    navigation: {
      me: 'Me',
      ninjaCoin: 'Coin',
      wallet: 'Wallet'
    }
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
  },  
  me: {
    profile: {
      head_text: 'Our verification process typically takes just a few minutes. This may take slightly longer outside business hours. Your information will remain 100% private.',
      username: {
        exist: 'Name already exists',
        success: 'Your alias has been recorded',
        required: 'Name required',
      },
      verify: {
        step1: 'Level 1 : Email Verification',
        step2: 'Level 2 : Phone Verification',
        step3: 'Level 3 : ID Card Verification',
        step4: 'Level 4 : Upload Photo Selfie',
        alert: {
          send: {
            phone: 'We sent the secret code to your phone.',
            email: 'We sent a verification code to your email.',
          },
          notValid: {
            server: {
              phone: 'That’s not a real number. Try harder.',
              email: 'That’s not a real email. Try harder.',
            },
            client: {
              phone: 'A valid phone number would work better.',
              email: 'A valid email would work better.',
            },
            idVerification: {
              invalidFullName: 'Please enter your full name',
              invalidIDNumber: 'Please enter valid document ID number',
              invalidDocument: 'Please choose a document type',
              invalidFrontImage: 'Please upload front page of your document',
              invalidBackImage: 'Please upload back page of your document',
              invalidEmail: 'Your email address is missing! Are you sure you don’t want to receive transaction info?',
              invalidSelfieImage: 'Please upload a selife photo with your document',
            },
          },
          require: {
            phone: 'Please enter your verify code.',
            email: 'Please enter your verify code.',
          },
          success: {
            phone: 'Phone number securely saved.',
            email: 'Your email has been verified.',
            idVerification: 'Your documents has been submitted',
          },
          cannot: {
            phone: 'Can\'t verify your phone, please check your code',
            email: 'Can\'t verify your email, please check your code.',
            idVerification: 'Can\'t submit your documents, please try again',
            idVerification2: 'Can\'t submit your documents.',
          },
        },
      },
      text: {
        verified: 'Verified',
        username: {
          label: 'Nick Name',
          desc1: 'What do they call you?',
          button: {
            submit: 'Save',
          },
        },
        phone: {
          label: 'Phone Number',
          desc1: 'To send you free ETH sometimes, we’ll need your phone number to verify that you are not a robot. This is optional.',
          desc2: 'We only send humans rewards.',
          desc3: 'Please verify your phone number.',
          desc4: 'Enter the secret code sent to your phone.',
          button: {
            send: 'Send',
            submit: 'Verify your number',
          },
        },
        email: {
          label: 'Email',
          desc1: 'You may prefer to receive updates and notifications via email. This is also optional.',
          desc2: 'Verify your email. You will receive transaction info through this email address',
          desc3: 'Enter your email',
          desc4: 'Enter the secret code sent to your email.',
          button: {
            send: 'OK',
            submit: 'Verify your email',
          },
        },
        id_verification: {
          label: 'ID Verification',
          desc1: 'To comply with relevant anti-money laundering (AML) and counter-terrorism financing (CTF) laws and regulations.',
          desc2: 'Full Name',
          desc3: 'Document Number',
          desc4: 'Document Type',
          desc5: 'Front Side',
          desc6: 'Please upload a JPG or PNG of both sides of your passport, ID card or driving license.',
          desc7: 'Back Side',
          desc8: 'Selfie with Identity Card',
          desc9: 'Please take a selfie with your previous ID card and a piece of paper writing "I am in Ninja\'s dojo". Make sure that the photo is complete and clearly visible, in JPG or PNG format.',
          desc10: 'Email',
          desc11: 'Identification Document',
          desc12: 'Trade with a limit upto 500 USD a day.',
          desc13: 'Trade with the top limit of 5000 USD a day.',
          uploading: 'Uploading',
          button: {
            upload: 'Upload file',
            submit: 'Submit',
          },
          status: {
            processing: 'Processing',
            level1: 'Level 1',
            finished: 'Finished',
            rejected: 'Rejected',
          },
        },
      },
    },
    feed: {
      profileTitle: 'The face behind the mask',
      profileDescription: 'You, glorious you',
      shopTitle: 'Your ATM',
      shopDescription: 'Open for business',
      shopNoDataDescription: 'None yet. Set one up?',
      noDataMessage: 'Start a mission.',
      filterBy: 'Filter by:',
      cash: {
        predition: 'Prediction',
        cash: 'Cash',
        stationExplain: 'An ATM is where you can buy or sell cryptocurrency.',
        stationCreateSuggest: 'Got crypto? Create ATM to turn it into money making machine NOW!',
        restoreStation: 'Restore ATM',
        backupStation: 'Backup ATM',
        transactions: 'Transactions',
        dashboard: 'Dashboard',
        buyMoreCoin: 'Buy more coins now',
      },
    },
    credit: {
      overview: {
        askToDeactive: 'Pause your coin selling?',
        messageDeactiveSuccess: 'Pause successfully',
      },
      transaction: {
        amount: 'Amount',
        processing: 'Processing...',
        deposit: {
          title: 'DEPOSIT',
          percentage: 'Percentage',
        },
        withdraw: {
          title: 'WITHDRAW',
          toAccount: 'To Account',
        },
        transaction: {
          title: 'SELLING ORDER',
          selling: 'Selling',
          receiving: 'Receiving',
          fee: 'Fee',
        },
        instant: {
          title: 'PURCHASE ORDER',
          buying: 'Buying',
          cost: 'Cost',
        },
      },
      withdraw: {
        title: 'Withdraw money',
        yourBalance: 'Your balance (USD)',
        yourPapalName: 'Your Paypal email',
        amount: 'Amount (USD)',
        buttonTitle: 'Withdraw to your PayPal',
        description: '<span>It will take within a day for us <br /> to transfer money into your account.</span>',
        askToWithdraw: 'Do you want to withdraw?',
        validate: {
          amountMustLargerThan0: 'Amount must larger than 0',
          amountMustLessThanBalance: 'Amount must not larger than your balance',
        },
      },
      withdrawSuccess: {
        description: 'Withdraw successfully!',
        descriptionTransfer: 'We will make the transfer very shortly within 24 hours',
        buttonTitle: 'Back to your dashboard',
      },
      deposit: {
        title: 'Deposit',
      },
    },
  },
  COIN_EXCHANGE_LP_FAQ_TITLE: 'Frequently asked questions',
  'landing_page.label.footer': 'Coinbowl.com is an online exchange developed by Shanzhai Limited, a Hong Kong based company, offering bulk crypto purchasing at competitive prices with full delivery service.<br />Join the dojo: <a href="https://t.me/coin_bowl" class="landing-link">t.me/coin_bowl</a><br />Contact us: <a href="mailto:support@coin_bowl.com" class="landing-link" target="_top">support@coin_bowl.com</a>',
  'landing_page.coin.faq': [
    {
      question: 'About Ninja Coin',
      answer: 'Ninja Coin is a product of Shanzhai Limited - a Hong Kong-based company with offices in Ho Chi Minh City, New York and California. We provide a platform where people can buy crypto more conveniently, safely and with the most attractive price',
    },
    {
      question: 'How do I buy coin on Ninja?',
      answer: `Step 1: Visit <strong><a href="https://ninja.org/coin">https://ninja.org/coin</a></strong><br/>
              Step 2: Verify your identity<br/>
              Step 3: Select/Scan your crypto wallet<br/>
              Step 4: Enter the amount of coin you want to buy (or the amount of fiat money you want to use to buy coin)<br/>
              Step 5: Choose your buying method: Bank Transfer/COD<br/>
              Step 6: Click Buy<br/>
              Step 7: Make payment according to your buying method:<br/>
              <ul>
                <li>If you choose Bank Transfer: make a bank transfer</li>
                <li>If you choose COD: Enter your address, time and phone number. Wait for Ninja to come and pay with bank account/credit card/cash</li>
              </ul>
`,
    },
    {
      question: 'How to create account on Ninja?',
      answer: `Ninja Coin will create an account for you immediately the first time you visit us at <strong><a href="https://ninja.org/coin">https://ninja.org/coin</a></strong> instead of traditional login with email/username and password. However, you can only purchase after you’ve done the verification process
<br/><br/>
<table class="landing-table">
         <thead>
            <tr>
              <th>Transaction Value</th>
              <th>Verification Information Required</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td><$500</td>
                <td>Photo of your ID (both sides)</td>
              </tr>
              <tr>
                <td><$5000</td>
                <td>Photo of your ID (both sides)<br/>
                    Selfie with your ID and a paper written “Ninja Coin”
                    </td>
              </tr>
          </tbody>
      </table>
`,
    },
    {
      question: 'Why do I need to verify my identity?',
      answer: 'Your account must be verified to comply with relevant anti-money laundering (AML) and counter-terrorism financing (CTF) laws and regulations. We do not and will never sell or rent your personal information to any third parties',
    },
    {
      question: 'Is buying coin on Ninja secure?',
      answer: 'Every transaction on Ninja is covered 100% by a warranty with value up to $1000 each',
    },
    {
      question: 'What is the maximum amount can I purchase?',
      answer: `The maximum amount depends on user verification level and is up to <strong>$5000/day/user</strong> by now. We are working on expanding it in the near future
<br/><br/>
<table class="landing-table">
         <thead>
            <tr>
              <th>Verification Level</th>
              <th>Maximum amount</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>Photo of your ID (both sides)</td>
                <td>$500/user/day</td>
              </tr>
              <tr>
                <td>Photo of your ID (both sides)<br/>
                    Selfie with your ID and a paper written “Ninja Coin”
                </td>
                <td>$5000/user/day</td>
              </tr>
          </tbody>
      </table>
`,
    },
    {
      question: 'What payment method can I use?',
      answer: `<table class="landing-table">
         <thead>
            <tr>
              <th>Buying method</th>
              <th>Payment method</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>Bank Transfer (Buying online)</td>
                <td>Bank transfer</td>
              </tr>
              <tr>
                <td>COD (Buying offline)</td>
                <td>Bank transfer<br/>
                    Credit card<br/>
                    Cash
                    </td>
              </tr>
          </tbody>
      </table><br/><ul>
                <li>For buying online, you conduct the payment separately from the platform. We will transfer the coin to your wallet once we have received your payment</li>
                <li>For buying offline, we will arrange a meetup with the time and address you provide. You can pay with your bank account, credit card or cash after you have received your coin from Ninja</li>
              </ul>`
    },
    {
      question: 'How long should I wait to receive my coin?',
      answer: 'It depends on the time for the bank to process transactions (for buying online) and for the blockchain network to do the confirmations, which usually only takes a few minutes',
    },
    {
      question: 'What happens if the price changes during my transaction?',
      answer: 'Your price is fixed at the time you place a buy order. Therefore, all the later changes in price will not affect your transaction',
    },
    {
      question: 'What are the fees?',
      answer: 'We only takes 2% fee when you pay with credit card. Other payment options remain free',
    },
    {
      question: 'How can I contact for support?',
      answer: 'Feel free to contact us via live chat if you need any support for buying coin on Ninja',
    },
  ],
  user: {
    logout: 'Sign out',
    login: {
      title: 'Sign in to Coinbowl',
      username: 'Your email',
      password: 'Password',
      loginButton: 'Sign in',
      keepSignin: 'keep signin on user computer',
      registerButton: 'Don\'t have an account?',
      forgetPassword: 'Forget password?',
      requiredPassword: 'Please enter your password',
      notValidUsername: 'Invalid email address',
      requiredUsername: 'Please enter your email'
    },
    register: {
      title: 'Create your account',
      firstName: 'First name',
      requiredFirstName: 'First name is required',
      placeholderFirstName: 'Enter your first name',
      lastName: 'Last name',
      requiredLastName: 'Last name is required',
      placeholderLastName: 'Enter your last name',
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
      agreement: 'I certify that I am 18 years of age or older, and I agree to the User Agreement and Privacy Policy.',
      requiredAgreement: 'Please indicate that you have read and agree to the User Agreement and Privacy Policy',
      registerButton: 'Create account',
      loginButton: 'Already have an account?',
    }
  },
  landingPage: {
    contactUS:{
      title: 'Contact US',
      yourName: 'Your name',
      requiredYourName: 'Your name is required',
      placeholderYourName: 'Enter your name',
      email: 'Your email',
      requiredEmail: 'Your email is required',
      notValidEmail: 'Invalid email address',
      phone: 'Your phone',
      placeholderPhone: 'Enter your phone number',
      description: 'Your message',
      placeholderDescription: 'Enter your message',
      requiredDescription: 'Your message is required',
      contactButton: 'Submit',

    }
  },
  wallet: {
    title: 'Your Accounts',
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
      submitButtonTitle: 'Submit',
      loadMore: 'Load more',
      comments: '{numReview} comments',
    },
  },
};
