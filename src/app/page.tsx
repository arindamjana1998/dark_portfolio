"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  Code,
  Database,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Refs
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Intersection animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    [
      aboutRef.current,
      skillsRef.current,
      projectsRef.current,
      contactRef.current,
    ].forEach((section) => section && observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Skills updated from CV
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React.js",
    "Next.js",
    "TypeScript",
    "React Native",
    "Strapi CMS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "Git",
    "Tailwind CSS",
    "Bootstrap",
    "MUI",
    "GSAP",
    "Lottie",
    "AWS S3",
  ];

  // Projects based on CV experience
  const projects = [
    {
      id: 1,
      title: "Strapi CMS + Next.js Dynamic Website",
      description:
        "Built a fully dynamic website with Strapi CMS, Next.js, MySQL, and AWS S3. Implemented reusable components, SEO optimization, secure APIs, and responsive UI.",
      image:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?w=800",
      tech: ["Next.js", "Strapi", "MySQL", "AWS S3"],
      github: "#",
      demo: "#",
    },
    {
      id: 2,
      title: "Authentication System (Email + Google Login)",
      description:
        "Developed authentication with JWT, Google OAuth, secure routing, and account management including forgot-password & profile update features.",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800",
      tech: ["React.js", "Node.js", "JWT", "Google OAuth"],
      github: "#",
      demo: "#",
    },
    {
      id: 3,
      title: "Error Tracking & Notifications Integration",
      description:
        "Integrated Sentry for real-time error tracking, Cypress E2E testing, and OneSignal notifications (push, email, in-app) for user engagement.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      tech: ["Sentry", "Cypress", "OneSignal", "React"],
      github: "#",
      demo: "#",
    },
  ];

  // Form handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else setSubmitStatus("error");
    } catch {
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold">
              Arindam<span className="text-blue-400">Jana</span>
            </div>

            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map(
                (link) => (
                  <button
                    key={link}
                    onClick={() =>
                      document
                        .getElementById(link)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-gray-300 hover:text-white transition"
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </button>
                )
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              {["home", "about", "skills", "projects", "contact"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-gray-300 hover:text-white"
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                )
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden sticky top-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?w=1200")',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl sm:text-7xl font-medium mb-6">
            Hi, I&apos;m{" "}
            <span className="text-blue-400">
              <Typewriter
                options={{
                  strings: ["Arindam Jana", "A Front-End Developer"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Front-End Developer specializing in React.js, Next.js, Strapi CMS,
            and modern UI engineering.
          </p>

          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <a href="#projects">View My Work</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-blue-400 border-blue-400"
            >
              <a href="#contact">Hire Me</a>
            </Button>
          </div>

          <div className="flex justify-center space-x-6 mt-8">
            <Link
              href="https://github.com/arindamjana1998"
              className="hover:text-white"
            >
              <Github size={26} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/arindam-jana-6923621b6/"
              className="hover:text-white"
            >
              <Linkedin size={26} />
            </Link>
            <Link
              href="mailto:arindampcm@gmail.com"
              className="hover:text-white"
            >
              <Mail size={26} />
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        ref={aboutRef}
        id="about"
        className="py-20 bg-gray-900 opacity-0 section-animate"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl text-blue-400 mb-4">Who I Am</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I am a passionate Frontend Developer with hands-on experience
                building modern, responsive web applications using React.js and
                Next.js. I specialize in crafting seamless UI/UX,
                high-performance interfaces, and scalable reusable components.
              </p>

              <p className="text-gray-300 mb-6 leading-relaxed">
                I have strong practical experience with Strapi CMS, REST APIs,
                MySQL, AWS S3 integration, Cypress testing, Sentry error
                tracking, and OneSignal notifications.
              </p>

              <p className="text-gray-300 mb-6 leading-relaxed">
                I love building meaningful digital products and continuously
                learning new technologies.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Code className="text-blue-400" />
                  <span>React & Next.js Specialist</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="text-blue-400" />
                  <span>Strapi CMS + API Integrations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="text-blue-400" />
                  <span>Frontend Performance & UI Engineering</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-72 h-72 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-6xl font-bold shadow-xl">
                AJ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        ref={skillsRef}
        id="skills"
        className="py-20 bg-black opacity-0 section-animate"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Technical Skills
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {skills.map((skill, i) => (
              <Badge
                key={i}
                className="bg-gray-800 w-full text-white py-3 text-center hover:bg-gray-700 transform hover:scale-105 transition"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        ref={projectsRef}
        id="projects"
        className="py-20 bg-gray-900 opacity-0 section-animate"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-gray-800 border-gray-700 text-white hover:scale-105 transition overflow-hidden pt-0"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    width={800}
                    height={300}
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full hover:scale-110 transition"
                  />
                </div>

                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-blue-400 border-blue-400"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-400 border-blue-400"
                    >
                      <Github size={16} className="mr-2" />
                      <a href={project.github}>Code</a>
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <ExternalLink size={16} className="mr-2" />
                      <a href={project.demo}>Demo</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        ref={contactRef}
        id="contact"
        className="py-20 bg-black opacity-0 section-animate"
      >
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>

          <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
              <CardTitle className="text-center">Send Me a Message</CardTitle>
              <CardDescription className="text-center text-gray-300">
                Let&apos;s discuss your project or work opportunities.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm mb-2 block">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-gray-700"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-gray-700"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 min-h-[120px]"
                    placeholder="Write your message..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {submitStatus === "success" && (
                  <p className="text-center text-green-400">
                    Message sent successfully!
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-center text-red-400">
                    Error sending message. Try again.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-center md:space-x-6 md:space-y-0">
              <a
                href="mailto:arindampcm@gmail.com"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <Mail size={20} /> <span>arindampcm@gmail.com</span>
              </a>
              <a
                href="https://github.com/arindamjana1998"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <Github size={20} /> <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/arindam-jana-6923621b6/"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <Linkedin size={20} /> <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 border-t border-gray-800 text-center text-gray-400 relative z-10">
        © {new Date().getFullYear()} Arindam Jana. Built with Next.js + Tailwind
        CSS.
      </footer>
    </div>
  );
}
