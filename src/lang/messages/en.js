
export default {
  appTitle: 'Here is the title lang en',
  helloWorld: 'Hello World',
  app: {
    title: 'khoa {name}',
    name: '<p style="color: #00adb5;">Test En html</p>',
    navigation: {
      me: 'Me',
      ninjaCoin: 'Coin'
    }
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
          desc12: 'Level 1 verification: Trade with a limit of 500 USD a day.',
          desc13: 'Level 2 verification: Trade with the top limit of 5000 USD a day.',
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
  'landing_page.label.footer': 'Building blockchain powered apps, tools and solutions for the new wild west world web.<br />Join the dojo: <a href="https://t.me/ninja_org" class="landing-link">t.me/ninja_org</a><br />Contact us: <a href="mailto:support@ninja.org" class="landing-link" target="_top">support@ninja.org</a>',
  COIN_EXCHANGE_LP_FAQ_TITLE: 'Frequently asked questions',
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
    login: {
      title: 'LOGIN',
      username: 'Username',
      password: 'Password',
      loginButton: 'Login',
      keepSignin: 'keep signin on user computer',
      registerButton: 'Don\'t have an account?',
      forgetPassword: 'Forget password?',
      requiredPassword: 'Please enter your password',
      requiredUsername: 'Please enter your email'
    },
    register: {
      title: 'REGISTER',
      firstName: 'First name',
      requiredFirstName: 'First name is required',
      placeholderFirstName: 'Enter your first name',
      lastName: 'Last name',
      requiredLastName: 'Last name is required',
      placeholderLastName: 'Enter your last name',
      username: 'Username',
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
      notValidReCaptcha: 'Please validate your reCAPTCHA.',
      registerButton: 'Register',
      loginButton: 'Login',
    }
  }
};
