import React from 'react'
import ModalHeader from 'react-bootstrap/ModalHeader';
import { Modal, ModalBody } from 'react-bootstrap';
import './styles.scss.css';
interface ResponseModalProps {
	showResponseModal: boolean,
	logout: (event: React.MouseEvent<HTMLButtonElement>) => void,
	balance: number,
	currentAccount: String,
	chainId: Number,
}
const ResponseModal = (props: ResponseModalProps) => {
	const { showResponseModal, logout, balance, currentAccount, chainId } = props
	const firstFourLetters = currentAccount.substring(0, 4);
	const lastFOurLetter = currentAccount.substring(currentAccount.length - 4);
	const accountId = firstFourLetters + "...." + lastFOurLetter
	return (
		<div>
			<div>
				<Modal show={showResponseModal} centered>
					<ModalHeader className='border-0 fw-bold' closeButton>
						Wallet details
					</ModalHeader>
					<ModalBody>
						<div>
							<table className="table table-details">
								<thead>
									<tr>
										<th>Key</th>
										<th align="right">Value</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Account</td>
										<td align="right">{accountId}</td>
									</tr>
									<tr>
										<td>Chain ID</td>
										<td align="right">{chainId}</td>
									</tr>
									<tr>
										<td>Balance</td>
										<td align="right">{balance}</td>
									</tr>
								</tbody>
							</table>
							<p className="text-center">Wallet details</p>
							<div>
								<button className="btn btn-danger w-100" onClick={event => logout(event)}>Disconnected</button>
							</div>
						</div>
					</ModalBody>
				</Modal>
			</div>
		</div>
	)
}

export default ResponseModal
