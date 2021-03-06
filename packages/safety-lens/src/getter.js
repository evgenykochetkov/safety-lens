/* @flow */

import * as Const from 'flow-static-land/lib/Const'

import type { Functor } from 'flow-static-land/lib/Functor'
import type { HKT } from 'flow-static-land/lib/HKT'
import type { ContravariantFunctor, Getter } from './types'

/* A specialization of `Lens` that reads properties */
export type Getting<R, S, A> = <Instance: Functor<*>>(
  f: (functor: Instance, val: A) => Const.Const<R, A>
) => (functor: Instance, obj: S) => Const.Const<R, S>

/*
 * Turns an ordinary function into a getter
 */
export function getter<S, A> (getter: (obj: S) => A): Getter<S, A> {
  return function<F, Instance: ContravariantFunctor<F>> (
    f: (instance: Instance, val: A) => HKT<F, A>
  ): (instance: Instance, obj: S) => HKT<F, S> {
    return (instance, obj) => instance.map(_ => obj, f(instance, getter(obj)))
  }
}

export const to = getter

declare function get<S, A>(lens: Getting<A, S, A>, obj: S): A
declare function get<S, A>(lens: Getting<A, S, A>): (obj: S) => A

/*
 * Given a getter (which is a specialized lens), and data structure, gets
 * a value out of the data structure.
 */
export function get (lens, obj) {
  if (typeof obj === 'undefined') {
    return obj => get(lens, obj)
  }
  const resultConst = lens((_, val) => Const.inj(val))(Const, obj)
  return Const.prj(resultConst)
}
