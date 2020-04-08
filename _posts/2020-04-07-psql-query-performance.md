---
layout: post
title: "PostgreSQL queries performance"
excerpt:  
author: "Jianliang"
date: "07 April 2020"
status: publish
published: true
output: html_document
---
 
This is a glimpse of PostgreSQL queries performance based-on some basic practice on DELETE queries. The tests of the queries were implemented in Python and run on a PostgreSQL database installed on a VM (2 Intel Xeon CPU E5-2690 v3 @ 2.60GHz CPUs, 4GB RAM, Ubuntu 18.04 LTS bionic).
 
### A Python script for deleting items from tables.

To completely delete a user record in XNAT database, items from 6 tables need to be deleted.

At the beginning, I manually ran DELETE queries in a terminal connecting to the PostgreSQL database. Then I started thinking if I could run the 6 DELETE 
queries in one go to delete each inactive user, my job would be much easier. After a bit research, a Python library named `psycopg2` was found to satisfy my job. A Python script was immediately written as 

```
import psycopg2, sys

args = sys.argv
if (len(args) <3 ):
    print('user_id and user_email are required!')
    exit(0)
user_id = sys.argv[1]
user_email = sys.argv[2]

# 6 SQL quueries need to be done for delete a user from the XNAT db
del1 = "delete from xdat_user where login='"+user_id+"'"
del2 = "delete from xhbm_user_registration_data where login='"+user_id+"'"
del3 = "delete from xs_item_cache where contents like '%"+user_id+"%' AND contents like '%"+user_email+"%'"
del4 = "delete from xhbm_xdat_user_auth where auth_user='"+user_id+"'"
del5 = "delete from xhbm_alias_token where xdat_user_id='"+user_id+"'"
del6 = "delete from xdat_user_history where login='"+user_id+"'"

try:
    connection = psycopg2.connect(host='my host ip', database='xnat', user=<user>, password=<password>, port=<port number>)
    cursor = connection.cursor()
    cursor.execute(del1)
    connection.commit()

    print('1. Deleted from xdat_user')
    cursor.execute(del2)
    connection.commit()
    print('2. Deleted from xhbm_user_registration_data')
    cursor.execute(del3)
    connection.commit()
    print('3. Deleted from xs_item_cache')
    cursor.execute(del4)
    connection.commit()
    print('4. Deleted from xhbm_xdat_user_auth')
    cursor.execute(del5)
    connection.commit()
    print('5. Deleted from  xhbm_alias_token')
    cursor.execute(del6)
    connection.commit()
    print('6. Deleted from  xdat_user_history')
except (Exception, psycopg2.Error) as error :
    print ("Error while getting data from PostgreSQL", error)

finally:
    if(connection):
        cursor.close()
        connection.close()
        print('db connection closed.')
```
![SQL queries perforamce](/figures/psql_performance.png).