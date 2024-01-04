<!-- <slot /> -->

<script lang="ts">
	import '../app.postcss';
	import { Sun, Moon } from "radix-icons-svelte";
	import { Button } from "$lib/components/ui/button";
	import { toggleMode } from "mode-watcher";
	import {
		Sidebar,
		SidebarToggle,
		UserNav,
		DashboardMainNav,
		VersionSwitcher,
		Boop,
		Bell
	} from "./(components)";
	let show = true;
	import { slide, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>
<div class="hidden sm:block">
	<div class="flex h-screen bg-background">
		<div class="flex">
			{#if show}
				<div class="w-64 overflow-auto hidden xl:block border-r" transition:slide={{axis:'x', duration: 400, easing: quintOut}}>
					<div transition:fly={{x:-200, duration:400}}>
						<Sidebar/>
					</div>
				</div>
			{/if}
			<div class="mt-28 {show ? '-ml-3.5': 'ml-0.5'} self-start hidden xl:block">
				{#if show}
				<SidebarToggle {show} on:click={() => show = !show}/>
				{:else}
					<Boop boopParams={{ y: 8, timing: 100}}>
					<SidebarToggle {show} on:click={() => show = !show}/>
				</Boop>
				{/if}
			</div>
		</div>
		<div class="flex-1 flex flex-col">
			<div class="flex h-16 items-center px-4 xl:pl-8 bg-background">
				<VersionSwitcher />
				<DashboardMainNav class="mx-6" />
				<div class="ml-auto flex items-center space-x-4">
					<!-- <Search /> -->
					<Button on:click={toggleMode} variant="ghost" size="icon">
						<Sun
							class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
						/>
						<Moon
							class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
						/>
						<span class="sr-only">Toggle theme</span>
					</Button>
					<Boop boopParams={{ rotation: 20, timing: 200}}>
						<Bell />
					</Boop>
					<UserNav/>
				</div>
			</div>
			<div class="flex-1 overflow-auto">
				<slot/>
			</div>
		</div>
	</div>
</div>