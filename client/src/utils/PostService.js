import axios from 'axios'

const url = '/post'

class PostService {
  static async insertAppointment (name, email, tel, date, selected, lang) {
    const res = await axios.post(url, {
      name, email, tel, date, selected, lang
    })
    return res
  }
}

export default PostService
