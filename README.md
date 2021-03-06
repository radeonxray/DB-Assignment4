# DB-Assignment4
Assigment 4 in Databases - Security

-----

Assigment description: https://github.com/datsoftlyngby/soft2019spring-databases/blob/master/assignments/assignment4.md

Slides for the assignment: https://github.com/datsoftlyngby/soft2019spring-databases/blob/master/lecture_notes/04-Security_and_backup.ipynb

------
## Assignment

**Please note:** I didn't write the assignment and my answers in a Google Doc, which I usesually do during assignments, and instead opted to write directly in the README.md-file, so there might be some spelling mistakes and snaffus here and there.
I'm sorry for the inconvenience.

------

### Assignment 1

- Inventory - which is used to maintain the two tables products and productlines.
  - Needs access to add, update and remove inventory from the tables products and productlines.
  - Arguments could be made for giving them priviligies such as SELECT, INSERT, UPDATE, DELETE to the tables, but not the ability to DROP or CREATE (If they only really have to manage the inventory of the 2 given tables, products and productline).
- Bookkeeping which make sure that all orders are payed.
  - Needs access to the orders-, orderdetails- and payments-table. Reasoning is that the bookkeepers needs to check that the orders and orderdetails match, as well as the payments-table, to make sure that the orders has been paied for.
  - The bookkeepers perhaps should only be equiped with SELECT, since they have to control/check actual orders, maybe potentially DELETE and UPDATE.
  - An argument could be made for allowing UPDATE, as the Bookkeepers perhaps should be able to correct mistakes, but in order to limit potential "creative booking", they should not be allowed to DELETE from any of the tables.
  - The Bookkeepers should perhaps also be granted atleast SELECT to the customers, in order to get some consistency with the orderdetails and payments.
- Human resources which takes care of employees and their offices
  - Needs access to employees- and offices-table. HR are not concerned about the product or orders, they only focus on the "human"-aspect of the databse.
  - It could be argued, that HR only needs to INSERT, DELETE, SELECT and UPDATE.
  - Does NOT CREATE new Users (Employees)! That's IT job!
