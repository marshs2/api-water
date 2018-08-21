# api-water
It uses pm2 for node app start,watch and other feautures

To start app use following command
---------------

Development

nvm install --lts
pm2 start ecosystem.config.js

Production

nvm install --lts
pm2 start ecosystem.config.js --env production.



Path to all pm2 logs 
---------------
/home/ec2-user/.pm2/logs

List all apps using pm2
---------------
pm2 list

Stop node using pm2 command
---------------

pm2 stop app_name|id

Restart node using pm2
---------------

pm2 restart appname|id

Refer any pm2 related app running information
---------------
http://pm2.keymetrics.io/docs/usage/environment/

Start app using command

pm2 start processes.json

stop app using command

pm2 stop <app_name>

PGUSER=power_user PGHOST=ec2-13-127-170-233.ap-south-1.compute.amazonaws.com PGPASSWORD=poweruserpassword PGDATABASE=postgres PGPORT=5432 NODE_ENV=development NODE_HOST=ec2-13-127-170-233.ap-south-1.compute.amazonaws.com pm2 start index.js

Use Forever to start node app
---------------

PGUSER=power_user PGHOST=ec2-13-127-170-233.ap-south-1.compute.amazonaws.com PGPASSWORD=poweruserpassword PGDATABASE=postgres PGPORT=5432 NODE_ENV=development NODE_HOST=ec2-13-127-170-233.ap-south-1.compute.amazonaws.com forever -l start index.js

Use forever to kill node process
---------------
forever list
forever stop process_id

Kill node app using following command
---------------
ps aux | grep node
kill -9 process_id


Node Version 
---------------
Now using node v8.11.3 (npm v5.6.0)

API Documentation [ swagger ]
------------------

Swagger is used for Api documentation. Please Refer the docs below for detailed instruction

npm i swagger-ui-express -S

https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b


Connect Terminal to aws
------------------
ssh -i ~/.ssh/wecan.pem ec2-user@13.127.170.233
