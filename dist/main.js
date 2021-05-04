/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { combineResults, countNumberOfPosts, getNotUniquePosts, findClosestUser } = __webpack_require__(/*! ./scripts */ \"./scripts.js\")\n\nasync function initScript() {\n  const [posts, users] = await Promise.all([getPosts(), getUsers()]);\n\n  combineResults(posts, users); \n  countNumberOfPosts(posts, users);\n  getNotUniquePosts(posts);\n  findClosestUser(users); \n};\n\nasync function getPosts() {\n  const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')\n    .then(res => { return res.data });\n\n  return posts;\n};\n\nasync function getUsers() {\n  const users = await axios.get('https://jsonplaceholder.typicode.com/users')\n    .then(res => { return res.data });\n\n  return users;\n};\n\ninitScript();\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./scripts.js":
/*!********************!*\
  !*** ./scripts.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.combineResults = (posts, users) => {\r\n  let results = [];\r\n  const usersPosts = sortPostsByUserId(posts);\r\n\r\n  users.forEach(user => {\r\n    const userPosts = getUserPosts(usersPosts, user.id);\r\n\r\n    if (userPosts) {\r\n      results.push({\r\n        ...user,\r\n        posts: userPosts.posts\r\n      })\r\n    } else {\r\n      results.push({\r\n        ...user,\r\n        posts: []\r\n      })\r\n    }\r\n  });\r\n\r\n  console.log('1) Połącz dane o postach z danymi o użytkownikach: ', results)\r\n\r\n  return results;\r\n}\r\n\r\nexports.countNumberOfPosts = (posts, users) => {\r\n  let userPostCount = [];\r\n  const usersPosts = sortPostsByUserId(posts);\r\n\r\n  users.forEach(user => {\r\n    const userPosts = getUserPosts(usersPosts, user.id);\r\n\r\n    if (userPosts) {\r\n      userPostCount.push(user.username + ' napisał(a) ' + userPosts.posts.length + ' postów');\r\n    } else {\r\n      userPostCount.push(user.username + ' napisał(a) 0 postów');\r\n    }\r\n  })\r\n\r\n  console.log('2) Policzy ile postów napisali użytkownicy: ', userPostCount)\r\n\r\n  return userPostCount;\r\n}\r\n\r\nexports.getNotUniquePosts = (posts) => {\r\n  let notUniquePosts = [];\r\n  let valuesSoFar = Object.create(null);\r\n\r\n  posts.forEach(post => {\r\n    if (valuesSoFar[post.title] === 1) {\r\n      valuesSoFar[post.title] += 1;\r\n      notUniquePosts.push({ postId: post.id, title: post.title });\r\n    }\r\n    if (!valuesSoFar[post.title]) {\r\n      valuesSoFar[post.title] = 1;\r\n    }\r\n  });\r\n\r\n  console.log('3) Zwróci listę tytułów postów które nie są unikalne: ', notUniquePosts)\r\n\r\n  return notUniquePosts;\r\n}\r\n\r\nexports.findClosestUser = (users) => {\r\n  let closestUserList = [];\r\n\r\n  users.forEach(u1 => {\r\n    const tempUsers = users.filter(u2 => { return u2.id !== u1.id });\r\n    let tempClosestUser;\r\n    let shortestDistance;\r\n\r\n    tempUsers.forEach(u2 => {\r\n      const tempDistance = getDistance(u1.address.geo, u2.address.geo);\r\n\r\n      if (tempDistance < shortestDistance) {\r\n        shortestDistance = tempDistance;\r\n        tempClosestUser = u2;\r\n      } else if (!shortestDistance) {\r\n        shortestDistance = tempDistance;\r\n        tempClosestUser = u2;\r\n      }\r\n    })\r\n\r\n    closestUserList.push({ ...u1, closestUser: tempClosestUser });\r\n  })\r\n\r\n  console.log('4) Dla każdego użytkownika znajdzie innego użytkownika, który mieszka najbliżej niego: ', closestUserList)\r\n\r\n  return closestUserList;\r\n}\r\n\r\nfunction sortPostsByUserId(posts) {\r\n  let postsByUserId = [];\r\n  let usersPosts = [];\r\n\r\n  posts.forEach(post => {\r\n    if (postsByUserId[post.userId]) {\r\n      postsByUserId[post.userId] = [...postsByUserId[post.userId], post];\r\n    } else {\r\n      postsByUserId[post.userId] = [post];\r\n    }\r\n  })\r\n\r\n  postsByUserId.forEach((posts, index) => {\r\n    usersPosts.push({ posts: posts, userId: index })\r\n  })\r\n\r\n  return usersPosts;\r\n}\r\n\r\nfunction getUserPosts(usersPosts, mappedUserId) {\r\n  return usersPosts.find(({ userId }) => userId === mappedUserId);\r\n}\r\n\r\nfunction getDistance(position1, position2) {\r\n  const lat1 = position1.lat;\r\n  const lon1 = position1.lng;\r\n\r\n  const lat2 = position2.lat;\r\n  const lon2 = position2.lng;\r\n\r\n  const R = 6371000;\r\n\r\n  const φ1 = degreesToRadians(lat1);\r\n  const φ2 = degreesToRadians(lat2);\r\n  const Δφ = degreesToRadians(lat2 - lat1);\r\n  const Δλ = degreesToRadians(lon2 - lon1);\r\n\r\n  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +\r\n    Math.cos(φ1) * Math.cos(φ2) *\r\n    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);\r\n\r\n  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));\r\n\r\n  const d = R * c;\r\n\r\n  return d / 1000;\r\n}\r\n\r\nfunction degreesToRadians(degrees) {\r\n  const pi = Math.PI;\r\n  return degrees * (pi / 180);\r\n}\n\n//# sourceURL=webpack:///./scripts.js?");

/***/ })

/******/ });