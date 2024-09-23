import { atom } from "recoil";


export const FeaturedArtistsAtom = atom({
  key: 'FeaturedArtistsState',
  default: {
    data: [],
    totalRecords: "0",
    page: 0,
    size: 0
  }
})
