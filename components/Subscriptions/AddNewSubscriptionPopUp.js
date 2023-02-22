
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import Button from '../Button';
import { addUser, updateUser } from '@/services/users';
import { toast } from 'react-toastify';

const AddNewSubscriptionPopUp = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button
				bg={"#05A8F5"}
				color={"#ffffff"}
				width={"230px"}
				height={"35px"}
				radius={"8px"}
				fontSize={"1rem"}
				onClick={handleShow}
			>
				Add New Subscription
			</Button>

			<Modal centered show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Add New Subscription</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Title</Form.Label>
							<Form.Control type="text" placeholder="Enter Title" required />
							<Form.Text className="text-muted">
								Well never share your email with anyone else.
							</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" placeholder="Description" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" placeholder="Price" />
						</Form.Group>

						<div className='d-flex align-items-center justify-content-center'>
							<Button
								bg={"#05A8F5"}
								color={"#fff"}
								width={"40%"}
								height={"40px"}
								radius={"5px"}
								cl="text-center mt-3"
								type={"submit"}
							>
								Save Changes
							</Button>
						</div>

					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						bg={"#6c757d"}
						color={"#fff"}
						width={"70px"}
						height={"30px"}
						radius={"5px"}

						onClick={handleClose}>
						Close
					</Button>

				</Modal.Footer>
			</Modal>
		</>
	);
}

export default AddNewSubscriptionPopUp