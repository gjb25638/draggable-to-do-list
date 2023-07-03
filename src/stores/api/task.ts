import config from '@/config'
import httpReq from '@/utils/request'

export default {
  list: {
    url: `${config.API_URL}`,
    name: 'task_List',
    get: async function() {
      return await httpReq.get(`${this.url}/task/list`)
    }
  },
  getListByBoardId: {
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
  update: {
    url: `${config.API_URL}`,
    name: 'update_task',
    put: async function(data) {
      return await httpReq.put(`${this.url}/task/${data.board_id}/${data.id}/update`, { title: data.title, finished: data.finished, index: data.index })
    }
  },
  delete: {
    url: `${config.API_URL}`,
    name: 'delete_task',
    delete: async function(data) {
      return await httpReq.delete(`${this.url}/task/${data.board_id}/${data.id}/delete`)
    }
  },
  deleteAll: {
    url: `${config.API_URL}`,
    name: 'delete_all_task',
    delete: async function(data) {
      return await httpReq.delete(`${this.url}/task/${data.board_id}/delete`)
    }
  }
}
