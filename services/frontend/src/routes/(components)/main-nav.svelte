<script lang="ts">
	import { page } from "$app/stores";
	import { cn } from "$lib/utils";
	import { derived } from "svelte/store";

	let className: string | undefined | null = undefined;
	export { className as class };

	const currentPath = derived(page, $page => $page.url.pathname)
</script>

<nav class={cn("flex items-center space-x-4 lg:space-x-6", className)}>
	<a
		href="/"
		class="text-sm font-medium {$currentPath !== '/' ? 'text-muted-foreground':  ''} transition-colors hover:text-primary"
	>
		Assignments
	</a>

	<a
		href="/"
		class="text-sm font-medium {$currentPath !== '/placeholder' ? 'text-muted-foreground':  ''} transition-colors hover:text-primary"
	>
		Management
	</a>
</nav>
