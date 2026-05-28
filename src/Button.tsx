import { useState } from 'react'

export function Button({label}: {label:string}) {
    const [count, setCount] = useState(0)

    return (<button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          {label} is {count}
        </button>)
}