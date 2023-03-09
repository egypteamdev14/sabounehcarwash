import Button from '@/components/Button'
// import AddUserPopUp from '@/components/Users/Employee/UpdateEmployee'
import AddWasher from '@/components/Users/Washer/AddWasher'

import UpdateWasher from '@/components/Users/Washer/UpdateWasher'
import { deleteUser, getAllWasher } from '@/services/users'
// import { useSession } from 'next-auth/react'
import React, {  useState } from 'react'

import { useQuery } from 'react-query'
import AgGridDT from '@/components/AgGridDT'
import { MdOutlineDelete } from 'react-icons/md'

const ServiceProvider = () => {
  
  const [gridApi, setGridApi] = useState(null)
  // const { data: session, status } = useSession();


	const { data, error, isLoading } = useQuery("getUsers", getAllWasher);

	console.log(data?.washer)

	// columns definition
	const columnDefs = [

			{ headerName: "Full Name", field: "fullName", maxWidth: 150 },
			{ headerName: "Phone Number", field: "phoneNumber", maxWidth: 150},
			
			{ headerName: "Creation of account date", field: "createdAt" , maxWidth: 350},
			{ headerName: "Last login date", field: "lastLogin" },
			{ headerName: "Washer state", field: "sysStatus", maxWidth: 170 },
			{ headerName: "Order State", field: "orderStatus" },
			{ headerName: "Rating Average", field: "ratingAverage" },
			{ headerName: "Main Tools", field: "tools" },
			{
				headerName: "Actions",
				field: "id",
				minWidth: 200,
				sortable: false,
				filter: false,
				floatingFilter: false , cellRendererFramework: (params) => <div className='flex gap-4'>
					<UpdateWasher updateWasherData={params?.data} />
          <MdOutlineDelete style={{color: "#05A8F5", cursor: "pointer"}} fontSize={30} onClick={() => handleDelete(user._id)}/>
				</div>
			}
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
        backgroundColor: "#e0e0e0",
        color: "#001C29",
      };
    }
  }
  
	// delete user
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
			 rowData={data?.washer}
			 defaultColDef={defaultColDef}  
			 onGridReady={onGridReady}
			 getRowStyle={getRowStyle}
			/>
		</section>
	)
}

export default   ServiceProvider