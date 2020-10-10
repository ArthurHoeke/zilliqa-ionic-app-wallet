(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-home-home-module"],{

/***/ "./node_modules/@zilliqa-js/viewblock/dist/config.js":
/*!***********************************************************!*\
  !*** ./node_modules/@zilliqa-js/viewblock/dist/config.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NETWORK_URLS = void 0;
var NETWORK_URLS = {
  mainnet: 'https://api.zilliqa.com',
  testnet: 'https://dev-api.zilliqa.com'
};
exports.NETWORK_URLS = NETWORK_URLS;

/***/ }),

/***/ "./node_modules/@zilliqa-js/viewblock/dist/fn/toHex.js":
/*!*************************************************************!*\
  !*** ./node_modules/@zilliqa-js/viewblock/dist/fn/toHex.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = __webpack_require__(/*! @zilliqa-js/crypto */ "./node_modules/@zilliqa-js/viewblock/node_modules/@zilliqa-js/crypto/dist/index.umd.js");

var zilReg = /^zil1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$/;

var _default = function _default(address) {
  if (address.startsWith('0x')) {
    return address.substr(2);
  }

  if (!address.match(zilReg)) {
    return address;
  }

  var hex = (0, _crypto.fromBech32Address)(address);
  return hex.substr(2);
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/@zilliqa-js/viewblock/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@zilliqa-js/viewblock/dist/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rpc = _interopRequireDefault(__webpack_require__(/*! ./rpc */ "./node_modules/@zilliqa-js/viewblock/dist/rpc.js"));

var _viewblock = _interopRequireDefault(__webpack_require__(/*! ./viewblock */ "./node_modules/@zilliqa-js/viewblock/dist/viewblock.js"));

var _socket = _interopRequireDefault(__webpack_require__(/*! ./socket */ "./node_modules/@zilliqa-js/viewblock/dist/socket.js"));

var _toHex = _interopRequireDefault(__webpack_require__(/*! ./fn/toHex */ "./node_modules/@zilliqa-js/viewblock/dist/fn/toHex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      apiKey = _ref.apiKey,
      _ref$network = _ref.network,
      network = _ref$network === void 0 ? 'mainnet' : _ref$network,
      agent = _ref.agent;

  var isAnon = !apiKey;

  var getOpts = function getOpts(opts) {
    return _objectSpread({
      apiKey: apiKey,
      network: network,
      agent: agent
    }, opts);
  };

  var rpcMethods = {
    createTx: function createTx(payload, opts) {
      return (0, _rpc.default)({
        method: 'CreateTransaction',
        params: [payload]
      }, getOpts(opts)).then(function (res) {
        return {
          msg: res.Info,
          hash: res.TranID
        };
      });
    },
    getGasPrice: function getGasPrice(opts) {
      return (0, _rpc.default)('GetMinimumGasPrice', getOpts(opts));
    },
    getSCInit: function getSCInit(hash, opts) {
      return (0, _rpc.default)({
        method: 'GetSmartContractInit',
        params: [(0, _toHex.default)(hash)]
      }, getOpts(opts));
    },
    getSCState: function getSCState(body, opts) {
      var isHash = typeof body === 'string';

      var _ref2 = isHash ? {
        address: body
      } : body,
          address = _ref2.address,
          _ref2$name = _ref2.name,
          name = _ref2$name === void 0 ? '' : _ref2$name,
          _ref2$indices = _ref2.indices,
          indices = _ref2$indices === void 0 ? [] : _ref2$indices;

      return (0, _rpc.default)({
        method: 'GetSmartContractSubState',
        params: [(0, _toHex.default)(address), name, indices]
      }, getOpts(opts));
    }
  };

  if (isAnon) {
    console.warn("Disabling main library features: No API credentials provided.\nGet them on https://viewblock.io by creating a free account and an API key.");
    return rpcMethods;
  }

  return _objectSpread(_objectSpread({}, rpcMethods), {}, {
    subscribe: (0, _socket.default)(apiKey),
    getBlock: function getBlock(height, opts) {
      return (0, _viewblock.default)("/v1/zilliqa/blocks/".concat(height), getOpts(opts));
    },
    getBlockTxs: function getBlockTxs(height) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return (0, _viewblock.default)("/v1/zilliqa/blocks/".concat(height, "/txs"), getOpts(_objectSpread(_objectSpread({}, opts), {}, {
        query: {
          page: opts.page
        }
      })));
    },
    getAddress: function getAddress(hash, opts) {
      return (0, _viewblock.default)("/v1/zilliqa/addresses/".concat(hash), getOpts(opts)).then(function (res) {
        return res && res[0];
      });
    },
    getAddressTxs: function getAddressTxs(hash) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return (0, _viewblock.default)("/v2/zilliqa/addresses/".concat(hash, "/txs"), getOpts(_objectSpread(_objectSpread({}, opts), {}, {
        query: {
          page: opts.page
        }
      })));
    },
    getTx: function getTx(hash, opts) {
      return (0, _viewblock.default)("/v1/zilliqa/txs/".concat(hash), getOpts(opts));
    }
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/@zilliqa-js/viewblock/dist/rpc.js":
/*!********************************************************!*\
  !*** ./node_modules/@zilliqa-js/viewblock/dist/rpc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeFetch = _interopRequireDefault(__webpack_require__(/*! node-fetch */ "./node_modules/@zilliqa-js/viewblock/node_modules/node-fetch/browser.js"));

var _config = __webpack_require__(/*! ./config */ "./node_modules/@zilliqa-js/viewblock/dist/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(body, _ref) {
  var network = _ref.network,
      _ref$agent = _ref.agent,
      agent = _ref$agent === void 0 ? null : _ref$agent;
  var url = _config.NETWORK_URLS[network];
  var payload = typeof body === 'string' ? {
    method: body
  } : body;
  return (0, _nodeFetch.default)(url, {
    method: 'POST',
    body: JSON.stringify(_objectSpread({
      id: 1,
      jsonrpc: '2.0',
      params: ['']
    }, payload)),
    headers: {
      'Content-Type': 'json'
    },
    timeout: 1e3 * 30,
    agent: agent
  }).then(function (res) {
    return res.json();
  }).then(function (json) {
    var _ref2 = json || {},
        error = _ref2.error,
        result = _ref2.result;

    if (error) {
      throw new Error(error.message);
    }

    return result;
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/@zilliqa-js/viewblock/dist/socket.js":
/*!***********************************************************!*\
  !*** ./node_modules/@zilliqa-js/viewblock/dist/socket.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socketclusterClient = _interopRequireDefault(__webpack_require__(/*! socketcluster-client */ "./node_modules/socketcluster-client/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  hostname: 'live.viewblock.io',
  path: '/',
  port: 444,
  secure: true,
  connectTimeout: 10e3,
  autoConnect: true,
  autoReconnect: true,
  autoReconnectOptions: {
    initialDelay: 1e3,
    randomness: 5e3,
    multiplier: 1.1,
    maxDelay: 20e3
  }
};
var validEvents = {
  block: 1,
  transaction: 1,
  addressTx: 1,
  contractEvent: 1
};

var getSocket = function getSocket(key) {
  return new Promise(function (resolve, reject) {
    var socket = _socketclusterClient.default.create(options);

    socket.on('connect', function () {
      socket.emit('login', {
        key: key
      }, function (errMsg) {
        if (errMsg) {
          return reject(new Error(errMsg));
        }

        resolve(socket);
      });
    });
    socket.on('error', console.log);
    return socket;
  });
};

var _default = function _default(apiKey) {
  return function (payload, cb) {
    return getSocket(apiKey).then(function (socket) {
      if (!payload) {
        throw new Error('Invalid subscription.');
      }

      var event = payload.event || payload;

      if (!validEvents[event]) {
        throw new Error('Invalid subscription.');
      }

      var param = payload.param;
      var key = "zilliqa:".concat(event).concat(param ? ":".concat(param) : '');
      socket.subscribe(key).watch(cb);
    });
  };
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/@zilliqa-js/viewblock/dist/viewblock.js":
/*!**************************************************************!*\
  !*** ./node_modules/@zilliqa-js/viewblock/dist/viewblock.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeFetch = _interopRequireDefault(__webpack_require__(/*! node-fetch */ "./node_modules/@zilliqa-js/viewblock/node_modules/node-fetch/browser.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BASE_URL = 'https://api.viewblock.io';

var makeQuery = function makeQuery(params) {
  var keys = Object.keys(params).filter(function (k) {
    return params[k];
  });
  return "".concat(keys.length ? '?' : '').concat(keys.map(function (key) {
    return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(params[key]));
  }, '').join('&'));
};

var _default = function _default(path, _ref) {
  var apiKey = _ref.apiKey,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? {} : _ref$query,
      network = _ref.network,
      _ref$agent = _ref.agent,
      agent = _ref$agent === void 0 ? null : _ref$agent;
  var q = makeQuery(_objectSpread(_objectSpread({}, query), {}, {
    network: network
  }));
  return (0, _nodeFetch.default)("".concat(BASE_URL).concat(path).concat(q), {
    headers: {
      'Content-Type': 'json',
      'X-APIKEY': apiKey
    },
    timeout: 1e3 * 30,
    agent: agent
  }).then(function (res) {
    return res.json();
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/@zilliqa-js/viewblock/node_modules/@zilliqa-js/crypto/dist/index.umd.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@zilliqa-js/viewblock/node_modules/@zilliqa-js/crypto/dist/index.umd.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {(function (global, factory) {
   true ? factory(exports, __webpack_require__(/*! @zilliqa-js/util */ "./node_modules/@zilliqa-js/viewblock/node_modules/@zilliqa-js/util/dist/index.umd.js"), __webpack_require__(/*! elliptic */ "./node_modules/elliptic/lib/elliptic.js"), __webpack_require__(/*! hash.js */ "./node_modules/hash.js/lib/hash.js"), __webpack_require__(/*! hmac-drbg */ "./node_modules/hmac-drbg/lib/hmac-drbg.js"), __webpack_require__(/*! scryptsy */ "./node_modules/scryptsy/lib/index.js"), __webpack_require__(/*! aes-js */ "./node_modules/aes-js/index.js"), __webpack_require__(/*! pbkdf2 */ "./node_modules/pbkdf2/browser.js"), __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js")) :
  undefined;
}(this, (function (exports,util,elliptic,hashjs,DRBG,scryptsy,aes,pbkdf2,uuid) { 'use strict';

  elliptic = elliptic && elliptic.hasOwnProperty('default') ? elliptic['default'] : elliptic;
  hashjs = hashjs && hashjs.hasOwnProperty('default') ? hashjs['default'] : hashjs;
  DRBG = DRBG && DRBG.hasOwnProperty('default') ? DRBG['default'] : DRBG;
  scryptsy = scryptsy && scryptsy.hasOwnProperty('default') ? scryptsy['default'] : scryptsy;
  aes = aes && aes.hasOwnProperty('default') ? aes['default'] : aes;
  uuid = uuid && uuid.hasOwnProperty('default') ? uuid['default'] : uuid;

  //  This file is part of Zilliqa-Javascript-Library.
  //
  //  This program is free software: you can redistribute it and/or modify
  //  it under the terms of the GNU General Public License as published by
  //  the Free Software Foundation, either version 3 of the License, or
  //  (at your option) any later version.
  //
  //   This program is distributed in the hope that it will be useful,
  //   but WITHOUT ANY WARRANTY; without even the implied warranty of
  //   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  //   GNU General Public License for more details.
  //
  //   You should have received a copy of the GNU General Public License
  //   along with this program.  If not, see <https://www.gnu.org/licenses/>.
  /**
   * randomBytes
   *
   * Uses JS-native CSPRNG to generate a specified number of bytes.
   * NOTE: this method throws if no PRNG is available.
   *
   * @param {number} bytes
   * @returns {string}
   */
  var randomBytes = function (bytes) {
      var randBz;
      if (typeof window !== 'undefined' &&
          window.crypto &&
          window.crypto.getRandomValues) {
          randBz = window.crypto.getRandomValues(new Uint8Array(bytes));
      }
      else if (true) {
          randBz = __webpack_require__(/*! crypto */ "./node_modules/crypto-browserify/index.js").randomBytes(bytes);
      }
      else {}
      var randStr = '';
      for (var i = 0; i < bytes; i++) {
          randStr += ('00' + randBz[i].toString(16)).slice(-2);
      }
      return randStr;
  };

  //  This file is part of Zilliqa-Javascript-Library.
  var Signature = /** @class */ (function () {
      function Signature(options) {
          this.r = typeof options.r === 'string' ? new util.BN(options.r, 16) : options.r;
          this.s = typeof options.s === 'string' ? new util.BN(options.s, 16) : options.s;
      }
      return Signature;
  }());

  //  This file is part of Zilliqa-Javascript-Library.
  var secp256k1 = elliptic.ec('secp256k1');
  var curve = secp256k1.curve;
  var PRIVKEY_SIZE_BYTES = 32;
  // Public key is a point (x, y) on the curve.
  // Each coordinate requires 32 bytes.
  // In its compressed form it suffices to store the x co-ordinate
  // and the sign for y.
  // Hence a total of 33 bytes.
  var PUBKEY_COMPRESSED_SIZE_BYTES = 33;
  // Personalization string used for HMAC-DRBG instantiation.
  var ALG = Buffer.from('Schnorr+SHA256  ', 'ascii');
  // The length in bytes of the string above.
  var ALG_LEN = 16;
  // The length in bytes of entropy inputs to HMAC-DRBG
  var ENT_LEN = 32;
  var HEX_ENC = 'hex';
  /**
   * generatePrivateKey
   *
   * @returns {string} - the hex-encoded private key
   */
  var generatePrivateKey = function () {
      return secp256k1
          .genKeyPair({
          entropy: randomBytes(secp256k1.curve.n.byteLength()),
          entropyEnc: HEX_ENC,
          pers: 'zilliqajs+secp256k1+SHA256',
      })
          .getPrivate()
          .toString(16, PRIVKEY_SIZE_BYTES * 2);
  };
  /**
   * Hash (r | M).
   * @param {Buffer} msg
   * @param {BN} r
   *
   * @returns {Buffer}
   */
  var hash = function (q, pubkey, msg) {
      var sha256 = hashjs.sha256();
      var totalLength = PUBKEY_COMPRESSED_SIZE_BYTES * 2 + msg.byteLength; // 33 q + 33 pubkey + variable msgLen
      var Q = q.toArrayLike(Buffer, 'be', 33);
      var B = Buffer.allocUnsafe(totalLength);
      Q.copy(B, 0);
      pubkey.copy(B, 33);
      msg.copy(B, 66);
      return new util.BN(sha256.update(B).digest('hex'), 16);
  };
  /**
   * sign
   *
   * @param {Buffer} msg
   * @param {Buffer} key
   * @param {Buffer} pubkey
   *
   * @returns {Signature}
   */
  var sign = function (msg, privKey, pubKey) {
      var prv = new util.BN(privKey);
      var drbg = getDRBG(msg);
      var len = curve.n.byteLength();
      var sig;
      while (!sig) {
          var k = new util.BN(drbg.generate(len));
          sig = trySign(msg, k, prv, pubKey);
      }
      return sig;
  };
  /**
   * trySign
   *
   * @param {Buffer} msg - the message to sign over
   * @param {BN} k - output of the HMAC-DRBG
   * @param {BN} privateKey - the private key
   * @param {Buffer} pubKey - the public key
   *
   * @returns {Signature | null =>}
   */
  var trySign = function (msg, k, privKey, pubKey) {
      if (privKey.isZero()) {
          throw new Error('Bad private key.');
      }
      if (privKey.gte(curve.n)) {
          throw new Error('Bad private key.');
      }
      // 1a. check that k is not 0
      if (k.isZero()) {
          return null;
      }
      // 1b. check that k is < the order of the group
      if (k.gte(curve.n)) {
          return null;
      }
      // 2. Compute commitment Q = kG, where g is the base point
      var Q = curve.g.mul(k);
      // convert the commitment to octets first
      var compressedQ = new util.BN(Q.encodeCompressed());
      // 3. Compute the challenge r = H(Q || pubKey || msg)
      // mod reduce the r value by the order of secp256k1, n
      var r = hash(compressedQ, pubKey, msg).umod(curve.n);
      var h = r.clone();
      if (h.isZero()) {
          return null;
      }
      // 4. Compute s = k - r * prv
      // 4a. Compute r * prv
      var s = h.imul(privKey).umod(curve.n);
      // 4b. Compute s = k - r * prv mod n
      s = k.isub(s).umod(curve.n);
      if (s.isZero()) {
          return null;
      }
      return new Signature({ r: r, s: s });
  };
  /**
   * Verify signature.
   *
   * @param {Buffer} msg
   * @param {Buffer} signature
   * @param {Buffer} key
   *
   * @returns {boolean}
   *
   * 1. Check if r,s is in [1, ..., order-1]
   * 2. Compute Q = sG + r*kpub
   * 3. If Q = O (the neutral point), return 0;
   * 4. r' = H(Q, kpub, m)
   * 5. return r' == r
   */
  var verify = function (msg, signature, key) {
      var sig = new Signature(signature);
      if (sig.s.isZero() || sig.r.isZero()) {
          throw new Error('Invalid signature');
      }
      if (sig.s.isNeg() || sig.r.isNeg()) {
          throw new Error('Invalid signature');
      }
      if (sig.s.gte(curve.n) || sig.r.gte(curve.n)) {
          throw new Error('Invalid signature');
      }
      var kpub = curve.decodePoint(key);
      if (!curve.validate(kpub)) {
          throw new Error('Invalid public key');
      }
      var l = kpub.mul(sig.r);
      var r = curve.g.mul(sig.s);
      var Q = l.add(r);
      if (Q.isInfinity()) {
          throw new Error('Invalid intermediate point.');
      }
      var compressedQ = new util.BN(Q.encodeCompressed());
      var r1 = hash(compressedQ, key, msg).umod(curve.n);
      if (r1.isZero()) {
          throw new Error('Invalid hash.');
      }
      return r1.eq(sig.r);
  };
  var toSignature = function (serialised) {
      var r = serialised.slice(0, 64);
      var s = serialised.slice(64);
      return new Signature({ r: r, s: s });
  };
  /**
   * Instantiate an HMAC-DRBG.
   *
   * @param {Buffer} msg - used as nonce
   *
   * @returns {DRBG}
   */
  var getDRBG = function (msg) {
      var entropy = randomBytes(ENT_LEN);
      var pers = Buffer.allocUnsafe(ALG_LEN + ENT_LEN);
      Buffer.from(randomBytes(ENT_LEN)).copy(pers, 0);
      ALG.copy(pers, ENT_LEN);
      return new DRBG({
          hash: hashjs.sha256,
          entropy: entropy,
          nonce: msg,
          pers: pers,
      });
  };

  var schnorr = /*#__PURE__*/Object.freeze({
    generatePrivateKey: generatePrivateKey,
    hash: hash,
    sign: sign,
    trySign: trySign,
    verify: verify,
    toSignature: toSignature
  });

  //  This file is part of Zilliqa-Javascript-Library.
  // This code is taken from https://github.com/sipa/bech32/tree/bdc264f84014c234e908d72026b7b780122be11f/ref/javascript
  // Copyright (c) 2017 Pieter Wuille
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:
  //
  // The above copyright notice and this permission notice shall be included in
  // all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  // THE SOFTWARE.
  var CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
  var GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
  var polymod = function (values) {
      var chk = 1;
      // tslint:disable-next-line
      for (var p = 0; p < values.length; ++p) {
          var top_1 = chk >> 25;
          chk = ((chk & 0x1ffffff) << 5) ^ values[p];
          for (var i = 0; i < 5; ++i) {
              if ((top_1 >> i) & 1) {
                  chk ^= GENERATOR[i];
              }
          }
      }
      return chk;
  };
  var hrpExpand = function (hrp) {
      var ret = [];
      var p;
      for (p = 0; p < hrp.length; ++p) {
          ret.push(hrp.charCodeAt(p) >> 5);
      }
      ret.push(0);
      for (p = 0; p < hrp.length; ++p) {
          ret.push(hrp.charCodeAt(p) & 31);
      }
      return Buffer.from(ret);
  };
  function verifyChecksum(hrp, data) {
      return polymod(Buffer.concat([hrpExpand(hrp), data])) === 1;
  }
  function createChecksum(hrp, data) {
      var values = Buffer.concat([
          Buffer.from(hrpExpand(hrp)),
          data,
          Buffer.from([0, 0, 0, 0, 0, 0]),
      ]);
      // var values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
      var mod = polymod(values) ^ 1;
      var ret = [];
      for (var p = 0; p < 6; ++p) {
          ret.push((mod >> (5 * (5 - p))) & 31);
      }
      return Buffer.from(ret);
  }
  var encode = function (hrp, data) {
      var combined = Buffer.concat([data, createChecksum(hrp, data)]);
      var ret = hrp + '1';
      // tslint:disable-next-line
      for (var p = 0; p < combined.length; ++p) {
          ret += CHARSET.charAt(combined[p]);
      }
      return ret;
  };
  var decode = function (bechString) {
      var p;
      var hasLower = false;
      var hasUpper = false;
      for (p = 0; p < bechString.length; ++p) {
          if (bechString.charCodeAt(p) < 33 || bechString.charCodeAt(p) > 126) {
              return null;
          }
          if (bechString.charCodeAt(p) >= 97 && bechString.charCodeAt(p) <= 122) {
              hasLower = true;
          }
          if (bechString.charCodeAt(p) >= 65 && bechString.charCodeAt(p) <= 90) {
              hasUpper = true;
          }
      }
      if (hasLower && hasUpper) {
          return null;
      }
      bechString = bechString.toLowerCase();
      var pos = bechString.lastIndexOf('1');
      if (pos < 1 || pos + 7 > bechString.length || bechString.length > 90) {
          return null;
      }
      var hrp = bechString.substring(0, pos);
      var data = [];
      for (p = pos + 1; p < bechString.length; ++p) {
          var d = CHARSET.indexOf(bechString.charAt(p));
          if (d === -1) {
              return null;
          }
          data.push(d);
      }
      if (!verifyChecksum(hrp, Buffer.from(data))) {
          return null;
      }
      return { hrp: hrp, data: Buffer.from(data.slice(0, data.length - 6)) };
  };
  // HRP is the human-readable part of zilliqa bech32 addresses
  var HRP = 'zil';
  /**
   * convertBits
   *
   * groups buffers of a certain width to buffers of the desired width.
   *
   * For example, converts byte buffers to buffers of maximum 5 bit numbers,
   * padding those numbers as necessary. Necessary for encoding Ethereum-style
   * addresses as bech32 ones.
   *
   * @param {Buffer} data
   * @param {number} fromWidth
   * @param {number} toWidth
   * @param {boolean} pad
   * @returns {Buffer|null}
   */
  var convertBits = function (data, fromWidth, toWidth, pad) {
      if (pad === void 0) { pad = true; }
      var acc = 0;
      var bits = 0;
      var ret = [];
      var maxv = (1 << toWidth) - 1;
      // tslint:disable-next-line
      for (var p = 0; p < data.length; ++p) {
          var value = data[p];
          if (value < 0 || value >> fromWidth !== 0) {
              return null;
          }
          acc = (acc << fromWidth) | value;
          bits += fromWidth;
          while (bits >= toWidth) {
              bits -= toWidth;
              ret.push((acc >> bits) & maxv);
          }
      }
      if (pad) {
          if (bits > 0) {
              ret.push((acc << (toWidth - bits)) & maxv);
          }
      }
      else if (bits >= fromWidth || (acc << (toWidth - bits)) & maxv) {
          return null;
      }
      return Buffer.from(ret);
  };
  /**
   * toBech32Address
   *
   * Encodes a canonical 20-byte Ethereum-style address as a bech32 zilliqa
   * address.
   *
   * The expected format is zil1<address><checksum> where address and checksum
   * are the result of bech32 encoding a Buffer containing the address bytes.
   *
   * @param {string} 20 byte canonical address
   * @returns {string} 38 char bech32 encoded zilliqa address
   */
  var toBech32Address = function (address) {
      if (!util.validation.isAddress(address)) {
          throw new Error('Invalid address format.');
      }
      var addrBz = convertBits(Buffer.from(address.replace('0x', ''), 'hex'), 8, 5);
      if (addrBz === null) {
          throw new Error('Could not convert byte Buffer to 5-bit Buffer');
      }
      return encode(HRP, addrBz);
  };
  /**
   * fromBech32Address
   *
   * @param {string} address - a valid Zilliqa bech32 address
   * @returns {string} a canonical 20-byte Ethereum-style address
   */
  var fromBech32Address = function (address) {
      var res = decode(address);
      if (res === null) {
          throw new Error('Invalid bech32 address');
      }
      var hrp = res.hrp, data = res.data;
      var shouldBe = HRP;
      if (hrp !== shouldBe) {
          throw new Error("Expected hrp to be " + shouldBe + " but got " + hrp);
      }
      var buf = convertBits(data, 5, 8, false);
      if (buf === null) {
          throw new Error('Could not convert buffer to bytes');
      }
      return toChecksumAddress(buf.toString('hex'));
  };

  //  This file is part of Zilliqa-Javascript-Library.
  var secp256k1$1 = elliptic.ec('secp256k1');
  /**
   * getAddressFromPrivateKey
   *
   * takes a hex-encoded string (private key) and returns its corresponding
   * 20-byte hex-encoded address.
   *
   * @param {string} privateKey
   * @returns {string}
   */
  var getAddressFromPrivateKey = function (privateKey) {
      var normalizedPrviateKey = normalizePrivateKey(privateKey);
      var keyPair = secp256k1$1.keyFromPrivate(normalizedPrviateKey, 'hex');
      var pub = keyPair.getPublic(true, 'hex');
      return toChecksumAddress(hashjs
          .sha256()
          .update(pub, 'hex')
          .digest('hex')
          .slice(24));
  };
  /**
   * getPubKeyFromPrivateKey
   *
   * takes a hex-encoded string (private key) and returns its corresponding
   * hex-encoded 33-byte public key.
   *
   * @param {string} privateKey
   * @returns {string}
   */
  var getPubKeyFromPrivateKey = function (privateKey) {
      var normalizedPrviateKey = normalizePrivateKey(privateKey);
      var keyPair = secp256k1$1.keyFromPrivate(normalizedPrviateKey, 'hex');
      return keyPair.getPublic(true, 'hex');
  };
  /**
   * getAccountFrom0xPrivateKey
   *
   * Utility method for recovering account from 0x private key.
   * See https://github.com/Zilliqa/Zilliqa-JavaScript-Library/pull/159
   * @param privateKeyWith0x : private key with 0x prefix
   */
  var getAccountFrom0xPrivateKey = function (privateKeyWith0x) {
      var privateKeyWithout0x = normalizePrivateKey(privateKeyWith0x);
      var keyPair = secp256k1$1.keyFromPrivate(privateKeyWith0x, 'hex');
      var publicKeyWith0x = keyPair.getPublic(true, 'hex');
      var addressWith0x = getAddressFromPublicKey(publicKeyWith0x);
      var bech32With0x = toBech32Address(addressWith0x);
      var with0x = {
          prv: privateKeyWith0x,
          pub: publicKeyWith0x,
          addr: addressWith0x,
          bech32: bech32With0x,
      };
      var keyPair2 = secp256k1$1.keyFromPrivate(privateKeyWithout0x, 'hex');
      var publicKeyWithout0x = keyPair2.getPublic(true, 'hex');
      var addressWithout0x = getAddressFromPublicKey(publicKeyWithout0x);
      var bech32Without0x = toBech32Address(addressWithout0x);
      var without0x = {
          prv: privateKeyWithout0x,
          pub: publicKeyWithout0x,
          addr: addressWithout0x,
          bech32: bech32Without0x,
      };
      var privateKeyAfterChange = keyPair.getPrivate('hex');
      var publicKeyAfterChange = keyPair.getPublic(true, 'hex');
      var addressAfterChange = getAddressFromPublicKey(publicKeyAfterChange);
      var bech32AfterChange = toBech32Address(addressAfterChange);
      var changed = {
          prv: privateKeyAfterChange,
          pub: publicKeyAfterChange,
          addr: addressAfterChange,
          bech32: bech32AfterChange,
      };
      return {
          with0x: with0x,
          without0x: without0x,
          changed: changed,
      };
  };
  /**
   * compressPublicKey
   *
   * @param {string} publicKey - 65-byte public key, a point (x, y)
   *
   * @returns {string}
   */
  var compressPublicKey = function (publicKey) {
      return secp256k1$1.keyFromPublic(publicKey, 'hex').getPublic(true, 'hex');
  };
  /**
   * getAddressFromPublicKey
   *
   * takes hex-encoded string and returns the corresponding address
   *
   * @param {string} pubKey
   * @returns {string}
   */
  var getAddressFromPublicKey = function (publicKey) {
      return toChecksumAddress(hashjs
          .sha256()
          .update(publicKey, 'hex')
          .digest('hex')
          .slice(24));
  };
  /**
   * toChecksumAddress
   *
   * takes hex-encoded string and returns the corresponding address
   *
   * @param {string} address
   * @returns {string}
   */
  var toChecksumAddress = function (address) {
      if (!util.validation.isAddress(address)) {
          throw new Error(address + " is not a valid base 16 address");
      }
      address = address.toLowerCase().replace('0x', '');
      var hash = hashjs
          .sha256()
          .update(address, 'hex')
          .digest('hex');
      var v = new util.BN(hash, 'hex', 'be');
      var ret = '0x';
      for (var i = 0; i < address.length; i++) {
          if ('0123456789'.indexOf(address[i]) !== -1) {
              ret += address[i];
          }
          else {
              ret += v.and(new util.BN(2).pow(new util.BN(255 - 6 * i))).gte(new util.BN(1))
                  ? address[i].toUpperCase()
                  : address[i].toLowerCase();
          }
      }
      return ret;
  };
  /**
   * isValidChecksumAddress
   *
   * takes hex-encoded string and returns boolean if address is checksumed
   *
   * @param {string} address
   * @returns {boolean}
   */
  var isValidChecksumAddress = function (address) {
      return (util.validation.isAddress(address.replace('0x', '')) &&
          toChecksumAddress(address) === address);
  };
  /**
   * normaliseAddress
   *
   * takes in a base16 address or a zilliqa bech32 encoded address
   * and returns a checksum base16 address. If the address is neither a base16
   * nor bech32 address, the code will return an error
   * @param {string)} address
   * @returns {string}
   */
  var normaliseAddress = function (address) {
      if (util.validation.isBech32(address)) {
          return fromBech32Address(address);
      }
      if (!isValidChecksumAddress(address)) {
          throw Error('Wrong address format, should be either bech32 or checksummed address');
      }
      return address;
  };
  /**
   * encodeBase58
   *
   * @param {string} hex - base 16 encoded string
   * @returns {string} - big endian base 58 encoded string
   */
  var encodeBase58 = function (hex) {
      var clean = hex.toLowerCase().replace('0x', '');
      var tbl = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
      var base = new util.BN(58);
      var zero = new util.BN(0);
      var x = new util.BN(clean, 16);
      var res = '';
      while (x.gt(zero)) {
          var rem = x.mod(base).toNumber(); // safe, always < 58
          // big endian
          res = tbl[rem] + res;
          // quotient, remainders thrown away in integer division
          x = x.div(base);
      }
      // convert to big endian in case the input hex is little endian
      var hexBE = x.toString('hex', clean.length);
      for (var i = 0; i < hexBE.length; i += 2) {
          if (hex[i] === '0' && hex[i + 1] === '0') {
              res = tbl[0] + res;
          }
          else {
              break;
          }
      }
      return res;
  };
  /**
   * decodeBase58
   *
   * @param {string} raw - base 58 string
   * @returns {string} - big endian base 16 string
   */
  var decodeBase58 = function (raw) {
      var tbl = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
      var base = new util.BN(58);
      var zero = new util.BN(0);
      var isBreak = false;
      var n = new util.BN(0);
      var leader = '';
      for (var i = 0; i < raw.length; i++) {
          var char = raw.charAt(i);
          var weight = new util.BN(tbl.indexOf(char));
          n = n.mul(base).add(weight);
          // check if padding required
          if (!isBreak) {
              if (i - 1 > 0 && raw[i - 1] !== '1') {
                  isBreak = true;
                  continue;
              }
              if (char === '1') {
                  leader += '00';
              }
          }
      }
      if (n.eq(zero)) {
          return leader;
      }
      var res = leader + n.toString('hex');
      if (res.length % 2 !== 0) {
          res = '0' + res;
      }
      return res;
  };
  /**
   * verifyPrivateKey
   *
   * @param {string|Buffer} privateKey
   * @returns {boolean}
   */
  var verifyPrivateKey = function (privateKey) {
      var keyPair = secp256k1$1.keyFromPrivate(privateKey, 'hex');
      var result = keyPair.validate().result;
      return result;
  };
  /**
   * normalizePrivateKey : normalise private key from 0x or without 0x prefix
   *
   * @param {string} privateKey
   * @returns {string}
   */
  var normalizePrivateKey = function (privateKey) {
      try {
          if (!util.validation.isPrivateKey(privateKey)) {
              throw new Error('Private key is not correct');
          }
          var normalized = privateKey.toLowerCase().replace('0x', '');
          if (!verifyPrivateKey(normalized)) {
              throw new Error('Private key is not correct');
          }
          return normalized;
      }
      catch (error) {
          throw error;
      }
  };

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  var js = scryptsy;

  //  This file is part of Zilliqa-Javascript-Library.
  var ALGO_IDENTIFIER = 'aes-128-ctr';
  /**
   * getDerivedKey
   *
   * NOTE: only scrypt and pbkdf2 are supported.
   *
   * @param {Buffer} key - the passphrase
   * @param {KDF} kdf - the key derivation function to be used
   * @param {KDFParams} params - params for the kdf
   *
   * @returns {Promise<Buffer>}
   */
  function getDerivedKey(key, kdf, params) {
      return __awaiter(this, void 0, void 0, function () {
          var salt, _a, c, dklen, _b, n, r, p, dklen;
          return __generator(this, function (_c) {
              salt = Buffer.from(params.salt, 'hex');
              if (kdf === 'pbkdf2') {
                  _a = params, c = _a.c, dklen = _a.dklen;
                  return [2 /*return*/, pbkdf2.pbkdf2Sync(key, salt, c, dklen, 'sha256')];
              }
              if (kdf === 'scrypt') {
                  _b = params, n = _b.n, r = _b.r, p = _b.p, dklen = _b.dklen;
                  return [2 /*return*/, js(key, salt, n, r, p, dklen)];
              }
              throw new Error('Only pbkdf2 and scrypt are supported');
          });
      });
  }
  /**
   * encryptPrivateKey
   *
   * Encodes and encrypts an account in the format specified by
   * https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition.
   * However, note that, in keeping with the hash function used by Zilliqa's
   * core protocol, the MAC is generated using sha256 instead of keccak.
   *
   * NOTE: only scrypt and pbkdf2 are supported.
   *
   * @param {KDF} kdf - the key derivation function to be used
   * @param {string} privateKey - hex-encoded private key
   * @param {string} passphrase - a passphrase used for encryption
   *
   * @returns {Promise<string>}
   */
  var encryptPrivateKey = function (kdf, privateKey, passphrase) { return __awaiter(void 0, void 0, void 0, function () {
      var address, salt, iv, kdfparams, derivedKey, cipher, ciphertext;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  address = getAddressFromPrivateKey(privateKey);
                  salt = randomBytes(32);
                  iv = Buffer.from(randomBytes(16), 'hex');
                  kdfparams = {
                      salt: salt,
                      n: 8192,
                      c: 262144,
                      r: 8,
                      p: 1,
                      dklen: 32,
                  };
                  return [4 /*yield*/, getDerivedKey(Buffer.from(passphrase), kdf, kdfparams)];
              case 1:
                  derivedKey = _a.sent();
                  cipher = new aes.ModeOfOperation.ctr(derivedKey.slice(0, 16), new aes.Counter(iv));
                  ciphertext = Buffer.from(cipher.encrypt(Buffer.from(privateKey, 'hex')));
                  return [2 /*return*/, JSON.stringify({
                          address: address,
                          crypto: {
                              cipher: ALGO_IDENTIFIER,
                              cipherparams: {
                                  iv: iv.toString('hex'),
                              },
                              ciphertext: ciphertext.toString('hex'),
                              kdf: kdf,
                              kdfparams: kdfparams,
                              mac: hashjs
                                  // @ts-ignore
                                  .hmac(hashjs.sha256, derivedKey, 'hex')
                                  .update(Buffer.concat([
                                  derivedKey.slice(16, 32),
                                  ciphertext,
                                  iv,
                                  Buffer.from(ALGO_IDENTIFIER),
                              ]), 'hex')
                                  .digest('hex'),
                          },
                          id: uuid.v4({ random: util.bytes.hexToIntArray(randomBytes(16)) }),
                          version: 3,
                      })];
          }
      });
  }); };
  /**
   * decryptPrivateKey
   *
   * Recovers the private key from a keystore file using the given passphrase.
   *
   * @param {string} passphrase
   * @param {KeystoreV3} keystore
   * @returns {Promise<string>}
   */
  var decryptPrivateKey = function (passphrase, keystore) { return __awaiter(void 0, void 0, void 0, function () {
      var ciphertext, iv, kdfparams, derivedKey, mac, cipher;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  ciphertext = Buffer.from(keystore.crypto.ciphertext, 'hex');
                  iv = Buffer.from(keystore.crypto.cipherparams.iv, 'hex');
                  kdfparams = keystore.crypto.kdfparams;
                  return [4 /*yield*/, getDerivedKey(Buffer.from(passphrase), keystore.crypto.kdf, kdfparams)];
              case 1:
                  derivedKey = _a.sent();
                  mac = hashjs
                      // @ts-ignore
                      .hmac(hashjs.sha256, derivedKey, 'hex')
                      .update(Buffer.concat([
                      derivedKey.slice(16, 32),
                      ciphertext,
                      iv,
                      Buffer.from(ALGO_IDENTIFIER),
                  ]), 'hex')
                      .digest('hex');
                  // we need to do a byte-by-byte comparison to avoid non-constant time side
                  // channel attacks.
                  if (!util.bytes.isEqual(mac.toUpperCase(), keystore.crypto.mac.toUpperCase())) {
                      return [2 /*return*/, Promise.reject('Failed to decrypt.')];
                  }
                  cipher = new aes.ModeOfOperation.ctr(derivedKey.slice(0, 16), new aes.Counter(iv));
                  return [2 /*return*/, Buffer.from(cipher.decrypt(ciphertext)).toString('hex')];
          }
      });
  }); };

  //  This file is part of Zilliqa-Javascript-Library.
  /**
   * sign
   *
   * @param {string} hash - hex-encoded hash of the data to be signed
   *
   * @returns {string} the signature
   */
  var sign$1 = function (msg, privateKey, pubKey) {
      var sig = sign(msg, Buffer.from(privateKey, 'hex'), Buffer.from(pubKey, 'hex'));
      var r = sig.r.toString('hex');
      var s = sig.s.toString('hex');
      while (r.length < 64) {
          r = '0' + r;
      }
      while (s.length < 64) {
          s = '0' + s;
      }
      return r + s;
  };

  exports.sign = sign$1;
  exports.schnorr = schnorr;
  exports.getAddressFromPrivateKey = getAddressFromPrivateKey;
  exports.getPubKeyFromPrivateKey = getPubKeyFromPrivateKey;
  exports.getAccountFrom0xPrivateKey = getAccountFrom0xPrivateKey;
  exports.compressPublicKey = compressPublicKey;
  exports.getAddressFromPublicKey = getAddressFromPublicKey;
  exports.toChecksumAddress = toChecksumAddress;
  exports.isValidChecksumAddress = isValidChecksumAddress;
  exports.normaliseAddress = normaliseAddress;
  exports.encodeBase58 = encodeBase58;
  exports.decodeBase58 = decodeBase58;
  exports.verifyPrivateKey = verifyPrivateKey;
  exports.normalizePrivateKey = normalizePrivateKey;
  exports.encryptPrivateKey = encryptPrivateKey;
  exports.decryptPrivateKey = decryptPrivateKey;
  exports.randomBytes = randomBytes;
  exports.Signature = Signature;
  exports.encode = encode;
  exports.decode = decode;
  exports.HRP = HRP;
  exports.convertBits = convertBits;
  exports.toBech32Address = toBech32Address;
  exports.fromBech32Address = fromBech32Address;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@zilliqa-js/viewblock/node_modules/@zilliqa-js/util/dist/index.umd.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@zilliqa-js/viewblock/node_modules/@zilliqa-js/util/dist/index.umd.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory(exports, __webpack_require__(/*! bn.js */ "./node_modules/@zilliqa-js/util/node_modules/bn.js/lib/bn.js"), __webpack_require__(/*! long */ "./node_modules/long/src/long.js")) :
  undefined;
}(this, (function (exports,BN,Long) { 'use strict';

  BN = BN && BN.hasOwnProperty('default') ? BN['default'] : BN;
  Long = Long && Long.hasOwnProperty('default') ? Long['default'] : Long;

  //  This file is part of Zilliqa-Javascript-Library.
  //
  //  This program is free software: you can redistribute it and/or modify
  //  it under the terms of the GNU General Public License as published by
  //  the Free Software Foundation, either version 3 of the License, or
  //  (at your option) any later version.
  //
  //   This program is distributed in the hope that it will be useful,
  //   but WITHOUT ANY WARRANTY; without even the implied warranty of
  //   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  //   GNU General Public License for more details.
  //
  //   You should have received a copy of the GNU General Public License
  //   along with this program.  If not, see <https://www.gnu.org/licenses/>.
  /**
   * intToHexArray
   *
   * @param {number} int - the number to be converted to hex
   * @param {number)} size - the desired width of the hex value. will pad.
   *
   * @returns {string[]}
   */
  var intToHexArray = function (int, size) {
      var hex = [];
      var hexRep = [];
      var hexVal = int.toString(16);
      // TODO: this really needs to be refactored.
      for (var i = 0; i < hexVal.length; i++) {
          hexRep[i] = hexVal[i].toString();
      }
      for (var i = 0; i < size - hexVal.length; i++) {
          hex.push('0');
      }
      for (var i = 0; i < hexVal.length; i++) {
          hex.push(hexRep[i]);
      }
      return hex;
  };
  /**
   * intToByteArray
   *
   * Converts a number to Uint8Array
   *
   * @param {number} num
   * @param {number} size
   *
   * @returns {Uint8Array}
   */
  var intToByteArray = function (num, size) {
      var x = num;
      var res = [];
      while (x > 0) {
          res.push(x & 255);
          x = x >> 8;
      }
      var pad = size - res.length;
      for (var i = 0; i < pad; i++) {
          res.unshift(0);
      }
      return Uint8Array.from(res);
  };
  /**
   * hexToByteArray
   *
   * Convers a hex string to a Uint8Array
   *
   * @param {string} hex
   * @returns {Uint8Array}
   */
  var hexToByteArray = function (hex) {
      var res = new Uint8Array(hex.length / 2);
      for (var i = 0; i < hex.length; i += 2) {
          res[i / 2] = parseInt(hex.substring(i, i + 2), 16);
      }
      return res;
  };
  /**
   * hexToIntArray
   *
   * @param {string} hex
   * @returns {number[]}
   */
  var hexToIntArray = function (hex) {
      if (!hex || !isHex(hex)) {
          return [];
      }
      var res = [];
      for (var i = 0; i < hex.length; i++) {
          var c = hex.charCodeAt(i);
          var hi = c >> 8;
          var lo = c & 0xff;
          hi ? res.push(hi, lo) : res.push(lo);
      }
      return res;
  };
  /**
   * pack
   *
   * Takes two 16-bit integers and combines them. Used to compute version.
   *
   * @param {number} a
   * @param {number} b
   *
   * @returns {number} - a 32-bit number
   */
  var pack = function (a, b) {
      if (a >> 16 > 0 || b >> 16 > 0) {
          throw new Error('Both a and b must be 16 bits or less');
      }
      return (a << 16) + b;
  };
  /**
   * compareBytes
   *
   * A constant time HMAC comparison function.
   *
   * @param {string} a
   * @param {string} b
   * @returns {boolean}
   */
  var isEqual = function (a, b) {
      var bzA = hexToIntArray(a);
      var bzB = hexToIntArray(b);
      if (bzA.length !== bzB.length) {
          return false;
      }
      var result = 0;
      for (var i = 0; i < bzA.length; i++) {
          result |= bzA[i] ^ bzB[i];
      }
      return result === 0;
  };
  /**
   * isHex
   *
   * @param {string} str - string to be tested
   * @returns {boolean}
   */
  var isHex = function (str) {
      var plain = str.replace('0x', '');
      return /[0-9a-f]*$/i.test(plain);
  };

  var bytes = /*#__PURE__*/Object.freeze({
    intToHexArray: intToHexArray,
    intToByteArray: intToByteArray,
    hexToByteArray: hexToByteArray,
    hexToIntArray: hexToIntArray,
    pack: pack,
    isEqual: isEqual,
    isHex: isHex
  });

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  function __values(o) {
      var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
      if (m) return m.call(o);
      return {
          next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
          }
      };
  }

  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  }

  //  This file is part of Zilliqa-Javascript-Library.
  var isAddress = function (address) {
      return isByteString(address, 40);
  };
  var isBech32 = function (raw) {
      return !!raw.match(/^zil1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}/);
  };
  var isBase58 = function (raw) {
      return !!raw.match(/^[1-9ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/);
  };
  var isPrivateKey = function (privateKey) {
      return isByteString(privateKey, 64);
  };
  var isPubKey = function (pubKey) {
      return isByteString(pubKey, 66);
  };
  var isSignature = function (sig) {
      return isByteString(sig, 128);
  };
  var isByteString = function (str, len) {
      return !!str.replace('0x', '').match("^[0-9a-fA-F]{" + len + "}$");
  };
  var isNumber = function (x) {
      return typeof x === 'number';
  };
  var isBN = function (x) {
      return BN.isBN(x);
  };
  var isLong = function (x) {
      return Long.isLong(x);
  };
  var isString = function (x) {
      return typeof x === 'string';
  };
  var isPlainObject = function (x) {
      if (typeof x === 'object' && x !== null) {
          var proto = Object.getPrototypeOf(x);
          return proto === Object.prototype || proto === null;
      }
      return false;
  };
  var PRAGMA_REQUIRED = '@@ZJS_REQUIRED@@';
  var required = function (fn) {
      if (typeof fn === 'function') {
          return Object.defineProperty(fn, 'required', {
              value: PRAGMA_REQUIRED,
          });
      }
      throw new Error('fn is not a function');
  };
  var matchesObject = function (x, test) {
      var e_1, _a;
      if (isPlainObject(x)) {
          for (var key in test) {
              if (test.hasOwnProperty(key)) {
                  try {
                      for (var _b = (e_1 = void 0, __values(test[key])), _c = _b.next(); !_c.done; _c = _b.next()) {
                          var tester = _c.value;
                          var value = x[key];
                          if (typeof value === 'undefined' && tester.required) {
                              throw new Error('Key not found: ' + key);
                          }
                          else {
                              continue;
                          }
                          if (typeof tester !== 'function') {
                              throw new Error('Validator is not a function');
                          }
                          if (!tester(value)) {
                              throw new Error('Validation failed for ' + key);
                          }
                      }
                  }
                  catch (e_1_1) { e_1 = { error: e_1_1 }; }
                  finally {
                      try {
                          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                      }
                      finally { if (e_1) throw e_1.error; }
                  }
              }
          }
      }
      return true;
  };

  var validation = /*#__PURE__*/Object.freeze({
    isAddress: isAddress,
    isBech32: isBech32,
    isBase58: isBase58,
    isPrivateKey: isPrivateKey,
    isPubKey: isPubKey,
    isSignature: isSignature,
    isByteString: isByteString,
    isNumber: isNumber,
    isBN: isBN,
    isLong: isLong,
    isString: isString,
    isPlainObject: isPlainObject,
    required: required,
    matchesObject: matchesObject
  });

  //  This file is part of Zilliqa-Javascript-Library.
  var Units;
  (function (Units) {
      Units["Zil"] = "zil";
      Units["Li"] = "li";
      Units["Qa"] = "qa";
  })(Units || (Units = {}));
  var DEFAULT_OPTIONS = {
      pad: false,
  };
  var unitMap = new Map([
      ["qa" /* Qa */, '1'],
      ["li" /* Li */, '1000000'],
      ["zil" /* Zil */, '1000000000000'],
  ]);
  var numToStr = function (input) {
      if (typeof input === 'string') {
          if (!input.match(/^-?[0-9.]+$/)) {
              throw new Error("while converting number to string, invalid number value '" + input + "', should be a number matching (^-?[0-9.]+).");
          }
          return input;
      }
      else if (typeof input === 'number') {
          return String(input);
      }
      else if (BN.isBN(input)) {
          return input.toString(10);
      }
      throw new Error("while converting number to string, invalid number value '" + input + "' type " + typeof input + ".");
  };
  var fromQa = function (qa, unit, options) {
      if (options === void 0) { options = DEFAULT_OPTIONS; }
      if (unit === 'qa') {
          return qa.toString(10);
      }
      var baseStr = unitMap.get(unit);
      if (!baseStr) {
          throw new Error("No unit of type " + unit + " exists.");
      }
      var base = new BN(baseStr, 10);
      var baseNumDecimals = baseStr.length - 1;
      var fraction = qa
          .abs()
          .mod(base)
          .toString(10);
      // prepend 0s to the fraction half
      while (fraction.length < baseNumDecimals) {
          fraction = "0" + fraction;
      }
      if (!options.pad) {
          fraction = (fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1]);
      }
      var whole = qa.div(base).toString(10);
      return fraction === '0' ? "" + whole : whole + "." + fraction;
  };
  var toQa = function (input, unit) {
      var inputStr = numToStr(input);
      var baseStr = unitMap.get(unit);
      if (!baseStr) {
          throw new Error("No unit of type " + unit + " exists.");
      }
      var baseNumDecimals = baseStr.length - 1;
      var base = new BN(baseStr, 10);
      // Is it negative?
      var isNegative = inputStr.substring(0, 1) === '-';
      if (isNegative) {
          inputStr = inputStr.substring(1);
      }
      if (inputStr === '.') {
          throw new Error("Cannot convert " + inputStr + " to Qa.");
      }
      // Split it into a whole and fractional part
      var comps = inputStr.split('.'); // eslint-disable-line
      if (comps.length > 2) {
          throw new Error("Cannot convert " + inputStr + " to Qa.");
      }
      var _a = __read(comps, 2), whole = _a[0], fraction = _a[1];
      if (!whole) {
          whole = '0';
      }
      if (!fraction) {
          fraction = '0';
      }
      if (fraction.length > baseNumDecimals) {
          throw new Error("Cannot convert " + inputStr + " to Qa.");
      }
      while (fraction.length < baseNumDecimals) {
          fraction += '0';
      }
      var wholeBN = new BN(whole);
      var fractionBN = new BN(fraction);
      var wei = wholeBN.mul(base).add(fractionBN); // eslint-disable-line
      if (isNegative) {
          wei = wei.neg();
      }
      return new BN(wei.toString(10), 10);
  };

  var unit = /*#__PURE__*/Object.freeze({
    get Units () { return Units; },
    fromQa: fromQa,
    toQa: toQa
  });

  //  This file is part of Zilliqa-Javascript-Library.

  exports.BN = BN;
  exports.Long = Long;
  exports.bytes = bytes;
  exports.units = unit;
  exports.validation = validation;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map


/***/ }),

/***/ "./node_modules/@zilliqa-js/viewblock/node_modules/node-fetch/browser.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@zilliqa-js/viewblock/node_modules/node-fetch/browser.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;

/***/ }),

/***/ "./node_modules/linked-list/_source/linked-list.js":
/*!*********************************************************!*\
  !*** ./node_modules/linked-list/_source/linked-list.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Constants.
 */

var errorMessage;

errorMessage = 'An argument without append, prepend, ' +
    'or detach methods was given to `List';

/**
 * Creates a new List: A linked list is a bit like an Array, but
 * knows nothing about how many items are in it, and knows only about its
 * first (`head`) and last (`tail`) items. Each item (e.g. `head`, `tail`,
 * &c.) knows which item comes before or after it (its more like the
 * implementation of the DOM in JavaScript).
 * @global
 * @private
 * @constructor
 * @class Represents an instance of List.
 */

function List(/*items...*/) {
    if (arguments.length) {
        return List.from(arguments);
    }
}

var ListPrototype;

ListPrototype = List.prototype;

/**
 * Creates a new list from the arguments (each a list item) passed in.
 * @name List.of
 * @param {...ListItem} [items] - Zero or more items to attach.
 * @returns {list} - A new instance of List.
 */

List.of = function (/*items...*/) {
    return List.from.call(this, arguments);
};

/**
 * Creates a new list from the given array-like object (each a list item)
 * passed in.
 * @name List.from
 * @param {ListItem[]} [items] - The items to append.
 * @returns {list} - A new instance of List.
 */
List.from = function (items) {
    var list = new this(), length, iterator, item;

    if (items && (length = items.length)) {
        iterator = -1;

        while (++iterator < length) {
            item = items[iterator];

            if (item !== null && item !== undefined) {
                list.append(item);
            }
        }
    }

    return list;
};

/**
 * List#head
 * Default to `null`.
 */
ListPrototype.head = null;

/**
 * List#tail
 * Default to `null`.
 */
ListPrototype.tail = null;

/**
 * Returns the list's items as an array. This does *not* detach the items.
 * @name List#toArray
 * @returns {ListItem[]} - An array of (still attached) ListItems.
 */
ListPrototype.toArray = function () {
    var item = this.head,
        result = [];

    while (item) {
        result.push(item);
        item = item.next;
    }

    return result;
};

/**
 * Prepends the given item to the list: Item will be the new first item
 * (`head`).
 * @name List#prepend
 * @param {ListItem} item - The item to prepend.
 * @returns {ListItem} - An instance of ListItem (the given item).
 */
ListPrototype.prepend = function (item) {
    if (!item) {
        return false;
    }

    if (!item.append || !item.prepend || !item.detach) {
        throw new Error(errorMessage + '#prepend`.');
    }

    var self, head;

    // Cache self.
    self = this;

    // If self has a first item, defer prepend to the first items prepend
    // method, and return the result.
    head = self.head;

    if (head) {
        return head.prepend(item);
    }

    // ...otherwise, there is no `head` (or `tail`) item yet.

    // Detach the prependee.
    item.detach();

    // Set the prependees parent list to reference self.
    item.list = self;

    // Set self's first item to the prependee, and return the item.
    self.head = item;

    return item;
};

/**
 * Appends the given item to the list: Item will be the new last item (`tail`)
 * if the list had a first item, and its first item (`head`) otherwise.
 * @name List#append
 * @param {ListItem} item - The item to append.
 * @returns {ListItem} - An instance of ListItem (the given item).
 */

ListPrototype.append = function (item) {
    if (!item) {
        return false;
    }

    if (!item.append || !item.prepend || !item.detach) {
        throw new Error(errorMessage + '#append`.');
    }

    var self, head, tail;

    // Cache self.
    self = this;

    // If self has a last item, defer appending to the last items append
    // method, and return the result.
    tail = self.tail;

    if (tail) {
        return tail.append(item);
    }

    // If self has a first item, defer appending to the first items append
    // method, and return the result.
    head = self.head;

    if (head) {
        return head.append(item);
    }

    // ...otherwise, there is no `tail` or `head` item yet.

    // Detach the appendee.
    item.detach();

    // Set the appendees parent list to reference self.
    item.list = self;

    // Set self's first item to the appendee, and return the item.
    self.head = item;

    return item;
};

/**
 * Creates a new ListItem: A linked list item is a bit like DOM node:
 * It knows only about its "parent" (`list`), the item before it (`prev`),
 * and the item after it (`next`).
 * @global
 * @private
 * @constructor
 * @class Represents an instance of ListItem.
 */

function ListItem() {}

List.Item = ListItem;

var ListItemPrototype = ListItem.prototype;

ListItemPrototype.next = null;

ListItemPrototype.prev = null;

ListItemPrototype.list = null;

/**
 * Detaches the item operated on from its parent list.
 * @name ListItem#detach
 * @returns {ListItem} - The item operated on.
 */
ListItemPrototype.detach = function () {
    // Cache self, the parent list, and the previous and next items.
    var self = this,
        list = self.list,
        prev = self.prev,
        next = self.next;

    // If the item is already detached, return self.
    if (!list) {
        return self;
    }

    // If self is the last item in the parent list, link the lists last item
    // to the previous item.
    if (list.tail === self) {
        list.tail = prev;
    }

    // If self is the first item in the parent list, link the lists first item
    // to the next item.
    if (list.head === self) {
        list.head = next;
    }

    // If both the last and first items in the parent list are the same,
    // remove the link to the last item.
    if (list.tail === list.head) {
        list.tail = null;
    }

    // If a previous item exists, link its next item to selfs next item.
    if (prev) {
        prev.next = next;
    }

    // If a next item exists, link its previous item to selfs previous item.
    if (next) {
        next.prev = prev;
    }

    // Remove links from self to both the next and previous items, and to the
    // parent list.
    self.prev = self.next = self.list = null;

    // Return self.
    return self;
};

/**
 * Prepends the given item *before* the item operated on.
 * @name ListItem#prepend
 * @param {ListItem} item - The item to prepend.
 * @returns {ListItem} - The item operated on, or false when that item is not
 * attached.
 */
ListItemPrototype.prepend = function (item) {
    if (!item || !item.append || !item.prepend || !item.detach) {
        throw new Error(errorMessage + 'Item#prepend`.');
    }

    // Cache self, the parent list, and the previous item.
    var self = this,
        list = self.list,
        prev = self.prev;

    // If self is detached, return false.
    if (!list) {
        return false;
    }

    // Detach the prependee.
    item.detach();

    // If self has a previous item...
    if (prev) {
        // ...link the prependees previous item, to selfs previous item.
        item.prev = prev;

        // ...link the previous items next item, to self.
        prev.next = item;
    }

    // Set the prependees next item to self.
    item.next = self;

    // Set the prependees parent list to selfs parent list.
    item.list = list;

    // Set the previous item of self to the prependee.
    self.prev = item;

    // If self is the first item in the parent list, link the lists first item
    // to the prependee.
    if (self === list.head) {
        list.head = item;
    }

    // If the the parent list has no last item, link the lists last item to
    // self.
    if (!list.tail) {
        list.tail = self;
    }

    // Return the prependee.
    return item;
};

/**
 * Appends the given item *after* the item operated on.
 * @name ListItem#append
 * @param {ListItem} item - The item to append.
 * @returns {ListItem} - The item operated on, or false when that item is not
 * attached.
 */
ListItemPrototype.append = function (item) {
    // If item is falsey, return false.
    if (!item || !item.append || !item.prepend || !item.detach) {
        throw new Error(errorMessage + 'Item#append`.');
    }

    // Cache self, the parent list, and the next item.
    var self = this,
        list = self.list,
        next = self.next;

    // If self is detached, return false.
    if (!list) {
        return false;
    }

    // Detach the appendee.
    item.detach();

    // If self has a next item...
    if (next) {
        // ...link the appendees next item, to selfs next item.
        item.next = next;

        // ...link the next items previous item, to the appendee.
        next.prev = item;
    }

    // Set the appendees previous item to self.
    item.prev = self;

    // Set the appendees parent list to selfs parent list.
    item.list = list;

    // Set the next item of self to the appendee.
    self.next = item;

    // If the the parent list has no last item or if self is the parent lists
    // last item, link the lists last item to the appendee.
    if (self === list.tail || !list.tail) {
        list.tail = item;
    }

    // Return the appendee.
    return item;
};

/**
 * Expose `List`.
 */

module.exports = List;


/***/ }),

