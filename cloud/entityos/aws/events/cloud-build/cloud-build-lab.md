0/ AURORA CREATE

- Use entityos-aws to create the:
	- Aurora Cluster (u/p)
	- Instance in the cluster (url)

lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-subnet-groups-lab.json
lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-subnet-group-create-lab.json

lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-cluster-create-lab.json
lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-clusters-lab.json


1/ CREATE FUNCTION TO ACCESS AURORA ON AWS

- Need to run the commands in the VPC on on AWS to access the Aurora database etc
- Proxy lambda Code in /functions/cloud-build folder.

lambda-local -l index.js -t 9000 -e events/cloud-build/event-aws-lambda-function-create-cloud-build-storage-lab.json
lambda-local -l index.js -t 9000 -e events/cloud-build/event-aws-lambda-function-update-cloud-build-storage-lab.json

2/ DELETE DB IF IT EXISTS - LAB ONLY.

!!! lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-execute-drop-data-base-lab.json

3/ CREATE DB

lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-base-create-lab.json

4/ CREATE MODEL

*Do 500 at a time*

lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-create-lab.json
	- lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-update-lab.json

lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-information-lab.json

5/ INITIALISE DB / GENESIS & SYSTEM DATA

lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-initialise-genesis-lab.json
	- lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-initialise-genesis-check-lab.json
	- lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-information-genesis-lab.json

*Do 100 at a time*
lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-initialise-system-lab.json

6/ DB QUERY / EXECUTE

lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-query-lab.json
lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-execute-drop-lab.json

---