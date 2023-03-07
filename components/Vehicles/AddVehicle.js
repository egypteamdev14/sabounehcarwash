import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import Button from '../Button';

const AddVehicle = () => {

  const [formData, setFormData] = useState({
		title: '',
		description:'',
		exteriorPrice:'',
		exteriorAndInteriorPrice:''
	});

	const [image, setImage] = useState('')


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
							{/* <Form.Text className="text-muted">

								We will never share your email with anyone else.
							</Form.Text> */}
						</Form.Group>
						{/* Mobile Number */}
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" placeholder="Enter description" name='description' required onChange={(e) => handelChange(e)} value={description} />
							{/* <Form.Text className="text-muted">
								we will never share your info
							</Form.Text> */}
						</Form.Group>
           
					  {/* Email */}
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Exterior Price</Form.Label>
							<Form.Control type="email" placeholder="Enter Exterior Price" name='exteriorPrice' required onChange={(e) => handelChange(e)} value={exteriorPrice} />
							{/* <Form.Text className="text-muted">

								We will never share your Info.
							</Form.Text> */}
						</Form.Group>
						
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Exterior Price</Form.Label>
							<Form.Control type="email" placeholder="Enter Exterior Price" name='exteriorPrice' required onChange={(e) => handelChange(e)} value={exteriorPrice} />
							{/* <Form.Text className="text-muted">

								We will never share your Info.
							</Form.Text> */}
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

export default AddVehicle