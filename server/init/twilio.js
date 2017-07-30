import twilio from 'twilio';
import { sendEth } from './wallet';
import { controllers } from '../db';

const usersController = controllers && controllers.users;

const accountSid = 'AC07a55892cb7605a997522c1a40c0ad58';
const authToken = '6146ce0ef1ca261218de08dba9927f4b';

const client = require('twilio')(accountSid, authToken);

export function sendSMS(messageData) {
  client.messages.create({
    to: messageData.to,
    from: '+19526496387',
    body: messageData.body,
  }, (err, message) => {
    console.log('Text Message sent. SID: ' + message.sid);
  });
}

export function receiveSMS(req, res) {

  const twiml = new twilio.twiml.MessagingResponse();

  // Message will be in format {toPhone} {amount} {pin}
  const messageData = req.body.Body.split(' ');
  if (messageData.length > 1) {
    const fromPhone = req.body.From.substr(2);
    const toPhone = messageData[0];
    const amount = messageData[1];
    const pin = messageData[2];

    usersController.getUserFromPhone(toPhone).then((toUser) => {
      usersController.getUserFromPhone(fromPhone).then((fromUser) => {
        if (fromUser.pin === pin) {
          sendEth(fromUser.blockchain_id, toUser.blockchain_id, amount);
          const randCode = Math.floor(Math.random() * 10000);
          twiml.message('Sending $' + amount + ' to ' + toPhone + '. To confirm, reply with the code: ' + randCode);
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
        }
      });
    });
  } else {
    twiml.message('Transfer successful');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
}
