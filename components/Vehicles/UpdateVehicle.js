import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Button from '../Button';
import { updateVehicle } from '@/services/vehicles';

const UpdateVehicle = ({id , vehicleData}) => {
  
	const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
		title: vehicleData ? vehicleData.title :'',
		description: vehicleData ? vehicleData.description :'',
		exteriorPrice: vehicleData ? vehicleData.exteriorPrice :'',
		exteriorAndInteriorPrice:vehicleData ? vehicleData.exteriorAndInteriorPrice :'',
	});

	const [image, setImage] = useState('')
	const {title, description, exteriorPrice, exteriorAndInteriorPrice} = formData
  
  //  handel input changes
	const handelChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	// handle File change
	const handelFileChange = (e)=> {
    setImage(e.target.files[0])
	}

	// handle Open And close Modal
  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	// handle Update 
	const handelUpdate = async(e)=>  {
		e.preventDefault();

		const vehicleData = new FormData();
		  vehicleData.append('image', image)
		  vehicleData.append('title', title)
		  vehicleData.append('description', description)
		  vehicleData.append('exteriorPrice', exteriorPrice)
		  vehicleData.append('exteriorAndInteriorPrice', exteriorAndInteriorPrice);

    try {
			await updateVehicle(id, vehicleData);
			toast.success("Vehicle Updated successfully")
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
			>Update Vehicle </Button>

			<Modal centered show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Update Vehicle</Modal.Title>
				</Modal.Header>
				<Modal.Body className=''>
					<Form onSubmit={handelUpdate}>
						{/* Full Name */}
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Title</Form.Label>
							<Form.Control type="text" placeholder="Enter Title" name='title' required onChange={(e) => handelChange(e)} value={title} />
							
						</Form.Group>
						{/* Mobile Number */}
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
							<Form.Control type="text" placeholder="Enter Exterior Price" name='exteriorPrice' required onChange={(e) => handelChange(e)} value={exteriorPrice} />
						</Form.Group>
						
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Exterior And Interior Price</Form.Label>
							<Form.Control type="text" placeholder="Enter Exterior Price" name='exteriorAndInteriorPrice' required onChange={(e) => handelChange(e)} value={exteriorAndInteriorPrice} />			
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

export default UpdateVehicle