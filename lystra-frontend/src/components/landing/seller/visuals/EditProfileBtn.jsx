import { Button } from "antd";


const EditProfileBtn = ({content}) => {
  return (
    <Button
      type="primary"
      className={`bg-[#ED640F] rounded-[7.6px] text-white hover:!bg-[#fd581c]  sm: mt-3 2xl:px-[41px] hover:!text-[#FFFFFF] font-archivo text-[12px] md:text-[10.64px] 4xl:mt-0 font-semibold 4xl:pl-[41.03px] 4xl:pr-[40.22px] 4xl:pt-[7.6px] 4xl:pb-[7.39px]`}>
      {content}
    </Button>
  )
}

export default EditProfileBtn