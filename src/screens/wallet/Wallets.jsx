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
import { change, Field, formValueSelector } from 'redux-form';
import Modal from 'src/components/core/controls/Modal';

import Header from 'src/components/wallet/header';
import WalletItem from 'src/components/wallet/WalletItem';
import WalletProtect from 'src/components/wallet/WalletProtect';
import WalletHistory from 'src/components/wallet/WalletHistory';
import TransferCoin from 'src/components/wallet/TransferCoin';
import ReceiveCoin from 'src/components/wallet/ReceiveCoin';
import { showLoading, hideLoading, showAlert } from 'src/screens/app/redux/action';
import local from 'src/services/localStore';
import { APP } from 'src/resources/constants/app';

import { userWallet, makeSaveWallet } from './action';

// new layout:
import logoWallet from 'src/assets/images/wallet/images/logo-wallet.svg';
import iconMoreSettings from 'src/assets/images/wallet/icons/icon-more-settings.svg';
import SortableComponent from "src/components/wallet/WalletItem/SortableComponent";
import iconAddPlus from 'src/assets/images/wallet/icons/icon-add-plus.svg';
import iconAlignJust from 'src/assets/images/wallet/icons/icon-align-just.svg';
import customRightIcon from 'src/assets/images/wallet/icons/icon-options.svg';
import floatButtonScanQRCode from 'src/assets/images/wallet/icons/float-button-scan.svg';

import WalletPreferences from 'src/components/wallet/WalletPreferences';
import { requestWalletPasscode, showQRCodeContent, showRequirePassword } from 'src/screens/app/redux/action';
import QRCodeContent from 'src/components/wallet/QRCodeContent';
import { ICON } from 'src/components/wallet/images';

import CreateWallet from "src/components/wallet/CreateWallet";

const QRCode = require('qrcode.react');

import { showQrCode } from 'src/components/barcodeScanner';

import { Ethereum } from 'src/services/Wallets/Ethereum.js';

import cx from 'classnames';

import styles from './styles.scss';

import logo from 'src/assets/images/logo-no-text.svg';
import { URL } from 'src/resources/constants/url';
import Loader from 'src/components/loading';
import ConfirmDialog from 'src/components/confirmDialog';
import { LabelLang } from 'src/lang/components';

const nameFormSendWallet = 'sendWallet';
const nameFormCreditCard = 'creditCard';
const defaultOffset = 500;

const MD_MAX_WITH = 850;

class Wallet extends React.Component {
    constructor(props) {

        super(props);

        this.modalBodyStyle = { padding: 0 };
        this.confirmDialogDelete = React.createRef();

        this.state = {

            addressParram: false,
            height: __CLIENT__ ? window.innerHeight : 0,
            width: __CLIENT__ ? window.innerWidth : 0,
            isDeskTop: false,

            // wallet:
            isLoading: true,
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
            createWalletContent: '',
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
            modalTransferCoin: '',
            modalReceiveCoin: '',
            modalSetting: '',
            modalHistory: '',
            modalWalletPreferences: "",
            modalSecure: "",
            modalRemindCheckout: '',
            exportPrivateContent: "",
            userPassword: '',

            // sortable:
            listSortable: { coin: false, token: false, collectitble: false },
        }
        this.updateDimensions = this.updateDimensions.bind(this);
    }
    componentDidMount() {
        
        let addressParram = this.props.match.params.address || false;
        
        this.setState({ addressParram });
        if (__CLIENT__)
            window.addEventListener("resize", this.updateDimensions);

        this.updateDimensions();

        this.getSetting();

        // todo call api get wallet data ...    
        this.props.userWallet().then((listWallet) => {
            
            if (listWallet !== false) {
                this.splitWalletData(listWallet);
                this.getListBalace(listWallet);
                if (this.state.isDeskTop)
                    this.setDefaultDesktop();
            }
            else {
                this.showAlert("Can not get your wallet now ...");
            }

        }).finally(() => {

        });

    }
    setDefaultDesktop() {
        if (this.state.listMainWalletBalance.length > 0) {
            let wallet = this.state.listMainWalletBalance[0];
            this.onWalletItemClick(wallet);
        }
    }
    updateDimensions() {
        if (!__CLIENT__) return;
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
        
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
                // window.location.href = window.location.href + "/" + walletSelected.toString();
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
        if (__CLIENT__)
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

            wallet.selected = false;

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
            isLoading: false, listMainWalletBalance: listMainWallet, listTokenWalletBalance: listTokenWallet, listCollectibleWalletBalance: listCollectibleWallet, listTestWalletBalance: listTestWallet,
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
    onConfirmDeleteWallet = () => {
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

                if (this.state.isDeskTop)
                    this.setDefaultDesktop();
            }
        }        
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

