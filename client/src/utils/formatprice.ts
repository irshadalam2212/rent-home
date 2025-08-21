export function formatPrice(amount: number) {
  // Use Intl.NumberFormat with Indian numbering system
  const formatted = new Intl.NumberFormat('en-IN').format(amount);
  return `₹ ${formatted}/-`;
}

