const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'eu-north-1' });
const dynamoDB = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
};

// GET /bookings - Hämta alla bokningar
module.exports.getAll = async (event) => {
  try {
    const result = await dynamoDB.send(new ScanCommand({
      TableName: TABLE_NAME,
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Could not retrieve bookings' }),
    };
  }
};

// GET /bookings/{id} - Hämta en specifik bokning
module.exports.getOne = async (event) => {
  try {
    const { id } = event.pathParameters;

    const result = await dynamoDB.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    }));

    if (!result.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Booking not found' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Could not retrieve booking' }),
    };
  }
};

// POST /bookings - Skapa ny bokning
module.exports.create = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const id = uuidv4();
    const timestamp = new Date().toISOString();

    const booking = {
      id,
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await dynamoDB.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: booking,
    }));

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(booking),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Could not create booking' }),
    };
  }
};

// PUT /bookings/{id} - Uppdatera bokning
module.exports.update = async (event) => {
  try {
    const { id } = event.pathParameters;
    const data = JSON.parse(event.body);
    const timestamp = new Date().toISOString();

    // Bygg UpdateExpression dynamiskt
    const updateExpressionParts = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    Object.keys(data).forEach((key, index) => {
      updateExpressionParts.push(`#attr${index} = :val${index}`);
      expressionAttributeNames[`#attr${index}`] = key;
      expressionAttributeValues[`:val${index}`] = data[key];
    });

    updateExpressionParts.push(`#updatedAt = :updatedAt`);
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = timestamp;

    await dynamoDB.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: `SET ${updateExpressionParts.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ id, ...data, updatedAt: timestamp }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Could not update booking' }),
    };
  }
};

// DELETE /bookings/{id} - Ta bort bokning
module.exports.delete = async (event) => {
  try {
    const { id } = event.pathParameters;

    await dynamoDB.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id },
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Booking deleted successfully' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Could not delete booking' }),
    };
  }
};
