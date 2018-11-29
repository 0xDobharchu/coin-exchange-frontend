import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

// components
import Button from 'src/components/core/controls/Button';
import { MasterWallet } from 'src/services/Wallets/MasterWallet';
import Input from 'src/components/core/controls/input';
import { StringHelper } from 'src/services/helper';

import {
    fieldCleave,
    fieldDropdown,
    fieldInput,
    fieldNumericInput,
    fieldPhoneInput,
    fieldRadioButton
} from 'src/components/core/form/customField';
import { change, Field, formValueSelector, clearFields } from 'redux-form';
import ModalDialog from 'src/components/core/controls/ModalDialog';
import Modal from 'src/components/core/controls/Modal';
import Dropdown from 'src/components/core/controls/Dropdown';
import createForm from 'src/components/core/form/createForm';

import Header from './Header';
import HeaderMore from './HeaderMore';
import WalletItem from 'src/components/wallet/WalletItem';
import WalletProtect from './WalletProtect';
import WalletHistory from 'src/components/wallet/WalletHistory';
import TransferCoin from 'src/components/wallet/TransferCoin';
import ReceiveCoin from 'src/components/wallet/ReceiveCoin';
import { showLoading, hideLoading, showAlert } from 'src/screens/app/redux/action';
import local from 'src/services/localStore';
import { APP } from 'src/constants';

import { userWallet, makeSaveWallet } from './action';

import CoinTemp from 'src/screens/wallet/CoinTemp';
import BackupWallet from 'src/components/wallet/BackupWallet/BackupWallet';
import RestoreWallet from 'src/components/wallet/RestoreWallet/RestoreWallet';

// new layout:
import logoWallet from 'src/assets/images/wallet/images/logo-wallet.svg';
import iconMoreSettings from 'src/assets/images/wallet/icons/icon-more-settings.svg';
import SortableComponent from "./SortableComponent";
import iconAddPlus from 'src/assets/images/wallet/icons/icon-add-plus.svg';
import iconAlignJust from 'src/assets/images/wallet/icons/icon-align-just.svg';
import BackChevronSVGWhite from 'src/assets/images/wallet/icons/back-chevron-white.svg';
import customRightIcon from 'src/assets/images/wallet/icons/icon-options.svg';
import floatButtonScanQRCode from 'src/assets/images/wallet/icons/float-button-scan.svg';

import WalletPreferences from 'src/components/wallet/WalletPreferences';
import { requestWalletPasscode, showQRCodeContent, showRequirePassword } from 'src/screens/app/redux/action';
import QRCodeContent from 'src/components/wallet/QRCodeContent';
import { ICON } from 'src/components/wallet/images';

const QRCode = require('qrcode.react');

import { showQrCode } from 'src/components/barcodeScanner';

import { Ethereum } from 'src/services/Wallets/Ethereum.js';

import cx from 'classnames';

import styles from './styles.scss';


if (__CLIENT__)
    window.Clipboard = (function (window, document, navigator) {
        let textArea,
            copy; function isOS() { return navigator.userAgent.match(/ipad|iphone/i); } function createTextArea(text) { textArea = document.createElement('textArea'); textArea.value = text; document.body.appendChild(textArea); } function selectText() {
                let range,
                    selection; if (isOS()) { range = document.createRange(); range.selectNodeContents(textArea); selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); textArea.setSelectionRange(0, 999999); } else { textArea.select(); }
            } function copyToClipboard() { document.execCommand('copy'); document.body.removeChild(textArea); } copy = function (text) { createTextArea(text); selectText(); copyToClipboard(); }; return { copy };
    }(window, document, navigator));

const nameFormSendWallet = 'sendWallet';
const nameFormCreditCard = 'creditCard';
const defaultOffset = 500;

const MD_MAX_WITH = 850;

