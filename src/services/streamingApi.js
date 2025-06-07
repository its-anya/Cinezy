export const STREAMING_PROVIDERS = [
  {
    id: 'vidsrc',
    name: 'VidSrc',
    getMovieUrl: (id) => `https://vidsrc.cc/v2/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'server2',
    name: 'Server 1',
    getMovieUrl: (id) => `https://vidsrc.to/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'server3',
    name: 'Server 2',
    getMovieUrl: (id) => `https://2embed.org/embed/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://2embed.org/embed/${id}/${season}/${episode}`
  },
  {
    id: 'GodDrive',
    name: 'GodDrive',
    getMovieUrl: (id, imdbId) => `https://godriveplayer.com/player.php?imdb=${imdbId || id}`,
    getTvUrl: (id, season, episode, imdbId) => 
      `https://godriveplayer.com/player.php?imdb=${imdbId || id}&s=${season}&e=${episode}`
  },
  {
    id: 'vidsrcxyz',
    name: 'VidSrc.xyz',
    getMovieUrl: (id) => `https://vidsrc.xyz/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidsrc.xyz/embed/tv/${id}/${season}-${episode}`
  },
  {
    id: 'vidlink',
    name: 'VidLink',
    getMovieUrl: (id) => `https://vidlink.pro/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidlink.pro/tv/${id}/${season}/${episode}`
  },
  {
    id: '2embedstream',
    name: '2Embed',
    getMovieUrl: (id) => `https://www.2embed.stream/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://www.2embed.stream/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'multiembed',
    name: 'MultiEmbed',
    getMovieUrl: (id) => `https://multiembed.mov/directstream.php?video_id=${id}`,
    getTvUrl: (id, season, episode) => 
      `https://multiembed.mov/directstream.php?video_id=${id}&s=${season}&e=${episode}`
  },
  // MovieDex Providers
  {
    id: 'vidzee',
    name: 'Vidzee',
    getMovieUrl: (id) => `https://vidzee.streamapp.site/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidzee.streamapp.site/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'autoembed',
    name: 'AutoEmbed',
    getMovieUrl: (id) => `https://autoembed.co/movie/tmdb/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`
  },
  {
    id: 'xprime',
    name: 'XPrime',
    getMovieUrl: (id) => `https://xprime.app/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://xprime.app/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'vidsrcsu',
    name: 'VidSrc.su',
    getMovieUrl: (id) => `https://vidsrc.su/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidsrc.su/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'embedsu',
    name: 'Embed.su',
    getMovieUrl: (id) => `https://embed.su/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://embed.su/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'vidsrcvip',
    name: 'VidSrc.vip',
    getMovieUrl: (id) => `https://vidsrc.vip/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidsrc.vip/embed/tv/${id}/${season}/${episode}`
  },
  // Anime Provider
  {
    id: 'hianime',
    name: 'HiAnime',
    getMovieUrl: (id) => `https://hianime.pstream.org/player/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://hianime.pstream.org/player/${id}/${episode}`
  },
  // Additional providers from cinextma-master
  {
    id: 'filmku',
    name: 'FilmKu',
    getMovieUrl: (id) => `https://filmku.stream/embed/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://filmku.stream/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`
  },
  {
    id: 'nontongo',
    name: 'NontonGo',
    getMovieUrl: (id) => `https://www.nontongo.win/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://www.NontonGo.win/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: '2embedcc',
    name: '2Embed.cc',
    getMovieUrl: (id) => `https://www.2embed.cc/embed/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`
  },
  {
    id: 'moviesapi',
    name: 'MoviesAPI',
    getMovieUrl: (id) => `https://moviesapi.club/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://moviesapi.club/tv/${id}/${season}/${episode}`
  },
  // Providers specifically mentioned by user
  {
    id: 'vidsrc2',
    name: 'VidSrc 2',
    getMovieUrl: (id) => `https://vidsrc.to/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'embedsu2',
    name: '<Embed>',
    getMovieUrl: (id) => `https://embed.su/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://embed.su/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'superembed',
    name: 'SuperEmbed',
    getMovieUrl: (id) => `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
    getTvUrl: (id, season, episode) => 
      `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
  },
  // Providers from watchlo-main
  {
    id: 'vidsrccv3',
    name: 'Vidsrc CC v3',
    getMovieUrl: (id) => `https://vidsrc.cc/v3/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidsrc.cc/v3/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'smashystream',
    name: 'Smashy Stream',
    getMovieUrl: (id) => `https://player.smashy.stream/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://player.smashy.stream/tv/${id}/${season}/${episode}`
  },
  {
    id: 'autoembecc',
    name: 'AutoEmbe',
    getMovieUrl: (id) => `https://player.autoembed.cc/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'vidbinge',
    name: 'Vidbinge 4K',
    getMovieUrl: (id) => `https://vidbinge.dev/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidbinge.dev/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'vidsrcicu',
    name: 'Backup Stream',
    getMovieUrl: (id) => `https://vidsrc.icu/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: 'vidsrcpro',
    name: 'Main Stream',
    getMovieUrl: (id) => `https://vidsrc.pro/embed/movie/${id}`,
    getTvUrl: (id, season, episode) => 
      `https://vidsrc.pro/embed/tv/${id}/${season}/${episode}`
  }
];