export const userChoice = '@isUser#Choose@Recognized?eees'
export const userPhone = '@isUser#Use@Phone??'
export const cName = '@isUser#Company@Display???'
export const chatName = '@isUser#Chatname@Display???'
export const chatNum = '@isUser#Chatnum@Display???'
export const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';
export const ExpoPushToken = '@isUser#PushToken@Created?'
export const contains = ({ code, name }, query) => {
  if (code.toLowerCase().includes(query) || name.toLowerCase().includes(query)) {
    return true;
  }

  return false;
};