module.exports = {
  apps : [{
    name: 'admin ',
    script: 'serve',
    env: {
      PM2_SERVE_PATH: 'dist',
      PM2_SERVE_PORT: 8887,
      PM2_SERVE_HOMEPAGE: '/index.html',
      PM2_SERVE_SPA: 'true'
    }
  }]
};
