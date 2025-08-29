import { fetchSSR } from '@/app/_global/libs/utils'
import type { BoardDataType } from '../_types/BoardType'

export async function deleteData(seq: number): Promise<BoardDataType | void> {
    const res = await fetchSSR(`/board/delete/${seq}`, {
        method: 'DELETE',
    })
    
    if (res.status === 200) {
        return await res.json()
    }
}
