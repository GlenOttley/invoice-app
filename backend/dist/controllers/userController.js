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
exports.deleteUser = exports.createUser = exports.updateUser = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const mongoose_1 = require("mongoose");
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            image: user.image,
            address: user.address,
            email: user.email,
            token: (0, generateToken_1.default)(user._id),
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
}));
exports.authUser = authUser;
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.address = {
            street: req.body.address.street || user.address.street,
            city: req.body.address.city || user.address.city,
            postCode: req.body.address.postCode || user.address.postCode,
            country: req.body.address.country || user.address.country,
        };
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = yield user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            image: updatedUser.image,
            address: updatedUser.address,
            email: updatedUser.email,
            token: (0, generateToken_1.default)(updatedUser._id),
        });
    }
    else {
        res.status(401);
        throw new Error('User information not found in database');
    }
}));
exports.updateUser = updateUser;
// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, address } = req.body;
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('Email address already in use');
    }
    const user = yield userModel_1.default.create({
        _id: new mongoose_1.Types.ObjectId(),
        name,
        email,
        password,
        address,
        image: req.body.image || '',
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            image: user.image,
            token: (0, generateToken_1.default)(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));
exports.createUser = createUser;
// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userModel_1.default.findByIdAndDelete(req.params.id, (err, docs) => {
        if (err) {
            res.status(404).json('User not found');
        }
        else {
            res.status(200).json(`User with id: ${docs._id} has been deleted`);
        }
    });
}));
exports.deleteUser = deleteUser;
