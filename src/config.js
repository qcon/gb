const config = {
  glossbossBlue: '#0088ff',
  glossbossBlueLighter: '#34a0ff',
  glossbossBlueDarker: '#0168c3',
  imgHoverFilter: 'sepia(30%) brightness(70%)',
  black: '#000',
  lightGray: '#c3c3c3',
  lighterGray: 'rgba(0,0,0,.02)',
  lighterLightGray: '#f9f9fa',
  darkGray: '#878787',
  linkColor: '#0088ff',
  textColor: '#666',
  lightBorder: '1px solid rgba(0, 0, 0, 0.09)',
  reloadPosts: 15,
  heroGradient: 'rgba(80, 168, 219, .7)',
  mobileMQ: '773px',
  borderBottom: '3px solid #dce6f4',
  cardBorder: '1px solid #dce6f4',
  categoryPages: require('./data/categories'),
  categories: [
    'Index',
    'Allgemein',
    'Anleitungen',
    'Pflegeberichte',
    'Produkttest',
    'Videos'
  ],
  activeBosse: require('./data/glossbosse'),
  navbarLinks: [
    { href: '/mischungsrechner', title: 'Mischungsrechner' },
    { href: '/glossbosse', title: 'Glossbosse' },
    { href: '/impressum', title: 'Impressum' }
  ],
  siteUrl: 'https://glossboss.de/'
}

module.exports = config
