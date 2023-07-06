jest.mock('./../js/genomicDataAxiosFn.js')
import { genomicDataFn} from './../js/genomicDataAxiosFn'

test('genomic context functionality', async () => {
    const response = await genomicDataFn()
    expect(response)
  });