    // show create coin:
    showModalAddCoin = () => {
        this.setState({ createWalletContent: <CreateWallet onFinish={(wallet, phrase) => { this.successCreateWallet(wallet, phrase) }} /> }, () => {
            this.modalCreateWalletRef.open();
        })
    }
    successCreateWallet = (newWallet, phrase) => {
        // call api to update:    
        const lstWalletTemp = this.getAllWallet();

        const listNewWallet = lstWalletTemp.concat(newWallet);

        this.saveWallet(listNewWallet);

        if (phrase != '') {
            // need get balance
            this.getListBalace(listNewWallet);
        }

        this.setState({ createWalletContent: "" });
        this.splitWalletData(listNewWallet);
        this.modalCreateWalletRef.close();
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

    saveWallet(wallets) {
        this.props.makeSaveWallet(wallets).then((result) => {
            console.log('saved wallet');

        }).finally(() => {

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
            modalSecure: <WalletProtect onCopy={()=>{ this.onCopyProtected(walletEncrypt); }}
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
                this.onExportPrivateKeyClick(wallet);
            });
            return;
        }

        this.setState({
            exportPrivateContent: (
                <div className={styles.exportPrivateKey}>
                    <div className={styles.exTitle}>{messages['wallet.action.export_private_key.title']}</div>
                    <QRCode size={230} value={walletEncrypt.privateKey} onClick={() => { Clipboard.copy(walletEncrypt.privateKey); this.showToast(messages['wallet.action.copy.success']); }} />
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

        if (this.state.isDeskTop) {
            wallet.selected = true;
            let lstWalletTemp = this.getAllWallet();
            lstWalletTemp.forEach(wal => { if (wal != wallet) { wal.selected = false; } });

            let modalHistory = <WalletHistory
                isDeskTop={this.state.isDeskTop}
                onTransferClick={() => this.showTransfer(wallet)}
                onReceiveClick={() => this.onAddressClick(wallet)}
                onWarningClick={() => this.onWarningClick(wallet)}
                goToBuyCoin={() => this.goToBuyCoin()}
                wallet={wallet}
                onPreferencesClick={() => this.onOpenWalletPreferences(wallet)}
                callUpdate={callUpdate}
            />

            if (this.state.modalHistory == "") {
                this.setState({
                    walletSelected: wallet,
                    modalHistory
                });
            }
            else {
                this.setState({
                    walletSelected: wallet,
                    modalHistory: ""
                }, () => { this.setState({ modalHistory }) });
            }


        }
        else {
            this.setState({
                walletSelected: wallet,
                modalHistory:
                    (
                        <WalletHistory
                            isDeskTop={this.state.isDeskTop}
                            onTransferClick={() => this.showTransfer(wallet)}
                            onReceiveClick={() => this.onAddressClick(wallet)}
                            onWarningClick={() => this.onWarningClick(wallet)}
                            wallet={wallet}
                            callUpdate={callUpdate}
                        />
                    )
            }, () => {
                this.modalHistoryRef.open();
            });
        }
    }
    goToBuyCoin = () => {
        this.props.history.push(URL.HOME);
    }
    onUpdateWalletName = (wallet) => {
        this.setState({ walletSelected: wallet });
        //update data wallet.        
        this.saveWallet(this.getAllWallet());
        this.onWalletItemClick(wallet);
    } 
    
    confirmDeleteWallet = () => { 
        this.confirmDialogDelete.current.show(); 
    }

    onOpenWalletPreferences = (wallet) => {
        this.setState({
            modalWalletPreferences: (<WalletPreferences onDeleteWalletClick={this.confirmDeleteWallet} onWarningClick={() => { this.onWarningClick(wallet); }} onExportPrivateKeyClick={() => { this.onExportPrivateKeyClick(wallet); }} onUpdateWalletName={(wallet) => { this.onUpdateWalletName(wallet); }} wallet={wallet} />)
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

    closeTransfer = () => {
        this.setState({ modalTransferCoin: '' });
    }

    closeCreate = () => {
        this.setState({ createWalletContent: '' });
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

    onCopyProtected = (walletEncrypt) => {
        const { messages } = this.props.intl;
        Clipboard.copy(walletEncrypt.mnemonic);
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
        if (__CLIENT__)
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

    renderDesktopContent() {
        const { messages } = this.props.intl;
        if (this.state.isDeskTop)
            return (
                <div className={styles.walletContainer}>
                    <Container className={styles.fullHeightBox}>
                        <div className={styles.container}>

                            <div className={styles.header}>
                                <span className={styles.title}> {messages['wallet.title']} </span>
                            </div>

                            {/* <h3>
                                Window width: {this.state.width} and height: {this.state.height}
                                is Destop {this.state.isDeskTop.toString()}
                            </h3> */}
                            <div className={styles.walletWrap}>
                                <div className={styles.walletWrapLeft}>
                                    {this.state.isLoading ?
                                    <div className={styles.loading}><Loader color="#3F2782" /></div>:
                                    <div className={styles.walletList}>                                        
                                        {this.renderLiveCoin()}
                                        {this.renderTestNet()}
                                    </div>}
                                </div>
                                <div className={styles.walletWrapRight}>
                                    <div className={styles.walletDetail}>
                                        {this.state.modalHistory}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        return null;
    }


    renderMobileContent() {
        const { messages } = this.props.intl;
        if (!this.state.isDeskTop)
            return (
                <div className={styles.walletMobileContainer}>
                    <Container>

                        {/* 1. Header Wallet ============================================== */}
                        <div id="header-wallet"><div className={styles.headerWallet}>
                            <div className={styles.titleWallet}><img className={styles.logoWallet} src={logo} />{messages['wallet.title']}</div>
                        </div></div>
                        {/* 2 List Coin */}
                        {this.renderLiveCoin()}
                        {this.renderTestNet()}

                    </Container>
                </div>
            )
        return null;
    }

    renderModals() {
        const { messages } = this.props.intl;
        const { modalTransferCoin, modalHistory, modalSecure, modalWalletPreferences, modalReceiveCoin, walletSelected, walletsData, exportPrivateContent, createWalletContent } = this.state;

        return (
            <div>
                {/* float button qrcode */}
                <img onClick={this.onFloatButtonClick} className={styles.floatButtonScanQrcode} src={floatButtonScanQRCode} />

                {/* Modal wallet prefrences */}
                <Modal customRightIconClick={() => { this.onOpenWalletPreferences(this.state.walletSelected); }} customRightIcon={customRightIcon} modalBodyStyle={this.modalBodyStyle} title={this.state.walletSelected ? this.state.walletSelected.title : messages['wallet.action.history.header']} onRef={modal => this.modalHistoryRef = modal} onClose={this.closeHistory}>
                    {!this.state.isDeskTop ? modalHistory : ''}
                </Modal>

                {/* wallet preferences  */}
                <Modal title="Preferences" onRef={modal => this.modalWalletReferencesRef = modal} modalBodyStyle={this.modalBodyStyle} onClose={this.closePreferences}>
                    {modalWalletPreferences}
                </Modal>

                {/* qrcode result detected modal popup*/}
                <QRCodeContent onTransferClick={(data) => { this.showTransferFromQRCode(data); }} />                

                <ConfirmDialog
                    title={<LabelLang id="wallet.action.remove.header" />}
                    body={<LabelLang id="wallet.action.remove.message" />}
                    confirmText={<LabelLang id="wallet.action.remove.button_yes" />}
                    cancelText={<LabelLang id="wallet.action.remove.button_cancel" />}
                    ref={this.confirmDialogDelete}
                    onConfirm={this.onConfirmDeleteWallet}
                    />

                {/* ModalDialog for transfer coin */}
                <Modal title={messages['wallet.action.transfer.header']} onRef={modal => this.modalSendRef = modal} onClose={this.closeTransfer}>
                    {modalTransferCoin}
                </Modal>

                <Modal title={messages['wallet.action.protect.header']} onRef={modal => this.modalProtectRef = modal} onClose={this.closeSecure}>
                    {modalSecure}
                </Modal>

                {/* Modal for Export Private key : */}
                <Modal title={messages['wallet.action.preferecens.list_item.export_private_key']} onRef={modal => this.modalExportPrivateKeyRef = modal} onClose={this.onCloseExportPrivateKey}>
                    {exportPrivateContent}
                </Modal>

                {/* Modal for Copy address : */}
                <Modal title={messages['wallet.action.receive.title']} onRef={modal => this.modalReceiveCoinRef = modal} onClose={() => { this.setState({ modalReceiveCoin: false }) }}>
                    {modalReceiveCoin}
                </Modal>

                {/* Modal for Create/Import wallet : */}
                <Modal title={messages['wallet.action.create.header']} onRef={modal => this.modalCreateWalletRef = modal} onClose={this.closeCreate}>
                    {createWalletContent}
                </Modal>

            </div>
        )
    }

    render() {
        return (
            <div className={styles.walletPage}>
                {this.renderModals()}
                {this.renderDesktopContent()}
                {this.renderMobileContent()}
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
    requestWalletPasscode,
    showQRCodeContent,
    showRequirePassword,
});


export default injectIntl(connect(mapState, mapDispatch)(Wallet));


