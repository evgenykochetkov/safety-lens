/* @flow */

import { lens } from './lens'

import type { Getting, Lens, Lens_ } from './lens'

export {
  index,
  prop,
  _1,
  _2,
}

/* arrays */

function index<A>(idx: number): Lens_<A[],A> {
  return lens(
    list => list[idx],
    (list, val) => list.map((v, i) => i === idx ? val : v)
  )
}


/* objects */

function prop<S:Object,A>(key: $Enum<S>): Lens_<S,A> {
  return lens(
    obj => obj[key],
    (obj, val) => {
      var newObj = {}
      for (var k of Object.keys(obj)) {
        newObj[k] = k === key ? val : obj[k]
      }
      return newObj
    }
  )
}


/* tuples */

function _1<A,B,C>(): Lens<[A,B],[C,B],A,C> {
  return lens(
    ([a,_]) => a,
    ([_,b], c) => [c,b]
  )
}

function _2<A,B,C>(): Lens<[A,B],[A,C],B,C> {
  return lens(
    ([_,b]) => b,
    ([a,_], c) => [a,c]
  )
}


