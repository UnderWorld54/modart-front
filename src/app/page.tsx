"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Smooth scroll progress
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Set loaded state after a small delay for initial animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timer)
    }
  }, [])

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Données fictives pour la galerie
  const galleryItems = [
    {
      id: 1,
      image: "/0.jpg?height=600&width=450",
      title: "Collection Printemps",
      student: "Emma Laurent",
      year: "2023",
    },
    {
      id: 2,
      image: "/1.jpg?height=600&width=450",
      title: "Projet Haute Couture",
      student: "Thomas Dubois",
      year: "2023",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=600&width=450",
      title: "Mode Durable",
      student: "Sophie Martin",
      year: "2023",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=600&width=450",
      title: "Accessoires Innovants",
      student: "Lucas Petit",
      year: "2023",
    },
    {
      id: 5,
      image: "/placeholder.svg?height=600&width=450",
      title: "Tenues de Soirée",
      student: "Chloé Moreau",
      year: "2023",
    },
    {
      id: 6,
      image: "/placeholder.svg?height=600&width=450",
      title: "Mode Urbaine",
      student: "Alexandre Durand",
      year: "2023",
    },
  ]

  // Text reveal animation variants
  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  // Stagger animation for gallery items
  const galleryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const galleryItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Custom cursor */}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-primary/30 mix-blend-difference pointer-events-none z-50 hidden md:block"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          scale: 1,
          opacity: 0.6,
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          stiffness: 100,
          damping: 15,
        }}
      />

      {/* Page reveal animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <motion.h1
              className="text-white text-4xl font-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.8 },
              }}
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.5 },
              }}
            >
              MOD&apos;ART
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <video
            src="/background.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div className="container relative z-10 text-white space-y-6" style={{ opacity: heroOpacity }}>
          <div className="overflow-hidden">
            <motion.h1
              className="font-title uppercase text-8xl md:text-8xl text-center tracking-tight leading-tight text-customRose drop-shadow-lg"
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.5,
                },
              }}
            >
              Mod&apos;Art International
              <motion.span
                className="text-primary block mt-2 text-5xl md:text-6xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.8,
                  },
                }}
              >
                Reims
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.1,
              },
            }}
          >
            Une école de mode où le raffinement, la créativité et le professionnalisme se rencontrent pour former les
            talents de demain.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.3,
              },
            }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary rounded-full relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                href="/etudiants"
                className="relative z-10 px-6 py-3 inline-flex items-center text-white"
              >
                <span className="relative z-10 flex items-center font-semibold tracking-wide">
                  Découvrir nos talents
                  <motion.span
                    className="ml-2 inline-flex"
                    initial={{ x: 0 }}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </span>

                {/* Animation de fond au hover */}
                <motion.span
                  className="absolute inset-0 bg-primary-dark z-0 group-hover:scale-105"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Effet de lumière en fond (subtil) */}
                <span className="absolute inset-0 z-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </Link>
            </Button>


            <Button
              variant="outline"
              size="lg"
              className="rounded-full bg-white/10 text-white border-white hover:bg-white hover:text-black relative overflow-hidden group"
            >
              <Link href="/evenements" className="relative z-10">
                <span className="relative z-10">Nos événements</span>
                <motion.span
                  className="absolute inset-0 z-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={scrollToGallery}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 1.5,
            },
          }}
          whileHover={{ y: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm mb-2">Découvrir</span>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        ref={galleryRef}
        className="py-24 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="overflow-hidden">
              <motion.h2
                className="text-3xl font-bold tracking-tight mb-4"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                Galerie des Créations
              </motion.h2>
            </motion.div>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Découvrez les œuvres exceptionnelles de nos étudiants, reflétant leur créativité et leur maîtrise des
              techniques de la mode contemporaine.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={galleryVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={galleryItemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <Link href={`/etudiants/${item.student.toLowerCase().replace(" ", "-")}`}>
                  <div className="overflow-hidden rounded-md">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={450}
                        height={600}
                        className="rounded-md transition-all duration-500"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm opacity-80">
                      {item.student} • {item.year}
                    </p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button asChild size="lg" className="rounded-full relative overflow-hidden group">
              <Link href="/etudiants" className="relative z-10">
                <span className="relative z-10 flex items-center">
                  Voir tous les projets
                  <motion.span
                    className="ml-2 inline-flex"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-primary-dark z-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        ref={aboutRef}
        className="py-24 bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="overflow-hidden rounded-md">
                <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="À propos de Mod'Art"
                    width={600}
                    height={800}
                    className="rounded-md object-cover w-full h-auto"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div className="overflow-hidden">
                <motion.h2
                  className="text-3xl font-bold tracking-tight"
                  initial={{ y: 100 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                >
                  Notre École
                </motion.h2>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {[
                  "Mod'Art International Reims ESGI est une école de mode prestigieuse qui forme les créateurs de demain. Notre approche pédagogique unique combine enseignement théorique, pratique intensive et immersion dans le monde professionnel.",
                  "Nos étudiants bénéficient d'un encadrement personnalisé par des professionnels reconnus du secteur, leur permettant de développer leur créativité tout en acquérant les compétences techniques essentielles.",
                ].map((paragraph, i) => (
                  <motion.p key={i} className="text-muted-foreground" custom={i} variants={textRevealVariants}>
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button asChild variant="outline" className="rounded-full relative overflow-hidden group">
                  <Link href="/a-propos" className="relative z-10">
                    <span className="relative z-10 flex items-center">
                      En savoir plus
                      <motion.span
                        className="ml-2 inline-flex"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-primary/10 z-0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Events Preview */}
      <motion.section
        ref={eventsRef}
        className="py-24 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="overflow-hidden">
              <motion.h2
                className="text-3xl font-bold tracking-tight mb-4"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                Événements à Venir
              </motion.h2>
            </motion.div>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Participez à nos événements exclusifs et découvrez le talent de nos étudiants lors de défilés, expositions
              et conférences.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={galleryVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                variants={galleryItemVariants}
                custom={index}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  <Image
                    src={`/placeholder.svg?height=400&width=600`}
                    alt={`Événement ${item}`}
                    width={600}
                    height={400}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                  <motion.h3
                    className="font-medium text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    Défilé de fin d&apos;année {2023 + item}
                  </motion.h3>
                  <motion.p
                    className="text-sm opacity-80 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    15 juin 202{3 + item} • Grand Palais, Reims
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Button variant="link" asChild className="p-0 text-white w-fit group">
                      <Link href="/evenements" className="flex items-center">
                        En savoir plus
                        <motion.span
                          className="ml-2 inline-flex"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button asChild size="lg" className="rounded-full relative overflow-hidden group">
              <Link href="/evenements" className="relative z-10">
                <span className="relative z-10 flex items-center">
                  Tous les événements
                  <motion.span
                    className="ml-2 inline-flex"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-primary-dark z-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
