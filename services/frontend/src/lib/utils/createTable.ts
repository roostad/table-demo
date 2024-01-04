import {
		getCoreRowModel,
		getSortedRowModel,
		getFilteredRowModel,
		getFacetedRowModel,
		getFacetedUniqueValues,
		getFacetedMinMaxValues,
		type FilterFn,
        type CellContext,
        type ColumnDef,
		renderComponent,
        type TableOptions,
        type ColumnFiltersState,
        type ColumnFilter,
        type VisibilityState,
        type ColumnPinningState,
	} from '@tanstack/svelte-table';
import EmailLink from "./email-link.svelte";
import { writable, type Writable } from 'svelte/store';

type DataType = {
    [key: string]: any;
}

type CustomColumnDef<T extends DataType> = Partial<ColumnDef<T, keyof T>> & {
    id: string;
};

export const uppercaseCaseHeaderWords: String[] = [];

export function generateHeader(key: String, words: String[]) {
    let header = key.charAt(0).toUpperCase() + key.slice(1);
    header = header.replace(/([A-Z])/g, ' $&');
    const regex = new RegExp('\\b(' + words.join('|') + ')\\b', 'gi');

    return header.replace(regex, (match) => match.toUpperCase());
}

export function generateCell<T extends DataType>(info: CellContext<T, keyof T>, key: String) {
    const cellValue = info.getValue();
    if (cellValue !== null && cellValue !== undefined) {
        const emailColumn = info.row.getAllCells().find((cell) => cell.column.id === key + "Email");
        if (emailColumn) {
            return renderComponent(EmailLink, { email: emailColumn.getValue(), name: cellValue.toString().replace(",", ", ")})
        } else return cellValue.toString().replace(",", ", ") 
    } 

    return "".toString()
}


export const generateColumns = <T extends DataType>(
    data: T[],
    customColumns: CustomColumnDef<T>[] = []
): ColumnDef<T, keyof T>[] => {
    if (data.length === 0) return [];

    const findNonNullValueInColumn = <T extends DataType>(
        data: T[],
        columnKey: keyof T   
    ): T[keyof T] | null => {
        for (let row of data) {
            const value = row[columnKey];
            if (value !== null) {
                return value;
            } 
        }
        return null;
    }
    
    const generatedColumns: ColumnDef<T, keyof T>[] = Object.keys(data[0]).map(
        key => {
            const sampleValue: any = findNonNullValueInColumn(data, key as keyof T);

            if (typeof sampleValue === "number") {
                return {
                    accessorFn: row => (row[key as keyof T] ? row[key as keyof T] : "") as string,
                    id: key,
                    cell: info => info.getValue() === null ? "" : `$${(info.getValue() as number).toFixed(2)}`,
                    header: () => generateHeader(key, uppercaseCaseHeaderWords),
                    filterFn: globalFilterFn
                };
            } else if (sampleValue instanceof Date) {
                return {
                    accessorFn: row => (row[key as keyof T] ? row[key as keyof T] : "") as string,
                    id: key,
                    cell: info => info.getValue() === null ? "" : new Date(info.getValue() as string).toLocaleString(),
                    header: () => generateHeader(key, uppercaseCaseHeaderWords),
                    filterFn: globalFilterFn
                };
            } else if (typeof sampleValue === "boolean") {
                return {
                    accessorFn: row => row[key as keyof T] === null ? "": row[key as keyof T] ? "Yes": "No"  as string,
                    id: key,
                    header: () => generateHeader(key, uppercaseCaseHeaderWords),
                    filterFn: globalFilterFn
                };
            } else {
                return {
                    accessorFn: row => (row[key as keyof T] ? row[key as keyof T] : "") as string,
                    id: key,
                    cell: (info) => generateCell(info, key),
                    header: () => generateHeader(key, uppercaseCaseHeaderWords),
                    filterFn: globalFilterFn
                };
            }
        }
    )

    const columnsWithCustomizations = generatedColumns.map(col => {
        const customColumn = customColumns.find(c => c.id === col.id)
        if (customColumn) {
            return { ...col, ...customColumn };
        }
        return col;
    })

    return columnsWithCustomizations;
}

let globalFilter = '';

function setGlobalFilter<T extends DataType>(filter: string, options: Writable<TableOptions<T>>) {
    globalFilter = filter;
    options.update((old) => {
        return {
            ...old,
            state: {
                ...old.state,
                globalFilter: filter
            }
        };
    });
}
let timer: NodeJS.Timeout;
export function handleSearch <T extends DataType>(e: Event, options: Writable<TableOptions<T>>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        const target = e.target as HTMLInputElement;
        setGlobalFilter(target.value, options);
    }, 300);
}
export const noTypeCheck = (x: any) => x;

export const customSort = (a: number | any, b: number | any) => {
    if (a === "") {
        return 1;
    }
    if (b === "") {
        return -1;
    }
    return a - b;
}

export const globalFilterFn: FilterFn<any> = (row, columnId, value, addMeta) => {

    // Filter out Non-Visible columns
    if (!Boolean(row.getVisibleCells().find(element => element.column.id === columnId))) {
        return false;
    }

    let rowValue = row.getValue(columnId);
    const regex = new RegExp(value.toString().toLowerCase(), "i");

    // Search arrays
    if (Array.isArray(rowValue)) {
        if (rowValue.length === 0) return false;
        return Boolean(
            rowValue
            .find(
                element => regex.test(element.toString().toLowerCase())));
    }


    if (typeof rowValue === "string") {
        if (rowValue === "") {
            rowValue = "(Blanks)";
        }
        return Boolean(
            regex.test((rowValue as string).toLowerCase())
        )
    } else return false

};

let columnFilters: ColumnFiltersState = [];

	export function setColumnFilter<T extends DataType>(columnId: string, filterValue: string, options: Writable<TableOptions<T>>) {
		let newColFilter: ColumnFilter = {
			id: columnId,
			value: filterValue
		}
		options.update((old) => {
			let found = old.state?.columnFilters?.some(obj => obj.id === columnId);
			if (found) {
				return {
					...old,
					state: {
						...old.state,
						columnFilters: columnFilters.map(colFilter => colFilter.id === columnId ? newColFilter: colFilter)
					}
				};
			} else {
				return {
					...old,
					state: {
						...old.state,
						columnFilters: [...columnFilters, newColFilter]
					}
				}
			}
		});
	}
export const defaultOptions = {
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFn,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableGlobalFilter: true,
    enablePinning: true,
}


const defaultHideWords = ["Email", "UpdatedOn", "UpdatedBy", "AddedOn"];
export const finalizeOptions = <T extends DataType>(
    data: T[],
    columns: ColumnDef<T, keyof T>[],
    defaultOptions: Object, 
    additionalOptions?: Object
): Writable<TableOptions<T>> => {
    const columnVisibility: VisibilityState = columns.reduce<DataType>((colVis, column) => {
        if (typeof column.id === 'string') {
            colVis[column.id as string] = !defaultHideWords.some(value => column.id?.includes(value)) 
        }    
        return colVis
    }, {})
    let columnPinning: ColumnPinningState = {};
    if (typeof columns[0].id === "string") {
        columnPinning = {left: [columns[0].id]};
    } 
    return writable<TableOptions<T>>({
        ...defaultOptions,
        data,
        columns,
        state: {
            globalFilter,
            columnFilters,
            columnVisibility,
            columnPinning
        },
        ...(additionalOptions ? additionalOptions : {})
    } as unknown as TableOptions<T>);
}


