const faker = require('faker');

module.exports = {
  code: 200,
  data: {
    list: [{
      categoryId:001,
      menu: "total",
      hasChildren: 0,
      subMenu: []
    }, {
      categoryId:002,
      menu: "react",
      hasChildren: 1,
      subMenu: [{
        title: "virtualDOM",
        url: "/react/virtualDOM"
      }, {
        title: "diffAgorism",
        url: "/react/diffAgorism"
      }]
    }, {
      categoryId:003,
      menu: "html",
      hasChildren: 0,
      subMenu: []
    }, {
      categoryId:004,
      menu: "css",
      hasChildren: 0,
      subMenu: []
    }]
  }
}
