import Button from '@/components/Button'
import { getAllReviews } from '@/services/reviews'
import React from 'react'
import { Table } from 'react-bootstrap'
import { useQuery } from 'react-query'

const Reviews = () => {

	const { data, error, isLoading } = useQuery("getReviews", getAllReviews)

	return (
		<section className='reviews'>
			<h2>Show All Reviews </h2>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#ID</th>
						<th>Client Name</th>
						<th>service provider</th>
						<th>Rating Text</th>
						<th>Rating Star</th>
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
								{/* <UpdateUserPopUp id={user._id} /> */}
							</td>
						</tr>

					))}




				</tbody>
			</Table>
		</section>
	)
}

export default Reviews