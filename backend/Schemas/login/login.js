const { gql, ApolloError } = require("apollo-server-express");
//const { isValidMongooseId, isValidEmail } = require("lib/validation");
const { createToken, decodeToken } = require("lib/jwt");
const { encrypt, decrypt, decryptAES, encryptAes } = require("lib/encrypt");
const Login = require("models/login");
const ProfileData = require("models/user");
//const ForgotPassword = require("models/forgot");
const mailHandlers = require("../../services/email/emailsHandler");
const CLIENT_HOST_NAME = "http://localhost:3000";

const loginTypeDefs = gql`
  #Root query
  extend type Query {
    # Login User
    loginUser(email: String, password: String): ProfileData

    # Forgot user password
    forgotPassword(email: String): Response

    # Verify Token
    verifyToken(token: String): Reset
  }

  #ProfileData
  type ProfileData {
    id: ID
    success: Boolean
    message: String
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    roleId: Role
    password: String
    active: Boolean
    createdOn: DateTime
    modifiedOn: DateTime
    token: String
  }

  #Root mutation
  extend type Mutation {
    #Update Password
    resetPassword(token: String, password: String, newPassword: String): Reset
  }

  type Role {
    name: String
  }
  #Response
  type Response {
    success: Boolean
    message: String
  }

  #Response
  type Reset {
    token: String
    newPassword: String
    success: Boolean
  }
`;

const loginResolvers = () => {
  const resolvers = {
    ProfileData: {
      token: async (parent, _, {}) => {
        if (parent._id) {
          let token = createToken(parent._id);
          return token;
        }
      },
    },
    Query: {
      //Login User
      loginUser: async (_, args, { req }) => {
        console.log('loginUser called');
        args.password = encrypt(args.password);
        const user = await ProfileData.find(args)
          .populate("roleId")
          .exec();
        if (user.length > 0) {
          user[0].success = true;
          user[0].message = "Login Succesfull";
          return user[0];
        } else {
          const data = { success: false, message: "Invalid Login" };
          return data;
        }
      },
      // Verify Token
      verifyToken: async (_, args, { req }) => {
        const user = await ProfileData.find({
          magicLink: args.token,
        }).exec();

        if (user.length !== 0) {
          return { success: true };
        } else {
          return { success: false };
        }
      },
      // Reset password Link request to email
      forgotPassword: async (_, args, { req }) => {
        const user = await ProfileData.findOne(args).exec();
        if (user) {
          user.success = true;
          user.message =
            "Reset password link has been sent to your email address.";
          let token = createToken(user._id);
          const emailData = {
            first_name: user.firstName,
            user_email: user.email,
            magic_link: `${
              process.env.CLIENT_URL
            }/verifyToken?resetToken=${token}`,
          };

          await ProfileData.update({ _id: user._id }, { magicLink: token });
          mailHandlers.passwordResetEmail(emailData);
          return user;
        } else {
          const data = { success: false, message: "Invalid email" };
          return data;
        }
      },
    },

    Mutation: {
      // Reset Password
      resetPassword: async (_, args, { db, req }) => {
        let token = await decodeToken(args.token);
        let newPassword = encrypt(args.newPassword);

        const user = await ProfileData.find({
          _id: token.id,
          magicLink: args.token,
        }).exec();

        if (user.length !== 0) {
          await ProfileData.updateOne(
            { _id: token.id },
            { password: newPassword, magicLink: "" }
          );

          return { success: true };
        } else {
          return { success: false, message: "Token Expired" };
        }
      },
    },
  };
  return resolvers;
};

module.exports = { loginTypeDefs, loginResolvers: loginResolvers() };
