module.exports = {
  apps : [{
    name: 'admin ',
    script: 'serve',
    env: {
      PM2_SERVE_PATH: 'dist',
      PM2_SERVE_PORT: 80,
      PM2_SERVE_HOMEPAGE: '/index.html',
      PM2_SERVE_SPA: 'true'
    }
  }]
};
