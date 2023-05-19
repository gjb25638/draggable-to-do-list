import httpReq from '@/utils/request'

export default {
  getListByBoardId: {
    url: 'http://localhost:3000/api',
    name: 'getListByBoardId',
    get: async function(data) {
      return await httpReq.get(`${this.url}/${data.board_id}/tasks`)
    }
  },
  getTaskById: {
    url: 'http://localhost:3000/api',
    name: 'getTaskById',
    get: async function(data) {
      return await httpReq.get(`${this.url}/${data.board_id}/${data.task_id}`)
    }
  }
}
