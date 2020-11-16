import { Injectable } from '@nestjs/common'

@Injectable()
export class UtilsService {
  isEmpty(obj): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key))
        return false
    }
    return true
  }
}