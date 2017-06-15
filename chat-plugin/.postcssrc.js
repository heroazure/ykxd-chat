// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {
      "browsers": [
        "> 0.1%",
        "not ie<100",
        "not ie_mob<100",
        "not edge<100",
        "not firefox<100",
        "not opera<100"
      ]
    }
  }
}
