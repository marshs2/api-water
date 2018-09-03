tar cfvz api-water.tgz --exclude='node_modules' --exclude='**/node_modules'--exclude='.git' --exclude='.gitignore' ../api-water
chmod 400 ../../wecan.pem
scp -i ../../wecan.pem ../api-water.tgz ec2-user@ec2-13-127-170-233.ap-south-1.compute.amazonaws.com:~
scp -i ../../wecan.pem build-deploy.sh ec2-user@ec2-13-127-170-233.ap-south-1.compute.amazonaws.com:~
chmod 0644 ../../wecan.pem
ssh -i ~/.ssh/wecan.pem ec2-user@13.127.170.233