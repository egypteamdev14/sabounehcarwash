import AgGridDT from '@/components/AgGridDT';
import Button from '@/components/Button';
import { getAllOrders } from '@/services/orders';

import React, { useState } from 'react'

import { useQuery } from 'react-query';


const Orders = () => {

	const [gridApi, setGridApi] = useState(null)
	// const { data: session, status } = useSession();


	const { data, error, isLoading } = useQuery("getOrders", getAllOrders);

	console.log(data?.orders)


	// columns definition
	const columnDefs = [

		{ headerName: "ID", field: "_id", maxWidth: 100 },
		{ headerName: "Created date", field: "createdAt", maxWidth: 150 },
		// { headerName: "Start Wash date", field: "phoneNumber", maxWidth: 150 },

		{ headerName: "Order State", field: "status", maxWidth: 300 },
		{ headerName: "Customer Name", field: "user.fullName" },
		{ headerName: "Washer Name", field: "sysProvider.fullName", maxWidth: 170 },
		{ headerName: "Service type ", field: "washType" },
		{ headerName: "Vehicle type ", field: "vehicleId.title" },
		{ headerName: "Payment Method ", field: "paymentMethod" },
		
	]


	const defaultColDef = {
		sortable: true,
		flex: 1,
		filter: true,
		floatingFilter: true
	}

	//  init 
	const onGridReady = (params) => {
		setGridApi(params)
	}

	// Export Excel 
	const onBtExport = () => {
		gridApi?.api.exportDataAsCsv();
	}

	// Row Style
	const getRowStyle = (params) => {
		if (params.data._id % 2) {
			return {
				backgroundColor: "#FFE7D9",
				color: "#7A0C2E",
			};
		} else {
			return {
				backgroundColor: "#DFDFDF",
				color: "#001C29",
			};
		}
	}

	// delete 
	// const handleDelete = async (id) => {
	// 	try {
	// 		await deleteUser(id);

	// 		const filterData = users?.filter((user) => user._id !== id);
	// 		// setUsers(filterData);
	// 		toast.success("User deleted successful")
	// 	} catch (error) {
	// 		console.log(error.message);
	// 		toast.error(error.message);
	// 	}
	// }

	return (
		<section className='orders'>
			
				<div className='d-flex justify-content-between align-items-center m-3' >

					<h2> Order list </h2>
					


				</div>

				<Button
					onClick={onBtExport}
					bg={"#05A8F5"}
					color={"#ffffff"}
					width={"130px"}
					height={"35px"}
					radius={"8px"}
					fontSize={"1rem"}
					cl={"mt-2 mb-3"}
				>
					Export to Excel
				</Button>



				<AgGridDT

					columnDefs={columnDefs}
					rowData={data?.orders}
					defaultColDef={defaultColDef}
					onGridReady={onGridReady}
					getRowStyle={getRowStyle}
				/>
		
		</section>
	)
}

export default Orders