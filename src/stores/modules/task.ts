import API from '@/stores/api/task'

interface Task {
  boardId: string,
  id: string,
  title: string,
  finished: boolean,
  index: number
}

interface stateConfig {
  taskList: Array<Task>
  isShowfinished: boolean
}

export const useTaskStore = defineStore('Task', {
  state: () : stateConfig => ({
    taskList: [
      // { boardId: '1', id: '1', title: '資源回收', finished: false, index: 1 },
      // { boardId: '1', id: '2', title: '掃廁所', finished: false, index: 2 },
      // { boardId: '1', id: '3', title: '拖地板', finished: false, index: 3 }
    ],
    isShowfinished: false
  }),
  getters: {
    getTasksByBoardId: (state) => (board_id) : Array<Task> => {
      return state.taskList.filter(task => task.boardId === board_id)
    },
    getLength: (getters: any) => (board_id) : number => getters.getTasksByBoardId(board_id).length || 0
    // getLength(board_id) : number | any {
    //   return this.getTasksByBoardId(board_id).length || 0
    // }
    // getBoardList: (state) => state.boardList,
    // getBoardById: (state) => {
    //   return (boardId) => state.boardList.find((board) => board.id === boardId)
    // }
  },
  actions: {
    // async getTaskList(board_id) {
    //   const task_list = await API.list.get()
    //   task_list.forEach(task => {
    //     if (!this.checkDuplicated(task, board_id)) {
    //       this.taskList.push({
    //         boardId: board_id,
    //         ...task
    //       })
    //     }
    //   })
    // },
    async getListByBoardId(board_id) {
      const payload = { board_id }
      const task_list = await API.getListByBoardId.get(payload)
      // taskList 內沒有就加入，有就取代
      task_list.forEach(task => {
        if (!this.checkDuplicated(task, board_id)) {
          this.taskList.push({
            boardId: board_id,
            ...task
          })
        } else {
          this.replaceDuplicated(task, board_id)
        }
      })
      // console.log({ task_list })
      // console.log({ get_list_from_api: this.taskList })
      // 對 boradId 和 index 做雙層排序，borad.index先，task.index後
      this.doubleLayerSort(this.taskList)
    },
    async getTaskById(board_id, task_id) {
      const task = await API.getTaskById.get({ board_id, task_id })
    },
    async addTask(board_id, data) {
      const payload = { board_id, ...data }
      await API.add.post(payload)
    },
    async updateTask(board_id, data) {
      const payload = { board_id, ...data }
      await API.update.put(payload)
    },
    async deleteTask(board_id, data) {
      const payload = { board_id, ...data }
      await API.delete.delete(payload)
      this.taskList = this.taskList.filter(task => task.id !== data.id)
    },
    async deleteAllByBoardId(board_id) {
      const payload = { board_id }
      await API.deleteAll.delete(payload)
      this.taskList = this.taskList.filter(task => task.boardId !== board_id)
    },
    checkDuplicated(addTask, addTask_board_id) {
      return this.taskList.some(task => task.boardId === addTask_board_id && task.id === addTask.id)
    },
    replaceDuplicated(updateTask, updateTask_board_id) {
      const targetIndex = this.taskList.findIndex(task => task.boardId === updateTask_board_id && task.id === updateTask.id)
      this.taskList.splice(targetIndex, 1, {
        boardId: updateTask_board_id,
        ...updateTask
      })
    },
    doubleLayerSort: (arr) => arr.sort((a, b) => {
      const boardStore = useBoardStore()
      const list = boardStore.getList
      const board1: any = list.find(board => board.id === a.boardId)
      const board2: any = list.find(board => board.id === b.boardId)

      const value1 = a.boardId
      const value2 = b.boardId
      if (value1 === value2) {
        return a.index - b.index
      }
      return board1.index - board2.index
    })
  }
})