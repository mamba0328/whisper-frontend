import React, { useMemo, useEffect, useState } from "react";

export default function useMessageIsOnScreen (ref: React.RefObject<HTMLElement>, options?:IntersectionObserverInit) {
    const [isIntersecting, setIntersecting] = useState(false);

    const observerCallback = ([entry]:IntersectionObserverEntry[]) => setIntersecting(entry!.isIntersecting);
    const observer = useMemo(() => new IntersectionObserver(observerCallback, options
    ), [ref]);


    useEffect(() => {
        observer.observe(ref.current!);
        return () => observer.disconnect();
    }, [options]); // not ref because while switching between chats ref stays same

    return isIntersecting;
}


// Usage
// const DummyComponent = () => {
//
//   const ref = useRef<HTMLDivElement>(null)
//   const isVisible = useOnScreen(ref)
//
//   return <div ref={ref}>{isVisible && `Yep, I'm on screen`}</div>
// }
