
import { getAllReviews } from '@/services/reviews'
import React from 'react'
import { Table } from 'react-bootstrap'
import { MdEdit, MdOutlineDelete } from 'react-icons/md'
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
						<th>Reviewed By</th>
						<th>Reviewed For</th>
						<th>Rating Text</th>
						<th>Rating Star</th>
						<th>Created At</th>
						<th>Updated At</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
				</thead>
				<tbody>
					{isLoading && <tr className='fs-3 p-4'>Loading</tr>}
					{data?.length === 0 ? <h4>No Data To Show</h4> : data?.map((user) => (

						<tr key={user._id}>
							<td>{user._id.slice(0, 8)}</td>
							<td>{user.reviewed_by}</td>
							<td>{user.reviewed_for}</td>
							<td >{user.text}</td>
							<td >{user.rating}</td>
							<td >{user.createdAt.split("T")[0] } </td>
							<td >{user.updatedAt.split("T")[0]}</td>
							<td>
								<MdOutlineDelete style={{color: "#05A8F5", cursor: "pointer"}} fontSize={30} onClick={() => handleDelete(user._id)}/> 
							</td>
							<td>

							  <MdEdit style={{color: "#05A8F5", cursor: "pointer"}} fontSize={30}/>
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