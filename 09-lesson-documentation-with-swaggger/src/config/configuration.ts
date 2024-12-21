export default () => ({
  port: parseInt(process.env.PORT),
  secret: process.env.SECRET,
  url: process.env.DB_URL,
});
