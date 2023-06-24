export interface Pageable {
    offset: number;
    size: number;
}

export interface PageableAndSortable extends Pageable {
    sortBy: string;
    desc: boolean;
}

export interface Page<T> {
    content: Array<T>,
    size: number;
    total: number;
}