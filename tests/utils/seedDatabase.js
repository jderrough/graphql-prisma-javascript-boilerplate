import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
    input: {
        name: 'Test 1',
        email: 'test1@example.com',
        password: bcrypt.hashSync('thisisatest1')
    },
    unhashedPassword: 'thisisatest1',
    user: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: 'Test 2',
        email: 'test2@example.com',
        password: bcrypt.hashSync('thisisatest2')
    },
    user: undefined,
    jwt: undefined
}

const seedDatabase = async () => {
    // Delete test database
    await prisma.mutation.deleteManyUsers()

    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

    // Create user two
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })
    userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)
}

export { seedDatabase as default, userOne, userTwo }