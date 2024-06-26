import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (evt) => {
	const gifts = await prismaClient.gift.findMany({});

	return { gifts };
};
