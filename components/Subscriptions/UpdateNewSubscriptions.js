import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import Button from '../Button';
// import { addUser, updateUser } from '@/services/users';
import { toast } from 'react-toastify';
import { updateSubscription } from '@/services/subscription';

const UpdateNewSubscriptions = ({ id }) => {
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		price: 0,
		washerFees: 0,
		washerFeesUnderEvaluation: 0
	});

	const { title, description, price, washerFees, washerFeesUnderEvaluation } = formData
	// handel Input Change
	const handelChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value })
	}

	// Add New Subscription
	const handelSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateSubscription(id, formData);
			toast.success("Subscription added successfully")
			setShow(false)
		} catch (error) {
			toast.error(error.message)
			console.log(error.message)
		}
	}

	// handel Show and Hide Model 
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button
				bg={"#05A8F5"}
				color={"#ffffff"}
				width={"170px"}
				height={"35px"}
				radius={"8px"}
				fontSize={".9rem"}
				onClick={handleShow}
			>
				Update Subscription
			</Button>

			<Modal centered show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Update Subscription</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handelSubmit}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Title</Form.Label>
							<Form.Control type="text" placeholder="Enter Title" required name='title' onChange={(e) => handelChange(e)} />
							<Form.Text className="text-muted">
								Well never share your email with anyone else.
							</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" placeholder="Description" required name='description' onChange={(e) => handelChange(e)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" placeholder="Price" required name='price' onChange={(e) => handelChange(e)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPrice">
							<Form.Label>Washer Fees</Form.Label>
							<Form.Control type="number" placeholder="Washer Fees" required name='WasherFees' onChange={(e) => handelChange(e)} value={washerFees}/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPrice">
							<Form.Label>Washer Fees Under Evaluation</Form.Label>
							<Form.Control type="number" placeholder="Washer Fees Under Evaluation" required name='washerFeesUnderEvaluation' onChange={(e) => handelChange(e)} value={washerFeesUnderEvaluation}/>
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

export default UpdateNewSubscriptions