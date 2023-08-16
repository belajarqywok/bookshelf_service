const { PrismaClient } = require('@prisma/client')


const databaseConfig = new PrismaClient()


module.exports = databaseConfig