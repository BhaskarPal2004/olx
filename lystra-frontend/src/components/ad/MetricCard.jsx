const MetricCard = ({ title, value, icon }) => {
  return (
    <>
      <div className="bg-[#F7F7F9] rounded-[10px] border border-none p-3 pe-[18px] pt-[18px] flex justify-between items-start s:max-w-[267px]">
        <div className="w-[80%]">
          <h3 className="text-[#868B94] m-0 p-2 pt-1">{title}</h3>
          <h2 className="text-[#0C0C0C] font-medium text-xl lg:text-2xl m-0 p-2 overflow-auto no-scrollbar">
            {value}
          </h2>
        </div>
        <img src={icon} alt="views" className="w-[38px]" />
      </div>
    </>
  );
};

export default MetricCard;
