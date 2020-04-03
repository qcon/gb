const addEmoji = cat => {
  switch (cat) {
    case 'Podcast':
      return 'Podcast 🎙'
    case 'Videos':
      return 'Videos 📹'
    case 'Anleitungen':
      return 'Anleitungen 👨🏻‍🏫'
    case 'Produkttest':
      return 'Produkttest 👨🏻‍🔬'
    case 'Pflegeberichte':
      return 'Pflegeberichte 🚗'
    case 'Allgemein':
      return 'Allgemein 🤷🏻‍♂️'
    default:
      return cat
  }
}
module.exports = addEmoji
