/**
 * Sample file for environment definition.
 * Duplicate this file and change "sample" to the environment that fits your purpose (e.g. "env.develop.js").
 */
export default {
  key: 'secret',
  port: 8080,
  database_url: 'mongodb://localhost:27017/sample_db', // database name
  token_duration: 1440 * 60,
}
