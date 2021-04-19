const { combineResults, countNumberOfPosts, getNotUniquePosts, findClosestUser } = require('./scripts')

async function initScript() {
  const [posts, users] = await Promise.all([getPosts(), getUsers()]);

  const combinedResults = combineResults(posts, users);
  console.log('1) Połącz dane o postach z danymi o użytkownikach: ', combinedResults);

  const userPostCount = countNumberOfPosts(posts, users);
  console.log('2) Policzy ile postów napisali użytkownicy: ', userPostCount);

  const notUniquePosts = getNotUniquePosts(posts);
  console.log('3) Zwróci listę tytułów postów które nie są unikalne: ', notUniquePosts.length === 0 ? 'Wszystkie posty są unikalne' : notUniquePosts);

  const closestUserList = findClosestUser(users);
  console.log('4) Dla każdego użytkownika znajdzie innego użytkownika, który mieszka najbliżej niego: ', closestUserList)
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