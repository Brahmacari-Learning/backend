import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const discussion = await prismaClient.discussion.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			title: true,
			body: true,
			likesCount: true,
			repliesCount: true,
			createdAt: true,
			creator: {
				select: {
					name: true
				}
			},
			replies: {
				orderBy: {
					createdAt: 'asc'
				},
				where: {
					discussionReplyId: null // top level
				},
				select: {
					id: true,
					reply: true,
					creator: {
						select: {
							name: true
						}
					},
					likesCount: true,
					createdAt: true,
					replies: {
						orderBy: {
							createdAt: 'asc'
						},
						select: {
							id: true,
							likesCount: true,
							reply: true,
							createdAt: true,
							creator: {
								select: {
									name: true
								}
							}
						}
					}
				}
			}
		}
	});

	if (!discussion) {
		return json({
			error: true,
			message: 'Discussion not found'
		});
	}

	return json({
		discussion,
		error: false
	});
};
