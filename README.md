# api-water

It uses pm2 for starting node app.

To Run App simply run thi scommand from root directory
---------------
nvm install --lts
pm2 restart ecosystem.config.js --env development

To stop app

pm2 stop id|name

To get list of all running app

pm2 list 

To start app go to scripts folder and type the following command
---------------
For development
---------------
sudo sh start-node-dev.sh 
For staging
---------------
sudo sh start-node-stg.sh 
For production
---------------
sudo sh start-node-prod.sh

Aws Path to all pm2 logs 
---------------
/home/ec2-user/.pm2/logs

List all apps using pm2
---------------
pm2 list

Stop node app using pm2
---------------
pm2 stop id|name

Restart node using pm2
---------------
pm2 restart appname|id

For pm2 related things Please refer the follwing link
---------------
http://pm2.keymetrics.io/docs/usage/environment/


stop app using command
---------------
pm2 stop <app_name>

Kill node app using following command
---------------
ps aux | grep node
kill -9 process_id


Node Version 
---------------
Now using node v8.11.3 (npm v5.6.0)

Swagger API Documentation
------------------

Swagger is used for Api documentation. Please Refer the docs below for detailed instruction

npm i swagger-ui-express -S

https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b


Connect Terminal to aws ec2 instance
------------------
ssh -i ~/.ssh/wecan.pem ec2-user@13.127.170.233
Note: Make Sure the Key file permission is 0644. Otherwise it won't work.

To List Out Postgress process in aws linux ec2 instance use following command
----------------------
ps aux | grep postgres

To Kill Postgress process from the above command get process id and kill using follwing commans
----------------------
sudo kill process_id

To Restart Postgres service in aws run the following command
----------------------
sudo service postgresql restart

Build Automation
----------------------
Run build-deploy-automation.sh with wecan.pem file in the same direcory you run to deploy git repo to aws 

