require 'twilio-ruby'

account_sid = 'ACdd3de881cdefeb09e36353166e7bd802'
auth_token = 'eb2a18f7dbcd287bf8bdaf48401267ef'

Twilio.configure do |config|
  config.account_sid = account_sid
  config.auth_token = auth_token
end