/***/ "./node_modules/linked-list/index.js":
/*!*******************************************!*\
  !*** ./node_modules/linked-list/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./_source/linked-list.js */ "./node_modules/linked-list/_source/linked-list.js");


/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/home/home.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/home/home.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\r\n  <ion-toolbar>\r\n    <ion-title>\r\n      <h1>Zilliqa Balance</h1>\r\n      <span><img src=\"/assets/icon/logo.png\" alt=\"Logo\" id=\"logo\"> <p>{{balance}}</p></span>\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content [fullscreen]=\"true\">\r\n  <div id=\"container\">\r\n    <div id=\"menuButtons\">\r\n      <ion-button (click)=\"openSettings()\"><ion-icon name=\"settings-outline\"></ion-icon>Settings</ion-button>\r\n      <ion-button (click)=\"updateWalletData()\"><ion-icon name=\"refresh-outline\" class=\"{{updateData ? 'rotate': ''}}\"></ion-icon>Refresh</ion-button>\r\n    </div>\r\n    <div id=\"transactionButtonsContainer\" class=\"{{expandReceiveBox ? 'expandBox': ''}} {{expandTransactionBox ? 'expandTransactionBox': ''}} {{processingTransaction ? 'expandLoadingBox': ''}}\">\r\n      <div id=\"buttonContainer\">\r\n        <ion-button (click)=\"openSend()\" *ngIf=\"expandReceiveBox == false && expandTransactionBox == false\">Send</ion-button>\r\n        <ion-button (click)=\"openReceive()\" *ngIf=\"expandReceiveBox == false && expandTransactionBox == false\">Receive</ion-button>\r\n\r\n        <ion-button (click)=\"closeAction()\" *ngIf=\"expandReceiveBox == true || expandTransactionBox == true\">Back</ion-button>\r\n        <ion-button (click)=\"confirmTransaction()\" *ngIf=\"expandTransactionBox == true\">Confirm</ion-button>\r\n      </div>\r\n    </div>\r\n    <div id=\"transactionHistory\">\r\n      <h2>Recent transactions</h2>\r\n      <div *ngFor=\"let transaction of transactionHistory\" class=\"transactionContainer\">\r\n        <div>\r\n          <div class=\"transactionIcon\">\r\n            <ion-icon name=\"add-outline\" *ngIf=\"transaction.direction == 'in'\"></ion-icon>\r\n            <ion-icon name=\"remove-outline\" *ngIf=\"transaction.direction == 'out'\"></ion-icon>\r\n          </div>\r\n          <div class=\"transactionSummary\">\r\n            <p *ngIf=\"transaction.direction == 'in'\">{{ transaction.from | slice:0:10}}...{{ transaction.from | slice:31:42}}</p>\r\n            <p *ngIf=\"transaction.direction == 'out'\">{{ transaction.to | slice:0:10}}...{{ transaction.to | slice:31:42}}</p>\r\n            <small>{{convertTimestamp(transaction.timestamp)}}</small>\r\n          </div>\r\n        </div>\r\n        <p *ngIf=\"transaction.direction == 'in'\">+{{ convertQa(transaction.value) }}</p>\r\n        <p *ngIf=\"transaction.direction == 'out'\">-{{ convertQa(transaction.value) }}</p>\r\n      </div>\r\n    </div>\r\n    <div id=\"receiveContainer\" class=\"{{expandReceiveBox ? 'fadeIn': 'fadeOut'}}\">\r\n      <div id=\"addressForm\">\r\n        <p>Your address</p>\r\n        <ion-item (click)=\"copyAddress()\">\r\n          <ion-input>{{walletAddress}}</ion-input>\r\n        </ion-item>\r\n      </div>\r\n    </div>\r\n    <div id=\"sendContainer\" class=\"{{expandTransactionBox ? 'fadeIn': 'fadeOut'}}\">\r\n      <span (click)=\"setTransactionAmount()\"><img src=\"/assets/icon/logo.png\" alt=\"Logo\" id=\"logo\"> <p>{{sendAmount}} zil</p></span>\r\n      <p>New balance: {{ newBalance | number }}</p>\r\n      <div id=\"transactionFeeContainer\">\r\n        <p>Transaction fee</p>\r\n        <div id=\"sendAmounts\">\r\n          <ion-button (click)=\"setTransactionFee(defaultTransactionFee)\" id=\"{{getSelectedFee(defaultTransactionFee)}}\">Default<br>0.002 ZIL</ion-button>\r\n          <ion-button (click)=\"setTransactionFee(fastTransactionFee)\" id=\"{{getSelectedFee(fastTransactionFee)}}\">Fast<br>0.003 ZIL</ion-button>\r\n          <ion-button (click)=\"setCustomTransactionFee()\" id=\"{{getSelectedFee(customFee)}}\">{{getCustomFeeString()}}</ion-button>\r\n        </div>\r\n      </div>\r\n      <div id=\"addressForm\">\r\n        <p>Send to address</p>\r\n        <ion-item>\r\n          <ion-input [(ngModel)]=\"sendAddress\"></ion-input>\r\n        </ion-item>\r\n      </div>\r\n    </div>\r\n    <div id=\"loadingTransaction\" class=\"{{processingTransaction ? 'fadeIn': 'fadeOut'}}\">\r\n      <ion-spinner></ion-spinner>`\r\n      <p>Processing transaction..</p>\r\n      <small>Confirmation may take a minute</small>\r\n    </div>\r\n  </div>\r\n</ion-content>\r\n");

