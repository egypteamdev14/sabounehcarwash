import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import { FiUsers } from 'react-icons/fi';

function DropDown() {
  return (
    <Dropdown className='drop'>
      <Dropdown.Toggle className='drop-down' style={{backgroundColor: "transparent", border: "none", display: "flex", alignItems: "center" ,gap: "22px"}}  id="dropdown-basic">
			<FiUsers className='icon' />  Users
      </Dropdown.Toggle>

      <Dropdown.Menu style={{backgroundColor: "transparent"}}>
        <Dropdown.Item >
					<Link href={"/users/employee"}>Employee</Link>
				</Dropdown.Item>
        <Dropdown.Item >
				<Link href={"/users/serviceprovider"}>Service provider </Link>

				</Dropdown.Item>
        <Dropdown.Item >
				<Link href={"/users/customers"}>Customers</Link>

				</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;