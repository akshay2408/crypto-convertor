import React, { useState } from 'react'
import ConnectWallet from '../Modals/connectWallet/ConnectWallet';
import ResponseModal from '../Modals/responseModal/ResponseModal';
import './styles.scss.css';

interface CryptoProps {
  buttonHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
  closeModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  login: (event: React.MouseEvent<HTMLButtonElement>) => void,
  logout: (event: React.MouseEvent<HTMLButtonElement>) => void,
  showCryptoModal: boolean,
  showResponseModal: boolean,
  isConnected: boolean,
  balance: number,
  currentAccount: String,
  chainId: Number
}

const CryptoConvertor = (props: CryptoProps) => {
  const [values, setValues] = useState<number | undefined>(undefined);
  const [budsValues, setBudsValues] = useState<number | undefined>(undefined);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nepValue = Number(event.target.value);
    const nepValueFixed = Number(nepValue.toFixed(2))
    setValues(nepValueFixed || undefined);
    setBudsValues(nepValueFixed * 3);
  };

  const { buttonHandler, showCryptoModal, closeModal, login, logout, showResponseModal, isConnected, balance, chainId,
    currentAccount } = props;
  return (
    <div className="back">
      <div className="div-center">
        <div className="content">
          <h3>Crypto Convertor</h3>
          <form>
            <div className="form-group px-2 py-3">
              <label htmlFor="nepLabel" className="pb-2 formLabel">NEP</label>
              <input type="number" className="form-control" id="nepLabel" onChange={onChange} value={values} placeholder="0.00" />
            </div>
            <div className="form-group px-2 py-3">
              <label htmlFor="busdLabel" className="pb-2 formLabel">BUSD</label>
              <input type="text" className="form-control" id="busdLabel" value={budsValues} placeholder="0.00" />
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-link" onClick={event => buttonHandler(event)}>Check Wallet Details</button>
            </div>
          </form>
        </div>
      </div>
      < ConnectWallet showCryptoModal={showCryptoModal} closeModal={closeModal} login={login} />
      {isConnected ? <ResponseModal showResponseModal={showResponseModal} logout={logout} balance={balance}
        currentAccount={currentAccount} chainId={chainId} /> : null}
    </div>
  )
}

export default CryptoConvertor