/***/ }),

/***/ "./node_modules/sc-channel/index.js":
/*!******************************************!*\
  !*** ./node_modules/sc-channel/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/socketcluster-client/node_modules/component-emitter/index.js");

var SCChannel = function (name, client, options) {
  var self = this;

  Emitter.call(this);

  this.PENDING = 'pending';
  this.SUBSCRIBED = 'subscribed';
  this.UNSUBSCRIBED = 'unsubscribed';

  this.name = name;
  this.state = this.UNSUBSCRIBED;
  this.client = client;

  this.options = options || {};
  this.setOptions(this.options);
};

SCChannel.prototype = Object.create(Emitter.prototype);

SCChannel.prototype.setOptions = function (options) {
  if (!options) {
    options = {};
  }
  this.waitForAuth = options.waitForAuth || false;
  this.batch = options.batch || false;

  if (options.data !== undefined) {
    this.data = options.data;
  }
};

SCChannel.prototype.getState = function () {
  return this.state;
};

SCChannel.prototype.subscribe = function (options) {
  this.client.subscribe(this.name, options);
};

SCChannel.prototype.unsubscribe = function () {
  this.client.unsubscribe(this.name);
};

SCChannel.prototype.isSubscribed = function (includePending) {
  return this.client.isSubscribed(this.name, includePending);
};

SCChannel.prototype.publish = function (data, callback) {
  this.client.publish(this.name, data, callback);
};

SCChannel.prototype.watch = function (handler) {
  this.client.watch(this.name, handler);
};

SCChannel.prototype.unwatch = function (handler) {
  this.client.unwatch(this.name, handler);
};

SCChannel.prototype.watchers = function () {
  return this.client.watchers(this.name);
};

SCChannel.prototype.destroy = function () {
  this.client.destroyChannel(this.name);
};

module.exports.SCChannel = SCChannel;


/***/ }),

