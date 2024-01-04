<script lang="ts">
	import { cn } from "$lib/utils";
	import { Button } from "$lib/components/ui/button";
	import * as Avatar from "$lib/components/ui/avatar";
	import AvatarPic from "$lib/static/images/avatar.svg";
	import LogoBlack from "$lib/static/images/logo_black.svg";
	import LogoWhite from "$lib/static/images/logo_white.svg";
	import { User, Users, UserCheck, FileLineChart, ListChecks } from "lucide-svelte";

	let className: string | null | undefined = undefined;
	export { className as class };
</script>
<div class={cn("pb-12 flex flex-col min-h-screen", className)}>
	<div class="flex-1 space-y-4 py-4">
		<div class="flex justify-center gap-2 pb-2">
			<img src={LogoBlack} alt="" class="dark:hidden">
			<img src={LogoWhite} alt="" class="hidden dark:block">
		</div>
		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
				Modules
			</h2>
			<div class="space-y-1">
				<Button variant="ghost" class="w-full justify-start">
					<ListChecks class="mr-2 h-4 w-4"/>
					Monthly Reviews
				</Button>
				<Button variant="ghost" class="w-full justify-start">
					<UserCheck class="mr-2 h-4 w-4"/>
					Access Requests
				</Button>
				<Button variant="ghost" class="w-full justify-start">
					<FileLineChart class="mr-2 h-4 w-4"/>
					Financial Reporting
				</Button>
			</div>
		</div>
		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
				General
			</h2>
			<div class="space-y-1">
				<Button variant="secondary" class="w-full justify-start">
					<Users class="mr-2 h-4 w-4"/>
					Accounts
				</Button>
				<Button variant="ghost" class="w-full justify-start">
					<User class="mr-2 h-4 w-4"/>
					Profile
				</Button>
			</div>
		</div>
	</div>
	<div class="space-y-4 py-4">
		<div class="px-3 py-2">
			<Button variant="ghost" class="w-full justify-start">
				<Avatar.Root class="mr-2 h-6 w-6">
					<Avatar.Image src={AvatarPic} alt="@jbruin" />
					<Avatar.Fallback>JB</Avatar.Fallback>
				</Avatar.Root>
				Log Out
			</Button>
			<div class="mt-auto border-t mx-2"></div>
		</div>
	</div>
</div>
