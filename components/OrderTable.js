import Table from "react-bootstrap/Table";
function StripedRowExample({ data }) {

  console.log(data);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Created Date</th>
          <th>Payment Method</th>
          <th>Order State</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => {
          return (
            <tr>
              <td>{item.orderId}</td>
              <td>{item.createdAt}</td>
              <td>{item.paymentMethod}</td>
              <td>{item.status}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default StripedRowExample;
