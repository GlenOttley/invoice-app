"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clientSchema_1 = __importDefault(require("../schemas/clientSchema"));
const itemSchema_1 = __importDefault(require("../schemas/itemSchema"));
const invoiceSchema = new mongoose_1.Schema({
    _id: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    paymentTerms: {
        type: Number,
    },
    paymentDue: {
        type: Date,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },
    client: clientSchema_1.default,
    sender: {
        type: String,
        ref: 'User',
    },
    items: [itemSchema_1.default],
    total: {
        type: Number,
    },
});
exports.default = (0, mongoose_1.model)('Invoice', invoiceSchema);
