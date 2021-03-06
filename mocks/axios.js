const mockPostsResponse = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 2,
    "id": 3,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    "userId": 2,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
  {
    "userId": 2,
    "id": 5,
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  },
  {
    "userId": 2,
    "id": 6,
    "title": "dolorem eum magni eos aperiam quia",
    "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
  },
  {
    "userId": 3,
    "id": 7,
    "title": "magnam facilis autem",
    "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
  },
  {
    "userId": 3,
    "id": 8,
    "title": "magnam facilis autem",
    "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
  },
  {
    "userId": 3,
    "id": 9,
    "title": "nesciunt iure omnis dolorem tempora et accusantium",
    "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
  },
  {
    "userId": 5,
    "id": 10,
    "title": "optio molestias id quia eum",
    "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
  }
];

const mockUsersResponse = [
  {
    "id": 1,
    "username": "Bret",
    "address": {
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
  },
  {
    "id": 2,
    "username": "Antonette",
    "address": {
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
  },
  {
    "id": 3,
    "username": "Samantha",
    "address": {
      "geo": {
        "lat": "-68.6102",
        "lng": "-47.0653"
      }
    },
  },
  {
    "id": 4,
    "username": "Karianne",
    "address": {
      "geo": {
        "lat": "29.4572",
        "lng": "-164.2990"
      }
    },
  },
  {
    "id": 5,
    "username": "Andy",
    "address": {
      "geo": {
        "lat": "-38.2386",
        "lng": "57.2232"
      }
    },
  }
];

exports.getPosts = () => Promise.resolve({ data: mockPostsResponse });
exports.getUsers = () => Promise.resolve({ data: mockUsersResponse });