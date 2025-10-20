import { setSearchKeyword } from "@/store/slices/adSlice";
import { Grid } from "antd";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";


const SearchBar = () => {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const screens = Grid.useBreakpoint();
    const [width, setWidth] = useState(screens.md ? 'w-full' : 'w-0');

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setWidth(screens.md ? 'w-full' : 'w-0');
    }, [screens.md]);

    const handleSearchBar = () => {
        setWidth('w-full');
    };

    const handleDefaultInput = () => {
        setWidth(screens.md ? 'w-full' : 'w-0');
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            dispatch(setSearchKeyword(inputValue.trim()));
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [inputValue, dispatch]);

    return (
        <div
            className="bg-[#F7F7F7] rounded-[7px] flex justify-center items-center p-2 border border-[#E6E6E6]"
            onClick={handleSearchBar}
            onBlur={handleDefaultInput}
        >
            <div className="relative flex md:flex-row-reverse gap-3 justify-end">
                <input
                    ref={inputRef}
                    type="text"
                    className={`bg-transparent text-sm py-1 focus:outline-none transition-all duration-300 ease-in-out ${width} placeholder:text-[#6C6C6C] lg:w-[300px] xl:w-[400px] 2xl:w-[500px] 4xl:w-[640px]`}
                    placeholder="Find your products"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">
                    <Search />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;