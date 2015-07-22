/* @flow */

export type Maybe<A> = Just<A> | Nothing

class Just<A> {
  value: A;
  constructor(value: A) {
    this.value = value
  }
  map<B>(f: (val: A) => B): Just<B> {
    return new Just(f(this.value))
  }
  ap<T,U>(x: Maybe<T>): Maybe<U> {
    var f: any = this.value
    if (x instanceof Just) {
      return new Just(f(x.value))
    }
    else {
      return x
    }
  }
}

class Nothing {
  value: void;
  map<B>(f: (_: any) => B): Nothing { return this }
}

var just: Pure = val => (new Just(val): any)
var nothing: Nothing = new Nothing()

function traverseMaybe<A,B, FTB: Apply<Maybe<B>>>(
  f: <FB: Apply<B>>(pure: Pure, _: A) => FB
): (pure: Pure, obj: Maybe<A>) => FTB {
  return (pure, obj) => {
    if (obj instanceof Just) {
      return f(pure, obj.value).map(just)
    }
    else {
      return pure(nothing)
    }
  }
}

export {
  Just,
  Nothing,
  just,
  nothing,
  traverseMaybe,
}
