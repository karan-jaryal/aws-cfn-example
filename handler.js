'use strict';
const response = require('cfn-response');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const operations = ['Create', 'Update'];

module.exports.demo = async (event, context) => {
  const type = event["RequestType"];
  const bucket = event["ResourceProperties"]["bucket"]
  try {
    if (operations.includes(type)) {
      const params = {
        Bucket: bucket,
        Key: "demo-folder/"
      };
      await s3.putObject(params).promise();
      await send(event, context, response.SUCCESS, {})
    }
  }
  catch (e) {
    await send(event, context, response.FAILED, e)
  }
};


function send(event, context, res, err) {
  return new Promise(() => response.send(event, context, res, err ? { error: err } : {}))
}
