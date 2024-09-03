const numberReg = /[0-9]/g;

export const validateInputNumber = (
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const inputValue = e.target.value;
  const validCharacters = inputValue.match(numberReg);
  let validInput = '';
  if (validCharacters?.length !== inputValue.length) {
    validCharacters?.forEach((char) => {validInput += char});
    return Number(validInput);
  }
  return Number(inputValue);
};
