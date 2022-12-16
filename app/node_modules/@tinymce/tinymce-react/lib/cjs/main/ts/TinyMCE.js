"use strict";
/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTinymce = void 0;
var getTinymce = function (view) {
    var global = view;
    return global && global.tinymce ? global.tinymce : null;
};
exports.getTinymce = getTinymce;