/***/ "./node_modules/sc-errors/decycle.js":
/*!*******************************************!*\
  !*** ./node_modules/sc-errors/decycle.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Based on https://github.com/dscape/cycle/blob/master/cycle.js

module.exports = function decycle(object) {
// Make a deep copy of an object or array, assuring that there is at most
// one instance of each object or array in the resulting structure. The
// duplicate references (which might be forming cycles) are replaced with
// an object of the form
//      {$ref: PATH}
// where the PATH is a JSONPath string that locates the first occurance.
// So,
//      var a = [];
//      a[0] = a;
//      return JSON.stringify(JSON.decycle(a));
// produces the string '[{"$ref":"$"}]'.

// JSONPath is used to locate the unique object. $ indicates the top level of
// the object or array. [NUMBER] or [STRING] indicates a child member or
// property.

    var objects = [],   // Keep a reference to each unique object or array
        paths = [];     // Keep the path to each unique object or array

    return (function derez(value, path) {

// The derez recurses through the object, producing the deep copy.

        var i,          // The loop counter
            name,       // Property name
            nu;         // The new object or array

// typeof null === 'object', so go on if this value is really an object but not
// one of the weird builtin objects.

        if (typeof value === 'object' && value !== null &&
                !(value instanceof Boolean) &&
                !(value instanceof Date)    &&
                !(value instanceof Number)  &&
                !(value instanceof RegExp)  &&
                !(value instanceof String)) {

// If the value is an object or array, look to see if we have already
// encountered it. If so, return a $ref/path object. This is a hard way,
// linear search that will get slower as the number of unique objects grows.

            for (i = 0; i < objects.length; i += 1) {
                if (objects[i] === value) {
                    return {$ref: paths[i]};
                }
            }

// Otherwise, accumulate the unique value and its path.

            objects.push(value);
            paths.push(path);

// If it is an array, replicate the array.

            if (Object.prototype.toString.apply(value) === '[object Array]') {
                nu = [];
                for (i = 0; i < value.length; i += 1) {
                    nu[i] = derez(value[i], path + '[' + i + ']');
                }
            } else {

// If it is an object, replicate the object.

                nu = {};
                for (name in value) {
                    if (Object.prototype.hasOwnProperty.call(value, name)) {
                        nu[name] = derez(value[name],
                            path + '[' + JSON.stringify(name) + ']');
                    }
                }
            }
            return nu;
        }
        return value;
    }(object, '$'));
};


/***/ }),

/***/ "./node_modules/sc-errors/index.js":
/*!*****************************************!*\
  !*** ./node_modules/sc-errors/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var decycle = __webpack_require__(/*! ./decycle */ "./node_modules/sc-errors/decycle.js");

var isStrict = (function () { return !this; })();

