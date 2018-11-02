// Note: That the functions requires to SendGrid Api Token to be set in project properties under the name 'SENDGRID_API_KEY'

// message = could be a simple String or Stringified HTML
function sendEmailUsingSendGrid(emailTo, subject, message) {
  var properties = PropertiesService.getScriptProperties().getProperties();
  var apiKey = properties['SENDGRID_API_KEY'];

  var url = 'https://api.sendgrid.com/v3/mail/send';
  var successCodes = [200, 201, 202];

  var data = {
    'personalizations': [
      { 'to': [{ 'email': emailTo.trim() }],
        'subject': subject
      }
    ],
    'from': { 'email': 'senderemail@domain.com', 'name': 'Sender' },
    'content': [
      {
        'type': 'text/html',
        'value': message
      }
    ]
  };

  var options = {
    'method': 'post',
    'headers': { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
    'payload': JSON.stringify(data)
  };

  var response = UrlFetchApp.fetch(url, options);
  var code = response.getResponseCode();
  if (!successCodes.include(code)) { throw 'Unable to send Payslips.' }
}
