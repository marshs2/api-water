nvm install --lts
#npm install
PGUSER=power_user PGHOST=ec2-13-127-170-233.ap-south-1.compute.amazonaws.com PGPASSWORD=poweruserpassword PGDATABASE=postgres PGPORT=5432 NODE_ENV=development NODE_HOST=ec2-13-127-170-233.ap-south-1.compute.amazonaws.com pm2 start index.js