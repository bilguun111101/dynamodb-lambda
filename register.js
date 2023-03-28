const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const db = new DynamoDB();

exports.register = async(event) => {
    const password = bcrypt.hashSync('12345', 10);
    const user = marshall({
        password,
        userId: '123',
        username: 'bilguun',
        FirstName: 'Bilguun',
        lastName: 'Battsengel',
        email: 'bilguun70b1123@gmail.com'
    })
    const params = {
        TableName: 'register',
        Item: user,
    }
    const response = await db.putItem(params);
}

exports.send = async(event) => {
    const {
        email,
        userId,
        username,
    } = event.Records[0].dynamodb.NewImage;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: email.S,
          pass: 'vjxvpyivcxrsgbeh'
        }
      });
      
    const mailOptions = {
        from: email.S,
        to: email.S,
        subject: 'Sending Email using Node.js',
        text: "You signed up on bilguun's service"
    };
      
    const response = transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return error;
        } else {
            return info;
        }
    });
    return response;
}