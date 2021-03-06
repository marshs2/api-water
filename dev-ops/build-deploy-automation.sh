mkdir deploy
cd deploy
rm -rf api-water
git clone https://github.com/ways2startup/api-water.git
#git checkout develop
tar cfvz api-water.tgz --exclude='node_modules' --exclude='**/node_modules'--exclude='.git' --exclude='.gitignore' --exclude='.vscode' api-water
chmod 400 ../../wecan.pem
scp -i ../../wecan.pem api-water.tgz ec2-user@ec2-13-127-170-233.ap-south-1.compute.amazonaws.com:~
ssh -i ../../wecan.pem ec2-user@13.127.170.233 <<EOF
mv api-water api-water-old
tar xfvz api-water.tgz
cd api-water
. ~/.nvm/nvm.sh
nvm install --lts
npm install
pm2 update
pm2 stop api-water
pm2 start api-water
pm2 restart ecosystem.config.js --env production
cd ..
rm -rf api-water.tgz
EOF