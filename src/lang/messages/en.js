
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
};
