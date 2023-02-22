import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import Button from './Button';

import { updateUser } from '@/services/users';
import { toast } from 'react-toastify';


const UpdatePopUp = ({ id }) => {
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({
		status: ''
	});

	const handelChange = (e) => {
		const { value, name } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const { status } = formData

	// console.log(formData)

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	const handelUpdate = async (e) => {
		e.preventDefault();
		try {
			await updateUser(id, formData);

			toast.success("User updated successfully")
			setShow(false)



		} catch (error) {
			toast.error(error.message)
			console.log(error.message);
		}
	}

	return (
		<>
			<Button
				bg={"#05A8F5"}
				color={"#ffffff"}
				width={"130px"}
				height={"35px"}
				radius={"8px"}
				fontSize={"1rem"}
				onClick={handleShow}
			>
				Update User
			</Button>

			<Modal centered show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Update User </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handelUpdate}>
						<Form.Select className="mb-5" aria-label="Default select example" name='status' required onChange={(e) => handelChange(e)} value={status}>
							<option>Update User Status</option>
							<option value="verified">verified</option>
							<option value="blocked">blocked</option>

						</Form.Select>
						<div className='d-flex align-items-center justify-content-center'>
							<Button
								bg={"#05A8F5"}
								color={"#fff"}
								width={"40%"}
								height={"40px"}
								radius={"5px"}
								cl="text-center"
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
						width={"20%"}
						height={"40px"}
						radius={"5px"}
						cl="text-center"
						variant="secondary" onClick={handleClose}>
						Close
					</Button>

				</Modal.Footer>
			</Modal>
		</>
	);
}

export default UpdatePopUp