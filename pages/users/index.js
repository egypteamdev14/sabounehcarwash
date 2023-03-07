import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AUTH_TOKEN, deleteUser, fetchAllUsers } from '@/services/users'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import AddUserPopUp from '@/components/Users/Employee/UpdateEmployee'
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'
import UpdateUserPopUp from '@/components/Users/UpdateUserPopUp'

const Users = () => {

	const { data: session, status } = useSession();

	const { data, error, isLoading } = useQuery("getUsers", fetchAllUsers);
	// console.log(data?.users)

	const handleDelete = async (id) => {
		try {
			await deleteUser(id);

			const filterData = users?.filter((user) => user._id !== id);
			setUsers(filterData);
			toast.success("User deleted successful")
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		}
	}


	// console.log(users.users);

	return (
		<section className='users'>
			<div className='d-flex justify-content-between align-items-center m-3' >

				<h2>Show All Users </h2>
				<AddUserPopUp />


			</div>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#ID</th>
						<th>Full Name</th>
						<th>Phone Number</th>
						<th style={{ width: "20%" }}>Role</th>
						<th >Status</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
				</thead>
				<tbody>
					{isLoading && <tr className='fs-3 p-4'>Loading</tr>}
					{data?.users.map((user) => (

						<tr key={user._id}>
							<td>{user._id.slice(0, 8)}</td>
							<td>{user.fullName}</td>
							<td>{user.phoneNumber}</td>
							<td >{user.role}</td>
							<td >{user.status}</td>
							<td>
								<Button
									bg={"#05A8F5"}
									color={"#ffffff"}
									width={"130px"}
									height={"35px"}
									radius={"8px"}
									fontSize={"1rem"}
									onClick={() => handleDelete(user._id)}
								>Delete</Button> </td>
							<td>
								<UpdateUserPopUp id={user._id} />
							</td>
						</tr>
					))}

				</tbody>
			</Table>
		</section>
	);
}

export default Users