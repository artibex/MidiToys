// path.js
const baseUrl = import.meta.env.MODE === 'development'
  ? '' // Empty string for development environment
  : 'MidiToys'; // Replace <repo-name> with the repository name

export { baseUrl };