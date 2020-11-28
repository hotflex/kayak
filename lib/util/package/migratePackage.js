// Takes a rotriever.toml package and converts it to a format Kayak understands

module.exports = (rotrieverPackage) => {
  const kayakPackage = {}

  kayakPackage.package = rotrieverPackage.package || {}
  kayakPackage.dependencies = rotrieverPackage.dependencies || {}

  rotrieverPackage.kayak = rotrieverPackage.kayak || {}

  // Set `package.type`
  if (typeof rotrieverPackage.kayak.type !== 'undefined' &&
    (rotrieverPackage.kayak.type === 'library' || rotrieverPackage.kayak.type === 'game')
  ) {
    kayakPackage.package.type = rotrieverPackage.kayak.type
  } else if (typeof rotrieverPackage.package.content_root !== 'undefined') {
    kayakPackage.package.type = 'library'
  } else {
    kayakPackage.package.type = 'game'
  }

  return kayakPackage
}
