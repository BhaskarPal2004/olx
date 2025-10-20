import { createSlice } from "@reduxjs/toolkit";

const adSlice = createSlice({
  name: "ad",
  initialState: {
    loading: false,
    singleAdId: null,
    singleAd: {},
    categories: [],
    pageNum: 1,
    sortBy: "createdAt",
    sortOrder: "asc",
    searchKeyword: "",
    searchCategory: [],
    priceRange: {
      minPrice: 0,
      maxPrice: Infinity
    },
    city: "",
    favoriteAd: [],
    condition: "",
    compareAd: []
  },

  reducers: {
    setLoading: (state, action) => { state.loading = action.payload },
    setSingleAdId: (state, action) => { state.singleAdId = action.payload },
    setSingleAd: (state, action) => { state.singleAd = action.payload },
    setCategories: (state, actions) => { state.categories = actions.payload },
    incrementPageNum: (state) => { state.pageNum += 1 },
    resetPageNum: (state) => { state.pageNum = 1 },
    setSortBy: (state, action) => { state.sortBy = action.payload },
    setAscending: (state) => { state.sortOrder = "asc" },
    setDescending: (state) => { state.sortOrder = "dsc" },
    setSearchKeyword: (state, action) => { state.searchKeyword = action.payload },
    setSearchCategory: (state, action) => { state.searchCategory = action.payload },
    setPriceRange: (state, action) => {
      const { minPrice, maxPrice } = action.payload;
      state.priceRange = { minPrice, maxPrice };
    },
    resetPriceRange: (state) => { state.priceRange = { minPrice: 0, maxPrice: Infinity } },
    setCity: (state, action) => { state.city = action.payload },
    resetCity: (state) => { state.city = '' },
    setFavoriteAd: (state, action) => { state.favoriteAd = action.payload },
    removeFavoriteAd: (state, action) => {
      const adIdToRemove = action.payload;
      state.favoriteAd = state.favoriteAd.filter(ad => ad._id !== adIdToRemove);
    },
    setCondition: (state, action) => { state.condition = action.payload },
    setCompareAd: (state, action) => { state.compareAd = action.payload }
  },
});

export const {
  setLoading,
  setSingleAdId,
  setSingleAd,
  setCategories,
  incrementPageNum,
  resetPageNum,
  setSortBy,
  setAscending,
  setDescending,
  setSearchKeyword,
  setSearchCategory,
  setPriceRange,
  resetPriceRange,
  setCity,
  resetCity,
  setFavoriteAd,
  removeFavoriteAd,
  setCondition,
  setCompareAd
} = adSlice.actions;
export default adSlice.reducer;