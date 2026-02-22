/*
	ENTITYOS LEARN | AWS
	
	For starting and stopping AWS

	"aws-ec2" // id:, status: ['start', 'stop]

	Depends on;
	https://learn.entityos.cloud/learn-function-automation

	---

	This is a lambda compliant node app with a wrapper to process data from API Gateway & respond to it.

	To run it on your local computer your need to install
	https://www.npmjs.com/package/lambda-local and then run as:

	lambda-local -l index.js -t 9000 -e event.json

	API Gateway docs:
	- https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html

	Settings.json values set process.env.
		AWS_ACCESS_KEY_ID
  		AWS_SECRET_ACCESS_KEY

	AWS SDK module then uses them to authenticate

	LAB:
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-instances-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-instances-change-state-start-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-instances-change-state-stop-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instances-create-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-instance-images-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-instance-image-create-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-instance-image-delete-oldest-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-instance-image-snapshots-orphaned-delete-oldest-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-snapshots-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-snapshot-export-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-security-groups-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-security-group-rules-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-security-group-rules-change-revoke-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-security-group-rules-change-public-revoke-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-security-group-rules-change-add-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-ec2-subnets-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instances-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-change-state-start-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-change-state-stop-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-modify-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-delete-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-restore-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-restore-last-snapshot-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-create-lab.json
	
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-snapshots-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-snapshot-create-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-instance-snapshot-delete-oldest-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-subnet-groups-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-subnet-group-create-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-cluster-create-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-rds-clusters-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-elb-load-balancers-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-elb-load-balancer-listeners-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-elb-load-balancer-listener-certificates-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-s3-buckets-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-s3-bucket-create-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-s3-bucket-objects-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-s3-bucket-object-create-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-s3-bucket-object-get-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-s3-bucket-object-create-from-entityos-lab.json
	
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-waf-firewalls-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-waf-firewall-rule-update-based-on-entityos-urls-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-acm-certificate-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-route53-zones-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-route53-zone-records-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-kms-keys-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-kms-key-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-kms-key-create-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-kms-encrypt-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-kms-decrypt-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-bedrock-models-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-bedrock-model-invoke-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-iam-role-create-lab.json

	lambda-local -l index.js -t 9000 -e events/lab/event-aws-lambda-function-create-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-lambda-function-update-lab.json
	lambda-local -l index.js -t 9000 -e events/lab/event-aws-lambda-function-invoke-lab.json

	PROD:
	- see PROD.md
	
	Upload to AWS Lambda:
	zip -r ../entityos-aws-16FEB2025-1.zip *

	-- 
	Examples:
	zip -r ../hello-world.zip *
*/

