import { addCoupon } from "@/services/coupons";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const AddCoupon = () => {
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        expireDate: "",
        numberOfUse: 0,
        discount: 0,
    });

    const { title, expireDate, numberOfUse, discount } = formData;

    // console.log(updateUserInfo)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //  handel input changes
    const handelChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // console.log(formData)

    // handel Add User
    const handelAdd = async (e) => {
        e.preventDefault();

        try {
            await addCoupon(formData);
            toast.success("Coupon added successfully");
            setShow(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

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
                Add Coupon
            </Button>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Coupon</Modal.Title>
                </Modal.Header>
                <Modal.Body className="">
                    <Form onSubmit={handelAdd}>
                        {/* Full Name */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>coupon title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                name="title"
                                required
                                onChange={(e) => handelChange(e)}
                                value={title}
                            />
                            <Form.Text className="text-muted">
                                We will never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        {/* Mobile Number */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label> Expire Date </Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter Expire Date"
                                name="expireDate"
                                min="2023-01-01"
                                required
                                onChange={(e) => handelChange(e)}
                                value={expireDate}
                            />
                            <Form.Text className="text-muted">
                                we will never share your info
                            </Form.Text>
                        </Form.Group>

                        {/* Email */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Number Of Use</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Number Of Use"
                                name="numberOfUse"
                                required
                                onChange={(e) => handelChange(e)}
                                value={numberOfUse}
                            />
                            <Form.Text className="text-muted">
                                We will never share your Info.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Discount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter email"
                                name="discount"
                                required
                                onChange={(e) => handelChange(e)}
                                value={discount}
                            />
                            <Form.Text className="text-muted">
                                We will never share your Info.
                            </Form.Text>
                        </Form.Group>

                        <div className="d-flex align-items-center justify-content-center">
                            <Button
                                bg={"#006FA3"}
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
            </Modal>
        </>
    );
};

export default AddCoupon;
