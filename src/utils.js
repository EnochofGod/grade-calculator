// Shared helper functions for forms and report components

export const handleChange = (setter) => (e) => {
  const { name, value } = e.target;
  setter(prev => ({ ...prev, [name]: value }));
};

export const parseIntOrZero = (value) => {
  const parsed = parseInt(value);
  return isNaN(parsed) ? 0 : parsed;
};
