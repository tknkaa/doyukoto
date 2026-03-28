<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';

	let username = $state('');
	let password = $state('');
	let email = $state('');
	let errormessage = $state('');

	const signup = async () => {
		const { error } = await authClient.signUp.email({
			name: username,
			email,
			password,
			username
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
<input bind:value={email} placeholder="email" type="text" />
<input bind:value={password} placeholder="password" type="password" />
<button onclick={signup}> Sign In </button>
{#if errormessage != ''}
	<p>{errormessage}</p>
{/if}
