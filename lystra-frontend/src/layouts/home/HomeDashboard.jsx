import InfiniteScroll from "./InfiniteScroll";

const HomeDashboard = () => {
    return (
        <section id="scrollable-dashboard" className="flex flex-col md:flex-row md:flex-wrap w-full 2xl:w-[870px] gap-3 overflow-y-auto no-scrollbar flex-1">
            <InfiniteScroll />
        </section>
    );
};

export default HomeDashboard;