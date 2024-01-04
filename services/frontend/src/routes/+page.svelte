<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import * as Tabs from "$lib/components/ui/tabs";
    import * as Table from '$lib/components/ui/table'; 
    import Button from "$lib/components/ui/button/button.svelte";
	import { ArrowDown, ArrowUp } from "radix-icons-svelte";
    import { ChevronsUpDown } from "lucide-svelte";
	import { Input } from "$lib/components/ui/input";
	import ColumnFilter from "./(components)/column-filter.svelte";
	import HeaderArea from "./(components)/header-area.svelte";

	import type { PageData } from "./$types";
    import { createSvelteTable, flexRender } from '@tanstack/svelte-table'
	import { generateColumns, defaultOptions, finalizeOptions, handleSearch, uppercaseCaseHeaderWords, generateHeader } from "$lib/utils/createTable";
    import { slide } from "svelte/transition";
	import ColumnVisibility from "./(components)/column-visibility.svelte";
	import { sineOut } from "svelte/easing";


    export let data: PageData
    const defaultColumns = generateColumns(data.assignmentsData, [{id: 'account', enableHiding: false}])
    const options = finalizeOptions(data.assignmentsData, defaultColumns, defaultOptions);
    const table = createSvelteTable(options)
    
    // Temporary function used for this demo
    function testDate(value: string) {
        const regex = new RegExp("updatedon|addedon", "i")
        return Boolean(regex.test(value.toLowerCase()))
    }
</script>

<div class="grid grid-cols-4 lg:grid-cols-5">
    <div class="col-span-4 lg:col-span-5">
        <div class="h-full px-4 py-8 lg:px-8">
            <Tabs.Root value="accounts" class="h-full space-y-6">
                <div class="space-between flex items-center">
                    <Tabs.List>
                        <Tabs.Trigger
                            value="accounts"
                            class="relative"
                        >
                            Accounts
                        </Tabs.Trigger>
                        <Tabs.Trigger 
                            value="actions"
                            disabled
                            >Actions</Tabs.Trigger
                        >
                        <Tabs.Trigger 
                            value="other"
                            disabled
                            >Other</Tabs.Trigger
                        >
                    </Tabs.List>
                </div>
                <Tabs.Content
                    value="accounts"
                    class="border-none p-0 outline-none"
                >
                    <div class="flex items-center justify-between">
                        <div class="space-y-1">
                            <h2
                                class="text-2xl font-semibold tracking-tight"
                            >
                                Accounts
                            </h2>
                            <p
                                class="text-sm text-muted-foreground"
                            >
                                By Type
                            </p>
                        </div>
                    </div>
                    <Separator class="my-4" />
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="flex flex-1 items-center space-x-2">
                                <Input
                                    placeholder="Search..."
                                    class="h-8 w-[150px] lg:w-[250px]"
                                    type="text"
                                    on:keyup={(event) => handleSearch(event, options)}
                                />
                                <ColumnVisibility
                                    storeOptions={options}
                                    {table}
                                />
                            </div>
                        </div>
                        <div class="rounded-md border">
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                    {#each $table.getAllColumns() as column}
                                        {#if column.getIsVisible()}
                                            <Table.Head class="whitespace-nowrap">
                                                <div transition:slide={{axis:"x", duration:400, easing:sineOut}}>
                                                {#if !testDate(column.id) }
                                                    <HeaderArea
                                                        {column}
                                                    >
                                                        <ColumnFilter
                                                            {column}
                                                            storeOptions={options}
                                                        />
                                                        <Button variant="ghost"
                                                                disabled={!column.getCanSort()}
                                                                on:click={column.getToggleSortingHandler()}
                                                                class="px-0.5 h-4.5 -ml-0.5"
                                                        >
                                                        {#if column.getIsSorted() === "desc"}
                                                            <ArrowDown class="h-3.5 w-3.5" />
                                                        {:else if column.getIsSorted() === "asc"}
                                                            <ArrowUp class="h-3.5 w-3.5" />
                                                        {:else}
                                                            <ChevronsUpDown class="h-3.5 w-3.5" />
                                                        {/if}
                                                        </Button>

                                                    </HeaderArea>
                                            {:else}
                                                {generateHeader(column.id, uppercaseCaseHeaderWords)}
                                            {/if}
                                            </div>
                                            </Table.Head>
                                        {/if}
                                    {/each}
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {#each $table.getRowModel().rows as row}
                                        <Table.Row>
                                            {#each row.getAllCells() as cell}
                                                {#if cell.column.getIsVisible()}
                                                    <Table.Cell class="whitespace-nowrap text-foreground">
                                                        <div transition:slide={{axis:"x", duration:400, easing:sineOut}}>
                                                        <svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
                                                        </div>
                                                    </Table.Cell>
                                                {/if}
                                            {/each}
                                        </Table.Row>
                                    {/each}
                                </Table.Body>
                            </Table.Root> 

                        </div>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </div>
</div>