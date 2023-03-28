const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const axios = require('axios');

exports.api = async(event) => {
    return await new Promise((resolve, reject) => {
        const params = {
            FunctionName: 'arn:aws:lambda:us-east-1:486626735760:function:serverless-test-dev-serverless-test-dev-function2',
            InvocationType: "Event",
            Payload: JSON.stringify({
                search: "batman"
            })
        }
        (async() => {
            await lambda.invoke(params, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            }).promise();
        })()
    })
}

exports.handler = async(event) => {
    const { search } = event;
    const { data } = await axios(`https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=50&offset=0&q=${search}`)
    const save = data.data.map(el => el.url);
    return save;
}