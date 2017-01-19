type Greeter = (name: string) => string;

export const sayHello: Greeter =
	(name: string) => `Hello, ${name}!`;

export function add(x: number, y: number) {
	return x + y;
}
