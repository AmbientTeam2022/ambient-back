module.exports = {
  apps: [
    {
      name: 'ambient-server',
      script: './src/server.js',
      watch: '.',
      env: {
        NODE_ENV: 'dev',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy':
  //       'yarn install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': '',
  //   },
  // },
}
