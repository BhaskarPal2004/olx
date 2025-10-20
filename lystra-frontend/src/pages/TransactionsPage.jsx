import { useState, useEffect } from "react";
import AuthNavbar from "@/layouts/shared/AuthNavbar";
import TransactionControl from "@/layouts/transactions/TransactionControl";
import TransactionDate from "@/layouts/transactions/TransactionDate";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const TransactionsPage = () => {

  const { role } = useSelector(store => store.auth)
  const { sellerApi ,buyerApi} = useAxiosInstance();
  const today = new Date().toISOString().split('T')[0]; 
  const {startDate} = useSelector(store => store.transaction);
  const {endDate} = useSelector(store => store.transaction)
  const [transactions, setTransactions] = useState([]);
  const user = useSelector(store => store.auth.user);

  useEffect(() => {
    if (!user) return;
    const fetchTransactions = async () => {
      try {
        if(role === "seller"){
          const res = await sellerApi.get('/transaction', {
            params: {
              startDate: startDate || today,
              endDate: endDate || today,
            },
          });
    
          if (res.success) {
            toast.success("Fetched all transactions successfully", { id: "fetch-transactions-success" });
            setTransactions(res.data);
          }
        }
        else{
          const res = await buyerApi.get('/transaction', {
            params: {
              startDate: startDate || today,
              endDate: endDate || today,
            },
          });
    
        if (res.success) {
          toast.success("Fetched all transactions successfully", { id: "fetch-transactions-success" });
          setTransactions(res.data);
        }
        }
    
      } catch (error) {
        toast.error("Error fetching transactions: " + (error.response?.data?.message || error.message));
      }
    };
    

    fetchTransactions();
    //eslint-disable-next-line
  }, [startDate, endDate, sellerApi, buyerApi, role, today]);

  return (
    <div>
      <AuthNavbar />
      <div className="w-full flex flex-col md:flex-row justify-center gap-4 px-2 mt-5 4xl:mt-[80px]">
        <TransactionDate/>
        <TransactionControl transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionsPage;
