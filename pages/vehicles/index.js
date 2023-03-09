/* eslint-disable @next/next/no-img-element */
import Button from '@/components/Button';
import UpdateUserPopUp from '@/components/Users/UpdateUserPopUp';
import AddVehicle from '@/components/Vehicles/AddVehicle';
import UpdateVehicle from '@/components/Vehicles/UpdateVehicle';
import { deleteVehicle, getAllVehicles } from '@/services/vehicles';
import React from 'react'
import { Table } from 'react-bootstrap'
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const Vehicles = () => {

	const { data, error, isLoading } = useQuery("getVehicles", getAllVehicles);
  

	const handleDelete = async(id)=> {
       
		try {
			await deleteVehicle(id);
			// const filterData = users?.filter((user) => user._id !== id);
			// setUsers(filterData);
			toast.success("Vehicle deleted successful")
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		}
	}

	return (
		<main className='vehicles'>
			<section>
				<div className='d-flex justify-content-between align-items-center m-3' >
					<h2>Show All Vehicles</h2>
					<AddVehicle />
				</div>

				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#ID</th>
							<th>title</th>
							<th>description</th>
							<th>Exterior Price</th>
							<th>Exterior And Interior Price</th>
							<th>Image</th>
							<th>Delete</th>
							<th>Update</th>
						</tr>
					</thead>
					<tbody>
						{data?.vehicle?.length === 0 ? <tr className='fs-3 p-4'>NO DATA TO SHOW</tr> : data?.vehicle?.map((user) => (

							<tr key={user._id}>
								<td>{user._id.slice(0, 8)}</td>
								<td>{user.description}</td>
								<td>{user.title}</td>
								<td>{user.exteriorPrice}</td>
								<td>{user.exteriorAndInteriorPrice}</td>
								<td><img src={user.image} alt="car" width={60} height={60} /></td>
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
									<UpdateVehicle id={user._id} vehicleData={user} />
								</td>
							</tr>
						))}
						{isLoading && <tr className='fs-3 p-4'>Loading</tr>}
						{/* {error !== null ? <tr className='fs-3 p-4'> Something went wrong </tr> : null} */}


					</tbody>
				</Table>
			</section>
		</main>
	)
}

export default Vehicles;