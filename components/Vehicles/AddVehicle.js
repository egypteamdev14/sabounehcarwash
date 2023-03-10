import { addNewVehicle } from '@/services/vehicles';
import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Button from '../Button';

const AddVehicle = () => {
  
	const [show, setShow] = useState(false);


  const [formData, setFormData] = useState({
		title: '',
		description:'',
		exteriorPrice:'',
		exteriorAndInteriorPrice:''
	});
  
	const {title, description, exteriorPrice, exteriorAndInteriorPrice} = formData;

	//  handel input changes
	const handelChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	const [image, setImage] = useState('')
  // handle File change
	const handelFileChange = (e)=> {
    setImage(e.target.files[0])
	}

	// Add New Vehicle
	const handelAdd = async (e) => {

		e.preventDefault();

		const vehicleData = new FormData();
		vehicleData.append('image', image)
		vehicleData.append('title', title)
		vehicleData.append('description', description)
		vehicleData.append('exteriorPrice', exteriorPrice)
		vehicleData.append('exteriorAndInteriorPrice', exteriorAndInteriorPrice)

		try {
			await addNewVehicle(vehicleData);
			toast.success("Vehicle added successfully")
			setShow(false)
		} catch (error) {
			toast.error(error.message)
		}
	}

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


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
			>Add New Vehicle </Button>

			<Modal centered show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add New User</Modal.Title>
				</Modal.Header>
				<Modal.Body className=''>
					<Form onSubmit={handelAdd}>
						{/* Full Name */}
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Title</Form.Label>
							<Form.Control type="text" placeholder="Enter Title" name='title' required onChange={(e) => handelChange(e)} value={title} />
						
						</Form.Group>
						{/* Description */}
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" placeholder="Enter description" name='description' required onChange={(e) => handelChange(e)} value={description} />
						
						</Form.Group>
             
						 {/* Choose Image */}
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Chose Image</Form.Label>
							<Form.Control type="file" 	placeholder="chose Image" name='imageFile' required onChange={handelFileChange}  />
							
						</Form.Group>
           
					  {/* Exterior Price */}
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Exterior Price</Form.Label>
							<Form.Control type="number" placeholder="Enter Exterior Price" name='exteriorPrice' required onChange={(e) => handelChange(e)} value={exteriorPrice} />
							
						</Form.Group>
						
						{/* Enter Exterior And Interior Price */}
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Enter Exterior And Interior Price</Form.Label>
							<Form.Control type="number" placeholder="Enter Exterior And Interior Price" name='exteriorAndInteriorPrice' required onChange={(e) => handelChange(e)} value={exteriorAndInteriorPrice} />
							
						</Form.Group>

						
             {/* Button handle add */}
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

export default AddVehicle