exports.combineResults = (posts, users) => {
  let results = [];
  const postsByUserId = sortPostsByUserId(posts);

  users.map(user => results.push({ ...user, posts: postsByUserId[user.id] }));

  return results;
}

exports.countNumberOfPosts = (posts, users) => {
  let userPostCount = [];
  const postsByUserId = sortPostsByUserId(posts);

  users.map(user => {
    userPostCount[user.id] = user.username + ' napisał(a) ' + postsByUserId[user.id].length + ' postów';
  });

  return userPostCount;
}

exports.getNotUniquePosts = (posts) => {
  let notUniquePosts = [];
  let valuesSoFar = Object.create(null);

  posts.map(post => {
    if (valuesSoFar[post.title] === 1) {
      valuesSoFar[post.title] += 1;
      notUniquePosts.push({ postId: post.id, title: post.title });
    }
    if (!valuesSoFar[post.title]) {
      valuesSoFar[post.title] = 1;
    }
  });

  return notUniquePosts;
}

exports.findClosestUser = (users) => {
  let closestUserList = [];

  users.map(u1 => {
    let tempUsers = users.filter(u2 => { return u2.id !== u1.id });
    let tempClosestUser;
    let shortestDistance;

    tempUsers.map(u2 => {
      let tempDistance = getDistance(u1.address.geo, u2.address.geo);

      if (tempDistance < shortestDistance) {
        shortestDistance = tempDistance;
        tempClosestUser = u2;
      } else if (!shortestDistance) {
        shortestDistance = tempDistance;
        tempClosestUser = u2;
      }
    });

    closestUserList.push({ ...u1, closestUser: tempClosestUser });
  });

  return closestUserList;
}

function sortPostsByUserId(posts) {
  let postsByUserId = [];

  posts.map(post => {
    if (postsByUserId[post.userId]) {
      postsByUserId[post.userId] = [...postsByUserId[post.userId], post];
    } else {
      postsByUserId[post.userId] = [post];
    }
  });

  return postsByUserId;
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