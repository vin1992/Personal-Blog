let faker = require('faker');

let item = {
  id:faker.random.number(),
  href: 'http://ant.design',
  title: faker.random.words(),
  avatar: faker.image.avatar(),
  description: faker.lorem.words(),
  content: faker.lorem.paragraph(),
  image:faker.random.image(),
}

const list = [];
for (let i = 0; i < 35; i++) {
  list.push(item);
}

module.exports = {
  code: 200,
  data: {
    list
  }
}