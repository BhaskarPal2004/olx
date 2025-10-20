const CallTo = ({ phone }) => {
  return (
    <a href={`tel:${phone}`} className="text-[#828282] text-sm font-archivo">
      {phone}
    </a>
  );
};

export default CallTo;
