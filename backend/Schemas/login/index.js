const { loginTypeDefs, loginResolvers } = require("./login");

module.exports = {
  typeDefs: [loginTypeDefs],
  resolvers: [loginResolvers],
};
