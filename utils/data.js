const thoughtText = [
    'I have random thoughts.', 
    'Here is another thought that is random.',
    'Example thoughts here...',
    'More thoughts',
];

const usernames = [
    'thoughts2342',
    'randomuser',
    'myusername34',
    'aleenaalexia',
    'user22444',
];

// Get a random item given an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets random username
const getRandomUser = () =>
`${getRandomItem(usernames)}`;

// Get random thoughts to assign to User object
const getRandomThought = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thought: getRandomItem(thoughtText),
        });
    }
    return results;
};

module.exports = { getRandomUser, getRandomThought };