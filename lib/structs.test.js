'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
var assert = require('assert');
var Fcbuffer = require('fcbuffer');
var ByteBuffer = require('bytebuffer');

var Plasma = require('.');

describe('shorthand', function () {

  it('authority', function _callee() {
    var plasma, ion, authority, pubkey, auth;
    return _regenerator2.default.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            plasma = Plasma({ keyPrefix: 'PUB' });
            _context.next = 3;
            return _regenerator2.default.awrap(plasma.contract('ion'));

          case 3:
            ion = _context.sent;
            authority = ion.fc.structs.authority;
            pubkey = 'PUB6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
            auth = { threshold: 1, keys: [{ key: pubkey, weight: 1 }] };


            assert.deepEqual(authority.fromObject(pubkey), auth);
            assert.deepEqual(authority.fromObject(auth), Object.assign({}, auth, { accounts: [], waits: [] }));

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, null, undefined);
  });

  it('PublicKey sorting', function _callee2() {
    var plasma, ion, authority, pubkeys, authSorted, authUnsorted;
    return _regenerator2.default.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            plasma = Plasma();
            _context2.next = 3;
            return _regenerator2.default.awrap(plasma.contract('ion'));

          case 3:
            ion = _context2.sent;
            authority = ion.fc.structs.authority;
            pubkeys = ['PLASMA7wBGPvBgRVa4wQN2zm5CjgBF6S7tP7R3JavtSa2unHUoVQGhey', 'PLASMA6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'];
            authSorted = { threshold: 1, keys: [{ key: pubkeys[1], weight: 1 }, { key: pubkeys[0], weight: 1 }], accounts: [], waits: [] };
            authUnsorted = { threshold: 1, keys: [{ key: pubkeys[0], weight: 1 }, { key: pubkeys[1], weight: 1 }], accounts: [], waits: []

              // assert.deepEqual(authority.fromObject(pubkey), auth)
            };
            assert.deepEqual(authority.fromObject(authUnsorted), authSorted);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, null, undefined);
  });

  it('public_key', function () {
    var plasma = Plasma({ keyPrefix: 'PUB' });
    var _plasma$fc = plasma.fc,
        structs = _plasma$fc.structs,
        types = _plasma$fc.types;

    var PublicKeyType = types.public_key();
    var pubkey = 'PUB6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
    // 02c0ded2bc1f1305fb0faac5e6c03ee3a1924234985427b6167ca569d13df435cf
    assertSerializer(PublicKeyType, pubkey);
  });

  it('symbol', function () {
    var plasma = Plasma();
    var types = plasma.fc.types;

    var _Symbol = types.symbol();
    assertSerializer(_Symbol, '18,PLASMA', '18,PLASMA', 'PLASMA');
  });

  it('symbol_code', function () {
    var plasma = Plasma({ defaults: true });
    var types = plasma.fc.types;

    var SymbolCode = types.symbol_code();
    assertSerializer(SymbolCode, SymbolCode.toObject());
  });

  it('extended_symbol', function () {
    var plasma = Plasma({ defaults: true });
    var esType = plasma.fc.types.extended_symbol();
    // const esString = esType.toObject()
    assertSerializer(esType, '4,PLASMA@contract');
  });

  it('asset', function () {
    var plasma = Plasma();
    var types = plasma.fc.types;

    var aType = types.asset();
    assertSerializer(aType, '1.000000000000000000 PLASMA');
  });

  it('extended_asset', function () {
    var plasma = Plasma({ defaults: true });
    var eaType = plasma.fc.types.extended_asset();
    assertSerializer(eaType, eaType.toObject());
  });

  it('signature', function () {
    var plasma = Plasma();
    var types = plasma.fc.types;

    var SignatureType = types.signature();
    var signatureString = 'SIG_K1_JwxtqesXpPdaZB9fdoVyzmbWkd8tuX742EQfnQNexTBfqryt2nn9PomT5xwsVnUB4m7KqTgTBQKYf2FTYbhkB5c7Kk9EsH';
    //const signatureString = 'SIG_K1_Jzdpi5RCzHLGsQbpGhndXBzcFs8vT5LHAtWLMxPzBdwRHSmJkcCdVu6oqPUQn1hbGUdErHvxtdSTS1YA73BThQFwV1v4G5'
    assertSerializer(SignatureType, signatureString);
  });
});

