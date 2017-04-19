import docToModifier from './doc-to-modifier'

xit('Should do something', () => {
  const doc = {
    a: 1,
    b: '2',
    c: {
      a: ['b', 'c']
    }
  }
  const options = {
    keepArrays: true,
    keepEmptyStrings: true,
    fields: [ 'a', 'b' ]
  }
  const expected = {a: 1, b: '2', 'c.a': ['b', 'c']}
  const result = docToModifier(doc, options)
  expect(result).toEqual(expected)
})
