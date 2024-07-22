"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const fetchWithCredentials = (url: string, options: any) => {
    return fetch(url, {
        ...options,
        credentials: 'include' as RequestCredentials,
    });
};

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetchWithCredentials('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ logusuario: username, logcontrasena: password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.redirectTo) {
                    router.push(data.redirectTo);
                }
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.error);
                alert(errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}
