const config = {
  // glossbossBlue: '#1775fc',
  glossbossBlue: '#5200d5',
  glossbossBlueLighter: '#6d18f3',
  // glossbossBlueLighter: '#4f98ff',
  // glossbossBlueDarker: '#0f65e1',
  glossbossBlueDarker: '#4300ae',
  imgHoverFilter: 'sepia(30%) brightness(70%)',
  black: '#130027',
  lightGray: '#c3c3c3',
  lighterGray: 'rgba(0,0,0,.04)',
  lighterLightGray: '#f9f9fa',
  darkGray: '#878787',
  // linkColor: '#0088ff',
  linkColor: '#5200d5',
  // linkColor: '#1775fc',
  textColor: '#555',
  darkerGray: '#1C202f',
  lightBorder: '1px solid rgba(0, 0, 0, 0.09)',
  reloadPosts: 15,
  // heroGradient: 'rgba(80, 168, 219, .7)',
  heroGradient: 'rgba(32.2%, 0%, 83.5%, .7)',
  mobileMQ: '811px',
  borderBottom: '3px solid #dce6f4',
  cardBorder: '1px solid #dce6f4',
  categoryPages: require('./data/categories'),
  categories: [
    'Index',
    'Videos',
    'Podcast',
    'Allgemein',
    'Anleitungen',
    'Pflegeberichte',
    'Produkttest'
  ],
  activeBosse: require('./data/glossbosse'),
  navbarLinks: [
    { href: '/mischungsrechner', title: 'Mischungsrechner' },
    { href: '/glossbosse', title: 'Glossbosse' }
  ],
  siteUrl: 'https://glossboss.de/',
  addEmoji: require('./components/addEmoji')
}

module.exports = config
