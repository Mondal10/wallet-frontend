
export const formatCurrency = (locale, currency, value) => {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 4,
    });

    const formattedValue = formatter.format(value);
    return formattedValue;
}

export const formatDate = (dateValue) => {
    const date = new Date(dateValue);

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        // hour12: true,
    });
};
