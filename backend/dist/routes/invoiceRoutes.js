"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoiceController_1 = require("../controllers/invoiceController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/').get(invoiceController_1.getInvoices).post(authMiddleware_1.protect, invoiceController_1.createInvoice);
router.route('/myinvoices').get(authMiddleware_1.protect, invoiceController_1.getMyInvoices);
router
    .route('/:id')
    .get(authMiddleware_1.protect, invoiceController_1.getInvoiceById)
    .put(authMiddleware_1.protect, invoiceController_1.updateInvoice)
    .delete(authMiddleware_1.protect, invoiceController_1.deleteInvoice);
exports.default = router;
