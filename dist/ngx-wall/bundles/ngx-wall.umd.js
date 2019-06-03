(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('rxjs'), require('@angular/material'), require('rxjs/operators'), require('@angular/forms'), require('ngx-sticky-modal'), require('codemirror'), require('codemirror/mode/javascript/javascript'), require('codemirror/mode/shell/shell'), require('codemirror/mode/xml/xml')) :
    typeof define === 'function' && define.amd ? define('ngx-wall', ['exports', '@angular/common', '@angular/core', 'rxjs', '@angular/material', 'rxjs/operators', '@angular/forms', 'ngx-sticky-modal', 'codemirror', 'codemirror/mode/javascript/javascript', 'codemirror/mode/shell/shell', 'codemirror/mode/xml/xml'], factory) :
    (global = global || self, factory(global['ngx-wall'] = {}, global.ng.common, global.ng.core, global.rxjs, global.ng.material, global.rxjs.operators, global.ng.forms, global.ngxStickyModal, global.CodeMirror));
}(this, function (exports, common, core, rxjs, material, operators, forms, ngxStickyModal, CodeMirror) { 'use strict';

    CodeMirror = CodeMirror && CodeMirror.hasOwnProperty('default') ? CodeMirror['default'] : CodeMirror;

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
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Guid = /** @class */ (function () {
        function Guid() {
        }
        /**
         * @return {?}
         */
        Guid.prototype.get = /**
         * @return {?}
         */
        function () {
            /**
             * @return {?}
             */
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
        return Guid;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Base64ToFile = /** @class */ (function () {
        function Base64ToFile(base64, fileName) {
            this.base64 = base64;
            this.fileName = fileName;
        }
        /**
         * @return {?}
         */
        Base64ToFile.prototype.getFile = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var arr = this.base64.split(',');
            /** @type {?} */
            var mime = arr[0].match(/:(.*?);/)[1];
            /** @type {?} */
            var bstr = atob(arr[1]);
            /** @type {?} */
            var n = bstr.length;
            /** @type {?} */
            var u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], this.fileName, { type: mime });
        };
        return Base64ToFile;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ImgEncoder = /** @class */ (function () {
        function ImgEncoder(image) {
            this.image = image;
        }
        /**
         * @return {?}
         */
        ImgEncoder.prototype.getBase64Representation = /**
         * @return {?}
         */
        function () {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                /** @type {?} */
                var reader = new FileReader();
                reader.onload = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    resolve(event.target.result);
                });
                reader.onerror = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    reject(event);
                });
                reader.readAsDataURL(_this.image);
            }));
        };
        return ImgEncoder;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WallBrick = /** @class */ (function () {
        function WallBrick(id, tag, meta) {
            this.state = {};
            this.id = id;
            this.tag = tag;
            this.meta = meta;
        }
        /**
         * @return {?}
         */
        WallBrick.prototype.getState = /**
         * @return {?}
         */
        function () {
            return JSON.parse(JSON.stringify(this.state));
        };
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} newState
         * @return {THIS}
         */
        WallBrick.prototype.updateState = /**
         * @template THIS
         * @this {THIS}
         * @param {?} newState
         * @return {THIS}
         */
        function (newState) {
            if (Object.keys(newState).length) {
                Object.assign((/** @type {?} */ (this)).state, newState);
            }
            else {
                (/** @type {?} */ (this)).state = {};
            }
            return (/** @type {?} */ (this));
        };
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} tag
         * @return {THIS}
         */
        WallBrick.prototype.turnInto = /**
         * @template THIS
         * @this {THIS}
         * @param {?} tag
         * @return {THIS}
         */
        function (tag) {
            (/** @type {?} */ (this)).tag = tag;
            (/** @type {?} */ (this)).updateState({});
            return (/** @type {?} */ (this));
        };
        /**
         * @return {?}
         */
        WallBrick.prototype.getSnapshot = /**
         * @return {?}
         */
        function () {
            return {
                id: this.id,
                tag: this.tag,
                meta: this.meta,
                state: this.getState()
            };
        };
        return WallBrick;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AddBrickEvent = /** @class */ (function () {
        function AddBrickEvent(brickId) {
            this.brickId = brickId;
        }
        return AddBrickEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BeforeChangeEvent = /** @class */ (function () {
        function BeforeChangeEvent(beforeEventType) {
            this.beforeEventType = beforeEventType;
        }
        return BeforeChangeEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MoveBrickEvent = /** @class */ (function () {
        function MoveBrickEvent(movedBrickIds, beforeBrickId) {
            this.movedBrickIds = movedBrickIds;
        }
        return MoveBrickEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RemoveBrickEvent = /** @class */ (function () {
        function RemoveBrickEvent(brick, previousBrickId, nextBrickId) {
            this.brick = brick;
            this.previousBrickId = previousBrickId;
            this.nextBrickId = nextBrickId;
        }
        return RemoveBrickEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RemoveBricksEvent = /** @class */ (function () {
        function RemoveBricksEvent(bricks, previousBrickId, nextBrickId) {
            this.bricks = bricks;
            this.previousBrickId = previousBrickId;
            this.nextBrickId = nextBrickId;
        }
        return RemoveBricksEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SetPlanEvent = /** @class */ (function () {
        function SetPlanEvent() {
        }
        return SetPlanEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TurnBrickIntoEvent = /** @class */ (function () {
        function TurnBrickIntoEvent(brickId, newTag, oldTag) {
            this.brickId = brickId;
            this.newTag = newTag;
            this.oldTag = oldTag;
        }
        return TurnBrickIntoEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var UpdateBrickStateEvent = /** @class */ (function () {
        function UpdateBrickStateEvent(brickId, brickState, oldBrickState) {
            this.brickId = brickId;
            this.brickState = brickState;
            this.oldBrickState = oldBrickState;
        }
        return UpdateBrickStateEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*
    * Execute queries commands over rows
    * */
    var /*
    * Execute queries commands over rows
    * */
    LayoutWalker = /** @class */ (function () {
        function LayoutWalker(brickRegistry) {
            this.brickRegistry = brickRegistry;
            this.rows = [];
        }
        // public API
        // public API
        /**
         * @return {?}
         */
        LayoutWalker.prototype.getRowCount = 
        // public API
        /**
         * @return {?}
         */
        function () {
            return this.rows.length;
        };
        /**
         * @param {?} firstBrickId
         * @param {?} secondBrickId
         * @return {?}
         */
        LayoutWalker.prototype.isBrickAheadOf = /**
         * @param {?} firstBrickId
         * @param {?} secondBrickId
         * @return {?}
         */
        function (firstBrickId, secondBrickId) {
            /** @type {?} */
            var brickIdsSequence = this.getBrickSequence((/**
             * @return {?}
             */
            function () { return true; })).map((/**
             * @param {?} brick
             * @return {?}
             */
            function (brick) { return brick.id; }));
            return brickIdsSequence.indexOf(firstBrickId) < brickIdsSequence.indexOf(secondBrickId);
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        LayoutWalker.prototype.getBrickTag = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            return this.getBrickById(brickId).tag;
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        LayoutWalker.prototype.getBrickById = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            return this.getBrickSequence((/**
             * @param {?} brick
             * @return {?}
             */
            function (brick) {
                return brick.id === brickId;
            }))[0];
        };
        /**
         * @return {?}
         */
        LayoutWalker.prototype.getBrickIds = /**
         * @return {?}
         */
        function () {
            return this.getBrickSequence((/**
             * @return {?}
             */
            function () { return true; })).map((/**
             * @param {?} brick
             * @return {?}
             */
            function (brick) { return brick.id; }));
        };
        /**
         * @param {?} predictor
         * @return {?}
         */
        LayoutWalker.prototype.filterBricks = /**
         * @param {?} predictor
         * @return {?}
         */
        function (predictor) {
            return this.getBrickSequence((/**
             * @param {?} wallBrick
             * @return {?}
             */
            function (wallBrick) {
                return predictor(wallBrick.getSnapshot());
            }));
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        LayoutWalker.prototype.getBrickPosition = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var brickPosition = {
                rowIndex: null,
                columnIndex: null,
                brickIndex: null
            };
            /** @type {?} */
            var i = 0;
            while (brickPosition.rowIndex === null && i < this.rows.length) {
                this.rows[i].columns.forEach((/**
                 * @param {?} column
                 * @param {?} columnIndex
                 * @return {?}
                 */
                function (column, columnIndex) {
                    /** @type {?} */
                    var brickIndex = null;
                    column.bricks.forEach((/**
                     * @param {?} brick
                     * @param {?} index
                     * @return {?}
                     */
                    function (brick, index) {
                        if (brick.id === brickId) {
                            brickIndex = index;
                        }
                    }));
                    if (brickIndex || brickIndex === 0) {
                        brickPosition.rowIndex = i;
                        brickPosition.columnIndex = columnIndex;
                        brickPosition.brickIndex = brickIndex;
                    }
                }));
                i++;
            }
            return brickPosition;
        };
        /**
         * @param {?} rowIndex
         * @return {?}
         */
        LayoutWalker.prototype.getColumnCount = /**
         * @param {?} rowIndex
         * @return {?}
         */
        function (rowIndex) {
            return this.rows[rowIndex].columns.length;
        };
        /**
         * @return {?}
         */
        LayoutWalker.prototype.getBricksCount = /**
         * @return {?}
         */
        function () {
            return this.getBrickSequence((/**
             * @return {?}
             */
            function () { return true; })).length;
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        LayoutWalker.prototype.getNextBrick = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var bricksSequence = this.getBrickSequence((/**
             * @return {?}
             */
            function () { return true; }));
            /** @type {?} */
            var brickIndex = bricksSequence.findIndex((/**
             * @param {?} brick
             * @return {?}
             */
            function (brick) {
                return brick.id === brickId;
            }));
            return bricksSequence[brickIndex + 1];
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        LayoutWalker.prototype.getNextBrickId = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var nextBrick = this.getNextBrick(brickId);
            return nextBrick && nextBrick.id;
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        LayoutWalker.prototype.getPreviousBrick = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var bricksSequence = this.getBrickSequence((/**
             * @return {?}
             */
            function () { return true; }));
            /** @type {?} */
            var brickIndex = bricksSequence.findIndex((/**
             * @param {?} brick
             * @return {?}
             */
            function (brick) {
                return brick.id === brickId;
            }));
            return bricksSequence[brickIndex - 1];
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        LayoutWalker.prototype.getPreviousBrickId = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var previousBrick = this.getPreviousBrick(brickId);
            return previousBrick && previousBrick.id;
        };
        /**
         * @param {?} predicate
         * @return {?}
         */
        LayoutWalker.prototype.getBrickSequence = /**
         * @param {?} predicate
         * @return {?}
         */
        function (predicate) {
            /** @type {?} */
            var brickSequence = [];
            this.traverse((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                row.columns.forEach((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) {
                    column.bricks.forEach((/**
                     * @param {?} brick
                     * @return {?}
                     */
                    function (brick) {
                        if (predicate(brick)) {
                            brickSequence.push(brick);
                        }
                    }));
                }));
            }));
            return brickSequence;
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        LayoutWalker.prototype.getNextTextBrickId = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var nextTextBrick = this.getNextTextBrick(brickId);
            return nextTextBrick && nextTextBrick.id;
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        LayoutWalker.prototype.getPreviousTextBrickId = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var previousTextBrick = this.getPreviousTextBrick(brickId);
            return previousTextBrick && previousTextBrick.id;
        };
        // end public API
        // end public API
        /**
         * @param {?} brickId
         * @return {?}
         */
        LayoutWalker.prototype.getNextTextBrick = 
        // end public API
        /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            var _this = this;
            /** @type {?} */
            var nextTextBricks = this.findBricksAfter(brickId, (/**
             * @param {?} currentBrick
             * @return {?}
             */
            function (currentBrick) {
                return _this.brickRegistry.get(currentBrick.tag).supportText;
            }));
            return nextTextBricks[0];
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        LayoutWalker.prototype.getPreviousTextBrick = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            var _this = this;
            /** @type {?} */
            var previousTextBricks = this.findBrickBefore(brickId, (/**
             * @param {?} currentBrick
             * @return {?}
             */
            function (currentBrick) {
                return _this.brickRegistry.get(currentBrick.tag).supportText;
            }));
            return previousTextBricks[previousTextBricks.length - 1];
        };
        /**
         * @param {?} brickId
         * @param {?} predicate
         * @return {?}
         */
        LayoutWalker.prototype.findBricksAfter = /**
         * @param {?} brickId
         * @param {?} predicate
         * @return {?}
         */
        function (brickId, predicate) {
            /** @type {?} */
            var bricks = [];
            /** @type {?} */
            var bricksSequence = this.getBrickSequence((/**
             * @return {?}
             */
            function () { return true; }));
            /** @type {?} */
            var brickIdsSequence = bricksSequence.map((/**
             * @param {?} brick
             * @return {?}
             */
            function (brick) { return brick.id; }));
            /** @type {?} */
            var currentBrickIdIndex = brickIdsSequence.indexOf(brickId);
            if (currentBrickIdIndex !== -1) {
                /** @type {?} */
                var brickIdsAfter = brickIdsSequence.splice(currentBrickIdIndex + 1);
                brickIdsAfter.forEach((/**
                 * @param {?} brickIdAfter
                 * @return {?}
                 */
                function (brickIdAfter) {
                    /** @type {?} */
                    var currentBrick = bricksSequence.find((/**
                     * @param {?} brick
                     * @return {?}
                     */
                    function (brick) {
                        return brick.id === brickIdAfter;
                    }));
                    if (predicate(currentBrick)) {
                        bricks.push(currentBrick);
                    }
                }));
            }
            return bricks;
        };
        /**
         * @param {?} brickId
         * @param {?} predicate
         * @return {?}
         */
        LayoutWalker.prototype.findBrickBefore = /**
         * @param {?} brickId
         * @param {?} predicate
         * @return {?}
         */
        function (brickId, predicate) {
            /** @type {?} */
            var bricks = [];
            /** @type {?} */
            var bricksSequence = this.getBrickSequence((/**
             * @return {?}
             */
            function () { return true; }));
            /** @type {?} */
            var brickIdsSequence = bricksSequence.map((/**
             * @param {?} brick
             * @return {?}
             */
            function (brick) { return brick.id; }));
            /** @type {?} */
            var currentBrickIdIndex = brickIdsSequence.indexOf(brickId);
            if (currentBrickIdIndex !== -1) {
                /** @type {?} */
                var brickIdsBefore = brickIdsSequence.splice(0, currentBrickIdIndex);
                brickIdsBefore.forEach((/**
                 * @param {?} brickIdBefore
                 * @return {?}
                 */
                function (brickIdBefore) {
                    /** @type {?} */
                    var currentBrick = bricksSequence.find((/**
                     * @param {?} brick
                     * @return {?}
                     */
                    function (brick) { return brick.id === brickIdBefore; }));
                    if (predicate(currentBrick)) {
                        bricks.push(currentBrick);
                    }
                }));
            }
            return bricks;
        };
        /**
         * @param {?} rows
         * @return {?}
         */
        LayoutWalker.prototype.setLayout = /**
         * @param {?} rows
         * @return {?}
         */
        function (rows) {
            this.rows = rows;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        LayoutWalker.prototype.traverse = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                fn(row);
            }));
        };
        return LayoutWalker;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*
    * Modify layout wall rows
    * */
    var /*
    * Modify layout wall rows
    * */
    WallLayout = /** @class */ (function () {
        function WallLayout(brickRegistry, layoutWalker) {
            this.brickRegistry = brickRegistry;
            this.layoutWalker = layoutWalker;
            this.rows = [];
        }
        // create new row and one column inside
        // create new row and one column inside
        /**
         * @param {?} rowIndex
         * @param {?} brick
         * @param {?=} rowId
         * @return {?}
         */
        WallLayout.prototype.addBrickToNewRow = 
        // create new row and one column inside
        /**
         * @param {?} rowIndex
         * @param {?} brick
         * @param {?=} rowId
         * @return {?}
         */
        function (rowIndex, brick, rowId) {
            /** @type {?} */
            var totalRowCount = this.rows.length;
            /** @type {?} */
            var lastRowIndex = totalRowCount - 1;
            // user cannot create row in position more than last row index + 1
            // todo: remove helper checks, lets face the problem earlier
            if (rowIndex > (lastRowIndex + 1)) {
                rowIndex = lastRowIndex + 1;
            }
            this.createNewRow(rowIndex, rowId || this.generateId());
            this.addBrick(rowIndex, 0, 0, brick);
        };
        // add only in already existing row and column
        // add only in already existing row and column
        /**
         * @param {?} rowIndex
         * @param {?} columnIndex
         * @param {?} brickIndex
         * @param {?} brick
         * @return {?}
         */
        WallLayout.prototype.addBrickToExistingColumn = 
        // add only in already existing row and column
        /**
         * @param {?} rowIndex
         * @param {?} columnIndex
         * @param {?} brickIndex
         * @param {?} brick
         * @return {?}
         */
        function (rowIndex, columnIndex, brickIndex, brick) {
            /** @type {?} */
            var column = this.getColumn(rowIndex, columnIndex);
            if (column) {
                /** @type {?} */
                var bricksCount = column.bricks.length;
                // user cannot put brick in position more than total brick count + 1
                // todo: remove helper checks, lets face the problem earlier
                if (brickIndex > (bricksCount + 1)) {
                    brickIndex = bricksCount + 1;
                }
                this.addBrick(rowIndex, columnIndex, brickIndex, brick);
            }
        };
        // create new column in existing row
        // create new column in existing row
        /**
         * @param {?} rowIndex
         * @param {?} columnIndex
         * @param {?} brick
         * @return {?}
         */
        WallLayout.prototype.addBrickToNewColumn = 
        // create new column in existing row
        /**
         * @param {?} rowIndex
         * @param {?} columnIndex
         * @param {?} brick
         * @return {?}
         */
        function (rowIndex, columnIndex, brick) {
            /** @type {?} */
            var row = this.rows[rowIndex];
            if (row) {
                /** @type {?} */
                var columnCount = row.columns.length;
                // user cannot create column in position more than total column cound + 1
                // todo: remove helper checks, lets face the problem earlier
                if (columnIndex > (columnCount + 1)) {
                    columnIndex = columnCount + 1;
                }
                this.createNewColumn(rowIndex, columnIndex);
                this.addBrick(rowIndex, columnIndex, 0, brick);
            }
        };
        /**
         * @param {?} afterBrickId
         * @param {?} movedBrickIds
         * @return {?}
         */
        WallLayout.prototype.moveBrickAfterInNewRow = /**
         * @param {?} afterBrickId
         * @param {?} movedBrickIds
         * @return {?}
         */
        function (afterBrickId, movedBrickIds) {
            var _this = this;
            movedBrickIds.reverse();
            movedBrickIds.forEach((/**
             * @param {?} movedBrickId
             * @return {?}
             */
            function (movedBrickId) {
                /** @type {?} */
                var currentMovedBrick = _this.layoutWalker.getBrickById(movedBrickId);
                _this.removeBrick(movedBrickId);
                /** @type {?} */
                var afterBrickPosition = _this.layoutWalker.getBrickPosition(afterBrickId);
                /** @type {?} */
                var newRowIndex = afterBrickPosition.rowIndex + 1;
                _this.addBrickToNewRow(newRowIndex, currentMovedBrick);
            }));
        };
        /**
         * @param {?} afterBrickId
         * @param {?} movedBrickIds
         * @return {?}
         */
        WallLayout.prototype.moveBrickAfterInSameColumn = /**
         * @param {?} afterBrickId
         * @param {?} movedBrickIds
         * @return {?}
         */
        function (afterBrickId, movedBrickIds) {
            var _this = this;
            movedBrickIds.forEach((/**
             * @param {?} movedBrickId
             * @param {?} index
             * @return {?}
             */
            function (movedBrickId, index) {
                /** @type {?} */
                var currentMovedBrick = _this.layoutWalker.getBrickById(movedBrickId);
                _this.removeBrick(movedBrickId);
                /** @type {?} */
                var afterBrickPosition = _this.layoutWalker.getBrickPosition(afterBrickId);
                _this.addBrickToExistingColumn(afterBrickPosition.rowIndex, afterBrickPosition.columnIndex, afterBrickPosition.brickIndex + index + 1, currentMovedBrick);
            }));
        };
        /**
         * @param {?} beforeBrickId
         * @param {?} movedBrickIds
         * @return {?}
         */
        WallLayout.prototype.moveBrickBeforeInNewRow = /**
         * @param {?} beforeBrickId
         * @param {?} movedBrickIds
         * @return {?}
         */
        function (beforeBrickId, movedBrickIds) {
            var _this = this;
            movedBrickIds.reverse();
            movedBrickIds.forEach((/**
             * @param {?} movedBrickId
             * @param {?} index
             * @return {?}
             */
            function (movedBrickId, index) {
                /** @type {?} */
                var currentMovedBrick = _this.layoutWalker.getBrickById(movedBrickId);
                _this.removeBrick(movedBrickId);
                /** @type {?} */
                var beforeBrickPosition;
                if (index === 0) {
                    beforeBrickPosition = _this.layoutWalker.getBrickPosition(beforeBrickId);
                }
                else {
                    beforeBrickPosition = _this.layoutWalker.getBrickPosition(movedBrickIds[index - 1]);
                }
                _this.addBrickToNewRow(beforeBrickPosition.rowIndex, currentMovedBrick);
            }));
        };
        /**
         * @param {?} beforeBrickId
         * @param {?} movedBrickIds
         * @return {?}
         */
        WallLayout.prototype.moveBrickBeforeInSameColumn = /**
         * @param {?} beforeBrickId
         * @param {?} movedBrickIds
         * @return {?}
         */
        function (beforeBrickId, movedBrickIds) {
            var _this = this;
            movedBrickIds.forEach((/**
             * @param {?} movedBrickId
             * @return {?}
             */
            function (movedBrickId) {
                /** @type {?} */
                var currentMovedBrick = _this.layoutWalker.getBrickById(movedBrickId);
                _this.removeBrick(movedBrickId);
                /** @type {?} */
                var beforeBrickPosition = _this.layoutWalker.getBrickPosition(beforeBrickId);
                _this.addBrickToExistingColumn(beforeBrickPosition.rowIndex, beforeBrickPosition.columnIndex, beforeBrickPosition.brickIndex, currentMovedBrick);
            }));
        };
        /**
         * @param {?} movedBrickIds
         * @param {?} beforeBrickId
         * @param {?} side
         * @return {?}
         */
        WallLayout.prototype.moveBrickToNewColumn = /**
         * @param {?} movedBrickIds
         * @param {?} beforeBrickId
         * @param {?} side
         * @return {?}
         */
        function (movedBrickIds, beforeBrickId, side) {
            var _this = this;
            /** @type {?} */
            var movedBricks = movedBrickIds.map((/**
             * @param {?} movedBrickId
             * @return {?}
             */
            function (movedBrickId) {
                /** @type {?} */
                var currentMovedBrick = _this.layoutWalker.getBrickById(movedBrickId);
                _this.removeBrick(movedBrickId);
                return currentMovedBrick;
            }));
            /** @type {?} */
            var beforeBrickPosition = this.layoutWalker.getBrickPosition(beforeBrickId);
            /** @type {?} */
            var columnIndex;
            // todo: move side to constant
            // todo: search across project for all hard coded variables
            if (side === 'left') {
                columnIndex = beforeBrickPosition.columnIndex;
            }
            else if (side === 'right') {
                columnIndex = beforeBrickPosition.columnIndex + 1;
            }
            movedBricks.forEach((/**
             * @param {?} movedBrick
             * @param {?} index
             * @return {?}
             */
            function (movedBrick, index) {
                if (index === 0) {
                    _this.addBrickToNewColumn(beforeBrickPosition.rowIndex, columnIndex, movedBrick);
                }
                else {
                    _this.addBrickToExistingColumn(beforeBrickPosition.rowIndex, columnIndex, index, movedBrick);
                }
            }));
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        WallLayout.prototype.removeBrick = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var brickPosition = this.layoutWalker.getBrickPosition(brickId);
            /** @type {?} */
            var row = this.rows[brickPosition.rowIndex];
            /** @type {?} */
            var column = row.columns[brickPosition.columnIndex];
            // remove brick
            column.bricks.splice(brickPosition.brickIndex, 1);
            // remove column if there are no bricks inside
            if (column.bricks.length === 0) {
                row.columns.splice(brickPosition.columnIndex, 1);
                // remove row if there are no columns inside
                if (row.columns.length === 0) {
                    this.rows.splice(brickPosition.rowIndex, 1);
                    // if there are no rows, create default
                    if (this.rows.length === 0) {
                        this.rows.push(this.initializeNewRow(this.generateId()));
                    }
                }
            }
        };
        // COMMANDS
        // COMMANDS
        /**
         * @private
         * @param {?} rowIndex
         * @param {?} columnIndex
         * @param {?} brickIndex
         * @param {?} brick
         * @return {?}
         */
        WallLayout.prototype.addBrick = 
        // COMMANDS
        /**
         * @private
         * @param {?} rowIndex
         * @param {?} columnIndex
         * @param {?} brickIndex
         * @param {?} brick
         * @return {?}
         */
        function (rowIndex, columnIndex, brickIndex, brick) {
            this.rows[rowIndex].columns[columnIndex].bricks.splice(brickIndex, 0, brick);
        };
        /**
         * @private
         * @param {?} rowIndex
         * @param {?} columnIndex
         * @return {?}
         */
        WallLayout.prototype.getColumn = /**
         * @private
         * @param {?} rowIndex
         * @param {?} columnIndex
         * @return {?}
         */
        function (rowIndex, columnIndex) {
            /** @type {?} */
            var row = this.rows[rowIndex];
            if (row) {
                return row.columns[columnIndex];
            }
            else {
                return null;
            }
        };
        /**
         * @private
         * @param {?} rowIndex
         * @param {?} rowId
         * @return {?}
         */
        WallLayout.prototype.createNewRow = /**
         * @private
         * @param {?} rowIndex
         * @param {?} rowId
         * @return {?}
         */
        function (rowIndex, rowId) {
            this.rows.splice(rowIndex, 0, this.initializeNewRow(rowId));
        };
        /**
         * @private
         * @param {?} rowIndex
         * @param {?} columnIndex
         * @return {?}
         */
        WallLayout.prototype.createNewColumn = /**
         * @private
         * @param {?} rowIndex
         * @param {?} columnIndex
         * @return {?}
         */
        function (rowIndex, columnIndex) {
            this.rows[rowIndex].columns.splice(columnIndex, 0, this.initializeNewColumn());
        };
        /**
         * @private
         * @param {?} rowId
         * @return {?}
         */
        WallLayout.prototype.initializeNewRow = /**
         * @private
         * @param {?} rowId
         * @return {?}
         */
        function (rowId) {
            return {
                id: rowId,
                columns: [
                    this.initializeNewColumn()
                ]
            };
        };
        /**
         * @private
         * @return {?}
         */
        WallLayout.prototype.initializeNewColumn = /**
         * @private
         * @return {?}
         */
        function () {
            return {
                bricks: []
            };
        };
        /**
         * @private
         * @return {?}
         */
        WallLayout.prototype.generateId = /**
         * @private
         * @return {?}
         */
        function () {
            return (new Guid()).get();
        };
        return WallLayout;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*
    * Contains Wall data structure and registers API for data manipulation.
    * Responsible to IWallDefinition->Layout and Layout->IWallDefinition transformation
    * */
    var /*
    * Contains Wall data structure and registers API for data manipulation.
    * Responsible to IWallDefinition->Layout and Layout->IWallDefinition transformation
    * */
    WallCorePlugin = /** @class */ (function () {
        function WallCorePlugin(brickRegistry) {
            this.brickRegistry = brickRegistry;
            this.name = 'core';
            this.version = '0.0.0';
            this.layoutWalker = new LayoutWalker(this.brickRegistry);
            this.DEFAULT_BRICK = 'text';
            this.events = new rxjs.Subject();
        }
        // START API
        // START API
        /**
         * @param {?} wallModel
         * @return {?}
         */
        WallCorePlugin.prototype.onWallInitialize = 
        // START API
        /**
         * @param {?} wallModel
         * @return {?}
         */
        function (wallModel) {
            var _this = this;
            this.wallModel = wallModel;
            [
                'getRowCount',
                'getBrickTag',
                'getPreviousBrickId',
                'getNextBrickId',
                'getColumnCount',
                'getBrickIds',
                'getBricksCount',
                'getNextTextBrickId',
                'getPreviousTextBrickId',
                'filterBricks',
                'isBrickAheadOf'
            ].forEach((/**
             * @param {?} methodName
             * @return {?}
             */
            function (methodName) {
                _this[methodName] = _this.layoutWalker[methodName].bind(_this.layoutWalker);
            }));
            this.wallModel.registerApi(this.name, this);
        };
        // old
        // COMMAND METHODS
        // old
        // COMMAND METHODS
        /**
         * @param {?} plan
         * @return {?}
         */
        WallCorePlugin.prototype.setPlan = 
        // old
        // COMMAND METHODS
        /**
         * @param {?} plan
         * @return {?}
         */
        function (plan) {
            var _this = this;
            this.dispatch(new BeforeChangeEvent(SetPlanEvent));
            this.layout = new WallLayout(this.brickRegistry, this.layoutWalker);
            this.layoutWalker.setLayout(this.layout.rows);
            // build tree
            plan.layout.bricks.forEach((/**
             * @param {?} row
             * @param {?} rowIndex
             * @return {?}
             */
            function (row, rowIndex) {
                row.columns.forEach((/**
                 * @param {?} column
                 * @param {?} columnIndex
                 * @return {?}
                 */
                function (column, columnIndex) {
                    column.bricks.forEach((/**
                     * @param {?} brick
                     * @param {?} brickIndex
                     * @return {?}
                     */
                    function (brick, brickIndex) {
                        /** @type {?} */
                        var planBrick = plan.bricks.find((/**
                         * @param {?} currentPlanBrick
                         * @return {?}
                         */
                        function (currentPlanBrick) {
                            return brick.id === currentPlanBrick.id;
                        }));
                        /** @type {?} */
                        var wallBrick = _this.restoreBrick(planBrick);
                        // first column in new row
                        if (columnIndex === 0) {
                            if (brickIndex === 0) {
                                _this.layout.addBrickToNewRow(rowIndex, wallBrick, row.id);
                            }
                            else {
                                _this.layout.addBrickToExistingColumn(rowIndex, columnIndex, brickIndex, wallBrick);
                            }
                        }
                        else {
                            if (brickIndex === 0) {
                                _this.layout.addBrickToNewColumn(rowIndex, columnIndex, wallBrick);
                            }
                            else {
                                _this.layout.addBrickToExistingColumn(rowIndex, columnIndex, brickIndex, wallBrick);
                            }
                        }
                    }));
                }));
            }));
            this.dispatch(new SetPlanEvent());
        };
        /**
         * @param {?} brickId
         * @param {?} tag
         * @param {?=} state
         * @return {?}
         */
        WallCorePlugin.prototype.addBrickAfterBrickId = /**
         * @param {?} brickId
         * @param {?} tag
         * @param {?=} state
         * @return {?}
         */
        function (brickId, tag, state) {
            this.dispatch(new BeforeChangeEvent(AddBrickEvent));
            /** @type {?} */
            var brickPosition = this.layoutWalker.getBrickPosition(brickId);
            /** @type {?} */
            var columnCount = this.layoutWalker.getColumnCount(brickPosition.rowIndex);
            /** @type {?} */
            var newBrick = this.createBrick(tag, state);
            if (columnCount === 1) {
                this.layout.addBrickToNewRow(brickPosition.rowIndex + 1, newBrick);
            }
            else if (columnCount > 1) {
                this.layout.addBrickToExistingColumn(brickPosition.rowIndex, brickPosition.columnIndex, brickPosition.brickIndex + 1, newBrick);
            }
            this.dispatch(new AddBrickEvent(newBrick.id));
            return this.getBrickSnapshot(newBrick.id);
        };
        /**
         * @param {?} brickId
         * @param {?} tag
         * @param {?=} state
         * @return {?}
         */
        WallCorePlugin.prototype.addBrickBeforeBrickId = /**
         * @param {?} brickId
         * @param {?} tag
         * @param {?=} state
         * @return {?}
         */
        function (brickId, tag, state) {
            this.dispatch(new BeforeChangeEvent(AddBrickEvent));
            /** @type {?} */
            var brickPosition = this.layoutWalker.getBrickPosition(brickId);
            /** @type {?} */
            var columnCount = this.layoutWalker.getColumnCount(brickPosition.rowIndex);
            /** @type {?} */
            var newBrick = this.createBrick(tag, state);
            if (columnCount === 1) {
                this.layout.addBrickToNewRow(brickPosition.rowIndex, newBrick);
            }
            else if (columnCount > 1) {
                this.layout.addBrickToExistingColumn(brickPosition.rowIndex, brickPosition.columnIndex, brickPosition.brickIndex, newBrick);
            }
            this.dispatch(new AddBrickEvent(newBrick.id));
            return this.getBrickSnapshot(newBrick.id);
        };
        // Add text brick to the bottom of wall in the new row
        // Add text brick to the bottom of wall in the new row
        /**
         * @return {?}
         */
        WallCorePlugin.prototype.addDefaultBrick = 
        // Add text brick to the bottom of wall in the new row
        /**
         * @return {?}
         */
        function () {
            this.dispatch(new BeforeChangeEvent(AddBrickEvent));
            /** @type {?} */
            var brickCount = this.layoutWalker.getBricksCount();
            /** @type {?} */
            var newBrick = this.createBrick(this.DEFAULT_BRICK);
            /** @type {?} */
            var rowIndex = brickCount ? this.layoutWalker.getRowCount() + 1 : 0;
            this.layout.addBrickToNewRow(rowIndex, newBrick);
            this.dispatch(new AddBrickEvent(newBrick.id));
        };
        /**
         * @param {?} tag
         * @param {?=} state
         * @return {?}
         */
        WallCorePlugin.prototype.addBrickAtStart = /**
         * @param {?} tag
         * @param {?=} state
         * @return {?}
         */
        function (tag, state) {
            this.dispatch(new BeforeChangeEvent(AddBrickEvent));
            /** @type {?} */
            var newBrick = this.createBrick(tag, state);
            this.layout.addBrickToNewRow(0, newBrick);
            this.dispatch(new AddBrickEvent(newBrick.id));
            return this.getBrickSnapshot(newBrick.id);
        };
        /**
         * @param {?} brickId
         * @param {?} brickState
         * @return {?}
         */
        WallCorePlugin.prototype.updateBrickState = /**
         * @param {?} brickId
         * @param {?} brickState
         * @return {?}
         */
        function (brickId, brickState) {
            this.dispatch(new BeforeChangeEvent(UpdateBrickStateEvent));
            /** @type {?} */
            var brick = this.layoutWalker.getBrickById(brickId);
            /** @type {?} */
            var oldState = JSON.parse(JSON.stringify(brick.getState()));
            brick.updateState(JSON.parse(JSON.stringify(brickState)));
            this.dispatch(new UpdateBrickStateEvent(brickId, JSON.parse(JSON.stringify(brick.getState())), oldState));
        };
        // todo: should be async operation
        // todo: should be async operation
        /**
         * @param {?} brickId
         * @return {?}
         */
        WallCorePlugin.prototype.removeBrick = 
        // todo: should be async operation
        /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            this.dispatch(new BeforeChangeEvent(RemoveBrickEvent));
            /** @type {?} */
            var nextTextBrick = this.layoutWalker.getNextTextBrick(brickId);
            /** @type {?} */
            var previousTextBrick = this.layoutWalker.getPreviousTextBrick(brickId);
            this.clearBrickResources(brickId).then((/**
             * @return {?}
             */
            function () {
            }));
            /** @type {?} */
            var removedBrick = this.layoutWalker.getBrickById(brickId);
            this.layout.removeBrick(brickId);
            this.dispatch(new RemoveBrickEvent(removedBrick.getSnapshot(), previousTextBrick && previousTextBrick.id, nextTextBrick && nextTextBrick.id));
        };
        // todo: should be async operation
        // todo: should be async operation
        /**
         * @param {?} brickIds
         * @return {?}
         */
        WallCorePlugin.prototype.removeBricks = 
        // todo: should be async operation
        /**
         * @param {?} brickIds
         * @return {?}
         */
        function (brickIds) {
            var _this = this;
            this.dispatch(new BeforeChangeEvent(RemoveBricksEvent));
            /** @type {?} */
            var nextTextBrick = this.layoutWalker.getNextBrick(brickIds[brickIds.length - 1]);
            /** @type {?} */
            var previousBrick = this.layoutWalker.getPreviousBrick(brickIds[0]);
            /** @type {?} */
            var clearPromises = brickIds.map((/**
             * @param {?} brickId
             * @return {?}
             */
            function (brickId) { return _this.clearBrickResources(brickId); }));
            Promise.all(clearPromises).then((/**
             * @return {?}
             */
            function () {
            }));
            /** @type {?} */
            var removedBricks = brickIds.map((/**
             * @param {?} brickId
             * @return {?}
             */
            function (brickId) {
                /** @type {?} */
                var removedBrick = _this.layoutWalker.getBrickById(brickId);
                _this.layout.removeBrick(brickId);
                return {
                    id: removedBrick.id,
                    tag: removedBrick.tag,
                    state: removedBrick.state
                };
            }));
            this.dispatch(new RemoveBricksEvent(removedBricks, previousBrick && previousBrick.id, nextTextBrick && nextTextBrick.id));
        };
        /**
         * Remove all bricks from layout
         * Clear all bricks external dependencies
         */
        /**
         * Remove all bricks from layout
         * Clear all bricks external dependencies
         * @return {?}
         */
        WallCorePlugin.prototype.clear = /**
         * Remove all bricks from layout
         * Clear all bricks external dependencies
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var brickIds = this.layoutWalker.getBrickIds();
            // todo: replace it after removeBricks will be async
            /** @type {?} */
            var clearPromises = brickIds.map((/**
             * @param {?} brickId
             * @return {?}
             */
            function (brickId) { return _this.clearBrickResources(brickId); }));
            return Promise.all(clearPromises).then((/**
             * @return {?}
             */
            function () {
                brickIds.forEach((/**
                 * @param {?} brickId
                 * @return {?}
                 */
                function (brickId) {
                    _this.layout.removeBrick(brickId);
                }));
            }));
        };
        /**
         * @param {?} brickId
         * @param {?} newTag
         * @param {?=} state
         * @return {?}
         */
        WallCorePlugin.prototype.turnBrickInto = /**
         * @param {?} brickId
         * @param {?} newTag
         * @param {?=} state
         * @return {?}
         */
        function (brickId, newTag, state) {
            if (state === void 0) { state = {}; }
            this.dispatch(new BeforeChangeEvent(TurnBrickIntoEvent));
            /** @type {?} */
            var brick = this.layoutWalker.getBrickById(brickId);
            /** @type {?} */
            var oldTag = brick.tag;
            brick
                .turnInto(newTag)
                .updateState(state);
            this.dispatch(new TurnBrickIntoEvent(brickId, newTag, oldTag));
        };
        /**
         * @param {?} movedBrickIds
         * @param {?} afterBrickId
         * @return {?}
         */
        WallCorePlugin.prototype.moveBrickAfterBrickId = /**
         * @param {?} movedBrickIds
         * @param {?} afterBrickId
         * @return {?}
         */
        function (movedBrickIds, afterBrickId) {
            if (movedBrickIds.indexOf(afterBrickId) === -1) {
                this.dispatch(new BeforeChangeEvent(MoveBrickEvent));
                /** @type {?} */
                var afterBrickPosition = this.layoutWalker.getBrickPosition(afterBrickId);
                /** @type {?} */
                var columnCount = this.layoutWalker.getColumnCount(afterBrickPosition.rowIndex);
                if (columnCount === 1) {
                    this.layout.moveBrickAfterInNewRow(afterBrickId, movedBrickIds);
                }
                else {
                    this.layout.moveBrickAfterInSameColumn(afterBrickId, movedBrickIds);
                }
                this.dispatch(new MoveBrickEvent(movedBrickIds, afterBrickId));
            }
        };
        /**
         * @param {?} movedBrickIds
         * @param {?} beforeBrickId
         * @return {?}
         */
        WallCorePlugin.prototype.moveBrickBeforeBrickId = /**
         * @param {?} movedBrickIds
         * @param {?} beforeBrickId
         * @return {?}
         */
        function (movedBrickIds, beforeBrickId) {
            if (movedBrickIds.indexOf(beforeBrickId) === -1) {
                this.dispatch(new BeforeChangeEvent(MoveBrickEvent));
                /** @type {?} */
                var beforeBrickPosition = this.layoutWalker.getBrickPosition(beforeBrickId);
                /** @type {?} */
                var columnCount = this.layoutWalker.getColumnCount(beforeBrickPosition.rowIndex);
                if (columnCount === 1) {
                    this.layout.moveBrickBeforeInNewRow(beforeBrickId, movedBrickIds);
                }
                else {
                    this.layout.moveBrickBeforeInSameColumn(beforeBrickId, movedBrickIds);
                }
                this.dispatch(new MoveBrickEvent(movedBrickIds, beforeBrickId));
            }
        };
        /**
         * @param {?} targetBrickIds
         * @param {?} beforeBrickId
         * @param {?} side
         * @return {?}
         */
        WallCorePlugin.prototype.moveBrickToNewColumn = /**
         * @param {?} targetBrickIds
         * @param {?} beforeBrickId
         * @param {?} side
         * @return {?}
         */
        function (targetBrickIds, beforeBrickId, side) {
            if (targetBrickIds.indexOf(beforeBrickId) === -1) {
                this.dispatch(new BeforeChangeEvent(MoveBrickEvent));
                this.layout.moveBrickToNewColumn(targetBrickIds, beforeBrickId, side);
                this.dispatch(new MoveBrickEvent(targetBrickIds, beforeBrickId));
            }
        };
        // QUERY METHODS
        // QUERY METHODS
        /**
         * @return {?}
         */
        WallCorePlugin.prototype.getPlan = 
        // QUERY METHODS
        /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var plan = {
                bricks: [],
                layout: {
                    bricks: []
                }
            };
            this.layoutWalker.traverse((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                /** @type {?} */
                var columns = [];
                row.columns.forEach((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) {
                    /** @type {?} */
                    var planColumn = {
                        bricks: []
                    };
                    column.bricks.forEach((/**
                     * @param {?} brick
                     * @return {?}
                     */
                    function (brick) {
                        plan.bricks.push({
                            id: brick.id,
                            tag: brick.tag,
                            meta: brick.meta,
                            data: brick.state
                        });
                        planColumn.bricks.push({
                            id: brick.id
                        });
                    }));
                    columns.push(planColumn);
                }));
                plan.layout.bricks.push({
                    columns: columns,
                    id: row.id
                });
            }));
            return JSON.parse(JSON.stringify(plan));
        };
        /**
         * @param {?} brickIds
         * @return {?}
         */
        WallCorePlugin.prototype.sortBrickIdsByLayoutOrder = /**
         * @param {?} brickIds
         * @return {?}
         */
        function (brickIds) {
            /** @type {?} */
            var bricksSequence = this.layoutWalker.getBrickSequence((/**
             * @return {?}
             */
            function () { return true; }));
            return bricksSequence
                .filter((/**
             * @param {?} brick
             * @return {?}
             */
            function (brick) { return brickIds.indexOf(brick.id) !== -1; }))
                .map((/**
             * @param {?} brick
             * @return {?}
             */
            function (brick) { return brick.id; }));
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        WallCorePlugin.prototype.traverse = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            return this.layoutWalker.traverse((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                /** @type {?} */
                var preparedRow = {
                    id: row.id,
                    columns: row.columns.map((/**
                     * @param {?} column
                     * @return {?}
                     */
                    function (column) {
                        return {
                            bricks: column.bricks.map((/**
                             * @param {?} brick
                             * @return {?}
                             */
                            function (brick) { return brick.getSnapshot(); }))
                        };
                    }))
                };
                fn(preparedRow);
            }));
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        WallCorePlugin.prototype.getBrickSnapshot = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var brick = this.layoutWalker.getBrickById(brickId);
            return brick ? brick.getSnapshot() : null;
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        WallCorePlugin.prototype.getBrickResourcePaths = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var brick = this.layoutWalker.getBrickById(brickId);
            /** @type {?} */
            var brickSpecification = this.brickRegistry.get(brick.tag);
            if (!brickSpecification.getBrickResourcePaths) {
                return [];
            }
            return brickSpecification.getBrickResourcePaths(brick.getSnapshot());
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        WallCorePlugin.prototype.getBrickTextRepresentation = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var brick = this.layoutWalker.getBrickById(brickId);
            /** @type {?} */
            var brickSpecification = this.brickRegistry.get(brick.tag);
            if (brickSpecification.textRepresentation) {
                /** @type {?} */
                var brickTextRepresentation = new brickSpecification.textRepresentation(brick.getSnapshot());
                return brickTextRepresentation.getText() || '';
            }
            else {
                return '';
            }
        };
        /**
         * @param {?} callback
         * @return {?}
         */
        WallCorePlugin.prototype.subscribe = /**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            return this.events.subscribe(callback);
        };
        /**
         * @param {?} tag
         * @return {?}
         */
        WallCorePlugin.prototype.isRegisteredBrick = /**
         * @param {?} tag
         * @return {?}
         */
        function (tag) {
            return Boolean(this.brickRegistry.get(tag));
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        WallCorePlugin.prototype.dispatch = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.events.next(e);
        };
        /**
         * @private
         * @param {?} tag
         * @param {?=} state
         * @return {?}
         */
        WallCorePlugin.prototype.createBrick = /**
         * @private
         * @param {?} tag
         * @param {?=} state
         * @return {?}
         */
        function (tag, state) {
            /** @type {?} */
            var id = this.generateGuid();
            /** @type {?} */
            var meta = {};
            /** @type {?} */
            var brick = new WallBrick(id, tag, meta);
            if (state) {
                brick.updateState(state);
            }
            return brick;
        };
        /**
         * @private
         * @param {?} brickDefinition
         * @return {?}
         */
        WallCorePlugin.prototype.restoreBrick = /**
         * @private
         * @param {?} brickDefinition
         * @return {?}
         */
        function (brickDefinition) {
            /** @type {?} */
            var brick = new WallBrick(brickDefinition.id, brickDefinition.tag, brickDefinition.meta);
            brick.updateState(brickDefinition.data);
            return brick;
        };
        /**
         * @private
         * @param {?} brickId
         * @return {?}
         */
        WallCorePlugin.prototype.clearBrickResources = /**
         * @private
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var brick = this.layoutWalker.getBrickById(brickId);
            /** @type {?} */
            var brickSpecification = this.brickRegistry.get(brick.tag);
            if (brickSpecification.destructor) {
                return brickSpecification.destructor(brick.getSnapshot());
            }
            else {
                return Promise.resolve();
            }
        };
        /**
         * @private
         * @return {?}
         */
        WallCorePlugin.prototype.generateGuid = /**
         * @private
         * @return {?}
         */
        function () {
            return (new Guid()).get();
        };
        return WallCorePlugin;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WallPluginInitializedEvent = /** @class */ (function () {
        function WallPluginInitializedEvent(pluginName) {
            this.pluginName = pluginName;
        }
        return WallPluginInitializedEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WallModel = /** @class */ (function () {
        function WallModel(brickRegistry, config) {
            var _this = this;
            this.brickRegistry = brickRegistry;
            // plugin api
            this.api = {
                core: null
            };
            this.events$ = new rxjs.Subject();
            this.plugins = new Map();
            // initialize 3rd party plugins
            config.plugins.forEach((/**
             * @param {?} plugin
             * @return {?}
             */
            function (plugin) { return _this.initializePlugin(plugin); }));
        }
        // register external API
        // register external API
        /**
         * @param {?} apiName
         * @param {?} api
         * @return {?}
         */
        WallModel.prototype.registerApi = 
        // register external API
        /**
         * @param {?} apiName
         * @param {?} api
         * @return {?}
         */
        function (apiName, api) {
            this.api[apiName] = api;
        };
        /**
         * @return {?}
         */
        WallModel.prototype.destroy = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.plugins.forEach((/**
             * @param {?} plugin
             * @return {?}
             */
            function (plugin) { return _this.destroyPlugin(plugin); }));
        };
        // proxy events from all plugins
        // proxy events from all plugins
        /**
         * @param {?} callback
         * @return {?}
         */
        WallModel.prototype.subscribe = 
        // proxy events from all plugins
        /**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            return this.events$.subscribe(callback);
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        WallModel.prototype.dispatch = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            ((/** @type {?} */ (this.events$))).next(e);
        };
        /**
         * @private
         * @param {?} plugin
         * @return {?}
         */
        WallModel.prototype.initializePlugin = /**
         * @private
         * @param {?} plugin
         * @return {?}
         */
        function (plugin) {
            plugin.onWallInitialize(this);
            this.plugins.set(plugin.name, plugin);
            this.dispatch(new WallPluginInitializedEvent(plugin.name));
        };
        /**
         * @private
         * @param {?} plugin
         * @return {?}
         */
        WallModel.prototype.destroyPlugin = /**
         * @private
         * @param {?} plugin
         * @return {?}
         */
        function (plugin) {
            if (plugin.onWallPluginDestroy) {
                plugin.onWallPluginDestroy();
            }
        };
        return WallModel;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BrickRegistry = /** @class */ (function () {
        function BrickRegistry() {
            this.bricks = [];
        }
        // todo: add unregister functionality
        // todo: add unregister functionality
        /**
         * @param {?} brickConfiguration
         * @return {?}
         */
        BrickRegistry.prototype.register = 
        // todo: add unregister functionality
        /**
         * @param {?} brickConfiguration
         * @return {?}
         */
        function (brickConfiguration) {
            this.bricks.push(brickConfiguration);
        };
        /**
         * @param {?} tag
         * @return {?}
         */
        BrickRegistry.prototype.get = /**
         * @param {?} tag
         * @return {?}
         */
        function (tag) {
            return this.bricks.find((/**
             * @param {?} brickConfiguration
             * @return {?}
             */
            function (brickConfiguration) { return brickConfiguration.tag === tag; }));
        };
        /**
         * @return {?}
         */
        BrickRegistry.prototype.getAll = /**
         * @return {?}
         */
        function () {
            return this.bricks;
        };
        BrickRegistry.decorators = [
            { type: core.Injectable }
        ];
        return BrickRegistry;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WallModelFactory = /** @class */ (function () {
        function WallModelFactory(brickRegistry) {
            this.brickRegistry = brickRegistry;
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        WallModelFactory.prototype.create = /**
         * @param {?=} config
         * @return {?}
         */
        function (config) {
            /** @type {?} */
            var defaultConfig = {
                plan: {
                    bricks: [],
                    layout: {
                        bricks: []
                    }
                },
                plugins: []
            };
            config = __assign({}, defaultConfig, config);
            // inject core plugin as initial first plugin
            // in this way factory will decouple WallModel from WallCorePlugin
            config.plugins.unshift(new WallCorePlugin(this.brickRegistry));
            /** @type {?} */
            var wallModel = new WallModel(this.brickRegistry, config);
            wallModel.api.core.setPlan(config.plan);
            return wallModel;
        };
        WallModelFactory.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        WallModelFactory.ctorParameters = function () { return [
            { type: BrickRegistry }
        ]; };
        return WallModelFactory;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PlaceholderComponent = /** @class */ (function () {
        function PlaceholderComponent() {
        }
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} size
         * @param {?} isHorizontal
         * @return {?}
         */
        PlaceholderComponent.prototype.setCoordinate = /**
         * @param {?} x
         * @param {?} y
         * @param {?} size
         * @param {?} isHorizontal
         * @return {?}
         */
        function (x, y, size, isHorizontal) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.isHorizontal = isHorizontal;
        };
        PlaceholderComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<div *ngIf=\"x\">\n    <div *ngIf=\"isHorizontal\"\n         [style.left.px]=\"x\"\n         [style.top.px]=\"y\"\n         [style.width.px]=\"size\"\n         [style.height.px]=\"3\"\n         class=\"tow-placeholder\">\n    </div>\n\n    <div *ngIf=\"!isHorizontal\"\n         [style.left.px]=\"x\"\n         [style.top.px]=\"y\"\n         [style.width.px]=\"3\"\n         [style.height.px]=\"size\"\n         class=\"tow-placeholder\">\n    </div>\n</div>",
                        styles: [".tow-placeholder{opacity:.5;position:fixed;border-radius:2px}"]
                    }] }
        ];
        return PlaceholderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PlaceholderRenderer = /** @class */ (function () {
        function PlaceholderRenderer(componentFactoryResolver, appRef, injector) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.appRef = appRef;
            this.injector = injector;
            this.placeholderComponentRef = null;
        }
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} size
         * @param {?=} isHorizontal
         * @return {?}
         */
        PlaceholderRenderer.prototype.render = /**
         * @param {?} x
         * @param {?} y
         * @param {?} size
         * @param {?=} isHorizontal
         * @return {?}
         */
        function (x, y, size, isHorizontal) {
            if (isHorizontal === void 0) { isHorizontal = true; }
            if (!this.placeholderComponentRef) {
                this.renderPlaceholderComponent();
            }
            this.setCoordinate(x, y, size, isHorizontal);
        };
        /**
         * @return {?}
         */
        PlaceholderRenderer.prototype.clear = /**
         * @return {?}
         */
        function () {
            if (this.placeholderComponentRef) {
                this.removePlaceholderComponent();
            }
        };
        /**
         * @private
         * @return {?}
         */
        PlaceholderRenderer.prototype.renderPlaceholderComponent = /**
         * @private
         * @return {?}
         */
        function () {
            this.placeholderComponentRef = this.componentFactoryResolver
                .resolveComponentFactory(PlaceholderComponent)
                .create(this.injector);
            // 2. Attach component to the appRef so that it's inside the ng component tree
            this.appRef.attachView(this.placeholderComponentRef.hostView);
            // 3. Get DOM element from component
            /** @type {?} */
            var domElem = (/** @type {?} */ (((/** @type {?} */ (this.placeholderComponentRef.hostView)))
                .rootNodes[0]));
            // 4. Append DOM element to the body
            document.body.appendChild(domElem);
        };
        /**
         * @private
         * @return {?}
         */
        PlaceholderRenderer.prototype.removePlaceholderComponent = /**
         * @private
         * @return {?}
         */
        function () {
            this.appRef.detachView(this.placeholderComponentRef.hostView);
            this.placeholderComponentRef.destroy();
            this.placeholderComponentRef = null;
        };
        /**
         * @private
         * @param {?} x
         * @param {?} y
         * @param {?} size
         * @param {?} isHorizontal
         * @return {?}
         */
        PlaceholderRenderer.prototype.setCoordinate = /**
         * @private
         * @param {?} x
         * @param {?} y
         * @param {?} size
         * @param {?} isHorizontal
         * @return {?}
         */
        function (x, y, size, isHorizontal) {
            this.placeholderComponentRef.instance.setCoordinate(x, y, size, isHorizontal);
        };
        PlaceholderRenderer.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        PlaceholderRenderer.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver },
            { type: core.ApplicationRef },
            { type: core.Injector }
        ]; };
        return PlaceholderRenderer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PlaceholderRendererModule = /** @class */ (function () {
        function PlaceholderRendererModule() {
        }
        PlaceholderRendererModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [
                            PlaceholderComponent
                        ],
                        providers: [
                            PlaceholderRenderer
                        ],
                        entryComponents: [
                            PlaceholderComponent
                        ]
                    },] }
        ];
        return PlaceholderRendererModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WallCanvasComponent = /** @class */ (function () {
        function WallCanvasComponent(doc) {
            this.rows = [];
            this.selectedBricks = null;
            this.focusedBrick = null;
            this.canvasClick = new core.EventEmitter();
            this.onBrickStateChanged = new core.EventEmitter();
            // public API for sub components
            this.focusedBrick$ = new rxjs.Subject();
            this.selectedBricks$ = new rxjs.Subject();
            this.doc = null;
            this.doc = doc;
        }
        /**
         * @param {?} e
         * @return {?}
         */
        WallCanvasComponent.prototype.onEditorClick = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.target === this.expander.nativeElement) {
                this.canvasClick.emit();
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        WallCanvasComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.focusedBrick && changes.focusedBrick.currentValue) {
                this.focusedBrick$.next(changes.focusedBrick.currentValue);
            }
            if (changes.selectedBricks) {
                this.selectedBricks$.next(changes.selectedBricks.currentValue || []);
            }
        };
        /**
         * @param {?} brickId
         * @param {?} brickState
         * @return {?}
         */
        WallCanvasComponent.prototype.brickStateChanged = /**
         * @param {?} brickId
         * @param {?} brickState
         * @return {?}
         */
        function (brickId, brickState) {
            this.onBrickStateChanged.emit({
                brickId: brickId,
                brickState: brickState
            });
        };
        /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        WallCanvasComponent.prototype.trackRowsBy = /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) {
            return item.id;
        };
        WallCanvasComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'wall-canvas',
                        template: "<div #editor class=\"wall-canvas__editor\" (click)=\"onEditorClick($event)\">\n    <wall-canvas-row *ngFor=\"let row of rows; trackBy: trackRowsBy\" [row]=\"row\"></wall-canvas-row>\n\n    <div #expander class=\"wall-canvas__expander\"></div>\n</div>\n",
                        styles: [":host{display:block}:host .wall-canvas__editor{min-height:200px;cursor:text}:host .wall-canvas__expander{min-height:250px}"]
                    }] }
        ];
        /** @nocollapse */
        WallCanvasComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        WallCanvasComponent.propDecorators = {
            wallModel: [{ type: core.Input }],
            rows: [{ type: core.Input }],
            selectedBricks: [{ type: core.Input }],
            focusedBrick: [{ type: core.Input }],
            isMediaInteractionEnabled$: [{ type: core.Input }],
            canvasClick: [{ type: core.Output }],
            onBrickStateChanged: [{ type: core.Output }],
            expander: [{ type: core.ViewChild, args: ['expander',] }]
        };
        return WallCanvasComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LocationUpdatedEvent = /** @class */ (function () {
        function LocationUpdatedEvent(spots) {
            this.spots = spots;
        }
        return LocationUpdatedEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SpotModel = /** @class */ (function () {
        function SpotModel(instance) {
            this.id = instance.id;
            this.instance = instance;
            this.updateInfo();
        }
        /**
         * @return {?}
         */
        SpotModel.prototype.updateInfo = /**
         * @return {?}
         */
        function () {
            var _a = this.instance.getInfo(), position = _a.position, size = _a.size, data = _a.data;
            this.data = data;
            this.size = size;
            this.position = position;
        };
        /**
         * @param {?} y
         * @return {?}
         */
        SpotModel.prototype.isCross13Line = /**
         * @param {?} y
         * @return {?}
         */
        function (y) {
            return (y > this.position.y) && (y < this.position.y + this.size.height);
        };
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        SpotModel.prototype.getMinimalDistanceToPoint = /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            /** @type {?} */
            var minimalDistance = null;
            // distances to horizontal lines
            /** @type {?} */
            var distanceToLine12 = Math.abs(this.position.y - y);
            /** @type {?} */
            var distanceToLine43 = Math.abs((this.position.y + this.size.height) - y);
            // distances to vertical lines
            /** @type {?} */
            var distanceToLine14 = Math.abs(this.position.x - x);
            /** @type {?} */
            var distanceToLine23 = Math.abs((this.position.x + this.size.width) - x);
            /** @type {?} */
            var minDistanceToHorizontalLine = Math.min.apply(null, [distanceToLine12, distanceToLine43]);
            /** @type {?} */
            var minDistanceToVerticalLine = Math.min.apply(null, [distanceToLine14, distanceToLine23]);
            if ((x > this.position.x) && (x < this.position.x + this.size.width)) {
                // point directly cross the beacon
                minimalDistance = minDistanceToHorizontalLine;
            }
            else if ((y > this.position.y) && (y < this.position.y + this.size.height)) {
                // point directly cross the beacon
                minimalDistance = minDistanceToVerticalLine;
            }
            else {
                // point doesn't cross beacon, calculate shortest distance to beacon
                minimalDistance = Math.sqrt(minDistanceToHorizontalLine *
                    minDistanceToHorizontalLine +
                    minDistanceToVerticalLine *
                        minDistanceToVerticalLine);
            }
            return minimalDistance;
        };
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        SpotModel.prototype.getDistanceToTopLeftPoint = /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            /** @type {?} */
            var a = Math.abs(this.position.x - x);
            /** @type {?} */
            var b = Math.abs(this.position.y - y);
            return Math.sqrt(a * a + b * b);
        };
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        SpotModel.prototype.getDistanceToBottomLeftPoint = /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            /** @type {?} */
            var a = Math.abs(this.position.x - x);
            /** @type {?} */
            var b = Math.abs(this.position.y + this.size.height - y);
            return Math.sqrt(a * a + b * b);
        };
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        SpotModel.prototype.getDistanceToLeftCenterPoint = /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            /** @type {?} */
            var a = Math.abs(this.position.x - x);
            /** @type {?} */
            var b = Math.abs(this.position.y + (this.size.height / 2) - y);
            return Math.sqrt(a * a + b * b);
        };
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        SpotModel.prototype.isPointInsideSpot = /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            if ((x > this.position.x) && (x < this.position.x + this.size.width) &&
                (y > this.position.y) && (y < this.position.y + this.size.height)) {
                return true;
            }
            else {
                return false;
            }
        };
        return SpotModel;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RadarCoordinator = /** @class */ (function () {
        function RadarCoordinator(doc, zone) {
            var _this = this;
            this.zone = zone;
            this.spots = new Map();
            this.events = new rxjs.Subject();
            this.mouseMove$ = rxjs.fromEvent(doc, 'mousemove');
            /** @type {?} */
            var throttleMouseTime = 30;
            // run outside Angular Zone in order to decrease performance hit
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.mouseMove$
                    .pipe(operators.throttleTime(throttleMouseTime))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    _this.updateSpotsInfo();
                    _this.updateLocationPosition(event.clientX, event.clientY);
                }));
            }));
        }
        /**
         * @param {?} spotId
         * @param {?} spotInstance
         * @return {?}
         */
        RadarCoordinator.prototype.register = /**
         * @param {?} spotId
         * @param {?} spotInstance
         * @return {?}
         */
        function (spotId, spotInstance) {
            this.spots.set(spotId, new SpotModel(spotInstance));
        };
        /**
         * @param {?} spotId
         * @return {?}
         */
        RadarCoordinator.prototype.unRegister = /**
         * @param {?} spotId
         * @return {?}
         */
        function (spotId) {
            this.spots.delete(spotId);
        };
        /**
         * @return {?}
         */
        RadarCoordinator.prototype.updateSpotsInfo = /**
         * @return {?}
         */
        function () {
            this.spots.forEach((/**
             * @param {?} spot
             * @return {?}
             */
            function (spot) { return spot.updateInfo(); }));
        };
        /**
         * @param {?} predicate
         * @return {?}
         */
        RadarCoordinator.prototype.filterSpots = /**
         * @param {?} predicate
         * @return {?}
         */
        function (predicate) {
            return Array.from(this.spots)
                .map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), id = _b[0], spot = _b[1];
                return spot;
            }))
                .filter((/**
             * @param {?} spot
             * @return {?}
             */
            function (spot) { return predicate(spot); }));
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        RadarCoordinator.prototype.subscribe = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            return this.events.subscribe(fn);
        };
        /**
         * @private
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        RadarCoordinator.prototype.updateLocationPosition = /**
         * @private
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            /** @type {?} */
            var sortedSpots = [];
            this.spots.forEach((/**
             * @param {?} spot
             * @return {?}
             */
            function (spot) {
                /** @type {?} */
                var minimalDistance = spot.getMinimalDistanceToPoint(x, y);
                /** @type {?} */
                var topLeftPointDistance = spot.getDistanceToTopLeftPoint(x, y);
                /** @type {?} */
                var bottomLeftPointDistance = spot.getDistanceToBottomLeftPoint(x, y);
                /** @type {?} */
                var centerLeftPointDistance = spot.getDistanceToLeftCenterPoint(x, y);
                /** @type {?} */
                var isCross13Line = spot.isCross13Line(y);
                sortedSpots.push({
                    minimalDistance: minimalDistance,
                    topLeftPointDistance: topLeftPointDistance,
                    bottomLeftPointDistance: bottomLeftPointDistance,
                    centerLeftPointDistance: centerLeftPointDistance,
                    isCross13Line: isCross13Line,
                    data: spot.data
                });
            }));
            this.events.next(new LocationUpdatedEvent(sortedSpots));
        };
        RadarCoordinator.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        RadarCoordinator.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.NgZone }
        ]; };
        return RadarCoordinator;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Radar = /** @class */ (function () {
        function Radar(radarCoordinator) {
            var _this = this;
            this.radarCoordinator = radarCoordinator;
            this.events = new rxjs.Subject();
            this.radarCoordinator.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.events.next(event);
            }));
        }
        /**
         * @param {?} fn
         * @return {?}
         */
        Radar.prototype.filterSpots = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            return this.radarCoordinator.filterSpots(fn);
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        Radar.prototype.subscribe = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            return this.events.subscribe(fn);
        };
        Radar.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Radar.ctorParameters = function () { return [
            { type: RadarCoordinator }
        ]; };
        return Radar;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WallCanvasBrickComponent = /** @class */ (function () {
        function WallCanvasBrickComponent(injector, resolver, radar, cdRef, wallCanvasComponent) {
            this.injector = injector;
            this.resolver = resolver;
            this.radar = radar;
            this.cdRef = cdRef;
            this.wallCanvasComponent = wallCanvasComponent;
            this.selected = false;
            this.isMouseNear = false;
            this.isMediaInteractionEnabled = true;
            this.minimalDistanceToMouse = 100;
        }
        /**
         * @return {?}
         */
        WallCanvasBrickComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.spot = {
                brickId: this.brick.id,
                isPickOutItem: true,
                isBeacon: true
            };
            this.componentReference = this.renderBrick();
            this.radarSubscription = this.radar.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (e instanceof LocationUpdatedEvent) {
                    /** @type {?} */
                    var currentSpot = e.spots.find((/**
                     * @param {?} spot
                     * @return {?}
                     */
                    function (spot) { return spot.data.brickId === _this.brick.id; }));
                    if (currentSpot.isCross13Line) {
                        _this.isMouseNear = currentSpot.topLeftPointDistance < _this.minimalDistanceToMouse;
                    }
                    else {
                        _this.isMouseNear = false;
                    }
                    _this.cdRef.detectChanges();
                }
            }));
            this.focusedBrickSubscription = this.wallCanvasComponent.focusedBrick$.subscribe((/**
             * @param {?} focusedBrick
             * @return {?}
             */
            function (focusedBrick) {
                if (focusedBrick.id === _this.brick.id) {
                    _this.callInstanceApi('onWallFocus', focusedBrick.context);
                }
            }));
            this.selectedBricksSubscription = this.wallCanvasComponent.selectedBricks$.subscribe((/**
             * @param {?} selectedBricks
             * @return {?}
             */
            function (selectedBricks) {
                _this.selected = !Boolean(selectedBricks.indexOf(_this.brick.id) === -1);
            }));
            this.isMediaInteractionEnabledSubscription = this.wallCanvasComponent.isMediaInteractionEnabled$
                .subscribe((/**
             * @param {?} isMediaInteractionEnabled
             * @return {?}
             */
            function (isMediaInteractionEnabled) { return _this.isMediaInteractionEnabled = isMediaInteractionEnabled; }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        WallCanvasBrickComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.brick && !changes.brick.firstChange && changes.brick.currentValue) {
                this.componentReference.instance.state = this.brick.state;
                this.callInstanceApi('onWallStateChange', this.componentReference.instance.state);
            }
        };
        /**
         * @return {?}
         */
        WallCanvasBrickComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.radarSubscription.unsubscribe();
            this.focusedBrickSubscription.unsubscribe();
            this.selectedBricksSubscription.unsubscribe();
            this.isMediaInteractionEnabledSubscription.unsubscribe();
            if (this.stateChangesSubscription) {
                this.stateChangesSubscription.unsubscribe();
            }
        };
        /**
         * @private
         * @param {?} methodName
         * @param {?=} data
         * @return {?}
         */
        WallCanvasBrickComponent.prototype.callInstanceApi = /**
         * @private
         * @param {?} methodName
         * @param {?=} data
         * @return {?}
         */
        function (methodName, data) {
            if (this.componentReference.instance[methodName]) {
                this.componentReference.instance[methodName](data);
            }
        };
        /**
         * @private
         * @return {?}
         */
        WallCanvasBrickComponent.prototype.renderBrick = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var factory = this.resolver.resolveComponentFactory(this.brick.component);
            /** @type {?} */
            var componentReference = this.container.createComponent(factory, null, this.injector);
            /** @type {?} */
            var componentInstance = (/** @type {?} */ (componentReference.instance));
            componentInstance.id = this.brick.id;
            componentInstance.state = this.brick.state;
            componentInstance.wallModel = this.wallCanvasComponent.wallModel;
            if (componentInstance.stateChanges) {
                this.stateChangesSubscription = componentInstance.stateChanges.subscribe((/**
                 * @param {?} newState
                 * @return {?}
                 */
                function (newState) {
                    _this.wallCanvasComponent.brickStateChanged(_this.brick.id, newState);
                }));
            }
            return componentReference;
        };
        WallCanvasBrickComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'wall-canvas-brick',
                        template: "<div [spot]=\"spot\"\n     data-id=\"{{brick.id}}\"\n     class=\"wall-canvas-brick__wrapper wall-canvas-brick__draggable\"\n     [ngClass]=\"{'wall-canvas-brick__selected': selected,\n     \t\t'wall-canvas-brick__draggable': isMouseNear}\">\n\n    <div class=\"wall-canvas-brick__draggable-handler\" [tow-slave]=\"brick.id\">\n        <div class=\"wall-canvas-brick__draggable-box\">\n            <mat-icon>drag_handle</mat-icon>\n        </div>\n    </div>\n\n    <div [ngClass]=\"{'wall-canvas-brick__disabled-interaction': !isMediaInteractionEnabled}\">\n        <ng-container #brickContainer></ng-container>\n    </div>\n</div>\n",
                        styles: [":host{display:block;margin:0 0 2px}:host .wall-canvas-brick__draggable .wall-canvas-brick__draggable-handler{display:block}:host .wall-canvas-brick__wrapper{position:relative}:host .wall-canvas-brick__wrapper:after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;opacity:.2;transition:background-color .1s}:host .wall-canvas-brick__draggable-box{padding:1px;border-radius:3px;line-height:0}:host .wall-canvas-brick__draggable-handler{display:none;position:absolute;left:-35px;top:-4px;padding:5px;margin:0;cursor:pointer;border-radius:3px}:host .wall-canvas-brick__selected{position:relative}:host .wall-canvas-brick__disabled-interaction{pointer-events:none}"]
                    }] }
        ];
        /** @nocollapse */
        WallCanvasBrickComponent.ctorParameters = function () { return [
            { type: core.Injector },
            { type: core.ComponentFactoryResolver },
            { type: Radar },
            { type: core.ChangeDetectorRef },
            { type: WallCanvasComponent }
        ]; };
        WallCanvasBrickComponent.propDecorators = {
            brick: [{ type: core.Input }],
            container: [{ type: core.ViewChild, args: ['brickContainer', { read: core.ViewContainerRef },] }]
        };
        return WallCanvasBrickComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WallCanvasRowComponent = /** @class */ (function () {
        function WallCanvasRowComponent() {
        }
        // todo add type
        /**
         * @param {?} index
         * @return {?}
         */
        WallCanvasRowComponent.prototype.trackColumnsBy = 
        // todo add type
        /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            return index;
        };
        /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        WallCanvasRowComponent.prototype.trackBricksBy = /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) {
            return item.hash;
        };
        WallCanvasRowComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'wall-canvas-row',
                        template: "<div class=\"wall-canvas-row__column\" *ngFor=\"let column of row.columns; trackBy: trackColumnsBy\">\n    <wall-canvas-brick [brick]=\"brick\" *ngFor=\"let brick of column.bricks; trackBy: trackBricksBy\"></wall-canvas-brick>\n</div>",
                        styles: [":host{display:flex}:host .wall-canvas-row__column{flex:1;margin:0 10px;min-width:0}:host .wall-canvas-row__column:first-child{margin-left:0}:host .wall-canvas-row__column:last-child{margin-right:0}"]
                    }] }
        ];
        WallCanvasRowComponent.propDecorators = {
            row: [{ type: core.Input }]
        };
        return WallCanvasRowComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SelectedBrickEvent = /** @class */ (function () {
        function SelectedBrickEvent(selectedBrickIds) {
            this.selectedBrickIds = selectedBrickIds;
        }
        return SelectedBrickEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WallViewModel = /** @class */ (function () {
        function WallViewModel(brickRegistry) {
            this.brickRegistry = brickRegistry;
            this.wallModel = null;
            this.events = new rxjs.Subject();
            // UI
            this.focusedBrick = null;
            this.selectedBricks = [];
            this.isMediaInteractionEnabled$ = new rxjs.BehaviorSubject(true);
            this.canvasLayout = [];
        }
        /**
         * @return {?}
         */
        WallViewModel.prototype.getCanvasLayout = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var rows = [];
            this.wallModel.api.core.traverse((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                rows.push({
                    id: row.id,
                    columns: row.columns.map((/**
                     * @param {?} column
                     * @return {?}
                     */
                    function (column) {
                        return {
                            bricks: column.bricks.map((/**
                             * @param {?} brickConfig
                             * @return {?}
                             */
                            function (brickConfig) {
                                /** @type {?} */
                                var component = _this.brickRegistry.get(brickConfig.tag).component;
                                return {
                                    id: brickConfig.id,
                                    hash: brickConfig.tag + brickConfig.id,
                                    state: brickConfig.state,
                                    component: component
                                };
                            }))
                        };
                    }))
                });
            }));
            return rows;
        };
        /**
         * @param {?} wallModel
         * @return {?}
         */
        WallViewModel.prototype.initialize = /**
         * @param {?} wallModel
         * @return {?}
         */
        function (wallModel) {
            var _this = this;
            this.wallModel = wallModel;
            // initialize view core API
            /** @type {?} */
            var coreApi = [
                // SELECTION
                'getSelectedBrickIds',
                'selectBrick',
                'selectBricks',
                'addBrickToSelection',
                'removeBrickFromSelection',
                'unSelectBricks',
                // FOCUS
                'focusOnBrickId',
                'getFocusedBrickId',
                'focusOnPreviousTextBrick',
                'focusOnNextTextBrick',
                // REMOVE BRICK
                'removeBrick',
                'removeBricks',
                // BEHAVIOUR
                'enableMediaInteraction',
                'disableMediaInteraction',
                // CLIENT
                'subscribe'
            ].reduce((/**
             * @param {?} result
             * @param {?} methodName
             * @return {?}
             */
            function (result, methodName) {
                if (_this[methodName].bind) {
                    result[methodName] = _this[methodName].bind(_this);
                }
                else {
                    result[methodName] = _this[methodName];
                }
                return result;
            }), {});
            // protect API from extending
            Object.seal(coreApi);
            // register methods on model itself
            this.wallModel.registerApi('ui', coreApi);
            this.wallModelSubscription = this.wallModel.api.core.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event instanceof TurnBrickIntoEvent) {
                    _this.focusOnBrickId(event.brickId);
                }
                if (event instanceof MoveBrickEvent) {
                    _this.unSelectBricks();
                }
                if (event instanceof RemoveBricksEvent) {
                    if (!_this.wallModel.api.core.getBricksCount()) {
                        _this.wallModel.api.core.addDefaultBrick();
                    }
                }
                if (!(event instanceof BeforeChangeEvent)) {
                    _this.canvasLayout = _this.getCanvasLayout();
                }
            }));
            this.canvasLayout = this.getCanvasLayout();
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @param {?} brickId
         * @return {?}
         */
        WallViewModel.prototype.selectBrick = /**
         * \@public-api
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            this.selectedBricks = [brickId];
            this.focusedBrick = null;
            /** @type {?} */
            var selectedBricksClone = this.selectedBricks.slice(0);
            this.dispatch(new SelectedBrickEvent(selectedBricksClone));
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @param {?} brickIds
         * @return {?}
         */
        WallViewModel.prototype.selectBricks = /**
         * \@public-api
         * @param {?} brickIds
         * @return {?}
         */
        function (brickIds) {
            if (JSON.stringify(brickIds) !== JSON.stringify(this.selectedBricks)) {
                this.selectedBricks = this.wallModel.api.core.sortBrickIdsByLayoutOrder(brickIds);
                /** @type {?} */
                var selectedBricksClone = this.selectedBricks.slice(0);
                this.dispatch(new SelectedBrickEvent(selectedBricksClone));
            }
        };
        /**
         * @deprecated
         * @public-api
         */
        /**
         * @deprecated
         * \@public-api
         * @param {?} brickId
         * @return {?}
         */
        WallViewModel.prototype.addBrickToSelection = /**
         * @deprecated
         * \@public-api
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var selectedBrickIds = this.selectedBricks.slice(0);
            selectedBrickIds.push(brickId);
            this.selectedBricks = this.wallModel.api.core.sortBrickIdsByLayoutOrder(selectedBrickIds);
            /** @type {?} */
            var selectedBricksClone = this.selectedBricks.slice(0);
            this.dispatch(new SelectedBrickEvent(selectedBricksClone));
        };
        /**
         * @deprecated
         * @public-api
         */
        /**
         * @deprecated
         * \@public-api
         * @param {?} brickId
         * @return {?}
         */
        WallViewModel.prototype.removeBrickFromSelection = /**
         * @deprecated
         * \@public-api
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var brickIdIndex = this.selectedBricks.indexOf(brickId);
            this.selectedBricks.splice(brickIdIndex, 1);
            this.selectedBricks = this.selectedBricks.slice(0);
            /** @type {?} */
            var selectedBricksClone = this.selectedBricks.slice(0);
            this.dispatch(new SelectedBrickEvent(selectedBricksClone));
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @return {?}
         */
        WallViewModel.prototype.unSelectBricks = /**
         * \@public-api
         * @return {?}
         */
        function () {
            this.selectedBricks = [];
            this.dispatch(new SelectedBrickEvent([]));
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @return {?}
         */
        WallViewModel.prototype.getSelectedBrickIds = /**
         * \@public-api
         * @return {?}
         */
        function () {
            return this.selectedBricks.slice(0);
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @return {?}
         */
        WallViewModel.prototype.getFocusedBrickId = /**
         * \@public-api
         * @return {?}
         */
        function () {
            return this.focusedBrick && this.focusedBrick.id;
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @param {?} brickId
         * @param {?=} focusContext
         * @return {?}
         */
        WallViewModel.prototype.focusOnBrickId = /**
         * \@public-api
         * @param {?} brickId
         * @param {?=} focusContext
         * @return {?}
         */
        function (brickId, focusContext) {
            this.focusedBrick = {
                id: brickId,
                context: focusContext
            };
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @param {?} brickId
         * @param {?=} focusContext
         * @return {?}
         */
        WallViewModel.prototype.focusOnPreviousTextBrick = /**
         * \@public-api
         * @param {?} brickId
         * @param {?=} focusContext
         * @return {?}
         */
        function (brickId, focusContext) {
            /** @type {?} */
            var previousTextBrickId = this.wallModel.api.core.getPreviousTextBrickId(brickId);
            if (previousTextBrickId) {
                this.focusOnBrickId(previousTextBrickId, focusContext);
            }
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @param {?} brickId
         * @param {?=} focusContext
         * @return {?}
         */
        WallViewModel.prototype.focusOnNextTextBrick = /**
         * \@public-api
         * @param {?} brickId
         * @param {?=} focusContext
         * @return {?}
         */
        function (brickId, focusContext) {
            /** @type {?} */
            var nextTextBrickId = this.wallModel.api.core.getNextTextBrickId(brickId);
            if (nextTextBrickId) {
                this.focusOnBrickId(nextTextBrickId, focusContext);
            }
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @return {?}
         */
        WallViewModel.prototype.enableMediaInteraction = /**
         * \@public-api
         * @return {?}
         */
        function () {
            ((/** @type {?} */ (this.isMediaInteractionEnabled$))).next(true);
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @return {?}
         */
        WallViewModel.prototype.disableMediaInteraction = /**
         * \@public-api
         * @return {?}
         */
        function () {
            ((/** @type {?} */ (this.isMediaInteractionEnabled$))).next(false);
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @param {?} callback
         * @return {?}
         */
        WallViewModel.prototype.subscribe = /**
         * \@public-api
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            return this.events.subscribe(callback);
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @param {?} brickId
         * @return {?}
         */
        WallViewModel.prototype.removeBrick = /**
         * \@public-api
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            this.removeBricks([brickId]);
        };
        /**
         * @public-api
         */
        /**
         * \@public-api
         * @param {?} brickIds
         * @return {?}
         */
        WallViewModel.prototype.removeBricks = /**
         * \@public-api
         * @param {?} brickIds
         * @return {?}
         */
        function (brickIds) {
            /** @type {?} */
            var currentBrickIds = this.wallModel.api.core.getBrickIds();
            if (currentBrickIds.length > 1) {
                this.wallModel.api.core.removeBricks(brickIds);
            }
            else if (currentBrickIds.length === 1) {
                /** @type {?} */
                var brickSnapshot = this.wallModel.api.core.getBrickSnapshot(currentBrickIds[0]);
                if (brickSnapshot.tag !== 'text' || brickSnapshot.state.text) {
                    this.wallModel.api.core.removeBricks(brickIds);
                }
                else {
                    this.focusOnBrickId(currentBrickIds[0]);
                }
            }
        };
        // canvas interaction
        // canvas interaction
        /**
         * @return {?}
         */
        WallViewModel.prototype.onCanvasClick = 
        // canvas interaction
        /**
         * @return {?}
         */
        function () {
            // check whether the last element is empty text brick
            // which is inside one column row
            // check whether the last element is empty text brick
            // which is inside one column row
            /** @type {?} */
            var rowCount = this.wallModel.api.core.getRowCount();
            /** @type {?} */
            var brickIds = this.wallModel.api.core.getBrickIds();
            if (rowCount > 0
                && this.wallModel.api.core.getColumnCount(rowCount - 1) === 1
                && brickIds.length) {
                /** @type {?} */
                var lastBrickSnapshot = this.wallModel.api.core.getBrickSnapshot(brickIds[brickIds.length - 1]);
                if (lastBrickSnapshot.tag === 'text' && !lastBrickSnapshot.state.text) {
                    this.focusOnBrickId(lastBrickSnapshot.id);
                }
                else {
                    this.wallModel.api.core.addDefaultBrick();
                }
            }
            else {
                this.wallModel.api.core.addDefaultBrick();
            }
        };
        // canvas interaction
        // canvas interaction
        /**
         * @param {?} brickId
         * @param {?} brickState
         * @return {?}
         */
        WallViewModel.prototype.onBrickStateChanged = 
        // canvas interaction
        /**
         * @param {?} brickId
         * @param {?} brickState
         * @return {?}
         */
        function (brickId, brickState) {
            this.wallModel.api.core.updateBrickState(brickId, brickState);
        };
        /**
         * @return {?}
         */
        WallViewModel.prototype.reset = /**
         * @return {?}
         */
        function () {
            this.wallModelSubscription.unsubscribe();
            this.wallModelSubscription = null;
            this.focusedBrick = null;
            this.unSelectBricks();
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        WallViewModel.prototype.dispatch = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.events.next(e);
        };
        WallViewModel.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        WallViewModel.ctorParameters = function () { return [
            { type: BrickRegistry }
        ]; };
        return WallViewModel;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WallComponent = /** @class */ (function () {
        function WallComponent(wallViewModel) {
            this.wallViewModel = wallViewModel;
            this.model = null;
            this.configuration = null;
        }
        // click on empty space
        // click on empty space
        /**
         * @return {?}
         */
        WallComponent.prototype.onCanvasClick = 
        // click on empty space
        /**
         * @return {?}
         */
        function () {
            this.wallViewModel.onCanvasClick();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        WallComponent.prototype.onBrickStateChanged = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.wallViewModel.onBrickStateChanged(event.brickId, event.brickState);
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        WallComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.model) {
                if (!changes.model.firstChange) {
                    this.cleanUp();
                }
                this.initialize();
            }
        };
        /**
         * @return {?}
         */
        WallComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.cleanUp();
        };
        /**
         * @private
         * @return {?}
         */
        WallComponent.prototype.initialize = /**
         * @private
         * @return {?}
         */
        function () {
            // initialize view model by business model
            this.wallViewModel.initialize(this.model);
        };
        /**
         * @private
         * @return {?}
         */
        WallComponent.prototype.cleanUp = /**
         * @private
         * @return {?}
         */
        function () {
            this.wallViewModel.reset();
        };
        WallComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'wall',
                        template: "<wall-canvas *ngIf=\"wallViewModel.canvasLayout\"\n             (canvasClick)=\"onCanvasClick()\"\n             (onBrickStateChanged)=\"onBrickStateChanged($event)\"\n\n             [wallModel]=\"wallViewModel.wallModel\"\n             [isMediaInteractionEnabled$]=\"wallViewModel.isMediaInteractionEnabled$\"\n             [focusedBrick]=\"wallViewModel.focusedBrick\"\n             [selectedBricks]=\"wallViewModel.selectedBricks\"\n             [rows]=\"wallViewModel.canvasLayout\">\n</wall-canvas>\n",
                        providers: [
                            WallViewModel
                        ],
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        WallComponent.ctorParameters = function () { return [
            { type: WallViewModel }
        ]; };
        WallComponent.propDecorators = {
            model: [{ type: core.Input }],
            configuration: [{ type: core.Input }]
        };
        return WallComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var StartWorkingEvent = /** @class */ (function () {
        function StartWorkingEvent(slaveId) {
            this.slaveId = slaveId;
        }
        return StartWorkingEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var StopWorkingEvent = /** @class */ (function () {
        function StopWorkingEvent(slaveId) {
            this.slaveId = slaveId;
        }
        return StopWorkingEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WorkInProgressEvent = /** @class */ (function () {
        function WorkInProgressEvent(mousePosition) {
            this.mousePosition = mousePosition;
        }
        return WorkInProgressEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TowCoordinator = /** @class */ (function () {
        function TowCoordinator() {
            var _this = this;
            this.events = new rxjs.Subject();
            // start track when slave start working
            this.isSlaveWorking = false;
            document.addEventListener('dragover', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (_this.isSlaveWorking) {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'move';
                    _this.slaveWorkProgress(event.clientX, event.clientY);
                }
            }));
        }
        /**
         * @param {?} id
         * @return {?}
         */
        TowCoordinator.prototype.slaveStartWorking = /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            this.isSlaveWorking = true;
            this.events.next(new StartWorkingEvent(id));
        };
        /**
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        TowCoordinator.prototype.slaveWorkProgress = /**
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        function (clientX, clientY) {
            this.events.next(new WorkInProgressEvent({
                clientX: clientX,
                clientY: clientY
            }));
        };
        /**
         * @param {?} id
         * @return {?}
         */
        TowCoordinator.prototype.slaveStopWorking = /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            this.isSlaveWorking = false;
            this.events.next(new StopWorkingEvent(id));
        };
        TowCoordinator.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        TowCoordinator.ctorParameters = function () { return []; };
        return TowCoordinator;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Notify Tow Coordinator about drag operation
    var TowSlaveDirective = /** @class */ (function () {
        function TowSlaveDirective(renderer2, el, towCoordinator) {
            this.renderer2 = renderer2;
            this.el = el;
            this.towCoordinator = towCoordinator;
        }
        /**
         * @param {?} event
         * @return {?}
         */
        TowSlaveDirective.prototype.dragStart = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.setData('FAKE', JSON.stringify({}));
            this.towCoordinator.slaveStartWorking(this.id);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        TowSlaveDirective.prototype.drag = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.dataTransfer.dropEffect = 'move';
        };
        /**
         * @param {?} e
         * @return {?}
         */
        TowSlaveDirective.prototype.dragEnd = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.towCoordinator.slaveStopWorking(this.id);
        };
        /**
         * @return {?}
         */
        TowSlaveDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.renderer2.setAttribute(this.el.nativeElement, 'draggable', 'true');
        };
        TowSlaveDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[tow-slave]' },] }
        ];
        /** @nocollapse */
        TowSlaveDirective.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.ElementRef },
            { type: TowCoordinator }
        ]; };
        TowSlaveDirective.propDecorators = {
            id: [{ type: core.Input, args: ['tow-slave',] }],
            dragStart: [{ type: core.HostListener, args: ['dragstart', ['$event'],] }],
            drag: [{ type: core.HostListener, args: ['drag', ['$event'],] }],
            dragEnd: [{ type: core.HostListener, args: ['dragend', ['$event'],] }]
        };
        return TowSlaveDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TowService = /** @class */ (function () {
        function TowService(towCoordinator) {
            var _this = this;
            this.towCoordinator = towCoordinator;
            this.events = new rxjs.Subject();
            this.towCoordinator.events.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.events.next(e);
            }));
        }
        /**
         * @param {?} fn
         * @return {?}
         */
        TowService.prototype.subscribe = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            return this.events.subscribe(fn);
        };
        TowService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        TowService.ctorParameters = function () { return [
            { type: TowCoordinator }
        ]; };
        return TowService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SpotDirective = /** @class */ (function () {
        function SpotDirective(radarCoordinator, el) {
            this.radarCoordinator = radarCoordinator;
            this.el = el;
            this.id = String(Math.random());
        }
        /**
         * @return {?}
         */
        SpotDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.radarCoordinator.register(this.id, this);
        };
        /**
         * @return {?}
         */
        SpotDirective.prototype.getInfo = /**
         * @return {?}
         */
        function () {
            return {
                id: this.id,
                data: this.getData(),
                size: this.getSize(),
                position: this.getPosition()
            };
        };
        /**
         * @return {?}
         */
        SpotDirective.prototype.getData = /**
         * @return {?}
         */
        function () {
            return this.spot;
        };
        /**
         * @return {?}
         */
        SpotDirective.prototype.getSize = /**
         * @return {?}
         */
        function () {
            return {
                width: this.el.nativeElement.offsetWidth,
                height: this.el.nativeElement.offsetHeight
            };
        };
        /**
         * @return {?}
         */
        SpotDirective.prototype.getPosition = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var offsets = this.el.nativeElement.getBoundingClientRect();
            return {
                x: offsets.left,
                y: offsets.top
            };
        };
        /**
         * @return {?}
         */
        SpotDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.radarCoordinator.unRegister(this.id);
        };
        SpotDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[spot]'
                    },] }
        ];
        /** @nocollapse */
        SpotDirective.ctorParameters = function () { return [
            { type: RadarCoordinator },
            { type: core.ElementRef }
        ]; };
        SpotDirective.propDecorators = {
            spot: [{ type: core.Input }]
        };
        return SpotDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RadarModule = /** @class */ (function () {
        function RadarModule() {
        }
        RadarModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [SpotDirective],
                        declarations: [SpotDirective],
                        providers: [
                            Radar,
                            RadarCoordinator
                        ]
                    },] }
        ];
        return RadarModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TowModule = /** @class */ (function () {
        function TowModule() {
        }
        TowModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            RadarModule
                        ],
                        declarations: [
                            TowSlaveDirective
                        ],
                        exports: [
                            TowSlaveDirective
                        ],
                        providers: [
                            TowService,
                            TowCoordinator
                        ]
                    },] }
        ];
        return TowModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PickOutAreaComponent = /** @class */ (function () {
        function PickOutAreaComponent() {
            this.pickOutAreaModel = null;
        }
        /**
         * @param {?} pickOutAreaModel
         * @return {?}
         */
        PickOutAreaComponent.prototype.initialize = /**
         * @param {?} pickOutAreaModel
         * @return {?}
         */
        function (pickOutAreaModel) {
            this.pickOutAreaModel = pickOutAreaModel;
        };
        PickOutAreaComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<div *ngIf=\"pickOutAreaModel\"\n     [style.left.px]=\"pickOutAreaModel.x\"\n     [style.top.px]=\"pickOutAreaModel.y\"\n     [style.width.px]=\"pickOutAreaModel.width\"\n     [style.height.px]=\"pickOutAreaModel.height\"\n     class=\"pick-out-area\">\n</div>\n",
                        styles: [".pick-out-area{opacity:.5;position:absolute}"]
                    }] }
        ];
        return PickOutAreaComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var EndPickOut = /** @class */ (function () {
        function EndPickOut() {
        }
        return EndPickOut;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PickOutItems = /** @class */ (function () {
        function PickOutItems(ids) {
            this.ids = ids;
        }
        return PickOutItems;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var StartPickOut = /** @class */ (function () {
        function StartPickOut() {
        }
        return StartPickOut;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var StopPickOut = /** @class */ (function () {
        function StopPickOut() {
        }
        return StopPickOut;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PickOutCoordinator = /** @class */ (function () {
        function PickOutCoordinator(radar) {
            this.radar = radar;
            this.changes = new rxjs.Subject();
            this.isPickOutAllowed = true;
        }
        /**
         * @return {?}
         */
        PickOutCoordinator.prototype.disablePickOut = /**
         * @return {?}
         */
        function () {
            this.isPickOutAllowed = false;
        };
        /**
         * @return {?}
         */
        PickOutCoordinator.prototype.enablePickOut = /**
         * @return {?}
         */
        function () {
            this.isPickOutAllowed = true;
        };
        /**
         * @return {?}
         */
        PickOutCoordinator.prototype.stopPickOut = /**
         * @return {?}
         */
        function () {
            this.changes.next(new StopPickOut());
        };
        /**
         * @return {?}
         */
        PickOutCoordinator.prototype.startPickOut = /**
         * @return {?}
         */
        function () {
            this.changes.next(new StartPickOut());
        };
        /**
         * @param {?} range
         * @return {?}
         */
        PickOutCoordinator.prototype.pickOutChanged = /**
         * @param {?} range
         * @return {?}
         */
        function (range) {
            /** @type {?} */
            var pickOutSpotModels = this.radar.filterSpots((/**
             * @param {?} spot
             * @return {?}
             */
            function (spot) { return spot.data.isPickOutItem; }));
            pickOutSpotModels.forEach((/**
             * @param {?} spotModel
             * @return {?}
             */
            function (spotModel) {
                spotModel.updateInfo();
            }));
            this.changes.next(new PickOutItems(this.getSelectedItemIds(range, pickOutSpotModels)));
        };
        /**
         * @return {?}
         */
        PickOutCoordinator.prototype.endPickOut = /**
         * @return {?}
         */
        function () {
            this.changes.next(new EndPickOut());
        };
        /**
         * @private
         * @param {?} range
         * @param {?} pickOutsItem
         * @return {?}
         */
        PickOutCoordinator.prototype.getSelectedItemIds = /**
         * @private
         * @param {?} range
         * @param {?} pickOutsItem
         * @return {?}
         */
        function (range, pickOutsItem) {
            return pickOutsItem
                .filter((/**
             * @param {?} pickOutItem
             * @return {?}
             */
            function (pickOutItem) {
                return (range.x < (pickOutItem.position.x + pickOutItem.size.width) &&
                    (range.x + range.width) > pickOutItem.position.x &&
                    (range.y + range.height) > pickOutItem.position.y &&
                    range.y < (pickOutItem.position.y + pickOutItem.size.height));
            }))
                .map((/**
             * @param {?} pickOutItem
             * @return {?}
             */
            function (pickOutItem) { return pickOutItem.data.brickId; }));
        };
        PickOutCoordinator.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        PickOutCoordinator.ctorParameters = function () { return [
            { type: Radar }
        ]; };
        return PickOutCoordinator;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MOUSE_LEFT_KEY_CODE = 0;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PickOutAreaModel = /** @class */ (function () {
        function PickOutAreaModel(scrollableContainer, x, y, overBrickId) {
            this.isPickOutProcessInitialized = false;
            this.minimumMoveDistance = 5;
            this.scrollableContainer = scrollableContainer;
            this.initialX = x;
            this.initialY = y;
            this.x = x;
            this.y = y;
            this.initialBrickId = overBrickId;
            this.currentBrickId = overBrickId;
        }
        /**
         * @return {?}
         */
        PickOutAreaModel.prototype.recalculatePositionAndSize = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var scrollContextRect = this.scrollableContainer.getBoundingClientRect();
            /** @type {?} */
            var pageX = this.previousClientX - scrollContextRect.left;
            /** @type {?} */
            var pageY = this.previousClientY - scrollContextRect.top + this.scrollableContainer.scrollTop;
            this.updatePickOutAreaPositionAndSize(pageX, pageY);
        };
        /**
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        PickOutAreaModel.prototype.updateCurrentClientPosition = /**
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        function (clientX, clientY) {
            this.previousClientX = clientX;
            this.previousClientY = clientY;
            this.recalculatePositionAndSize();
        };
        /**
         * @param {?} brickId
         * @return {?}
         */
        PickOutAreaModel.prototype.updateCurrentBrickId = /**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            this.currentBrickId = brickId;
        };
        /**
         * @return {?}
         */
        PickOutAreaModel.prototype.canInitiatePickOutProcess = /**
         * @return {?}
         */
        function () {
            return this.isMouseMovedEnough() &&
                (!this.currentBrickId || this.currentBrickId !== this.initialBrickId);
        };
        /**
         * @return {?}
         */
        PickOutAreaModel.prototype.initiatePickOutProcess = /**
         * @return {?}
         */
        function () {
            this.isPickOutProcessInitialized = true;
        };
        /**
         * @private
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        PickOutAreaModel.prototype.updatePickOutAreaPositionAndSize = /**
         * @private
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            // update x position and width
            if (x < this.initialX) {
                this.width = this.initialX - x;
                this.x = x;
            }
            else {
                this.width = Math.abs(x - this.x);
            }
            // update y position and height
            if (y < this.initialY) {
                this.height = this.initialY - y;
                this.y = y;
            }
            else {
                this.height = Math.abs(y - this.y);
            }
            /** @type {?} */
            var scrollContextRect = this.scrollableContainer.getBoundingClientRect();
            this.clientX = scrollContextRect.left + this.x;
            this.clientY = scrollContextRect.top + this.y - this.scrollableContainer.scrollTop;
        };
        /**
         * @private
         * @return {?}
         */
        PickOutAreaModel.prototype.isMouseMovedEnough = /**
         * @private
         * @return {?}
         */
        function () {
            return this.width > this.minimumMoveDistance ||
                this.height > this.minimumMoveDistance;
        };
        return PickOutAreaModel;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PickOutAreaDirective = /** @class */ (function () {
        function PickOutAreaDirective(doc, pickOutCoordinator, componentFactoryResolver, appRef, zone, el, injector) {
            this.pickOutCoordinator = pickOutCoordinator;
            this.componentFactoryResolver = componentFactoryResolver;
            this.appRef = appRef;
            this.zone = zone;
            this.el = el;
            this.injector = injector;
            this.doc = null;
            this.pickOutAreaModel = null;
            this.selectionRangeComponentRef = null;
            this.doc = doc;
        }
        /**
         * @return {?}
         */
        PickOutAreaDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.onMouseUpBound = this.onMouseUp.bind(this);
            this.onMouseMoveBound = this.onMouseMove.bind(this);
            this.onSelectionStartBound = this.onSelectionStart.bind(this);
            this.onContainerScrollBound = this.onContainerScroll.bind(this);
            this.doc.addEventListener('mousemove', this.onMouseMoveBound);
            this.doc.addEventListener('mouseup', this.onMouseUpBound);
            this.doc.addEventListener('selectstart', this.onSelectionStartBound);
            this.config.scrollableContainer.addEventListener('scroll', this.onContainerScrollBound);
        };
        /**
         * @return {?}
         */
        PickOutAreaDirective.prototype.triggerPickOutChanged = /**
         * @return {?}
         */
        function () {
            this.pickOutCoordinator.pickOutChanged({
                x: this.pickOutAreaModel.clientX,
                y: this.pickOutAreaModel.clientY,
                width: this.pickOutAreaModel.width,
                height: this.pickOutAreaModel.height
            });
        };
        /**
         * @param {?} event
         * @return {?}
         */
        PickOutAreaDirective.prototype.mouseDown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.button === MOUSE_LEFT_KEY_CODE && !this.isMouseOverDraggableElement(event.clientX, event.clientY)) {
                /** @type {?} */
                var scrollContextRect = this.config.scrollableContainer.getBoundingClientRect();
                /** @type {?} */
                var pageX = event.clientX - scrollContextRect.left;
                /** @type {?} */
                var pageY = event.clientY - scrollContextRect.top + this.config.scrollableContainer.scrollTop;
                /** @type {?} */
                var brickIdOverMouse = this.findBrickIdByCoordinate(event.clientX, event.clientY);
                this.pickOutAreaModel = new PickOutAreaModel(this.config.scrollableContainer, pageX, pageY, brickIdOverMouse);
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        PickOutAreaDirective.prototype.onMouseMove = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this.pickOutAreaModel) {
                this.pickOutAreaModel.updateCurrentClientPosition(event.clientX, event.clientY);
                this.pickOutAreaModel.updateCurrentBrickId(this.findBrickIdByCoordinate(event.clientX, event.clientY));
                if (this.pickOutAreaModel.isPickOutProcessInitialized) {
                    event.preventDefault();
                    this.triggerPickOutChanged();
                }
                else if (this.pickOutAreaModel.canInitiatePickOutProcess()) {
                    this.pickOutAreaModel.initiatePickOutProcess();
                    this.onStartPicKOut();
                }
            }
        };
        /**
         * @return {?}
         */
        PickOutAreaDirective.prototype.onMouseUp = /**
         * @return {?}
         */
        function () {
            this.onStopPickOut();
        };
        /**
         * @return {?}
         */
        PickOutAreaDirective.prototype.onContainerScroll = /**
         * @return {?}
         */
        function () {
            if (this.pickOutAreaModel && this.pickOutAreaModel.isPickOutProcessInitialized) {
                this.pickOutAreaModel.recalculatePositionAndSize();
                this.triggerPickOutChanged();
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        PickOutAreaDirective.prototype.onSelectionStart = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            // does not allow select text during pick out process
            if (this.pickOutAreaModel && this.pickOutAreaModel.isPickOutProcessInitialized) {
                e.preventDefault();
            }
        };
        /**
         * @return {?}
         */
        PickOutAreaDirective.prototype.renderRangeComponent = /**
         * @return {?}
         */
        function () {
            // https://medium.com/@caroso1222/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
            // 1. Create a component reference from the component
            this.selectionRangeComponentRef = this.componentFactoryResolver
                .resolveComponentFactory(PickOutAreaComponent)
                .create(this.injector);
            this.selectionRangeComponentRef.instance.initialize(this.pickOutAreaModel);
            // 2. Attach component to the appRef so that it's inside the ng component tree
            this.appRef.attachView(this.selectionRangeComponentRef.hostView);
            // 3. Get DOM element from component
            /** @type {?} */
            var domElem = (/** @type {?} */ (((/** @type {?} */ (this.selectionRangeComponentRef.hostView)))
                .rootNodes[0]));
            // 4. Append DOM element to the body
            this.config.scrollableContainer.appendChild(domElem);
        };
        /**
         * @return {?}
         */
        PickOutAreaDirective.prototype.removeRangeComponent = /**
         * @return {?}
         */
        function () {
            this.appRef.detachView(this.selectionRangeComponentRef.hostView);
            this.selectionRangeComponentRef.destroy();
            this.selectionRangeComponentRef = null;
        };
        /**
         * @return {?}
         */
        PickOutAreaDirective.prototype.onStartPicKOut = /**
         * @return {?}
         */
        function () {
            this.pickOutCoordinator.startPickOut();
            this.doc.activeElement.blur();
            this.renderRangeComponent();
            this.clearSelection();
        };
        /**
         * @return {?}
         */
        PickOutAreaDirective.prototype.onStopPickOut = /**
         * @return {?}
         */
        function () {
            if (this.pickOutAreaModel && this.pickOutAreaModel.isPickOutProcessInitialized) {
                this.removeRangeComponent();
                this.pickOutCoordinator.endPickOut();
            }
            this.pickOutAreaModel = null;
        };
        /**
         * @return {?}
         */
        PickOutAreaDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.doc.removeEventListener('mouseup', this.onMouseUpBound);
            this.doc.removeEventListener('mousemove', this.onMouseMoveBound);
            this.doc.removeEventListener('selectstart', this.onSelectionStartBound);
            this.config.scrollableContainer.removeEventListener('scroll', this.onContainerScrollBound);
        };
        /**
         * @private
         * @return {?}
         */
        PickOutAreaDirective.prototype.clearSelection = /**
         * @private
         * @return {?}
         */
        function () {
            window.getSelection().empty();
        };
        /**
         * @private
         * @param {?} pageX
         * @param {?} clientY
         * @return {?}
         */
        PickOutAreaDirective.prototype.findBrickIdByCoordinate = /**
         * @private
         * @param {?} pageX
         * @param {?} clientY
         * @return {?}
         */
        function (pageX, clientY) {
            /** @type {?} */
            var currentElement = document.elementFromPoint(pageX, clientY);
            while (currentElement && currentElement.tagName !== 'WALL-CANVAS-BRICK') {
                currentElement = currentElement.parentElement;
            }
            if (currentElement) {
                // there is canvas bricks
                return currentElement
                    .getElementsByClassName('wall-canvas-brick__wrapper')[0]
                    .getAttribute('id');
            }
            else {
                return null;
            }
        };
        /**
         * @private
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        PickOutAreaDirective.prototype.isMouseOverDraggableElement = /**
         * @private
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        function (clientX, clientY) {
            /** @type {?} */
            var currentElement = document.elementFromPoint(clientX, clientY);
            while (currentElement &&
                !((/** @type {?} */ (currentElement))).draggable &&
                !currentElement.classList.contains('wall-canvas-brick__draggable-box')) {
                currentElement = currentElement.parentElement;
            }
            return Boolean(currentElement);
        };
        PickOutAreaDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pick-out-area]'
                    },] }
        ];
        /** @nocollapse */
        PickOutAreaDirective.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: PickOutCoordinator },
            { type: core.ComponentFactoryResolver },
            { type: core.ApplicationRef },
            { type: core.NgZone },
            { type: core.ElementRef },
            { type: core.Injector }
        ]; };
        PickOutAreaDirective.propDecorators = {
            config: [{ type: core.Input, args: ['pick-out-area',] }],
            mouseDown: [{ type: core.HostListener, args: ['mousedown', ['$event'],] }]
        };
        return PickOutAreaDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PickOutService = /** @class */ (function () {
        function PickOutService(pickOutHandlerService) {
            var _this = this;
            this.pickOutHandlerService = pickOutHandlerService;
            this.events = new rxjs.Subject();
            this.pickOutHandlerService.changes.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.events.next(e);
            }));
        }
        /**
         * @return {?}
         */
        PickOutService.prototype.enablePickOut = /**
         * @return {?}
         */
        function () {
            this.pickOutHandlerService.enablePickOut();
        };
        /**
         * @return {?}
         */
        PickOutService.prototype.disablePickOut = /**
         * @return {?}
         */
        function () {
            this.pickOutHandlerService.disablePickOut();
        };
        /**
         * @return {?}
         */
        PickOutService.prototype.stopPickOut = /**
         * @return {?}
         */
        function () {
            this.pickOutHandlerService.stopPickOut();
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        PickOutService.prototype.subscribe = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            return this.events.subscribe(fn);
        };
        PickOutService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        PickOutService.ctorParameters = function () { return [
            { type: PickOutCoordinator }
        ]; };
        return PickOutService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PickOutModule = /** @class */ (function () {
        function PickOutModule() {
        }
        PickOutModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            RadarModule
                        ],
                        declarations: [
                            PickOutAreaComponent,
                            PickOutAreaDirective
                        ],
                        providers: [
                            PickOutService,
                            PickOutCoordinator
                        ],
                        exports: [
                            PickOutAreaDirective
                        ],
                        entryComponents: [
                            PickOutAreaComponent
                        ]
                    },] }
        ];
        return PickOutModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WallModule = /** @class */ (function () {
        function WallModule() {
        }
        /**
         * @return {?}
         */
        WallModule.forRoot = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: WallModule,
                providers: [
                    BrickRegistry,
                    WallModelFactory
                ]
            };
        };
        WallModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            PickOutModule,
                            TowModule,
                            RadarModule,
                            PlaceholderRendererModule,
                            material.MatIconModule
                        ],
                        declarations: [
                            WallComponent,
                            WallCanvasComponent,
                            WallCanvasRowComponent,
                            WallCanvasBrickComponent
                        ],
                        exports: [
                            WallComponent
                        ]
                    },] }
        ];
        return WallModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BrickInputPlaceholderComponent = /** @class */ (function () {
        function BrickInputPlaceholderComponent() {
            this.selected = new core.EventEmitter();
        }
        /**
         * @param {?} event
         * @return {?}
         */
        BrickInputPlaceholderComponent.prototype.onClick = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.selected.emit(event);
        };
        /**
         * @return {?}
         */
        BrickInputPlaceholderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
        };
        BrickInputPlaceholderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'w-brick-input-placeholder',
                        template: "<div class=\"placeholder\" (click)=\"onClick($event)\">\n    <mat-icon>{{icon}}</mat-icon>\n    <span> {{ text }} </span>\n</div>\n\n<w-loading-wrapper [message]=\"'Loading'\" *ngIf=\"loading\"></w-loading-wrapper>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".placeholder{padding:15px;display:flex;cursor:pointer;border-radius:4px;align-items:center}mat-icon{margin-right:10px}:host{position:relative;display:block}"]
                    }] }
        ];
        /** @nocollapse */
        BrickInputPlaceholderComponent.ctorParameters = function () { return []; };
        BrickInputPlaceholderComponent.propDecorators = {
            text: [{ type: core.Input }],
            icon: [{ type: core.Input }],
            loading: [{ type: core.Input }],
            selected: [{ type: core.Output }]
        };
        return BrickInputPlaceholderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LoadingWrapperComponent = /** @class */ (function () {
        function LoadingWrapperComponent() {
        }
        /**
         * @return {?}
         */
        LoadingWrapperComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
        };
        LoadingWrapperComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'w-loading-wrapper',
                        template: "<div *ngIf=\"message\" class=\"w-loading-wrapper__message\">{{message}}</div>\n<div class=\"w-loading-wrapper__wrapper\"></div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".w-loading-wrapper__message,.w-loading-wrapper__wrapper{position:absolute;top:0;left:0;bottom:0;right:0}.w-loading-wrapper__wrapper{opacity:.2;cursor:progress}.w-loading-wrapper__message{display:flex;justify-content:center;align-items:center}"]
                    }] }
        ];
        LoadingWrapperComponent.propDecorators = {
            message: [{ type: core.Input }]
        };
        return LoadingWrapperComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HelperComponentsModule = /** @class */ (function () {
        function HelperComponentsModule() {
        }
        HelperComponentsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatIconModule
                        ],
                        exports: [
                            BrickInputPlaceholderComponent,
                            LoadingWrapperComponent,
                        ],
                        declarations: [
                            BrickInputPlaceholderComponent,
                            LoadingWrapperComponent,
                        ],
                        providers: []
                    },] }
        ];
        return HelperComponentsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var WALL = {
        MODES: {
            EDIT: 'edit',
            READ: 'READ'
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CopyPlugin = /** @class */ (function () {
        function CopyPlugin(injector) {
            this.injector = injector;
            this.doc = null;
            this.doc = this.injector.get(common.DOCUMENT);
            this.onCopyBound = this.onCopy.bind(this);
            this.doc.addEventListener('copy', this.onCopyBound);
        }
        /**
         * @param {?} model
         * @return {?}
         */
        CopyPlugin.prototype.onWallInitialize = /**
         * @param {?} model
         * @return {?}
         */
        function (model) {
            this.wallModel = model;
        };
        /**
         * @param {?} e
         * @return {?}
         */
        CopyPlugin.prototype.onCopy = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var selectedTextRepresentation = this.getSelectedTextRepresentation();
            if (selectedTextRepresentation.length) {
                e.preventDefault();
                this.addToClipboard(e, selectedTextRepresentation);
            }
        };
        /**
         * @return {?}
         */
        CopyPlugin.prototype.onWallPluginDestroy = /**
         * @return {?}
         */
        function () {
            this.doc.removeEventListener('click', this.onCopy);
        };
        /**
         * @private
         * @param {?} e
         * @param {?} str
         * @return {?}
         */
        CopyPlugin.prototype.addToClipboard = /**
         * @private
         * @param {?} e
         * @param {?} str
         * @return {?}
         */
        function (e, str) {
            e.clipboardData.setData('text/plain', str);
        };
        /**
         * @private
         * @return {?}
         */
        CopyPlugin.prototype.getSelectedTextRepresentation = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
            return selectedBrickIds
                .map((/**
             * @param {?} selectedBrickId
             * @return {?}
             */
            function (selectedBrickId) { return _this.wallModel.api.core.getBrickTextRepresentation(selectedBrickId); }))
                .map((/**
             * @param {?} textRepresentation
             * @return {?}
             */
            function (textRepresentation) { return textRepresentation.trim(); }))
                .join('\n');
        };
        return CopyPlugin;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var UNDO_REDO_API_NAME = 'undo';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var UndoRedoPlugin = /** @class */ (function () {
        function UndoRedoPlugin(injector) {
            this.injector = injector;
            this.processingUndo = false;
            this.undoPlanStack = [];
            this.redoPlanStack = [];
            this.doc = this.injector.get(common.DOCUMENT);
        }
        /**
         * @param {?} wallModel
         * @return {?}
         */
        UndoRedoPlugin.prototype.onWallInitialize = /**
         * @param {?} wallModel
         * @return {?}
         */
        function (wallModel) {
            var _this = this;
            this.wallModel = wallModel;
            this.wallModel.registerApi(UNDO_REDO_API_NAME, (/** @type {?} */ ({
                undo: this.undo.bind(this),
                undoSize: this.undoSize.bind(this),
                redo: this.redo.bind(this),
                redoSize: this.redoSize.bind(this),
                clear: this.clear.bind(this)
            })));
            this.apiSubscription = this.wallModel.api.core.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.wallModelEventHandler(e);
            }));
            this.onUndoKeyHandlerBound = this.onUndoKeyHandler.bind(this);
            this.doc.addEventListener('keydown', this.onUndoKeyHandlerBound);
        };
        /**
         * @return {?}
         */
        UndoRedoPlugin.prototype.onWallPluginDestroy = /**
         * @return {?}
         */
        function () {
            this.apiSubscription.unsubscribe();
            this.doc.removeEventListener('keydown', this.onUndoKeyHandlerBound);
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        UndoRedoPlugin.prototype.onUndoKeyHandler = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var CTRL_KEY = 90;
            if (e.keyCode === CTRL_KEY && e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation();
                if (e.shiftKey) {
                    this.redo();
                }
                else {
                    this.undo();
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        UndoRedoPlugin.prototype.undoSize = /**
         * @private
         * @return {?}
         */
        function () {
            return this.undoPlanStack.length;
        };
        /**
         * @private
         * @return {?}
         */
        UndoRedoPlugin.prototype.redoSize = /**
         * @private
         * @return {?}
         */
        function () {
            return this.redoPlanStack.length;
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        UndoRedoPlugin.prototype.wallModelEventHandler = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (!this.processingUndo) {
                if (e instanceof BeforeChangeEvent && ((/** @type {?} */ (e))).beforeEventType !== SetPlanEvent) {
                    this.undoPlanStack.push(this.wallModel.api.core.getPlan());
                    this.redoPlanStack = [];
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        UndoRedoPlugin.prototype.redo = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var redoPlan = this.redoPlanStack.pop();
            if (redoPlan) {
                this.processingUndo = true;
                this.wallModel.api.core.setPlan(redoPlan);
                this.undoPlanStack.push(redoPlan);
                this.processingUndo = false;
            }
        };
        /**
         * @private
         * @return {?}
         */
        UndoRedoPlugin.prototype.undo = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var previousPlan = this.undoPlanStack.pop();
            if (previousPlan) {
                this.processingUndo = true;
                this.wallModel.api.core.setPlan(previousPlan);
                this.redoPlanStack.push(previousPlan);
                this.processingUndo = false;
            }
        };
        /**
         * @private
         * @return {?}
         */
        UndoRedoPlugin.prototype.clear = /**
         * @private
         * @return {?}
         */
        function () {
            this.undoPlanStack = [];
            this.redoPlanStack = [];
        };
        return UndoRedoPlugin;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TOW = {
        dropTypes: {
            horizontal: 'horizontal',
            vertical: 'vertical'
        },
        dropSides: {
            left: 'left',
            right: 'right',
            top: 'top',
            bottom: 'bottom'
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SelectionPlugin = /** @class */ (function () {
        function SelectionPlugin(injector, options) {
            this.injector = injector;
            this.isMouseSelection = false;
            this.placeholderHeight = 2;
            this.isEnableDropZoneHighlight = false;
            // extension point for client to prevent brick un-selections
            this.options = __assign({ shouldUnselectBrick: (/**
                 * @return {?}
                 */
                function () { return true; }) }, options);
        }
        /**
         * @param {?} wallModel
         * @return {?}
         */
        SelectionPlugin.prototype.onWallInitialize = /**
         * @param {?} wallModel
         * @return {?}
         */
        function (wallModel) {
            var _this = this;
            this.wallModel = wallModel;
            this.doc = this.injector.get(common.DOCUMENT);
            this.pickOutService = this.injector.get(PickOutService);
            this.radar = this.injector.get(Radar);
            this.placeholderRenderer = this.injector.get(PlaceholderRenderer);
            this.towService = this.injector.get(TowService);
            this.onMouseDownBound = this.onMouseDown.bind(this);
            this.onKeyDownHandlerBound = this.onKeyDownHandler.bind(this);
            this.doc.addEventListener('mousedown', this.onMouseDownBound);
            this.doc.addEventListener('keydown', this.onKeyDownHandlerBound);
            // listen to picked out items and select appropriate bricks
            this.pickOutServiceSubscription = this.pickOutService.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (e instanceof StartPickOut) {
                    _this.isMouseSelection = true;
                    _this.wallModel.api.ui.disableMediaInteraction();
                }
                if (e instanceof PickOutItems) {
                    _this.wallModel.api.ui.selectBricks(e.ids);
                }
                if (e instanceof EndPickOut) {
                    _this.wallModel.api.ui.enableMediaInteraction();
                }
            }));
            // listen for draggable operation and move bricks accordingly
            this.towServiceSubscription = this.towService.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (e instanceof StartWorkingEvent) {
                    if (_this.wallModel.api.core.getBrickSnapshot(e.slaveId)) {
                        _this.isEnableDropZoneHighlight = true;
                    }
                    else {
                        _this.isEnableDropZoneHighlight = false;
                    }
                    _this.nearestBrickToDrop = null;
                    _this.placeholderRenderer.clear();
                }
                if (e instanceof StopWorkingEvent && _this.nearestBrickToDrop) {
                    if (_this.isEnableDropZoneHighlight) {
                        /** @type {?} */
                        var movedBrickIds = [];
                        /** @type {?} */
                        var selectedBrickIds = _this.wallModel.api.ui.getSelectedBrickIds();
                        if (selectedBrickIds.length > 1) {
                            movedBrickIds = movedBrickIds.concat(selectedBrickIds);
                        }
                        else {
                            movedBrickIds.push(e.slaveId);
                        }
                        if (_this.nearestBrickToDrop.type === TOW.dropTypes.horizontal) {
                            if (_this.nearestBrickToDrop.side === TOW.dropSides.top) {
                                _this.wallModel.api.core.moveBrickBeforeBrickId(movedBrickIds, _this.nearestBrickToDrop.spot.data.brickId);
                            }
                            if (_this.nearestBrickToDrop.side === TOW.dropSides.bottom) {
                                _this.wallModel.api.core.moveBrickAfterBrickId(movedBrickIds, _this.nearestBrickToDrop.spot.data.brickId);
                            }
                        }
                        if (_this.nearestBrickToDrop.type === TOW.dropTypes.vertical) {
                            if (_this.nearestBrickToDrop.side === TOW.dropSides.left) {
                                _this.wallModel.api.core.moveBrickToNewColumn(movedBrickIds, _this.nearestBrickToDrop.spot.data.brickId, TOW.dropSides.left);
                            }
                            if (_this.nearestBrickToDrop.side === TOW.dropSides.right) {
                                _this.wallModel.api.core.moveBrickToNewColumn(movedBrickIds, _this.nearestBrickToDrop.spot.data.brickId, TOW.dropSides.right);
                            }
                        }
                        _this.nearestBrickToDrop = null;
                        _this.placeholderRenderer.clear();
                    }
                }
                if (e instanceof WorkInProgressEvent) {
                    if (_this.isEnableDropZoneHighlight) {
                        /** @type {?} */
                        var spots = _this.radar.filterSpots((/**
                         * @param {?} spot
                         * @return {?}
                         */
                        function (spot) { return spot.data.isBeacon; }));
                        /** @type {?} */
                        var nearestSpot_1;
                        spots.forEach((/**
                         * @param {?} spot
                         * @return {?}
                         */
                        function (spot) {
                            spot.updateInfo();
                            if (!nearestSpot_1) {
                                nearestSpot_1 = spot;
                            }
                            else {
                                /** @type {?} */
                                var currentSpotMinimalDistance = spot.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                                /** @type {?} */
                                var nearestSpotMinimalDistance = nearestSpot_1.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                                if (currentSpotMinimalDistance < nearestSpotMinimalDistance) {
                                    nearestSpot_1 = spot;
                                }
                            }
                        }));
                        if (nearestSpot_1) {
                            /** @type {?} */
                            var nearestSpotMinimalDistance = nearestSpot_1.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                            if (nearestSpotMinimalDistance < 50) {
                                _this.nearestBrickToDrop = {
                                    spot: nearestSpot_1,
                                    side: null,
                                    type: null
                                };
                                if (e.mousePosition.clientX < nearestSpot_1.position.x) {
                                    _this.nearestBrickToDrop.type = TOW.dropTypes.vertical;
                                    _this.nearestBrickToDrop.side = TOW.dropSides.left;
                                }
                                if (e.mousePosition.clientX > nearestSpot_1.position.x + nearestSpot_1.size.width) {
                                    _this.nearestBrickToDrop.type = TOW.dropTypes.vertical;
                                    _this.nearestBrickToDrop.side = TOW.dropSides.right;
                                }
                                if (e.mousePosition.clientX > nearestSpot_1.position.x &&
                                    e.mousePosition.clientX < nearestSpot_1.position.x + nearestSpot_1.size.width) {
                                    _this.nearestBrickToDrop.type = TOW.dropTypes.horizontal;
                                    /** @type {?} */
                                    var centerYPosition = nearestSpot_1.position.y + (nearestSpot_1.size.height / 2);
                                    _this.nearestBrickToDrop.side = e.mousePosition.clientY < centerYPosition ?
                                        TOW.dropSides.top : TOW.dropSides.bottom;
                                }
                                _this.renderPlaceholder();
                            }
                            else {
                                _this.nearestBrickToDrop = null;
                                _this.placeholderRenderer.clear();
                            }
                        }
                        else {
                            _this.nearestBrickToDrop = null;
                            _this.placeholderRenderer.clear();
                        }
                    }
                }
            }));
        };
        /**
         * @param {?} e
         * @return {?}
         */
        SelectionPlugin.prototype.onMouseDown = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (!this.isMouseOverDraggableBox(e.clientX, e.clientY) && this.options.shouldUnselectBrick(e)) {
                this.wallModel.api.ui.unSelectBricks();
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        SelectionPlugin.prototype.onKeyDownHandler = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
            /** @type {?} */
            var firstSelectedBrickId = selectedBrickIds[0];
            /** @type {?} */
            var lastSelectedBrickId = selectedBrickIds[selectedBrickIds.length - 1];
            if (e.key === 'Delete' && selectedBrickIds.length) {
                e.preventDefault();
                this.wallModel.api.ui.unSelectBricks();
                this.wallModel.api.ui.removeBricks(selectedBrickIds);
            }
            if (e.key === 'Enter' && selectedBrickIds.length) {
                e.preventDefault();
                this.wallModel.api.ui.focusOnBrickId(firstSelectedBrickId);
                this.wallModel.api.ui.unSelectBricks();
            }
            if (e.key === 'ArrowUp' && selectedBrickIds.length) {
                e.preventDefault();
                /** @type {?} */
                var previousBrickId = this.wallModel.api.core.getPreviousBrickId(lastSelectedBrickId);
                if (previousBrickId) {
                    if (e.shiftKey) {
                        if (selectedBrickIds.length > 1 && this.isDownSelectionDirection()) {
                            this.wallModel.api.ui.removeBrickFromSelection(lastSelectedBrickId);
                        }
                        else {
                            this.wallModel.api.ui.addBrickToSelection(previousBrickId);
                        }
                    }
                    else {
                        this.wallModel.api.ui.selectBrick(previousBrickId);
                    }
                }
            }
            if (e.key === 'ArrowDown' && selectedBrickIds.length) {
                e.preventDefault();
                /** @type {?} */
                var nextBrickId = this.wallModel.api.core.getNextBrickId(lastSelectedBrickId);
                if (nextBrickId) {
                    if (e.shiftKey) {
                        if (selectedBrickIds.length > 1 && !this.isDownSelectionDirection()) {
                            this.wallModel.api.ui.removeBrickFromSelection(lastSelectedBrickId);
                        }
                        else {
                            this.wallModel.api.ui.addBrickToSelection(nextBrickId);
                        }
                    }
                    else {
                        this.wallModel.api.ui.selectBrick(nextBrickId);
                    }
                }
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                if (selectedBrickIds.length) {
                    this.wallModel.api.ui.unSelectBricks();
                }
            }
        };
        /**
         * @return {?}
         */
        SelectionPlugin.prototype.onWallPluginDestroy = /**
         * @return {?}
         */
        function () {
            this.doc.removeEventListener('mousedown', this.onMouseDownBound);
            this.doc.removeEventListener('keydown', this.onKeyDownHandlerBound);
            this.wallModel = null;
            this.pickOutServiceSubscription.unsubscribe();
            this.towServiceSubscription.unsubscribe();
        };
        /**
         * @private
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        SelectionPlugin.prototype.isMouseOverDraggableBox = /**
         * @private
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        function (clientX, clientY) {
            /** @type {?} */
            var currentElement = document.elementFromPoint(clientX, clientY);
            while (currentElement && !currentElement.classList.contains('wall-canvas-brick__draggable-box')) {
                currentElement = currentElement.parentElement;
            }
            return Boolean(currentElement);
        };
        /**
         * @private
         * @return {?}
         */
        SelectionPlugin.prototype.isDownSelectionDirection = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
            /** @type {?} */
            var bricksCount = selectedBrickIds.length;
            /** @type {?} */
            var lastBrickId = selectedBrickIds[bricksCount - 1];
            /** @type {?} */
            var penultimateBrickId = selectedBrickIds[bricksCount - 2];
            return this.wallModel.api.core.isBrickAheadOf(penultimateBrickId, lastBrickId);
        };
        /**
         * @private
         * @return {?}
         */
        SelectionPlugin.prototype.renderPlaceholder = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var placeholderX;
            /** @type {?} */
            var placeholderY;
            /** @type {?} */
            var placeholderSize;
            /** @type {?} */
            var placeholderIsHorizontal;
            /** @type {?} */
            var spot = this.nearestBrickToDrop.spot;
            /** @type {?} */
            var side = this.nearestBrickToDrop.side;
            /** @type {?} */
            var type = this.nearestBrickToDrop.type;
            if (type === TOW.dropTypes.horizontal) {
                placeholderX = spot.position.x;
                placeholderSize = spot.size.width;
                if (side === TOW.dropSides.top) {
                    placeholderY = spot.position.y - this.placeholderHeight;
                }
                if (side === TOW.dropSides.bottom) {
                    placeholderY = spot.position.y + spot.size.height;
                }
                placeholderIsHorizontal = true;
            }
            if (type === TOW.dropTypes.vertical) {
                placeholderY = spot.position.y;
                placeholderSize = spot.size.height;
                placeholderIsHorizontal = false;
                if (side === TOW.dropSides.left) {
                    placeholderX = spot.position.x;
                }
                if (side === TOW.dropSides.right) {
                    placeholderX = spot.position.x + spot.size.width;
                }
            }
            this.placeholderRenderer.render(placeholderX, placeholderY, placeholderSize, placeholderIsHorizontal);
        };
        return SelectionPlugin;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DIVIDER_BRICK_TAG = 'divider';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DividerBrickComponent = /** @class */ (function () {
        function DividerBrickComponent() {
        }
        DividerBrickComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'divider-brick',
                        template: "<div class=\"wrapper\">\n    <div class=\"divider\"></div>\n</div>\n",
                        styles: [".wrapper{height:36px}.divider{border-bottom:1px solid silver;height:1px;padding-top:17px}"]
                    }] }
        ];
        return DividerBrickComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DividerBrickModule = /** @class */ (function () {
        function DividerBrickModule(brickRegistry) {
            this.brickRegistry = brickRegistry;
            this.brickRegistry.register({
                tag: DIVIDER_BRICK_TAG,
                component: DividerBrickComponent,
                name: 'Divider',
                description: 'Visually divide blocks'
            });
        }
        DividerBrickModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [DividerBrickComponent],
                        declarations: [DividerBrickComponent],
                        entryComponents: [DividerBrickComponent]
                    },] }
        ];
        /** @nocollapse */
        DividerBrickModule.ctorParameters = function () { return [
            { type: BrickRegistry }
        ]; };
        return DividerBrickModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TextRepresentation = /** @class */ (function () {
        function TextRepresentation(brickSnapshot) {
            this.brickSnapshot = brickSnapshot;
        }
        /**
         * @return {?}
         */
        TextRepresentation.prototype.getText = /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.brickSnapshot.state))).text;
        };
        return TextRepresentation;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DeepLeftNodeChild = /** @class */ (function () {
        function DeepLeftNodeChild(root) {
            /** @type {?} */
            var currentNode = root;
            while (currentNode.childNodes.length) {
                currentNode = currentNode.childNodes[0];
            }
            this.child = currentNode;
        }
        return DeepLeftNodeChild;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DeepRightNodeChild = /** @class */ (function () {
        function DeepRightNodeChild(root) {
            /** @type {?} */
            var currentNode = root;
            while (currentNode.childNodes.length) {
                currentNode = currentNode.childNodes[currentNode.childNodes.length - 1];
            }
            this.child = currentNode;
        }
        return DeepRightNodeChild;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FirstSubStringNode = /** @class */ (function () {
        function FirstSubStringNode(root, subStringHTML) {
            this.root = root;
            this.subStringHTML = subStringHTML;
            this.firstLevelSubStringNodes = [];
            // get text representation
            this.subString = this.getSubStringTextContent();
            if (subStringHTML.length !== 0) {
                if (this.root.childNodes.length === 1) {
                    this.firstLevelSubStringNodes = Array.from(this.root.childNodes);
                }
                else if (this.root.childNodes.length > 1) {
                    this.firstLevelSubStringNodes = this.findFirstLevelSubStringNodes();
                }
            }
        }
        /**
         * @private
         * @return {?}
         */
        FirstSubStringNode.prototype.findFirstLevelSubStringNodes = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var i = this.root.childNodes.length - 1;
            /** @type {?} */
            var currentNode = this.root.childNodes[i];
            /** @type {?} */
            var text = '';
            /** @type {?} */
            var firstLevelSubStringNodes = [];
            while (currentNode && !text.includes(this.subString)) {
                text = currentNode.textContent + text;
                firstLevelSubStringNodes.push(currentNode);
                i--;
                currentNode = this.root.childNodes[i];
            }
            return firstLevelSubStringNodes.reverse();
        };
        /**
         * @private
         * @return {?}
         */
        FirstSubStringNode.prototype.getSubStringTextContent = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var pNode = document.createElement('P');
            pNode.innerHTML = this.subStringHTML;
            return pNode.textContent;
        };
        return FirstSubStringNode;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CaretStartEndPosition = /** @class */ (function () {
        function CaretStartEndPosition(el) {
            this.el = el;
        }
        /**
         * @return {?}
         */
        CaretStartEndPosition.prototype.isCaretAtEnd = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = false;
            /** @type {?} */
            var sel = window.getSelection();
            if (sel.rangeCount) {
                /** @type {?} */
                var selRange = sel.getRangeAt(0);
                /** @type {?} */
                var testRange = selRange.cloneRange();
                testRange.selectNodeContents(this.el);
                testRange.setStart(selRange.endContainer, selRange.endOffset);
                result = (testRange.toString().trim() === '');
            }
            return result;
        };
        /**
         * @return {?}
         */
        CaretStartEndPosition.prototype.isCaretAtStart = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = false;
            /** @type {?} */
            var sel = window.getSelection();
            if (sel.rangeCount) {
                /** @type {?} */
                var selRange = sel.getRangeAt(0);
                /** @type {?} */
                var testRange = selRange.cloneRange();
                testRange.selectNodeContents(this.el);
                testRange.setEnd(selRange.startContainer, selRange.startOffset);
                result = (testRange.toString().trim() === '');
            }
            return result;
        };
        return CaretStartEndPosition;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CursorLeftCoordinate = /** @class */ (function () {
        function CursorLeftCoordinate(leftText, rightText, targetNode) {
            this.leftText = leftText;
            this.rightText = rightText;
            this.targetNode = targetNode;
        }
        /**
         * @return {?}
         */
        CursorLeftCoordinate.prototype.get = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var div = this.createElementClone(this.targetNode);
            /** @type {?} */
            var span = document.createElement('SPAN');
            div.innerHTML = this.leftText;
            span.innerHTML = this.rightText;
            div.appendChild(span);
            // make sure element stay at top left corner
            div.style.position = 'absolute';
            div.style.top = '0';
            div.style.left = '0';
            div.style.padding = '0';
            div.style.margin = '0';
            document.body.appendChild(div);
            /** @type {?} */
            var leftCoordinate = span.offsetLeft;
            div.remove();
            return leftCoordinate;
        };
        /**
         * @private
         * @param {?} node
         * @return {?}
         */
        CursorLeftCoordinate.prototype.createElementClone = /**
         * @private
         * @param {?} node
         * @return {?}
         */
        function (node) {
            /** @type {?} */
            var div = document.createElement('DIV');
            /** @type {?} */
            var style = getComputedStyle(node);
            [].forEach.call(style, (/**
             * @param {?} prop
             * @return {?}
             */
            function (prop) {
                div.style[prop] = style[prop];
            }));
            return div;
        };
        return CursorLeftCoordinate;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CursorPositionInLine = /** @class */ (function () {
        function CursorPositionInLine(leftText, rightText, targetNode) {
            this.leftText = leftText;
            this.rightText = rightText;
            this.targetNode = targetNode;
            if (leftText === '' && rightText === '') {
                this.isOnFirstLine = true;
                this.isOnLastLine = true;
            }
            else {
                // http://jsbin.com/qifezupu/31/edit?js,output
                /** @type {?} */
                var div = this.createElementClone(this.targetNode);
                document.body.appendChild(div);
                /** @type {?} */
                var span1 = document.createElement('SPAN');
                /** @type {?} */
                var span2 = document.createElement('SPAN');
                div.appendChild(span1);
                div.appendChild(span2);
                span1.innerText = 'a';
                /** @type {?} */
                var lh = span1.offsetHeight;
                span1.innerHTML = leftText;
                span2.innerHTML = rightText;
                this.isOnFirstLine = span1.textContent.length === 0 ||
                    (span1.offsetHeight === lh && span1.getBoundingClientRect().top === span2.getBoundingClientRect().top);
                this.isOnLastLine = span2.offsetHeight === lh;
                div.remove();
            }
        }
        /**
         * @private
         * @param {?} node
         * @return {?}
         */
        CursorPositionInLine.prototype.createElementClone = /**
         * @private
         * @param {?} node
         * @return {?}
         */
        function (node) {
            /** @type {?} */
            var div = document.createElement('DIV');
            /** @type {?} */
            var style = getComputedStyle(node);
            [].forEach.call(style, (/**
             * @param {?} prop
             * @return {?}
             */
            function (prop) {
                div.style[prop] = style[prop];
            }));
            return div;
        };
        return CursorPositionInLine;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PlaceCaretToPosition = /** @class */ (function () {
        function PlaceCaretToPosition(el, position) {
            this.el = el;
            this.position = position;
        }
        /**
         * @return {?}
         */
        PlaceCaretToPosition.prototype.place = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var range = document.createRange();
            /** @type {?} */
            var sel = window.getSelection();
            range.setStart(this.el, this.position);
            sel.removeAllRanges();
            sel.addRange(range);
        };
        return PlaceCaretToPosition;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Returns string which does not contains empty nodes inside
     */
    var /**
     * Returns string which does not contains empty nodes inside
     */
    StringWithoutEmptyNodes = /** @class */ (function () {
        function StringWithoutEmptyNodes(str) {
            this.str = str;
        }
        /**
         * @return {?}
         */
        StringWithoutEmptyNodes.prototype.get = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var pNode = document.createElement('P');
            pNode.innerHTML = this.str;
            if (!pNode.textContent.trim().length) {
                // there are no text itself, so replace any tags to empty string
                return '';
            }
            else {
                return this.str;
            }
        };
        return StringWithoutEmptyNodes;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var FOCUS_INITIATOR = 'text-supporting-brick';
    /** @type {?} */
    var ENTER_KEY = 'Enter';
    /** @type {?} */
    var NUMPUB_ENTER_KEY = 'NumpadEnter';
    /** @type {?} */
    var ENTER_KEY_CODE_ANDROID = 13;
    /** @type {?} */
    var DELETE_KEY = 'Delete';
    /** @type {?} */
    var BACK_SPACE_KEY = 'Backspace';
    /** @type {?} */
    var BACK_SPACE_KEY_CODE_ANDROID = 8;
    /** @type {?} */
    var LEFT_KEY = 'ArrowLeft';
    /** @type {?} */
    var TOP_KEY = 'ArrowUp';
    /** @type {?} */
    var RIGHT_KEY = 'ArrowRight';
    /** @type {?} */
    var BOTTOM_KEY = 'ArrowDown';
    /** @type {?} */
    var ESCAPE_KEY = 27;
    /** @type {?} */
    var TAB_KEY = 'Tab';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BottomKeyHandler = /** @class */ (function () {
        function BottomKeyHandler(baseTextBrickComponent) {
            this.baseTextBrickComponent = baseTextBrickComponent;
        }
        /**
         * @param {?} e
         * @return {?}
         */
        BottomKeyHandler.prototype.execute = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.baseTextBrickComponent.isCaretAtLastLine()) {
                e.preventDefault();
                /** @type {?} */
                var caretLeftCoordinate = this.baseTextBrickComponent.getCaretLeftCoordinate();
                /** @type {?} */
                var focusContext = {
                    initiator: FOCUS_INITIATOR,
                    details: {
                        bottomKey: true,
                        caretLeftCoordinate: caretLeftCoordinate
                    }
                };
                this.baseTextBrickComponent.wallUiApi.focusOnNextTextBrick(this.baseTextBrickComponent.id, focusContext);
            }
        };
        return BottomKeyHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var EnterKeyHandler = /** @class */ (function () {
        function EnterKeyHandler(baseTextBrickComponent) {
            this.baseTextBrickComponent = baseTextBrickComponent;
        }
        /**
         * @param {?} e
         * @return {?}
         */
        EnterKeyHandler.prototype.execute = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            /** @type {?} */
            var sel = window.getSelection();
            /** @type {?} */
            var splittedText = this.baseTextBrickComponent.getSplittedText(sel.focusOffset, sel.focusNode);
            splittedText.left = this.baseTextBrickComponent.cleanUpText(splittedText.left);
            splittedText.right = this.baseTextBrickComponent.cleanUpText(splittedText.right);
            if (splittedText.left.length) {
                if (splittedText.right.length) {
                    // text is splitted to two part
                    this.splitBrickForTwoPart(splittedText.left, splittedText.right);
                }
                else {
                    // cursor at end - text's exist - create new and focus on it
                    this.addEmptyBrickAfter();
                }
            }
            else {
                if (splittedText.right.length) {
                    // cursor at start, text exists - just create new line at top, do not move focus
                    this.addEmptyTextBrickBefore();
                }
                else {
                    // there are no text at all - create new and focus on it
                    this.addEmptyBrickAfter();
                }
            }
        };
        /**
         * @private
         * @param {?} left
         * @param {?} right
         * @return {?}
         */
        EnterKeyHandler.prototype.splitBrickForTwoPart = /**
         * @private
         * @param {?} left
         * @param {?} right
         * @return {?}
         */
        function (left, right) {
            this.addBrickAfter(right);
            this.baseTextBrickComponent.setTextState(left);
            this.baseTextBrickComponent.saveCurrentState();
        };
        /**
         * @private
         * @return {?}
         */
        EnterKeyHandler.prototype.addEmptyTextBrickBefore = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var newTextState = {
                text: '',
                tabs: this.baseTextBrickComponent.scope.tabs
            };
            this.baseTextBrickComponent.wallModel.api.core
                .addBrickBeforeBrickId(this.baseTextBrickComponent.id, 'text', newTextState);
            // scroll browser view to element
            this.baseTextBrickComponent.editor.nativeElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'start'
            });
        };
        /**
         * @private
         * @return {?}
         */
        EnterKeyHandler.prototype.addEmptyBrickAfter = /**
         * @private
         * @return {?}
         */
        function () {
            // cursor at end - text's exist - create new and focus on it
            this.addBrickAfter('');
        };
        /**
         * @private
         * @param {?} text
         * @return {?}
         */
        EnterKeyHandler.prototype.addBrickAfter = /**
         * @private
         * @param {?} text
         * @return {?}
         */
        function (text) {
            var _this = this;
            /** @type {?} */
            var newTextState = {
                text: text,
                tabs: this.baseTextBrickComponent.scope.tabs
            };
            /** @type {?} */
            var addedBrick = this.baseTextBrickComponent.wallModel.api.core
                .addBrickAfterBrickId(this.baseTextBrickComponent.id, 'text', newTextState);
            // wait one tick for component rendering
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.baseTextBrickComponent.wallUiApi.focusOnBrickId(addedBrick.id);
            }));
        };
        return EnterKeyHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LeftKeyHandler = /** @class */ (function () {
        function LeftKeyHandler(baseTextBrickComponent) {
            this.baseTextBrickComponent = baseTextBrickComponent;
        }
        /**
         * @param {?} e
         * @return {?}
         */
        LeftKeyHandler.prototype.execute = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            /** @type {?} */
            var focusContext = {
                initiator: FOCUS_INITIATOR,
                details: {
                    leftKey: true
                }
            };
            this.baseTextBrickComponent.wallUiApi
                .focusOnPreviousTextBrick(this.baseTextBrickComponent.id, focusContext);
        };
        return LeftKeyHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RightKeyHandler = /** @class */ (function () {
        function RightKeyHandler(baseTextBrickComponent) {
            this.baseTextBrickComponent = baseTextBrickComponent;
        }
        /**
         * @param {?} e
         * @return {?}
         */
        RightKeyHandler.prototype.execute = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            /** @type {?} */
            var focusContext = {
                initiator: FOCUS_INITIATOR,
                details: {
                    rightKey: true
                }
            };
            this.baseTextBrickComponent.wallUiApi.focusOnNextTextBrick(this.baseTextBrickComponent.id, focusContext);
        };
        return RightKeyHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TopKeyHandler = /** @class */ (function () {
        function TopKeyHandler(baseTextBrickComponent) {
            this.baseTextBrickComponent = baseTextBrickComponent;
        }
        /**
         * @param {?} e
         * @return {?}
         */
        TopKeyHandler.prototype.execute = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var caretLeftCoordinate = this.baseTextBrickComponent.getCaretLeftCoordinate();
            if (this.baseTextBrickComponent.isCaretAtFirstLine()) {
                e.preventDefault();
                /** @type {?} */
                var focusContext = {
                    initiator: FOCUS_INITIATOR,
                    details: {
                        topKey: true,
                        caretLeftCoordinate: caretLeftCoordinate
                    }
                };
                this.baseTextBrickComponent.wallModel.api.ui
                    .focusOnPreviousTextBrick(this.baseTextBrickComponent.id, focusContext);
            }
        };
        return TopKeyHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var LineType = {
        first: 'FIRST',
        last: 'LAST',
    };
    /**
     * @abstract
     */
    var BaseTextBrickComponent = /** @class */ (function () {
        function BaseTextBrickComponent() {
            this.stateChanges = new core.EventEmitter();
            this.keypressHandlers = {
                top: new TopKeyHandler(this),
                enter: new EnterKeyHandler(this),
                left: new LeftKeyHandler(this),
                right: new RightKeyHandler(this),
                bottom: new BottomKeyHandler(this)
            };
            this.scope = {
                text: '',
                tabs: 0
            };
            this.maxTabNumber = 3;
            this.textChange = new rxjs.Subject();
        }
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.state && this.state.text !== this.scope.text) {
                this.setTextState(this.state.text);
            }
            this.scope.tabs = this.state.tabs || 0;
            this.onPasteBound = this.onPaste.bind(this);
            this.editor.nativeElement.addEventListener('paste', this.onPasteBound);
            this.textChangeSubscription = this.textChange.subscribe((/**
             * @return {?}
             */
            function () {
                _this.setTextState(_this.scope.text);
                _this.saveCurrentState();
            }));
            this.wallUiApi = this.wallModel.api.ui;
        };
        /**
         * @param {?} newState
         * @return {?}
         */
        BaseTextBrickComponent.prototype.onWallStateChange = /**
         * @param {?} newState
         * @return {?}
         */
        function (newState) {
            this.scope.tabs = this.state.tabs || this.scope.tabs;
            if (newState && newState.text !== this.scope.text) {
                this.setTextState(newState.text);
            }
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.editor.nativeElement.removeEventListener('paste', this.onPasteBound);
            this.textChangeSubscription.unsubscribe();
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.onPaste = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            var _this = this;
            e.preventDefault();
            /** @type {?} */
            var textArr = e.clipboardData.getData('text/plain')
                .split('\n')
                .map((/**
             * @param {?} str
             * @return {?}
             */
            function (str) { return str.trim(); }))
                .filter((/**
             * @param {?} str
             * @return {?}
             */
            function (str) { return str.length; }));
            if (textArr.length === 1) {
                document.execCommand('insertHTML', false, textArr[0]);
            }
            else if (textArr.length > 1) {
                // todo: add interface for UI api
                textArr.reverse().forEach((/**
                 * @param {?} text
                 * @return {?}
                 */
                function (text) { return _this.wallModel.api.core.addBrickAfterBrickId(_this.id, 'text', { text: text }); }));
            }
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.onTextChange = /**
         * @return {?}
         */
        function () {
            this.textChange.next(this.scope.text);
        };
        // general handler of all key events
        // general handler of all key events
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.onKeyPress = 
        // general handler of all key events
        /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.noMetaKeyIsPressed(e)) {
                if (e.code === TOP_KEY) {
                    this.topKeyPressed(e);
                }
                if (e.code === BOTTOM_KEY) {
                    this.bottomKeyPressed(e);
                }
                if (e.code === LEFT_KEY && this.isCaretAtStart()) {
                    this.leftKeyPressed(e);
                }
                if (e.code === RIGHT_KEY && this.isCaretAtEnd()) {
                    this.rightKeyPressed(e);
                }
                if (e.code === ENTER_KEY || e.keyCode === ENTER_KEY_CODE_ANDROID || e.code === NUMPUB_ENTER_KEY) {
                    this.enterKeyPressed(e);
                }
                if (e.keyCode === ESCAPE_KEY) {
                    this.escapeKeyPressed(e);
                }
                if ((e.code === BACK_SPACE_KEY || e.keyCode === BACK_SPACE_KEY_CODE_ANDROID) && !this.isTextSelected()) {
                    this.backSpaceKeyPressed(e);
                }
                if (e.code === DELETE_KEY && this.scope.text.length && this.isCaretAtEnd() && !this.isTextSelected()) {
                    this.concatWithNextTextSupportingBrick(e);
                }
                if (e.code === TAB_KEY && this.isCaretAtStart()) {
                    this.onTabPressed(e);
                }
                if (e.code === DELETE_KEY && this.scope.text === '') {
                    this.onDeleteAndFocusToNext(e);
                }
            }
        };
        /**
         * @param {?} keyHandlerName
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.proxyToKeyHandler = /**
         * @param {?} keyHandlerName
         * @param {?} e
         * @return {?}
         */
        function (keyHandlerName, e) {
            this.keypressHandlers[keyHandlerName].execute(e);
        };
        // key handler
        // key handler
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.topKeyPressed = 
        // key handler
        /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.proxyToKeyHandler('top', e);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.bottomKeyPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.proxyToKeyHandler('bottom', e);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.enterKeyPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.proxyToKeyHandler('enter', e);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.leftKeyPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.proxyToKeyHandler('left', e);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.rightKeyPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.proxyToKeyHandler('right', e);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.escapeKeyPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            // do nothing
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.onTabPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            this.increaseTab();
            this.saveCurrentState();
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.backSpaceKeyPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.isCaretAtStart()) {
                if (this.scope.tabs) {
                    this.decreaseTab();
                    this.saveCurrentState();
                }
                else {
                    if (this.scope.text.length) {
                        this.concatWithPreviousTextSupportingBrick(e);
                    }
                    else {
                        this.onDeleteAndFocusToPrevious(e);
                    }
                }
            }
        };
        // end key handlers
        // end key handlers
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.isCaretAtFirstLine = 
        // end key handlers
        /**
         * @return {?}
         */
        function () {
            return this.getCursorPositionInLine().isOnFirstLine;
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.isCaretAtLastLine = /**
         * @return {?}
         */
        function () {
            return this.getCursorPositionInLine().isOnLastLine;
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.getCaretLeftCoordinate = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var sel = window.getSelection();
            /** @type {?} */
            var leftRightText = this.getSplittedText(sel.focusOffset, sel.focusNode);
            return (new CursorLeftCoordinate(leftRightText.left, leftRightText.right, this.editor.nativeElement)).get();
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.getCursorPositionInLine = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var sel = window.getSelection();
            /** @type {?} */
            var leftRightText = this.getSplittedText(sel.focusOffset, sel.focusNode);
            return new CursorPositionInLine(leftRightText.left, leftRightText.right, this.editor.nativeElement);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.concatWithPreviousTextSupportingBrick = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            var _this = this;
            /** @type {?} */
            var previousTextBrickId = this.wallModel.api.core.getPreviousTextBrickId(this.id);
            if (previousTextBrickId) {
                e.preventDefault();
                /** @type {?} */
                var previousBrickSnapshot = this.wallModel.api.core.getBrickSnapshot(previousTextBrickId);
                this.wallModel.api.core.updateBrickState(previousTextBrickId, {
                    text: this.cleanUpText(previousBrickSnapshot.state.text) + this.scope.text
                });
                // wait for component re-rendering
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var focusContext = {
                        initiator: FOCUS_INITIATOR,
                        details: {
                            concatText: true,
                            concatenationText: _this.scope.text
                        }
                    };
                    _this.wallUiApi.focusOnBrickId(previousTextBrickId, focusContext);
                    // remove only after focus will be established
                    // that prevents flickering on mobile
                    _this.wallUiApi.removeBrick(_this.id);
                }));
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.concatWithNextTextSupportingBrick = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            var _this = this;
            /** @type {?} */
            var nextTextBrickId = this.wallModel.api.core.getNextTextBrickId(this.id);
            if (nextTextBrickId) {
                e.preventDefault();
                /** @type {?} */
                var nextTextBrickSnapshot = this.wallModel.api.core.getBrickSnapshot(nextTextBrickId);
                /** @type {?} */
                var concatenationText_1 = nextTextBrickSnapshot.state.text || '';
                this.setTextState(this.scope.text + concatenationText_1);
                this.saveCurrentState();
                this.wallModel.api.core.removeBrick(nextTextBrickId);
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.placeCaretBaseOnConcatenatedText(concatenationText_1);
                }), 10);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.onDeleteAndFocusToPrevious = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            /** @type {?} */
            var previousTextBrickId = this.wallModel.api.core.getPreviousTextBrickId(this.id);
            this.wallUiApi.removeBrick(this.id);
            if (previousTextBrickId) {
                /** @type {?} */
                var focusContext = {
                    initiator: FOCUS_INITIATOR,
                    details: {
                        deletePreviousText: true
                    }
                };
                this.wallUiApi.focusOnBrickId(previousTextBrickId, focusContext);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.onDeleteAndFocusToNext = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            /** @type {?} */
            var nextTextBrickId = this.wallModel.api.core.getNextTextBrickId(this.id);
            if (nextTextBrickId) {
                this.wallUiApi.removeBrick(this.id);
                /** @type {?} */
                var focusContext = {
                    initiator: FOCUS_INITIATOR,
                    details: {
                        deletePreviousText: true
                    }
                };
                this.wallUiApi.focusOnBrickId(nextTextBrickId, focusContext);
            }
        };
        /**
         * @param {?} offset
         * @param {?} target
         * @return {?}
         */
        BaseTextBrickComponent.prototype.getSplittedText = /**
         * @param {?} offset
         * @param {?} target
         * @return {?}
         */
        function (offset, target) {
            return {
                left: this.scope.text.slice(0, offset),
                right: this.scope.text.slice(offset) || ''
            };
        };
        // key handler end
        // key handler end
        /**
         * @param {?=} context
         * @return {?}
         */
        BaseTextBrickComponent.prototype.onWallFocus = 
        // key handler end
        /**
         * @param {?=} context
         * @return {?}
         */
        function (context) {
            if (this.editor.nativeElement !== document.activeElement) {
                // focus by API call
                this.editor.nativeElement.focus();
                if (context && context.initiator === FOCUS_INITIATOR) {
                    if (context.details.deletePreviousText) {
                        this.placeCaretAtEnd();
                    }
                    if (context.details.concatText) {
                        this.placeCaretBaseOnConcatenatedText(context.details.concatenationText);
                    }
                    if (context.details.leftKey) {
                        this.placeCaretAtEnd();
                    }
                    if (context.details.rightKey) {
                        this.placeCaretAtStart();
                    }
                    if (context.details.bottomKey || context.details.topKey) {
                        /** @type {?} */
                        var line = context.details.bottomKey ? LineType.first : LineType.last;
                        this.placeCaretAtLeftCoordinate(context.details.caretLeftCoordinate, line);
                    }
                }
            }
        };
        /**
         * @param {?=} text
         * @return {?}
         */
        BaseTextBrickComponent.prototype.setTextState = /**
         * @param {?=} text
         * @return {?}
         */
        function (text) {
            if (text === void 0) { text = ''; }
            this.scope.text = this.cleanUpText(text);
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.increaseTab = /**
         * @return {?}
         */
        function () {
            if (this.scope.tabs < this.maxTabNumber) {
                this.scope.tabs++;
            }
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.decreaseTab = /**
         * @return {?}
         */
        function () {
            if (this.scope.tabs > 0) {
                this.scope.tabs--;
            }
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.saveCurrentState = /**
         * @return {?}
         */
        function () {
            this.stateChanges.emit(this.scope);
        };
        // caret helpers
        // caret helpers
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.isTextSelected = 
        // caret helpers
        /**
         * @return {?}
         */
        function () {
            return !window.getSelection().isCollapsed;
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.placeCaretAtStart = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var deepLeftNode = new DeepLeftNodeChild(this.editor.nativeElement);
            this.placeCaretAtNodeStart(deepLeftNode.child);
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.placeCaretAtEnd = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var rightNode = new DeepRightNodeChild(this.editor.nativeElement);
            this.placeCaretAtNodeEnd(rightNode.child);
        };
        /**
         * @param {?} el
         * @return {?}
         */
        BaseTextBrickComponent.prototype.placeCaretAtNodeStart = /**
         * @param {?} el
         * @return {?}
         */
        function (el) {
            this.placeCaretAtNodeToPosition(el, 0);
        };
        /**
         * @param {?} el
         * @return {?}
         */
        BaseTextBrickComponent.prototype.placeCaretAtNodeEnd = /**
         * @param {?} el
         * @return {?}
         */
        function (el) {
            this.placeCaretAtNodeToPosition(el, el.textContent.length);
        };
        /**
         * @param {?} el
         * @param {?} position
         * @return {?}
         */
        BaseTextBrickComponent.prototype.placeCaretAtNodeToPosition = /**
         * @param {?} el
         * @param {?} position
         * @return {?}
         */
        function (el, position) {
            (new PlaceCaretToPosition(el, position)).place();
        };
        // find the node which contains concatenated text and position in this node where cursor should be placed
        // find the node which contains concatenated text and position in this node where cursor should be placed
        /**
         * @param {?} concatenationText
         * @return {?}
         */
        BaseTextBrickComponent.prototype.placeCaretBaseOnConcatenatedText = 
        // find the node which contains concatenated text and position in this node where cursor should be placed
        /**
         * @param {?} concatenationText
         * @return {?}
         */
        function (concatenationText) {
            if (concatenationText !== '') {
                // find first level nodes for the text that was concatenated
                /** @type {?} */
                var subStringNodes = new FirstSubStringNode(this.editor.nativeElement, concatenationText);
                // first level node which contains concatenated text
                /** @type {?} */
                var firstLevelSubStringNode = subStringNodes.firstLevelSubStringNodes[0];
                if (firstLevelSubStringNode) {
                    /** @type {?} */
                    var focusNode = void 0;
                    /** @type {?} */
                    var position = void 0;
                    if (firstLevelSubStringNode.nodeType === Node.TEXT_NODE) {
                        // if first concatenated node is TEXT_NODE it might
                        // be automatically concatenated with previous existing TEXT_NODE
                        focusNode = firstLevelSubStringNode;
                        // find text content for first concatenated TEXT_NODE
                        /** @type {?} */
                        var p = document.createElement('P');
                        p.innerHTML = concatenationText;
                        /** @type {?} */
                        var firstLevelSubStringTextContent = p.childNodes[0].textContent;
                        // finally find cursor position
                        position = focusNode.textContent.length - firstLevelSubStringTextContent.length;
                    }
                    else {
                        focusNode = new DeepLeftNodeChild(firstLevelSubStringNode).child;
                        position = 0;
                    }
                    this.placeCaretAtNodeToPosition(focusNode, position);
                }
            }
        };
        /**
         * @param {?} leftCoordinate
         * @param {?} line
         * @return {?}
         */
        BaseTextBrickComponent.prototype.placeCaretAtLeftCoordinate = /**
         * @param {?} leftCoordinate
         * @param {?} line
         * @return {?}
         */
        function (leftCoordinate, line) {
            // todo: find the way to set caret based on coordinate number
            if (line === LineType.last) {
                this.placeCaretAtEnd();
            }
            else {
                this.placeCaretAtStart();
            }
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.isCaretAtStart = /**
         * @return {?}
         */
        function () {
            return (new CaretStartEndPosition(this.editor.nativeElement)).isCaretAtStart();
        };
        /**
         * @return {?}
         */
        BaseTextBrickComponent.prototype.isCaretAtEnd = /**
         * @return {?}
         */
        function () {
            return (new CaretStartEndPosition(this.editor.nativeElement)).isCaretAtEnd();
        };
        // remove all unnecessary tags
        // remove all unnecessary tags
        /**
         * @param {?} text
         * @return {?}
         */
        BaseTextBrickComponent.prototype.cleanUpText = 
        // remove all unnecessary tags
        /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            return (new StringWithoutEmptyNodes(text)).get();
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        BaseTextBrickComponent.prototype.noMetaKeyIsPressed = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            return !((e.shiftKey || e.altKey || e.ctrlKey || e.metaKey));
        };
        BaseTextBrickComponent.propDecorators = {
            id: [{ type: core.Input }],
            state: [{ type: core.Input }],
            wallModel: [{ type: core.Input }],
            stateChanges: [{ type: core.Output }],
            editor: [{ type: core.ViewChild, args: ['editor',] }]
        };
        return BaseTextBrickComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HeaderBrickComponent = /** @class */ (function (_super) {
        __extends(HeaderBrickComponent, _super);
        function HeaderBrickComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.placeholder = 'Header';
            return _this;
        }
        HeaderBrickComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'header-brick',
                        template: "<div #editor\n     attr.placeholder=\"{{placeholder}}\"\n     (input)=\"onTextChange()\"\n     [(ngModel)]=\"scope.text\"\n     [ngClass]=\"'header-brick-tabs-' + scope.tabs\"\n     (keydown)=\"onKeyPress($event)\"\n     class=\"text-brick__editor\"\n     contenteditable>\n</div>\n",
                        styles: ["div{display:block}div[contenteditable]{letter-spacing:-.002em;word-break:break-all;padding:6px 2px;margin:8px 0 0}div[contenteditable]:focus{outline:0}div[contenteditable]:empty:before{content:attr(placeholder)}div.header-brick-tabs-1{margin-left:1.5rem}div.header-brick-tabs-2{margin-left:3rem}div.header-brick-tabs-3{margin-left:4.5rem}"]
                    }] }
        ];
        return HeaderBrickComponent;
    }(BaseTextBrickComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContenteditableDirective = /** @class */ (function () {
        function ContenteditableDirective(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.propValueAccessor = 'textContent';
        }
        /**
         * @return {?}
         */
        ContenteditableDirective.prototype.callOnChange = /**
         * @return {?}
         */
        function () {
            if (typeof this.onChange === 'function') {
                this.onChange(this.elementRef.nativeElement[this.propValueAccessor]);
            }
        };
        /**
         * @return {?}
         */
        ContenteditableDirective.prototype.callOnTouched = /**
         * @return {?}
         */
        function () {
            if (typeof this.onTouched === 'function') {
                this.onTouched();
            }
        };
        /**
         * Writes a new value to the element.
         * This method will be called by the forms API to write
         * to the view when programmatic (model -> view) changes are requested.
         *
         * See: [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor#members)
         */
        /**
         * Writes a new value to the element.
         * This method will be called by the forms API to write
         * to the view when programmatic (model -> view) changes are requested.
         *
         * See: [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor#members)
         * @param {?} value
         * @return {?}
         */
        ContenteditableDirective.prototype.writeValue = /**
         * Writes a new value to the element.
         * This method will be called by the forms API to write
         * to the view when programmatic (model -> view) changes are requested.
         *
         * See: [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor#members)
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // todo add type
            /** @type {?} */
            var normalizedValue = value === null ? '' : value;
            this.renderer.setProperty(this.elementRef.nativeElement, this.propValueAccessor, normalizedValue);
        };
        /**
         * Registers a callback function that should be called when
         * the control's value changes in the UI.
         *
         * This is called by the forms API on initialization so it can update
         * the form model when values propagate from the view (view -> model).
         */
        /**
         * Registers a callback function that should be called when
         * the control's value changes in the UI.
         *
         * This is called by the forms API on initialization so it can update
         * the form model when values propagate from the view (view -> model).
         * @param {?} fn
         * @return {?}
         */
        ContenteditableDirective.prototype.registerOnChange = /**
         * Registers a callback function that should be called when
         * the control's value changes in the UI.
         *
         * This is called by the forms API on initialization so it can update
         * the form model when values propagate from the view (view -> model).
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onChange = fn;
        };
        /**
         * Registers a callback function that should be called when the control receives a blur event.
         * This is called by the forms API on initialization so it can update the form model on blur.
         */
        /**
         * Registers a callback function that should be called when the control receives a blur event.
         * This is called by the forms API on initialization so it can update the form model on blur.
         * @param {?} fn
         * @return {?}
         */
        ContenteditableDirective.prototype.registerOnTouched = /**
         * Registers a callback function that should be called when the control receives a blur event.
         * This is called by the forms API on initialization so it can update the form model on blur.
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * This function is called by the forms API when the control status changes to or from "DISABLED".
         * Depending on the value, it should enable or disable the appropriate DOM element.
         */
        /**
         * This function is called by the forms API when the control status changes to or from "DISABLED".
         * Depending on the value, it should enable or disable the appropriate DOM element.
         * @param {?} isDisabled
         * @return {?}
         */
        ContenteditableDirective.prototype.setDisabledState = /**
         * This function is called by the forms API when the control status changes to or from "DISABLED".
         * Depending on the value, it should enable or disable the appropriate DOM element.
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            if (isDisabled) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'true');
                this.removeDisabledState = this.renderer
                    .listen(this.elementRef.nativeElement, 'keydown', this.listenerDisabledState);
            }
            else {
                if (this.removeDisabledState) {
                    this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
                    this.removeDisabledState();
                }
            }
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        ContenteditableDirective.prototype.listenerDisabledState = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
        };
        ContenteditableDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[contenteditable]',
                        providers: [
                            { provide: forms.NG_VALUE_ACCESSOR, useExisting: ContenteditableDirective, multi: true }
                        ]
                    },] }
        ];
        /** @nocollapse */
        ContenteditableDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        ContenteditableDirective.propDecorators = {
            propValueAccessor: [{ type: core.Input }],
            callOnChange: [{ type: core.HostListener, args: ['input',] }],
            callOnTouched: [{ type: core.HostListener, args: ['blur',] }]
        };
        return ContenteditableDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContenteditableModule = /** @class */ (function () {
        function ContenteditableModule() {
        }
        ContenteditableModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [forms.FormsModule],
                        exports: [ContenteditableDirective],
                        declarations: [ContenteditableDirective]
                    },] }
        ];
        return ContenteditableModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HeaderBrickModule = /** @class */ (function () {
        function HeaderBrickModule(brickRegistry) {
            this.brickRegistry = brickRegistry;
            this.brickRegistry.register({
                tag: 'header',
                component: HeaderBrickComponent,
                supportText: true,
                textRepresentation: TextRepresentation,
                name: 'Header',
                description: 'A large header with margins'
            });
        }
        HeaderBrickModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            common.CommonModule,
                            ContenteditableModule
                        ],
                        exports: [HeaderBrickComponent],
                        declarations: [HeaderBrickComponent],
                        entryComponents: [HeaderBrickComponent]
                    },] }
        ];
        /** @nocollapse */
        HeaderBrickModule.ctorParameters = function () { return [
            { type: BrickRegistry }
        ]; };
        return HeaderBrickModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var WALL_FILE_UPLOADER = new core.InjectionToken('IWallFileUploader');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InputContextComponent = /** @class */ (function () {
        function InputContextComponent(ngxStickyModalRef) {
            this.ngxStickyModalRef = ngxStickyModalRef;
        }
        /**
         * @return {?}
         */
        InputContextComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.srcInput.nativeElement.focus();
            }), 10);
        };
        /**
         * @return {?}
         */
        InputContextComponent.prototype.applyImageSrc = /**
         * @return {?}
         */
        function () {
            this.notify({
                src: this.srcInput.nativeElement.value
            });
        };
        /**
         * @param {?} event
         * @return {?}
         */
        InputContextComponent.prototype.onFileChange = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.notify({
                file: event.target.files[0]
            });
        };
        /**
         * @param {?} data
         * @return {?}
         */
        InputContextComponent.prototype.notify = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this.ngxStickyModalRef.close(data);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        InputContextComponent.prototype.onSubmit = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            this.applyImageSrc();
        };
        /**
         * @return {?}
         */
        InputContextComponent.prototype.close = /**
         * @return {?}
         */
        function () {
            this.ngxStickyModalRef.dismiss();
        };
        InputContextComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<div class=\"w-context-panel w-brick-input mat-elevation-z4\">\n    <div class=\"w-brick-input__body\">\n        <a class=\"w-context-panel-close\" (click)=\"close()\">x</a>\n\n        <form (submit)=\"onSubmit($event)\">\n            <mat-form-field>\n                <input #src matInput placeholder=\"Paste the image link\">\n            </mat-form-field>\n\n            <button mat-flat-button color=\"primary\" (click)=\"applyImageSrc()\" type=\"button\">\n                Add image\n            </button>\n        </form>\n\n        <p class=\"w-brick-input__description mb-2\">\n            Add link or upload image\n        </p>\n\n        <input accept=\"image/*\" (change)=\"onFileChange($event)\" type=\"file\">\n    </div>\n</div>\n",
                        styles: ["button,mat-form-field{width:100%}:host .w-context-panel{position:relative}:host .w-context-panel-close{position:absolute;top:10px;right:10px;color:#333;text-decoration:none;cursor:pointer}"]
                    }] }
        ];
        /** @nocollapse */
        InputContextComponent.ctorParameters = function () { return [
            { type: ngxStickyModal.StickyModalRef }
        ]; };
        InputContextComponent.propDecorators = {
            srcInput: [{ type: core.ViewChild, args: ['src',] }]
        };
        return InputContextComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} el
     * @param {?} resolver
     * @param {?} component
     * @return {?}
     */
    function getModalConfig(el, resolver, component) {
        /** @type {?} */
        var elementBoundingRect = el.nativeElement.getBoundingClientRect();
        /** @type {?} */
        var elementHeight = el.nativeElement.offsetHeight;
        console.log('Getting modal config for:', el);
        console.log(el.nativeElement);
        console.log('BoundingRect:', elementBoundingRect);
        console.log('Height:', elementHeight);
        return {
            component: component,
            positionStrategy: {
                name: ngxStickyModal.StickyPositionStrategy.coordinate,
                options: {
                    clientX: elementBoundingRect.x,
                    clientY: elementBoundingRect.y + elementHeight + window.scrollY
                }
            },
            componentFactoryResolver: resolver,
            closeOnEscape: true
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ImgBrickComponent = /** @class */ (function () {
        function ImgBrickComponent(renderer, componentFactoryResolver, ngxStickyModalService, wallFileUploader, el) {
            this.renderer = renderer;
            this.componentFactoryResolver = componentFactoryResolver;
            this.ngxStickyModalService = ngxStickyModalService;
            this.wallFileUploader = wallFileUploader;
            this.el = el;
            this.stateChanges = new core.EventEmitter();
            this.scope = {
                src: '',
                metadata: null,
                width: null
            };
            this.isSrcBase64 = false;
            this.resizable = {
                resize: this.onResize.bind(this),
                resizeStart: this.onResizeStart.bind(this),
                resizeEnd: this.onResizeEnd.bind(this)
            };
        }
        /**
         * @return {?}
         */
        ImgBrickComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            Object.assign(this.scope, this.state);
            this.processNewState();
        };
        /**
         * @param {?} newState
         * @return {?}
         */
        ImgBrickComponent.prototype.onWallStateChange = /**
         * @param {?} newState
         * @return {?}
         */
        function (newState) {
            if (newState && newState.src !== this.scope.src) {
                Object.assign(this.scope, this.state);
                this.processNewState();
            }
        };
        /**
         * @return {?}
         */
        ImgBrickComponent.prototype.processNewState = /**
         * @return {?}
         */
        function () {
            if (this.scope.src) {
                this.isSrcBase64 = this.isBase64(this.scope.src);
                if (!this.scope.width) {
                    this.setUpImageWidth();
                }
                if (this.isSrcBase64) {
                    this.processBase64ImgSrc();
                }
            }
        };
        /**
         * @return {?}
         */
        ImgBrickComponent.prototype.onWallFocus = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.scope.src) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.showPanel();
                }), 0);
            }
        };
        // resize callbacks
        // resize callbacks
        /**
         * @param {?} resizeData
         * @return {?}
         */
        ImgBrickComponent.prototype.onResize = 
        // resize callbacks
        /**
         * @param {?} resizeData
         * @return {?}
         */
        function (resizeData) {
            this.scope.width = this.lastWidth + resizeData.offset;
        };
        /**
         * @return {?}
         */
        ImgBrickComponent.prototype.onResizeStart = /**
         * @return {?}
         */
        function () {
            this.lastWidth = this.scope.width;
        };
        /**
         * @return {?}
         */
        ImgBrickComponent.prototype.onResizeEnd = /**
         * @return {?}
         */
        function () {
            this.save();
        };
        /**
         * @param {?} imageSrc
         * @param {?=} metadata
         * @return {?}
         */
        ImgBrickComponent.prototype.applyImageSrc = /**
         * @param {?} imageSrc
         * @param {?=} metadata
         * @return {?}
         */
        function (imageSrc, metadata) {
            var _this = this;
            return this.isImage(imageSrc)
                .then((/**
             * @return {?}
             */
            function () {
                _this.scope.src = imageSrc;
                _this.isSrcBase64 = false;
                if (metadata) {
                    _this.scope.metadata = metadata;
                }
                _this.save();
                return _this.setUpImageWidth();
            }))
                .catch((/**
             * @return {?}
             */
            function () {
                alert('Please enter valid url');
            }));
        };
        /**
         * @param {?} imgFile
         * @return {?}
         */
        ImgBrickComponent.prototype.applyImageFile = /**
         * @param {?} imgFile
         * @return {?}
         */
        function (imgFile) {
            var _this = this;
            return (new ImgEncoder(imgFile)).getBase64Representation().then((/**
             * @param {?} imgBase64
             * @return {?}
             */
            function (imgBase64) {
                return _this.applyImageSrc(imgBase64).then((/**
                 * @return {?}
                 */
                function () {
                    return _this.processBase64ImgSrc();
                }));
            }));
        };
        /**
         * @return {?}
         */
        ImgBrickComponent.prototype.processBase64ImgSrc = /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.uploadImage().then((/**
             * @param {?} uploadInfo
             * @return {?}
             */
            function (uploadInfo) {
                return _this.applyImageSrc(uploadInfo.downloadURL, {
                    path: uploadInfo.path
                });
            }), (/**
             * @return {?}
             */
            function () {
            }));
        };
        /**
         * @return {?}
         */
        ImgBrickComponent.prototype.showPanel = /**
         * @return {?}
         */
        function () {
            return __awaiter(this, void 0, void 0, function () {
                var modalConfig;
                var _this = this;
                return __generator(this, function (_a) {
                    if (!this.imageSrcPlaceholderRef) {
                        modalConfig = getModalConfig(this.el, this.componentFactoryResolver, InputContextComponent);
                        this.imageSrcPlaceholderRef = this.ngxStickyModalService.open(modalConfig);
                        this.imageSrcPlaceholderRef.result.then((/**
                         * @param {?} result
                         * @return {?}
                         */
                        function (result) {
                            _this.imageSrcPlaceholderRef = null;
                            if (result.src) {
                                _this.applyImageSrc(result.src);
                            }
                            else {
                                _this.applyImageFile(result.file);
                            }
                        }), (/**
                         * @return {?}
                         */
                        function () {
                            _this.imageSrcPlaceholderRef = null;
                        }));
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * @param {?} str
         * @return {?}
         */
        ImgBrickComponent.prototype.isBase64 = /**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            str = str.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
            try {
                return btoa(atob(str)) === str;
            }
            catch (err) {
                return false;
            }
        };
        /**
         * @private
         * @return {?}
         */
        ImgBrickComponent.prototype.uploadImage = /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.wallFileUploader.canUploadFile()) {
                return Promise.reject();
            }
            /** @type {?} */
            var fileName = (new Guid()).get();
            /** @type {?} */
            var imgFile = (new Base64ToFile(this.scope.src, fileName)).getFile();
            return this.wallFileUploader.upload(this.id, imgFile);
        };
        /**
         * @private
         * @return {?}
         */
        ImgBrickComponent.prototype.setUpImageWidth = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return this.loadImage(this.scope.src).then((/**
             * @return {?}
             */
            function () {
                _this.scope.width = _this.image.nativeElement.width;
                _this.save();
            }));
        };
        /**
         * @private
         * @return {?}
         */
        ImgBrickComponent.prototype.save = /**
         * @private
         * @return {?}
         */
        function () {
            this.stateChanges.emit(this.scope);
        };
        /**
         * @private
         * @param {?} src
         * @return {?}
         */
        ImgBrickComponent.prototype.loadImage = /**
         * @private
         * @param {?} src
         * @return {?}
         */
        function (src) {
            return this.isImage(src);
        };
        /**
         * @private
         * @param {?} src
         * @return {?}
         */
        ImgBrickComponent.prototype.isImage = /**
         * @private
         * @param {?} src
         * @return {?}
         */
        function (src) {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                /** @type {?} */
                var img = new Image();
                img.onload = (/**
                 * @return {?}
                 */
                function () {
                    resolve();
                });
                img.onerror = (/**
                 * @return {?}
                 */
                function () {
                    reject();
                });
                img.src = src;
            }));
        };
        ImgBrickComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'img-brick',
                        template: "<div class=\"container\" [style.width]=\"scope.width ? scope.width+'px' : 'auto'\">\n    <img [tow-slave]=\"id\" #image *ngIf=\"scope.src\" [wResizable]=\"resizable\" [src]=\"scope.src\">\n\n    <a mat-button *ngIf=\"!isSrcBase64 && scope.src\" [href]=\"scope.src\" target=\"_blank\" class=\"original-btn\">\n        Show original\n    </a>\n</div>\n\n<w-brick-input-placeholder\n    *ngIf=\"!scope.src\"\n    [text]=\"'Add an Image'\"\n    [icon]=\"'image'\" (selected)=\"showPanel()\">\n</w-brick-input-placeholder>\n",
                        styles: [":host{position:relative;display:block}:host:hover .original-btn{display:block}.original-btn{position:absolute;top:15px;right:15px;display:none}.container{margin:0 auto;position:relative;max-width:100%}.container .left-handler,.container .right-handler{position:absolute;display:block;width:40px;height:100%;top:0;cursor:col-resize}.container .left-handler{left:0}.container .right-handler{right:0}.container img{-o-object-fit:cover;object-fit:cover;width:100%;height:100%;margin:0 auto;display:block;cursor:pointer}"]
                    }] }
        ];
        /** @nocollapse */
        ImgBrickComponent.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.ComponentFactoryResolver },
            { type: ngxStickyModal.StickyModalService },
            { type: undefined, decorators: [{ type: core.Inject, args: [WALL_FILE_UPLOADER,] }] },
            { type: core.ElementRef }
        ]; };
        ImgBrickComponent.propDecorators = {
            id: [{ type: core.Input }],
            state: [{ type: core.Input }],
            stateChanges: [{ type: core.Output }],
            image: [{ type: core.ViewChild, args: ['image',] }]
        };
        return ImgBrickComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ImgModel = /** @class */ (function () {
        function ImgModel(wallFileUploader) {
            this.wallFileUploader = wallFileUploader;
        }
        /**
         * @param {?} brickSnapshot
         * @return {?}
         */
        ImgModel.prototype.remove = /**
         * @param {?} brickSnapshot
         * @return {?}
         */
        function (brickSnapshot) {
            /** @type {?} */
            var state = brickSnapshot.state;
            if (state.src && state.metadata && state.metadata.path) {
                return this.wallFileUploader.remove(state.metadata.path);
            }
            return Promise.resolve();
        };
        ImgModel.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ImgModel.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [WALL_FILE_UPLOADER,] }] }
        ]; };
        return ImgModel;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ImgBrickTextRepresentation = /** @class */ (function () {
        function ImgBrickTextRepresentation(brickSnapshot) {
            this.brickSnapshot = brickSnapshot;
        }
        /**
         * @return {?}
         */
        ImgBrickTextRepresentation.prototype.getText = /**
         * @return {?}
         */
        function () {
            return "img!" + ((/** @type {?} */ (this.brickSnapshot.state))).src;
        };
        return ImgBrickTextRepresentation;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ResizableHandlerComponent = /** @class */ (function () {
        function ResizableHandlerComponent() {
            this.mouseDownEvent = new core.EventEmitter();
        }
        /**
         * @param {?} event
         * @return {?}
         */
        ResizableHandlerComponent.prototype.mouseDown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.mouseDownEvent.emit(event);
        };
        ResizableHandlerComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<span [ngClass]=\"customClassName\"></span>"
                    }] }
        ];
        ResizableHandlerComponent.propDecorators = {
            customClassName: [{ type: core.Input }],
            mouseDownEvent: [{ type: core.Output }],
            mouseDown: [{ type: core.HostListener, args: ['mousedown', ['$event'],] }]
        };
        return ResizableHandlerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var LEFT_HANDLER_CLASS = 'left-handler';
    /** @type {?} */
    var RIGHT_HANDLER_CLASS = 'right-handler';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * \@description
     * 1. dynamically add left and right handlers
     * 2. allow to show/hide handlers
     * 3. call callback, where to pass
     *  - distance on which handlers is moved
     *  - handler type (left of right)
     */
    var ResizableDirective = /** @class */ (function () {
        function ResizableDirective(el, zone, cfr, doc) {
            this.el = el;
            this.zone = zone;
            this.cfr = cfr;
            this.doc = doc;
            this.resizeData = null;
        }
        /**
         * @return {?}
         */
        ResizableDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var leftHandler = this.createHandler(LEFT_HANDLER_CLASS);
            /** @type {?} */
            var rightHandler = this.createHandler(RIGHT_HANDLER_CLASS);
            leftHandler.instance.mouseDownEvent.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.mouseDownHandler(e, true);
            }));
            rightHandler.instance.mouseDownEvent.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.mouseDownHandler(e, false);
            }));
            this.doc.addEventListener('mousemove', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (_this.resizeData) {
                    _this.resizeData.xCurrent = event.clientX;
                    if (_this.resizeData.isLeftDirection) {
                        _this.resizeData.offset = _this.resizeData.xInitial - _this.resizeData.xCurrent;
                    }
                    else if (_this.resizeData.isRightDirection) {
                        _this.resizeData.offset = _this.resizeData.xCurrent - _this.resizeData.xInitial;
                    }
                    if (_this.wResizable.resize) {
                        _this.wResizable.resize(_this.resizeData);
                    }
                }
            }));
            this.doc.addEventListener('mouseup', (/**
             * @return {?}
             */
            function () {
                if (_this.wResizable.resizeEnd) {
                    _this.wResizable.resizeEnd(_this.resizeData);
                }
                _this.resizeData = null;
            }));
        };
        /**
         * @private
         * @param {?} customClassName
         * @return {?}
         */
        ResizableDirective.prototype.createHandler = /**
         * @private
         * @param {?} customClassName
         * @return {?}
         */
        function (customClassName) {
            /** @type {?} */
            var handler = this.el.createComponent(this.cfr.resolveComponentFactory(ResizableHandlerComponent));
            handler.instance.customClassName = customClassName;
            return handler;
        };
        /**
         * @private
         * @param {?} e
         * @param {?} isLeftDirection
         * @return {?}
         */
        ResizableDirective.prototype.mouseDownHandler = /**
         * @private
         * @param {?} e
         * @param {?} isLeftDirection
         * @return {?}
         */
        function (e, isLeftDirection) {
            e.preventDefault();
            e.stopPropagation();
            this.resizeData = {
                xInitial: e.clientX,
                xCurrent: e.clientX,
                offset: 0,
                isLeftDirection: isLeftDirection,
                isRightDirection: !isLeftDirection
            };
            if (this.wResizable.resizeStart) {
                this.wResizable.resizeStart(this.resizeData);
            }
        };
        ResizableDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[wResizable]'
                    },] }
        ];
        /** @nocollapse */
        ResizableDirective.ctorParameters = function () { return [
            { type: core.ViewContainerRef },
            { type: core.NgZone },
            { type: core.ComponentFactoryResolver },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        ResizableDirective.propDecorators = {
            wResizable: [{ type: core.Input }]
        };
        return ResizableDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ResizableModule = /** @class */ (function () {
        function ResizableModule() {
        }
        ResizableModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        exports: [ResizableDirective],
                        declarations: [ResizableDirective, ResizableHandlerComponent],
                        entryComponents: [ResizableHandlerComponent]
                    },] }
        ];
        return ResizableModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ImgBrickModule = /** @class */ (function () {
        function ImgBrickModule(brickRegistry, imgModel) {
            var _this = this;
            this.brickRegistry = brickRegistry;
            this.imgModel = imgModel;
            this.brickRegistry.register({
                tag: 'image',
                component: ImgBrickComponent,
                textRepresentation: ImgBrickTextRepresentation,
                destructor: (/**
                 * @param {?} brickSnapshot
                 * @return {?}
                 */
                function (brickSnapshot) {
                    return _this.imgModel.remove(brickSnapshot);
                }),
                getBrickResourcePaths: (/**
                 * @param {?} brickSnapshot
                 * @return {?}
                 */
                function (brickSnapshot) {
                    /** @type {?} */
                    var imageState = brickSnapshot.state;
                    if (imageState.metadata && imageState.metadata.path) {
                        return [imageState.metadata.path];
                    }
                    return [];
                }),
                name: 'Image',
                description: 'Embed with a link'
            });
        }
        ImgBrickModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            HelperComponentsModule,
                            ResizableModule,
                            TowModule,
                            ngxStickyModal.StickyModalModule,
                            material.MatButtonModule,
                            material.MatInputModule,
                            material.MatFormFieldModule
                        ],
                        exports: [ImgBrickComponent],
                        declarations: [ImgBrickComponent, InputContextComponent],
                        entryComponents: [ImgBrickComponent, InputContextComponent],
                        providers: [
                            ImgModel
                        ]
                    },] }
        ];
        /** @nocollapse */
        ImgBrickModule.ctorParameters = function () { return [
            { type: BrickRegistry },
            { type: ImgModel }
        ]; };
        return ImgBrickModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var QuoteBrickComponent = /** @class */ (function (_super) {
        __extends(QuoteBrickComponent, _super);
        function QuoteBrickComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.placeholder = 'Quote';
            return _this;
        }
        QuoteBrickComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'quote-brick',
                        template: "<div #editor\n     attr.placeholder=\"{{placeholder}}\"\n     (input)=\"onTextChange()\"\n     [(ngModel)]=\"scope.text\"\n     (keydown)=\"onKeyPress($event)\"\n     class=\"editor\"\n     contenteditable>\n</div>",
                        styles: ["[contenteditable]{max-width:100%;width:100%;padding-left:1.25em;padding-right:1.25em;font-size:21px}[contenteditable]:focus{outline:0}[contenteditable]:empty:before{content:attr(placeholder)}"]
                    }] }
        ];
        return QuoteBrickComponent;
    }(BaseTextBrickComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var QuoteBrickModule = /** @class */ (function () {
        function QuoteBrickModule(brickRegistry) {
            this.brickRegistry = brickRegistry;
            this.brickRegistry.register({
                tag: 'quote',
                component: QuoteBrickComponent,
                supportText: true,
                textRepresentation: TextRepresentation,
                name: 'Quote',
                description: 'Capture a quote'
            });
        }
        QuoteBrickModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            ContenteditableModule
                        ],
                        exports: [QuoteBrickComponent],
                        declarations: [QuoteBrickComponent],
                        entryComponents: [QuoteBrickComponent]
                    },] }
        ];
        /** @nocollapse */
        QuoteBrickModule.ctorParameters = function () { return [
            { type: BrickRegistry }
        ]; };
        return QuoteBrickModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InputContextComponent$1 = /** @class */ (function () {
        function InputContextComponent(ngxStickyModalRef) {
            this.ngxStickyModalRef = ngxStickyModalRef;
        }
        /**
         * @return {?}
         */
        InputContextComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.srcInput.nativeElement.focus();
            }), 10);
        };
        /**
         * @return {?}
         */
        InputContextComponent.prototype.applySrc = /**
         * @return {?}
         */
        function () {
            this.ngxStickyModalRef.close({
                src: this.srcInput.nativeElement.value
            });
        };
        /**
         * @param {?} e
         * @return {?}
         */
        InputContextComponent.prototype.onSubmit = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            this.applySrc();
        };
        /**
         * @return {?}
         */
        InputContextComponent.prototype.close = /**
         * @return {?}
         */
        function () {
            this.ngxStickyModalRef.dismiss();
        };
        InputContextComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<div class=\"w-context-panel w-brick-input mat-elevation-z4\">\n    <div class=\"w-brick-input__header\"></div>\n\n    <div class=\"w-brick-input__body\">\n        <a class=\"w-context-panel-close\" (click)=\"close()\">x</a>\n\n        <form (submit)=\"onSubmit($event)\">\n            <mat-form-field>\n                <input #src matInput placeholder=\"Paste the youtube video link\">\n            </mat-form-field>\n\n            <button mat-flat-button color=\"primary\" (click)=\"applySrc()\" type=\"button\">\n                Add video\n            </button>\n        </form>\n\n        <p class=\"w-brick-input__description\">\n            Youtube video\n        </p>\n    </div>\n\n    <div class=\"w-brick-input__footer\"></div>\n</div>\n",
                        styles: ["button,mat-form-field{width:100%}:host .w-context-panel{position:relative}:host .w-context-panel-close{position:absolute;top:10px;right:10px;color:#333;text-decoration:none;cursor:pointer}"]
                    }] }
        ];
        /** @nocollapse */
        InputContextComponent.ctorParameters = function () { return [
            { type: ngxStickyModal.StickyModalRef }
        ]; };
        InputContextComponent.propDecorators = {
            srcInput: [{ type: core.ViewChild, args: ['src',] }]
        };
        return InputContextComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var VideoBrickComponent = /** @class */ (function () {
        function VideoBrickComponent(renderer2, el, componentFactoryResolver, ngxStickyModalService) {
            this.renderer2 = renderer2;
            this.el = el;
            this.componentFactoryResolver = componentFactoryResolver;
            this.ngxStickyModalService = ngxStickyModalService;
            this.stateChanges = new core.EventEmitter();
            // ui
            this.uiStates = {
                initial: 'initial',
                video: 'video'
            };
            this.uiState = this.uiStates.initial;
            this.scope = {
                src: ''
            };
        }
        /**
         * @return {?}
         */
        VideoBrickComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.state && this.state.src !== this.scope.src) {
                this.scope.src = this.state.src;
                if (this.scope.src) {
                    this.uiState = this.uiStates.video;
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        _this.renderer2.setAttribute(_this.iframe.nativeElement, 'src', _this.scope.src);
                    }), 10);
                }
            }
        };
        /**
         * @param {?} newState
         * @return {?}
         */
        VideoBrickComponent.prototype.onWallStateChange = /**
         * @param {?} newState
         * @return {?}
         */
        function (newState) {
            var _this = this;
            if (newState && newState.src !== this.scope.src) {
                this.scope.src = newState.src;
                if (this.scope.src) {
                    this.uiState = this.uiStates.video;
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        _this.renderer2.setAttribute(_this.iframe.nativeElement, 'src', _this.scope.src);
                    }), 10);
                }
            }
        };
        /**
         * @return {?}
         */
        VideoBrickComponent.prototype.onWallFocus = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.uiState === this.uiStates.initial && !this.videoSrcPlaceholderRef) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.showVideoPanel();
                }), 0);
            }
        };
        /**
         * @param {?} src
         * @return {?}
         */
        VideoBrickComponent.prototype.applySrc = /**
         * @param {?} src
         * @return {?}
         */
        function (src) {
            this.uiState = this.uiStates.initial;
            if (src.length) {
                /** @type {?} */
                var srcArray = src.split('=');
                /** @type {?} */
                var youtubeId = srcArray[1];
                if (youtubeId) {
                    this.scope.src = "https://www.youtube.com/embed/" + youtubeId;
                    this.renderer2.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                    this.save();
                    this.uiState = this.uiStates.video;
                }
            }
        };
        /**
         * @return {?}
         */
        VideoBrickComponent.prototype.showVideoPanel = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var modalConfig = getModalConfig(this.el, this.componentFactoryResolver, InputContextComponent$1);
            this.videoSrcPlaceholderRef = this.ngxStickyModalService.open(modalConfig);
            this.videoSrcPlaceholderRef.result.then((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                _this.videoSrcPlaceholderRef = null;
                _this.applySrc(result.src);
            }), (/**
             * @return {?}
             */
            function () {
                _this.videoSrcPlaceholderRef = null;
            }));
        };
        /**
         * @private
         * @return {?}
         */
        VideoBrickComponent.prototype.save = /**
         * @private
         * @return {?}
         */
        function () {
            this.stateChanges.emit(this.scope);
        };
        VideoBrickComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'video-brick',
                        template: "<iframe height=\"400\" [hidden]=\"uiState !== uiStates.video\" #iframe frameborder=\"0\" allowfullscreen></iframe>\n\n<w-brick-input-placeholder\n    [text]=\"'Add a Video'\"\n    [icon]=\"'music_video'\"\n    [hidden]=\"uiState === uiStates.video\" (selected)=\"showVideoPanel()\">\n</w-brick-input-placeholder>\n",
                        styles: [":host{position:relative;display:block}:host iframe{width:100%}"]
                    }] }
        ];
        /** @nocollapse */
        VideoBrickComponent.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.ElementRef },
            { type: core.ComponentFactoryResolver },
            { type: ngxStickyModal.StickyModalService }
        ]; };
        VideoBrickComponent.propDecorators = {
            id: [{ type: core.Input }],
            state: [{ type: core.Input }],
            stateChanges: [{ type: core.Output }],
            iframe: [{ type: core.ViewChild, args: ['iframe',] }]
        };
        return VideoBrickComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var VideoBrickTextRepresentationClass = /** @class */ (function () {
        function VideoBrickTextRepresentationClass(brickSnapshot) {
            this.brickSnapshot = brickSnapshot;
        }
        /**
         * @return {?}
         */
        VideoBrickTextRepresentationClass.prototype.getText = /**
         * @return {?}
         */
        function () {
            return "video!" + ((/** @type {?} */ (this.brickSnapshot.state))).src;
        };
        return VideoBrickTextRepresentationClass;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var VideoBrickModule = /** @class */ (function () {
        function VideoBrickModule(brickRegistry) {
            this.brickRegistry = brickRegistry;
            this.brickRegistry.register({
                tag: 'video',
                component: VideoBrickComponent,
                textRepresentation: VideoBrickTextRepresentationClass,
                name: 'Video',
                description: 'Embed from Youtube and more'
            });
        }
        VideoBrickModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            ngxStickyModal.StickyModalModule,
                            HelperComponentsModule,
                            material.MatButtonModule,
                            material.MatInputModule,
                            material.MatFormFieldModule
                        ],
                        exports: [VideoBrickComponent],
                        declarations: [VideoBrickComponent, InputContextComponent$1],
                        entryComponents: [VideoBrickComponent, InputContextComponent$1]
                    },] }
        ];
        /** @nocollapse */
        VideoBrickModule.ctorParameters = function () { return [
            { type: BrickRegistry }
        ]; };
        return VideoBrickModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InputContextComponent$2 = /** @class */ (function () {
        function InputContextComponent(ngxStickyModalRef) {
            this.ngxStickyModalRef = ngxStickyModalRef;
        }
        /**
         * @return {?}
         */
        InputContextComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.srcInput.nativeElement.focus();
            }), 10);
        };
        /**
         * @return {?}
         */
        InputContextComponent.prototype.applySrc = /**
         * @return {?}
         */
        function () {
            this.ngxStickyModalRef.close({
                src: this.srcInput.nativeElement.value
            });
        };
        /**
         * @param {?} e
         * @return {?}
         */
        InputContextComponent.prototype.onSubmit = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            this.applySrc();
        };
        /**
         * @return {?}
         */
        InputContextComponent.prototype.close = /**
         * @return {?}
         */
        function () {
            this.ngxStickyModalRef.dismiss();
        };
        InputContextComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<div class=\"w-context-panel w-brick-input mat-elevation-z4\">\n    <div class=\"w-brick-input__body\">\n        <a class=\"w-context-panel-close\" (click)=\"close()\">x</a>\n\n        <form (submit)=\"onSubmit($event)\">\n            <mat-form-field>\n                <input #src matInput placeholder=\"Paste in https://...\">\n            </mat-form-field>\n\n            <button mat-flat-button color=\"primary\" (click)=\"applySrc()\" type=\"button\">\n                Create Bookmark\n            </button>\n        </form>\n\n        <p class=\"w-brick-input__description\">\n            Create a visual bookmark from a link...\n        </p>\n    </div>\n</div>\n",
                        styles: ["button,mat-form-field{width:100%}:host .w-context-panel{position:relative}:host .w-context-panel-close{position:absolute;top:10px;right:10px;color:#333;text-decoration:none;cursor:pointer}"]
                    }] }
        ];
        /** @nocollapse */
        InputContextComponent.ctorParameters = function () { return [
            { type: ngxStickyModal.StickyModalRef }
        ]; };
        InputContextComponent.propDecorators = {
            srcInput: [{ type: core.ViewChild, args: ['src',] }]
        };
        return InputContextComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WebBookmarkBrickComponent = /** @class */ (function () {
        function WebBookmarkBrickComponent(el, componentFactoryResolver, ngxStickyModalService) {
            this.el = el;
            this.componentFactoryResolver = componentFactoryResolver;
            this.ngxStickyModalService = ngxStickyModalService;
            this.stateChanges = new core.EventEmitter();
            this.scope = {
                src: null,
                description: null,
                image: {
                    height: null,
                    width: null,
                    url: null
                },
                logo: {
                    height: null,
                    width: null,
                    url: null
                },
                title: null,
                author: null
            };
            this.loading = false;
        }
        /**
         * @return {?}
         */
        WebBookmarkBrickComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            Object.assign(this.scope, this.state);
        };
        /**
         * @param {?} newState
         * @return {?}
         */
        WebBookmarkBrickComponent.prototype.onWallStateChange = /**
         * @param {?} newState
         * @return {?}
         */
        function (newState) {
            if (newState && newState.src !== this.scope.src) {
                Object.assign(this.scope, this.state);
            }
        };
        /**
         * @param {?} src
         * @return {?}
         */
        WebBookmarkBrickComponent.prototype.applySrc = /**
         * @param {?} src
         * @return {?}
         */
        function (src) {
            var _this = this;
            if (src.length) {
                if (this.isValidUrl(src)) {
                    this.loading = true;
                    this.getWebPageMetaInfo(src).then((/**
                     * @param {?} webPageMetaInfo
                     * @return {?}
                     */
                    function (webPageMetaInfo) {
                        Object.assign(_this.scope, webPageMetaInfo);
                        _this.scope.src = src;
                        _this.save();
                        _this.loading = false;
                    }), (/**
                     * @return {?}
                     */
                    function () {
                        _this.loading = false;
                    }));
                }
                else {
                    alert('Url is invalid');
                }
            }
        };
        /**
         * @return {?}
         */
        WebBookmarkBrickComponent.prototype.showPanel = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.loading) {
                /** @type {?} */
                var modalConfig = getModalConfig(this.el, this.componentFactoryResolver, InputContextComponent$2);
                this.modalRef = this.ngxStickyModalService.open(modalConfig);
                this.modalRef.result.then((/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) {
                    _this.modalRef = null;
                    _this.applySrc(result.src);
                }), (/**
                 * @return {?}
                 */
                function () {
                    _this.modalRef = null;
                }));
            }
        };
        /**
         * @return {?}
         */
        WebBookmarkBrickComponent.prototype.onWallFocus = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.scope.src) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.showPanel();
                }), 0);
            }
        };
        /**
         * @private
         * @return {?}
         */
        WebBookmarkBrickComponent.prototype.save = /**
         * @private
         * @return {?}
         */
        function () {
            this.stateChanges.emit(this.scope);
        };
        /**
         * @private
         * @param {?} url
         * @return {?}
         */
        WebBookmarkBrickComponent.prototype.getWebPageMetaInfo = /**
         * @private
         * @param {?} url
         * @return {?}
         */
        function (url) {
            return fetch("https://api.microlink.io/?url=" + url).then((/**
             * @param {?} page
             * @return {?}
             */
            function (page) {
                return page.json().then((/**
                 * @param {?} pageMetadata
                 * @return {?}
                 */
                function (pageMetadata) {
                    var _a = pageMetadata.data, image = _a.image, description = _a.description, logo = _a.logo, title = _a.title, author = _a.author;
                    return {
                        image: image,
                        description: description,
                        logo: logo,
                        title: title,
                        author: author
                    };
                }));
            }));
        };
        /**
         * @private
         * @param {?} src
         * @return {?}
         */
        WebBookmarkBrickComponent.prototype.isValidUrl = /**
         * @private
         * @param {?} src
         * @return {?}
         */
        function (src) {
            /** @type {?} */
            var url;
            try {
                url = new URL(src);
            }
            catch (e) {
            }
            return Boolean(url);
        };
        WebBookmarkBrickComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'web-bookmark-brick',
                        template: "<w-brick-input-placeholder\n    [text]=\"'Add a Web Bookmark'\"\n    [icon]=\"'link'\"\n    [loading]=\"loading\"\n    *ngIf=\"!scope.src\"\n    (selected)=\"showPanel()\">\n</w-brick-input-placeholder>\n\n<div *ngIf=\"scope.src\" class=\"web-bookmark\">\n    <a [href]=\"scope.src\" class=\"web-bookmark__content\" target=\"_blank\" [title]=\"scope.src\">\n        <p class=\"web-bookmark__title\">{{scope.title}}</p>\n        <p class=\"web-bookmark__description\">{{scope.description}}</p>\n\n        <div class=\"web-bookmark__link\">\n            <img *ngIf=\"scope.logo\" [src]=\"scope.logo.url\" alt=\"scope.title\">\n            <p>{{scope.src}}</p>\n        </div>\n    </a>\n\n    <div class=\"web-bookmark__img\" [tow-slave]=\"id\" [style.backgroundImage]=\"'url('+ scope.image?.url +')'\">\n    </div>\n</div>\n",
                        styles: [":host{position:relative;display:block}:host .web-bookmark{display:flex;height:6rem;overflow:hidden;outline:silver solid 1px;margin:.3rem 0}:host .web-bookmark:hover{cursor:pointer}:host .web-bookmark__content{width:70%;border-right:none;text-decoration:none;margin:.4rem .7rem;border-radius:2px;overflow:hidden}:host .web-bookmark__title{margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .web-bookmark__description{overflow:hidden;height:2.4rem;margin-bottom:.3rem}:host .web-bookmark__link{display:flex;align-items:center}:host .web-bookmark__link img{width:18px;height:18px;-o-object-fit:cover;object-fit:cover;margin-right:.4rem}:host .web-bookmark__link p{overflow:hidden;margin:0;height:1.2rem}:host .web-bookmark__img{width:30%;background-position:center center;background-size:cover}"]
                    }] }
        ];
        /** @nocollapse */
        WebBookmarkBrickComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ComponentFactoryResolver },
            { type: ngxStickyModal.StickyModalService }
        ]; };
        WebBookmarkBrickComponent.propDecorators = {
            id: [{ type: core.Input }],
            state: [{ type: core.Input }],
            stateChanges: [{ type: core.Output }]
        };
        return WebBookmarkBrickComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WebBookmarkBrickModule = /** @class */ (function () {
        function WebBookmarkBrickModule(brickRegistry) {
            this.brickRegistry = brickRegistry;
            this.brickRegistry.register({
                tag: 'webbookmark',
                component: WebBookmarkBrickComponent,
                textRepresentation: VideoBrickTextRepresentationClass,
                name: 'Web Bookmark',
                description: 'Save a link as a visual bookmark'
            });
        }
        WebBookmarkBrickModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            ngxStickyModal.StickyModalModule,
                            HelperComponentsModule,
                            TowModule,
                            material.MatButtonModule,
                            material.MatInputModule,
                            material.MatFormFieldModule
                        ],
                        exports: [
                            WebBookmarkBrickComponent
                        ],
                        declarations: [
                            InputContextComponent$2,
                            WebBookmarkBrickComponent
                        ],
                        entryComponents: [
                            InputContextComponent$2,
                            WebBookmarkBrickComponent
                        ],
                        providers: []
                    },] }
        ];
        /** @nocollapse */
        WebBookmarkBrickModule.ctorParameters = function () { return [
            { type: BrickRegistry }
        ]; };
        return WebBookmarkBrickModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var SUPPORTED_MODES = [
        {
            value: 'javascript',
            name: 'Javascript'
        },
        {
            value: 'shell',
            name: 'Shell'
        },
        {
            value: 'xml',
            name: 'XML'
        }
    ];
    /** @type {?} */
    var DEFAULT_THEME = 'neo';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ModeListComponent = /** @class */ (function () {
        function ModeListComponent(config, ngxStickyModalRef) {
            this.config = config;
            this.ngxStickyModalRef = ngxStickyModalRef;
        }
        /**
         * @param {?} mode
         * @return {?}
         */
        ModeListComponent.prototype.onSelected = /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            this.ngxStickyModalRef.close(mode);
        };
        ModeListComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'w-mode-list-component',
                        template: "<div class=\"w-context-panel mat-elevation-z4\">\n    <mat-action-list>\n        <button mat-list-item *ngFor=\"let mode of config.modes\" (click)=\"onSelected(mode)\">\n            {{mode.name}}\n        </button>\n    </mat-action-list>\n</div>\n"
                    }] }
        ];
        /** @nocollapse */
        ModeListComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [ngxStickyModal.STICKY_MODAL_DATA,] }] },
            { type: ngxStickyModal.StickyModalRef }
        ]; };
        return ModeListComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CodeBrickComponent = /** @class */ (function () {
        function CodeBrickComponent(ngxStickyModalService, componentFactoryResolver) {
            this.ngxStickyModalService = ngxStickyModalService;
            this.componentFactoryResolver = componentFactoryResolver;
            this.scope = {
                code: '',
                mode: SUPPORTED_MODES[0].value
            };
            this.ui = {
                displayModeName: SUPPORTED_MODES[0].name
            };
            this.stateChanges = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        CodeBrickComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this.scope, this.state);
            this.codeMirrorInstance = CodeMirror(this.container.nativeElement, {
                value: "",
                mode: this.scope.mode,
                theme: DEFAULT_THEME,
                dragDrop: false,
                scrollbarStyle: null
            });
            this.codeMirrorInstance.on('change', (/**
             * @return {?}
             */
            function () {
                _this.scope.code = _this.codeMirrorInstance.getValue();
                _this.saveState();
            }));
            this.processNewState();
        };
        /**
         * @param {?} newState
         * @return {?}
         */
        CodeBrickComponent.prototype.onWallStateChange = /**
         * @param {?} newState
         * @return {?}
         */
        function (newState) {
            if (newState && newState.code !== this.scope.code) {
                Object.assign(this.scope, this.state);
                this.processNewState();
            }
        };
        /**
         * @return {?}
         */
        CodeBrickComponent.prototype.processNewState = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.codeMirrorInstance.setValue(this.scope.code);
            if (this.scope.mode !== this.codeMirrorInstance.getMode().name) {
                this.codeMirrorInstance.setOption('mode', this.scope.mode);
            }
            this.ui.displayModeName = SUPPORTED_MODES.find((/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) { return mode.value === _this.scope.mode; })).name;
        };
        /**
         * @return {?}
         */
        CodeBrickComponent.prototype.saveState = /**
         * @return {?}
         */
        function () {
            this.stateChanges.emit(this.scope);
        };
        /**
         * @return {?}
         */
        CodeBrickComponent.prototype.onModeSelected = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var elementBoundingRect = this.mode.nativeElement.getBoundingClientRect();
            /** @type {?} */
            var modes = SUPPORTED_MODES.map((/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) {
                return __assign({}, mode, { selected: mode.value === _this.scope.mode });
            }));
            this.ngxStickyModalService.open({
                component: ModeListComponent,
                data: { modes: modes },
                positionStrategy: {
                    name: ngxStickyModal.StickyPositionStrategy.coordinate,
                    options: {
                        clientX: elementBoundingRect.x,
                        clientY: elementBoundingRect.y + 35
                    }
                },
                componentFactoryResolver: this.componentFactoryResolver
            }).result.then((/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) {
                Object.assign(_this.scope, __assign({}, _this.state, { mode: mode.value }));
                _this.processNewState();
            }), (/**
             * @return {?}
             */
            function () {
                // nothing
            }));
        };
        CodeBrickComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'code-brick',
                        template: "<div #container></div>\n\n<button #mode (click)=\"onModeSelected()\" mat-button>{{ui.displayModeName}}</button>\n",
                        styles: ["::ng-deep .CodeMirror{padding:1rem 1.4rem;height:auto}::ng-deep .CodeMirror .CodeMirror-cursor{width:1px}::ng-deep .CodeMirror .CodeMirror-scroll{overflow:hidden!important}.mat-button{position:absolute;right:.7rem;bottom:.7rem;z-index:2}"]
                    }] }
        ];
        /** @nocollapse */
        CodeBrickComponent.ctorParameters = function () { return [
            { type: ngxStickyModal.StickyModalService },
            { type: core.ComponentFactoryResolver }
        ]; };
        CodeBrickComponent.propDecorators = {
            id: [{ type: core.Input }],
            state: [{ type: core.Input }],
            container: [{ type: core.ViewChild, args: ['container', { read: core.ElementRef },] }],
            mode: [{ type: core.ViewChild, args: ['mode', { read: core.ElementRef },] }],
            stateChanges: [{ type: core.Output }]
        };
        return CodeBrickComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CodeBrickModule = /** @class */ (function () {
        function CodeBrickModule(brickRegistry) {
            this.brickRegistry = brickRegistry;
            this.brickRegistry.register({
                tag: 'code',
                component: CodeBrickComponent,
                name: 'Code',
                description: 'Capture a code snippet'
            });
        }
        CodeBrickModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            WallModule,
                            HelperComponentsModule,
                            ngxStickyModal.StickyModalModule,
                            material.MatButtonModule,
                            material.MatListModule
                        ],
                        declarations: [
                            CodeBrickComponent,
                            ModeListComponent
                        ],
                        entryComponents: [
                            CodeBrickComponent,
                            ModeListComponent
                        ]
                    },] }
        ];
        /** @nocollapse */
        CodeBrickModule.ctorParameters = function () { return [
            { type: BrickRegistry }
        ]; };
        return CodeBrickModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TEXT_BRICK_TAG = 'text';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BricksListComponent = /** @class */ (function () {
        function BricksListComponent(brickRegistry, config) {
            this.brickRegistry = brickRegistry;
            this.config = config;
            this.selectedTag$ = new rxjs.BehaviorSubject(null);
            this.bricksList$ = new rxjs.BehaviorSubject([]);
            this.subscriptions = [];
            this.updateBricksList('');
        }
        /**
         * @return {?}
         */
        BricksListComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.subscriptions.push(this.config.text$.subscribe((/**
             * @param {?} filterText
             * @return {?}
             */
            function (filterText) {
                _this.updateBricksList(filterText.slice(1));
            })));
            this.subscriptions.push(this.config.up$.subscribe((/**
             * @return {?}
             */
            function () {
                _this.onNavigationUpDownHandler(true);
            })));
            this.subscriptions.push(this.config.down$.subscribe((/**
             * @return {?}
             */
            function () {
                _this.onNavigationUpDownHandler(false);
            })));
            this.subscriptions.push(this.config.enter$.subscribe((/**
             * @return {?}
             */
            function () {
                _this.notifySelectedTag();
            })));
        };
        /**
         * @param {?} brickDescription
         * @return {?}
         */
        BricksListComponent.prototype.onBrickSelected = /**
         * @param {?} brickDescription
         * @return {?}
         */
        function (brickDescription) {
            this.selectedTag$.next(brickDescription.tag);
            this.notifySelectedTag();
        };
        /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        BricksListComponent.prototype.trackByFn = /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) {
            return item.tag;
        };
        /**
         * @return {?}
         */
        BricksListComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.subscriptions.forEach((/**
             * @param {?} subscription
             * @return {?}
             */
            function (subscription) {
                subscription.unsubscribe();
            }));
        };
        /**
         * @private
         * @return {?}
         */
        BricksListComponent.prototype.notifySelectedTag = /**
         * @private
         * @return {?}
         */
        function () {
            this.config.selectedTag$.next(this.selectedTag$.getValue());
        };
        /**
         * @private
         * @param {?} filterText
         * @return {?}
         */
        BricksListComponent.prototype.updateBricksList = /**
         * @private
         * @param {?} filterText
         * @return {?}
         */
        function (filterText) {
            /** @type {?} */
            var brickDescriptors = this.brickRegistry.getAll()
                .filter((/**
             * @param {?} brickDescriptor
             * @return {?}
             */
            function (brickDescriptor) {
                if (brickDescriptor.tag === TEXT_BRICK_TAG) {
                    return false;
                }
                else {
                    return brickDescriptor.tag.includes(filterText);
                }
            })).sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                if (a.tag.startsWith(filterText)) {
                    return -1;
                }
                else if (b.tag.startsWith(filterText)) {
                    return 1;
                }
                else {
                    return 0;
                }
            }));
            if (brickDescriptors.length) {
                this.selectedTag$.next(brickDescriptors[0].tag);
            }
            else {
                this.selectedTag$.next(null);
            }
            this.bricksList$.next(brickDescriptors);
        };
        /**
         * @private
         * @param {?} isUp
         * @return {?}
         */
        BricksListComponent.prototype.onNavigationUpDownHandler = /**
         * @private
         * @param {?} isUp
         * @return {?}
         */
        function (isUp) {
            /** @type {?} */
            var currentSelectedTag = this.selectedTag$.getValue();
            /** @type {?} */
            var currentBrickList = this.bricksList$.getValue();
            if (currentSelectedTag && currentBrickList.length > 1) {
                /** @type {?} */
                var currentSelectedBrickIndex = currentBrickList.findIndex((/**
                 * @param {?} brickDescriptor
                 * @return {?}
                 */
                function (brickDescriptor) {
                    return brickDescriptor.tag === currentSelectedTag;
                }));
                /** @type {?} */
                var nextSelectedBrick = void 0;
                if (isUp) {
                    nextSelectedBrick = currentBrickList[currentSelectedBrickIndex - 1];
                    if (!nextSelectedBrick) {
                        // take last brick
                        nextSelectedBrick = currentBrickList[currentBrickList.length - 1];
                    }
                }
                else {
                    // is bottom
                    nextSelectedBrick = currentBrickList[currentSelectedBrickIndex + 1];
                    if (!nextSelectedBrick) {
                        // take first brick
                        nextSelectedBrick = currentBrickList[0];
                    }
                }
                this.selectedTag$.next(nextSelectedBrick.tag);
                // wait until component re-renders
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    document.getElementsByClassName('w-bricks-list__selected')[0].scrollIntoView();
                }));
            }
        };
        BricksListComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'w-bricks-list',
                        template: "<div class=\"w-context-panel w-bricks-list mat-elevation-z4\">\n    <mat-list>\n        <mat-list-item *ngFor=\"let brickDescription of bricksList$ | async; trackBy: trackByFn\"\n                       [ngClass]=\"{'w-bricks-list__selected': (selectedTag$ | async) === brickDescription.tag}\"\n                       (click)=\"onBrickSelected(brickDescription)\">\n            <p mat-line>\n                {{brickDescription.name}}\n            </p>\n            <p mat-line>\n                {{brickDescription.description}}\n            </p>\n        </mat-list-item>\n    </mat-list>\n</div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        BricksListComponent.ctorParameters = function () { return [
            { type: BrickRegistry },
            { type: undefined, decorators: [{ type: core.Inject, args: [ngxStickyModal.STICKY_MODAL_DATA,] }] }
        ]; };
        return BricksListComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NodeTreeSplit = /** @class */ (function () {
        function NodeTreeSplit(root, targetElement, // text node
        offset) {
            this.root = root;
            this.targetElement = targetElement;
            this.offset = offset;
            if (root === targetElement) {
                // edge case scenario, just return root node itself
                this.leftTree = (/** @type {?} */ (root));
                this.rightTree = (/** @type {?} */ (root));
            }
            else {
                // get direct parent of target node
                /** @type {?} */
                var parent_1 = targetElement.parentNode;
                // create left and right trees which will be returned as result
                /** @type {?} */
                var rightTree = parent_1.cloneNode(false);
                /** @type {?} */
                var leftTree = parent_1.cloneNode(false);
                // Build Right tree
                // as soon as targetElement is a Text Node, split text of that node using offset
                rightTree.appendChild(document.createTextNode(targetElement.textContent.slice(offset)));
                // parent node could contains other Nodes besides target node
                // add all next siblings of target node to the right tree
                this.appendNextSiblingsToNode(rightTree, targetElement);
                // Build Left tree
                // as soon as targetElement is a Text Node, split text of that node using offset
                leftTree.appendChild(document.createTextNode(targetElement.textContent.slice(0, offset)));
                // parent node could contains other Nodes besides target node
                // add all previous siblings of target node to the left tree
                this.prependPreviousSiblingsToNode(leftTree, targetElement);
                if (root === parent_1) {
                    // we already fully build left and right trees
                    this.leftTree = (/** @type {?} */ (leftTree));
                    this.rightTree = (/** @type {?} */ (rightTree));
                }
                else {
                    // recursively build left and right trees
                    // climbing from parent node to the root node
                    /** @type {?} */
                    var leftParentTree = void 0;
                    /** @type {?} */
                    var rightParentTree = void 0;
                    /** @type {?} */
                    var grandparent = parent_1.parentNode;
                    while (root.contains(grandparent) || grandparent === root) {
                        rightParentTree = grandparent.cloneNode(false);
                        leftParentTree = grandparent.cloneNode(false);
                        // Process Left tree
                        this.prependPreviousSiblingsToNode(leftParentTree, parent_1);
                        leftParentTree.appendChild(leftTree);
                        leftTree = leftParentTree;
                        // Process Right tree
                        this.appendNextSiblingsToNode(rightParentTree, parent_1);
                        rightParentTree.prepend(rightTree);
                        rightTree = rightParentTree;
                        parent_1 = grandparent;
                        grandparent = grandparent.parentNode;
                    }
                    this.leftTree = (/** @type {?} */ (leftTree));
                    this.rightTree = (/** @type {?} */ (rightTree));
                }
            }
        }
        /**
         * @private
         * @param {?} leftTree
         * @param {?} targetNode
         * @return {?}
         */
        NodeTreeSplit.prototype.prependPreviousSiblingsToNode = /**
         * @private
         * @param {?} leftTree
         * @param {?} targetNode
         * @return {?}
         */
        function (leftTree, targetNode) {
            /** @type {?} */
            var previousSibling = targetNode.previousSibling;
            while (previousSibling) {
                leftTree.prepend(previousSibling.cloneNode(true));
                previousSibling = previousSibling.previousSibling;
            }
        };
        /**
         * @private
         * @param {?} rightTree
         * @param {?} targetElement
         * @return {?}
         */
        NodeTreeSplit.prototype.appendNextSiblingsToNode = /**
         * @private
         * @param {?} rightTree
         * @param {?} targetElement
         * @return {?}
         */
        function (rightTree, targetElement) {
            /** @type {?} */
            var nextSibling = targetElement.nextSibling;
            while (nextSibling) {
                rightTree.appendChild(nextSibling.cloneNode(true));
                nextSibling = nextSibling.nextSibling;
            }
        };
        return NodeTreeSplit;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TreeNodeTraverse = /** @class */ (function () {
        function TreeNodeTraverse(root) {
            this.root = root;
        }
        /**
         * @param {?} fn
         * @return {?}
         */
        TreeNodeTraverse.prototype.traversePostOrder = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._traversePostOrder(this.root, fn);
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        TreeNodeTraverse.prototype.traversePreOrder = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._traversePreOrder(this.root, fn);
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        TreeNodeTraverse.prototype.traversePostPreOrder = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._traversePostPreOrder(this.root, fn);
        };
        /**
         * @return {?}
         */
        TreeNodeTraverse.prototype.getPreOrderNodes = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var nodes = [];
            this.traversePreOrder((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                nodes.push(node);
            }));
            return nodes;
        };
        /**
         * @return {?}
         */
        TreeNodeTraverse.prototype.getPostOrderNodes = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var nodes = [];
            this.traversePostOrder((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                nodes.push(node);
            }));
            return nodes;
        };
        /**
         * @return {?}
         */
        TreeNodeTraverse.prototype.getPostPreOrderNodes = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var nodes = [];
            this.traversePostPreOrder((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                nodes.push(node);
            }));
            return nodes;
        };
        /**
         * @private
         * @param {?} node
         * @param {?} fn
         * @return {?}
         */
        TreeNodeTraverse.prototype._traversePostOrder = /**
         * @private
         * @param {?} node
         * @param {?} fn
         * @return {?}
         */
        function (node, fn) {
            var _this = this;
            Array.from(node.childNodes).forEach((/**
             * @param {?} childNode
             * @return {?}
             */
            function (childNode) {
                if (childNode.childNodes && childNode.childNodes.length) {
                    _this._traversePostOrder(childNode, fn);
                }
                fn(childNode);
            }));
        };
        /**
         * @private
         * @param {?} node
         * @param {?} fn
         * @return {?}
         */
        TreeNodeTraverse.prototype._traversePreOrder = /**
         * @private
         * @param {?} node
         * @param {?} fn
         * @return {?}
         */
        function (node, fn) {
            var _this = this;
            Array.from(node.childNodes).forEach((/**
             * @param {?} childNode
             * @return {?}
             */
            function (childNode) {
                fn(childNode);
                if (childNode.childNodes && childNode.childNodes.length) {
                    _this._traversePreOrder(childNode, fn);
                }
            }));
        };
        /**
         * @private
         * @param {?} node
         * @param {?} fn
         * @return {?}
         */
        TreeNodeTraverse.prototype._traversePostPreOrder = /**
         * @private
         * @param {?} node
         * @param {?} fn
         * @return {?}
         */
        function (node, fn) {
            var _this = this;
            Array.from(node.childNodes).forEach((/**
             * @param {?} childNode
             * @return {?}
             */
            function (childNode) {
                fn(childNode);
                if (childNode.childNodes && childNode.childNodes.length) {
                    _this._traversePostPreOrder(childNode, fn);
                }
                fn(childNode);
            }));
        };
        return TreeNodeTraverse;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TextContextMenuComponent = /** @class */ (function () {
        function TextContextMenuComponent(config) {
            this.config = config;
            this.ui = {
                showLinkForm: false
            };
        }
        /**
         * @return {?}
         */
        TextContextMenuComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.config.api.saveSelection();
        };
        /**
         * @return {?}
         */
        TextContextMenuComponent.prototype.bold = /**
         * @return {?}
         */
        function () {
            this.config.api.bold();
        };
        /**
         * @return {?}
         */
        TextContextMenuComponent.prototype.italic = /**
         * @return {?}
         */
        function () {
            this.config.api.italic();
        };
        /**
         * @return {?}
         */
        TextContextMenuComponent.prototype.link = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.switchLinkFormVisibility();
            if (this.ui.showLinkForm) {
                this.config.api.saveSelection();
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    if (_this.config.api.isLinkSelected()) {
                        _this.linkEl.nativeElement.value = _this.config.api.getSelectedLinkHref();
                    }
                    _this.linkEl.nativeElement.focus();
                }));
            }
            else {
                this.config.api.restoreSelection();
            }
        };
        /**
         * @return {?}
         */
        TextContextMenuComponent.prototype.applyLink = /**
         * @return {?}
         */
        function () {
            this.config.api.restoreSelection();
            if (this.config.api.isLinkSelected()) {
                this.config.api.changeLinkUrl(this.linkEl.nativeElement.value);
            }
            else {
                this.config.api.createLink(this.linkEl.nativeElement.value);
            }
            this.switchLinkFormVisibility();
        };
        /**
         * @return {?}
         */
        TextContextMenuComponent.prototype.unlink = /**
         * @return {?}
         */
        function () {
            this.config.api.restoreSelection();
            this.config.api.unlink();
            this.switchLinkFormVisibility();
        };
        /**
         * @return {?}
         */
        TextContextMenuComponent.prototype.switchLinkFormVisibility = /**
         * @return {?}
         */
        function () {
            this.ui.showLinkForm = !this.ui.showLinkForm;
        };
        TextContextMenuComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'w-text-context-menu',
                        template: "<div class=\"w-context-panel w-text-context-menu-panel mat-elevation-z4\">\n    <div>\n        <button [ngClass]=\"{'w-text-context-menu__selected-link': config.api.isLinkSelected()}\"\n                mat-button\n                (click)=\"link()\">\n            Link\n        </button>\n\n        <button mat-button (click)=\"bold()\">Bold</button>\n        <button mat-button (click)=\"italic()\">Italic</button>\n    </div>\n\n    <div>\n        <form *ngIf=\"ui.showLinkForm\" (submit)=\"applyLink()\">\n            <mat-form-field>\n                <input #linkEl #src matInput placeholder=\"Paste the url\">\n            </mat-form-field>\n\n            <div>\n                <button (click)=\"applyLink()\"\n                        type=\"button\"\n                        mat-button>\n                    Link\n                </button>\n\n                <button *ngIf=\"config.api.isLinkSelected()\"\n                        (click)=\"unlink()\"\n                        type=\"button\"\n                        mat-button>\n                    Unlink\n                </button>\n            </div>\n        </form>\n    </div>\n</div>\n"
                    }] }
        ];
        /** @nocollapse */
        TextContextMenuComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [ngxStickyModal.STICKY_MODAL_DATA,] }] }
        ]; };
        TextContextMenuComponent.propDecorators = {
            linkEl: [{ type: core.ViewChild, args: ['linkEl',] }]
        };
        return TextContextMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TextBrickComponent = /** @class */ (function (_super) {
        __extends(TextBrickComponent, _super);
        function TextBrickComponent(zone, ngxStickyModalService, cd, componentFactoryResolver, el) {
            var _this = _super.call(this) || this;
            _this.zone = zone;
            _this.ngxStickyModalService = ngxStickyModalService;
            _this.cd = cd;
            _this.componentFactoryResolver = componentFactoryResolver;
            _this.el = el;
            _this.placeholder = null;
            _this.up$ = new rxjs.Subject();
            _this.down$ = new rxjs.Subject();
            _this.enter$ = new rxjs.Subject();
            _this.selectedTag$ = new rxjs.Subject();
            _this.subscriptions = [];
            _this.api = {
                bold: _this.bold.bind(_this),
                italic: _this.italic.bind(_this),
                createLink: _this.createLink.bind(_this),
                changeLinkUrl: _this.changeLinkUrl.bind(_this),
                isLinkSelected: _this.isLinkSelected.bind(_this),
                getSelectedLinkHref: _this.getSelectedLinkHref.bind(_this),
                saveSelection: _this.saveSelection.bind(_this),
                restoreSelection: _this.restoreSelection.bind(_this),
                unlink: _this.unlink.bind(_this)
            };
            _this.selectedTag$.subscribe((/**
             * @param {?} newTag
             * @return {?}
             */
            function (newTag) {
                if (newTag) {
                    _this.hideBricksList();
                    _this.wallModel.api.core.turnBrickInto(_this.id, newTag);
                    if (newTag === DIVIDER_BRICK_TAG) {
                        _this.wallModel.api.core.addBrickAfterBrickId(_this.id, 'text');
                    }
                }
            }));
            _this.subscriptions.push(
            // show sub-menu for selected text
            rxjs.fromEvent(_this.el.nativeElement, 'mouseup')
                .pipe(operators.filter((/**
             * @return {?}
             */
            function () { return Boolean(_this.scope.text.length); })), operators.debounceTime(500), operators.filter((/**
             * @return {?}
             */
            function () { return _this.el.nativeElement.contains(window.getSelection().anchorNode); })))
                .subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.onTextSelection();
            })));
            return _this;
        }
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            _super.prototype.ngOnInit.call(this);
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            _super.prototype.ngOnDestroy.call(this);
            this.subscriptions.forEach((/**
             * @param {?} subscription
             * @return {?}
             */
            function (subscription) {
                subscription.unsubscribe();
            }));
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.onBlur = /**
         * @return {?}
         */
        function () {
            this.placeholder = null;
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.onFocus = /**
         * @return {?}
         */
        function () {
            this.placeholder = 'Type \'/\' for commands';
        };
        /**
         * @param {?} e
         * @return {?}
         */
        TextBrickComponent.prototype.onKeyPress = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _super.prototype.onKeyPress.call(this, e);
            this.hideContextMenuModal();
        };
        // open the link in new window
        // open the link in new window
        /**
         * @param {?} event
         * @return {?}
         */
        TextBrickComponent.prototype.onClick = 
        // open the link in new window
        /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var target = (/** @type {?} */ (event.target));
            if (this.isHTMLElement(target)) {
                if (target.tagName === 'A') {
                    window.open(target.getAttribute('href'), '_blank');
                }
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        TextBrickComponent.prototype.topKeyPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.brickSelectionModalRef) {
                e.preventDefault();
                e.stopPropagation();
                this.up$.next();
            }
            else {
                _super.prototype.topKeyPressed.call(this, e);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        TextBrickComponent.prototype.bottomKeyPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.brickSelectionModalRef) {
                e.preventDefault();
                e.stopPropagation();
                this.down$.next();
            }
            else {
                _super.prototype.bottomKeyPressed.call(this, e);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        TextBrickComponent.prototype.enterKeyPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            var _this = this;
            if (this.brickSelectionModalRef) {
                this.enter$.next();
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.hideBricksList();
                }), 10);
            }
            else {
                if (this.isTag()) {
                    /** @type {?} */
                    var newTag = this.scope.text.slice(1);
                    this.wallModel.api.core.turnBrickInto(this.id, newTag);
                    // d - divider tag
                    if (newTag === 'd') {
                        this.wallModel.api.core.addBrickAfterBrickId(this.id, 'text');
                    }
                }
                else {
                    _super.prototype.enterKeyPressed.call(this, e);
                }
            }
        };
        /**
         * @param {?} offset
         * @param {?} target
         * @return {?}
         */
        TextBrickComponent.prototype.getSplittedText = /**
         * @param {?} offset
         * @param {?} target
         * @return {?}
         */
        function (offset, target) {
            /** @type {?} */
            var nodeTreeSplit = new NodeTreeSplit(this.editor.nativeElement, target, offset);
            return {
                left: nodeTreeSplit.leftTree.innerHTML,
                right: nodeTreeSplit.rightTree.innerHTML
            };
        };
        /**
         * @param {?} e
         * @return {?}
         */
        TextBrickComponent.prototype.escapeKeyPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.brickSelectionModalRef) {
                e.preventDefault();
                e.stopPropagation();
                this.hideBricksList();
            }
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.onTextChange = /**
         * @return {?}
         */
        function () {
            _super.prototype.onTextChange.call(this);
            if (this.brickSelectionModalRef) {
                if (!this.scope.text.length) {
                    this.hideBricksList();
                }
            }
            else if (this.scope.text[0] === '/' && this.scope.text.length === 1) {
                this.openBricksListModal();
            }
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.openBricksListModal = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.editor.nativeElement.blur();
            /** @type {?} */
            var modalConfig = getModalConfig(this.el, this.componentFactoryResolver, BricksListComponent);
            modalConfig.data = {
                text$: this.textChange,
                up$: this.up$,
                down$: this.down$,
                enter$: this.enter$,
                selectedTag$: this.selectedTag$
            };
            this.brickSelectionModalRef = this.ngxStickyModalService.open(modalConfig);
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.editor.nativeElement.focus();
            }));
        };
        /**
         * @param {?} e
         * @return {?}
         */
        TextBrickComponent.prototype.onPaste = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            var _this = this;
            /** @type {?} */
            var imageDataTransferItem = this.extractImageDataTransferItem(e.clipboardData.items);
            if (imageDataTransferItem) {
                e.preventDefault();
                (new ImgEncoder(imageDataTransferItem.getAsFile())).getBase64Representation().then((/**
                 * @param {?} imgBase64
                 * @return {?}
                 */
                function (imgBase64) {
                    _this.wallModel.api.core.turnBrickInto(_this.id, 'image', {
                        src: imgBase64
                    });
                }));
            }
            else {
                _super.prototype.onPaste.call(this, e);
            }
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.onTextSelection = /**
         * @return {?}
         */
        function () {
            if (!this.contextMenuModalRef) {
                /** @type {?} */
                var selection = window.getSelection();
                if (!selection.isCollapsed) {
                    this.showContextModal();
                }
            }
        };
        // API
        // API
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.bold = 
        // API
        /**
         * @return {?}
         */
        function () {
            document.execCommand('bold', false);
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.italic = /**
         * @return {?}
         */
        function () {
            document.execCommand('italic', false);
        };
        /**
         * @param {?} url
         * @return {?}
         */
        TextBrickComponent.prototype.createLink = /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            document.execCommand('createLink', false, url);
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.getSelectedLinkHref = /**
         * @return {?}
         */
        function () {
            if (this.selectionInfo.selectedLink) {
                return this.selectionInfo.selectedLink.getAttribute('href');
            }
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.unlink = /**
         * @return {?}
         */
        function () {
            document.execCommand('unlink', false);
        };
        /**
         * @param {?} url
         * @return {?}
         */
        TextBrickComponent.prototype.changeLinkUrl = /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            if (this.selectionInfo.selectedLink) {
                this.selectionInfo.selectedLink.setAttribute('href', url);
                this.triggerEditorChange();
            }
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.isLinkSelected = /**
         * @return {?}
         */
        function () {
            return Boolean(this.selectionInfo && this.selectionInfo.selectedLink);
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.saveSelection = /**
         * @return {?}
         */
        function () {
            this.selectionInfo = {
                selectedLink: this.getSelectedLink(),
                ranges: this.getSelectedRanges()
            };
        };
        /**
         * @return {?}
         */
        TextBrickComponent.prototype.restoreSelection = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var sel = window.getSelection();
            sel.removeAllRanges();
            for (var i = 0, len = this.selectionInfo.ranges.length; i < len; ++i) {
                sel.addRange(this.selectionInfo.ranges[i]);
            }
        };
        // end API
        // end API
        /**
         * @private
         * @return {?}
         */
        TextBrickComponent.prototype.getSelectedLink = 
        // end API
        /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var selection = window.getSelection();
            /** @type {?} */
            var anchorNodeLink;
            /** @type {?} */
            var focusNodeLink;
            /** @type {?} */
            var isAnchorNodeBelongToBrick = this.el.nativeElement.contains(selection.anchorNode);
            /** @type {?} */
            var isFocusNodeBelongToBrick = this.el.nativeElement.contains(selection.focusNode);
            if (isAnchorNodeBelongToBrick) {
                anchorNodeLink = this.findParentLink(selection.anchorNode);
            }
            if (isFocusNodeBelongToBrick) {
                focusNodeLink = this.findParentLink(selection.focusNode);
            }
            if (anchorNodeLink) {
                return anchorNodeLink;
            }
            else if (focusNodeLink) {
                return focusNodeLink;
            }
            else if (selection.anchorNode !== selection.focusNode &&
                isFocusNodeBelongToBrick && isAnchorNodeBelongToBrick) {
                return this.findLinkBetweenNodes(selection.anchorNode, selection.focusNode);
            }
        };
        /**
         * @private
         * @return {?}
         */
        TextBrickComponent.prototype.triggerEditorChange = /**
         * @private
         * @return {?}
         */
        function () {
            this.editor.nativeElement.dispatchEvent(new Event('input'));
        };
        /**
         * @private
         * @return {?}
         */
        TextBrickComponent.prototype.showContextModal = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.editor.nativeElement.blur();
            /** @type {?} */
            var sel = window.getSelection();
            /** @type {?} */
            var elementBoundingRect = sel.getRangeAt(0).getBoundingClientRect();
            this.contextMenuModalRef = this.ngxStickyModalService.open({
                component: TextContextMenuComponent,
                data: {
                    api: this.api
                },
                positionStrategy: {
                    name: ngxStickyModal.StickyPositionStrategy.coordinate,
                    options: {
                        clientX: elementBoundingRect.left + ((elementBoundingRect.right - elementBoundingRect.left) / 2.5),
                        clientY: elementBoundingRect.top - 35
                    }
                },
                overlayConfig: {
                    hasBackdrop: false
                },
                componentFactoryResolver: this.componentFactoryResolver
            });
            this.contextMenuModalRef.result.then((/**
             * @return {?}
             */
            function () {
                _this.hideContextMenuModal();
            }), (/**
             * @return {?}
             */
            function () {
                _this.hideContextMenuModal();
            }));
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.editor.nativeElement.focus();
            }));
        };
        // todo: might be as util method
        // todo: might be as util method
        /**
         * @private
         * @return {?}
         */
        TextBrickComponent.prototype.getSelectedRanges = 
        // todo: might be as util method
        /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var sel = window.getSelection();
            /** @type {?} */
            var ranges = [];
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                ranges.push(sel.getRangeAt(i));
            }
            return ranges;
        };
        /**
         * @private
         * @param {?} items
         * @return {?}
         */
        TextBrickComponent.prototype.extractImageDataTransferItem = /**
         * @private
         * @param {?} items
         * @return {?}
         */
        function (items) {
            /** @type {?} */
            var index;
            for (index in items) {
                if (items.hasOwnProperty(index)) {
                    /** @type {?} */
                    var item = items[index];
                    if (item.kind === 'file') {
                        return item;
                    }
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        TextBrickComponent.prototype.isTag = /**
         * @private
         * @return {?}
         */
        function () {
            return this.scope.text && this.scope.text[0] === '/' &&
                this.wallModel.api.core.isRegisteredBrick(this.scope.text.slice(1));
        };
        /**
         * @private
         * @return {?}
         */
        TextBrickComponent.prototype.hideBricksList = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.brickSelectionModalRef) {
                this.brickSelectionModalRef.close();
                this.brickSelectionModalRef = null;
            }
        };
        /**
         * @private
         * @return {?}
         */
        TextBrickComponent.prototype.hideContextMenuModal = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.contextMenuModalRef) {
                this.contextMenuModalRef.close();
                this.contextMenuModalRef = null;
            }
        };
        /**
         * @private
         * @param {?} node
         * @return {?}
         */
        TextBrickComponent.prototype.findParentLink = /**
         * @private
         * @param {?} node
         * @return {?}
         */
        function (node) {
            /** @type {?} */
            var currentNode = node;
            /** @type {?} */
            var linkNode = null;
            while (!linkNode && currentNode !== this.el.nativeElement) {
                if (((/** @type {?} */ (currentNode))).tagName === 'A') {
                    linkNode = currentNode;
                }
                currentNode = currentNode.parentElement;
            }
            return linkNode;
        };
        /**
         * @private
         * @param {?} nodeA
         * @param {?} nodeB
         * @return {?}
         */
        TextBrickComponent.prototype.findLinkBetweenNodes = /**
         * @private
         * @param {?} nodeA
         * @param {?} nodeB
         * @return {?}
         */
        function (nodeA, nodeB) {
            var _this = this;
            /** @type {?} */
            var treeNodeTraverse = new TreeNodeTraverse(this.editor.nativeElement);
            /** @type {?} */
            var orderedNodes = treeNodeTraverse.getPostPreOrderNodes();
            /** @type {?} */
            var nodeAIndex = orderedNodes.indexOf(nodeA);
            /** @type {?} */
            var nodeBIndex = orderedNodes.indexOf(nodeB);
            if (nodeBIndex < nodeAIndex) {
                /** @type {?} */
                var temp = nodeBIndex;
                nodeBIndex = nodeAIndex;
                nodeAIndex = temp;
            }
            /** @type {?} */
            var orderedNodesBetweenNodes = orderedNodes.slice(nodeAIndex, nodeBIndex);
            /** @type {?} */
            var linkNodes = orderedNodesBetweenNodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                if (_this.isHTMLElement(node)) {
                    return node.tagName === 'A';
                }
            }));
            return (/** @type {?} */ (linkNodes[0]));
        };
        /**
         * @private
         * @param {?} node
         * @return {?}
         */
        TextBrickComponent.prototype.isHTMLElement = /**
         * @private
         * @param {?} node
         * @return {?}
         */
        function (node) {
            return ((/** @type {?} */ (node))).querySelector !== undefined;
        };
        TextBrickComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'text-brick',
                        template: "<p #editor\n   attr.placeholder=\"{{placeholder}}\"\n   (input)=\"onTextChange()\"\n   [(ngModel)]=\"scope.text\"\n   (keydown)=\"onKeyPress($event)\"\n   (click)=\"onClick($event)\"\n   class=\"text-brick__editor\"\n   [ngClass]=\"'text-brick-tabs-' + scope.tabs\"\n   (blur)=\"onBlur()\"\n   (focus)=\"onFocus()\"\n   contenteditable\n   [propValueAccessor]=\"'innerHTML'\">\n</p>\n<!--<mat-icon *ngIf=\"!brickSelectionModalRef\" (click)=\"openBricksListModal()\">add_box</mat-icon>-->\n",
                        styles: [":host{display:block}:host .text-brick__editor{word-break:break-all;padding:3px 2px;line-height:1.4;margin:0;box-sizing:content-box}:host .text-brick__editor:focus{outline:0}:host [contenteditable]:empty:before{content:attr(placeholder)}:host .text-brick-tabs-1{margin-left:1.5rem}:host .text-brick-tabs-2{margin-left:3rem}:host .text-brick-tabs-3{margin-left:4.5rem}"]
                    }] }
        ];
        /** @nocollapse */
        TextBrickComponent.ctorParameters = function () { return [
            { type: core.NgZone },
            { type: ngxStickyModal.StickyModalService },
            { type: core.ChangeDetectorRef },
            { type: core.ComponentFactoryResolver },
            { type: core.ElementRef }
        ]; };
        TextBrickComponent.propDecorators = {
            wallModel: [{ type: core.Input }]
        };
        return TextBrickComponent;
    }(BaseTextBrickComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TextBrickModule = /** @class */ (function () {
        function TextBrickModule(brickRegistry) {
            this.brickRegistry = brickRegistry;
            this.brickRegistry.register({
                tag: 'text',
                component: TextBrickComponent,
                supportText: true,
                textRepresentation: TextRepresentation,
                name: 'Text',
                description: 'Just start writing with plain text'
            });
        }
        TextBrickModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            common.CommonModule,
                            ContenteditableModule,
                            HelperComponentsModule,
                            ngxStickyModal.StickyModalModule,
                            material.MatButtonModule,
                            material.MatInputModule,
                            material.MatFormFieldModule,
                            material.MatListModule,
                            material.MatIconModule
                        ],
                        exports: [
                            TextBrickComponent,
                            BricksListComponent,
                            TextContextMenuComponent
                        ],
                        declarations: [
                            TextBrickComponent,
                            BricksListComponent,
                            // context menu
                            TextContextMenuComponent
                        ],
                        entryComponents: [
                            TextBrickComponent,
                            BricksListComponent,
                            // context menu
                            TextContextMenuComponent
                        ]
                    },] }
        ];
        /** @nocollapse */
        TextBrickModule.ctorParameters = function () { return [
            { type: BrickRegistry }
        ]; };
        return TextBrickModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LocationToTopLeftPointEvent = /** @class */ (function () {
        function LocationToTopLeftPointEvent(spots) {
            this.spots = spots;
        }
        return LocationToTopLeftPointEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LocationToLeftCenterPointEvent = /** @class */ (function () {
        function LocationToLeftCenterPointEvent(spots) {
            this.spots = spots;
        }
        return LocationToLeftCenterPointEvent;
    }());

    exports.AddBrickEvent = AddBrickEvent;
    exports.BeforeChangeEvent = BeforeChangeEvent;
    exports.BrickRegistry = BrickRegistry;
    exports.CodeBrickModule = CodeBrickModule;
    exports.CopyPlugin = CopyPlugin;
    exports.DIVIDER_BRICK_TAG = DIVIDER_BRICK_TAG;
    exports.DividerBrickModule = DividerBrickModule;
    exports.EndPickOut = EndPickOut;
    exports.HeaderBrickComponent = HeaderBrickComponent;
    exports.HeaderBrickModule = HeaderBrickModule;
    exports.HelperComponentsModule = HelperComponentsModule;
    exports.ImgBrickComponent = ImgBrickComponent;
    exports.ImgBrickModule = ImgBrickModule;
    exports.LocationToLeftCenterPointEvent = LocationToLeftCenterPointEvent;
    exports.LocationToTopLeftPointEvent = LocationToTopLeftPointEvent;
    exports.LocationUpdatedEvent = LocationUpdatedEvent;
    exports.MoveBrickEvent = MoveBrickEvent;
    exports.PickOutAreaComponent = PickOutAreaComponent;
    exports.PickOutAreaDirective = PickOutAreaDirective;
    exports.PickOutItems = PickOutItems;
    exports.PickOutModule = PickOutModule;
    exports.PickOutService = PickOutService;
    exports.QuoteBrickModule = QuoteBrickModule;
    exports.Radar = Radar;
    exports.RadarModule = RadarModule;
    exports.RemoveBrickEvent = RemoveBrickEvent;
    exports.RemoveBricksEvent = RemoveBricksEvent;
    exports.SelectedBrickEvent = SelectedBrickEvent;
    exports.SelectionPlugin = SelectionPlugin;
    exports.SetPlanEvent = SetPlanEvent;
    exports.SpotDirective = SpotDirective;
    exports.SpotModel = SpotModel;
    exports.StartPickOut = StartPickOut;
    exports.StartWorkingEvent = StartWorkingEvent;
    exports.StopPickOut = StopPickOut;
    exports.StopWorkingEvent = StopWorkingEvent;
    exports.TOW = TOW;
    exports.TextBrickComponent = TextBrickComponent;
    exports.TextBrickModule = TextBrickModule;
    exports.TowModule = TowModule;
    exports.TowService = TowService;
    exports.TurnBrickIntoEvent = TurnBrickIntoEvent;
    exports.UNDO_REDO_API_NAME = UNDO_REDO_API_NAME;
    exports.UndoRedoPlugin = UndoRedoPlugin;
    exports.UpdateBrickStateEvent = UpdateBrickStateEvent;
    exports.VideoBrickModule = VideoBrickModule;
    exports.WALL = WALL;
    exports.WALL_FILE_UPLOADER = WALL_FILE_UPLOADER;
    exports.WallModelFactory = WallModelFactory;
    exports.WallModule = WallModule;
    exports.WallPluginInitializedEvent = WallPluginInitializedEvent;
    exports.WebBookmarkBrickModule = WebBookmarkBrickModule;
    exports.WorkInProgressEvent = WorkInProgressEvent;
    exports.ɵa = RadarCoordinator;
    exports.ɵb = PickOutCoordinator;
    exports.ɵba = WebBookmarkBrickComponent;
    exports.ɵbb = InputContextComponent$2;
    exports.ɵbc = CodeBrickComponent;
    exports.ɵbd = ModeListComponent;
    exports.ɵbe = BricksListComponent;
    exports.ɵbf = TextContextMenuComponent;
    exports.ɵc = TowSlaveDirective;
    exports.ɵd = TowCoordinator;
    exports.ɵe = PlaceholderRendererModule;
    exports.ɵf = PlaceholderComponent;
    exports.ɵg = PlaceholderRenderer;
    exports.ɵh = WallComponent;
    exports.ɵi = WallViewModel;
    exports.ɵj = WallCanvasComponent;
    exports.ɵk = WallCanvasRowComponent;
    exports.ɵl = WallCanvasBrickComponent;
    exports.ɵm = BrickInputPlaceholderComponent;
    exports.ɵn = LoadingWrapperComponent;
    exports.ɵo = DividerBrickComponent;
    exports.ɵp = ContenteditableModule;
    exports.ɵq = ContenteditableDirective;
    exports.ɵr = BaseTextBrickComponent;
    exports.ɵs = ResizableModule;
    exports.ɵt = ResizableDirective;
    exports.ɵu = ResizableHandlerComponent;
    exports.ɵv = InputContextComponent;
    exports.ɵw = ImgModel;
    exports.ɵx = QuoteBrickComponent;
    exports.ɵy = VideoBrickComponent;
    exports.ɵz = InputContextComponent$1;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-wall.umd.js.map
