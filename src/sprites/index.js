const SPRITES = {
	test: (context, WIDTH, HEIGHT, color = '#ffffff') => {
		context.fillStyle = color;
		context.strokeStyle = color;
		context.strokeRect(0.5, 0.5, WIDTH - 1, HEIGHT - 1);

		// context.beginPath();
		// context.moveTo(0, 0);
		// context.lineTo(0, HEIGHT);
		// context.lineTo(WIDTH, HEIGHT);
		// context.lineTo(WIDTH, 0);
		// context.closePath();

		const offset = 2;
		context.fillRect(offset, offset, WIDTH - 2 * offset, HEIGHT - 2 * offset);

		return context;
	},
	square: (context, WIDTH, HEIGHT, color = '#ffffff') => {
		context.fillStyle = color;
		context.fillRect(0, 0, WIDTH, HEIGHT);

		return context;
	},
	triangleUp: (context, WIDTH, HEIGHT, color = '#ffffff') => {
		const radius = Math.min(WIDTH, HEIGHT) / 2 * 1.1;
		context.fillStyle = color;
		context.beginPath();
		[ 0, 2 / 3 * Math.PI, 4 / 3 * Math.PI ]
			.map((angle) => angle + 1 / 6 * Math.PI)
			.forEach((angle, i) =>
				context[i === 0 ? 'moveTo' : 'lineTo'](
					WIDTH / 2 + radius * Math.cos(angle),
					HEIGHT / 2 + radius * Math.sin(angle)
				)
			);

		context.closePath();
		context.fill();

		return context;
	},
	triangleDown: (context, WIDTH, HEIGHT, color = '#ffffff') => {
		const radius = Math.min(WIDTH, HEIGHT) / 2 * 1.1;
		context.fillStyle = color;
		context.beginPath();
		[ 0, 2 / 3 * Math.PI, 4 / 3 * Math.PI ]
			.map((angle) => angle - 1 / 6 * Math.PI)
			.forEach((angle, i) =>
				context[i === 0 ? 'moveTo' : 'lineTo'](
					WIDTH / 2 + radius * Math.cos(angle),
					HEIGHT / 2 + radius * Math.sin(angle)
				)
			);

		context.closePath();
		context.fill();

		return context;
	},

	circle: (context, WIDTH, HEIGHT, color = '#ffffff') => {
		const radius = Math.min(WIDTH, HEIGHT) / 2 * 0.7;
		context.fillStyle = color;
		context.arc(WIDTH / 2, HEIGHT / 2, radius, 0, 2 * Math.PI, false);
		context.fill();
		return context;
	}
};
export const spriteNames = Object.keys(SPRITES);

export function getCanvas(name, WIDTH = 8, HEIGHT = 8, ...rest) {
	const sprite = SPRITES[name];
	if (!sprite) {
		throw new Error('Unknown sprite "' + name + '"');
	}

	var canvas = document.createElement('canvas');
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	var context = canvas.getContext('2d');

	context.imageSmoothingEnabled = false;

	sprite(context, WIDTH, HEIGHT, ...rest);

	return canvas;
}
