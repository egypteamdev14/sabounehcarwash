import React from 'react'
import { Table } from 'react-bootstrap'

const Vehicles = () => {
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

					</tbody>
				</Table>
			</section>
		</main>
	)
}

export default Vehicles