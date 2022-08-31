const { Schema, model, Types } = require('mongoose');

const moment = require('moment');
// Schema to create a thoughts model
const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true, 
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Schema to create reactions subdocument schema in the Thought model
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
           },
           reactionBody: {
            type: String,
            required: true,
            maxlength: 280
           },
           username: {
            type: String,
            required: true,
           },
           createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
           },
        },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false,
    }
)

// Virtual that retrieves the length of the thought's reactions array field on query
thoughtsSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts; 