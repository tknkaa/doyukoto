<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	let username = $state('');
	let password = $state('');
	let errormessage = $state('');
	const signin = async () => {
		const { error } = await authClient.signIn.username({
			username,
			password
		});
		if (error) {
			if (error.message) {
				errormessage = error.message;
			} else {
				errormessage = 'Somethig went wrong';
			}
		} else {
			goto('/chat');
		}
	};
</script>

<input bind:value={username} placeholder="username" type="text" />
<input bind:value={password} placeholder="password" type="password" />
<button onclick={signin}> Sign In </button>
{#if errormessage != ''}
	<p>{errormessage}</p>
{/if}
