# Easy AppSettings Replacement

This Azure DevOps pipeline extension provides an easy way to replace AppSettings values
typically found in an .Net projects config files i.e. web.config

Replacements will happen in the first \<ApSettings> section on any file found matching the file filter criteria 

## How to use

* Specificy which (supports [minimatch patterns](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/file-matching-patterns?view=azure-devops))
* In the replacement texarea you specify a list of key value pairs seperated by =.
* The key is the name key found in the AppSettings sectionT
* The value is the value it will receive.
* Each keyvalue pair must be on a new line
* All files \<ApSettings> section config files 

***Key value pairs example***:
* key1=value1
* "key1"=value2
* 'key3'="value3"
* key4=$(DevOpsVariable)



## Current Restrictions
* Does not support json config files
* Does not support keys with = in the name
* Only supports AppSettings section


### Release Log
Version 0.1.0
* First release, does not support json yet.  See Current Restrictions
