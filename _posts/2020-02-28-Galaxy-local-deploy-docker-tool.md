---
layout: post
title: "Galaxy Local Deployment to Launch Docker Container(s)"
excerpt:  
author: "Jianliang"
date: "28 Feburary 2020"
status: publish
published: true
output: html_document
---
 
Galaxy local deployment was tested on my local computer with Ubuntu 16.04 LTS and remote VM with Ubuntu 18.04 LTS. The following tutorial is based on Ubuntu 18.04.4 LTS (bionic).
 
## Step 1. Preparation your local system

Firstly, you need to have your system ready.


### Have Docker-ce installed and configured on your system.

My tool was encapsulated in a Docker image, and my local Galaxy instance aimed to run my tool with Docker engine. Therefore I needed Docker daemon running on my local system before I launched Galaxy instance.

Following instructions from Digital Ocean (<https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04>) to install Docker-ce on your system. Here I simply duplicate the key steps.

1. sudo apt update && sudo apt install apt-transport-https ca-certificates curl software-properties-common

2. curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

3. sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable" && sudo apt update

4. sudo apt install docker-ce

5. sudo  usermod -aG docker ${USER}
  (**NOTE:** immediately after this command, you can run "docker images" in your current user (not root user) to check if your user has permissions to run docker. If you have such error "Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock:" , you need to logout and login again to re-check. If you still don't have permission to run docker, use the following command to add your user into docker group `sudo gpasswd -a ubuntu docker`. Logout and login are needed immediately after the above command. You may also need to run `sudo systemctl restart docker` after login again.)
  
6. To insure Galaxy instance can run docker with galaxy users, you need to modify the file `/etc/sudoers and` add the following line into it. 

```galaxy ALL = (root) NOPASSWD: SETENV: /usr/bin/docker``` 

Your system is now ready to deploy Galaxy.

## Step 2. Clone Galaxy project and deploy locally.

1. git clone Galaxy from Galaxy project GitHub <https://github.com/galaxyproject/galaxy.git> (**NOTE:** I tested on 2 ext4 partitions and 1 ntfs partition. The test on ntfs partition failed)

2. Enter galaxy directory and copy `config/galaxy.yml.sample` as `config/galaxy.yml`.

3. In galaxy direcotry, copy `config/job_conf.xml.sample_basic` as `config/job_conf.xml` and edit the configuration file as follows.

```xml
<?xml version="1.0"?>
<!-- A sample job config that explicitly configures job running the way it is
     configured by default (if there is no explicit config). -->
<job_conf>
    <plugins>
        <plugin id="local" type="runner" load="galaxy.jobs.runners.local:LocalJobRunner" workers="1"/>
    </plugins>
    <destinations default="local">
        <destination id="local" runner="local"/>
        <destination id="docker_local" runner="local">
          <param id="docker_enabled">true</param>
        </destination>

        <destination id="<your docker>-container" runner="local">
           <param id="docker_enabled">true</param>
           <param id="docker_volumes">$defaults</param> -->
           <param id="docker_sudo">false</param>
           <param id="docker_auto_rm">true</param>
        </destination>

    </destinations>
    <tools>

     <tool id="<your docker>" destination="<your docker>-container"/>
    </tools>
</job_conf>

```
    
4. Edit `config/tool_conf.xml` by adding your tool, which allows Galay to list your tool on the left-hand side panel. For example,

```xml
<?xml version="1.0"?>
  <!-- other tools -->
  <section id="<your tool>-tool" name="Name of your tool">
     <tool file="<path>/<to>/<your tool>.xml" />

```
**NOTE:** path to your tool needs to be subdirectory in `galaxy/tools`.