/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Table } from 'react-bootstrap'

import { deleteSubscription, getAllSubscription } from "@/services/subscription"
import { useQuery } from 'react-query';
import Button from '@/components/Button';

import { toast } from 'react-toastify';
import AddNewSubscriptionPopUp from '@/components/Subscriptions/AddNewSubscriptionPopUp';
import UpdateNewSubscriptions from '@/components/Subscriptions/UpdateNewSubscriptions';

const Subscription = () => {

	const { data, error, isLoading } = useQuery("getSubscription", getAllSubscription);

	// console.log(data)

	const handleDelete = async (id) => {
		try {
			await deleteSubscription(id);

			const filterData = users?.filter((user) => user._id !== id);
			setUsers(filterData);
			toast.success("Subscription deleted successful")
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		}
	}

	return (
		<section className='users'>
			<div className='d-flex justify-content-between align-items-center m-3' >

				<h2>Show Subscriptions </h2>
				<AddNewSubscriptionPopUp />


			</div>

			<h3>One Time</h3>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#ID</th>
						<th >title</th>
						<th>Description</th>
						<th>image</th>
						<th >price</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
				</thead>
				<tbody>
					{isLoading && <tr className='fs-3 p-4'>Loading</tr>}
					{data?.oneTime.map((user) => (

						<tr key={user._id}>
							<td>{user._id.slice(0, 8)}</td>
							<td >{user.title}</td>
							<td>{user.description}</td>
							<td><img src={user.image} alt="subscription" width={50} height={50} /></td>
							<td >{user.price}</td>
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
								<UpdateNewSubscriptions id={user._id} />
							</td>
						</tr>

					))}




				</tbody>
			</Table>
			<h3>All subscriptions</h3>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#ID</th>
						<th>title</th>
						<th>Description</th>
						<th>image</th>
						<th >price</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
				</thead>
				<tbody>
					{isLoading && <tr className='fs-3 p-4'>Loading</tr>}
					{data?.subscriptions.map((user) => (

						<tr key={user._id}>
							<td>{user._id.slice(0, 8)}</td>
							<td >{user.title}</td>
							<td>{user.description}</td>
							<td><img src={user.image} alt="subscription" width={50} height={50} /></td>
							<td >{user.price}</td>
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
								<UpdateNewSubscriptions id={user._id} />
							</td>
						</tr>

					))}
				</tbody>
			</Table>
		</section>
	)
}

export default Subscription