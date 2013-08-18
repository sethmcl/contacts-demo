/**
 * @venus-library mocha
 * @venus-code ../../js/prettyPrint.js
 */

describe('PrettyPrint', function () {

  it('should format JSON', function () {
    var input, output, expectedOutput;

    input = '{"contacts":{"2":{"id":2,"firstName":"Santa","lastName":"Claus"}}}';
    expectedOutput = '{\n  "contacts": {\n    "2": {\n      "id": 2,\n      "firstName": "Santa",\n      "lastName": "Claus"\n    }\n  }\n}\n';
    output = JCT.prettyPrint.json(input);

    expect(output).to.be(expectedOutput);
  });

});
