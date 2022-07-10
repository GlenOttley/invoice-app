"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invoices = [
    {
        _id: 'RT3080',
        createdAt: new Date('2021-08-18'),
        paymentDue: new Date('2021-08-19'),
        description: 'Re-branding',
        paymentTerms: 1,
        status: 'paid',
        client: {
            name: 'Jensen Huang',
            email: 'jensenh@mail.com',
            address: {
                street: '106 Kendell Street',
                city: 'Sharrington',
                postCode: 'NR24 5WQ',
                country: 'United Kingdom',
            },
        },
        sender: '61f5c55a8b500566a94331ae',
        items: [
            {
                name: 'Brand Guidelines',
                quantity: 1,
                price: 1800.9,
                total: 1800.9,
            },
        ],
        total: 1800.9,
    },
    {
        _id: 'XM9141',
        createdAt: new Date('2021-08-21'),
        paymentDue: new Date('2021-09-20'),
        description: 'Graphic Design',
        paymentTerms: 30,
        status: 'pending',
        client: {
            name: 'Alex Grim',
            email: 'alexgrim@mail.com',
            address: {
                street: '84 Church Way',
                city: 'Bradford',
                postCode: 'BD1 9PB',
                country: 'United Kingdom',
            },
        },
        sender: '61f5c55a8b500566a94331ae',
        items: [
            {
                name: 'Banner Design',
                quantity: 1,
                price: 156.0,
                total: 156.0,
            },
            {
                name: 'Email Design',
                quantity: 2,
                price: 200.0,
                total: 400.0,
            },
        ],
        total: 556.0,
    },
    {
        _id: 'RG0314',
        createdAt: new Date('2021-09-24'),
        paymentDue: new Date('2021-10-01'),
        description: 'Website Redesign',
        paymentTerms: 7,
        status: 'paid',
        client: {
            name: 'John Morrison',
            email: 'jm@myco.com',
            address: {
                street: '79 Dover Road',
                city: 'Westhall',
                postCode: 'IP19 3PF',
                country: 'United Kingdom',
            },
        },
        sender: '61f5c55a8b500566a94331ae',
        items: [
            {
                name: 'Website Redesign',
                quantity: 1,
                price: 14002.33,
                total: 14002.33,
            },
        ],
        total: 14002.33,
    },
    {
        _id: 'RT2080',
        createdAt: new Date('2021-10-11'),
        paymentDue: new Date('2021-10-12'),
        description: 'Logo Concept',
        paymentTerms: 1,
        status: 'pending',
        client: {
            name: 'Alysa Werner',
            email: 'alysa@email.co.uk',
            address: {
                street: '63 Warwick Road',
                city: 'Carlisle',
                postCode: 'CA20 2TG',
                country: 'United Kingdom',
            },
        },
        sender: '61f5c55a8b500566a94331ae',
        items: [
            {
                name: 'Logo Sketches',
                quantity: 1,
                price: 102.04,
                total: 102.04,
            },
        ],
        total: 102.04,
    },
    {
        _id: 'AA1449',
        createdAt: new Date('2021-10-7'),
        paymentDue: new Date('2021-10-14'),
        description: 'Re-branding',
        paymentTerms: 7,
        status: 'pending',
        client: {
            name: 'Mellisa Clarke',
            email: 'mellisa.clarke@example.com',
            address: {
                street: '46 Abbey Row',
                city: 'Cambridge',
                postCode: 'CB5 6EG',
                country: 'United Kingdom',
            },
        },
        sender: '61f5c55a8b500566a94331ae',
        items: [
            {
                name: 'New Logo',
                quantity: 1,
                price: 1532.33,
                total: 1532.33,
            },
            {
                name: 'Brand Guidelines',
                quantity: 1,
                price: 2500.0,
                total: 2500.0,
            },
        ],
        total: 4032.33,
    },
    {
        _id: 'TY9141',
        createdAt: new Date('2021-10-01'),
        paymentDue: new Date('2021-10-31'),
        description: 'Landing Page Design',
        paymentTerms: 30,
        status: 'pending',
        client: {
            name: 'Thomas Wayne',
            email: 'thomas@dc.com',
            address: {
                street: '3964  Queens Lane',
                city: 'Gotham',
                postCode: '60457',
                country: 'United States of America',
            },
        },
        sender: '61f5c55a8b500566a94331ae',
        items: [
            {
                name: 'Web Design',
                quantity: 1,
                price: 6155.91,
                total: 6155.91,
            },
        ],
        total: 6155.91,
    },
    {
        _id: 'FV2353',
        createdAt: new Date('2021-11-05'),
        paymentDue: new Date('2021-11-12'),
        description: 'Logo Re-design',
        paymentTerms: 7,
        status: 'draft',
        client: {
            name: 'Anita Wainwright',
            email: '',
            address: {
                street: '',
                city: '',
                postCode: '',
                country: '',
            },
        },
        sender: '61f5c55a8b500566a94331ae',
        items: [
            {
                name: 'Logo Re-design',
                quantity: 1,
                price: 3102.04,
                total: 3102.04,
            },
        ],
        total: 3102.04,
    },
];
exports.default = invoices;
