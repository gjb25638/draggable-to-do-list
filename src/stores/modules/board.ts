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
      { id: '1', title: '代辦' },
      { id: '2', title: '完成事項' }
    ]
  }),
  // getters: {
  //   getBoardList: (state) => state.boardList,
  //   getBoardById: (state) => {
  //     return (boardId) => state.boardList.find((board) => board.id === boardId)
  //   }
  // },
  actions: {
    async getBoardList() {
      const data = await API.list.get()
      this.boardList = data
    }
  }
})