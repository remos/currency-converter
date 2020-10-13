const anyNumberPattern = /^[0-9]*\.?[0-9]*$/;

export const sanitiseAmount = (
  value: string,
  decimals: number,
  truncateDecimals: boolean
): string | false => {
  const inputPattern = new RegExp(
    `^[0-9]*${decimals > 0 ? `\\.?[0-9]{0,${decimals}}` : ''}$`
  );

  const amount = parseFloat(value);

  if (new RegExp(inputPattern).test(value)) {
    return value;
  } else {
    if (!anyNumberPattern.test(value)) {
      return false;
    } else {
      if (truncateDecimals) {
        const index = value.indexOf('.');

        return value.substr(0, decimals > 0 ? index + decimals + 1 : index);
      } else {
        return amount.toFixed(decimals);
      }
    }
  }
};