class Wallet extends React.Component {
    constructor(props) {

        super(props);

        this.modalHeaderStyle = { color: "#fff", background: "#546FF7" };
        this.modalBodyStyle = { padding: 0 };

        this.state = {

            addressParram: false,
            height: window.innerHeight,
            width: window.innerWidth,
            isDeskTop: false,

            // wallet:
            isLoading: false,
            error: null,
            listMainWalletBalance: [],
            listTokenWalletBalance: [],
            listCollectibleWalletBalance: [],
            listTestWalletBalance: [],
            bottomSheet: false,
            listMenu: [],
            walletSelected: null,
            inputSendValue: '',
            isRestoreLoading: false,
            // tranfer:
            listCoinTempToCreate: [],
            countreCoinToCreate: 1,
            walletKeyDefaultToCreate: 1,
            input12PhraseValue: '',
            // Qrcode
            qrCodeOpen: false,
            delay: 300,
            walletsData: false,
            isNewCCOpen: false,
            stepProtected: 1,
            formAddTokenIsActive: false,
            formAddCollectibleIsActive: false,
            isHistory: false,
            pagenoTran: 1,
            pagenoIT: 1,
            transactions: [],
            internalTransactions: [],
            isLoadMore: false,
            alternateCurrency: 'USD',
            modalBuyCoin: '',
            modalTransferCoin: '',
            modalReceiveCoin: '',
            modalSetting: '',
            modalHistory: '',
            modalWalletPreferences: "",
            modalSecure: "",
            modalRemindCheckout: '',
            backupWalletContent: "",
            exportPrivateContent: "",
            restoreWalletContent: "",
            userPassword: '',

            // sortable:
            listSortable: { coin: false, token: false, collectitble: false },
        }
        this.updateDimensions = this.updateDimensions.bind(this);
    }
    componentDidMount() {
        let addressParram = this.props.match.params.address || false;
        console.log('this.props', addressParram);
        this.setState({ addressParram });
        window.addEventListener("resize", this.updateDimensions);

        this.updateDimensions();

        this.getSetting();

        // todo call api get wallet data ...    
        this.props.userWallet().then((listWallet) => {
            
            console.log('listWallet', listWallet);
            if (listWallet !== false) {
                this.splitWalletData(listWallet);
                this.getListBalace(listWallet);
            }
            else {
                this.showAlert("Can not get your wallet now ...");
            }

        }).finally(() => {

        });

    }
    updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
        console.log('window.innerWidth', window.innerWidth);
        let isDeskTop = this.state.isDeskTop;
        if (window.innerWidth < MD_MAX_WITH) {
            if (isDeskTop) {
                isDeskTop = false;
                this.setState({ isDeskTop });
            }
        }
        else {
            if (isDeskTop === false) {
                isDeskTop = true;
                this.setState({ isDeskTop });
            }
        }
    }

    handleShowWallet = () => {
        if (this.state.isDeskTop) {
            if (this.state.addressParram === false) {
                this.setState({ walletSelected: this.state.listWallet[0] });
                window.location.href = window.location.href + "/" + walletSelected.toString();
            }
            else {
                // todo: find in list with address
                this.setState({ walletSelected: this.state.listWallet[1] });
            }
        }
        else { // for mobile
            if (this.state.addressParram === false) {
                // only show list...
            }
            else {
                // todo: find in list with address
                this.setState({ walletSelected: this.state.listWallet[1] });
                // show detail over ...
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    showAlert(msg, type = 'success', timeOut = 3000, icon = '') {
        this.props.showAlert({
            message: <div className={styles.textCenter}>{icon}{msg}</div>,
            timeOut,
            type,
            callBack: () => { },
        });
    }
    showToast(mst) {
        this.showAlert(mst, 'primary', 2000);
    }
    showError(mst) {
        this.showAlert(mst, 'danger', 3000);
    }
    showSuccess(mst) {
        this.showAlert(mst, 'success', 4000, ICON.SuccessChecked());
    }

    splitWalletData(listWallet) {
        let listMainWallet = [];
        let listTestWallet = [];
        let listTokenWallet = [];
        let listCollectibleWallet = [];

        listWallet.forEach((wallet) => {

            // is Mainnet (coin, token, collectible)
            if (wallet.network === MasterWallet.ListCoin[wallet.className].Network.Mainnet) {

                if (wallet.isToken) {
                    wallet.default = false;
                    if (wallet.isCollectibles) {
                        listCollectibleWallet.push(wallet);
                    }
                    else {
                        listTokenWallet.push(wallet);
                    }
                }
                else {
                    listMainWallet.push(wallet);
                }

            } else {
                // is Testnet
                listTestWallet.push(wallet);
            }
        });

        this.setState({
            isLoading: true, listMainWalletBalance: listMainWallet, listTokenWalletBalance: listTokenWallet, listCollectibleWalletBalance: listCollectibleWallet, listTestWalletBalance: listTestWallet,
        });
    }
    async getSetting() {
        let setting = local.get(APP.SETTING), alternateCurrency = "USD";

        //alternate_currency
        if (setting && setting.wallet && setting.wallet.alternateCurrency) {
            alternateCurrency = setting.wallet.alternateCurrency;
        }

        if (alternateCurrency != "USD") {
            this.setState({ alternateCurrency: alternateCurrency });
        }
    }

    getAllWallet() {
        return this.state.listMainWalletBalance.concat(this.state.listTestWalletBalance).concat(this.state.listTokenWalletBalance).concat(this.state.listCollectibleWalletBalance);
    }

    async getListBalace(listWallet) {
        const pros = [];

        listWallet.forEach((wallet) => {
            pros.push(new Promise((resolve, reject) => {
                wallet.getBalance().then((balance) => {
                    wallet.balance = balance;
                    resolve(wallet);
                });
            }));
        });

        await Promise.all(pros);

        await this.splitWalletData(listWallet);

        this.saveWallet(listWallet);
    }

    // actions:
    // Remove wallet function:
    removeWallet = () => {
        try {
            this.modalHistoryRef.close();
            this.modalWalletReferencesRef.close();
        }
        catch (e) { };

        const lstWalletTemp = this.getAllWallet();
        let index = -1;
        const walletTmp = this.state.walletSelected;
        if (walletTmp != null) {
            // Find index for this item:
            lstWalletTemp.forEach((wal, i) => { if (wal === walletTmp) { index = i; } });
            // Remove item:
            if (index > -1) {
                lstWalletTemp.splice(index, 1);
                // Update wallet master server:        
                this.saveWallet(lstWalletTemp);
                this.splitWalletData(lstWalletTemp);
            }
        }
        this.modalRemoveRef.close();
    }

    // open transfer modal:
    sendCoin = () => {
        this.modalConfirmSendRef.open();
    }
    autoCheckBalance(fromAddress, toAddress) {
        this.checkBalanceSend = 0;
        this.timeOutCheckBalance = setInterval(() => {
            this.checkBalanceSend += 1;
            let lstWalletTemp = this.getAllWallet();
            lstWalletTemp.forEach(wallet => {
                if (wallet.address == fromAddress) {
                    wallet.getBalance().then(result => {
                        if (wallet.balance != result) {
                            wallet.balance = result;
                            clearInterval(this.timeOutCheckBalance);
                        }
                    });
                }
                if (wallet.address == toAddress) {
                    wallet.getBalance().then(result => {
                        if (wallet.balance != result) {
                            wallet.balance = result;
                            clearInterval(this.timeOutCheckBalance);
                        }
                    });
                }
            })

            if (this.checkBalanceSend >= 5) {
                clearInterval(this.timeOutCheckBalance);
            }
        }, 10000);

    }

    invalidateTransferCoins = (value) => {
        const { messages } = this.props.intl;
        let errors = {};

        if (this.state.walletSelected) {
            // check address:
            let result = this.state.walletSelected.checkAddressValid(value['to_address']);
            if (result !== true)
                errors.to_address = result;
            // check amount:
            if (parseFloat(this.state.walletSelected.balance) <= parseFloat(value['amount']))
                errors.amount = messages['wallet.action.transfer.error'] + ` ${this.state.walletSelected.balance} ${this.state.walletSelected.name}`
        }
        return errors
    }

    // Menu for Right header bar
    showModalAddCoin = () => {
        this.setState({ isRestoreLoading: false, countCheckCoinToCreate: 1, listCoinTempToCreate: MasterWallet.getListCoinTemp() });
        this.modalCreateWalletRef.open();
    }
    updateSortableForCoin = () => {
        let listSortable = this.state.listSortable;
        listSortable.coin = !this.state.listSortable.coin;
        this.setState({ listSortable: listSortable });
    }
    updateSortableForToken = () => {
        let listSortable = this.state.listSortable;
        listSortable.token = !this.state.listSortable.token;
        this.setState({ listSortable: listSortable });
    }
    updateSortableForCollectible = () => {
        let listSortable = this.state.listSortable;
        listSortable.collectitble = !this.state.listSortable.collectitble;
        this.setState({ listSortable: listSortable });
    }
    showModalAddToken = () => {
        this.setState({ formAddTokenIsActive: true }, () => {
            this.modalAddNewTokenRef.open();
        });
    }
    showModalAddCollectible = () => {
        this.setState({ formAddCollectibleIsActive: true }, () => {
            this.modalAddNewCollectibleRef.open();
        });
    }

    showTransfer(wallet) {
        this.props.requestWalletPasscode({
            onSuccess: () => {
                this.setState({
                    walletSelected: wallet,
                    modalTransferCoin:
                        (
                            <TransferCoin
                                listWallet={this.getAllWallet()}
                                wallet={wallet}
                                onFinish={(result) => { this.successTransfer(result) }}
                                currency={this.state.alternateCurrency}
                            />
                        ),
                }, () => {
                    this.modalSendRef.open();
                });
            }

        });
    }
    showTransferFromQRCode = (dataAddress) => {
        this.props.requestWalletPasscode({
            onSuccess: () => {
                this.setState({
                    modalTransferCoin:
                        (
                            <TransferCoin
                                onFinish={(result) => {
                                    this.modalSendRef.close();
                                    // this.autoCheckBalance(dataAddress.address, amount);
                                }}
                                currency={this.state.alternateCurrency}
                                coinName={dataAddress.symbol}
                                toAddress={dataAddress.address}
                                amount={dataAddress.amount}
                            />
                        ),
                }, () => {
                    this.modalSendRef.open();
                });
            }
        });
    }

    showReceive(wallet) {
        this.setState({
            walletSelected: wallet,
            modalReceiveCoin:
                (
                    <ReceiveCoin
                        listWallet={this.getAllWallet()}
                        wallet={wallet}
                        currency={this.state.alternateCurrency}
                        onFinish={() => { this.successReceive() }}
                    />
                )
        }, () => {
            this.modalReceiveCoinRef.open();
        });
    }

    showBackupWalletAccount = () => {

        this.props.requestWalletPasscode({
            onSuccess: () => {
                this.setState({ backupWalletContent: <BackupWallet /> }, () => {
                    this.modalBackupRef.open();
                })
            }
        });
    }
    closeBackupWalletAccount = () => {
        this.setState({ backupWalletContent: "" });
    }

    // on select type of wallet to create:
    onSelectCoinClick = (wallet) => {
        const listCoinTemp = this.state.listCoinTempToCreate;

        wallet.default = !wallet.default;
        let countCheckCoinToCreate = 0;
        listCoinTemp.forEach((wal) => { if (wal.default) countCheckCoinToCreate += 1; });

        this.setState({ erroValueBackup: false, listCoinTempToCreate: listCoinTemp, countCheckCoinToCreate });
    }

    saveWallet(wallets) {
        this.props.makeSaveWallet(wallets).then((result) => {
            console.log('saved wallet');

        }).finally(() => {

        });
    }

    createNewWallets = () => {
        const { messages } = this.props.intl;
        this.setState({ isRestoreLoading: true, erroValueBackup: false });
        const listCoinTemp = this.state.listCoinTempToCreate;

        const phrase = this.state.input12PhraseValue.trim();

        // todo: popup request password:
        let password = '12345678';
        const newWallet = MasterWallet.createNewWallet(listCoinTemp, phrase, password);

        if (newWallet == false) {
            this.setState({ isRestoreLoading: false, erroValueBackup: true });

            if (phrase != '') {
                this.showError(messages['wallet.action.create.error.recovery_words_invalid'])
            }
            else {
                this.showError(messages['wallet.action.create.error.random']);
            }
        } else {

            // call api to update:    
            const lstWalletTemp = this.getAllWallet();

            const listNewWallet = lstWalletTemp.concat(newWallet);

            this.saveWallet(listNewWallet);

            if (phrase != '') {
                // need get balance
                this.getListBalace(listNewWallet);
            }

            this.setState({ input12PhraseValue: "" });
            this.splitWalletData(listNewWallet);
            this.modalCreateWalletRef.close();
        }
    }
    update12PhraseValue = (evt) => {
        this.setState({
            input12PhraseValue: evt.target.value,
        });
    }
    onWarningClick = (wallet) => {

        // todo: decryp wallet:  
        if (this.state.userPassword === '') {
            this.props.showRequirePassword({
                onFinish: (userPassword) => {
                    this.setState({ userPassword: userPassword }, () => {
                        this.protectedWallet(wallet);
                    });
                }
            });
        }
        else {
            this.protectedWallet(wallet);
        }
    }

    protectedWallet = (wallet) => {
        // if (!wallet.protected) {
        const { messages } = this.props.intl;
        const walletEncrypt = this.state.walletSelected.descryp(this.state.userPassword);
        if (walletEncrypt === false) {
            this.showError(messages['requirePassword.passNotMatch']);
            this.setState({ isRestoreLoading: false, userPassword: '' }, () => {
                this.onWarningClick();
            });
            return;
        }

        this.setState({
            walletSelected: wallet,
            modalSecure: <WalletProtect onCopy={this.onCopyProtected}
                step={1}
                wallet={walletEncrypt}
                callbackSuccess={() => { this.successWalletProtect(wallet); }}
            />
        }, () => {
            this.modalProtectRef.open();
        }
        );


        // } else {

        // }
    }

    // export wallet key ----------------------------------:
    onExportPrivateKeyClick = (wallet) => {

        // todo: decryp wallet:  
        if (this.state.userPassword === '') {
            this.props.showRequirePassword({
                onFinish: (userPassword) => {
                    this.setState({ userPassword: userPassword }, () => {
                        this.exportPrivateKey(wallet);
                    });
                }
            });
        }
        else {
            this.exportPrivateKey(wallet);
        }
    }
    exportPrivateKey = (wallet) => {
        const { messages } = this.props.intl;

        const walletEncrypt = this.state.walletSelected.descryp(this.state.userPassword);

        if (walletEncrypt === false) {
            this.showError(messages['requirePassword.passNotMatch']);
            this.setState({ isRestoreLoading: false, userPassword: '' }, () => {
                this.onExportPrivateKeyClick();
            });
            return;
        }

        this.setState({
            exportPrivateContent: (
                <div className={styles.exportPrivateKey}>
                    <div className={styles.exTitle}>{messages['wallet.action.export_private_key.title']}</div>
                    <QRCode size={230} value={walletEncrypt.privateKey} onClick={() => { Clipboard.copy(this.state.walletSelected.privateKey); this.showToast(messages['wallet.action.copy.success']); }} />
                    <div className={styles.exDesc}>{messages['wallet.action.export_private_key.desc']} </div>
                    <Button onClick={() => { Clipboard.copy(walletEncrypt.privateKey); this.showToast(messages['wallet.action.copy.success']); }}>Copy</Button>
                </div>
            )
        }, () => {
            this.modalExportPrivateKeyRef.open();
        })

    }
    onCloseExportPrivateKey = () => {
        this.setState({ exportPrivateContent: '' });
    }
    onWalletItemClick = (wallet, callUpdate) => {

        if (this.state.isDeskTop){
            this.setState({walletSelected: wallet});
        }
        else{
            this.setState({
                walletSelected: wallet,
                modalHistory:
                    (
                        <WalletHistory
                            onTransferClick={() => this.showTransfer(wallet)}
                            onReceiveClick={() => this.onAddressClick(wallet)}
                            onWarningClick={() => this.onWarningClick(wallet)}
                            wallet={wallet}
                            customBackIcon={BackChevronSVGWhite}
                            modalHeaderStyle={this.modalHeaderStyle}
                            callUpdate={callUpdate}
                        />
                    )
            }, () => {
                this.modalHistoryRef.open();
            });
        }

        
    }
    onUpdateWalletName = (wallet) => {
        this.setState({ walletSelected: wallet });
        //update data wallet.
        // MasterWallet.UpdateLocalStore(this.getAllWallet());
        this.saveWallet(this.getAllWallet());
        this.onWalletItemClick(wallet);
    }

    onOpenWalletPreferences = (wallet) => {
        this.setState({
            modalWalletPreferences: (<WalletPreferences onDeleteWalletClick={() => { this.props.requestWalletPasscode({ onSuccess: () => { this.modalRemoveRef.open(); } }); }} onWarningClick={() => { this.onWarningClick(wallet); }} onExportPrivateKeyClick={() => { this.onExportPrivateKeyClick(wallet); }} onUpdateWalletName={(wallet) => { this.onUpdateWalletName(wallet); }} wallet={wallet} customBackIcon={BackChevronSVGWhite} modalHeaderStyle={this.modalHeaderStyle} />)
        }, () => {
            this.modalWalletReferencesRef.open();
        });
    }

    onAddressClick = (wallet) => {
        this.showReceive(wallet)
    }
    onSortableCoinSuccess = (items) => {
        this.setState({ listMainWalletBalance: items }, () => {
            // MasterWallet.UpdateLocalStore(this.getAllWallet());
            this.saveWallet(this.getAllWallet());
        });
    }
    onSortableTokenSuccess = (items) => {
        this.setState({ listTokenWalletBalance: items }, () => {
            // MasterWallet.UpdateLocalStore(this.getAllWallet());
            this.saveWallet(this.getAllWallet());
        });
    }
    onSortableCollectibleSuccess = (items) => {
        this.setState({ listCollectibleWalletBalance: items }, () => {
            // MasterWallet.UpdateLocalStore(this.getAllWallet());
            this.saveWallet(this.getAllWallet());
        });
    }

    get listMainWalletBalance() {
        let setting = local.get(APP.SETTING);
        setting = setting ? setting.wallet : false;

        return this.state.listMainWalletBalance.map(wallet => <WalletItem key={Math.random()} settingWallet={setting} wallet={wallet} onWarningClick={() => this.onWarningClick(wallet)} onAddressClick={() => this.onAddressClick(wallet)} />);
    }

    get listTokenWalletBalance() {
        let setting = local.get(APP.SETTING);
        setting = setting ? setting.wallet : false;

        return this.state.listTokenWalletBalance.map(wallet => <WalletItem key={Math.random()} settingWallet={setting} wallet={wallet} onWarningClick={() => this.onWarningClick(wallet)} onAddressClick={() => this.onAddressClick(wallet)} />);
    }
    get listCollectibleWalletBalance() {
        let setting = local.get(APP.SETTING);
        setting = setting ? setting.wallet : false;

        return this.state.listCollectibleWalletBalance.map(wallet => <WalletItem key={Math.random()} settingWallet={setting} wallet={wallet} onWarningClick={() => this.onWarningClick(wallet)} onAddressClick={() => this.onAddressClick(wallet)} />);
    }

    get listTestWalletBalance() {
        let setting = local.get(APP.SETTING);
        setting = setting ? setting.wallet : false;
        return this.state.listTestWalletBalance.map(wallet => <WalletItem key={Math.random()} settingWallet={setting} wallet={wallet} onWarningClick={() => this.onWarningClick(wallet)} onAddressClick={() => this.onAddressClick(wallet)} />);
    }

    get getListCoinTempForCreate() {
        return this.state.listCoinTempToCreate.map(walletTemp => <CoinTemp key={Math.random()} wallet={walletTemp} onClick={() => this.onSelectCoinClick(walletTemp)} />);
    }

    afterWalletFill = () => {
        this.modalBuyCoin.close();
    }

    closeTransfer = () => {
        this.setState({ modalTransferCoin: '' });
    }

    closeBuyCoin = () => {
        this.setState({ modalBuyCoin: '' });
    }

    closeCreate = () => {
        this.setState({ input12PhraseValue: "", walletKeyDefaultToCreate: 1 });
    }

    closeSecure = () => {
        this.setState({ modalSecure: '' });
    }

    closeHistory = () => {
        this.setState({ modalHistory: '' });
    }

    closePreferences = () => {
        this.setState({ modalWalletPreferences: "" });
    }

    successTransfer = (result) => {
        this.modalSendRef.close();
        this.autoCheckBalance(this.state.walletSelected.address, this.state.inputAddressAmountValue);
        console.log('successTransfer', result);
        if (this.state.modalHistory) {
            this.onWalletItemClick(this.state.walletSelected, result);
        }
    }
    successReceive = () => {
        this.modalShareAddressRef.close();
        this.autoCheckBalance(this.state.walletSelected.address, this.state.inputAddressAmountValue);
    }

    onCopyProtected = () => {
        const { messages } = this.props.intl;
        Clipboard.copy(this.state.walletSelected.mnemonic);
        this.showToast(messages['wallet.action.copy.success']);
    }

    successWalletProtect = (wallet) => {
        const { messages } = this.props.intl;
        const lstWalletTemp = this.getAllWallet();
        lstWalletTemp.forEach((wal) => { if (wallet.mnemonic == wal.mnemonic) { wal.protected = true; } });

        // Update wallet master from local store:
        // MasterWallet.UpdateLocalStore(lstWalletTemp);
        this.saveWallet(lstWalletTemp);

        this.modalProtectRef.close();
        this.splitWalletData(lstWalletTemp);
        this.showSuccess(messages['wallet.action.protect.success']);
        // for form wallet detail:
        if (this.state.modalHistory != '') {
            this.onWalletItemClick(wallet);
        }
    }

    getETHFree = () => {
        window.open('https://www.rinkeby.io/#faucet', '_blank');
        // let data="ninja-redeem:NINJA-1C1QN0r5SItfzGqp06graZPLZR2?value=234";
        // let result = MasterWallet.getQRCodeDetail(data);
        // this.props.showQRCodeContent({
        //   data: result
        // });
    }

    onQRCodeScaned = (data) => {
        let result = MasterWallet.getQRCodeDetail(data);
        this.props.showQRCodeContent({
            data: result
        });
    }

    onFloatButtonClick = () => {
        showQrCode(
            {
                onData: this.onQRCodeScaned
            }
        );
    }

    renderLiveCoin() {
        const { messages } = this.props.intl;

        return (
            <Row className={styles.walletBox}>
                <Row className={styles['list']}>
                    {!this.state.listSortable.coin ?
                        <Header icon2={this.state.listMainWalletBalance.length > 1 ? iconAlignJust : null} onIcon2Click={this.updateSortableForCoin} icon={iconAddPlus} title={messages['wallet.action.create.label.header_coins']} hasLink={true} linkTitle={messages['wallet.action.create.button.add_new']} onLinkClick={this.showModalAddCoin} />
                        : <Header title={messages['wallet.action.create.label.header_coins']} hasLink={true} linkTitle={messages['wallet.action.create.button.done']} onLinkClick={this.updateSortableForCoin} />
                    }
                </Row>
                <Row className={styles.list}>                    
                    {this.state.listMainWalletBalance.length > 0 ?
                        <SortableComponent onSortableSuccess={items => this.onSortableCoinSuccess(items)} onAddressClick={item => this.onAddressClick(item)} onItemClick={item => this.onWalletItemClick(item)} isSortable={this.state.listSortable.coin} items={this.state.listMainWalletBalance} />
                        : ''}
                </Row>
            </Row>
        )
    }
    renderTestNet() {
        const { messages } = this.props.intl;
        return (
            <Row className={styles.walletBox}>
                {!process.env.isProduction ?
                    <Row className={styles.list}>
                        <Header title={messages['wallet.action.create.label.test_net']} hasLink linkTitle={messages['wallet.action.create.button.request_free_eth']} onLinkClick={this.getETHFree} />
                    </Row>
                    : ''}
                {!process.env.isProduction &&
                    <Row className={styles.list}>                        
                        {this.state.listTestWalletBalance.length > 0 ?
                            <SortableComponent onAddressClick={item => this.onAddressClick(item)} onItemClick={item => this.onWalletItemClick(item)} items={this.state.listTestWalletBalance} />
                            : ''}
                    </Row>
                }
            </Row>
        )
    }

    renderDetail(){
        let wallet = this.state.walletSelected;
        if (wallet == null){
            if (this.state.listMainWalletBalance.length > 0){
                wallet = this.state.listMainWalletBalance[0];
            }
        }
        if (wallet){
            return (
                <WalletHistory
                    onTransferClick={() => this.showTransfer(wallet)}
                    onReceiveClick={() => this.onAddressClick(wallet)}
                    onWarningClick={() => this.onWarningClick(wallet)}
                    wallet={wallet}
                    customBackIcon={BackChevronSVGWhite}
                    modalHeaderStyle={this.modalHeaderStyle}
                    callUpdate={false}
                />
            )
        }
        return null;
    }

    render() {
        return (
            <div className={styles.walletContainer}>
                <Container className={styles.fullHeightBox}>
                    <div className={styles.container}>

                        <div className={styles.header}>
                            <span className={styles.title}> Your accounts </span>
                        </div>

                        <h3>
                            Window width: {this.state.width} and height: {this.state.height}
                            is Destop {this.state.isDeskTop.toString()}
                        </h3>
                        <div className={styles.walletWrap}>
                            <div className={styles.walletWrapLeft}>
                                <div className={styles.walletList}>
                                    {this.renderLiveCoin()}
                                    {this.renderTestNet()}
                                </div>
                            </div>
                            <div className={styles.walletWrapRight}>
                                <div className={styles.walletDetail}>
                                    {this.renderDetail()}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

const mapState = (state) => ({

});

const mapDispatch = ({
    userWallet,
    makeSaveWallet,
    showAlert,
    showLoading,
    hideLoading,
    change,
    clearFields,
    requestWalletPasscode,
    showQRCodeContent,
    showRequirePassword,
});


export default injectIntl(connect(mapState, mapDispatch)(Wallet));


