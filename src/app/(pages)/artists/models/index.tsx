export interface IAritstRes {
  data: IArtistData[],
  totalRecords: string,
  page: number,
  size: number
}

export interface IArtistData {
  name: string
  slug: string
  bio: string
  spotify_id: string
  musix_match_id: string
  music_brainz_id: string
  gender: string
  country: string
  debut: string
  retirement: string
  type: string
  spotify_profile_url: string
  display_picture_url: string
  band_id: string
  created_at: string
  spotify_followers: string
  is_active: boolean
  status: string
  id: string
  totalrequests: string
  genres: Array<{
    id: number
    name: string
  }>
  clicks: number
  is_featured: boolean
}


export interface IGenreRes {
  data: IGenreData[],
  totalRecords: string,
  page: number,
  size: number
}

export interface IGenreData {
  id: string
  name: string
  is_active: boolean
  created_at: string
  status: string
  spotify_id: string
  slug: string
  totalrequests: string
}