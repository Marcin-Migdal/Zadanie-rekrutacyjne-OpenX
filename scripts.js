exports.combineResults = (posts, users) => {
  let results = [];
  const usersPosts = sortPostsByUserId(posts);

  users.forEach(user => {
    const userPosts = getUserPosts(usersPosts, user.id);

    if (userPosts) {
      results.push({
        ...user,
        posts: userPosts.posts
      })
    } else {
      results.push({
        ...user,
        posts: []
      })
    }
  });

  console.log('1) Połącz dane o postach z danymi o użytkownikach: ', results)

  return results;
}

exports.countNumberOfPosts = (posts, users) => {
  let userPostCount = [];
  const usersPosts = sortPostsByUserId(posts);

  users.forEach(user => {
    const userPosts = getUserPosts(usersPosts, user.id);

    if (userPosts) {
      userPostCount.push(user.username + ' napisał(a) ' + userPosts.posts.length + ' postów');
    } else {
      userPostCount.push(user.username + ' napisał(a) 0 postów');
    }
  })

  console.log('2) Policzy ile postów napisali użytkownicy: ', userPostCount)

  return userPostCount;
}

exports.getNotUniquePosts = (posts) => {
  let notUniquePosts = [];
  let valuesSoFar = Object.create(null);

  posts.forEach(post => {
    if (valuesSoFar[post.title] === 1) {
      valuesSoFar[post.title] += 1;
      notUniquePosts.push({ postId: post.id, title: post.title });
    }
    if (!valuesSoFar[post.title]) {
      valuesSoFar[post.title] = 1;
    }
  });

  console.log('3) Zwróci listę tytułów postów które nie są unikalne: ', notUniquePosts)

  return notUniquePosts;
}

exports.findClosestUser = (users) => {
  let closestUserList = [];

  users.forEach(u1 => {
    const tempUsers = users.filter(u2 => { return u2.id !== u1.id });
    let tempClosestUser;
    let shortestDistance;

    tempUsers.forEach(u2 => {
      const tempDistance = getDistance(u1.address.geo, u2.address.geo);

      if (tempDistance < shortestDistance) {
        shortestDistance = tempDistance;
        tempClosestUser = u2;
      } else if (!shortestDistance) {
        shortestDistance = tempDistance;
        tempClosestUser = u2;
      }
    })

    closestUserList.push({ ...u1, closestUser: tempClosestUser });
  })

  console.log('4) Dla każdego użytkownika znajdzie innego użytkownika, który mieszka najbliżej niego: ', closestUserList)

  return closestUserList;
}

function sortPostsByUserId(posts) {
  let postsByUserId = [];
  let usersPosts = [];

  posts.forEach(post => {
    if (postsByUserId[post.userId]) {
      postsByUserId[post.userId] = [...postsByUserId[post.userId], post];
    } else {
      postsByUserId[post.userId] = [post];
    }
  })

  postsByUserId.forEach((posts, index) => {
    usersPosts.push({ posts: posts, userId: index })
  })

  return usersPosts;
}

function getUserPosts(usersPosts, mappedUserId) {
  return usersPosts.find(({ userId }) => userId === mappedUserId);
}

function getDistance(position1, position2) {
  const lat1 = position1.lat;
  const lon1 = position1.lng;

  const lat2 = position2.lat;
  const lon2 = position2.lng;

  const R = 6371000;

  const φ1 = degreesToRadians(lat1);
  const φ2 = degreesToRadians(lat2);
  const Δφ = degreesToRadians(lat2 - lat1);
  const Δλ = degreesToRadians(lon2 - lon1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return d / 1000;
}

function degreesToRadians(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}