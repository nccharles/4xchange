export const userChoice = '@isUser#Choose@Recognized???'
export const userPhone = '@isUser#Use@Phone???'
export const contains = ({ code, name }, query) => {
  if (code.toLowerCase().includes(query) || name.toLowerCase().includes(query)) {
    return true;
  }

  return false;
};