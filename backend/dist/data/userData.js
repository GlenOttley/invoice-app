"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users = [
    {
        _id: '61f5c55a8b500566a94331ae',
        name: 'Peninnah Arnold',
        email: 'peninnaharnold@mail.com',
        address: {
            street: '19 Union Terrace',
            city: 'London',
            postCode: 'E1 3EZ',
            country: 'United Kingdom',
        },
        password: bcryptjs_1.default.hashSync('123456', 10),
        image: '/assets/images/image-avatar.jpg',
        invoices: [
            'RT3080',
            'XM9141',
            'RG0314',
            'RT2080',
            'AA1449',
            'TY9141',
            'FV2353',
        ],
    },
    {
        _id: '61f5c55a8b500566a94331af',
        name: 'John Doe',
        email: 'johndoe@mail.com',
        address: {
            street: '254 Front St',
            city: 'New York',
            postCode: '10038',
            country: 'US',
        },
        password: bcryptjs_1.default.hashSync('123456', 10),
        image: '/assets/images/image-avatar.jpg',
        invoices: ['TY9141', 'FV2353'],
    },
];
exports.default = users;
