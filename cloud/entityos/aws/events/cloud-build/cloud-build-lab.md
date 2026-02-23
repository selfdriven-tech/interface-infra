### 1/ AWS IAM ACCESS POLICY TEMPLATE

{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"ec2:DescribeSecurityGroupRules",
				"ec2:DescribeSecurityGroups",
				"ec2:AuthorizeSecurityGroupEgress",
				"ec2:AuthorizeSecurityGroupIngress",
				"ec2:RevokeSecurityGroupEgress",
				"ec2:RevokeSecurityGroupIngress",
				"ec2:DescribeInstances",
				"ec2:DescribeImages",
				"ec2:CreateImage",
				"ec2:DeregisterImage",
				"ec2:DescribeSnapshots",
				"ec2:DeleteSnapshot",
				"s3:GetObject",
				"s3:PutObject",
				"s3:ListBucket",
				"wafv2:ListWebACLs",
				"qbusiness:Chat",
				"qbusiness:ListApplications",
				"qbusiness:GetApplication"
			],
			"Resource": [
				"*"
			]
		}
	]
}

### 2/ AURORA CREATE

- Use entityos-aws to create the:
	- Aurora Cluster (u/p)
	- Instance in the cluster (url)

lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-subnet-groups-lab.json
lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-subnet-group-create-lab.json

lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-cluster-create-lab.json
lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-clusters-lab.json


### 3/ CREATE FUNCTION TO ACCESS AURORA ON AWS

- Need to run the commands in the VPC on on AWS to access the Aurora database etc
- Proxy lambda Code in /functions/cloud-build folder.

lambda-local -l index.js -t 9000 -e events/cloud-build/event-aws-lambda-function-create-cloud-build-storage-lab.json
lambda-local -l index.js -t 9000 -e events/cloud-build/event-aws-lambda-function-update-cloud-build-storage-lab.json

### 4/ DELETE DB IF IT EXISTS - LAB ONLY.

!!! lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-execute-drop-data-base-lab.json

### 5/ CREATE DB

lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-base-create-lab.json

### 6/ CREATE MODEL

*Do 500 at a time*

lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-create-lab.json
	- lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-update-lab.json

lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-information-lab.json

### 7/ INITIALISE DB / GENESIS & SYSTEM DATA

lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-initialise-genesis-lab.json
	- lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-initialise-genesis-check-lab.json
	- lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-information-genesis-lab.json

*Do 100 at a time*
lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-model-initialise-system-lab.json

### 8/ DB QUERY / EXECUTE

lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-query-lab.json
lambda-local -l index.js -t 9000 -e events/lab/cloud-build/event-aws-lambda-function-invoke-cloud-build-storage-data-execute-drop-lab.json

---