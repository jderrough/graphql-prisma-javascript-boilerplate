import getUserId from '../utils/getUserId'

const Query = {
    users(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
        const opArgs = {
            first,
            skip,
            after,
            orderBy
        }

        if (query) {
            opArgs.where = { name_contains: query }
        }

        return prisma.query.users(opArgs, info)
    },
    async me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const userExists = await prisma.exists.User({ id: userId })
        if (!userExists) throw new Error('User not found')

        return await prisma.query.user({ where: { id: userId } }, info)
    }
}

export { Query as default }