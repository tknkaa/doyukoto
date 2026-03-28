<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { onMount } from 'svelte';

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
</script>

<button onclick={signout}> Sign out </button>
