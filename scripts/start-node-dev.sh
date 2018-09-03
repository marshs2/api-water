mv api-water api-water_old
tar xfvz api-water.tgz
cd api-water
nvm install --lts
pm2 update
npm install 
pm2 restart ecosystem.config.js --env development