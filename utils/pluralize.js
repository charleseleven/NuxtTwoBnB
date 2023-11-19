export default (number, singularWord) => {
  const text = `${number} ${singularWord}`;
  if (number === 1 || number === 0) {
    return text;
  } else {
    return `${text}s`;
  }
}