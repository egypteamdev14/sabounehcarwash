import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import Button from '../Button';
import { addUser, updateUser } from '@/services/users';
import { toast } from 'react-toastify';

const UpdateNewSubscriptions = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Launch demo modal
			</Button>

			<Modal centered show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you re reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default UpdateNewSubscriptions