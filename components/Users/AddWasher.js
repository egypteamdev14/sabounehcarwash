import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import Button from '../Button';
import { addNewWasher, addUser, updateUser } from '@/services/users';
import { toast } from 'react-toastify';

function AddWasher({ updateUserInfo }) {
	const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState('');
	const [formData, setFormData] = useState({
		fullName: updateUserInfo ? updateUserInfo.fullName : "",
		phoneNumber: updateUserInfo ? updateUserInfo.phoneNumber : "",
		RelativePhone: updateUserInfo ? updateUserInfo.RelativePhone : "",
		IDNumber: updateUserInfo ? updateUserInfo.IDNumber : "",
		address: updateUserInfo ? updateUserInfo?.address : "",
		vehicleType: updateUserInfo ? updateUserInfo?.vehicleType : "",
		role: "serviceProvider",
		
		
	});

	const { phoneNumber, fullName, IDNumber,address , RelativePhone, vehicleType, role } = formData

	// console.log(updateUserInfo)

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//  handel input changes
	const handelChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	// handle image change
	const handelFileChange = (e)=> {
    setImageFile(e.target.files[0])
	}

	// handel Add User
	const handelAdd = async (e) => {
		e.preventDefault();
      
    const washerData = new FormData();
		washerData.append('image', imageFile)
		washerData.append('fullName', fullName)
		washerData.append('phoneNumber', phoneNumber)
		washerData.append('RelativePhone', RelativePhone)
		washerData.append('IDNumber', IDNumber)
		washerData.append('address', address)
		washerData.append('vehicleType', vehicleType)
		washerData.append('role', role)

		try {
			await addNewWasher(washerData);

			toast.success("Washer added successfully");
			setShow(false)

		} catch (error) {
			toast.error(error.message)
			console.log(error.message)
		}

	}

	


	return (
		<>

			<Button
				bg={"#05A8F5"}
				color={"#ffffff"}
				width={"170px"}
				height={"35px"}
				radius={"8px"}
				fontSize={"1rem"}
				onClick={handleShow}
			>Add New Washer </Button>

			<Modal centered show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add New Washer</Modal.Title>
				</Modal.Header>
				<Modal.Body className=''>
					<Form onSubmit={handelAdd}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Full Name</Form.Label>
							<Form.Control type="text" placeholder="Enter FullName" name='fullName' required onChange={(e) => handelChange(e)} value={fullName} />
							<Form.Text className="text-muted">

								We will never share your Info.
							</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Chose Image</Form.Label>
							<Form.Control type="file" 	placeholder="chose Image" name='imageFile' required onChange={handelFileChange}  />
							
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>ID Number</Form.Label>
							<Form.Control type="text" placeholder="Enter id Number" name='IDNumber' required onChange={(e) => handelChange(e)} value={IDNumber} />
							<Form.Text className="text-muted">

								We will never share your Info.
							</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Address</Form.Label>
							<Form.Control type="text" placeholder="Enter FullName" name='address' required onChange={(e) => handelChange(e)} value={address} />
							<Form.Text className="text-muted">

								We will never share your Info.
							</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Mobile Number</Form.Label>
							<Form.Control type="text" placeholder="Enter Mobile Number" name='phoneNumber' required onChange={(e) => handelChange(e)} value={phoneNumber} />
							
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Other Mobile Number</Form.Label>
							<Form.Control type="text" placeholder="Enter Mobile Number" name='RelativePhone' required onChange={(e) => handelChange(e)} value={RelativePhone} />
							
						</Form.Group>
 

						<Form.Select className="mb-3" aria-label="Default select example" name='vehicleType' required onChange={(e) => handelChange(e)} >
							<option>Vehicle Type</option>
							<option value="car">Car</option>
							<option value="motorcycle">Motorcycle</option>

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

export default AddWasher;