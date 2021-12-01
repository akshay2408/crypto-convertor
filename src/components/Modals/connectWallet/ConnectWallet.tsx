import React from 'react'
import ModalHeader from 'react-bootstrap/ModalHeader';
import { Modal, ModalBody } from 'react-bootstrap';
import './styles.scss.css';

interface ConnectWalletProps {
  closeModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  login: (event: React.MouseEvent<HTMLButtonElement>) => void,
  showCryptoModal: boolean
}
declare let window: any;

const ConnectWallet = (props: ConnectWalletProps) => {
  const [isConnecting, setIsConnecting] = React.useState<boolean>(false)
  const { showCryptoModal, closeModal, login } = props;

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("No Ethereum browser detected! Check out MetaMask");
    }
    return provider;
  };

  const onLoginHandler = async () => {
    const provider = detectProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallet installed ?"
        );
      }
      setIsConnecting(true);
      await provider.request({
        method: "eth_requestAccounts",
      });
      setIsConnecting(false);
    }
    login(provider);
  };

  return (
    <div>
      <Modal show={showCryptoModal} onHide={closeModal} centered>
        <ModalHeader className='border-0 fw-bold' closeButton>
          Wallet details
        </ModalHeader>
        <ModalBody>
          <p className="mb-5 text-danger" style={{ color: '#a97009c7' }}>Wallet not Connected.Please click the "Connect now" button below</p>
          <div className='row'>
            <div className="col-6">
              <button className="btn btn-primary w-100" onClick={event => onLoginHandler()}>{!isConnecting && "Connect now"}{isConnecting && "Loading...."}</button>
            </div>
            <div className="col-6">
              <button className="btn btn-light w-100" onClick={event => closeModal(event)}>Cancel</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ConnectWallet
