<script lang="ts">
    export let email: any;
    export let name: string;
</script>

{#if email && name}
    <a class="text-blue-500 hover:underline dark:blue-300" href={`mailto:${email}`}>{name}</a>
{:else}
    {name}
{/if}