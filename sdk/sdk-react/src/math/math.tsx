import { add, subtract } from '@keyban/sdk-base';
import React from 'react';

/**
 * Adds two numbers
 * @param props - Takes in the object with `a` and `b` keys as numbers to be added
 * @returns The sum of the two input numbers
 * @example add(1, 2) // 3
 */
export function Add(props: { a: number; b: number }) {
	return <div>{add(props.a, props.b)}</div>;
}

/**
 * Subtracts two numbers
 * @param props - Takes in the object with `a` and `b` keys as numbers to be added
 * @returns The difference of the two input numbers
 * @example subtract(2, 1) // 1
 */
export function Substract(props: { a: number; b: number }) {
	return <div>{subtract(props.a, props.b)}</div>;
}
