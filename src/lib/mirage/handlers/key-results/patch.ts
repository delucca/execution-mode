import { Request } from 'miragejs'
import DbCollection from 'miragejs/db-collection'

import { KeyResult } from 'components/KeyResult'
import { MirageResponse } from 'lib/mirage/handlers'

const patch = (
  schema: Record<string, DbCollection>,
  request: Request,
): MirageResponse<KeyResult> => {
  const keyResultID = request.params.id
  const newKeyResultData: Partial<KeyResult> = JSON.parse(request.requestBody)

  const updatedKeyResult = schema.keyResults.find(keyResultID).update(newKeyResultData).save()

  return {
    data: updatedKeyResult,
  }
}

export default patch