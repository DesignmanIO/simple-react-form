import cleanFields from './clean-fields'
import cleanNulls from './clean-nulls'
import reportNulls from './report-nulls'
import isEmpty from 'lodash/isEmpty'
import {flatten} from 'flat'

export default function (doc, options) {
  var modifier = {}
  var flatDoc
  var nulls
  options = options || {}
  flatDoc = flatten(doc, {
    safe: !!options.keepArrays
  })
  nulls = reportNulls(flatDoc, !!options.keepEmptyStrings)
  nulls = cleanFields(nulls, options.fields)
  flatDoc = cleanNulls(flatDoc, false, !!options.keepEmptyStrings)
  flatDoc = cleanFields(flatDoc, options.fields)

  if (!isEmpty(flatDoc)) {
    modifier.$set = flatDoc
  }

  if (!isEmpty(nulls)) {
    modifier.$unset = nulls
  }

  return modifier
}
