export function mapAttributes(
	attributes: Array<{ trait_type: string; value: any }>
): Record<string, any> {
	return attributes.reduce((acc, attr) => {
		acc[attr.trait_type] = attr.value;
		return acc;
	}, {} as Record<string, any>);
}
