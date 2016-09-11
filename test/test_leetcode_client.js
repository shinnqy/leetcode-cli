var assert = require('chai').assert;
var nock = require('nock');

var client = require('../lib/leetcode_client');
var config = require('../lib/config');

describe('leetcode_client', function() {
  describe('#getProblems', function() {
    it('should ok', function(done) {
      nock(config.PROBLEMS_URL)
        .get('/')
        .replyWithFile(200, './test/mock/problems.json');

      client.getProblems(function(e, problems) {
        assert.equal(e, null);
        assert.equal(problems.length, 377);

        done();
      });
    });
  }); // #getProblems

  describe('#getProblem', function() {
    it('should ok', function(done) {
      var problem = {
        id:     389,
        name:   'Find the Difference',
        key:    'find-the-difference',
        link:   'https://leetcode.com/problems/find-the-difference',
        locked: false
      };

      nock('https://leetcode.com')
        .get('/problems/find-the-difference')
        .replyWithFile(200, './test/mock/find-the-difference.html');

      client.getProblem(problem, function(e, problem) {
        assert.equal(e, null);
        assert.equal(problem.totalAC, 15674);
        assert.equal(problem.totalSubmit, 32141);
        assert.equal(problem.desc,
          [
            '',
            'Given two strings s and t which consist of only lowercase letters.',
            '',
            'String t is generated by random shuffling string s and then add one more letter at a random position.',
            '',
            'Find the letter that was added in t.',
            '',
            'Example:',
            '',
            'Input:',
            's = "abcd"',
            't = "abcde"',
            '',
            'Output:',
            'e',
            '',
            'Explanation:',
            "'e' is the letter that was added.",
            ''
          ].join('\r\n'));

        assert.equal(problem.templates.length, 7);

        assert.equal(problem.templates[0].value, 'cpp');
        assert.equal(problem.templates[0].text, 'C++');
        assert.equal(problem.templates[0].defaultCode,
          [
            'class Solution {',
            'public:',
            '    char findTheDifference(string s, string t) {',
            '        ',
            '    }',
            '};'
          ].join('\r\n'));

        assert.equal(problem.templates[1].value, 'java');
        assert.equal(problem.templates[1].text, 'Java');
        assert.equal(problem.templates[1].defaultCode,
          [
            'public class Solution {',
            '    public char findTheDifference(String s, String t) {',
            '        ',
            '    }',
            '}'
          ].join('\r\n'));

        assert.equal(problem.templates[2].value, 'python');
        assert.equal(problem.templates[2].text, 'Python');
        assert.equal(problem.templates[2].defaultCode,
          [
            'class Solution(object):',
            '    def findTheDifference(self, s, t):',
            '        """',
            '        :type s: str',
            '        :type t: str',
            '        :rtype: str',
            '        """'
          ].join('\r\n'));

        assert.equal(problem.templates[3].value, 'c');
        assert.equal(problem.templates[3].text, 'C');
        assert.equal(problem.templates[3].defaultCode,
          [
            'char findTheDifference(char* s, char* t) {',
            '    ',
            '}'
          ].join('\r\n'));

        assert.equal(problem.templates[4].value, 'csharp');
        assert.equal(problem.templates[4].text, 'C#');
        assert.equal(problem.templates[4].defaultCode,
          [
            'public class Solution {',
            '    public char FindTheDifference(string s, string t) {',
            '        ',
            '    }',
            '}'
          ].join('\r\n'));

        assert.equal(problem.templates[5].value, 'javascript');
        assert.equal(problem.templates[5].text, 'JavaScript');
        assert.equal(problem.templates[5].defaultCode,
          [
            '/**',
            ' * @param {string} s',
            ' * @param {string} t',
            ' * @return {character}',
            ' */',
            'var findTheDifference = function(s, t) {',
            '    ',
            '};'
          ].join('\r\n'));

        assert.equal(problem.templates[6].value, 'ruby');
        assert.equal(problem.templates[6].text, 'Ruby');
        assert.equal(problem.templates[6].defaultCode,
          [
            '# @param {String} s',
            '# @param {String} t',
            '# @return {Character}',
            'def find_the_difference(s, t)',
            '    ',
            'end'
          ].join('\r\n'));

        done();
      });
    });
  }); // #getProblem
});
