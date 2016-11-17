module.exports = {
  '/api_': {
    target: 'https://sale.gotosiam.com',
    changeOrigin: true
  },
  '/web_socket': {
    target: 'ws://47.88.137.77:9012',
    ws: true,
    changeOrigin: true
  }
}
