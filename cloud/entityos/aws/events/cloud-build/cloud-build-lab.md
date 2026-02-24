### 1/ AWS IAM ACCESS POLICY TEMPLATE

```json
{
  "Version": "2012-10-17",
  "Statement": [
	{
		"Sid": "RDSServiceLinkedRole",
		"Effect": "Allow",
		"Action": "iam:CreateServiceLinkedRole",
		"Resource": "arn:aws:iam::*:role/aws-service-role/rds.amazonaws.com/*",
		"Condition": {
			"StringLike": {
			"iam:AWSServiceName": "rds.amazonaws.com"
			}
		}
	},
    {
      "Sid": "EC2ReadOnly",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeSubnets",
        "ec2:DescribeImages",
        "ec2:DescribeSnapshots",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSecurityGroupRules"
      ],
      "Resource": "*"
    },
    {
      "Sid": "EC2Operational",
      "Effect": "Allow",
      "Action": [
        "ec2:StartInstances",
        "ec2:StopInstances",
        "ec2:RunInstances",
        "ec2:CreateImage",
        "ec2:CreateTags",
        "ec2:AuthorizeSecurityGroupIngress",
        "ec2:RevokeSecurityGroupIngress"
      ],
      "Resource": "*"
    },
    {
      "Sid": "EC2Destructive",
      "Effect": "Allow",
      "Action": [
        "ec2:DeregisterImage",
        "ec2:DeleteSnapshot"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "*"
        },
        "Bool": {
          "aws:MultiFactorAuthPresent": "true"
        }
      }
    },
    {
      "Sid": "S3ReadOnly",
      "Effect": "Allow",
      "Action": [
        "s3:ListAllMyBuckets",
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": "*"
    },
    {
      "Sid": "S3Write",
      "Effect": "Allow",
      "Action": [
        "s3:CreateBucket",
        "s3:PutObject"
      ],
      "Resource": "*"
    },
    {
      "Sid": "RDSReadOnly",
      "Effect": "Allow",
      "Action": [
        "rds:DescribeDBInstances",
        "rds:DescribeDBClusters",
        "rds:DescribeDBSnapshots",
        "rds:DescribeDBSubnetGroups"
      ],
      "Resource": "*"
    },
    {
      "Sid": "RDSOperational",
      "Effect": "Allow",
      "Action": [
        "rds:StartDBInstance",
        "rds:StopDBInstance",
        "rds:CreateDBInstance",
        "rds:CreateDBCluster",
        "rds:CreateDBSnapshot",
        "rds:CreateDBSubnetGroup",
        "rds:ModifyDBInstance",
        "rds:RestoreDBInstanceFromDBSnapshot"
      ],
      "Resource": "*"
    },
    {
      "Sid": "RDSDestructive",
      "Effect": "Allow",
      "Action": [
        "rds:DeleteDBInstance",
        "rds:DeleteDBSnapshot"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "*"
        },
        "Bool": {
          "aws:MultiFactorAuthPresent": "true"
        }
      }
    },
    {
      "Sid": "ELBReadOnly",
      "Effect": "Allow",
      "Action": [
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeListeners",
        "elasticloadbalancing:DescribeListenerCertificates"
      ],
      "Resource": "*"
    },
    {
      "Sid": "WAFReadOnly",
      "Effect": "Allow",
      "Action": [
        "wafv2:ListWebACLs",
        "wafv2:GetWebACL"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ACMReadOnly",
      "Effect": "Allow",
      "Action": [
        "acm:DescribeCertificate"
      ],
      "Resource": "*"
    },
    {
      "Sid": "Route53ReadOnly",
      "Effect": "Allow",
      "Action": [
        "route53:ListHostedZones",
        "route53:ListResourceRecordSets"
      ],
      "Resource": "*"
    },
    {
      "Sid": "KMSReadOnly",
      "Effect": "Allow",
      "Action": [
        "kms:ListKeys",
        "kms:DescribeKey",
        "kms:Encrypt",
        "kms:Decrypt"
      ],
      "Resource": "*"
    },
    {
      "Sid": "KMSCreateKey",
      "Effect": "Allow",
      "Action": [
        "kms:CreateKey"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "*"
        }
      }
    },
    {
      "Sid": "BedrockAccess",
      "Effect": "Allow",
      "Action": [
        "bedrock:ListFoundationModels",
        "bedrock:InvokeModel"
      ],
      "Resource": "*"
    },
    {
      "Sid": "IAMRoleManagement",
      "Effect": "Allow",
      "Action": [
        "iam:CreateRole",
        "iam:AttachRolePolicy",
        "iam:PassRole"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "*"
        }
      }
    },
    {
      "Sid": "LambdaOperational",
      "Effect": "Allow",
      "Action": [
        "lambda:CreateFunction",
        "lambda:UpdateFunctionCode",
        "lambda:UpdateFunctionConfiguration",
        "lambda:InvokeFunction"
      ],
      "Resource": "*"
    },
    {
      "Sid": "SSMParameterAccess",
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameter",
        "ssm:PutParameter"
      ],
      "Resource": "*"
    }
  ]
}
```

### 2/ AURORA CREATE

Create the AWSServiceRoleForRDS service-linked role required for RDS operations:
- lambda-local -l index.js -t 9000 -e events/cloud-build/event-aws-iam-rds-service-linked-role-create.json

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