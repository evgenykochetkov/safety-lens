/* @flow */

export {
  ap,
}

function ap<A,B,C, FB: Apply<B>>(f: Apply<(_: A) => B>, x: Apply<A>): FB {
  return f.ap(x)
}
