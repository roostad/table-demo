<script lang="ts">
    import { Bell } from "radix-icons-svelte";
    import { Bell as Bel } from "lucide-svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";
</script>

<div class="flex">
    <Bell class="h-6 w-6" />
    <div class="rounded-full bg-red-500 dark:bg-red-400 self-start -ml-3 h-4 w-4">
        <p class="text-background ml-[0.35rem] mt-[0.08rem] font-semibold" style="font-size:9px;">2</p>
    </div>
</div>
