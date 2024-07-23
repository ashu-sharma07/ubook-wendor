import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

// Send SMS using AWS SNS
export const sendSms = async (number, message) => {
  const snsClient = new SNSClient();
  const params = {
    Message: message,
    PhoneNumber: "+91" + number,
  };

  const command = new PublishCommand(params);
  await snsClient.send(command);
};
