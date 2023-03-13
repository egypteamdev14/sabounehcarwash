import { deleteUser } from "@/services/users";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Button from "./Button";
const DeleteModal = ({ id }) => {
  const [show, setShow] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteUser(id);

      toast.success("User deleted successful");
      setShow(false);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <>
      <Button
        variant="primary"
        color={"red"}
        height={"35px"}
        radius={"8px"}
        fontSize={"2rem"}
        onClick={() => setShow(true)}
      >
        <MdDeleteOutline />
      </Button>
      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Agreement</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You want To Delete?</Modal.Body>
        <Modal.Footer>
          <Button
            bg={"#05A8F5"}
            color={"#fff"}
            height={"35px"}
            width={"80px"}
            radius={"4px"}
            fontSize={"1.5rem"}
            style={{ marginRight: "20px" }}
            onClick={() => setShow(false)}
          >
            No
          </Button>
          <Button
            bg={"#05A8F5"}
            color={"#fff"}
            height={"35px"}
            width={"80px"}
            radius={"4px"}
            fontSize={"1.5rem"}
            onClick={() => {
              handleDelete(id);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