exports.handler = function (event, context, callback)
{
	var entityos = require('entityos');
	var _ = require('lodash');
	var moment = require('moment');

	entityos._util.message(event)
 
	if (event.isBase64Encoded)
	{
		event.body = Buffer.from(event.body, 'base64').toString('utf-8');
	}

	console.log(event)

	if (_.isString(event.body))
	{
		if (_.startsWith(event.body, 'ey'))
		{
			event.body = JSON.parse(Buffer.from(event.body, 'base64').toString('utf-8'));
		}
		else
		{
			event.body = JSON.parse(event.body);
		}
	}

	if (_.isString(_.get(event, 'body.data')))
	{
		if (_.startsWith(event.body.data, 'ey'))
		{
			event.body.data = JSON.parse(Buffer.from(event.body, 'base64').toString('utf-8'));
		}
		else
		{
			event.body.data = JSON.parse(event.body.data);
		}
	}

	if (_.has(event, 'body._context'))
	{
		event.context = event.body._context;
	}

	if (event.context == undefined)
	{
		event.context = 'prod'
	}

	entityos.set(
	{
		scope: '_event',
		value: event
	});

	entityos.set(
	{
		scope: '_context',
		value: context
	});

	/*
		Use promise to responded to API Gateway once all the processing has been completed.
	*/

	const promise = new Promise(function(resolve, reject)
	{	
		entityos.init(main);

		function main(err, data)
		{
			/*
				app initialises with entityos.invoke('app-init') after controllers added.
			*/

			entityos.add(
			{
				name: 'app-init',
				code: function ()
				{
					entityos._util.message('Using entityos module version ' + entityos.VERSION);
					entityos._util.message(entityos.data.session);

					var eventData = entityos.get(
					{
						scope: '_event'
					});

					var request =
					{ 
						body: {},
						queryString: {},
						headers: {}
					}

					if (eventData != undefined)
					{
						if (_.has(eventData, 'queryString'))
						{
							request.queryString = eventData.queryStringParameters;
						}

						if (_.has(eventData, 'headers'))
						{
							request.headers = eventData.headers;
						}

						if (_.isString(eventData.body))
						{
							request.body = JSON.parse(eventData.body)
						}
						else
						{
							if (_.has(eventData, 'body'))
							{
								request.body = eventData.body;
							}
						}	
					}

					if (request.headers['x-api-key'] != undefined)
					{
						var _xAPIKey = _.split(request.headers['x-api-key'], '|');
						
						if (_xAPIKey.length == 0)
						{
							entityos.invoke('util-end', {error: 'Bad x-api-key in header [' + request.headers['x-api-key'] + '] - it should be {apiKey} or {apiKey}|{authKey}.'}, '401');
						}
						else
						{
							if (_xAPIKey.length == 1)
							{
								request.body.apikey = _xAPIKey[0];
							}
							else
							{
								request.body.apikey = _xAPIKey[0];
								request.body.authkey = _xAPIKey[1];
							}
						}
					}

					if (request.headers['x-auth-key'] != undefined)
					{
						request.body.authkey = request.headers['x-auth-key'];
					}

					entityos.set(
					{
						scope: '_request',
						value: request
					});

					entityos.set(
					{
						scope: '_data',
						value: _.get(request, 'body.data')
					});

					if (request.body.apikey != undefined)
					{
						if (request.body.authkey != undefined)
						{
							entityos.invoke('app-auth');
						}
						else
						{
							if (request.body.method == 'social-get-did')
							{
								entityos.invoke('app-start');
							}
							else
							{
								entityos.invoke('util-end', {error: 'Missing authKey'}, '401');
							}
						}
					}
					else
					{
						entityos.invoke('app-start');
					}
				}
			});

			entityos.add(
			{
				name: 'app-auth',
				code: function (param)
				{
					var request = entityos.get(
					{
						scope: '_request'
					});

					var requestApiKeyGUID = request.body.apikey;

					entityos.cloud.search(
					{
						object: 'setup_user',
						fields: [{name: 'username'}],
						filters:
						[
							{
								field: 'guid',
								comparison: 'EQUAL_TO',
								value: requestApiKeyGUID
							}
						],
						callback: 'app-auth-process'
					});
				}
			});

			entityos.add(
			{
				name: 'app-auth-process',
				code: function (param, response)
				{
					entityos.set(
					{
						scope: 'app',
						context: 'user',
						value: response
					});

					if (response.status == 'ER')
					{
						entityos.invoke('util-end', {error: 'Error processing user authentication.'}, '401');
					}
					else
					{
						if (response.data.rows.length == 0)
						{
							var request = entityos.get(
							{
								scope: '_request'
							});

							var requestApiKeyGUID = request.body.apikey;

							entityos.invoke('util-end', {error: 'Bad apikey [' + requestApiKeyGUID + ']'}, '401');
						}
						else
						{
							var user = _.first(response.data.rows);

							var request = entityos.get(
							{
								scope: '_request'
							});

							var requestAuthKeyGUID = request.body.authkey;

							entityos.logon('app-auth-logon-process',
							{
								logon: user.username,
								password: requestAuthKeyGUID
							});
						}
					}
				}
			});

			entityos.add(
			{
				name: 'app-auth-logon-process',
				code: function (response)
				{
					if (response.status == 'ER')
					{
						var request = entityos.get(
						{
							scope: '_request'
						});

						var requestAuthKeyGUID = request.body.authkey;

						if (response.error.errornotes == 'LogonKey has not been requested')
						{
							entityos.invoke('util-end', {error: 'Bad authkey user config. Set authenticationlevel=1. [' + requestAuthKeyGUID + ']'}, '401');
						}
						else
						{
							entityos.invoke('util-end', {error: 'Bad authkey [' + requestAuthKeyGUID + ']'}, '401');
						}
					}
					else
					{
						entityos.set(
						{
							scope: 'app',
							context: 'user',
							value: response
						});

						entityos.invoke('app-user');
					}
				}
			});

			entityos.add(
			{
				name: 'app-user',
				code: function (param)
				{
					entityos.cloud.invoke(
					{
						method: 'core_get_user_details',
						callback: 'app-user-process'
					});
				}
			});

			entityos.add(
			{
				name: 'app-user-process',
				code: function (param, response)
				{
					entityos.set(
					{
						scope: 'app',
						context: 'user',
						value: response
					})

					entityos.invoke('app-start')
				}
			});

			entityos.add(
			{
				name: 'util-uuid',
				code: function (param)
				{
					var pattern = entityos._util.param.get(param, 'pattern', {"default": 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'}).value;
					var scope = entityos._util.param.get(param, 'scope').value;
					var context = entityos._util.param.get(param, 'context').value;

					var uuid = pattern.replace(/[xy]/g, function(c) {
						    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
						    return v.toString(16);
						  });

					entityos.set(
					{
						scope: scope,
						context: context,
						value: uuid
					})
				}
			});

			entityos.add(
			{
				name: 'app-log',
				code: function ()
				{
					var eventData = entityos.get(
					{
						scope: '_event'
					});

					entityos.cloud.invoke(
					{
						object: 'core_debug_log',
						fields:
						{
							data: JSON.stringify(eventData),
							notes: 'app Log (Event)'
						}
					});

					var requestData = entityos.get(
					{
						scope: 'app',
						context: 'request'
					});

					entityos.cloud.invoke(
					{
						object: 'core_debug_log',
						fields:
						{
							data: JSON.stringify(requestData),
							notes: 'app Log (Request)'
						}
					});

					var contextData = entityos.get(
					{
						scope: '_context'
					});

					entityos.cloud.invoke(
					{
						object: 'core_debug_log',
						fields:
						{
							data: JSON.stringify(contextData),
							notes: 'appLog (Context)'
						},
						callback: 'app-log-saved'
					});
				}
			});

			entityos.add(
			{
				name: 'app-log-saved',
				code: function (param, response)
				{
					entityos._util.message('Log data saved to entityos.cloud');
					entityos._util.message(param);
					entityos._util.message(response);
				
					entityos.invoke('app-respond')
				}
			});

			entityos.add(
			{
				name: 'app-respond',
				code: function (param)
				{
					var response = entityos.get(
					{
						scope: 'app',
						context: 'response'
					});

					if (!_.get(response, 'asis', false))
					{
						var statusCode = response.httpStatus;
						if (statusCode == undefined) {statusCode = '200'}

						var body = response.data;
						if (body == undefined) {body = {}}
						
						var headers = response.headers;
						if (headers == undefined) {headers = {}}

						var httpResponse =
						{
							statusCode: statusCode,
							headers: headers,
							body: JSON.stringify(body)
						};
					}
					else
					{
						var httpResponse = response.data;
					}

					resolve(httpResponse)
				}
			});

			entityos.add(
			{
				name: 'util-end',
				code: function (data, statusCode, headers)
				{
					if (statusCode == undefined) { statusCode = '200' }
					if (headers == undefined) { headers = {'Content-Type': 'application/json'} }

					const asis = _.has(data, 'asis')

					if (asis)
					{
						data = data.asis;
					}

					entityos.set(
					{
						scope: 'app',
						context: 'response',
						value:
						{
							data: data,
							statusCode: statusCode,
							headers: headers,
							asis: asis
						}
					});

					entityos.invoke('app-respond')
				}
			});

			entityos.add(
			{
				name: 'app-start',
				code: function ()
				{
					var request = entityos.get(
					{
						scope: '_request'
					});

					var data = request.body;
					var mode = data.mode;
					var method = data.method;

					if (_.isString(mode))
					{
						mode = {type: mode, status: 'OK'}
					}

					if (mode == undefined)
					{
						mode = {type: 'live', status: 'OK'}
					}

					if (mode.status == undefined)
					{
						mode.status = 'OK';
					}

					mode.status = mode.status.toUpperCase();

					if (mode.type == 'reflect')
					{
						var response = {}

						if (mode.data != undefined)
						{
							response.data = mode.data;
						}
						
						entityos.invoke('util-uuid',
						{
							scope: 'guid',
							context: 'log'
						});

						entityos.invoke('util-uuid',
						{
							scope: 'guid',
							context: 'audit'
						});

						response.data = _.assign(response.data,
						{
							status: mode.status,
							method: method,
							reflected: data,
							guids: entityos.get(
							{
								scope: 'guid'
							})
						});

						entityos.set(
						{
							scope: 'app',
							context: 'response',
							value: response
						});

						entityos.invoke('app-respond');
					}
					else
					{
						entityos.invoke('app-process');
					}
				}
			});

			//-- METHODS

			entityos.add(
			{
				name: 'app-process',
				code: function ()
				{
					var event = entityos.get({scope: '_event'});

					var method = event.method;
					if (method == undefined)
					{
						method = event.method
					}

					if (_.includes(
					[
						'aws-ec2-instances',
						'aws-ec2-instances-change-state',
						'aws-ec2-instances-create',
						'aws-ec2-instance-images',
						'aws-ec2-instance-image-create',
						'aws-ec2-instance-image-delete-oldest',
						'aws-ec2-instance-image-snapshots-orphaned-delete-oldest',
						'aws-ec2-snapshots',
						'aws-ec2-snapshot-export',
						'aws-ec2-security-groups',
						'aws-ec2-security-group-rules',
						'aws-ec2-security-group-rules-change',
						'aws-ec2-security-group-rules-change-public',
						'aws-ec2-subnets',
						'aws-rds-instances',
						'aws-rds-instance-change-state',
						'aws-rds-instance-modify',
						'aws-rds-instance-delete',
						'aws-rds-instance-restore',
						'aws-rds-instance-restore-last-snapshot',
						'aws-rds-instance-snapshots',
						'aws-rds-instance-snapshot-create',
						'aws-rds-instance-snapshot-delete-oldest',
						'aws-rds-subnet-groups',
						'aws-rds-subnet-group-create',
						'aws-rds-cluster-create',
						'aws-rds-clusters',
						'aws-rds-instance-create',
						'aws-elb-load-balancers',
						'aws-elb-load-balancer-listeners',
						'aws-elb-load-balancer-listener-certificates',
						'aws-s3-buckets',
						"aws-s3-bucket-create",
						"aws-s3-bucket-objects",
						"aws-s3-bucket-object-create",
						"aws-s3-bucket-object-get",
						"aws-s3-bucket-object-create-from-entityos",
						'aws-waf-firewalls',
						'aws-waf-firewall-rule-update-based-on-entityos-urls',
						'aws-acm-certificate',
						'aws-route53-zones',
						'aws-route53-zone-records',
						'aws-kms-keys',
						'aws-kms-key',
						'aws-kms-key-create',
						'aws-kms-encrypt',
						'aws-kms-decrypt',
						'aws-bedrock-models',
						'aws-bedrock-model-invoke',
						'aws-iam-role-create',
						'aws-lambda-function-create',
						'aws-lambda-function-update',
						'aws-lambda-function-invoke'
					],
						method))
					{
						if (_.includes(method, 'aws'))
						{
							const infrastructurefactoryAWS= require('infrastructurefactory/infrastructurefactory-aws.js');
							infrastructurefactoryAWS.init();
						}

						entityos.invoke('app-process-' + method)
					}
					else
					{
						entityos.set(
						{
							scope: 'app',
							context: 'response',
							value:
							{
								status: 'ER',
								data: {error: {code: '2', description: 'Not a valid method [' + method + ']'}}
							}
						});

						entityos.invoke('app-respond');
					}
				}
			});

			//-- UTIL

			entityos.add(
			{
				name: 'util-entityos-space-switch-back',
				code: function (param, response)
				{
					if (_.isUndefined(response))
					{
						const data = {switchback: 1}

						entityos.cloud.invoke(
						{
							method: 'CORE_SPACE_MANAGE',
							data: data,
							callback: 'util-entityos-space-switch-back',
							callbackParam: param
						});
					}
					else
					{
						entityos._util.onComplete(param);
					}	
				}
			});

			entityos.add(
			{
				name: 'util-entityos-space-switch-into',
				code: function (param, response)
				{
					if (_.isUndefined(response))
					{
						const spaceID = _.get(param, 'space');

						const data =
						{
							switch: 1,
							superuseroverride: 'Y',
							id: spaceID
						}

						entityos.cloud.invoke(
						{
							method: 'CORE_SPACE_MANAGE',
							data: data,
							callback: 'util-entityos-space-switch-into',
							callbackParam: param
						});
					}
					else
					{
						entityos._util.onComplete(param);
					}	
				}
			});

			entityos.add(
			{
				name: 'util-entityos-space-switch',
				code: function (param)
				{
					const spaceID = _.get(param, 'space');
					const onComplete = _.get(param, 'onComplete');

					entityos.set(
					{
						scope: 'util-entityos-space-switch',
						value: {space: spaceID, onComplete: onComplete}
					});

					entityos.invoke('util-entityos-space-switch-back',
					{
						onComplete: 'util-entityos-space-switch-process'
					});
				}
			});

			entityos.add(
			{
				name: 'util-entityos-space-switch-process',
				code: function (param)
				{
					console.log('1')
					const spaceSwitch = entityos.get(
					{
						scope: 'util-entityos-space-switch'
					});

					entityos.invoke('util-entityos-space-switch-into',
					{
						space: spaceSwitch.space,
						onComplete: 'util-entityos-space-switch-complete'
					});
				}
			});

			entityos.add(
			{
				name: 'util-entityos-space-switch-complete',
				code: function (param)
				{
					const spaceSwitch = entityos.get(
					{
						scope: 'util-entityos-space-switch'
					});

					entityos.set(
					{
						scope: 'util-entityos-space-switch',
						context: 'currentSpace',
						value: spaceSwitch.space
					});

					entityos.invoke(spaceSwitch.onComplete, param);
				}
			});

			// !!!! APP STARTS HERE; Initialise the app; app-init invokes app-start if authentication OK
			entityos.invoke('app-init');
		}	
   });

  	return promise
}