<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	onMount(async () => {
		const { data: session } = await authClient.getSession();
		if (!session) {
			goto('/login');
		} else {
			console.log(session);
		}
	});

	const signout = async () => {
		await authClient.signOut();
		goto('/');
	};

	let { data }: { data: PageData } = $props();
</script>

<button onclick={signout}> Sign out </button>

<h2>Rooms</h2>
{#each data.rooms as room}
	<div>{room.rooms.id}</div>
{/each}

<h2>Users</h2>
{#each data.users as user}
	<div>{user.name}</div>
{/each}
