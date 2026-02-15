
export const formatCurrency = (locale, currency, value) => {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    });

    const formattedValue = formatter.format(value);
    return formattedValue;
}
