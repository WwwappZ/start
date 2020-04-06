import {FindSlug} from '../../../Reducers/items/actions';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/* , dispatch */) => {
  return FindSlug({slug: values.what.slug.value, trcid: values.metadata.trcid}).then((data) => {
    if (data.items.length > 0) {
         throw {
        "what" : {
          "slug": {
            "value": 'De slug titel moet unique zijn. Kies een andere slug'
          }
        }
      }
    }
  }).catch((error) => {
      throw error
  })
}

  export default asyncValidate
