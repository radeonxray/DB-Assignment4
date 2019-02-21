# DB-Assignment4
Assigment 3 in Databases - Security

-----

Assigment description: https://github.com/datsoftlyngby/soft2019spring-databases/blob/master/assignments/assignment4.md

Slides for the assignment: https://github.com/datsoftlyngby/soft2019spring-databases/blob/master/lecture_notes/04-Security_and_backup.ipynb

## Assignment

### Assignment 1

Lets assume are several systems which use this database:

- Inventory - which is used to maintain the two tables productsand productlines.
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
