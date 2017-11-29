export function handleError(error: any) {
  console.error('An error occurred', error);
  console.error('An error message', error.message);
  return Promise.reject(error.message || error);
}
