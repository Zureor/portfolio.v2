export function formatDate(date) {
  // Fixed locale and time zone so server and client render the same string.
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'UTC',
  });
}
