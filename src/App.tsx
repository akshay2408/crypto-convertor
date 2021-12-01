import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CryptoConvertor from './components/cryptoConvertor/cryptoConvertor';
import Web3 from "web3";
import { useState } from 'react';
function App() {
  const [showCryptoModal, setShowCryptoModal] = React.useState<boolean>(false);
  const [isConnected, setIsConnected] = React.useState<boolean>(false)
  const [showResponseModal, setShowResponseModal] = React.useState<boolean>(false)
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [chainId, setChainId] = useState(0)
  const buttonHandler = () => {
    setShowCryptoModal(true)
  }
  const closeModal = () => {
    setShowCryptoModal(false)
  }
  const login = async (provider: any) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);

      const accBalanceEth = web3.utils.fromWei(
        await web3.eth.getBalance(accounts[0]),
        "ether"
      );
      const chainId = await web3.eth.getChainId()
      setChainId(chainId)
      const balanceInNumber = parseFloat(accBalanceEth)
      setBalance(balanceInNumber);
      setShowCryptoModal(false)
      setShowResponseModal(true)
      setIsConnected(true)
    }
  }

  const logout = () => {
    setShowResponseModal(false)
    setIsConnected(false)
    setCurrentAccount("")
    setBalance(0)
  }

  return (
    <div className="App">
      <CryptoConvertor buttonHandler={buttonHandler} closeModal={closeModal} showCryptoModal={showCryptoModal} login={login} logout={logout} showResponseModal={showResponseModal} isConnected={isConnected} balance={balance} currentAccount={currentAccount} chainId={chainId} />
    </div>
  );
}

export default App;
