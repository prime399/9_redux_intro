import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store)=>store.customer.fullName)
  console.log(customer)
  return <h2 className="pt-5">👋 Welcome, <span className="font-bold">{customer}</span></h2>;
}

export default Customer;
