import config from '@/config'
import httpReq from '@/utils/request'

export default {
  list: {
    url: `${config.API_URL}`,
    name: 'board_list',
    get: async function() {
      return await httpReq.get(`${this.url}/board/list`)
    }
  },
  add: {
    url: `${config.API_URL}`,
    name: 'add_board',
    post: async function(payload) {
      return await httpReq.post(`${this.url}/board/add`, payload)
    }
  },
  delete: {
    url: `${config.API_URL}`,
    name: 'delete_board',
    delete: async function(payload) {
      return await httpReq.delete(`${this.url}/board/${payload.board_id}/delete`, )
    }
  }
}
