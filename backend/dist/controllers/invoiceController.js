"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvoice = exports.updateInvoice = exports.createInvoice = exports.getMyInvoices = exports.getInvoiceById = exports.getInvoices = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const invoiceModel_1 = __importDefault(require("../models/invoiceModel"));
// @desc    Fetch all invoices
// @route   GET /api/invoices
// @access  Private / Admin
const getInvoices = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const invoices = yield invoiceModel_1.default.find({});
    if (invoices.length > 0) {
        res.status(200).json(invoices);
    }
    else {
        res.status(404);
        throw new Error('No invoices found');
    }
}));
exports.getInvoices = getInvoices;
// @desc Get invoice by ID
// @route GET /api/invoice/:id
// @access Private
const getInvoiceById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const invoice = yield invoiceModel_1.default.findById(req.params.id);
    if (invoice) {
        res.status(200).json(invoice);
    }
    else {
        res.status(404);
        throw new Error('Invoice not found');
    }
}));
exports.getInvoiceById = getInvoiceById;
// @desc    Get logged in users invoices
// @route   GET /api/invoices/myinvoices
// @access  Private
const getMyInvoices = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const invoices = yield invoiceModel_1.default.find({
        sender: req.user._id,
    });
    res.status(200).json(invoices);
}));
exports.getMyInvoices = getMyInvoices;
// @desc Create new invoice
// @route POST /api/invoices
// @access Private
const createInvoice = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, createdAt, paymentTerms, paymentDue, description, status, client, items, total, } = req.body;
    const invoice = new invoiceModel_1.default({
        _id,
        createdAt,
        paymentTerms,
        paymentDue,
        description,
        status,
        client: {
            name: client.name,
            email: client.email,
            address: {
                street: client.address.street,
                city: client.address.city,
                postCode: client.address.postcode,
                country: client.address.country,
            },
        },
        sender: req.user._id,
        items,
        total,
    });
    console.log(invoice);
    const createdInvoice = yield invoice.save();
    res.status(201).json(createdInvoice);
}));
exports.createInvoice = createInvoice;
// @desc Update an invoice
// @route PUT /api/invoices/:id
// @access Private
const updateInvoice = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { createdAt, paymentTerms, paymentDue, description, status, client, items, total, } = req.body;
    const invoice = yield invoiceModel_1.default.findById(req.params.id);
    if (invoice) {
        invoice.createdAt = createdAt;
        invoice.paymentTerms = paymentTerms;
        invoice.paymentDue = paymentDue;
        invoice.description = description;
        invoice.status = status;
        invoice.client = client;
        invoice.items = items;
        invoice.total = total;
        const updatedInvoice = yield invoice.save();
        res.json(updatedInvoice);
    }
    else {
        res.status(404);
        throw new Error('Invoice not found');
    }
}));
exports.updateInvoice = updateInvoice;
// @desc Delete an invoice
// @route DELETE /api/invoices/:id
// @access Private
const deleteInvoice = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    invoiceModel_1.default.findByIdAndDelete(req.params.id, (err, docs) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.status(200).json(`Invoice with id: ${docs._id} has been deleted`);
        }
    });
}));
exports.deleteInvoice = deleteInvoice;
