import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import Modal from 'react-bootstrap/Modal';
import Button from '../../Button';
import { addNewWasher, addUser, updateUser, updateWasher } from '@/services/users';
import { toast } from 'react-toastify';

function UpdateWasher({ updateWasherData }) {
  const [showw, setShow] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [formData, setFormData] = useState({
    fullName: updateWasherData ? updateWasherData?.fullName : "",
    phoneNumber: updateWasherData ? updateWasherData?.phoneNumber : "",
    RelativePhone: updateWasherData ? updateWasherData?.RelativePhone : "",
    IDNumber: updateWasherData ? updateWasherData?.IDNumber : "",
    address: updateWasherData ? updateWasherData?.address : "",
    vehicleType: updateWasherData ? updateWasherData?.vehicleType : "",
    activationPeriod: updateWasherData
      ? updateWasherData?.activationPeriod
      : "",
    restPeriod: updateWasherData ? updateWasherData?.restPeriod : "",
    restPeriodTime: updateWasherData ? updateWasherData?.restPeriodTime : "",
    underEvaluation: updateWasherData ? updateWasherData?.underEvaluation : "",
    role: "serviceProvider",
  });

  const {
    phoneNumber,
    fullName,
    IDNumber,
    address,
    RelativePhone,
    vehicleType,
    role,
    activationPeriod,
    restPeriod,
    restPeriodTime,
    underEvaluation,
  } = formData;

  // console.log(updateUserInfo)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //  handel input changes
  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

	// handle image change
	const handelFileChange = (e)=> {
    setImageFile(e.target.files[0])
	}

  // handel Update Washer
  const handelAdd = async (e) => {
    e.preventDefault();

    const washerData = new FormData();
    washerData.append("image", imageFile);
    washerData.append("fullName", fullName);
    washerData.append("phoneNumber", phoneNumber);
    washerData.append("RelativePhone", RelativePhone);
    washerData.append("IDNumber", IDNumber);
    washerData.append("address", address);
    washerData.append("vehicleType", vehicleType);
    washerData.append("activationPeriod", activationPeriod);
    washerData.append("restPeriod", +restPeriod);
    washerData.append("restPeriodTime", +restPeriodTime);
    washerData.append("underEvaluation", underEvaluation);
    washerData.append("role", role);

    try {
      await updateWasher(washerData._id, washerData);
      toast.success("Washer Updated successfully");
      setShow(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

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
			>Update Washer </Button>

      <Modal centered show={showw} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Washer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handelAdd}>
            {/* Name & Address */}
            <div className="flex align-items-center justify-content-betweens gap-5">
              {/* Full Name */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter FullName"
                  name="fullName"
                  required
                  onChange={(e) => handelChange(e)}
                  value={fullName}
                />
                <Form.Text className="text-muted">
                  We will never share your Info.
                </Form.Text>
              </Form.Group>
              {/* Address */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Address"
                  name="address"
                  required
                  onChange={(e) => handelChange(e)}
                  value={address}
                />
                <Form.Text className="text-muted">
                  We will never share your Info.
                </Form.Text>
              </Form.Group>
            </div>

            {/* Phone Number & other phone */}
            <div className="flex align-items-center justify-content-betweens gap-5">
              {/* Mobile Number */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile Number"
                  name="phoneNumber"
                  required
                  onChange={(e) => handelChange(e)}
                  value={phoneNumber}
                />
              </Form.Group>
              {/* Other MObile Number */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Other Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Other Mobile Number"
                  name="RelativePhone"
                  required
                  onChange={(e) => handelChange(e)}
                  value={RelativePhone}
                />
              </Form.Group>
            </div>

						<div className='flex align-items-center gap-5'>

							<div className='w-[36%]'>
								{/* Choose Image */}
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Chose Image</Form.Label>
									<Form.Control type="file" placeholder="chose Image" name='image' required onChange={handelFileChange} />

								</Form.Group>

							</div>
							{/* Id Number */}
							<div className='w-[36%]'>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>ID Number</Form.Label>
									<Form.Control type="text" placeholder="Enter id Number" name='IDNumber' required onChange={(e) => handelChange(e)} value={IDNumber} />

								</Form.Group>
							</div>
						</div>
						{/* Vehicle Type */}
						<h6>Vehicle Type</h6>
						<Form.Select className="mb-3 mt-3" aria-label="Default select example" name='vehicleType' required onChange={(e) => handelChange(e)} >
							<option>Vehicle Type</option>
							<option value="car">Car</option>
							<option value="motorcycle">Motorcycle</option>

						</Form.Select>
						{/* Type of Subscription */}
						<h6>Type of Subscription</h6>
						<Form.Select className="mb-3" aria-label="Default select example" name='TypeofSubscription' required onChange={(e) => handelChange(e)} >
							<option>Type of Subscription</option>
							<option value="Full-Car Wash">Full-Car Wash</option>
							<option value="plus">plus</option>
							<option value="Lite">Lite</option>

						</Form.Select>

            {/* Type of Subscription */}
            <h6>Activation period</h6>
            <Form.Select
              className="mb-3"
              aria-label="Default select example"
              name="activationPeriod"
              required
              onChange={(e) => handelChange(e)}
              value={activationPeriod}
            >
              <option> Activation period</option>
              <option value="4 hour">4 hour</option>
              <option value="6 hour">6 hour</option>
              <option value="8 hour">8 hour</option>
              <option value="10 hour">10 hour</option>
            </Form.Select>

            <h6>Rest period</h6>
            <Form.Select
              className="mb-3"
              aria-label="Default select example"
              name="restPeriod"
              required
              onChange={(e) => handelChange(e)}
              value={restPeriod}
            >
              <option>Rest period</option>
              <option value="10">10 min</option>
              <option value="20">20 min</option>
              <option value="30">30 min</option>
            </Form.Select>

            <h6>Rest Time</h6>
            <Form.Select
              className="mb-3"
              aria-label="Default select example"
              name="restPeriodTime"
              required
              onChange={(e) => handelChange(e)}
              value={restPeriodTime}
            >
              <option>Rest Time</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select>
            <h6>Under Evaluation</h6>
            <Form.Select
              className="mb-3"
              aria-label="Default select example"
              name="underEvaluation"
              required
              onChange={(e) => handelChange(e)}
              value={underEvaluation}
            >
              <option>Under Evaluation</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </Form.Select>

            <div className="d-flex align-items-center justify-content-center">
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
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default  UpdateWasher;
