import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import Button from '../Button';
import { addUser, updateUser } from '@/services/users';
import { toast } from 'react-toastify';

function AddUserPopUp({ updateUserInfo }) {
	const [show, setShow] = useState(false);

	const [formData, setFormData] = useState({
		phoneNumber: updateUserInfo ? updateUserInfo.phoneNumber : "",
		role: updateUserInfo ? updateUserInfo.role : "",
		fullName: updateUserInfo ? updateUserInfo.fullName : "",
		password: updateUserInfo ? updateUserInfo.password : ""
	});

	const { phoneNumber, role, fullName, password } = formData

	// console.log(updateUserInfo)

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//  handel input changes
	const handelChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	// handel Add User
	const handelAdd = async (e) => {
		e.preventDefault();

		try {
			await addUser(formData);

			toast.success("User added successfully");
			setShow(false)

		} catch (error) {
			toast.error(error.message)
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
			>Add New User </Button>

			<Modal centered show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add New User</Modal.Title>
				</Modal.Header>
				<Modal.Body className=''>
					<Form onSubmit={handelAdd}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Full Name</Form.Label>
							<Form.Control type="text" placeholder="Enter FullName" name='fullName' required onChange={(e) => handelChange(e)} value={fullName} />
							<Form.Text className="text-muted">

								We will never share your email with anyone else.
							</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Mobile Number</Form.Label>
							<Form.Control type="text" placeholder="Enter Mobile Number" name='phoneNumber' required onChange={(e) => handelChange(e)} value={phoneNumber} />
							<Form.Text className="text-muted">
								we will never shere your info
							</Form.Text>
						</Form.Group>

						<Form.Select className="mb-3" aria-label="Default select example" name='role' required onChange={(e) => handelChange(e)} value={role}>
							<option>Select Your Role</option>
							<option value="admin">admin</option>
							<option value="employee">employee</option>

						</Form.Select>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" name='password' required onChange={(e) => handelChange(e)} value={password} />
						</Form.Group>

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

export default AddUserPopUp;