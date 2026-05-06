export const checkPasswordStrength = (password) => {
  let score = 0;
  if (!password) return { score: 0, label: 'Empty', color: 'bg-gray-700' };

  // Length
  if (password.length > 8) score += 1;
  if (password.length > 12) score += 1;

  // Complexity
  if (/[A-Z]/.test(password)) score += 1; // Uppercase
  if (/[a-z]/.test(password)) score += 1; // Lowercase
  if (/[0-9]/.test(password)) score += 1; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special Chars

  // Deductions
  if (/^[a-zA-Z]+$/.test(password)) score -= 1; // Only letters
  if (/^[0-9]+$/.test(password)) score -= 1; // Only numbers

  // Cap score
  score = Math.max(0, Math.min(score, 5));

  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-emerald-500', 'bg-emerald-600'];

  return {
    score,
    label: labels[score],
    color: colors[score]
  };
};
