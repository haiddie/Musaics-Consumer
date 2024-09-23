export interface IArtist {
  name: string,
  image: string,
  ranking?: string
}

export interface IArtistNews {
  title: string,
  url: string,
  imageUrl: string,
  author: string,
  created_at: string
}

export const TrendingArtistsData: IArtist[] = [
  {
    name: 'Taylor Swift',
    image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2023-07/230713-taylor-swift-jm-1600-daea0b.jpg',
    ranking: '1'
  },
  {
    name: 'Bad Bunny',
    image: 'https://www.the-sun.com/wp-content/uploads/sites/6/2022/01/SC-Bad-Bunny-Off-Plat-copy.jpg',
    ranking: '2'
  },
  {
    name: 'The Weeknd',
    image: 'https://people.com/thmb/cJ7MOUDYTv4ryDxvOBF_9RG5Wrk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/weeknd-atlanta-081222-7bb5d7f5413045a6acf48053a473834c.jpg',
    ranking: '3'
  },
  {
    name: 'Drake',
    image: 'https://img.buzzfeed.com/buzzfeed-static/complex/images/ffqvfwmcrytkyehblx0e/drake.jpg?output-format=jpg&output-quality=auto',
    ranking: '4'
  },
  {
    name: 'Peso Pluma',
    image: 'https://cdn.abcotvs.com/dip/images/13783565_peso-pluma-clean-AP-TN-img.jpg',
    ranking: '5'
  },
  {
    name: 'Feid',
    image: 'https://variety.com/wp-content/uploads/2023/04/CRIS1329.jpg?w=1000',
    ranking: '6'
  },
  {
    name: 'Travis Scott',
    image: 'https://www.usatoday.com/gcdn/presto/2021/11/08/USAT/0b15350f-ac49-4462-94c7-9fa82c26f5aa-GTY_1351663203.jpg',
    ranking: '7'
  },
  {
    name: 'SZA',
    image: 'https://wallpapercosmos.com/w/full/1/3/1/53888-1765x2560-samsung-hd-sza-wallpaper.jpg',
    ranking: '8'
  },
  {
    name: 'KAROL G',
    image: 'https://www.billboard.com/wp-content/uploads/2020/03/22-2019-Karol-G-style-evolution-billboard-1548-1583177489.jpg',
    ranking: '9'
  },
  {
    name: 'Lana Del Rey',
    image: 'https://w0.peakpx.com/wallpaper/78/589/HD-wallpaper-lana-del-rey-concert-good-vibes-queen-real-style.jpg',
    ranking: '10'
  }
]

export const FeaturedArtistsData: IArtist[] = [
  {
    name: 'Snoop Dogg',
    image: 'https://media.gq.com/photos/636c0ca0c372df153358d438/16:9/w_2560%2Cc_limit/1370931545',
    ranking: '1'
  },
  {
    name: 'Eminem',
    image: 'https://www.freep.com/gcdn/presto/2022/02/14/PDTF/0b6e31c1-7e64-4ac6-8ddf-edb6b26df79c-GTY_1370401359.jpg?width=660&height=937&fit=crop&format=pjpg&auto=webp',
    ranking: '2'
  },
  {
    name: 'The Weeknd',
    image: 'https://people.com/thmb/cJ7MOUDYTv4ryDxvOBF_9RG5Wrk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/weeknd-atlanta-081222-7bb5d7f5413045a6acf48053a473834c.jpg',
    ranking: '3'
  },
  {
    name: 'Kanye West',
    image: 'https://ktla.com/wp-content/uploads/sites/4/2019/11/s116933773.jpg',
    ranking: '4'
  },
  {
    name: 'Drake',
    image: 'https://img.buzzfeed.com/buzzfeed-static/complex/images/ffqvfwmcrytkyehblx0e/drake.jpg?output-format=jpg&output-quality=auto',
    ranking: '5'
  },
  {
    name: 'Kendrick Lamar',
    image: 'https://imageio.forbes.com/specials-images/dam/imageserve/902768162/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds',
    ranking: '6'
  },
  {
    name: 'Taylor Swift',
    image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2023-07/230713-taylor-swift-jm-1600-daea0b.jpg',
    ranking: '7'
  },
  {
    name: 'Bad Bunny',
    image: 'https://www.the-sun.com/wp-content/uploads/sites/6/2022/01/SC-Bad-Bunny-Off-Plat-copy.jpg',
    ranking: '8'
  },
  {
    name: 'Travis Scott',
    image: 'https://www.usatoday.com/gcdn/presto/2021/11/08/USAT/0b15350f-ac49-4462-94c7-9fa82c26f5aa-GTY_1351663203.jpg',
    ranking: '9'
  },
  {
    name: 'Lana Del Rey',
    image: 'https://w0.peakpx.com/wallpaper/78/589/HD-wallpaper-lana-del-rey-concert-good-vibes-queen-real-style.jpg',
    ranking: '10'
  }
]