describe('Ion Abi', function () {

  function checkContract(name) {
    it(name + ' contract parses', function (done) {
      var plasma = Plasma();

      plasma.contract('ion.token', function (error, ion_token) {
        assert(!error, error);
        assert(ion_token.transfer, 'ion.token contract');
        assert(ion_token.issue, 'ion.token contract');
        done();
      });
    });
  }
  checkContract('ion');
  checkContract('ion.token');

  it('abi', function _callee3() {
    var plasma, abi_def, setabi, obj, json;
    return _regenerator2.default.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            setabi = function setabi(abi) {
              var buf;
              return _regenerator2.default.async(function setabi$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return _regenerator2.default.awrap(plasma.setabi('inita', abi));

                    case 2:
                      // See README
                      buf = plasma.fc.toBuffer('abi_def', abi);
                      _context3.next = 5;
                      return _regenerator2.default.awrap(plasma.setabi('inita', buf));

                    case 5:
                      _context3.next = 7;
                      return _regenerator2.default.awrap(plasma.setabi('inita', buf.toString('hex')));

                    case 7:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, null, this);
            };

            plasma = Plasma({ defaults: true, broadcast: false, sign: false });
            abi_def = plasma.fc.structs.abi_def;
            obj = abi_def.toObject();
            json = JSON.stringify(obj);
            _context4.next = 7;
            return _regenerator2.default.awrap(setabi(obj));

          case 7:
            _context4.next = 9;
            return _regenerator2.default.awrap(setabi(abi_def.fromObject(obj)));

          case 9:
            _context4.next = 11;
            return _regenerator2.default.awrap(setabi(abi_def.fromObject(json)));

          case 11:
            _context4.next = 13;
            return _regenerator2.default.awrap(setabi(abi_def.fromObject(Buffer.from(json).toString('hex'))));

          case 13:
            _context4.next = 15;
            return _regenerator2.default.awrap(setabi(abi_def.fromObject(Buffer.from(json))));

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, null, undefined);
  });
});

describe('Action.data', function () {
  it('json', function () {
    var plasma = Plasma({ forceActionDataHex: false });
    var _plasma$fc2 = plasma.fc,
        structs = _plasma$fc2.structs,
        types = _plasma$fc2.types;

    var value = {
      account: 'ion.token',
      name: 'transfer',
      data: {
        from: 'inita',
        to: 'initb',
        quantity: '1.000000000000000000 PLASMA',
        memo: ''
      },
      authorization: []
    };
    assertSerializer(structs.action, value);
  });

  it('force hex', function () {
    var plasma = Plasma({ forceActionDataHex: true });
    var _plasma$fc3 = plasma.fc,
        structs = _plasma$fc3.structs,
        types = _plasma$fc3.types;

    var value = {
      account: 'ion.token',
      name: 'transfer',
      data: {
        from: 'inita',
        to: 'initb',
        quantity: '1.0000 PLASMA',
        memo: ''
      },
      authorization: []
    };
    assertSerializer(structs.action, value, value);
  });

  it('unknown action', function () {
    var plasma = Plasma({ forceActionDataHex: false });
    var _plasma$fc4 = plasma.fc,
        structs = _plasma$fc4.structs,
        types = _plasma$fc4.types;

    var value = {
      account: 'ion.token',
      name: 'mytype',
      data: '030a0b0c',
      authorization: []
    };
    assert.throws(function () {
      return assertSerializer(structs.action, value);
    }, /Missing ABI action/);
  });
});

function assertSerializer(type, value) {
  var fromObjectResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var toObjectResult = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : fromObjectResult;

  var obj = type.fromObject(value); // tests fromObject
  var buf = Fcbuffer.toBuffer(type, value); // tests appendByteBuffer
  var obj2 = Fcbuffer.fromBuffer(type, buf); // tests fromByteBuffer
  var obj3 = type.toObject(obj); // tests toObject

  if (!fromObjectResult && !toObjectResult) {
    assert.deepEqual(value, obj3, 'serialize object');
    assert.deepEqual(obj3, obj2, 'serialize buffer');
    return;
  }

  if (fromObjectResult) {
    assert(fromObjectResult, obj, 'fromObjectResult');
    assert(fromObjectResult, obj2, 'fromObjectResult');
  }

  if (toObjectResult) {
    assert(toObjectResult, obj3, 'toObjectResult');
  }
}
