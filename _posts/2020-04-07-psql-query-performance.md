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

![SQL queries perforamce](/figures/psql_performance.png).