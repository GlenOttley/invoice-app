"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    postCode: {
        type: String,
    },
    country: {
        type: String,
    },
});
exports.default = addressSchema;
