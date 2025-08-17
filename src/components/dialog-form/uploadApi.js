import { request } from '@/api/service'

export function Upload (data) {
  return request({
    url: '/api/UpLoadFile/Upload',
    method: 'post',
    data,
    params: {
      firstPath: 'article'
    }
  })
}
