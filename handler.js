const axios = require('axios');
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const db = new DynamoDB();

exports.dynomadb = async(event) => {
  const character = 'spiderman';
  const setOfGifphies = [];
  const { data } = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=50&offset=0&q=${character}`);
  data.data.map((el, idx) => idx < 5 && setOfGifphies.push({ S: el.url }));
  const params = {
    partition: '123'
  }
  const status = await db.updateItem({
    TableName: 'gifphies',
    Key: marshall(params),
    UpdateExpression: 'SET gifname = :character, urls = :urlsImage',
    ExpressionAttributeValues: {
      ':character': { S: character },
      ':urlsImage': { L: setOfGifphies }
    }
  })
  return status;
}

exports.handler = async(event) => {
  const params = {
    TableName: "gifphies",
    Key: {partition: { "S": '123'}}
  }

  const response = await db.getItem(params);
  return response;
}

exports.putItem = async(event) => {
  const character = "sniper";
}