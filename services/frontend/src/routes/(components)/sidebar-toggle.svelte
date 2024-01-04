<script lang="ts">
  import { ChevronRight, ChevronLeft } from "radix-icons-svelte";
  import { Button } from "$lib/components/ui/button";
  export let show: boolean;
</script>

<Button  variant="outline" 
         size="icon" 
         class="rounded-full h-6 w-6 bg-orange-500 hover:bg-orange-400 dark:bg-blue-700 dark:hover:bg-blue-900"
         on:click>
    {#if show}
        <ChevronLeft className="h-4 w-4" height="17" width="17"/>
    {:else}
        <ChevronRight className="h-4 w-4" height="17" width="17"/>
    {/if}
</Button>
