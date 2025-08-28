module.exports = {
  apps: [
    {
      name: 'sprb-backend',
      script: 'backend/app.py',
      interpreter: 'python3',
      cwd: './',
      instances: 4,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        ENVIRONMENT: 'production',
        DEBUG: 'false',
        LOG_LEVEL: 'WARNING',
        HOST: '0.0.0.0',
        PORT: 8000,
        RELOAD: 'false',
        WORKERS: 4
      },
      env_development: {
        NODE_ENV: 'development',
        ENVIRONMENT: 'development',
        DEBUG: 'true',
        LOG_LEVEL: 'DEBUG',
        HOST: '127.0.0.1',
        PORT: 8000,
        RELOAD: 'true',
        WORKERS: 1
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true,
      max_memory_restart: '500M',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'uploads', 'data']
    },
    {
      name: 'sprb-frontend',
      script: 'npm',
      args: 'run preview:production',
      cwd: './frontend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      error_file: '../logs/frontend-error.log',
      out_file: '../logs/frontend-out.log',
      log_file: '../logs/frontend-combined.log',
      time: true,
      max_memory_restart: '300M',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false,
      ignore_watch: ['node_modules', 'dist', 'logs']
    }
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'your-git-repo-url',
      path: '/var/www/sprb-web',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build:production && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
