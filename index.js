var to = require('to')

module.exports = function all(selector, doc){
  return to.arr((doc || document).querySelectorAll(selector))
}