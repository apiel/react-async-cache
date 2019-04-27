var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __read = (this && this.__read) || function (o, n) {
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
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _this = this;
import React, { createContext, useContext, useState, useEffect } from 'react';
import md5 from 'md5';
var initialState = {
    responses: {},
};
;
export var AsyncCacheContext = createContext(__assign({ call: function (fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }, update: function (response, fn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }, cache: function (fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    } }, initialState));
export function useAsyncCache() {
    var _this = this;
    var _a = useContext(AsyncCacheContext), call = _a.call, responses = _a.responses, rest = __rest(_a, ["call", "responses"]);
    var _b = __read(useState(), 2), id = _b[0], setId = _b[1];
    var _c = __read(useState(), 2), response = _c[0], setResponse = _c[1];
    var myCall = function (fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setId(getId(fn, args));
                call.apply(void 0, __spread([fn], args));
                return [2 /*return*/];
            });
        });
    };
    useEffect(function () {
        var storeResponse = responses[id];
        if (storeResponse && storeResponse.response &&
            (!response || JSON.stringify(response) !== JSON.stringify(storeResponse.response))) {
            setResponse(storeResponse.response);
        }
    }); // , [responses]
    return __assign({ call: myCall, response: response }, rest);
}
function getId(fn, args) {
    return md5(fn.name + "::" + JSON.stringify(args));
}
var AsyncCacheProvider = /** @class */ (function (_super) {
    __extends(AsyncCacheProvider, _super);
    function AsyncCacheProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = __assign({}, initialState);
        _this.setResponse = function (id, fn, args, requestTime, response) {
            return new Promise(function (resolve) {
                var name = fn.name;
                var responses = _this.state.responses;
                responses[id] = { name: name, args: args, response: response, requestTime: requestTime };
                _this.setState({ responses: responses }, resolve);
            });
        };
        _this.setRequestTime = function (id, fn, args) { return __awaiter(_this, void 0, void 0, function () {
            var requestTime, data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestTime = Date.now();
                        data = this.state.responses[id];
                        response = data ? data.response : null;
                        return [4 /*yield*/, this.setResponse(id, fn, args, requestTime, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, requestTime];
                }
            });
        }); };
        _this.isAlreadyRequesting = function (id) {
            var data = _this.state.responses[id];
            return data && (Date.now() - data.requestTime) < 200;
        };
        _this.call = function (fn) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var id, requestTime, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = getId(fn, args);
                            if (!!this.isAlreadyRequesting(id)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.setRequestTime(id, fn, args)];
                        case 1:
                            requestTime = _a.sent();
                            return [4 /*yield*/, fn.apply(void 0, __spread(args))];
                        case 2:
                            response = _a.sent();
                            return [4 /*yield*/, this.setResponse(id, fn, args, requestTime, response)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        _this.update = function (response, fn) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = getId(fn, args);
                            return [4 /*yield*/, this.setResponse(id, fn, args, Date.now(), response)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.cache = function (fn) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var id = getId(fn, args);
            return _this.state.responses[id].response;
        };
        return _this;
    }
    AsyncCacheProvider.prototype.render = function () {
        return (React.createElement(AsyncCacheContext.Provider, { value: {
                call: this.call,
                responses: this.state.responses,
                update: this.update,
                cache: this.cache,
            } }, this.props.children));
    };
    return AsyncCacheProvider;
}(React.Component));
export { AsyncCacheProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkFvSUE7QUFwSUEsT0FBTyxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDOUUsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBYXRCLElBQU0sWUFBWSxHQUFHO0lBQ2pCLFNBQVMsRUFBRSxFQUFlO0NBQzdCLENBQUM7QUFZRCxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0saUJBQWlCLEdBQUcsYUFBYSxZQUMxQyxJQUFJLEVBQUUsVUFBTyxFQUFNO1FBQUUsY0FBWTthQUFaLFVBQVksRUFBWixxQkFBWSxFQUFaLElBQVk7WUFBWiw2QkFBWTs7Ozs7S0FBUSxFQUN6QyxNQUFNLEVBQUUsVUFBTyxRQUFhLEVBQUUsRUFBTTtRQUFFLGNBQVk7YUFBWixVQUFZLEVBQVoscUJBQVksRUFBWixJQUFZO1lBQVosNkJBQVk7Ozs7O0tBQVEsRUFDMUQsS0FBSyxFQUFFLFVBQUMsRUFBTTtRQUFFLGNBQVk7YUFBWixVQUFZLEVBQVoscUJBQVksRUFBWixJQUFZO1lBQVosNkJBQVk7O0lBQVksQ0FBQyxJQUN0QyxZQUFZLEVBQ2pCLENBQUM7QUFNSCxNQUFNLFVBQVUsYUFBYTtJQUE3QixpQkFnQkM7SUFmRyxJQUFNLGtDQUE0RCxFQUExRCxjQUFJLEVBQUUsd0JBQVMsRUFBRSx3Q0FBeUMsQ0FBQztJQUM3RCxJQUFBLDBCQUF3QixFQUF2QixVQUFFLEVBQUUsYUFBbUIsQ0FBQztJQUN6QixJQUFBLDBCQUFvQyxFQUFuQyxnQkFBUSxFQUFFLG1CQUF5QixDQUFDO0lBQzNDLElBQU0s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