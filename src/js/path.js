// path.js
const baseUrl = import.meta.env.MODE === 'development'
  ? '' // Empty string for development environment
  : 'https://github.com/ArtIbex/MidiToys/tree/main/src'; // Replace <repo-name> with the repository name

export { baseUrl };