export const AristsNewsData: IArtistNews[] = [
  {
    title: 'Michael Jackson’s First-Ever Studio Recording to Get Limited Digital Release: Exclusive',
    url: 'https://www.billboard.com/music/music-news/taylor-swift-hayley-williams-tim-mcgraw-praise-most-intriguing-star-1235535133/',
    imageUrl: 'https://www.billboard.com/wp-content/uploads/2023/12/michael-jackson-1971-billboard-1548.jpg?w=942&h=623&crop=1',
    author: 'Katie Bain',
    created_at: '4hrs ago'
  },
  {
    title: 'Taylor Swift Praised by Hayley Williams, Tim McGraw & More Stars: ‘She’s Just Getting Started’',
    url: 'https://www.billboard.com/music/music-news/taylor-swift-hayley-williams-tim-mcgraw-praise-most-intriguing-star-1235535133/',
    imageUrl: 'https://www.billboard.com/wp-content/uploads/2023/11/Taylor-Swift-_-The-Eras-Tour-Sao-Paulo-Brazil-07-billboard-1548.jpg?w=942&h=623&crop=1',
    author: 'Hannah Dailey',
    created_at: '13hrs ago'
  },
  {
    title: 'Adele to Receive Sherry Lansing Leadership Award at The Hollywood Reporter’s 2023 Women in Entertainment Breakfast Gala',
    url: 'https://www.billboard.com/music/awards/adele-leadership-award-hollywood-reporter-2023-women-in-entertainment-gala-1235463411/',
    imageUrl: 'https://www.billboard.com/wp-content/uploads/2021/11/03-adele-press-2021-cr-simon-emmett-billboard-1548.jpg?w=942&h=623&crop=1',
    author: 'Paul Grein',
    created_at: '10hrs ago'
  },
  {
    title: 'Selena Gomez Jokingly Enlists Brooklyn Beckham’s Help to Leave an Event',
    url: 'https://www.billboard.com/music/music-news/taylor-swift-hayley-williams-tim-mcgraw-praise-most-intriguing-star-1235535133/',
    imageUrl: 'https://www.billboard.com/wp-content/uploads/2023/12/selena-gomez-nicola-peltz-brooklyn-beckham-2023-billboard-1548.jpg?w=942&h=623&crop=1',
    author: 'Rania Aniftos',
    created_at: '7hrs ago'
  },
  {
    title: 'The Weeknd to Headline New Fortnite Music Experience ‘The Weeknd x Fortnite Festival’: Watch Trailer',
    url: 'https://www.billboard.com/music/music-news/taylor-swift-hayley-williams-tim-mcgraw-praise-most-intriguing-star-1235535133/',
    imageUrl: 'https://www.billboard.com/wp-content/uploads/2023/12/The-Weeknd-x-Fortnite-Festival-Trailer-billboard-1548.jpg?w=942&h=623&crop=1',
    author: 'Gil Kaufman',
    created_at: '18hrs ago'
  }
]