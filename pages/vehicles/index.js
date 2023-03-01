import Button from '@/components/Button';
import UpdateUserPopUp from '@/components/Users/UpdateUserPopUp';
import { getAllVehicles } from '@/services/vehicles';
import React from 'react'
import { Table } from 'react-bootstrap'
import { useQuery } from 'react-query';

const Vehicles = () => {

	const { data, error, isLoading } = useQuery("getVehicles", getAllVehicles);
  
  console.log(error)

	return (
		<main className='vehicles'>
			<section>
				<h2>Show All Vehicles</h2>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#ID</th>
							<th>title</th>
							<th>Exterior Price</th>
							<th>Exterior And Interior Price</th>
							<th>image</th>
							<th>description</th>
							<th>Delete</th>
							<th>Update</th>
						</tr>
					</thead>
					<tbody> 
						{data?.length === 0 ? <tr className='fs-3 p-4'>NO DATA TO SHOW</tr> : null}
						{isLoading && <tr className='fs-3 p-4'>Loading</tr>}
					{data?.users?.map((user) => (

						<tr key={user._id}>
							<td>{user._id.slice(0, 8)}</td>
							<td>{user.fullName}</td>
							<td>{user.phoneNumber}</td>
							<td>{user.role}</td>
							<td>{user.status}</td>
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
		</main>
	)
}

export default Vehicles;