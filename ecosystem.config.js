module.exports = {
  apps: [
    {
      name: 'api-water',
      script: './index.js',
      watch: true,
      env_development: {
        'PORT': 3000,
        'NODE_ENV': 'development',
        'NODE_HOST': 'ec2-13-127-170-233.ap-south-1.compute.amazonaws.com',
        'PGHOST': 'ec2-13-127-170-233.ap-south-1.compute.amazonaws.com',
        'PGPASSWORD': 'poweruserpassword',
        'PGDATABASE': 'water_db',
        'PGPORT': '5432',
        'PGUSER': 'power_user'
      },
      env_production: {
        'PORT': 3000,
        'NODE_ENV': 'production',
        'NODE_HOST': 'ec2-13-127-170-233.ap-south-1.compute.amazonaws.com',
        'PGHOST': 'ec2-13-127-170-233.ap-south-1.compute.amazonaws.com',
        'PGPASSWORD': 'poweruserpassword',
        'PGDATABASE': 'water_db',
        'PGPORT': '5432',
        'PGUSER': 'power_user'
      },
      env_staging: {
        'PORT': 3000,
        'NODE_ENV': 'production',
        'NODE_HOST': 'ec2-13-127-170-233.ap-south-1.compute.amazonaws.com',
        'PGHOST': 'ec2-13-127-170-233.ap-south-1.compute.amazonaws.com',
        'PGPASSWORD': 'poweruserpassword',
        'PGDATABASE': 'water_db',
        'PGPORT': '5432',
        'PGUSER': 'power_user'
      }

    }
  ]
}
