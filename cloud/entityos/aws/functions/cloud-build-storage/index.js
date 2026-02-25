/*
	entityOS Cloud Build Storage
	
	- Published @ https://github.com/ibcom-lab/entityos-cloud-build

	Help
	- https://learn.entityos.cloud/learn-function-automation
	
  	To run local use https://www.npmjs.com/package/lambda-local

	Notes
	- Use entityos-aws to create the:
		- Aurora Cluster (u/p)
		- Instance in the cluster (url)

	Run:
	- Need to run the commands in the VPC on on AWS to access the Aurora database etc
		- See github-repo:entityos-aws/events/lab/cloud-build.md

	Run Tests:
	- lambda-local -l index.js -t 9000 -e events/event-cloud-build-storage-relational-data-execute-drop-data-base-lab.json
	- lambda-local -l index.js -t 9000 -e events/event-cloud-build-storage-relational-data-base-create-lab.json
	- lambda-local -l index.js -t 9000 -e events/event-cloud-build-storage-relational-data-model-create-lab.json
	- lambda-local -l index.js -t 9000 -e events/event-cloud-build-storage-relational-data-model-update-lab.json

	- lambda-local -l index.js -t 9000 -e events/event-cloud-build-storage-relational-data-model-initialise-genesis-lab.json
	- lambda-local -l index.js -t 9000 -e events/event-cloud-build-storage-relational-data-model-information-lab.json
	
	- lambda-local -l index.js -t 9000 -e events/event-cloud-build-storage-relational-data-execute-lab.json
	- lambda-local -l index.js -t 9000 -e events/event-cloud-build-storage-relational-data-query-lab.json

	- lambda-local -l index.js -t 9000 -e events/event-cloud-build-storage-relational-data-model-initialise-data-lab.json
		simulate: true

	zip -r ../cloud-build-storage-???.zip *
*/

exports.handler = function (event, context, callback)
{
	var entityos = require('entityos');
	var _ = require('lodash')
	var moment = require('moment');

	entityos.set(
	{
		scope: '_event',
		value: event
	});

	entityos.set(
	{
		scope: '_callback',
		value: callback
	});

	entityos.init(main);

	function main(err, data)
	{
		const storagefactory = require('storagefactory/storagefactory-relational.js');
		storagefactory.init();

		entityos.add(
		{
			name: 'app-start',
			code: function (param)
			{
				var event = entityos.get(
				{
					scope: '_event'
				});

				var method;

				if (_.isObject(event))
				{
					method = event.method;

					if (method == undefined)
					{
						method = event.controller;
					}
				}

				if (method != undefined)
				{
					entityos._util.testing.data(method, 'Based on event data invoking method');
					entityos.invoke(method);
				}
			}
		});

		//-- UTIL

		entityos.add(
		{
			name: 'util-end',
			code: function (data, error)
			{
				var callback = entityos.get(
				{
					scope: '_callback'
				});

				if (error == undefined) {error = null}

				if (callback != undefined)
				{
					callback(error, data);
				}
			}
		});

		entityos.add(
        {
            name: 'util-save-to-file',
            code: function (param, data)
            {
                var event = entityos.get({scope: '_event'});
                var filename = entityos._util.param.get(param, 'filename', {default: 'data.json'}).value;
                var scope = entityos._util.param.get(param, 'scope', {default: 'util-save-to-file'}).value;
                var fileData = entityos._util.param.get(param, 'fileData').value;
                var saveAsJSON = entityos._util.param.get(param, 'saveAsJSON', {default: true}).value;
                var saveAsCSV = entityos._util.param.get(param, 'saveAsCSV', {default: false}).value;
                
                if (fileData == undefined)
                {
                    fileData = entityos.get({scope: scope})
                }

                if (fileData != undefined)
                {
                    const fs = require('fs');

                    var fileDataSave = fileData;
                    
                    if (saveAsJSON)
                    {
                        try
                        {
                            fileDataSave = JSON.stringify(fileDataSave, null, 4);
                        }
                        catch (error) {}
                    }

                    if (saveAsCSV)
                    {
                        var _fileDataSave = [];

                        var first = _.first(fileData);

                        if (first != undefined)
                        {
                            var _data = [];

                            for (var key in first)
                            {
                                if (first.hasOwnProperty(key) && !_.startsWith(key, '_'))
                                {
                                    _data.push('"' + key + '"');
                                }  
                            }

                            _fileDataSave.push(_data.join(','));
                            _fileDataSave.push('\r\n');
                        }

                        _.each(fileData, function (data, d)
                        {
                            var _data = [];

                            for (var key in data)
                            {
                                if (data.hasOwnProperty(key) && !_.startsWith(key, '_'))
                                {
                                    _data.push('"' + _.unescape(data[key]) + '"');
                                }  
                            }

                            _fileDataSave.push(_data.join(','));
                            _fileDataSave.push('\r\n');
                        });

                        fileDataSave = _fileDataSave.join('');	
                    } 	

                    try
                    {
                        fs.writeFileSync(filename, fileDataSave);
                        entityos._util.onComplete(param);
                    }
                    catch (error)
                    {
                        console.error(err);
                        entityos._util.onComplete(param);
                    }
                }
            }
        });
	
		entityos.invoke('app-start');
	}
}