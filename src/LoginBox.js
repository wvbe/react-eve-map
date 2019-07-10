import React, { useState, useMemo, useCallback } from 'react';

export default function LoginBox({ username }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUsername] = useState('test');
	const [password, setPassword] = useState('test');

	const onSubmit = useCallback(async event => {
		event.preventDefault();
		try {
			const urlSearchParams = new URLSearchParams();
			urlSearchParams.append('username', userName);
			urlSearchParams.append('password', password);
			const response = await fetch('/users/login', { method: 'POST', body: urlSearchParams });
			const json = await response.json();
			setIsLoggedIn(json.success);
		} catch (e) {
			console.log(e);
			setIsLoggedIn(false);
		}
	}, [userName, password]);

	return (
		<div>
			<h1 className="read-safety">LOGIN</h1>
			{isLoggedIn ? (
				<p>You are logged in</p>
			) : (
				<form method="post" onSubmit={onSubmit}>
					<input
						name="username"
						type="text"
						className="read-safety"
						value={userName}
						onChange={e => setUsername(e.target.value)}
					/>
					<input
						name="password"
						type="password"
						className="read-safety"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<button type="submit">Login</button>
				</form>
			)}
		</div>
	);
}
