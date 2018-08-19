# api-water
It uses pm2 for node app start,watch and other feautures

Start app using command

pm2 start processes.json

stop app using command

pm2 stop <app_name>

PGUSER=power_user PGHOST=ec2-13-127-170-233.ap-south-1.compute.amazonaws.com PGPASSWORD=poweruserpassword PGDATABASE=postgres PGPORT=5432 NODE_ENV=development NODE_HOST=ec2-13-127-170-233.ap-south-1.compute.amazonaws.com pm2 start index.js

Node Version 
---------------
Now using node v8.11.3 (npm v5.6.0)

API Documentation [ swagger ]
------------------

Swagger is used for Api documentation. Please Refer the docs below for detailed instruction

npm i swagger-ui-express -S

https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b
