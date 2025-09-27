
export const formatCurrency = (amount: number, options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', ...options }).format(amount);
};
