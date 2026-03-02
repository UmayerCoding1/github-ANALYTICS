"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function AnimatedNumber({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(0);
    const springValue = useSpring(0, { stiffness: 100, damping: 30 });
    const rounded = useTransform(springValue, (latest) => Math.round(latest));

    useEffect(() => {
        springValue.set(value);
    }, [value, springValue]);

    useEffect(() => {
        rounded.on("change", (latest) => setDisplayValue(latest));
    }, [rounded]);

    return <>{displayValue.toLocaleString()}</>;
}
