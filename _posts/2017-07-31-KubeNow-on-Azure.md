---
layout: post
title: "KubeNow deployment on Azure"
excerpt:  
author: "Jianliang"
date: "31 July 2018"
status: publish
published: true
output: html_document
---
 

 
## Initialize KubeNow
 
KubeNow provides one line command deployment of Kubernetes  <https://github.com/jianlianggao/KubeNow-plugin>. Follow the intruction to download "kn", the main Kubernetes deployment bash script, and make it executable. It is not necessary to add it into system path. As long as you are comfortable and confident to run it as needed, you can decide wherever to put it.
 
Once you successfully run kn --preset phenomenal init azure <my-vre-config-dir>, you will see like: 
 
![KubeNow initialization](/figures/kubenow_init.png)
 
And, in the <my-vre-config-dir>, you should be able see the files and directories listed as follows. Otherwise, there must be something wrong with your initialization. Please check your computer environment such as network connection, permission etc.
 
![Kubernetes initialization for Azure](/figures/preset_kube_azure.png)
 
Now it's time to create and retrieve the information of your subscription of Azure and modify the "config.tfvars" in the following lines.
 
``` 
# Credentials
subscription_id = "your-subscription_id"
client_id       = "your-client_id" # a.k.a. your appId
client_secret   = "your-client_secret" # a.k.a. password
tenant_id       = "your-tenant_id"
```
To obtain your Azure account information, you can either check your Azure portal settings and properties <https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-create-service-principal-portal> or run the "az cli" <https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli?toc=%2Fen-us%2Fazure%2Fazure-resource-manager%2Ftoc.json&bc=%2Fen-us%2Fazure%2Fbread%2Ftoc.json&view=azure-cli-latest>
 
For example, we used "az cli" (Azure CLI. Installation of AZ CLI please check <https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest>) to create and retrieve our appId, tenant ID and confidential.
 
(1) Run "az login" for the first time you will get a return code. Use the returned code to login in the link prompted.
 
(2) After login successfully, you can run 
``` 
az ad sp create-for-rbac --role="Owner" --scopes="/subscriptions/<your subscription ID>"
```
You should have return values including "appId", "password" and "tenant".
 
Then you need to modify the following lines in the "config.tfvars" accoriding to your need and the design your Azure cluster. The type of nodes and VMs can be found at (<https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes-general>)
 
``` 
# Cluster configuration
cluster_prefix = "your-cluster-prefix" # Your cluster prefix
location = "West Europe"  # Some location according to the the type of VMs you choose for your master, gluster and computing nodes.
 
# Master configuration
master_vm_size = "Standard_DS2_v2" # change this according to your need
 
# Node configuration
node_count = "3"   # change the number of nodes according to your need
node_vm_size = "Standard_DS2_v2" # change this according to your need
 
# Gluster configuration
glusternode_count = "1" # change the number of nodes according to the size of cluster
glusternode_vm_size = "Standard_DS2_v2" # change this according to your need
 
 
.....
# The following passwords need to be set with fairly complicated combination keys.
 "action" = {
    "type"     = "ansible-playbook"
    "playbook" = "plugins/phnmnl/KubeNow-plugin/playbooks/install-phenomenal-playbook.yml"
    "extra_vars" = {
      "galaxy_include"        = "true"
      "galaxy_admin_email"    = "yoourname@bla.bla.com"
      "galaxy_admin_password" = "YVeciekOpe!@"
      "jupyter_include"       = "true"
      "jupyter_password"      = "VNidieKOEy#!"
      "luigi_include"         = "true"
      "luigi_username"        = "admin"
      "luigi_password"        = "reTEiopLnuuQ"
      "dashboard_include"     = "false"
      "dashboard_username"    = "admin"
      "dashboard_password"    = "@£$556YuendK"
    }
  }
```
