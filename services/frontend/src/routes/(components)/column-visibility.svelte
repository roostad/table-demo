<script lang="ts">
	import { Check, TriangleDown, TriangleUp } from "radix-icons-svelte";
	import { Filter, ListFilter } from "lucide-svelte";
	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import { Separator } from "$lib/components/ui/separator";
	import Badge from "$lib/components/ui/badge/badge.svelte";
	import type { Readable, Writable } from "svelte/store";
	import type { VisibilityState, TableOptions, Table } from "@tanstack/svelte-table";
	import { generateHeader, uppercaseCaseHeaderWords } from "$lib/utils/createTable";

	export let storeOptions: Writable<TableOptions<any>>;
	export let table: Readable<Table<any>>;
	

	let selectOptions: Record<string, string | undefined> = 
		Object.fromEntries($table.getAllColumns().filter((column) => column.getCanHide()).map((column) => [column.id, generateHeader(column.id, uppercaseCaseHeaderWords)]));
	let open: false;

	export function setColumnVisibility(columnId: string) {
		let columnVisibility: VisibilityState | undefined = $storeOptions.state?.columnVisibility;
		if (columnVisibility instanceof Object && columnId in columnVisibility) {
			columnVisibility[columnId] = !columnVisibility[columnId];
		} else return
		storeOptions.update((old) => {
			return {
				...old,
				state: {
					...old.state,
					columnVisibility: columnVisibility
				}
			};
		});
	}
	export function setColumnVisibilityAll() {
		let columnVisibility: VisibilityState | undefined = $storeOptions.state?.columnVisibility;
		if (columnVisibility instanceof Object) {
			for(const key of Object.keys(columnVisibility)) {
				columnVisibility[key] = true;
			}
		} else return
		storeOptions.update((old) => {
			return {
				...old,
				state: {
					...old.state,
					columnVisibility: columnVisibility
				}
			};
		});
	}

</script>

<Popover.Root bind:open>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			size = "sm"
			class="h-8 border-dashed"
		>
		 	{#if open}
				<TriangleUp class="h-3.5 w-3.5 mr-1"/>
		 	{:else}
				<TriangleDown class="h-3.5 w-3.5 mr-1"/>
			{/if}
			Columns
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0" align="center" side="bottom">
		<Command.Root>
			<Command.Input placeholder="Search column..." class="border-transparent focus:ring-0 focus:border-transparent h-9" />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group>
					{#each Object.entries(selectOptions) as [columnId, columnHeader]}
						<Command.Item
							value={columnId}
							onSelect={(columnId) =>
								setColumnVisibility(columnId)
							}
						>
							<div
								class={cn(
									"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
									$storeOptions.state?.columnVisibility?.[columnId]
										? "bg-primary text-primary-foreground"
										: "opacity-50 [&_svg]:invisible"
								)}
							>
								<Check className={cn("h-4 w-4")} />
							</div>
							<span>
								{columnHeader}
							</span>
						</Command.Item>
					{/each}
				</Command.Group>
				{#if !$table.getIsAllColumnsVisible()}
					<Command.Separator />
					<Command.Item
						class="justify-center text-center"
						onSelect={() => {
							setColumnVisibilityAll();
						}}
					>
						Show All Columns
					</Command.Item>
				{/if}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
