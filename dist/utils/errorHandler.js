"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(err, res) {
    res.status(500).json({
        status: 'error',
        message: err.message ? err.message : err
    });
}
exports.default = default_1;
