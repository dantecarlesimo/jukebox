class SendTextForm 
  include ActiveModel::Model

  attr_accessor :number_to_send_to #Generic NAME Search

  validates_length_of :number_to_send_to, minimum: 10, message: 'At least 2 letters'

  def persisted?
    false
  end

  def send_text_message(current_user_id)
    #number_to_send_to = @number_to_send_to
 
    twilio_sid = ENV["TWILIO_SID"]
    twilio_token = ENV["TWILIO_AUTH_TOKEN"]
    twilio_phone_number = ENV["TWILIO_PHONE_NO"]
   
    link = "localhost:3000/#{current_user_id}/request"
 
    @twilio_client = Twilio::REST::Client.new twilio_sid, twilio_token
 
    @twilio_client.account.sms.messages.create(
      :from => "+1#{twilio_phone_number}",
      :to => @number_to_send_to,
      :body => "Request songs at #{link}"
    )
  end
end

# "This is an message. It gets sent to #{number_to_send_to}"