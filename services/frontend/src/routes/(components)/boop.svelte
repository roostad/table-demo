<script lang="ts">
	import boop from './boop.js';
	export let boopParams: any;
	let isBooped = false;
	
	// Is there a more Svelte-y way to do this?
	function setIsBooped(val: any) {
		isBooped = val;
	}
	
	function triggerBoop() {
		isBooped = true;
	}
</script>

<!-- trigger onclick so demo works on mobile -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span on:mouseenter={triggerBoop} use:boop={{isBooped, ...boopParams, setter: setIsBooped}}>
	<slot/>
</span>