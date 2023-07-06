import API from '@/stores/api/board'

interface Board {
  id: string,
  title: string,
  index: number
}

interface stateConfig {
  boardList: Array<Board>
}

export const useBoardStore = defineStore('Board', {
  state: () : stateConfig => ({
    boardList: [
      // { id: '1', title: '代辦', index: 1 },
      // { id: '2', title: '完成事項', index: 2 }
    ]
  }),
  getters: {
    getList: (state): Array<Board> => state.boardList.sort((a, b) => a.index - b.index),
    getBoardById: (state): Board | any => {
      return (boardId) => state.boardList.find((board) => board.id === boardId)
    },
    getLength: (state): number | any => state.boardList.length || 0
  },
  actions: {
    async getBoardList() {
      const data = await API.list.get()
      this.boardList = data
    },
    async addBoard(data) {
      const payload = { ...data }
      await API.add.post(payload)
    },
    async updateBoard(data) {
      const payload = { ...data }
      await API.update.put(payload)
    },
    async deleteBoard(data) {
      const taskStore = useTaskStore()
      await taskStore.deleteAllByBoardId(data.id)
      const payload = { ...data }
      await API.delete.delete(payload)
    }
  }
})