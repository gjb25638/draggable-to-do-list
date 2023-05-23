import config from '@/config'
import httpReq from '@/utils/request'

export default {
  getListByBoardId: {
    url: `${config.API_URL}`,
    name: 'getListByBoardId',
    get: async function(data) {
      return await httpReq.get(`${this.url}/${data.board_id}/tasks`)
    }
  },
  getTaskById: {
    url: `${config.API_URL}`,
    name: 'getTaskById',
    get: async function(data) {
      return await httpReq.get(`${this.url}/${data.board_id}/${data.task_id}`)
    }
  }
}
