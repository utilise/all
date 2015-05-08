var expect = require('chai').expect
  , all = require('./')
  , is = require('is')

describe('all', function() {

  it('should call querySelectorAll with selector', function(){
    var selector = '.class'
      , result 
      , fn = function(selector){ result = selector; return arguments }
      , doc = { querySelectorAll: fn }

    expect(is.arr(all(selector, doc))).to.be.true
    expect(result).to.equal(selector)
  })

  it('should call querySelectorAll with selector and global document', function(){
    var selector = '.class'
      , result 
      , fn = function(selector){ result = selector; return arguments }
      , doc = { querySelectorAll: fn }

    global.document = doc
    expect(is.arr(all(selector))).to.be.true
    expect(result).to.equal(selector)
  })

})