import axios from 'axios';

export type DummyJsonProduct = {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
};

export type DummyJson = {
	products: DummyJsonProduct[];
};

export const getDummyJson = async (id: string) => {
	const { data } = await axios.get<DummyJsonProduct>(`https://dummyjson.com/products/${id}`);

	return data;
};

export const getDummyJsons = async () => {
	const { data } = await axios.get<DummyJson>(`https://dummyjson.com/products`);

	return data;
};
