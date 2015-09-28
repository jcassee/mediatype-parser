/*
 * PEG.js grammar for parsing a media type.
 *
 * See RFC 2045: http://tools.ietf.org/html/rfc2045
 */

{
  function parse_mediatype(type, subtype, params) {
    return {
      type: type,
      subtype: subtype,
      params: parse_params(params)
    };
  }

  function parse_params(params) {
    var result = {};
    params.forEach(function (param) {
      addValue(result, param[0], param[1]);
    });
    return result;
  }

  function addValue(object, key, value) {
    if (key in object) {
      if (!Array.isArray(object[key])) object[key] = [object[key]];
      object[key].push(value);
    } else {
      object[key] = value;
    }
  }
}

start
= type:token '/' subtype:token params:param_part* { return parse_mediatype(type, subtype, params); }

param_part
= _ ';' _ param:param { return param; }

param
= key:param_key value:param_value? { return [key, value]; }

param_key
= key:[A-Za-z0-9!#$&.^_`|~+-]+ { return key.join(''); }

param_value
= _ '=' _ string:string { return string; }

string
= ptoken / quoted_string

ptoken
= string:[A-Za-z0-9!#$%&'()*./:<>=?@^_`{}|~+-]+ { return string.join(''); }

quoted_string
= '"' string:([^"\\] / qchar )* '"' { return string.join(''); }

qchar
= '\\' char:. { return char; }

token
= string:[A-Za-z0-9!#$%^&*{}.+-]+ { return string.join(''); }

_ = [ \t\r\n]*