function AuthTokenExpiredError(message, expiry) {
  this.name = 'AuthTokenExpiredError';
  this.message = message;
  this.expiry = expiry;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
AuthTokenExpiredError.prototype = Object.create(Error.prototype);


function AuthTokenInvalidError(message) {
  this.name = 'AuthTokenInvalidError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
AuthTokenInvalidError.prototype = Object.create(Error.prototype);


function AuthTokenNotBeforeError(message, date) {
  this.name = 'AuthTokenNotBeforeError';
  this.message = message;
  this.date = date;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
AuthTokenNotBeforeError.prototype = Object.create(Error.prototype);


// For any other auth token error.
function AuthTokenError(message) {
  this.name = 'AuthTokenError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
AuthTokenError.prototype = Object.create(Error.prototype);

// For any other auth error; not specifically related to the auth token itself.
function AuthError(message) {
  this.name = 'AuthError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
AuthError.prototype = Object.create(Error.prototype);


function SilentMiddlewareBlockedError(message, type) {
  this.name = 'SilentMiddlewareBlockedError';
  this.message = message;
  this.type = type;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
SilentMiddlewareBlockedError.prototype = Object.create(Error.prototype);


function InvalidActionError(message) {
  this.name = 'InvalidActionError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
InvalidActionError.prototype = Object.create(Error.prototype);

function InvalidArgumentsError(message) {
  this.name = 'InvalidArgumentsError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
InvalidArgumentsError.prototype = Object.create(Error.prototype);

function InvalidOptionsError(message) {
  this.name = 'InvalidOptionsError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
InvalidOptionsError.prototype = Object.create(Error.prototype);


function InvalidMessageError(message) {
  this.name = 'InvalidMessageError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
InvalidMessageError.prototype = Object.create(Error.prototype);


function SocketProtocolError(message, code) {
  this.name = 'SocketProtocolError';
  this.message = message;
  this.code = code;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
SocketProtocolError.prototype = Object.create(Error.prototype);


function ServerProtocolError(message) {
  this.name = 'ServerProtocolError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
ServerProtocolError.prototype = Object.create(Error.prototype);

function HTTPServerError(message) {
  this.name = 'HTTPServerError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
HTTPServerError.prototype = Object.create(Error.prototype);


function ResourceLimitError(message) {
  this.name = 'ResourceLimitError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
ResourceLimitError.prototype = Object.create(Error.prototype);


function TimeoutError(message) {
  this.name = 'TimeoutError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
TimeoutError.prototype = Object.create(Error.prototype);


function BadConnectionError(message, type) {
  this.name = 'BadConnectionError';
  this.message = message;
  this.type = type;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
BadConnectionError.prototype = Object.create(Error.prototype);


function BrokerError(message) {
  this.name = 'BrokerError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
BrokerError.prototype = Object.create(Error.prototype);


function ProcessExitError(message, code) {
  this.name = 'ProcessExitError';
  this.message = message;
  this.code = code;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
ProcessExitError.prototype = Object.create(Error.prototype);


function UnknownError(message) {
  this.name = 'UnknownError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
UnknownError.prototype = Object.create(Error.prototype);


// Expose all error types.

module.exports = {
  AuthTokenExpiredError: AuthTokenExpiredError,
  AuthTokenInvalidError: AuthTokenInvalidError,
  AuthTokenNotBeforeError: AuthTokenNotBeforeError,
  AuthTokenError: AuthTokenError,
  AuthError: AuthError,
  SilentMiddlewareBlockedError: SilentMiddlewareBlockedError,
  InvalidActionError: InvalidActionError,
  InvalidArgumentsError: InvalidArgumentsError,
  InvalidOptionsError: InvalidOptionsError,
  InvalidMessageError: InvalidMessageError,
  SocketProtocolError: SocketProtocolError,
  ServerProtocolError: ServerProtocolError,
  HTTPServerError: HTTPServerError,
  ResourceLimitError: ResourceLimitError,
  TimeoutError: TimeoutError,
  BadConnectionError: BadConnectionError,
  BrokerError: BrokerError,
  ProcessExitError: ProcessExitError,
  UnknownError: UnknownError
};

module.exports.socketProtocolErrorStatuses = {
  1001: 'Socket was disconnected',
  1002: 'A WebSocket protocol error was encountered',
  1003: 'Server terminated socket because it received invalid data',
  1005: 'Socket closed without status code',
  1006: 'Socket hung up',
  1007: 'Message format was incorrect',
  1008: 'Encountered a policy violation',
  1009: 'Message was too big to process',
  1010: 'Client ended the connection because the server did not comply with extension requirements',
  1011: 'Server encountered an unexpected fatal condition',
  4000: 'Server ping timed out',
  4001: 'Client pong timed out',
  4002: 'Server failed to sign auth token',
  4003: 'Failed to complete handshake',
  4004: 'Client failed to save auth token',
  4005: 'Did not receive #handshake from client before timeout',
  4006: 'Failed to bind socket to message broker',
  4007: 'Client connection establishment timed out',
  4008: 'Server rejected handshake from client',
  4009: 'Server received a message before the client handshake'
};

module.exports.socketProtocolIgnoreStatuses = {
  1000: 'Socket closed normally',
  1001: 'Socket hung up'
};

// Properties related to error domains cannot be serialized.
var unserializableErrorProperties = {
  domain: 1,
  domainEmitter: 1,
  domainThrown: 1
};

// Convert an error into a JSON-compatible type which can later be hydrated
// back to its *original* form.
module.exports.dehydrateError = function dehydrateError(error, includeStackTrace) {
  var dehydratedError;

  if (error && typeof error === 'object') {
    dehydratedError = {
      message: error.message
    };
    if (includeStackTrace) {
      dehydratedError.stack = error.stack;
    }
    for (var i in error) {
      if (!unserializableErrorProperties[i]) {
        dehydratedError[i] = error[i];
      }
    }
  } else if (typeof error === 'function') {
    dehydratedError = '[function ' + (error.name || 'anonymous') + ']';
  } else {
    dehydratedError = error;
  }

  return decycle(dehydratedError);
};

// Convert a dehydrated error back to its *original* form.
module.exports.hydrateError = function hydrateError(error) {
  var hydratedError = null;
  if (error != null) {
    if (typeof error === 'object') {
      hydratedError = new Error(error.message);
      for (var i in error) {
        if (error.hasOwnProperty(i)) {
          hydratedError[i] = error[i];
        }
      }
    } else {
      hydratedError = error;
    }
  }
  return hydratedError;
};

module.exports.decycle = decycle;


/***/ }),

/***/ "./node_modules/sc-formatter/index.js":
/*!********************************************!*\
  !*** ./node_modules/sc-formatter/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var validJSONStartRegex = /^[ \n\r\t]*[{\[]/;

var arrayBufferToBase64 = function (arraybuffer) {
  var bytes = new Uint8Array(arraybuffer);
  var len = bytes.length;
  var base64 = '';

  for (var i = 0; i < len; i += 3) {
    base64 += base64Chars[bytes[i] >> 2];
    base64 += base64Chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += base64Chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += base64Chars[bytes[i + 2] & 63];
  }

  if ((len % 3) === 2) {
    base64 = base64.substring(0, base64.length - 1) + '=';
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + '==';
  }

  return base64;
};

var binaryToBase64Replacer = function (key, value) {
  if (global.ArrayBuffer && value instanceof global.ArrayBuffer) {
    return {
      base64: true,
      data: arrayBufferToBase64(value)
    };
  } else if (global.Buffer) {
    if (value instanceof global.Buffer){
      return {
        base64: true,
        data: value.toString('base64')
      };
    }
    // Some versions of Node.js convert Buffers to Objects before they are passed to
    // the replacer function - Because of this, we need to rehydrate Buffers
    // before we can convert them to base64 strings.
    if (value && value.type === 'Buffer' && Array.isArray(value.data)) {
      var rehydratedBuffer;
      if (global.Buffer.from) {
        rehydratedBuffer = global.Buffer.from(value.data);
      } else {
        rehydratedBuffer = new global.Buffer(value.data);
      }
      return {
        base64: true,
        data: rehydratedBuffer.toString('base64')
      };
    }
  }
  return value;
};

// Decode the data which was transmitted over the wire to a JavaScript Object in a format which SC understands.
// See encode function below for more details.
module.exports.decode = function (input) {
  if (input == null) {
   return null;
  }
  // Leave ping or pong message as is
  if (input === '#1' || input === '#2') {
    return input;
  }
  var message = input.toString();

  // Performance optimization to detect invalid JSON packet sooner.
  if (!validJSONStartRegex.test(message)) {
    return message;
  }

  try {
    return JSON.parse(message);
  } catch (err) {}
  return message;
};

// Encode a raw JavaScript object (which is in the SC protocol format) into a format for
// transfering it over the wire. In this case, we just convert it into a simple JSON string.
// If you want to create your own custom codec, you can encode the object into any format
// (e.g. binary ArrayBuffer or string with any kind of compression) so long as your decode
// function is able to rehydrate that object back into its original JavaScript Object format
// (which adheres to the SC protocol).
// See https://github.com/SocketCluster/socketcluster/blob/master/socketcluster-protocol.md
// for details about the SC protocol.
module.exports.encode = function (object) {
  // Leave ping or pong message as is
  if (object === '#1' || object === '#2') {
    return object;
  }
  return JSON.stringify(object, binaryToBase64Replacer);
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/socketcluster-client/index.js":
/*!****************************************************!*\
  !*** ./node_modules/socketcluster-client/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var SCClientSocket = __webpack_require__(/*! ./lib/scclientsocket */ "./node_modules/socketcluster-client/lib/scclientsocket.js");
var factory = __webpack_require__(/*! ./lib/factory */ "./node_modules/socketcluster-client/lib/factory.js");

module.exports.factory = factory;
module.exports.SCClientSocket = SCClientSocket;

module.exports.Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/socketcluster-client/node_modules/component-emitter/index.js");

module.exports.create = function (options) {
  return factory.create(options);
};

module.exports.connect = module.exports.create;

module.exports.destroy = function (socket) {
  return factory.destroy(socket);
};

module.exports.clients = factory.clients;

module.exports.version = '14.3.1';


/***/ }),

/***/ "./node_modules/socketcluster-client/lib/auth.js":
/*!*******************************************************!*\
  !*** ./node_modules/socketcluster-client/lib/auth.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var AuthEngine = function () {
  this._internalStorage = {};
  this.isLocalStorageEnabled = this._checkLocalStorageEnabled();
};

AuthEngine.prototype._checkLocalStorageEnabled = function () {
  var err;
  try {
    // Some browsers will throw an error here if localStorage is disabled.
    global.localStorage;

    // Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
    // throw QuotaExceededError. We're going to detect this and avoid hard to debug edge cases.
    global.localStorage.setItem('__scLocalStorageTest', 1);
    global.localStorage.removeItem('__scLocalStorageTest');
  } catch (e) {
    err = e;
  }
  return !err;
};

AuthEngine.prototype.saveToken = function (name, token, options, callback) {
  if (this.isLocalStorageEnabled && global.localStorage) {
    global.localStorage.setItem(name, token);
  } else {
    this._internalStorage[name] = token;
  }
  callback && callback(null, token);
};

AuthEngine.prototype.removeToken = function (name, callback) {
  var token;

  this.loadToken(name, function (err, authToken) {
    token = authToken;
  });

  if (this.isLocalStorageEnabled && global.localStorage) {
    global.localStorage.removeItem(name);
  } else {
    delete this._internalStorage[name];
  }

  callback && callback(null, token);
};

AuthEngine.prototype.loadToken = function (name, callback) {
  var token;

  if (this.isLocalStorageEnabled && global.localStorage) {
    token = global.localStorage.getItem(name);
  } else {
    token = this._internalStorage[name] || null;
  }
  callback(null, token);
};

module.exports.AuthEngine = AuthEngine;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/socketcluster-client/lib/factory.js":
/*!**********************************************************!*\
  !*** ./node_modules/socketcluster-client/lib/factory.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var SCClientSocket = __webpack_require__(/*! ./scclientsocket */ "./node_modules/socketcluster-client/lib/scclientsocket.js");
var scErrors = __webpack_require__(/*! sc-errors */ "./node_modules/sc-errors/index.js");
var uuid = __webpack_require__(/*! uuid */ "./node_modules/socketcluster-client/node_modules/uuid/index.js");
var InvalidArgumentsError = scErrors.InvalidArgumentsError;

var _clients = {};

function getMultiplexId(options) {
  var protocolPrefix = options.secure ? 'https://' : 'http://';
  var queryString = '';
  if (options.query) {
    if (typeof options.query === 'string') {
      queryString = options.query;
    } else {
      var queryArray = [];
      var queryMap = options.query;
      for (var key in queryMap) {
        if (queryMap.hasOwnProperty(key)) {
          queryArray.push(key + '=' + queryMap[key]);
        }
      }
      if (queryArray.length) {
        queryString = '?' + queryArray.join('&');
      }
    }
  }
  var host;
  if (options.host) {
    host = options.host;
  } else {
    host = options.hostname + ':' + options.port;
  }
  return protocolPrefix + host + options.path + queryString;
}

function isUrlSecure() {
  return global.location && location.protocol === 'https:';
}

function getPort(options, isSecureDefault) {
  var isSecure = options.secure == null ? isSecureDefault : options.secure;
  return options.port || (global.location && location.port ? location.port : isSecure ? 443 : 80);
}

function create(options) {
  var self = this;

  options = options || {};

  if (options.host && !options.host.match(/[^:]+:\d{2,5}/)) {
    throw new InvalidArgumentsError('The host option should include both' +
      ' the hostname and the port number in the format "hostname:port"');
  }

  if (options.host && options.hostname) {
    throw new InvalidArgumentsError('The host option should already include' +
      ' the hostname and the port number in the format "hostname:port"' +
      ' - Because of this, you should never use host and hostname options together');
  }

  if (options.host && options.port) {
    throw new InvalidArgumentsError('The host option should already include' +
      ' the hostname and the port number in the format "hostname:port"' +
      ' - Because of this, you should never use host and port options together');
  }

  var isSecureDefault = isUrlSecure();

  var opts = {
    port: getPort(options, isSecureDefault),
    hostname: global.location && location.hostname || 'localhost',
    path: '/socketcluster/',
    secure: isSecureDefault,
    autoConnect: true,
    autoReconnect: true,
    autoSubscribeOnConnect: true,
    connectTimeout: 20000,
    ackTimeout: 10000,
    timestampRequests: false,
    timestampParam: 't',
    authEngine: null,
    authTokenName: 'socketCluster.authToken',
    binaryType: 'arraybuffer',
    multiplex: true,
    pubSubBatchDuration: null,
    cloneData: false
  };
  for (var i in options) {
    if (options.hasOwnProperty(i)) {
      opts[i] = options[i];
    }
  }
  opts.clientMap = _clients;

  if (opts.multiplex === false) {
    opts.clientId = uuid.v4();
    var socket = new SCClientSocket(opts);
    _clients[opts.clientId] = socket;
    return socket;
  }
  opts.clientId = getMultiplexId(opts);

  if (_clients[opts.clientId]) {
    if (opts.autoConnect) {
      _clients[opts.clientId].connect();
    }
  } else {
    _clients[opts.clientId] = new SCClientSocket(opts);
  }
  return _clients[opts.clientId];
}

function destroy(socket) {
  socket.destroy();
}

module.exports = {
  create: create,
  destroy: destroy,
  clients: _clients
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/socketcluster-client/lib/response.js":
/*!***********************************************************!*\
  !*** ./node_modules/socketcluster-client/lib/response.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var scErrors = __webpack_require__(/*! sc-errors */ "./node_modules/sc-errors/index.js");
var InvalidActionError = scErrors.InvalidActionError;

var Response = function (socket, id) {
  this.socket = socket;
  this.id = id;
  this.sent = false;
};

Response.prototype._respond = function (responseData) {
  if (this.sent) {
    throw new InvalidActionError('Response ' + this.id + ' has already been sent');
  } else {
    this.sent = true;
    this.socket.send(this.socket.encode(responseData));
  }
};

Response.prototype.end = function (data) {
  if (this.id) {
    var responseData = {
      rid: this.id
    };
    if (data !== undefined) {
      responseData.data = data;
    }
    this._respond(responseData);
  }
};

Response.prototype.error = function (error, data) {
  if (this.id) {
    var err = scErrors.dehydrateError(error);

    var responseData = {
      rid: this.id,
      error: err
    };
    if (data !== undefined) {
      responseData.data = data;
    }

    this._respond(responseData);
  }
};

Response.prototype.callback = function (error, data) {
  if (error) {
    this.error(error, data);
  } else {
    this.end(data);
  }
};

module.exports.Response = Response;


/***/ }),

/***/ "./node_modules/socketcluster-client/lib/scclientsocket.js":
/*!*****************************************************************!*\
  !*** ./node_modules/socketcluster-client/lib/scclientsocket.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/socketcluster-client/node_modules/component-emitter/index.js");
var SCChannel = __webpack_require__(/*! sc-channel */ "./node_modules/sc-channel/index.js").SCChannel;
var Response = __webpack_require__(/*! ./response */ "./node_modules/socketcluster-client/lib/response.js").Response;
var AuthEngine = __webpack_require__(/*! ./auth */ "./node_modules/socketcluster-client/lib/auth.js").AuthEngine;
var formatter = __webpack_require__(/*! sc-formatter */ "./node_modules/sc-formatter/index.js");
var SCTransport = __webpack_require__(/*! ./sctransport */ "./node_modules/socketcluster-client/lib/sctransport.js").SCTransport;
var querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
var LinkedList = __webpack_require__(/*! linked-list */ "./node_modules/linked-list/index.js");
var Buffer = __webpack_require__(/*! buffer/ */ "./node_modules/buffer/index.js").Buffer;
var clone = __webpack_require__(/*! clone */ "./node_modules/socketcluster-client/node_modules/clone/clone.js");

var scErrors = __webpack_require__(/*! sc-errors */ "./node_modules/sc-errors/index.js");
var InvalidArgumentsError = scErrors.InvalidArgumentsError;
var InvalidMessageError = scErrors.InvalidMessageError;
var InvalidActionError = scErrors.InvalidActionError;
var SocketProtocolError = scErrors.SocketProtocolError;
var TimeoutError = scErrors.TimeoutError;
var BadConnectionError = scErrors.BadConnectionError;

var isBrowser = typeof window !== 'undefined';


var SCClientSocket = function (opts) {
  var self = this;

  Emitter.call(this);

  this.id = null;
  this.state = this.CLOSED;
  this.authState = this.UNAUTHENTICATED;
  this.signedAuthToken = null;
  this.authToken = null;
  this.pendingReconnect = false;
  this.pendingReconnectTimeout = null;
  this.preparingPendingSubscriptions = false;
  this.clientId = opts.clientId;

  this.connectTimeout = opts.connectTimeout;
  this.ackTimeout = opts.ackTimeout;
  this.channelPrefix = opts.channelPrefix || null;
  this.disconnectOnUnload = opts.disconnectOnUnload == null ? true : opts.disconnectOnUnload;
  this.authTokenName = opts.authTokenName;

  // pingTimeout will be ackTimeout at the start, but it will
  // be updated with values provided by the 'connect' event
  this.pingTimeout = this.ackTimeout;
  this.pingTimeoutDisabled = !!opts.pingTimeoutDisabled;
  this.active = true;

  this._clientMap = opts.clientMap || {};

  var maxTimeout = Math.pow(2, 31) - 1;

  var verifyDuration = function (propertyName) {
    if (self[propertyName] > maxTimeout) {
      throw new InvalidArgumentsError('The ' + propertyName +
        ' value provided exceeded the maximum amount allowed');
    }
  };

  verifyDuration('connectTimeout');
  verifyDuration('ackTimeout');

  this._localEvents = {
    'connect': 1,
    'connectAbort': 1,
    'close': 1,
    'disconnect': 1,
    'message': 1,
    'error': 1,
    'raw': 1,
    'kickOut': 1,
    'subscribe': 1,
    'unsubscribe': 1,
    'subscribeStateChange': 1,
    'authStateChange': 1,
    'authenticate': 1,
    'deauthenticate': 1,
    'removeAuthToken': 1,
    'subscribeRequest': 1
  };

  this.connectAttempts = 0;

  this._emitBuffer = new LinkedList();
  this.channels = {};

  this.options = opts;

  this._cid = 1;

  this.options.callIdGenerator = function () {
    return self._cid++;
  };

  if (this.options.autoReconnect) {
    if (this.options.autoReconnectOptions == null) {
      this.options.autoReconnectOptions = {};
    }

    // Add properties to the this.options.autoReconnectOptions object.
    // We assign the reference to a reconnectOptions variable to avoid repetition.
    var reconnectOptions = this.options.autoReconnectOptions;
    if (reconnectOptions.initialDelay == null) {
      reconnectOptions.initialDelay = 10000;
    }
    if (reconnectOptions.randomness == null) {
      reconnectOptions.randomness = 10000;
    }
    if (reconnectOptions.multiplier == null) {
      reconnectOptions.multiplier = 1.5;
    }
    if (reconnectOptions.maxDelay == null) {
      reconnectOptions.maxDelay = 60000;
    }
  }

  if (this.options.subscriptionRetryOptions == null) {
    this.options.subscriptionRetryOptions = {};
  }

  if (this.options.authEngine) {
    this.auth = this.options.authEngine;
  } else {
    this.auth = new AuthEngine();
  }

  if (this.options.codecEngine) {
    this.codec = this.options.codecEngine;
  } else {
    // Default codec engine
    this.codec = formatter;
  }

  if (this.options.protocol) {
    var protocolOptionError = new InvalidArgumentsError('The "protocol" option' +
      ' does not affect socketcluster-client. If you want to utilize SSL/TLS' +
      ' - use "secure" option instead');
    this._onSCError(protocolOptionError);
  }

  this.options.path = this.options.path.replace(/\/$/, '') + '/';

  this.options.query = opts.query || {};
  if (typeof this.options.query === 'string') {
    this.options.query = querystring.parse(this.options.query);
  }

  this._channelEmitter = new Emitter();

  this._unloadHandler = function () {
    self.disconnect();
  };

  if (isBrowser && this.disconnectOnUnload && global.addEventListener) {
    global.addEventListener('beforeunload', this._unloadHandler, false);
  }
  this._clientMap[this.clientId] = this;

  if (this.options.autoConnect) {
    this.connect();
  }
};

SCClientSocket.prototype = Object.create(Emitter.prototype);

SCClientSocket.CONNECTING = SCClientSocket.prototype.CONNECTING = SCTransport.prototype.CONNECTING;
SCClientSocket.OPEN = SCClientSocket.prototype.OPEN = SCTransport.prototype.OPEN;
SCClientSocket.CLOSED = SCClientSocket.prototype.CLOSED = SCTransport.prototype.CLOSED;

SCClientSocket.AUTHENTICATED = SCClientSocket.prototype.AUTHENTICATED = 'authenticated';
SCClientSocket.UNAUTHENTICATED = SCClientSocket.prototype.UNAUTHENTICATED = 'unauthenticated';

SCClientSocket.PENDING = SCClientSocket.prototype.PENDING = 'pending';

SCClientSocket.ignoreStatuses = scErrors.socketProtocolIgnoreStatuses;
SCClientSocket.errorStatuses = scErrors.socketProtocolErrorStatuses;

SCClientSocket.prototype._privateEventHandlerMap = {
  '#publish': function (data) {
    var undecoratedChannelName = this._undecorateChannelName(data.channel);
    var isSubscribed = this.isSubscribed(undecoratedChannelName, true);

    if (isSubscribed) {
      this._channelEmitter.emit(undecoratedChannelName, data.data);
    }
  },
  '#kickOut': function (data) {
    var undecoratedChannelName = this._undecorateChannelName(data.channel);
    var channel = this.channels[undecoratedChannelName];
    if (channel) {
      Emitter.prototype.emit.call(this, 'kickOut', data.message, undecoratedChannelName);
      channel.emit('kickOut', data.message, undecoratedChannelName);
      this._triggerChannelUnsubscribe(channel);
    }
  },
  '#setAuthToken': function (data, response) {
    var self = this;

    if (data) {
      var triggerAuthenticate = function (err) {
        if (err) {
          // This is a non-fatal error, we don't want to close the connection
          // because of this but we do want to notify the server and throw an error
          // on the client.
          response.error(err);
          self._onSCError(err);
        } else {
          self._changeToAuthenticatedState(data.token);
          response.end();
        }
      };

      this.auth.saveToken(this.authTokenName, data.token, {}, triggerAuthenticate);
    } else {
      response.error(new InvalidMessageError('No token data provided by #setAuthToken event'));
    }
  },
  '#removeAuthToken': function (data, response) {
    var self = this;

    this.auth.removeToken(this.authTokenName, function (err, oldToken) {
      if (err) {
        // Non-fatal error - Do not close the connection
        response.error(err);
        self._onSCError(err);
      } else {
        Emitter.prototype.emit.call(self, 'removeAuthToken', oldToken);
        self._changeToUnauthenticatedStateAndClearTokens();
        response.end();
      }
    });
  },
  '#disconnect': function (data) {
    this.transport.close(data.code, data.data);
  }
};

SCClientSocket.prototype.getState = function () {
  return this.state;
};

SCClientSocket.prototype.getBytesReceived = function () {
  return this.transport.getBytesReceived();
};

SCClientSocket.prototype.deauthenticate = function (callback) {
  var self = this;

  this.auth.removeToken(this.authTokenName, function (err, oldToken) {
    if (err) {
      // Non-fatal error - Do not close the connection
      self._onSCError(err);
    } else {
      Emitter.prototype.emit.call(self, 'removeAuthToken', oldToken);
      if (self.state !== self.CLOSED) {
        self.emit('#removeAuthToken');
      }
      self._changeToUnauthenticatedStateAndClearTokens();
    }
    callback && callback(err);
  });
};

SCClientSocket.prototype.connect = SCClientSocket.prototype.open = function () {
  var self = this;

  if (!this.active) {
    var error = new InvalidActionError('Cannot connect a destroyed client');
    this._onSCError(error);
    return;
  }

  if (this.state === this.CLOSED) {
    this.pendingReconnect = false;
    this.pendingReconnectTimeout = null;
    clearTimeout(this._reconnectTimeoutRef);

    this.state = this.CONNECTING;
    Emitter.prototype.emit.call(this, 'connecting');

    if (this.transport) {
      this.transport.off();
    }

    this.transport = new SCTransport(this.auth, this.codec, this.options);

    this.transport.on('open', function (status) {
      self.state = self.OPEN;
      self._onSCOpen(status);
    });

    this.transport.on('error', function (err) {
      self._onSCError(err);
    });

    this.transport.on('close', function (code, data) {
      self.state = self.CLOSED;
      self._onSCClose(code, data);
    });

    this.transport.on('openAbort', function (code, data) {
      self.state = self.CLOSED;
      self._onSCClose(code, data, true);
    });

    this.transport.on('event', function (event, data, res) {
      self._onSCEvent(event, data, res);
    });
  }
};

SCClientSocket.prototype.reconnect = function (code, data) {
  this.disconnect(code, data);
  this.connect();
};

SCClientSocket.prototype.disconnect = function (code, data) {
  code = code || 1000;

  if (typeof code !== 'number') {
    throw new InvalidArgumentsError('If specified, the code argument must be a number');
  }

  if (this.state === this.OPEN || this.state === this.CONNECTING) {
    this.transport.close(code, data);
  } else {
    this.pendingReconnect = false;
    this.pendingReconnectTimeout = null;
    clearTimeout(this._reconnectTimeoutRef);
  }
};

SCClientSocket.prototype.destroy = function (code, data) {
  if (isBrowser && global.removeEventListener) {
    global.removeEventListener('beforeunload', this._unloadHandler, false);
  }
  this.active = false;
  this.disconnect(code, data);
  delete this._clientMap[this.clientId];
};

SCClientSocket.prototype._changeToUnauthenticatedStateAndClearTokens = function () {
  if (this.authState !== this.UNAUTHENTICATED) {
    var oldState = this.authState;
    var oldSignedToken = this.signedAuthToken;
    this.authState = this.UNAUTHENTICATED;
    this.signedAuthToken = null;
    this.authToken = null;

    var stateChangeData = {
      oldState: oldState,
      newState: this.authState
    };
    Emitter.prototype.emit.call(this, 'authStateChange', stateChangeData);
    Emitter.prototype.emit.call(this, 'deauthenticate', oldSignedToken);
  }
};

SCClientSocket.prototype._changeToAuthenticatedState = function (signedAuthToken) {
  this.signedAuthToken = signedAuthToken;
  this.authToken = this._extractAuthTokenData(signedAuthToken);

  if (this.authState !== this.AUTHENTICATED) {
    var oldState = this.authState;
    this.authState = this.AUTHENTICATED;
    var stateChangeData = {
      oldState: oldState,
      newState: this.authState,
      signedAuthToken: signedAuthToken,
      authToken: this.authToken
    };
    if (!this.preparingPendingSubscriptions) {
      this.processPendingSubscriptions();
    }

    Emitter.prototype.emit.call(this, 'authStateChange', stateChangeData);
  }
  Emitter.prototype.emit.call(this, 'authenticate', signedAuthToken);
};

SCClientSocket.prototype.decodeBase64 = function (encodedString) {
  return Buffer.from(encodedString, 'base64').toString('utf8');
};

SCClientSocket.prototype.encodeBase64 = function (decodedString) {
  return Buffer.from(decodedString, 'utf8').toString('base64');
};

SCClientSocket.prototype._extractAuthTokenData = function (signedAuthToken) {
  var tokenParts = (signedAuthToken || '').split('.');
  var encodedTokenData = tokenParts[1];
  if (encodedTokenData != null) {
    var tokenData = encodedTokenData;
    try {
      tokenData = this.decodeBase64(tokenData);
      return JSON.parse(tokenData);
    } catch (e) {
      return tokenData;
    }
  }
  return null;
};

SCClientSocket.prototype.getAuthToken = function () {
  return this.authToken;
};

SCClientSocket.prototype.getSignedAuthToken = function () {
  return this.signedAuthToken;
};

// Perform client-initiated authentication by providing an encrypted token string.
SCClientSocket.prototype.authenticate = function (signedAuthToken, callback) {
  var self = this;

  this.emit('#authenticate', signedAuthToken, function (err, authStatus) {
    if (authStatus && authStatus.isAuthenticated != null) {
      // If authStatus is correctly formatted (has an isAuthenticated property),
      // then we will rehydrate the authError.
      if (authStatus.authError) {
        authStatus.authError = scErrors.hydrateError(authStatus.authError);
      }
    } else {
      // Some errors like BadConnectionError and TimeoutError will not pass a valid
      // authStatus object to the current function, so we need to create it ourselves.
      authStatus = {
        isAuthenticated: self.authState,
        authError: null
      };
    }
    if (err) {
      if (err.name !== 'BadConnectionError' && err.name !== 'TimeoutError') {
        // In case of a bad/closed connection or a timeout, we maintain the last
        // known auth state since those errors don't mean that the token is invalid.

        self._changeToUnauthenticatedStateAndClearTokens();
      }
      callback && callback(err, authStatus);
    } else {
      self.auth.saveToken(self.authTokenName, signedAuthToken, {}, function (err) {
        if (err) {
          self._onSCError(err);
        }
        if (authStatus.isAuthenticated) {
          self._changeToAuthenticatedState(signedAuthToken);
        } else {
          self._changeToUnauthenticatedStateAndClearTokens();
        }
        callback && callback(err, authStatus);
      });
    }
  });
};

SCClientSocket.prototype._tryReconnect = function (initialDelay) {
  var self = this;

  var exponent = this.connectAttempts++;
  var reconnectOptions = this.options.autoReconnectOptions;
  var timeout;

  if (initialDelay == null || exponent > 0) {
    var initialTimeout = Math.round(reconnectOptions.initialDelay + (reconnectOptions.randomness || 0) * Math.random());

    timeout = Math.round(initialTimeout * Math.pow(reconnectOptions.multiplier, exponent));
  } else {
    timeout = initialDelay;
  }

  if (timeout > reconnectOptions.maxDelay) {
    timeout = reconnectOptions.maxDelay;
  }

  clearTimeout(this._reconnectTimeoutRef);

  this.pendingReconnect = true;
  this.pendingReconnectTimeout = timeout;
  this._reconnectTimeoutRef = setTimeout(function () {
    self.connect();
  }, timeout);
};

SCClientSocket.prototype._onSCOpen = function (status) {
  var self = this;

  this.preparingPendingSubscriptions = true;

  if (status) {
    this.id = status.id;
    this.pingTimeout = status.pingTimeout;
    this.transport.pingTimeout = this.pingTimeout;
    if (status.isAuthenticated) {
      this._changeToAuthenticatedState(status.authToken);
    } else {
      this._changeToUnauthenticatedStateAndClearTokens();
    }
  } else {
    // This can happen if auth.loadToken (in sctransport.js) fails with
    // an error - This means that the signedAuthToken cannot be loaded by
    // the auth engine and therefore, we need to unauthenticate the client.
    this._changeToUnauthenticatedStateAndClearTokens();
  }

  this.connectAttempts = 0;

  if (this.options.autoSubscribeOnConnect) {
    this.processPendingSubscriptions();
  }

  // If the user invokes the callback while in autoSubscribeOnConnect mode, it
  // won't break anything.
  Emitter.prototype.emit.call(this, 'connect', status, function () {
    self.processPendingSubscriptions();
  });

  if (this.state === this.OPEN) {
    this._flushEmitBuffer();
  }
};

SCClientSocket.prototype._onSCError = function (err) {
  var self = this;

  // Throw error in different stack frame so that error handling
  // cannot interfere with a reconnect action.
  setTimeout(function () {
    if (self.listeners('error').length < 1) {
      throw err;
    } else {
      Emitter.prototype.emit.call(self, 'error', err);
    }
  }, 0);
};

SCClientSocket.prototype._suspendSubscriptions = function () {
  var channel, newState;
  for (var channelName in this.channels) {
    if (this.channels.hasOwnProperty(channelName)) {
      channel = this.channels[channelName];
      if (channel.state === channel.SUBSCRIBED ||
        channel.state === channel.PENDING) {

        newState = channel.PENDING;
      } else {
        newState = channel.UNSUBSCRIBED;
      }

      this._triggerChannelUnsubscribe(channel, newState);
    }
  }
};

SCClientSocket.prototype._abortAllPendingEventsDueToBadConnection = function (failureType) {
  var currentNode = this._emitBuffer.head;
  var nextNode;

  while (currentNode) {
    nextNode = currentNode.next;
    var eventObject = currentNode.data;
    clearTimeout(eventObject.timeout);
    delete eventObject.timeout;
    currentNode.detach();
    currentNode = nextNode;

    var callback = eventObject.callback;
    if (callback) {
      delete eventObject.callback;
      var errorMessage = "Event '" + eventObject.event +
        "' was aborted due to a bad connection";
      var error = new BadConnectionError(errorMessage, failureType);
      callback.call(eventObject, error, eventObject);
    }
    // Cleanup any pending response callback in the transport layer too.
    if (eventObject.cid) {
      this.transport.cancelPendingResponse(eventObject.cid);
    }
  }
};

SCClientSocket.prototype._onSCClose = function (code, data, openAbort) {
  var self = this;

  this.id = null;

  if (this.transport) {
    this.transport.off();
  }
  this.pendingReconnect = false;
  this.pendingReconnectTimeout = null;
  clearTimeout(this._reconnectTimeoutRef);

  this._suspendSubscriptions();
  this._abortAllPendingEventsDueToBadConnection(openAbort ? 'connectAbort' : 'disconnect');

  // Try to reconnect
  // on server ping timeout (4000)
  // or on client pong timeout (4001)
  // or on close without status (1005)
  // or on handshake failure (4003)
  // or on handshake rejection (4008)
  // or on socket hung up (1006)
  if (this.options.autoReconnect) {
    if (code === 4000 || code === 4001 || code === 1005) {
      // If there is a ping or pong timeout or socket closes without
      // status, don't wait before trying to reconnect - These could happen
      // if the client wakes up after a period of inactivity and in this case we
      // want to re-establish the connection as soon as possible.
      this._tryReconnect(0);

      // Codes 4500 and above will be treated as permanent disconnects.
      // Socket will not try to auto-reconnect.
    } else if (code !== 1000 && code < 4500) {
      this._tryReconnect();
    }
  }

  if (openAbort) {
    Emitter.prototype.emit.call(self, 'connectAbort', code, data);
  } else {
    Emitter.prototype.emit.call(self, 'disconnect', code, data);
  }
  Emitter.prototype.emit.call(self, 'close', code, data);

  if (!SCClientSocket.ignoreStatuses[code]) {
    var closeMessage;
    if (data) {
      closeMessage = 'Socket connection closed with status code ' + code + ' and reason: ' + data;
    } else {
      closeMessage = 'Socket connection closed with status code ' + code;
    }
    var err = new SocketProtocolError(SCClientSocket.errorStatuses[code] || closeMessage, code);
    this._onSCError(err);
  }
};

SCClientSocket.prototype._onSCEvent = function (event, data, res) {
  var handler = this._privateEventHandlerMap[event];
  if (handler) {
    handler.call(this, data, res);
  } else {
    Emitter.prototype.emit.call(this, event, data, function () {
      res && res.callback.apply(res, arguments);
    });
  }
};

SCClientSocket.prototype.decode = function (message) {
  return this.transport.decode(message);
};

SCClientSocket.prototype.encode = function (object) {
  return this.transport.encode(object);
};

SCClientSocket.prototype._flushEmitBuffer = function () {
  var currentNode = this._emitBuffer.head;
  var nextNode;

  while (currentNode) {
    nextNode = currentNode.next;
    var eventObject = currentNode.data;
    currentNode.detach();
    this.transport.emitObject(eventObject);
    currentNode = nextNode;
  }
};

SCClientSocket.prototype._handleEventAckTimeout = function (eventObject, eventNode) {
  if (eventNode) {
    eventNode.detach();
  }
  delete eventObject.timeout;

  var callback = eventObject.callback;
  if (callback) {
    delete eventObject.callback;
    var error = new TimeoutError("Event response for '" + eventObject.event + "' timed out");
    callback.call(eventObject, error, eventObject);
  }
  // Cleanup any pending response callback in the transport layer too.
  if (eventObject.cid) {
    this.transport.cancelPendingResponse(eventObject.cid);
  }
};

SCClientSocket.prototype._emit = function (event, data, callback) {
  var self = this;

  if (this.state === this.CLOSED) {
    this.connect();
  }
  var eventObject = {
    event: event,
    callback: callback
  };

  var eventNode = new LinkedList.Item();

  if (this.options.cloneData) {
    eventObject.data = clone(data);
  } else {
    eventObject.data = data;
  }
  eventNode.data = eventObject;

  eventObject.timeout = setTimeout(function () {
    self._handleEventAckTimeout(eventObject, eventNode);
  }, this.ackTimeout);

  this._emitBuffer.append(eventNode);
  if (this.state === this.OPEN) {
    this._flushEmitBuffer();
  }
};

SCClientSocket.prototype.send = function (data) {
  this.transport.send(data);
};

SCClientSocket.prototype.emit = function (event, data, callback) {
  if (this._localEvents[event] == null) {
    this._emit(event, data, callback);
  } else if (event === 'error') {
    Emitter.prototype.emit.call(this, event, data);
  } else {
    var error = new InvalidActionError('The "' + event + '" event is reserved and cannot be emitted on a client socket');
    this._onSCError(error);
  }
};

SCClientSocket.prototype.publish = function (channelName, data, callback) {
  var pubData = {
    channel: this._decorateChannelName(channelName),
    data: data
  };
  this.emit('#publish', pubData, callback);
};

SCClientSocket.prototype._triggerChannelSubscribe = function (channel, subscriptionOptions) {
  var channelName = channel.name;

  if (channel.state !== channel.SUBSCRIBED) {
    var oldState = channel.state;
    channel.state = channel.SUBSCRIBED;

    var stateChangeData = {
      channel: channelName,
      oldState: oldState,
      newState: channel.state,
      subscriptionOptions: subscriptionOptions
    };
    channel.emit('subscribeStateChange', stateChangeData);
    channel.emit('subscribe', channelName, subscriptionOptions);
    Emitter.prototype.emit.call(this, 'subscribeStateChange', stateChangeData);
    Emitter.prototype.emit.call(this, 'subscribe', channelName, subscriptionOptions);
  }
};

SCClientSocket.prototype._triggerChannelSubscribeFail = function (err, channel, subscriptionOptions) {
  var channelName = channel.name;
  var meetsAuthRequirements = !channel.waitForAuth || this.authState === this.AUTHENTICATED;

  if (channel.state !== channel.UNSUBSCRIBED && meetsAuthRequirements) {
    channel.state = channel.UNSUBSCRIBED;

    channel.emit('subscribeFail', err, channelName, subscriptionOptions);
    Emitter.prototype.emit.call(this, 'subscribeFail', err, channelName, subscriptionOptions);
  }
};

// Cancel any pending subscribe callback
SCClientSocket.prototype._cancelPendingSubscribeCallback = function (channel) {
  if (channel._pendingSubscriptionCid != null) {
    this.transport.cancelPendingResponse(channel._pendingSubscriptionCid);
    delete channel._pendingSubscriptionCid;
  }
};

SCClientSocket.prototype._decorateChannelName = function (channelName) {
  if (this.channelPrefix) {
    channelName = this.channelPrefix + channelName;
  }
  return channelName;
};

SCClientSocket.prototype._undecorateChannelName = function (decoratedChannelName) {
  if (this.channelPrefix && decoratedChannelName.indexOf(this.channelPrefix) === 0) {
    return decoratedChannelName.replace(this.channelPrefix, '');
  }
  return decoratedChannelName;
};

SCClientSocket.prototype._trySubscribe = function (channel) {
  var self = this;

  var meetsAuthRequirements = !channel.waitForAuth || this.authState === this.AUTHENTICATED;

  // We can only ever have one pending subscribe action at any given time on a channel
  if (this.state === this.OPEN && !this.preparingPendingSubscriptions &&
    channel._pendingSubscriptionCid == null && meetsAuthRequirements) {

    var options = {
      noTimeout: true
    };

    var subscriptionOptions = {
      channel: this._decorateChannelName(channel.name)
    };
    if (channel.waitForAuth) {
      options.waitForAuth = true;
      subscriptionOptions.waitForAuth = options.waitForAuth;
    }
    if (channel.data) {
      subscriptionOptions.data = channel.data;
    }
    if (channel.batch) {
      options.batch = true;
      subscriptionOptions.batch = true;
    }

    channel._pendingSubscriptionCid = this.transport.emit(
      '#subscribe', subscriptionOptions, options,
      function (err) {
        delete channel._pendingSubscriptionCid;
        if (err) {
          self._triggerChannelSubscribeFail(err, channel, subscriptionOptions);
        } else {
          self._triggerChannelSubscribe(channel, subscriptionOptions);
        }
      }
    );
    Emitter.prototype.emit.call(this, 'subscribeRequest', channel.name, subscriptionOptions);
  }
};

SCClientSocket.prototype.subscribe = function (channelName, options) {
  var channel = this.channels[channelName];

  if (!channel) {
    channel = new SCChannel(channelName, this, options);
    this.channels[channelName] = channel;
  } else if (options) {
    channel.setOptions(options);
  }

  if (channel.state === channel.UNSUBSCRIBED) {
    channel.state = channel.PENDING;
    this._trySubscribe(channel);
  }

  return channel;
};

SCClientSocket.prototype._triggerChannelUnsubscribe = function (channel, newState) {
  var channelName = channel.name;
  var oldState = channel.state;

  if (newState) {
    channel.state = newState;
  } else {
    channel.state = channel.UNSUBSCRIBED;
  }
  this._cancelPendingSubscribeCallback(channel);

  if (oldState === channel.SUBSCRIBED) {
    var stateChangeData = {
      channel: channelName,
      oldState: oldState,
      newState: channel.state
    };
    channel.emit('subscribeStateChange', stateChangeData);
    channel.emit('unsubscribe', channelName);
    Emitter.prototype.emit.call(this, 'subscribeStateChange', stateChangeData);
    Emitter.prototype.emit.call(this, 'unsubscribe', channelName);
  }
};

SCClientSocket.prototype._tryUnsubscribe = function (channel) {
  var self = this;

  if (this.state === this.OPEN) {
    var options = {
      noTimeout: true
    };
    if (channel.batch) {
      options.batch = true;
    }
    // If there is a pending subscribe action, cancel the callback
    this._cancelPendingSubscribeCallback(channel);

    // This operation cannot fail because the TCP protocol guarantees delivery
    // so long as the connection remains open. If the connection closes,
    // the server will automatically unsubscribe the client and thus complete
    // the operation on the server side.
    var decoratedChannelName = this._decorateChannelName(channel.name);
    this.transport.emit('#unsubscribe', decoratedChannelName, options);
  }
};

SCClientSocket.prototype.unsubscribe = function (channelName) {
  var channel = this.channels[channelName];

  if (channel) {
    if (channel.state !== channel.UNSUBSCRIBED) {
      this._triggerChannelUnsubscribe(channel);
      this._tryUnsubscribe(channel);
    }
  }
};

SCClientSocket.prototype.channel = function (channelName, options) {
  var currentChannel = this.channels[channelName];

  if (!currentChannel) {
    currentChannel = new SCChannel(channelName, this, options);
    this.channels[channelName] = currentChannel;
  }
  return currentChannel;
};

SCClientSocket.prototype.destroyChannel = function (channelName) {
  var channel = this.channels[channelName];

  if (channel) {
    channel.unwatch();
    channel.unsubscribe();
    delete this.channels[channelName];
  }
};

SCClientSocket.prototype.subscriptions = function (includePending) {
  var subs = [];
  var channel, includeChannel;
  for (var channelName in this.channels) {
    if (this.channels.hasOwnProperty(channelName)) {
      channel = this.channels[channelName];

      if (includePending) {
        includeChannel = channel && (channel.state === channel.SUBSCRIBED ||
          channel.state === channel.PENDING);
      } else {
        includeChannel = channel && channel.state === channel.SUBSCRIBED;
      }

      if (includeChannel) {
        subs.push(channelName);
      }
    }
  }
  return subs;
};

SCClientSocket.prototype.isSubscribed = function (channelName, includePending) {
  var channel = this.channels[channelName];
  if (includePending) {
    return !!channel && (channel.state === channel.SUBSCRIBED ||
      channel.state === channel.PENDING);
  }
  return !!channel && channel.state === channel.SUBSCRIBED;
};

SCClientSocket.prototype.processPendingSubscriptions = function () {
  var self = this;

  this.preparingPendingSubscriptions = false;

  var pendingChannels = [];

  for (var i in this.channels) {
    if (this.channels.hasOwnProperty(i)) {
      var channel = this.channels[i];
      if (channel.state === channel.PENDING) {
        pendingChannels.push(channel);
      }
    }
  }

  pendingChannels.sort(function (a, b) {
    var ap = a.priority || 0;
    var bp = b.priority || 0;
    if (ap > bp) {
      return -1;
    }
    if (ap < bp) {
      return 1;
    }
    return 0;
  });

  pendingChannels.forEach(function (channel) {
    self._trySubscribe(channel);
  });
};

SCClientSocket.prototype.watch = function (channelName, handler) {
  if (typeof handler !== 'function') {
    throw new InvalidArgumentsError('No handler function was provided');
  }
  this._channelEmitter.on(channelName, handler);
};

SCClientSocket.prototype.unwatch = function (channelName, handler) {
  if (handler) {
    this._channelEmitter.removeListener(channelName, handler);
  } else {
    this._channelEmitter.removeAllListeners(channelName);
  }
};

SCClientSocket.prototype.watchers = function (channelName) {
  return this._channelEmitter.listeners(channelName);
};

module.exports = SCClientSocket;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/socketcluster-client/lib/sctransport.js":
/*!**************************************************************!*\
  !*** ./node_modules/socketcluster-client/lib/sctransport.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/socketcluster-client/node_modules/component-emitter/index.js");
var Response = __webpack_require__(/*! ./response */ "./node_modules/socketcluster-client/lib/response.js").Response;
var querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
var WebSocket;
var createWebSocket;

if (global.WebSocket) {
  WebSocket = global.WebSocket;
  createWebSocket = function (uri, options) {
    return new WebSocket(uri);
  };
} else {
  WebSocket = __webpack_require__(/*! ws */ "./node_modules/socketcluster-client/lib/ws-browser.js");
  createWebSocket = function (uri, options) {
    return new WebSocket(uri, null, options);
  };
}

var scErrors = __webpack_require__(/*! sc-errors */ "./node_modules/sc-errors/index.js");
var TimeoutError = scErrors.TimeoutError;
var BadConnectionError = scErrors.BadConnectionError;


var SCTransport = function (authEngine, codecEngine, options) {
  var self = this;

  this.state = this.CLOSED;
  this.auth = authEngine;
  this.codec = codecEngine;
  this.options = options;
  this.connectTimeout = options.connectTimeout;
  this.pingTimeout = options.ackTimeout;
  this.pingTimeoutDisabled = !!options.pingTimeoutDisabled;
  this.callIdGenerator = options.callIdGenerator;
  this.authTokenName = options.authTokenName;

  this._pingTimeoutTicker = null;
  this._callbackMap = {};
  this._batchSendList = [];

  // Open the connection.

  this.state = this.CONNECTING;
  var uri = this.uri();

  var wsSocket = createWebSocket(uri, this.options);
  wsSocket.binaryType = this.options.binaryType;

  this.socket = wsSocket;

  wsSocket.onopen = function () {
    self._onOpen();
  };

  wsSocket.onclose = function (event) {
    var code;
    if (event.code == null) {
      // This is to handle an edge case in React Native whereby
      // event.code is undefined when the mobile device is locked.
      // TODO: This is not perfect since this condition could also apply to
      // an abnormal close (no close control frame) which would be a 1006.
      code = 1005;
    } else {
      code = event.code;
    }
    self._onClose(code, event.reason);
  };

  wsSocket.onmessage = function (message, flags) {
    self._onMessage(message.data);
  };

  wsSocket.onerror = function (error) {
    // The onclose event will be called automatically after the onerror event
    // if the socket is connected - Otherwise, if it's in the middle of
    // connecting, we want to close it manually with a 1006 - This is necessary
    // to prevent inconsistent behavior when running the client in Node.js
    // vs in a browser.

    if (self.state === self.CONNECTING) {
      self._onClose(1006);
    }
  };

  this._connectTimeoutRef = setTimeout(function () {
    self._onClose(4007);
    self.socket.close(4007);
  }, this.connectTimeout);
};

SCTransport.prototype = Object.create(Emitter.prototype);

SCTransport.CONNECTING = SCTransport.prototype.CONNECTING = 'connecting';
SCTransport.OPEN = SCTransport.prototype.OPEN = 'open';
SCTransport.CLOSED = SCTransport.prototype.CLOSED = 'closed';

SCTransport.prototype.uri = function () {
  var query = this.options.query || {};
  var schema = this.options.secure ? 'wss' : 'ws';

  if (this.options.timestampRequests) {
    query[this.options.timestampParam] = (new Date()).getTime();
  }

  query = querystring.encode(query);

  if (query.length) {
    query = '?' + query;
  }

  var host;
  if (this.options.host) {
    host = this.options.host;
  } else {
    var port = '';

    if (this.options.port && ((schema === 'wss' && this.options.port !== 443)
      || (schema === 'ws' && this.options.port !== 80))) {
      port = ':' + this.options.port;
    }
    host = this.options.hostname + port;
  }

  return schema + '://' + host + this.options.path + query;
};

SCTransport.prototype._onOpen = function () {
  var self = this;

  clearTimeout(this._connectTimeoutRef);
  this._resetPingTimeout();

  this._handshake(function (err, status) {
    if (err) {
      var statusCode;
      if (status && status.code) {
        statusCode = status.code;
      } else {
        statusCode = 4003;
      }
      self._onError(err);
      self._onClose(statusCode, err.toString());
      self.socket.close(statusCode);
    } else {
      self.state = self.OPEN;
      Emitter.prototype.emit.call(self, 'open', status);
      self._resetPingTimeout();
    }
  });
};

SCTransport.prototype._handshake = function (callback) {
  var self = this;
  this.auth.loadToken(this.authTokenName, function (err, token) {
    if (err) {
      callback(err);
    } else {
      // Don't wait for this.state to be 'open'.
      // The underlying WebSocket (this.socket) is already open.
      var options = {
        force: true
      };
      self.emit('#handshake', {
        authToken: token
      }, options, function (err, status) {
        if (status) {
          // Add the token which was used as part of authentication attempt
          // to the status object.
          status.authToken = token;
          if (status.authError) {
            status.authError = scErrors.hydrateError(status.authError);
          }
        }
        callback(err, status);
      });
    }
  });
};

SCTransport.prototype._abortAllPendingEventsDueToBadConnection = function (failureType) {
  for (var i in this._callbackMap) {
    if (this._callbackMap.hasOwnProperty(i)) {
      var eventObject = this._callbackMap[i];
      delete this._callbackMap[i];

      clearTimeout(eventObject.timeout);
      delete eventObject.timeout;

      var errorMessage = "Event '" + eventObject.event +
        "' was aborted due to a bad connection";
      var badConnectionError = new BadConnectionError(errorMessage, failureType);

      var callback = eventObject.callback;
      delete eventObject.callback;
      callback.call(eventObject, badConnectionError, eventObject);
    }
  }
};

SCTransport.prototype._onClose = function (code, data) {
  delete this.socket.onopen;
  delete this.socket.onclose;
  delete this.socket.onmessage;
  delete this.socket.onerror;

  clearTimeout(this._connectTimeoutRef);
  clearTimeout(this._pingTimeoutTicker);
  clearTimeout(this._batchTimeout);

  if (this.state === this.OPEN) {
    this.state = this.CLOSED;
    Emitter.prototype.emit.call(this, 'close', code, data);
    this._abortAllPendingEventsDueToBadConnection('disconnect');

  } else if (this.state === this.CONNECTING) {
    this.state = this.CLOSED;
    Emitter.prototype.emit.call(this, 'openAbort', code, data);
    this._abortAllPendingEventsDueToBadConnection('connectAbort');
  }
};

SCTransport.prototype._handleEventObject = function (obj, message) {
  if (obj && obj.event != null) {
    var response = new Response(this, obj.cid);
    Emitter.prototype.emit.call(this, 'event', obj.event, obj.data, response);
  } else if (obj && obj.rid != null) {
    var eventObject = this._callbackMap[obj.rid];
    if (eventObject) {
      clearTimeout(eventObject.timeout);
      delete eventObject.timeout;
      delete this._callbackMap[obj.rid];

      if (eventObject.callback) {
        var rehydratedError = scErrors.hydrateError(obj.error);
        eventObject.callback(rehydratedError, obj.data);
      }
    }
  } else {
    Emitter.prototype.emit.call(this, 'event', 'raw', message);
  }
};

SCTransport.prototype._onMessage = function (message) {
  Emitter.prototype.emit.call(this, 'event', 'message', message);

  var obj = this.decode(message);

  // If ping
  if (obj === '#1') {
    this._resetPingTimeout();
    if (this.socket.readyState === this.socket.OPEN) {
      this.sendObject('#2');
    }
  } else {
    if (Array.isArray(obj)) {
      var len = obj.length;
      for (var i = 0; i < len; i++) {
        this._handleEventObject(obj[i], message);
      }
    } else {
      this._handleEventObject(obj, message);
    }
  }
};

SCTransport.prototype._onError = function (err) {
  Emitter.prototype.emit.call(this, 'error', err);
};

SCTransport.prototype._resetPingTimeout = function () {
  if (this.pingTimeoutDisabled) {
    return;
  }
  var self = this;

  var now = (new Date()).getTime();
  clearTimeout(this._pingTimeoutTicker);

  this._pingTimeoutTicker = setTimeout(function () {
    self._onClose(4000);
    self.socket.close(4000);
  }, this.pingTimeout);
};

SCTransport.prototype.getBytesReceived = function () {
  return this.socket.bytesReceived;
};

SCTransport.prototype.close = function (code, data) {
  code = code || 1000;

  if (this.state === this.OPEN) {
    var packet = {
      code: code,
      data: data
    };
    this.emit('#disconnect', packet);

    this._onClose(code, data);
    this.socket.close(code);

  } else if (this.state === this.CONNECTING) {
    this._onClose(code, data);
    this.socket.close(code);
  }
};

SCTransport.prototype.emitObject = function (eventObject, options) {
  var simpleEventObject = {
    event: eventObject.event,
    data: eventObject.data
  };

  if (eventObject.callback) {
    simpleEventObject.cid = eventObject.cid = this.callIdGenerator();
    this._callbackMap[eventObject.cid] = eventObject;
  }

  this.sendObject(simpleEventObject, options);

  return eventObject.cid || null;
};

SCTransport.prototype._handleEventAckTimeout = function (eventObject) {
  if (eventObject.cid) {
    delete this._callbackMap[eventObject.cid];
  }
  delete eventObject.timeout;

  var callback = eventObject.callback;
  if (callback) {
    delete eventObject.callback;
    var error = new TimeoutError("Event response for '" + eventObject.event + "' timed out");
    callback.call(eventObject, error, eventObject);
  }
};

// The last two optional arguments (a and b) can be options and/or callback
SCTransport.prototype.emit = function (event, data, a, b) {
  var self = this;

  var callback, options;

  if (b) {
    options = a;
    callback = b;
  } else {
    if (a instanceof Function) {
      options = {};
      callback = a;
    } else {
      options = a;
    }
  }

  var eventObject = {
    event: event,
    data: data,
    callback: callback
  };

  if (callback && !options.noTimeout) {
    eventObject.timeout = setTimeout(function () {
      self._handleEventAckTimeout(eventObject);
    }, this.options.ackTimeout);
  }

  var cid = null;
  if (this.state === this.OPEN || options.force) {
    cid = this.emitObject(eventObject, options);
  }
  return cid;
};

SCTransport.prototype.cancelPendingResponse = function (cid) {
  delete this._callbackMap[cid];
};

SCTransport.prototype.decode = function (message) {
  return this.codec.decode(message);
};

SCTransport.prototype.encode = function (object) {
  return this.codec.encode(object);
};

SCTransport.prototype.send = function (data) {
  if (this.socket.readyState !== this.socket.OPEN) {
    this._onClose(1005);
  } else {
    this.socket.send(data);
  }
};

SCTransport.prototype.serializeObject = function (object) {
  var str, formatError;
  try {
    str = this.encode(object);
  } catch (err) {
    formatError = err;
    this._onError(formatError);
  }
  if (!formatError) {
    return str;
  }
  return null;
};

SCTransport.prototype.sendObjectBatch = function (object) {
  var self = this;

  this._batchSendList.push(object);
  if (this._batchTimeout) {
    return;
  }

  this._batchTimeout = setTimeout(function () {
    delete self._batchTimeout;
    if (self._batchSendList.length) {
      var str = self.serializeObject(self._batchSendList);
      if (str != null) {
        self.send(str);
      }
      self._batchSendList = [];
    }
  }, this.options.pubSubBatchDuration || 0);
};

SCTransport.prototype.sendObjectSingle = function (object) {
  var str = this.serializeObject(object);
  if (str != null) {
    this.send(str);
  }
};

SCTransport.prototype.sendObject = function (object, options) {
  if (options && options.batch) {
    this.sendObjectBatch(object);
  } else {
    this.sendObjectSingle(object);
  }
};

module.exports.SCTransport = SCTransport;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/socketcluster-client/lib/ws-browser.js":
/*!*************************************************************!*\
  !*** ./node_modules/socketcluster-client/lib/ws-browser.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var global;
if (typeof WorkerGlobalScope !== 'undefined') {
  global = self;
} else {
  global = typeof window !== 'undefined' && window || (function() { return this; })();
}

var WebSocket = global.WebSocket || global.MozWebSocket;

/**
 * WebSocket constructor.
 *
 * The third `opts` options object gets ignored in web browsers, since it's
 * non-standard, and throws a TypeError if passed to the constructor.
 * See: https://github.com/einaros/ws/issues/227
 *
 * @param {String} uri
 * @param {Array} protocols (optional)
 * @param {Object} opts (optional)
 * @api public
 */

function ws(uri, protocols, opts) {
  var instance;
  if (protocols) {
    instance = new WebSocket(uri, protocols);
  } else {
    instance = new WebSocket(uri);
  }
  return instance;
}

if (WebSocket) ws.prototype = WebSocket.prototype;

module.exports = WebSocket ? ws : null;


/***/ }),

/***/ "./node_modules/socketcluster-client/node_modules/clone/clone.js":
/*!***********************************************************************!*\
  !*** ./node_modules/socketcluster-client/node_modules/clone/clone.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var clone = (function() {
'use strict';

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      child = new Buffer(parent.length);
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if ( true && module.exports) {
  module.exports = clone;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/socketcluster-client/node_modules/component-emitter/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/socketcluster-client/node_modules/component-emitter/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/socketcluster-client/node_modules/uuid/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/socketcluster-client/node_modules/uuid/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/socketcluster-client/node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/socketcluster-client/node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/socketcluster-client/node_modules/uuid/lib/bytesToUuid.js":
/*!********************************************************************************!*\
  !*** ./node_modules/socketcluster-client/node_modules/uuid/lib/bytesToUuid.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/socketcluster-client/node_modules/uuid/lib/rng-browser.js":
/*!********************************************************************************!*\
  !*** ./node_modules/socketcluster-client/node_modules/uuid/lib/rng-browser.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/socketcluster-client/node_modules/uuid/v1.js":
/*!*******************************************************************!*\
  !*** ./node_modules/socketcluster-client/node_modules/uuid/v1.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/socketcluster-client/node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/socketcluster-client/node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/socketcluster-client/node_modules/uuid/v4.js":
/*!*******************************************************************!*\
  !*** ./node_modules/socketcluster-client/node_modules/uuid/v4.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/socketcluster-client/node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/socketcluster-client/node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./src/app/pages/home/home-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/home/home-routing.module.ts ***!
  \***************************************************/
/*! exports provided: HomePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageRoutingModule", function() { return HomePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home.page */ "./src/app/pages/home/home.page.ts");




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_3__["HomePage"],
    }
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
HomePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], HomePageRoutingModule);



/***/ }),

/***/ "./src/app/pages/home/home.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.module.ts ***!
  \*******************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home.page */ "./src/app/pages/home/home.page.ts");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home-routing.module */ "./src/app/pages/home/home-routing.module.ts");







