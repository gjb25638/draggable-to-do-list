import API from '@/stores/api/task'

interface Task {
  boardId: string,
  id: string,
  title: string
}

interface stateConfig {
  taskList: Array<Task>
}

export const useTaskStore = defineStore('Task', {
  state: () : stateConfig => ({
    taskList: [
      // { boardId: '1', id: '1', title: '資源回收' },
      // { boardId: '1', id: '2', title: '掃廁所' },
      // { boardId: '1', id: '3', title: '拖地板' }
    ],
  }),
  getters: {
    getTasksByBoardId: (state) => (board_id) => state.taskList.filter(task => task.boardId === board_id)
    // getBoardList: (state) => state.boardList,
    // getBoardById: (state) => {
    //   return (boardId) => state.boardList.find((board) => board.id === boardId)
    // }
  },
  actions: {
    async getTaskListByBoardId(board_id) {
      const payload = { board_id }
      const task_list = await API.getTaskListByBoardId.get(payload)
      task_list.forEach(task => {
        if (!this.checkDuplicated(task, board_id)) {
          this.taskList.push({
            boardId: board_id,
            ...task
          })
        }
      })
    },
    async getTaskById(board_id, task_id) {
      const task = await API.getTaskById.get({ board_id, task_id })
      console.log({ task })
    },
    async addTask(board_id, data) {
      const payload = { board_id, ...data }
      await API.add.post(payload)
    },
    async deleteTask(board_id, data) {
      const payload = { board_id, ...data }
      await API.delete.delete(payload)
      this.taskList = this.taskList.filter(task => task.id !== data.id)
    },
    checkDuplicated(addTask, addTask_board_id) {
      return this.taskList.some(task => task.boardId === addTask_board_id && task.id === addTask.id)
    }
  }
})