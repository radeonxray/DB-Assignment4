# DB-Assignment4
Assigment 4 in Databases - Security

-----

Assigment description: https://github.com/datsoftlyngby/soft2019spring-databases/blob/master/assignments/assignment4.md

Slides for the assignment: https://github.com/datsoftlyngby/soft2019spring-databases/blob/master/lecture_notes/04-Security_and_backup.ipynb

## Assignment

### Assignment 1

Lets assume are several systems which use this database:

- Inventory - which is used to maintain the two tables products and productlines.
- Bookkeeping which make sure that all orders are payed.
- Human resources which takes care of employees and their offices
- Sales - who creates the orders for the customers
- IT - who maintains this database
- Create a database user for each of the four roles, and be restrictive in what the each user can do in the database.

In the readme file, argue why the permissions are as they are.

**Hand-in**

Hand in for this is a sql script which creates and sets the permissions for the users.


### Assignment 2

Make a number of operations on the database:

- Insert 2 new employees
- Insert 1 new product
- Create 1 new order

**Non-mandatory extra**: Set up a mysql database on digital ocean with standard port (3306), and check the log some days later for log-in attempts.

**Hand-in**

Upload as part of the hand-in the database log which shows:

- The users and their privileges being added (the part of the log from exercise 1)
- The three changes to the database from above
- One attempt to make a change by a user with the wrong privileges

### Assignment 3

Create a backup file of the database after the changes in the two previous exercises.


**Handin**

Include the backup file in your git-repository.

As there are several ways of taking a backup of a database, you must explain in the readme file which technique you have used.

### Setup Guide

Setup VM, Vagrant and Docker

*Please note the IP address you've selected for your Vagrant-setup, because you will need this later! Default its 192.168.33.10*

Download and install the latest version of [Mysql WorkBench](https://dev.mysql.com/downloads/workbench/), which we will be using later to inspect the Database.

***Note***: If you are using a older version of Workbench, you might not be able to connect to the server!
I've tried to apply the following [guides](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server) for older Workbench-versions and Sequel Pro, but to no avail. 


When running your VM in a Terminal/Bash-window, run the following command to get the latest version of mySQL for your Docker:
`docker pull mysql:latest`

Run the following command to setup the Docker Container with a mysql-server:
`docker run --name my_mysql -v $(pwd)/mysql_databasefiles:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=iphone2019 -d mysql`

To connect to the Docker Container through the terminal/Bash, use the following command:
`docker exec -it my_mysql mysql -u root -p`

Connect to the Docker Container through WorkBench with the following information:

*IP*: `192.168.33.10`

*Port*: `3306`

*User*: `root`

*Password*: `iphone2019`

After having connected to the Docker Container, go to the [sampledb.txt](https://github.com/radeonxray/DB-Assignment4/blob/master/sampledb.txt)-file, copy the entire content.

**Note**: This .txt-file contains the same content, as the mysqlsampledatabase.sql-file found [here](http://www.mysqltutorial.org/mysql-sample-database.aspx)

Copy the entire content into a new query in the Database and run it. 

Refresh the Schemas and you should see a new schema called `classicmodels`

The Database is now ready for the assignments!


### Notes

Docker Container IP / Vagrant IP: 192.168.33.10

https://hub.docker.com/r/mysql/mysql-server/

Docker - Get MySQL: docker pull mysql/mysql-server 

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'iphone2019';
ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'iphone2019';
flush privileges;

Setup MySQLDocker Container: 
- docker run --name=mysql1 -d mysql/mysql-server
- docker run -p 3306:3306 --name mysql1 -e MYSQL_ROOT_PASSWORD=iphone2017 -v /my/own/datadir:/var/lib/mysql -d mysql:latest
- docker run --name my_mysql -v $(pwd)/mysql_databasefiles:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=iphone2019 -d mysql
echo "Wooootttt"

Connect to Container: docker exec -it my_mysql mysql -u root -p

Get generated password: docker logs mysql1 2>&1 | grep GENERATED
Generated Password: ,em]3xEf*OxzafbED54wGAhDuD

Login: docker exec -it mysql1 mysql -uroot -p

Change Root password: ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
Note: Replace 'password' with the root password you want!
Flush: flush priviliges;



SQL Dump
-uroot -p 

show databases;
https://gist.github.com/hofmannsven/9164408

Links: https://expressjs.com/en/guide/database-integration.html#mysql 
