const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const db = new DynamoDB();

exports.handler = async(event) => {
    // const params = {
    //     TableName: 'users',
    //     Key: marshall({ userId: '123', username: 'bilguun' }),
    // }
    const params = {
        TableName: 'users',
        IndexName: 'age-index',
        KeyConditionExpression: 'userId = :userId AND age = :age',
        ExpressionAttributeValues: { ':userId': { S: '123' }, ':age': { S: '19' } },
        // ExpressionAttributeNames: { '#userId': 'userId', '#age': 'age' }
    }
    const response = await db.query({
        TableName: 'users',
        IndexName: 'phone-index',
        KeyConditionExpression: 'userId = :userId AND phone = :phone',
        ExpressionAttributeValues: {
            ':userId': {
                "S": '123'
            },
            ':phone': {
                "S": '90948778'
            }
        }
    });
    return response;
}

exports.global = async(event) => {
}