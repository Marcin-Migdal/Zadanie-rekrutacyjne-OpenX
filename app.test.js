const { getPosts, getUsers } = require('./mocks/axios');
const { combineResults, countNumberOfPosts, getNotUniquePosts, findClosestUser } = require('./scripts');

function getUsersPostsAmount(posts) {
  let amountOfPostsByUserId = [];
  let usersPostsAmount = []

  posts.forEach(post => {
    if (amountOfPostsByUserId[post.userId]) {
      amountOfPostsByUserId[post.userId] += 1;
    } else {
      amountOfPostsByUserId[post.userId] = 1;
    }
  });

  amountOfPostsByUserId.forEach((postsAmount, index) => {
    usersPostsAmount.push({ postsAmount: postsAmount, userId: index })
  })

  return usersPostsAmount;
}

function getAmountOfPosts(usersPostsAmount, mappedUserId) {
  const amountOfPosts = usersPostsAmount.find(({ userId }) => userId === mappedUserId);
  
  if (amountOfPosts) {
    return amountOfPosts.postsAmount
  } else {
    return 0
  }
}

test('should combine users and posts', async () => {
  const posts = await getPosts().then(res => { return res.data });
  const users = await getUsers().then(res => { return res.data });

  const combinedResults = combineResults(posts, users);
  const usersPostsAmount = getUsersPostsAmount(posts);

  combinedResults.forEach(user => {
    expect(user.posts.length)
      .toBe(getAmountOfPosts(usersPostsAmount, user.id))
  });
})

test('should count amount of posts that user made', async () => {
  const posts = await getPosts().then(res => { return res.data });
  const users = await getUsers().then(res => { return res.data });

  const numberOfPosts = countNumberOfPosts(posts, users);
  const usersPostsAmount = getUsersPostsAmount(posts);

  users.forEach((user, index) => {
    expect(numberOfPosts[index])
      .toBe(user.username + ' napisał(a) ' + getAmountOfPosts(usersPostsAmount, user.id) + ' postów')
  })
})

test('should find not unique post by title', async () => {
  const posts = await getPosts().then(res => { return res.data });

  const notUniquePosts = getNotUniquePosts(posts);

  expect(notUniquePosts.length).toBe(2);
})

test('should find closest user for each user ', async () => {
  const users = await getUsers().then(res => { return res.data });

  const closestUser = findClosestUser(users);
  const expectedId = [5, 3, 2, 1, 1];

  closestUser.forEach(e => console.log(e.closestUser.id))

  closestUser.forEach((res, index) => {
    expect(res.closestUser.id)
      .toBe(expectedId[index])
  });

})