let HomePageModule = class HomePageModule {
};
HomePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
            _home_routing_module__WEBPACK_IMPORTED_MODULE_6__["HomePageRoutingModule"]
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_5__["HomePage"]]
    })
], HomePageModule);



/***/ }),

/***/ "./src/app/pages/home/home.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#container {\n  padding: 30px;\n}\n\n#container strong {\n  font-size: 20px;\n  line-height: 26px;\n}\n\n#container p {\n  font-size: 16px;\n  line-height: 22px;\n  color: #8c8c8c;\n  margin: 0;\n}\n\n#container a {\n  text-decoration: none;\n}\n\n#menuButtons {\n  width: 100%;\n  display: flex;\n  justify-content: space-around;\n}\n\n#menuButtons ion-button {\n  height: 45px;\n}\n\n#menuButtons ion-icon {\n  margin-right: 5px;\n}\n\nion-title h1 {\n  font-weight: bold;\n  font-size: 20px;\n  margin-top: 50px;\n}\n\nion-title p {\n  font-weight: bold;\n  font-size: 30px;\n  margin: 0;\n  margin-left: 10px;\n}\n\nion-title img {\n  width: 30px;\n}\n\nion-title span {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n#highcharts {\n  border-radius: 15px;\n}\n\nion-title {\n  --color: white;\n}\n\n.alert-wrapper.sc-ion-alert-md input {\n  color: black !important;\n}\n\n#transactionButtonsContainer {\n  width: 100%;\n  height: 106px;\n  border-radius: 50px 50px 0px 0px;\n  background-color: white;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  justify-content: flex-end;\n  transition: 0.4s ease;\n  flex-direction: column;\n  z-index: 2;\n}\n\n#loadingTransaction {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-items: center;\n  flex-direction: column;\n  margin-bottom: 105px;\n  opacity: 0;\n  z-index: 2;\n}\n\n.transactionContainer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 15px;\n}\n\n.transactionContainer > div {\n  display: flex;\n  align-items: center;\n}\n\n.transactionContainer .transactionIcon {\n  background: #80D4D2;\n  border-radius: 10px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 25px;\n  margin-right: 10px;\n}\n\n.transactionContainer > p {\n  color: #49C1BF !important;\n  font-size: 18px !important;\n}\n\n.transactionContainer .transactionSummary {\n  display: flex;\n  flex-direction: column;\n}\n\n.transactionContainer .transactionSummary p {\n  color: #49C1BF !important;\n}\n\n.transactionContainer .transactionSummary small {\n  color: #49C1BF !important;\n}\n\n#loadingTransaction p {\n  font-weight: bold;\n  color: #49C1BF;\n  margin: 0;\n}\n\n#loadingTransaction small {\n  color: #49C1BF;\n  margin: 0;\n}\n\n#loadingTransaction ion-spinner {\n  color: #8bdcda;\n}\n\n#sendContainer {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-items: center;\n  flex-direction: column;\n  margin-bottom: 110px;\n  opacity: 0;\n  z-index: 2;\n}\n\n#sendContainer > p {\n  color: #8BDCDA;\n  font-weight: bold !important;\n}\n\n#sendContainer span {\n  display: flex;\n  align-items: center;\n  transition: 0.3s ease;\n  margin-bottom: 5px;\n}\n\n#sendContainer #sendAmounts {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  margin-top: 5px;\n  margin-bottom: 20px;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n\n#sendContainer #sendAmounts > ion-button {\n  height: 50px;\n}\n\n#sendContainer #sendAmounts > ion-button#selectedFee {\n  --background: #49C1BF;\n  color: white;\n}\n\n#sendContainer span p {\n  font-weight: bold;\n  font-size: 35px;\n  color: #8BDCDA;\n  border-bottom: 3px solid;\n  padding-bottom: 9px;\n}\n\n#sendContainer span img {\n  width: 30px;\n  margin-right: 10px;\n}\n\n#sendContainer #addressForm {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n#sendContainer #addressForm p {\n  color: #49C1BF;\n  font-weight: bold;\n  margin-left: 60px;\n  margin-bottom: 10px;\n}\n\n#sendContainer ion-item {\n  border-radius: 50px;\n  --background: #80D4D2;\n  color: white;\n  font-weight: bold;\n  margin-left: 30px;\n  margin-right: 30px;\n  -webkit-animation: barFadeIn 0.3s ease forwards;\n          animation: barFadeIn 0.3s ease forwards;\n  -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n}\n\n#sendContainer #transactionFeeContainer {\n  width: 100%;\n  margin-top: 25px;\n}\n\n#sendContainer #transactionFeeContainer > p {\n  color: #49C1BF;\n  font-weight: bold;\n  margin-left: 60px;\n}\n\n#receiveContainer {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-items: center;\n  flex-direction: column;\n  margin-bottom: 110px;\n  opacity: 0;\n  z-index: 2;\n}\n\n#receiveContainer span {\n  display: flex;\n  align-items: center;\n  transition: 0.3s ease;\n  margin-bottom: 25px;\n}\n\n#receiveContainer span p {\n  font-weight: bold;\n  font-size: 35px;\n  color: #8BDCDA;\n}\n\n#receiveContainer span img {\n  width: 30px;\n  margin-right: 10px;\n}\n\n#transactionButtonsContainer > #buttonContainer {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n  margin-bottom: 15px;\n}\n\n#receiveContainer #addressForm {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n#receiveContainer #addressForm p {\n  color: #49C1BF;\n  font-weight: bold;\n  margin-left: 60px;\n  margin-bottom: 10px;\n}\n\n#receiveContainer ion-item {\n  border-radius: 50px;\n  --background: #80D4D2;\n  color: white;\n  font-weight: bold;\n  margin-left: 30px;\n  margin-right: 30px;\n  -webkit-animation: barFadeIn 0.3s ease forwards;\n          animation: barFadeIn 0.3s ease forwards;\n  -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n}\n\n#transactionButtonsContainer ion-button {\n  width: 40%;\n}\n\n.expandBox {\n  height: 220px !important;\n}\n\n.expandTransactionBox {\n  height: 415px !important;\n}\n\n.expandLoadingBox {\n  height: 220px !important;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.fadeIn {\n  -webkit-animation: fadeIn 0.3s forwards;\n          animation: fadeIn 0.3s forwards;\n  -webkit-animation-delay: 0.15s;\n          animation-delay: 0.15s;\n  z-index: 3 !important;\n}\n\n.fadeOut {\n  -webkit-animation: fadeOut 0.15s forwards;\n          animation: fadeOut 0.15s forwards;\n}\n\n@-webkit-keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    pointer-events: none;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    pointer-events: none;\n  }\n}\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes rotate {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes rotate {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.rotate {\n  transform-origin: center;\n  -webkit-animation: rotate ease 1s;\n          animation: rotate ease 1s;\n}\n\n#transactionHistory {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  background: #BFE9E8;\n  border-radius: 30px;\n  height: 65%;\n  z-index: 1;\n  padding: 5px 25px;\n  overflow-y: scroll;\n  padding-bottom: 105px;\n}\n\n#transactionHistory h2 {\n  color: #49C1BF;\n  font-weight: bold;\n  font-size: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBRUEsY0FBQTtFQUVBLFNBQUE7QUFERjs7QUFJQTtFQUNFLHFCQUFBO0FBREY7O0FBSUE7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLDZCQUFBO0FBREY7O0FBSUE7RUFDRSxZQUFBO0FBREY7O0FBSUE7RUFDRSxpQkFBQTtBQURGOztBQUlBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFERjs7QUFJQTtFQUNFLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtBQURGOztBQUlBO0VBQ0UsV0FBQTtBQURGOztBQUlBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFERjs7QUFJQTtFQUNFLG1CQUFBO0FBREY7O0FBSUE7RUFDRSxjQUFBO0FBREY7O0FBSUE7RUFDRSx1QkFBQTtBQURGOztBQUlBO0VBQ0UsV0FBQTtFQUNBLGFBQUE7RUFDQSxnQ0FBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLGFBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxVQUFBO0FBREY7O0FBSUE7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7QUFERjs7QUFJQTtFQUNFLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBREY7O0FBSUE7RUFDRSx5QkFBQTtFQUNBLDBCQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7QUFERjs7QUFJQTtFQUNFLHlCQUFBO0FBREY7O0FBSUE7RUFDRSx5QkFBQTtBQURGOztBQUlBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsU0FBQTtBQURGOztBQUlBO0VBQ0UsY0FBQTtFQUNBLFNBQUE7QUFERjs7QUFJQTtFQUNFLGNBQUE7QUFERjs7QUFJQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLG9CQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7QUFERjs7QUFJQTtFQUNFLGNBQUE7RUFDRSw0QkFBQTtBQURKOztBQUlBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtBQURGOztBQUlBO0VBQ0UsV0FBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFERjs7QUFJQTtFQUNFLFlBQUE7QUFERjs7QUFJQTtFQUNFLHFCQUFBO0VBQ0EsWUFBQTtBQURGOztBQUlBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBQUE7QUFERjs7QUFJQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtBQURGOztBQUlBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtBQURGOztBQUlBO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQURGOztBQUlBO0VBQ0UsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQ0FBQTtVQUFBLHVDQUFBO0VBQ0EsNkJBQUE7VUFBQSxxQkFBQTtBQURGOztBQUdBO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0FBQUY7O0FBR0E7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQUFGOztBQUdBO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0Esb0JBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtBQUFGOztBQUdBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQUFGOztBQUdBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0FBQUY7O0FBR0E7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsNkJBQUE7RUFDQSxtQkFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtBQUFGOztBQUdBO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQUFGOztBQUdBO0VBQ0UsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQ0FBQTtVQUFBLHVDQUFBO0VBQ0EsNkJBQUE7VUFBQSxxQkFBQTtBQUFGOztBQUdBO0VBQ0UsVUFBQTtBQUFGOztBQUdBO0VBQ0Usd0JBQUE7QUFBRjs7QUFHQTtFQUNFLHdCQUFBO0FBQUY7O0FBR0E7RUFDRSx3QkFBQTtBQUFGOztBQUdBO0VBQ0Usd0JBQUE7QUFBRjs7QUFHQTtFQUNFLHVDQUFBO1VBQUEsK0JBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EscUJBQUE7QUFBRjs7QUFHQTtFQUNFLHlDQUFBO1VBQUEsaUNBQUE7QUFBRjs7QUFHQTtFQUNFO0lBQ0UsVUFBQTtFQUFGO0VBRUE7SUFDRSxVQUFBO0lBQ0Esb0JBQUE7RUFBRjtBQUNGOztBQVBBO0VBQ0U7SUFDRSxVQUFBO0VBQUY7RUFFQTtJQUNFLFVBQUE7SUFDQSxvQkFBQTtFQUFGO0FBQ0Y7O0FBR0E7RUFDRTtJQUNFLFVBQUE7RUFERjtFQUdBO0lBQ0UsVUFBQTtFQURGO0FBQ0Y7O0FBTEE7RUFDRTtJQUNFLFVBQUE7RUFERjtFQUdBO0lBQ0UsVUFBQTtFQURGO0FBQ0Y7O0FBSUE7RUFDRTtJQUNFLHVCQUFBO0VBRkY7RUFJQTtJQUNFLHlCQUFBO0VBRkY7QUFDRjs7QUFKQTtFQUNFO0lBQ0UsdUJBQUE7RUFGRjtFQUlBO0lBQ0UseUJBQUE7RUFGRjtBQUNGOztBQUtBO0VBQ0Usd0JBQUE7RUFDQSxpQ0FBQTtVQUFBLHlCQUFBO0FBSEY7O0FBTUE7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtBQUhGOztBQU1BO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQUhGIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvaG9tZS9ob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjb250YWluZXIge1xyXG4gIHBhZGRpbmc6IDMwcHg7XHJcbn1cclxuXHJcbiNjb250YWluZXIgc3Ryb25nIHtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgbGluZS1oZWlnaHQ6IDI2cHg7XHJcbn1cclxuXHJcbiNjb250YWluZXIgcCB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAyMnB4O1xyXG5cclxuICBjb2xvcjogIzhjOGM4YztcclxuXHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4jY29udGFpbmVyIGEge1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxuI21lbnVCdXR0b25zIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG59XHJcblxyXG4jbWVudUJ1dHRvbnMgaW9uLWJ1dHRvbiB7XHJcbiAgaGVpZ2h0OiA0NXB4O1xyXG59XHJcblxyXG4jbWVudUJ1dHRvbnMgaW9uLWljb24ge1xyXG4gIG1hcmdpbi1yaWdodDogNXB4O1xyXG59XHJcblxyXG5pb24tdGl0bGUgaDEge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBtYXJnaW4tdG9wOiA1MHB4O1xyXG59XHJcblxyXG5pb24tdGl0bGUgcCB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiAzMHB4O1xyXG4gIG1hcmdpbjogMDtcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxufVxyXG5cclxuaW9uLXRpdGxlIGltZyB7XHJcbiAgd2lkdGg6IDMwcHg7XHJcbn1cclxuXHJcbmlvbi10aXRsZSBzcGFuIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbiNoaWdoY2hhcnRzIHtcclxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG59XHJcblxyXG5pb24tdGl0bGUge1xyXG4gIC0tY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uYWxlcnQtd3JhcHBlci5zYy1pb24tYWxlcnQtbWQgaW5wdXQge1xyXG4gIGNvbG9yOiBibGFjayAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4jdHJhbnNhY3Rpb25CdXR0b25zQ29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwNnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwcHggNTBweCAwcHggMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBib3R0b206IDA7XHJcbiAgbGVmdDogMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgdHJhbnNpdGlvbjogLjRzIGVhc2U7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB6LWluZGV4OiAyO1xyXG59XHJcblxyXG4jbG9hZGluZ1RyYW5zYWN0aW9uIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYm90dG9tOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIG1hcmdpbi1ib3R0b206IDEwNXB4O1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgei1pbmRleDogMjtcclxufVxyXG5cclxuLnRyYW5zYWN0aW9uQ29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi50cmFuc2FjdGlvbkNvbnRhaW5lciA+IGRpdiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4udHJhbnNhY3Rpb25Db250YWluZXIgLnRyYW5zYWN0aW9uSWNvbiB7XHJcbiAgYmFja2dyb3VuZDogIzgwRDREMjtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIHdpZHRoOiA0MHB4O1xyXG4gIGhlaWdodDogNDBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAyNXB4O1xyXG4gIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuLnRyYW5zYWN0aW9uQ29udGFpbmVyID4gcCB7XHJcbiAgY29sb3I6ICM0OUMxQkYgIWltcG9ydGFudDtcclxuICBmb250LXNpemU6IDE4cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLnRyYW5zYWN0aW9uQ29udGFpbmVyIC50cmFuc2FjdGlvblN1bW1hcnkge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG5cclxuLnRyYW5zYWN0aW9uQ29udGFpbmVyIC50cmFuc2FjdGlvblN1bW1hcnkgcCB7XHJcbiAgY29sb3I6ICM0OUMxQkYgIWltcG9ydGFudDtcclxufVxyXG5cclxuLnRyYW5zYWN0aW9uQ29udGFpbmVyIC50cmFuc2FjdGlvblN1bW1hcnkgc21hbGwge1xyXG4gIGNvbG9yOiAjNDlDMUJGICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbiNsb2FkaW5nVHJhbnNhY3Rpb24gcCB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY29sb3I6ICM0OUMxQkY7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4jbG9hZGluZ1RyYW5zYWN0aW9uIHNtYWxsIHtcclxuICBjb2xvcjogIzQ5QzFCRjtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbiNsb2FkaW5nVHJhbnNhY3Rpb24gaW9uLXNwaW5uZXIge1xyXG4gIGNvbG9yOiAjOGJkY2RhO1xyXG59XHJcblxyXG4jc2VuZENvbnRhaW5lciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvdHRvbTogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBtYXJnaW4tYm90dG9tOiAxMTBweDtcclxuICBvcGFjaXR5OiAwO1xyXG4gIHotaW5kZXg6IDI7XHJcbn1cclxuXHJcbiNzZW5kQ29udGFpbmVyID4gcCB7XHJcbiAgY29sb3I6ICM4QkRDREE7XHJcbiAgICBmb250LXdlaWdodDogYm9sZCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4jc2VuZENvbnRhaW5lciBzcGFuIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogLjNzIGVhc2U7XHJcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG59XHJcblxyXG4jc2VuZENvbnRhaW5lciAjc2VuZEFtb3VudHMge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIG1hcmdpbi10b3A6IDVweDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIHBhZGRpbmctbGVmdDogMzBweDtcclxuICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xyXG59XHJcblxyXG4jc2VuZENvbnRhaW5lciAjc2VuZEFtb3VudHMgPiBpb24tYnV0dG9uIHtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbn1cclxuXHJcbiNzZW5kQ29udGFpbmVyICNzZW5kQW1vdW50cyA+IGlvbi1idXR0b24jc2VsZWN0ZWRGZWUge1xyXG4gIC0tYmFja2dyb3VuZDogIzQ5QzFCRjtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbiNzZW5kQ29udGFpbmVyIHNwYW4gcCB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiAzNXB4O1xyXG4gIGNvbG9yOiAjOEJEQ0RBO1xyXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZDtcclxuICBwYWRkaW5nLWJvdHRvbTogOXB4O1xyXG59XHJcblxyXG4jc2VuZENvbnRhaW5lciBzcGFuIGltZyB7XHJcbiAgd2lkdGg6IDMwcHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG59XHJcblxyXG4jc2VuZENvbnRhaW5lciAjYWRkcmVzc0Zvcm0ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuI3NlbmRDb250YWluZXIgI2FkZHJlc3NGb3JtIHAge1xyXG4gIGNvbG9yOiAjNDlDMUJGO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIG1hcmdpbi1sZWZ0OiA2MHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbiNzZW5kQ29udGFpbmVyIGlvbi1pdGVtIHtcclxuICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gIC0tYmFja2dyb3VuZDogIzgwRDREMjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbWFyZ2luLWxlZnQ6IDMwcHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG4gIGFuaW1hdGlvbjogYmFyRmFkZUluIC4zcyBlYXNlIGZvcndhcmRzO1xyXG4gIGFuaW1hdGlvbi1kZWxheTogLjFzO1xyXG59XHJcbiNzZW5kQ29udGFpbmVyICN0cmFuc2FjdGlvbkZlZUNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luLXRvcDogMjVweDtcclxufVxyXG5cclxuI3NlbmRDb250YWluZXIgI3RyYW5zYWN0aW9uRmVlQ29udGFpbmVyID4gcCB7XHJcbiAgY29sb3I6ICM0OUMxQkY7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbWFyZ2luLWxlZnQ6IDYwcHg7XHJcbn1cclxuXHJcbiNyZWNlaXZlQ29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYm90dG9tOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIG1hcmdpbi1ib3R0b206IDExMHB4O1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgei1pbmRleDogMjtcclxufVxyXG5cclxuI3JlY2VpdmVDb250YWluZXIgc3BhbiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHRyYW5zaXRpb246IC4zcyBlYXNlO1xyXG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XHJcbn1cclxuXHJcbiNyZWNlaXZlQ29udGFpbmVyIHNwYW4gcCB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiAzNXB4O1xyXG4gIGNvbG9yOiAjOEJEQ0RBO1xyXG59XHJcblxyXG4jcmVjZWl2ZUNvbnRhaW5lciBzcGFuIGltZyB7XHJcbiAgd2lkdGg6IDMwcHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG59XHJcblxyXG4jdHJhbnNhY3Rpb25CdXR0b25zQ29udGFpbmVyID4gI2J1dHRvbkNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbiNyZWNlaXZlQ29udGFpbmVyICNhZGRyZXNzRm9ybSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4jcmVjZWl2ZUNvbnRhaW5lciAjYWRkcmVzc0Zvcm0gcCB7XHJcbiAgY29sb3I6ICM0OUMxQkY7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbWFyZ2luLWxlZnQ6IDYwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuI3JlY2VpdmVDb250YWluZXIgaW9uLWl0ZW0ge1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgLS1iYWNrZ3JvdW5kOiAjODBENEQyO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBtYXJnaW4tbGVmdDogMzBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgYW5pbWF0aW9uOiBiYXJGYWRlSW4gLjNzIGVhc2UgZm9yd2FyZHM7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAuMXM7XHJcbn1cclxuXHJcbiN0cmFuc2FjdGlvbkJ1dHRvbnNDb250YWluZXIgaW9uLWJ1dHRvbiB7XHJcbiAgd2lkdGg6IDQwJTtcclxufVxyXG5cclxuLmV4cGFuZEJveCB7XHJcbiAgaGVpZ2h0OiAyMjBweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZXhwYW5kVHJhbnNhY3Rpb25Cb3gge1xyXG4gIGhlaWdodDogNDE1cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLmV4cGFuZExvYWRpbmdCb3gge1xyXG4gIGhlaWdodDogMjIwcHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLmhpZGRlbiB7XHJcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZmFkZUluIHtcclxuICBhbmltYXRpb246IGZhZGVJbiAuM3MgZm9yd2FyZHM7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAuMTVzO1xyXG4gIHotaW5kZXg6IDMgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmZhZGVPdXQge1xyXG4gIGFuaW1hdGlvbjogZmFkZU91dCAuMTVzIGZvcndhcmRzO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGZhZGVPdXQge1xyXG4gIGZyb20ge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICB9XHJcbiAgdG8ge1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBmYWRlSW4ge1xyXG4gIGZyb20ge1xyXG4gICAgb3BhY2l0eTogMDtcclxuICB9XHJcbiAgdG8ge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgcm90YXRlIHtcclxuICBmcm9tIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gIH1cclxuICB0byB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gIH1cclxufVxyXG5cclxuLnJvdGF0ZSB7XHJcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4gIGFuaW1hdGlvbjogcm90YXRlIGVhc2UgMXM7XHJcbn1cclxuXHJcbiN0cmFuc2FjdGlvbkhpc3Rvcnkge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBib3R0b206IDA7XHJcbiAgbGVmdDogMDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kOiAjQkZFOUU4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgaGVpZ2h0OiA2NSU7XHJcbiAgei1pbmRleDogMTtcclxuICBwYWRkaW5nOiA1cHggMjVweDtcclxuICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbiAgcGFkZGluZy1ib3R0b206IDEwNXB4O1xyXG59XHJcblxyXG4jdHJhbnNhY3Rpb25IaXN0b3J5IGgyIHtcclxuICBjb2xvcjogIzQ5QzFCRjtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/home/home.page.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/home/home.page.ts ***!
  \*****************************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/clipboard/ngx */ "./node_modules/@ionic-native/clipboard/__ivy_ngcc__/ngx/index.js");
