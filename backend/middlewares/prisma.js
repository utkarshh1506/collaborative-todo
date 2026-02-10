const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
const crypto = require('crypto');

function generateUID(length = 8) {
    return crypto.randomBytes(length).toString('hex').toUpperCase().slice(0, length);
}

prisma.$use(async (params, next) => {
    if (params.action === 'create') {
        params.args.data.uid = generateUID();
    }
    return next(params);
});

module.exports = prisma;