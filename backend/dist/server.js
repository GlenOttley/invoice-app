"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./config/db"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve() + '/.env' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
(0, db_1.default)();
const __dirnameAlias = path_1.default.resolve();
app.use('/api/invoices', invoiceRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirnameAlias, '/uploads')));
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirnameAlias, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirnameAlias, 'frontend', 'build', 'index.html')));
}
else {
    app.get('/', (req, res) => {
        res.json('API is running...');
    });
}
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
