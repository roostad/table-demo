<script lang="ts">
	import { Calendar, CaretSort, Check, PlusCircled } from "radix-icons-svelte";
	import { cn } from "$lib/utils";
	import { Button } from "$lib/components/ui/button";
	import * as Command from "$lib/components/ui/command";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Popover from "$lib/components/ui/popover";
	import * as Select from "$lib/components/ui/select";
	import { tick } from "svelte";

	let className: string | undefined | null = undefined;
	export { className as class };

	const groups = [
		{
			LYM: [
				{
					label: "202311",
					value: "202311"
				},
				{
					label: "202310",
					value: "202310"
				},
				{
					label: "202309",
					value: "202309"
				},
				{
					label: "202308",
					value: "202308"
				},
			]
		}
	];

	type Version = (typeof groups)[number]["LYM"][number];

	let open = false;
	let showVersionDialog = false;

	let selectedVersion: Version = groups[0].LYM[0];

	function closeAndRefocusTrigger(triggerId: string) {
		open = false;

		tick().then(() => document.getElementById(triggerId)?.focus());
	}
</script>

<Dialog.Root bind:open={showVersionDialog}>
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				aria-label="Select a LYM"
				class={cn("w-[200px] justify-between", className)}
			>
				<Calendar class="mr-2 h-5 w-5 opacity-50"/>
				{selectedVersion.label}
				<CaretSort class="ml-auto h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-[200px] p-0">
			<Command.Root>
				<Command.List>
					<Command.Input placeholder="Search Month..." class="border-transparent focus:ring-0 focus:border-transparent h-9" />
					<Command.Empty>No LYM found.</Command.Empty>
					{#each groups as group}
						<Command.Group heading={group.label}>
							{#each group.LYM as version}
								<Command.Item
									onSelect={() => {
										selectedVersion = version;
										closeAndRefocusTrigger(ids.trigger);
									}}
									value={version.label}
									class="text-sm"
								>
									{version.label}
									<Check
										class={cn(
											"ml-auto h-4 w-4",
											selectedVersion.value !== version.value &&
												"text-transparent"
										)}
									/>
								</Command.Item>
							{/each}
						</Command.Group>
					{/each}
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create version</Dialog.Title>
			<Dialog.Description>
				Add a new version.
			</Dialog.Description>
		</Dialog.Header>
		<div>
			<div class="space-y-4 py-2 pb-4">
				<div class="space-y-2">
					<Label for="name">Version name</Label>
					<Input id="name" placeholder="Acme Inc." />
				</div>
				<div class="space-y-2">
					<Label for="plan">Subscription plan</Label>
					<Select.Root>
						<Select.Trigger>
							<Select.Value placeholder="Select a plan" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="free">
								<span class="font-medium">Free </span>-<span
									class="text-muted-foreground"
								>
									Trial for two weeks
								</span>
							</Select.Item>
							<Select.Item value="pro">
								<span class="font-medium">Pro</span> -
								<span class="text-muted-foreground">
									$9/month per user
								</span>
							</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</div>
		<Dialog.Footer>
			<Button variant="outline" on:click={() => (showVersionDialog = false)}>
				Cancel
			</Button>
			<Button type="submit">Continue</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
