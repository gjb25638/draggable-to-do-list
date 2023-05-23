import API from '@/stores/api/board'

interface Board {
  id: string,
  title: string,
}

interface stateConfig {
  boardList: Array<Board>
}

export const useBoardStore = defineStore('Board', {
  state: () : stateConfig => ({
    boardList: [
      // { id: '1', title: '代辦' },
      // { id: '2', title: '完成事項' }
    ]
  }),
  getters: {
    getList: (state): Array<Board> => state.boardList,
    getBoardById: (state): Board | any => {
      return (boardId) => state.boardList.find((board) => board.id === boardId)
    },
    getLength: (state): number | any => {
      state.boardList.length
    }
  },
  actions: {
    async getBoardList() {
      const data = await API.list.get()
      this.boardList = data
    },
    async addBoard(payload) {
      const data = await API.add.post(payload)
      this.boardList = data
    }
  }
})