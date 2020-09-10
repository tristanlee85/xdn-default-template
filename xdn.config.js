module.exports = {
  routes: './src/routes.ts',
  backends: {
    origin: {
      domainOrIp: 'google.com',
      hostHeader: 'google.com',
    },
  },
}
