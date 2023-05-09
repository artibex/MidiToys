import { createSignal } from "solid-js";

export default function Counter() {
    const [count, setCount] = createSignal(100);

    function increment() {
        setCount(prev => prev +1);
    }

    return (
        <div>
            <button onClick={increment}>
                {count()}
            </button>
        </div>
    )
}