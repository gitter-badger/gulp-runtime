/*
 * Module dependencies
 */
var path = require('path');
var should = require('should');
var runtime = require('../lib/runtime').Runtime('gulp');

runtime.onStartup(function(){
  this.setPrompt(' > onStartup test')
  this.prompt();
})

runtime.set('first', function First(){
  return ['first!!'];
}).version('0.0.1', 'first command');

var command = runtime.get('first');
var version = runtime.get().version;

function makeTests(cb){

  command
    .should.have.property('_name', 'first');

  (command.handle()[0])
    .should.be.exactly('first!!')
    .and.be.a.String;

  (version.number)
    .should.equal('0.0.1')
    .and.be.a.String;

  (version.comment)
    .should.equal('first command')
    .and.be.a.String;

    cb();
}

makeTests(function(){
  process.stdout.write('\n')
  process.stdin.end();
})
