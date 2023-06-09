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
      return await httpReq.get(`${this.url}/task/${data.board_id}/${data.task_id}`)
    }
  },
  add: {
    url: `${config.API_URL}`,
    name: 'add_task',
    post: async function(data) {
      return await httpReq.post(`${this.url}/task/${data.board_id}/add`, data)
    }
  },
  delete: {
    url: `${config.API_URL}`,
    name: 'delete_task',
    delete: async function(data) {
      return await httpReq.delete(`${this.url}/task/${data.board_id}/${data.id}/delete`, )
    }
  }
}