- Sales - who creates the orders for the customers
  - Needs access to the Orders-, OrderDetails-, Customers- and Products-tables, so they can actually sell the products, as well as create orders and change the status of the inventory (Shouldn't be able to sell more than you have!)
  - One could argue, that the sales team only should be able to SELECT, UPDATE, DELETE and INSERT(orders & orderdetails, NOT Products), thus only making them able to create a sale, and not any other features.
  -Also needs to be able to INSERT and UPDATE new Customers, to link to orders, sales etc.

- IT - who maintains this database
  - Root access, since the user needs to be able to create new schemas, change existing ones and perhaps even delete existing ones. Gratned, the only catch here it, that the user might not have anything to do with actual content, but only the framework containing the content.
  
Create a database user for each of the four roles, and be restrictive in what the each user can do in the database.

In the readme file, argue why the permissions are as they are.

#### SQL Scripts

**Create Users**
```mysql
CREATE USER 'userInventory'@'localhost' IDENTIFIED BY 'passInven';
CREATE USER 'userBookkeeping'@'localhost' IDENTIFIED BY 'passBkp';
CREATE USER 'userHR'@'localhost' IDENTIFIED BY 'passHR';
CREATE USER 'userSale'@'localhost' IDENTIFIED BY 'passSale';
```

**Note** After setting each user priviligies, remember to:
```mysql 
flush Privileges;
```
This operation **CANNOT** be performed in the same query as the GRANT

**Set userInventory priviligies**
```mysql 
GRANT SELECT, INSERT, UPDATE, DELETE ON classicmodels.products TO userInventory@localhost;
GRANT SELECT, INSERT, UPDATE, DELETE ON classicmodels.productlines TO userInventory@localhost;
```

**Set userBookkeeping priviligies**
```mysql 
GRANT SELECT, UPDATE  ON classicmodels.orderdetails TO userBookkeeping@localhost;
GRANT SELECT, UPDATE  ON classicmodels.orders TO userBookkeeping@localhost;
GRANT SELECT, UPDATE  ON classicmodels.payments TO userBookkeeping@localhost;
GRANT SELECT  ON classicmodels.customers TO userBookkeeping@localhost;
```

**Set userHR priviligies**
```mysql 
GRANT SELECT, UPDATE, INSERT, DELETE ON classicmodels.employees TO userHR@localhost;
GRANT SELECT, UPDATE, INSERT, DELETE ON classicmodels.offices TO userHR@localhost;
```


**Set userSale priviligies**
```mysql 
GRANT SELECT, INSERT, UPDATE, DELETE ON classicmodels.customers TO userSale@localhost;
GRANT SELECT, INSERT, UPDATE, DELETE ON classicmodels.orderdetails TO userSale@localhost;
GRANT SELECT, INSERT, UPDATE, DELETE ON classicmodels.orders TO userSale@localhost;
GRANT SELECT, UPDATE ON classicmodels.products TO userSale@localhost;

```

**Show User Grant**
```mysql 
SHOW GRANTS FOR userInventory@localhost;
SHOW GRANTS FOR userBookkeeping@localhost;
SHOW GRANTS FOR userHR@localhost;
SHOW GRANTS FOR userSale@localhost;
```

**DO NOT USE** Set Very basic (ALL)  PRIVILEGES **DO NOT USE** 

```mysql
GRANT ALL ON classicmodels.products TO 'userInventory'@'localhost';
GRANT ALL ON classicmodels.productlines TO 'userInventory'@'localhost';

GRANT ALL ON classicmodels.orderdetails TO 'userBookkeeping'@'localhost';
GRANT ALL ON classicmodels.payments TO 'userBookkeeping'@'localhost';
GRANT ALL ON classicmodels.orders TO 'userBookkeeping'@'localhost';

GRANT ALL ON classicmodels.employees TO 'userHR'@'localhost';
GRANT ALL ON classicmodels.customers TO 'userHR'@'localhost';
GRANT ALL ON classicmodels.offices TO 'userHR'@'localhost';

GRANT ALL ON classicmodels.orderdetails TO 'userSale'@'localhost';
GRANT ALL ON classicmodels.orders TO 'userHR'@'localhost';
GRANT ALL ON classicmodels.productlines TO 'userHR'@'localhost';
GRANT ALL ON classicmodels.products TO 'userHR'@'localhost';

flush Privileges;
```

**DO NOT USE** Revoke ALL PRIVILEGES **DO NOT USE** 
```mysql

REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'userInventory'@localhost;
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'userSale'@localhost;
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'userBookkeeping'@localhost;
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'userHR'@localhost;
flush Privileges;

```

**Hand-in**

Hand in for this is a sql script which creates and sets the permissions for the users.

-------
### Assignment 2

Make a number of operations on the database:

- Insert 2 new employees
```mysql
INSERT INTO `classicmodels`.`employees` (`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES ('1760', 'Martial', 'Anthony', 'x0606', 'anthonymartial@classicmodelcars.com', '4', '1102', 'Sales Rep');


INSERT INTO `classicmodels`.`employees` (`employeeNumber`, `lastName`, `firstName`, `extension`, `email`, `officeCode`, `reportsTo`, `jobTitle`) VALUES ('1761', 'Rashford', 'Marcus', 'x1010', 'marcusrashford@classicmodelcars.com', '4', '1102', 'Sales Rep');


```
- Insert 1 new product
```mysql
INSERT INTO `classicmodels`.`products` (`productCode`, `productName`, `productLine`, `productScale`, `productVendor`, `productDescription`, `quantityInStock`, `buyPrice`, `MSRP`) VALUES ('S72_3215', 'Aston Martin DB5', 'Classic Cars', '1:25', 'EON', 'An official 1:25 model of the car that James Bond drives in classics such as Goldfinger and Skyfall!', '10000', '25.76', '79.99');
```

- Create 1 new order
```mysql
INSERT INTO `classicmodels`.`orders` (`orderNumber`, `orderDate`, `requiredDate`, `status`, `customerNumber`) VALUES ('10427', '2019-02-23', '2019-01-03', 'In Process', '119');
```

**Non-mandatory extra**: Set up a mysql database on digital ocean with standard port (3306), and check the log some days later for log-in attempts.

**Hand-in**

Upload as part of the hand-in the database log which shows:

- The users and their privileges being added (the part of the log from exercise 1)
- The three changes to the database from above
- One attempt to make a change by a user with the wrong privileges
  - Logged in as userHR (Human Resources)
  - Login-command: docker exec -it my_mysql mysql -u userHR -p 
  - Password: passHR
  - Tried to add a new product in the product-table, with the following
  ```mysql
  INSERT INTO `classicmodels`.`products` (`productCode`, `productName`, `productLine`, `productScale`, `productVendor`, `productDescription`, `quantityInStock`, `buyPrice`, `MSRP`) VALUES ('S72_3214', 'R.M.S. TITANIC 2', 'Ships', '1:25', 'Blue Star Line', 'A official 1:25 replica of the upcoming recreation of the famous RMS Titanic ', '500', '185.98', '299.99');
  ```
  Which failed!
  
[The Full log-file can be read here](https://github.com/radeonxray/DB-Assignment4/blob/master/mysqllog.log)

**Please Note:** I don't think I had turned on the log properly, so I had to drop all the user, re-recreate them, re-assign their privileges, add new content (2 new employees, 1 order, 1 product, as well as trying to add content with a user that does not have the permission), hence why the first couple of logged items seemes a bit odd.

---------

### Assignment 3

Create a backup file of the database after the changes in the two previous exercises.


**Handin**

Include the backup file in your git-repository.

As there are several ways of taking a backup of a database, you must explain in the readme file which technique you have used.

#### Answer
I used the folllwing command in a Terminal, while being logged in on Vagrant:

`docker exec my_mysql /usr/bin/mysqldump -u root --password=iphone2019 --all-databases > backupAll.sql`

This produced a .sql-file named "backupAll.sql", which was created using mysqldump and which was set to dump all databases into the file. 

I then opened a new separat Terminal-window and used the following command:
`vagrant ssh -c "sudo cat /home/vagrant/backupAll.sql" > mysqlbackupall.sql`

This command logged in to my vagrant, found the backupAll.sql-file and then created a copy named mysqlbackupAll.sql in my root-directory (/Users/[username]).

[The entire backup-file can be found and seen here](https://github.com/radeonxray/DB-Assignment4/blob/master/mysqlbackupall.sql)

What I've done, is taking a backup of all the databases while the MYSQL server was running (*Online Versus Offline Backups*), from a (technically) remote virtual machine on my laptop and transfered the results to my local machine (*Local Versus Remote Backups*). The backup contains all the information regarding the DB, including changes (*Full Versus Incremental Backups*)



---------

### Setup Guide

Setup VM, Vagrant and Docker, [you can read my original guide on how to setup VM, Vagrant and Docker from Assignment 2 here](https://github.com/radeonxray/DB-Assignment2)

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

----------

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

Show grants: `SHOW GRANTS FOR '[Username]'@'localhost';`

SQL Dump
-uroot -p 

show databases;
https://gist.github.com/hofmannsven/9164408

Links: https://expressjs.com/en/guide/database-integration.html#mysql 

User and Permissions: 

https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql

https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html

Default priviligies:
GRANT usage ON star.star TO [Username]@localhost
http://www.mysqlab.net/knowledge/kb/detail/topic/security/id/5917

Revoke Permits/Priviliges
`REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'userInventory'@localhost`

Set restriction on User:
https://dev.mysql.com/doc/refman/8.0/en/user-resources.html

MySQL Logs
https://dev.mysql.com/doc/refman/5.7/en/query-log.html

Drop User:
https://dev.mysql.com/doc/refman/5.6/en/drop-user.html

Command to copy .log-file from Vagrant to Host-machine:
`vagrant ssh -c "sudo cat /home/vagrant/mysql_databasefiles/58f11bcc4f48.log" > mysqllog.log`

MySQL Dump
https://dev.mysql.com/doc/refman/5.7/en/mysqldump-sql-format.html
`mysqldump --all-databases > dump.sql`
https://gist.github.com/spalladino/6d981f7b33f6e0afe6bb
`docker exec my_mysql /usr/bin/mysqldump -u root --password=iphone2019 classicmodels > backup.sql`
`docker exec my_mysql /usr/bin/mysqldump -u root --password=iphone2019 --all-databases > backupAll.sql`
`docker exec my_mysql /usr/bin/mysqldump -u root --password=root DATABASE > backup.sql`

