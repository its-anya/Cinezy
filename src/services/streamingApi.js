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
    name: '2Embed Stream',
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
  }
];