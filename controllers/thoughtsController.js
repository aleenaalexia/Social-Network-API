const { User, Thoughts } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },
  // Get one thought
  getSingleThought(req, res) {
    Thoughts.findOne({_id: req.params.thoughtId})
    .select('-__v')
    .then((thought) =>
    !thought
    ? res.status(404).json({ message: 'No thoughts with that ID'})
    : res.json(thought)
    ).catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thoughts.create(req.body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No User find with this ID!" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
  // Update a thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      {_id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((user) =>
    !user
    ? res.status(404).json({ message: 'No thoughts with this ID' })
    : res.json(user)
    ).catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({_id: req.params.thoughtId })
    .then((thought) =>
    !thought
    ? res.status(404).json({ message: 'No thoughts with this ID' })
    : User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    )).then((user) => 
    !user
    ? res.status(404).json({ message: 'Thought deleted, but no user found'})
    : res.json({ message: 'Thought successfully deleted' })
    ).catch((err) => res.status(500).json(err)); 
  },
  // Create a reaction
  createReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    ).then((thought) =>
    !thought
      ? res.status(404).json({ message: "No thoughts with this ID!" })
      : res.json(thought)
  )
  .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    ) .then((thought) =>
    !thought
      ? res.status(404).json({ message: "No thoughts with this ID!" })
      : res.json(thought)
  )
  .catch((err) => res.status(500).json(err));
  },
};