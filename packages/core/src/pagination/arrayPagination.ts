import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { RefTyped } from '../utils'
import { wrap } from '../utils'
import type { PaginationOptions, PaginationResult } from './pagination'
import { usePagination } from './pagination'

export interface ArrayPaginationResult<T extends Array<any>>
  extends PaginationResult {
  result: ComputedRef<T>
}

export function useArrayPagination<T extends Array<TR>, TR>(
  array: RefTyped<T>,
  options?: Partial<Omit<PaginationOptions, 'total'>>
): ArrayPaginationResult<T>
export function useArrayPagination<T extends Array<any>>(
  array: RefTyped<T>,
  options?: Partial<Omit<PaginationOptions, 'total'>>,
): ArrayPaginationResult<T> {
  const arrayRef = wrap(array)

  const pagination = usePagination({
    ...{
      currentPage: 1,
      pageSize: 10,
    },
    ...options,
    total: computed(() => arrayRef.value.length),
  })

  const result = computed(() => {
    const array = arrayRef.value
    if (!Array.isArray(array))
      return []
    return array.slice(
      pagination.offset.value,
      pagination.offset.value + pagination.pageSize.value,
    )
  }) as ComputedRef<T>

  return {
    ...pagination,
    result,
  }
}
