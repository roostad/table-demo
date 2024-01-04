<script lang="ts">
	import type { Column } from "@tanstack/svelte-table";
	import { quintInOut, quintOut, sineOut } from "svelte/easing";
	import { fade, fly, slide } from "svelte/transition";
    import { ArrowDownWideNarrow, ArrowUpWideNarrow, ListFilter } from "lucide-svelte";
	import { ArrowDown, ArrowUp } from "radix-icons-svelte";
    import Button from "$lib/components/ui/button/button.svelte";
	import { getContext, setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";
	import { customSort, generateHeader, uppercaseCaseHeaderWords } from "$lib/utils/createTable";

	export let column: Column<any, unknown>;

    let stayOpen = writable(false);
    let filterValues = writable([]);
	let selectOptions = writable(Array.from(column.getFacetedUniqueValues().keys()).sort(customSort)); 
    let hover = false;

    setContext("open", stayOpen);
    setContext("filterValues", filterValues);
    setContext("selectOptions", selectOptions);

    function updateSelect() {
        if (!column.getIsFiltered()) {
            $selectOptions = Array.from(column.getFacetedUniqueValues().keys()).sort(customSort);
        }
    }


</script>
    <div on:mouseenter={() => {
        updateSelect();
        hover = true;
        }}
        on:mouseleave={() => hover = false}
        role="presentation"
        class="flex items-center">
        {generateHeader(column.id, uppercaseCaseHeaderWords)}
        <div class="inline-block h-8 w-8">
            {#if hover || $stayOpen}
                <slot />
            {:else if column.getIsSorted() === "desc" && column.getIsFiltered()}
                <Button variant="ghost"
			            class="px-0.5 h-4.5 ml-0.5"
                >
                <ArrowDownWideNarrow class="h-3.5 w-3.5" />
                </Button>
            {:else if column.getIsSorted() === "asc" && column.getIsFiltered()}
                <Button variant="ghost"
			            class="px-0.5 h-4.5 ml-0.5"
                >
                <ArrowUpWideNarrow class="h-3.5 w-3.5" />
                </Button>
            {:else if column.getIsSorted() === "desc"}
                <Button variant="ghost"
			            class="px-0.5 h-4.5 ml-0.5"
                >
                <ArrowDown class="h-3.5 w-3.5" />
                </Button>
            {:else if column.getIsSorted() === "asc"}
                <Button variant="ghost"
			            class="px-0.5 h-4.5 ml-0.5"
                >
                <ArrowUp class="h-3.5 w-3.5" />
                </Button>
            {:else if column.getIsFiltered()}
                <Button variant="ghost"
			            class="px-0.5 h-4.5 ml-0.5"
                >
                <ListFilter class="h-3.5 w-3.5" />
                </Button>
            {/if}
        </div>
    </div>