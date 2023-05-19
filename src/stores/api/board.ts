import httpReq from '@/utils/request'

export default {
  list: {
    url: 'http://localhost:3000/api',
    name: 'board_list',
    get: async function() {
      return await httpReq.get(`${this.url}/board/list`)
    }
  }
}
