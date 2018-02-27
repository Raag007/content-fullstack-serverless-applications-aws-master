'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'PrometheonMusic',
    Key: {
      Artist: data.Artist,
      SongTitle: data.SongTitle
    },
  }

  // Delete item to the database
  dynamoDb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify('Item Deleted'),
    };
    callback(null, response);
  });
};
