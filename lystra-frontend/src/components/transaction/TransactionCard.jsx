import { ArrowUpRight,ArrowDownLeft } from 'lucide-react';
import { useSelector } from 'react-redux';

const TransactionCard = ({data}) => {
  
  const { role } = useSelector(store => store.auth)
  return (
    <div className='border w-[400px] md:w-full mx-auto rounded-lg pt-4 flex justify-between mt-2'>
      <div className='flex gap-2 py-2 md:p-2'>
        {role === "buyer" || (role === "seller" && data.isBoosted ===true) ?(<ArrowUpRight color='#E93235' strokeWidth={1.83} />):(<ArrowDownLeft color='green' strokeWidth={1.83} />)}
        <div>
          <div>{data.paymentId}</div>

          <div className='flex  w-[250px] 2xl:w-[300px] gap-3 mt-2'>
            <p className='text-[#9B9B9B]'>{data.Date}</p>
            <p className='text-[#9B9B9B] '>{data.Time}</p>
            {data.Status === "paid" ? (role === "buyer" || data.isBoosted === true ? <p className='text-green-900'>{data.Status}</p> : <p className='text-green-900'>received</p>):(<p className='text-red-900 '>{data.Status}</p>)}
          </div>
        </div>

      </div>
      {(data.isBoosted === true || role === "buyer")?(<span className='text-nowrap text-red-600 items-end mr-3'>- ₹{data.Amount}.00</span>):
        <span className='text-nowrap text-green-600 items-end mr-3'>+ ₹{data.Amount}.00</span>}
    </div>
  )
}

export default TransactionCard
