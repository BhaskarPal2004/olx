import { Grid } from "antd"
import DashboardHeaderDropdown from "./DashboardHeaderDropdown"
import SortBy from "./SortBy"


const DashboardHeader = () => {
    const screen = Grid.useBreakpoint()
    return (
        <div className="flex py-2 font-archivo justify-center md:justify-between 2xl:justify-end items-center md:w-full 2xl:w-[1170px] md:px-1 2xl:px-0">
            <button className="2xl:hidden"><DashboardHeaderDropdown /></button>
            {screen.md && <SortBy />}
        </div>
    )
}

export default DashboardHeader