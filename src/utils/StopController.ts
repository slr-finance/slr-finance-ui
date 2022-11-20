export class ScriptStoped {}

type CancelCallback = (callback: () => void) => void

/**
 * StopController представляет объект контроллера, который позволяет вам при необходимости обрывать выполнение кода.
 *
 * @example
 * const stopController = StopController()
 *
 * setTimeout(() => stopController.stop(), 1000)
 *
 * while (true) {
 *   await doSomethingAsync()
 *   stopController.check()
 * }
 */
export class StopController {
  _stoping = false

  constructor(cancelCallback?: CancelCallback) {
    if (cancelCallback) {
      cancelCallback(this.stop)
    }
  }

  public stop = () => {
    this._stoping = true
  }

  public breakIfStoping = () => {
    if (this._stoping) {
      throw new ScriptStoped()
    }
  }

  static isStoped(val: any): val is ScriptStoped {
    return val instanceof ScriptStoped
  }
}
