import { setEndDate, setStartDate } from '@/store/slices/transactionSlice';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useDispatch } from 'react-redux';

const TransactionDate = () => {
  const dispatch = useDispatch();
  const today = new Date();

  const [state, setState] = useState([
    {
      startDate: today,
      endDate: today,
      key: 'selection'
    }
  ]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const [activeButton, setActiveButton] = useState('today'); 

  const handleDateChange = (item) => {
    setState([item.selection]);
    console.log("Selected Date Range (DateRange):", item.selection);
    setActiveButton('range');
  };


  const setToday = () => {
    const today = new Date();
    setState([
      {
        startDate: today,
        endDate: today,
        key: 'selection',
      }
    ]);
    setActiveButton('today');
  };

  const setLastMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    setState([
      {
        startDate: start,
        endDate: end,
        key: 'selection',
      }
    ]);
    setActiveButton('lastMonth');
  };

  const handleApply = () => {
    dispatch(setStartDate(formatDate(state[0].startDate)));
    dispatch(setEndDate(formatDate(state[0].endDate)));
  };

  const handleCancel = () => {
    const today = new Date();
    setState([
      {
        startDate: today,
        endDate: today,
        key: 'selection',
      }
    ]);
    setActiveButton('today');
  };

  const buttonClass = (name) =>
    ` p-2 lg:p-3 rounded-md text-center ${activeButton === name
      ? 'bg-[#ED640F] text-white'
      : 'bg-[#F1F1F1] text-[#818181] hover:bg-[#ED640F] hover:text-white'
    }`;

  return (
    <div className="max-w-[500px] h-fit md:w-[350px] bg-white rounded-lg p-3">
      <div className='p-3'>Date Filter</div>

      <div className="flex w-[300px] mx-auto justify-between items-center mt-5">
        <button className={buttonClass('range')} onClick={() => setActiveButton('range')}>
          Date range
        </button>
        <button className={buttonClass('lastMonth')} onClick={setLastMonth}>
          Last month
        </button>
        <button className={buttonClass('today')} onClick={setToday}>
          Today
        </button>
      </div>

      <div className='w-400px flex justify-center items-center mt-4'>

        <div className=''>
          <DateRange
            editableDateInputs={true}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={state}
            color="#ED640F"
          />
        </div>
      </div>

      <div className='flex gap-2 px-4 justify-center md:justify-end mt-4'>
        <button className='py-3 px-5 border rounded-md' onClick={handleCancel}>
          Cancel
        </button>
        <button
          className='py-3 px-5 border rounded-md bg-[#ED640F] text-white'
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default TransactionDate;
