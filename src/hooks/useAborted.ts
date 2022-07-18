type HookReturns<R extends any, P extends any[]> = [
  (...props:P) => Promise<R>,
  () => void,
]

type Fn<P extends any[], R extends any> = (...params:P) => Promise<R>

type FnChain1<R extends any, P extends any[]> = [Fn<P, R>]
type FnChain2<R extends any, P1 extends any[], P2 extends any[]> = [Fn<P1, P2>, Fn<P2, R>]
type FnChain3<R extends any, P1 extends any[], P2 extends any[], P3 extends any[]> = [Fn<P1, P2>, Fn<P2, P3>, Fn<P3, R>]
type FnChain4<
  R extends any,
  P1 extends any[] = any[],
  P2 extends any[] = any[],
  P3 extends any[] = any[],
  P4 extends any[] = any[],
> = [Fn<P1, P2>, Fn<P2, P3>, Fn<P3, P4>, Fn<P4, R>]

export class Stoped {}

class Payload {
  isAborted = false
  stop() { throw new Stoped }
  stopIfAborted() {
    if (this.isAborted) {
      this.stop()
    }
  }
}

const createAbortedPromise = (abortSignal:AbortSignal) => {
  return new Promise( ( resolve, reject ) => {
    abortSignal.addEventListener( 'abort', () => { // 6
      reject(new DOMException( 'Calculation aborted by the user', 'AbortError' ))
    })
  })
}

function useSingleAsynFunction<P1 extends any[], R extends any>(chain:FnChain1<R, P1>):HookReturns<R, P1>
function useSingleAsynFunction<R extends any, P1 extends any[], P2 extends any[],>(chain:FnChain2<R, P1, P2>):HookReturns<R, P1>
function useSingleAsynFunction<R extends any, P1 extends any[], P2 extends any[],>(chain:FnChain2<R, P1, P2>):HookReturns<R, P1> {
  let abortController = new AbortController()

  const call = async(...props: P1) => {
    const abortPromise = createAbortedPromise(abortController.signal)

    let pr:Promise<any> = chain[0](...props)
    for (let index = 1; index < chain.length; index++) {
      pr = pr.then((...params) => Promise.race([
        abortPromise,
        chain[index](...params),
      ])
      )
    }

    abortController = new AbortController()
  }

  return [call, () => {}]
}

useSingleAsynFunction([
  async () => [false],
  async (kf) => ['2']
])


Promise.race([
  new Promise( ( resolve, reject ) => {
    setTimeout(resolve, 1000)
  }),
  new Promise( ( resolve, reject ) => {
    setTimeout(reject, 1000)
  }),
])