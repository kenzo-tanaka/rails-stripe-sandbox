const { environment } = require('@rails/webpacker')

// ref: https://qiita.com/hidehiro98/items/26e401687efb4901777c
const webpack = require('webpack')
const dotenv = require('dotenv')

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  '.env.local',
  `.env.${process.env.NODE_ENV}`,
  '.env'
]
dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true })
})

environment.plugins.prepend('Environment',
  new webpack.EnvironmentPlugin(
    JSON.parse(JSON.stringify(process.env))
  )
)

environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery/src/jquery',
    jQuery: 'jquery/src/jquery'
  })
)

module.exports = environment
