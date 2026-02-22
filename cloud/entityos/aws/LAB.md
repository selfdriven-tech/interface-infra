# entityOS-lab.cloud

You will be prompted for the lab "AWS Access Secret Key" when you run the command.
This will have been sent to you.

## STOP

- Stop the lab EC2 
- Snapshot & delete the RDS services

> lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-delete-lab.json
> lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-instances-change-state-stop-lab.json

## START

- Start the lab EC2 
- Create the RDS service based on the last snapshot

> lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-restore-last-snapshot-lab.json
> lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-instances-change-state-start-lab.json

----

## UTILS
> lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instances-lab.json
> lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-instances-lab.json


