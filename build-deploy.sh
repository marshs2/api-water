mv api-water api-water-old
tar xfvz api-water.tgz
cd api-water
nvm install --lts
npm install
pm2 update
pm2 stop api-water
pm2 start api-water
pm2 restart ecosystem.config.js --env production
cd ..
rm -rf api-water.tgz