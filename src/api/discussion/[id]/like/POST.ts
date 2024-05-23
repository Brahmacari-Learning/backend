import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Input = z.object({
	like: z.boolean()
});

export const Param = z.object({
	id: z.number()
});

export const Output = z.object({
	like: z.boolean(),
	error: z.boolean({ description: 'True jika error' })
});

export const Error = {};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Diskusi'];
	r.summary = 'Like Diskusi';
	r.description = 'Menyukai diskusi';
	return r;
};

// @ts-ignore
export default new Endpoint({ Input, Output, Error, Modifier, Param }).handle(async (body) => {
	return new Response();
});