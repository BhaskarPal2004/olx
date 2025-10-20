import TransactionCard from '@/components/transaction/TransactionCard'
import { Play } from 'lucide-react';

const TransactionControl = ({ transactions }) => {

    return (
        <div className=' pt-4 md:p-4 border flex flex-col gap-2 bg-white rounded-lg md:w-[500px] xl:w-[770px]'>
            <div className='w-full flex justify-between mb-4'>
                <div className='ml-2 md:ml-0'>Transaction History</div>
                <button className='flex justify-center items-center gap-1'>
                    <div>Filter</div>
                    <div><Play strokeWidth={0} fill='#F65353' width={16} /></div>
                </button>
            </div >
            <section className=' max-h-[70vh] overflow-scroll no-scrollbar'>
                {
                    transactions.length === 0 ? (
                        <div className='text-center text-gray-400 py-10'>
                            No data found
                        </div>
                    ) :
                        (transactions.map((transaction, index) => (
                            <TransactionCard
                                key={index}
                                data={transaction}
                            />
                        )))}
            </section>
        </div>
    )
}

export default TransactionControl



