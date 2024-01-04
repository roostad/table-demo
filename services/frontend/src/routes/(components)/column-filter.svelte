<script lang="ts">
	import { Check } from "radix-icons-svelte";
	import { Filter, ListFilter } from "lucide-svelte";
	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import type { Writable } from "svelte/store";
	import type { Column, ColumnFilter, ColumnFiltersState, TableOptions } from "@tanstack/svelte-table";
	import { getContext } from "svelte";

	export let column: Column<any, unknown>;
	export let storeOptions: Writable<TableOptions<any>>;

	let columnId: string = column.id;
	let selectOptions: Writable<string[]> = getContext("selectOptions");
	let open: Writable<boolean> = getContext("open");
	let filterValues: Writable<string[]> = getContext("filterValues");
	let filterValue: string;

	export function setColumnFilter(columnId: string, filterValue: string) {
		let columnFilters = $storeOptions.state?.columnFilters;
		if (filterValue === "") {
			storeOptions.update((old) => {
				return {
					...old,
					state: {
						...old.state,
						columnFilters: columnFilters?.filter(colFilter => colFilter.id != columnId)
					}
				}
				}
			);
			return
		}
		let newColFilter: ColumnFilter = {
			id: columnId,
			value: filterValue
		}
		storeOptions.update((old) => {
			let found = old.state?.columnFilters?.some(obj => obj.id === columnId);
			if (found) {
				return {
					...old,
					state: {
						...old.state,
						columnFilters: columnFilters?.map(colFilter => colFilter.id === columnId ? newColFilter: colFilter)
					}
				};
			} else {
				return {
					...old,
					state: {
						...old.state,
						columnFilters: [...columnFilters as ColumnFiltersState, newColFilter]
					}
				}
			}
		});
	}


	export function handleSelect(currentValue: string) {
		if (
			Array.isArray($filterValues) &&
			$filterValues.includes(currentValue)
		) {
			$filterValues = $filterValues.filter((v) => v !== currentValue);
		} else {
			$filterValues = [
				...(Array.isArray($filterValues) ? $filterValues : []),
				currentValue
			];
		}

		if ($filterValues.length > 0) {
			filterValue = $filterValues.join("|");
			setColumnFilter(columnId, filterValue);
		} else {
			setColumnFilter(columnId, "");
		}
	}

	function blanks(option:string) {
		if (option === "") {
			return "(Blanks)"
		} else return option 
	}

</script>

<Popover.Root bind:open={$open}>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			class="px-0.5 h-4.5 ml-0.5"
		>
			{#if $filterValues.length > 0}
			<ListFilter class="h-3.5 w-3.5"/>
			{:else}
			<Filter class="h-3.5 w-3.5"/>
			{/if}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0" align="center" side="bottom">
		<Command.Root>
			<Command.Input placeholder="Search column..." class="border-transparent focus:ring-0 focus:border-transparent h-9" />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group>
					{#each $selectOptions as option}
						<Command.Item
							value={blanks(option)}
							onSelect={(value) =>
								handleSelect(value)
							}
						>
							<div
								class={cn(
									"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
									$filterValues.includes(blanks(option))
										? "bg-primary text-primary-foreground"
										: "opacity-50 [&_svg]:invisible"
								)}
							>
								<Check className={cn("h-4 w-4")} />
							</div>
							<span>
								{blanks(option)}
							</span>
						</Command.Item>
					{/each}
				</Command.Group>
				{#if $filterValues.length > 0}
					<Command.Separator />
					<Command.Item
						class="justify-center text-center"
						onSelect={() => {
							$filterValues = [];
							setColumnFilter(columnId, "");
						}}
					>
						Clear filters
					</Command.Item>
				{/if}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
