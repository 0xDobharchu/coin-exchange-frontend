
const getErrorMessageFromCode = (error) => {
  const messageFromApi = error.response?.data?.message;
  const { code } = error.response?.data;
  const codeInt = parseInt(code, 10);
  return messageFromApi || `Error code ${codeInt}`;
};
export default getErrorMessageFromCode;
