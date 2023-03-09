import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import { FiUsers } from 'react-icons/fi';

function DropDown() {
  return (
    <Dropdown className='drop'>
     <div className='flex align-items-center'>
     <FiUsers className='icon' /> 
      <Dropdown.Toggle className='drop-down' style={{backgroundColor: "#CDEEFE", border: "none", display: "flex", alignItems: "center" ,gap: "22px",color:"#006FA3",fontSize:"21px"}}  id="dropdown-basic">
			 Users
      </Dropdown.Toggle>
     </div>

      <Dropdown.Menu style={{backgroundColor: "transparent"}}>
        <Dropdown.Item  className='py-3'>
					<Link href={"/users/employee"}>Employee</Link>
				</Dropdown.Item >
        <Dropdown.Item className='py-3'>
				<Link href={"/users/serviceprovider"}>Service provider </Link>

				</Dropdown.Item>
        <Dropdown.Item  className='py-3'>
				<Link href={"/users/customers"}>Customers</Link>

				</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;