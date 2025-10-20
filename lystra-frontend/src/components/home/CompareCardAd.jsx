import { setCompareAd } from '@/store/slices/adSlice';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CompareCardAd = ({ data}) => {
  const { compareAd } = useSelector(store => store.ad)
  const dispatch = useDispatch();
  return (
    <div className="relative border rounded-sm px-2 py-3 font-archivo bg-white">
      <div className="flex gap-4 items-center">
        <img src={data.files[0].fileUrl} alt="ad" className="w-[90px] h-[90px] rounded-lg" />
        <p className="w-[50%]">{data.name}</p>
      </div>
      <button
        className="absolute top-2 right-2"
        onClick={() => dispatch(setCompareAd(compareAd.filter(item => item._id !== data._id)))}
      >
        <X color="#7E7E7E" width={13} height={13} />
      </button>
    </div>
  );
};

export default CompareCardAd;
