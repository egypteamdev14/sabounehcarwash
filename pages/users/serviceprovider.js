import Button from '@/components/Button'
import AddUserPopUp from '@/components/Users/AddUserPopUp'
import AddWasher from '@/components/Users/AddWasher'
import UpdateUserPopUp from '@/components/Users/UpdateUserPopUp'
import UpdateWasher from '@/components/Users/UpdateWasher'
import { deleteUser, fetchAllUsers } from '@/services/users'
import { useSession } from 'next-auth/react'
import React from 'react'
import {  Table } from 'react-bootstrap'
import { useQuery } from 'react-query'

const ServiceProvider = () => {


	const { data: session, status } = useSession();


	const { data, error, isLoading } = useQuery("getUsers", fetchAllUsers);

	const serviceProvider = data?.users.filter((user) => user.role === 'serviceProvider');

	console.log(serviceProvider)

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

	return (
		<section className='service-provider'>
			<div className='d-flex justify-content-between align-items-center m-3' >

				<h2>Washer List </h2>
				<AddWasher />


			</div>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#ID</th>
						<th>Full Name</th>
						<th>Phone Number</th>
						<th style={{ width: "20%" }}>Creation of account date</th>
						<th >last login date</th>
						<th >employee state</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
				</thead>
				<tbody>
					{isLoading && <tr className='fs-3 p-4'>Loading</tr>}
					{serviceProvider?.map((user) => (

						<tr key={user._id}>
							<td>{user._id.slice(0, 8)}</td>
							<td>{user.fullName}</td>
							<td>{user.phoneNumber}</td>
							<td >{user.createdAt}</td>
							<td >{user.lastLogin}</td>
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
								<UpdateWasher id={user._id} />
							</td>
						</tr>
					))}

				</tbody>
			</Table>
		</section>
	)
}

export default ServiceProvider