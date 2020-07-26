import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		toggleLike: async (_, args, { request }) => {
			console.log('### toggleList > request: ', request);
			isAuthenticated(request);
			const { postId } = args; // args: graphql에서 넘어온 인자
			const { user } = request;
			const filterOptions = {
				AND: [
					{
						user: {
							id: user.id
						}
					},
					{
						post: {
							id: postId
						}
					}
				]
			};

			try {
				const existingLike = await prisma.$exists.like(filterOptions);
				if (existingLike) {
					//TODO like있을때 지우기
					// prisma.deleteLike() //unique속성만 조건으로 사용할 수 있어 deleteManyLikes를 사용
					await prisma.deleteManyLikes(filterOptions);
				} else {
					await prisma.createLike({
						user: {
							connect: {
								id: user.id
							}
						},
						post: {
							connect: {
								id: postId
							}
						}
					});
				}
				return true;
			} catch (e) {
				return false;
			}
		}
	}
};
