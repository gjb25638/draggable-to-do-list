import API from '@/stores/api/task'

interface Task {
  id: number,
  title: string
}

interface stateConfig {
  taskList: Array<Task>
}

export const useTaskStore = defineStore('Task', {
  state: () : stateConfig => ({
    taskList: [
      { id: 1, title: '資源回收' },
      { id: 2, title: '掃廁所' },
      { id: 3, title: '拖地板' }
    ]
  }),
  // getters: {
  //   getBoardList: (state) => state.boardList,
  //   getBoardById: (state) => {
  //     return (boardId) => state.boardList.find((board) => board.id === boardId)
  //   }
  // },
  actions: {
    async getListByBoardId(board_id) {
      const payload = { board_id }
      const taskList = await API.getListByBoardId.get(payload)
      console.log({ taskList })

      // data.result === 200 && (this.boardList = data.data)
    },
    async getTaskById(board_id, task_id) {
      const task = await API.getTaskById.get({ board_id, task_id })
      console.log({ task })

      // data.result === 200 && (this.boardList = data.data)
    }
  }
})