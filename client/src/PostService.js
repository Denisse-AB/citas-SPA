import axios from 'axios'

const url = 'post/'

class PostService {
  static async insertPost (email, name, date, tel, selected, lang) {
    const res = await axios.post(url, {
      email, name, date, tel, selected, lang
    })
    return res
  }
}

export default PostService
