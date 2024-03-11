"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import styles from "./page.module.css"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  const [mouseVariants, setMouseVariants] = useState("default")

  const textEnter = () => {
    setMouseVariants("text")
  }

  const textLeave = () => {
    setMouseVariants("default")
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      backgroundColor: "pink",
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      mixBlendMode: "multiply",
    },
  }

  return (
    <>
      <div className={styles.container}>
        <h1
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
          className={styles.title}
        >
          Custom Cursor
        </h1>
      </div>
      <motion.div
        variants={variants}
        animate={mouseVariants}
        className={styles.cursor}
      ></motion.div>
    </>
  )
}
