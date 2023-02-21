import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AUTH_TOKEN, fetchAllUsers } from '@/services/users'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const Users = () => {

	const { data: session, status } = useSession();

	console.log(session?.user.token.token)

	const [users, setUsers] = useState([])

	useEffect(() => {
		const users = async () => {
			const response = await axios({
				method: "get",
				url: `/api/users/dashboard`,
			})

			setUsers(response.data);
		}

		users()
	}, []);

	// console.log(users.users);

	return (
		<section className='users'>
			<h2>Show All Users </h2>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#ID</th>
						<th>Full Name</th>
						<th>Phone Number</th>
						<th style={{ width: "20%" }}>Role</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
				</thead>
				<tbody>

					{users?.users?.map((user) => (
						<>
							<tr>
								<td>{user._id.slice(0, 8)}</td>
								<td>{user.fullName}</td>
								<td>{user.phoneNumber}</td>
								<td >{user.role}</td>
								<td>
									<Button
										bg={"#05A8F5"}
										color={"#ffffff"}
										width={"130px"}
										height={"35px"}
										radius={"8px"}
										fontSize={"1rem"}
									>Delete</Button> </td>
								<td>
									<Button
										bg={"#05A8F5"}
										color={"#ffffff"}
										width={"130px"}
										height={"35px"}
										radius={"8px"}
										fontSize={"1rem"}
									>Update</Button> </td>
							</tr>
						</>
					))}




				</tbody>
			</Table>
		</section>
	)
}

export default Users