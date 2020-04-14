import {prisma} from '../../../generated/prisma-client';

export default {
    User: {
        posts: ({ id }) => prisma.user({ id }).posts(),
        following: ({ id }) => prisma.user({ id }).following(),
        follower: ({ id }) => prisma.user({ id }).follower(),
        likes: ({ id }) => prisma.user({ id }).likes(),
        comments: ({ id }) => prisma.user({ id }).comments(),
        rooms: ({ id }) => prisma.user({ id }).rooms(),
        followingCount: ({ id }) =>
          prisma
            .usersConnection({ where: { followers_some: { id } } })
            .aggregate()
            .count(),
        followerCount: ({ id }) =>
          prisma
            .usersConnection({ where: { following_none: { id } } })
            .aggregate()
            .count(),
        fullName: parent => {
          return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async (parent, _, { request }) => {
          const { user } = request;
          const { id: parentId } = parent;
          try {
            return prisma.$exists.user({
              AND: [
                {
                  id: user.id
                },
                {
                  following_some: {
                    id: parentId
                  }
                }
              ]
            });
          } catch {
            return false;
          }
        },
        isSelf: (parent, _, { request }) => {
          const { user } = request;
          const { id: parentId } = parent;
          return user.id === parentId;
        }
      },
      Post: {
        files: ({ id }) => prisma.post({ id }).files(),
        comments: ({ id }) => prisma.post({ id }).comments(),
        user: ({ id }) => prisma.post({ id }).user(),
        likes: ({ id }) => prisma.post({ id }).likes(),
        isLiked: (parent, _, { request }) => {
          const { user } = request;
          const { id } = parent;
          return prisma.$exists.like({
            AND: [
              {
                user: {
                  id: user.id
                }
              },
              {
                post: {
                  id
                }
              }
            ]
          });
        },
        likeCount: parent =>
          prisma
            .likesConnection({
              where: { post: { id: parent.id } }
            })
            .aggregate()
            .count()
      },
      Room: {
        participants: ({ id }) => prisma.room({ id }).participants(),
        messages: ({ id }) => prisma.room({ id }).messages()
      },
      Message: {
        from: ({ id }) => prisma.message({ id }).from(),
        to: ({ id }) => prisma.message({ id }).to(),
        room: ({ id }) => prisma.message({ id }).room()
      },
      Like: {
        post: ({ id }) => prisma.like({ id }).post(),
        user: ({ id }) => prisma.like({ id }).user()
      },
      Comment: {
        user: ({ id }) => prisma.comment({ id }).user(),
        post: ({ id }) => prisma.comment({ id }).post()
      }

}