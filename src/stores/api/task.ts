import config from '@/config'
import httpReq from '@/utils/request'

export default {
  getTaskListByBoardId: {
    url: `${config.API_URL}`,
    name: 'getListByBoardId',
    get: async function(data) {
      return await httpReq.get(`${this.url}/task/${data.board_id}/list`)
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
