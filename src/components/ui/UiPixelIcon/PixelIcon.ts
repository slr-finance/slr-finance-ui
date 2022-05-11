const p1 = [
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
]

const p2 = [
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [1, 0, 1, 0, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
]

const height = 5
const width = 5
const interp = (start: number, end: number, p: number) => {
  return start * (1 - p) + end * p
}

const vec = (x: number, y: number) => Math.sqrt(x ** 2 + y ** 2)

const comp = () => {
  const eq = []
  const notEq1: any[] = []
  const notEq2: any[] = []

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (p1[y][x] == p2[y][x]) {
        eq.push({ x, y, v: p1[y][x] })
      } else {
        if (p1[y][x]) {
          notEq1.push({ r: vec(x, y), x, y })
        } else {
          notEq2.push({ r: vec(x, y), x, y })
        }
      }
    }
  }

  const zanayto: any[] = []
  const rrrrr = notEq1.map((ppp) => {
    const p = notEq2.reduce(
      (acc, ppp2) => {
        if (!zanayto.includes(ppp2)) {
          const d = Math.abs(ppp.r - ppp2.r)
          if (acc.d < d) {
            return { d, p: ppp2 }
          }
        }

        return acc
      },
      { d: Number.MAX_SAFE_INTEGER, p: notEq2[0] },
    )

    zanayto.push(p)

    return { ...ppp, p2: p }
  })

  const stepsCount = 3
  const steps = []

  for (let index = 0; index < stepsCount; index++) {
    const frame = new Array(height).fill([]).map((_, y) => {
      return [...p1[y]]
    })

    rrrrr.forEach((p) => {
      console.log(index / stepsCount)
      const x = Math.round(interp(p.x, p.p2.x, index / stepsCount))
      const y = Math.round(interp(p.y, p.p2.y, index / stepsCount))
      frame[y][x] = p.v2
    })
    steps.push(frame)
    console.log(frame)
  }
}

comp()