/* harmony import */ var _ionic_native_vibration_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/vibration/ngx */ "./node_modules/@ionic-native/vibration/__ivy_ngcc__/ngx/index.js");
/* harmony import */ var _zilliqa_js_viewblock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zilliqa-js/viewblock */ "./node_modules/@zilliqa-js/viewblock/dist/index.js");
/* harmony import */ var _zilliqa_js_viewblock__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_zilliqa_js_viewblock__WEBPACK_IMPORTED_MODULE_6__);








const { BN, Long, bytes, units, validation } = __webpack_require__(/*! @zilliqa-js/util */ "./node_modules/@zilliqa-js/util/dist/index.umd.js");
const { Zilliqa } = __webpack_require__(/*! @zilliqa-js/zilliqa */ "./node_modules/@zilliqa-js/zilliqa/dist/index.js");
const { toBech32Address, getAddressFromPrivateKey, } = __webpack_require__(/*! @zilliqa-js/crypto */ "./node_modules/@zilliqa-js/crypto/dist/index.umd.js");
const zilliqa = new Zilliqa('https://api.zilliqa.com/');
const apiClient = _zilliqa_js_viewblock__WEBPACK_IMPORTED_MODULE_6___default()({
    apiKey: '905e89d706d250f76783e41817d82af2317742831d330609e7434678d15ce62e',
});
let HomePage = class HomePage {
    constructor(vibration, platform, activatedRoute, alertController, clipboard, route) {
        this.vibration = vibration;
        this.platform = platform;
        this.activatedRoute = activatedRoute;
        this.alertController = alertController;
        this.clipboard = clipboard;
        this.route = route;
        this.expandTransactionBox = false;
        this.expandReceiveBox = false;
        this.processingTransaction = false;
        this.balance = 0;
        this.sendAddress = "";
        this.sendAmount = 0;
        this.newBalance = 0;
        this.transactionFee = 0.002;
        this.defaultTransactionFee = 0.002;
        this.fastTransactionFee = 0.003;
        this.customFee = 0;
        this.updateData = false;
    }
    ngOnInit() {
        this.platform.ready().then(() => {
            this.setupWallet();
        });
    }
    setupWallet() {
        this.activatedRoute.params.subscribe(param => {
            const privkey = param.privkey.replaceAll('"', "");
            zilliqa.wallet.addByPrivateKey(privkey);
            this.walletAddress = toBech32Address(getAddressFromPrivateKey(privkey));
            zilliqa.blockchain.getBalance(this.walletAddress).then((data) => {
                this.balance = units.fromQa(new BN(data.result.balance), units.Units.Zil);
            }).catch((error) => {
                //If balance is 0, prevent error
            });
            this.updateTransactionHistory();
        });
    }
    updateTransactionHistory() {
        apiClient.getAddressTxs(this.walletAddress, { page: 1 }).then((data) => {
            this.transactionHistory = data.docs;
        }).catch((err) => {
            console.log(err);
        });
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    updateWalletData() {
        this.vibration.vibrate(100);
        this.updateData = true;
        (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.delay(1000);
            this.updateData = false;
        }))();
        zilliqa.blockchain.getBalance(this.walletAddress).then((data) => {
            this.balance = units.fromQa(new BN(data.result.balance), units.Units.Zil);
        }).catch((error) => {
            //If balance is 0, prevent error
        });
        this.updateTransactionHistory();
    }
    confirmTransaction() {
        this.vibration.vibrate(100);
        if ((this.balance - this.sendAmount) > 0) {
            if (validation.isAddress(this.sendAddress) || validation.isBech32(this.sendAddress)) {
                this.processingTransaction = true;
                this.expandTransactionBox = false;
                const gasPrice = units.toQa('1000', units.Units.Li);
                const tx = zilliqa.blockchain.createTransaction(zilliqa.transactions.new({
                    version: 65537,
                    toAddr: this.sendAddress,
                    amount: new BN(units.toQa(this.sendAmount, units.Units.Zil)),
                    gasPrice: this.transactionFee,
                    gasLimit: Long.fromNumber(1),
                }, false)).then((response) => {
                    console.log(response);
                    this.processingTransaction = false;
                    this.updateWalletData();
                    this.vibration.vibrate([100, 200, 100]);
                }).catch((error) => {
                    console.log(error);
                });
            }
            else {
                console.log(this.sendAddress);
                this.showPopup("Error", "Address is not valid.");
            }
        }
        else {
            this.showPopup("Error", "Not enough balance to complete this transaction.");
        }
    }
    copyAddress() {
        this.showReceivePopup("ZIL address", "Your address is: " + this.walletAddress);
    }
    showCustomAmountPopup(head, message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: head,
                message: message,
                inputs: [
                    {
                        name: 'amount',
                        type: 'number'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel'
                    },
                    {
                        text: 'Set',
                        handler: (alertData) => {
                            this.sendAmount = alertData.amount;
                            this.calculateNewBalance();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    showReceivePopup(head, message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: head,
                message: message,
                buttons: [
                    {
                        text: 'Cancel'
                    },
                    {
                        text: 'Copy',
                        handler: () => {
                            this.clipboard.copy(this.walletAddress);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    showPopup(head, message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: head,
                message: message,
                buttons: [
                    {
                        text: 'Ok'
                    }
                ]
            });
            yield alert.present();
        });
    }
    increaseSend(amount) {
        this.sendAmount += amount;
        this.calculateNewBalance();
        this.vibration.vibrate(100);
    }
    setTransactionFee(amount) {
        this.transactionFee = amount;
    }
    getSelectedFee(amount) {
        if (this.transactionFee == amount) {
            return "selectedFee";
        }
    }
    getCustomFeeString() {
        if (this.transactionFee != this.defaultTransactionFee && this.transactionFee != this.fastTransactionFee) {
            return this.transactionFee + " ZIL";
        }
        else {
            return "...";
        }
    }
    setTransactionAmount() {
        this.showCustomAmountPopup("ZIL amount", "Enter the amount of ZIL you want to sent");
    }
    showCustomTransactionFeePopup(head, message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: head,
                message: message,
                inputs: [
                    {
                        name: 'amount',
                        type: 'number'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel'
                    },
                    {
                        text: 'Set',
                        handler: (alertData) => {
                            this.transactionFee = alertData.amount;
                            this.customFee = alertData.amount;
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    setCustomTransactionFee() {
        this.showCustomTransactionFeePopup("Custom fee", "Enter the amount of transaction fee you want to set");
    }
    calculateNewBalance() {
        this.newBalance = this.balance - this.sendAmount;
    }
    openSend() {
        if (!this.processingTransaction) {
            this.expandTransactionBox = !this.expandTransactionBox;
            this.vibration.vibrate(100);
        }
        else {
            this.vibration.vibrate([100, 200, 100]);
        }
    }
    openReceive() {
        if (!this.processingTransaction) {
            this.expandReceiveBox = !this.expandReceiveBox;
            this.vibration.vibrate(100);
        }
        else {
            this.vibration.vibrate([100, 200, 100]);
        }
        this.vibration.vibrate(100);
    }
    closeAction() {
        this.expandReceiveBox = false;
        this.expandTransactionBox = false;
        this.vibration.vibrate(100);
    }
    convertQa(amount) {
        return units.fromQa(new BN(amount), units.Units.Zil);
    }
    convertTimestamp(timestamp) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date(timestamp);
        return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }
    openSettings() {
        this.vibration.vibrate(100);
        this.route.navigate(['/settings/' + zilliqa.wallet.defaultAccount.privateKey]);
    }
};
HomePage.ctorParameters = () => [
    { type: _ionic_native_vibration_ngx__WEBPACK_IMPORTED_MODULE_5__["Vibration"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_4__["Clipboard"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
HomePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/home/home.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./home.page.scss */ "./src/app/pages/home/home.page.scss")).default]
    })
], HomePage);



/***/ })

}]);
//# sourceMappingURL=pages-home-home-module-es2015.js.map