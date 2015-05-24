var expect = require('chai').expect
  , key    = require('key')
  , all    = require('./')
  , is     = require('is')

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
      
    key('document.head.createShadowRoot', false)(global)
    key('document.querySelectorAll', fn)(global)
    expect(is.arr(all(selector))).to.be.true
    expect(result).to.equal(selector)
  })

  it('should call querySelectorAll with selector and global document and prefix', function(){
    var selector = '.class'
      , result 
      , fn = function(selector){ result = selector; return arguments }
      
    key('document.head.createShadowRoot', true)(global)
    key('document.querySelectorAll', fn)(global)
    expect(is.arr(all(selector))).to.be.true
    expect(result).to.equal('html /deep/ ' + selector)
  })
})