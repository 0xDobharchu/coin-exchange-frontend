import React from 'react';
import { Col, Row } from 'react-bootstrap';
import iconChecked from 'src/assets/images/wallet/icons/icon-checked-wallet.svg';
import { injectIntl } from 'react-intl';


import PropTypes from 'prop-types';
import styles from './style.scss';
import CoinTemp from './CoinTemp';

import Button from 'src/components/core/controls/Button';
import Input from 'src/components/core/controls/input';
import Dropdown from 'src/components/core/controls/Dropdown';
import { MasterWallet } from 'src/services/Wallets/MasterWallet';
import { showLoading, hideLoading, showAlert } from 'src/screens/app/redux/action';
import { connect } from 'react-redux';

class CreateWallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCoinTempToCreate: [],
            countCheckCoinToCreate: 0,
            erroValueBackup: false,
            isRestoreLoading: false,
        }
    }
    componentDidMount() {
        this.setState({ isRestoreLoading: false, countCheckCoinToCreate: 1, listCoinTempToCreate: MasterWallet.getListCoinTemp() });
    }
    // create list coin type to create wallet:
    get getListCoinTempForCreate() {
        return this.state.listCoinTempToCreate.map(walletTemp => <CoinTemp key={Math.random()} wallet={walletTemp} onClick={() => this.onSelectCoinClick(walletTemp)} />);
    }
    // on select type of wallet to create:
    onSelectCoinClick = (wallet) => {
        const listCoinTemp = this.state.listCoinTempToCreate;

        wallet.default = !wallet.default;
        let countCheckCoinToCreate = 0;
        listCoinTemp.forEach((wal) => { if (wal.default) countCheckCoinToCreate += 1; });

        this.setState({ erroValueBackup: false, listCoinTempToCreate: listCoinTemp, countCheckCoinToCreate });
    }
    createNewWallets = () => {        
        this.setState({ isRestoreLoading: true, erroValueBackup: false });
        const listCoinTemp = this.state.listCoinTempToCreate;

        const phrase = this.state.input12PhraseValue.trim();

        // todo: popup request password:
        let password = '12345678';
        const newWallet = MasterWallet.createNewWallet(listCoinTemp, phrase, password);

        if (newWallet == false) {
            this.setState({ isRestoreLoading: false, erroValueBackup: true });

            if (phrase != '') {
                this.showError('wallet.action.create.error.recovery_words_invalid')
            }
            else {
                this.showError('wallet.action.create.error.random');
            }
        } else {

            if (this.props.onFinish){
                this.props.onFinish(newWallet, phrase);
            }
        }
    }
    update12PhraseValue = (evt) => {
        this.setState({
            input12PhraseValue: evt.target.value,
        });
    }
    showAlert(msg, type = 'success', timeOut = 3000, icon = '') {
        this.props.showAlert({
            message: msg,
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
    render() {
        const { messages } = this.props.intl;

        const invalidInput = this.state.walletKeyDefaultToCreate == 2 && this.state.input12PhraseValue.trim().split(/\s+/g).length != 12;

        const invalidSelectedCoin = this.state.countCheckCoinToCreate == 0
        
        return (
            <div className={styles['wallet-box-add-new']}>
                <Row className={styles.list}>
                    {this.getListCoinTempForCreate}
                </Row>
                <Row className={styles.list}>
                    <div className={styles.headerText}> {messages['wallet.action.create.label.wallet_key']} </div>
                </Row>
                <div className={styles.walletCreateFooter}>
                    <Dropdown
                        className={styles.dropdownWallet}
                        placeholder={messages['wallet.action.create.placeholder.wallet_key']}
                        defaultId={1}
                        source={[{ id: 1, value: messages['wallet.action.create.text.random'] }, { id: 2, value: messages['wallet.action.create.text.specify_phrase'] }]}
                        onItemSelected={(item) => {
                            this.setState({
                                walletKeyDefaultToCreate: item.id,
                                erroValueBackup: false,
                                input12PhraseValue: ""
                            });
                        }
                        }
                    />

                    {this.state.walletKeyDefaultToCreate == 2 ?
                        <Input
                            name="phrase"
                            placeholder={messages['wallet.action.create.placeholder.phrase']}
                            required
                            value={this.state.input12PhraseValue}
                            className={ (this.state.erroValueBackup || invalidInput) ?  styles['input-phrase-error'] : styles['input-phrase']}
                            onChange={evt => this.update12PhraseValue(evt)}
                        />
                        : ''
                    }
                </div>


                <Button block isLoading={this.state.isRestoreLoading} disabled={invalidInput || invalidSelectedCoin} className={"button " + styles.buttonWallet} cssType="primary" onClick={() => { this.createNewWallets(); }} >
                    {messages['wallet.action.create.button.create']}
                </Button>
                
            </div>
        )
    }
}
const mapState = (state) => ({

});

const mapDispatch = ({    
    showAlert,
    showLoading,
    hideLoading,    
});

export default injectIntl(connect(mapState, mapDispatch)(CreateWallet));