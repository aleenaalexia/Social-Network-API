const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true, 
            trimmed: true,
        },
        email: {
            type: String,
            required: true, 
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
              ],
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: "Thought",
            },
          ],
          friends: [
            {
            type: Schema.Types.ObjectId,
            ref: "User",
            },
          ],
    },
    {
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

// Creating a virtual that retrieves the length of the user's 'friends' array field on query
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  // Creating the User model with the UserSchema
  const User = model('User', userSchema);
  
  
  module.exports = User;