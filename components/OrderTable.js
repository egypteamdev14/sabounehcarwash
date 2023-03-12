import Table from "react-bootstrap/Table";

function StripedRowExample({ data }) {
    console.log(data);
    return (
        <Table className="mt-5" striped style={{ width: "65%" }}>
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Created Date</th>
                    <th>Payment Method</th>
                    <th>Order State</th>
                </tr>
            </thead>
            <tbody>
                {data?.slice(0, 8)?.map((item) => {
                    return (
                        <tr key={item.orderId}>
                            <td>{item.orderId}</td>
                            <td>
                                {item.createdAt.split("T")[0]}{" "}
                                {item.createdAt.split("T")[1].split(".")[0]}
                            </td>
                            <td>{item.paymentMethod}</td>
                            <td
                                className={`${
                                    item.status === "completed"
                                        ? "text-success"
                                        : "text-danger"
                                }`}
                            >
                                {item.status}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default StripedRowExample;
