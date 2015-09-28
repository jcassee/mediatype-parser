'use strict';

describe('mediaTypeParser', function () {

  it('parses simple media type', function () {
    expect(mediaTypeParser.parse('text/plain')).toEqual({
      type: 'text',
      subtype: 'plain',
      params: {}
    });
  });

  it('parses media type with parameter', function () {
    expect(mediaTypeParser.parse('application/atom+xml; charset=utf-8')).toEqual({
      type: 'application',
      subtype: 'atom+xml',
      params: {
        charset: 'utf-8'
      }
    });
  });

  it('parses media type with quoted string parameter', function () {
    expect(mediaTypeParser.parse('application/atom+xml; charset="utf-8"')).toEqual({
      type: 'application',
      subtype: 'atom+xml',
      params: {
        charset: 'utf-8'
      }
    });
  });

  it('parses media type with multiple parameters', function () {
    expect(mediaTypeParser.parse('text/plain; a=1; b=2')).toEqual({
      type: 'text',
      subtype: 'plain',
      params: {
        a: '1',
        b: '2'
      }
    });
  });

  it('parses media type with repeated parameter', function () {
    expect(mediaTypeParser.parse('text/plain; a=1a; a=1b; b=2')).toEqual({
      type: 'text',
      subtype: 'plain',
      params: {
        a: ['1a', '1b'],
        b: '2'
      }
    });
  });

  it('parses media type with strange whitespace', function () {
    expect(mediaTypeParser.parse('text/plain; \t \n \r a=b')).toEqual({
      type: 'text',
      subtype: 'plain',
      params: {
        a: 'b'
      }
    });
  });
});
