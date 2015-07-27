var expect = require('chai').expect
  , client = require('utilise.client')
  , shim   = !client && polyfill()
  , key    = require('utilise.key')
  , all    = require('./')
  , is     = require('utilise.is')
  , node

describe('all', function() {
  
  before(function(){
    /* istanbul ignore next */
    if (!client) { return node = document.body.firstElementChild }
    else {
      node = document.body.appendChild(document.createElement('div'))
      node.className = 'class-all'
      node.appendChild(document.createElement('li'))
    }
  })

  it('should call querySelectorAll with selector', function(){
    expect(all('.class-all li', node)).to.be.eql([node.firstElementChild])
  })

  it('should call querySelectorAll with selector and global document', function(){     
    expect(all('.class-all')).to.be.eql([node])
  })

  it('should pierce boundaries if supports shadow dom', function(){
    var realShadow = document.head.createShadowRoot
      , realQuery = document.querySelectorAll
      , result 

    document.querySelectorAll = function(selector){ result = selector; return [] }
    document.head.createShadowRoot = true
    all('.class-all li')
    expect(result).to.be.eql('html /deep/ .class-all li')

    document.head.createShadowRoot = realShadow
    document.querySelectorAll = realQuery
  })

})

function polyfill(){
  window = require("jsdom").jsdom('<div class="class-all"><li></li></div>').defaultView
  global.document = window.document
}