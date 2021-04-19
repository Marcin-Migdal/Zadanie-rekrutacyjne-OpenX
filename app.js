const { combineResults, countNumberOfPosts, getNotUniquePosts, findClosestUser } = require('./scripts')

async function initScript() {
  const [posts, users] = await Promise.all([getPosts(), getUsers()]);

  combineResults(posts, users); 
  countNumberOfPosts(posts, users);
  getNotUniquePosts(posts);
  findClosestUser(users); 
};

async function getPosts() {
  const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => { return res.data });

  return posts;
};

async function getUsers() {
  const users = await axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => { return res.data });

  return users;
};

initScript();