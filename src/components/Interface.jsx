import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";

const Section = (props) => {
    const { children, mobileTop } = props;

    return (
        <motion.section
            className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start
  ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
  `}
            initial={{
                opacity: 0,
                y: 50,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1,
                    delay: 0.6,
                },
            }}
        >
            {children}
        </motion.section>
    );
};

export const Interface = (props) => {
    const { setSection } = props;
    return (
        <div className="flex flex-col items-center w-screen">
            <AboutSection setSection={setSection} />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
        </div>
    );
};

const AboutSection = (props) => {
    const { setSection } = props;
    return (
        <Section mobileTop>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
                Hi, I'm
                <br />
                <span className="px-1 italic">Eric Thomas</span>
            </h1>
            <motion.p
                className="text-lg text-gray-600 mt-4"
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1,
                    delay: 1.5,
                }}
            >
                I make YouTube videos to help developers
                <br />
                learn how to build 3D apps
            </motion.p>
            <motion.button
                onClick={() => setSection(3)}
                className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-4 md:mt-16`}
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1,
                    delay: 2,
                }}
            >
                Contact me
            </motion.button>
        </Section>
    );
};

const skillCategories = {
    languages: [
        { title: "JavaScript", level: 95 },
        { title: "TypeScript", level: 85 },
        { title: "Python", level: 60 },
        { title: "HTML/CSS", level: 97.5 },
        { title: "PHP", level: 90 },
        { title: "C#", level: 60 },
        { title: "Ruby", level: 50 },
    ],
    frameworks: [
        { title: "React / React Native", level: 90 },
        { title: "Angular", level: 90 },
        { title: "Next.js", level: 80 },
        { title: "NodeJS", level: 60 },
        { title: "ExpressJS", level: 60 },
        { title: "ElectronJS", level: 50 },
        { title: "Django", level: 60 },
        { title: "Tailwind CSS", level: 75 },
        { title: "Bootstrap", level: 85 },
        { title: "Laravel", level: 87.5 },
        { title: "WordPress", level: 50 },
        { title: "ASP.NET", level: 45 },
        { title: "Ruby on Rails", level: 40 },
    ],
    databases: [
        { title: "MySQL", level: 80 },
        { title: "MongoDB", level: 82.5 },
        { title: "PostgreSQL", level: 50 },
        { title: "SQLite", level: 65 },
        { title: "Redis", level: 30 },
    ],
    tools: [
        { title: "Git / GitHub", level: 90 },
        { title: "Docker", level: 70 },
        { title: "Kuebernetes", level: 60 },
        { title: "AWS", level: 80 },
        { title: "CentOS", level: 85 },
        { title: "Ubuntu", level: 75 },
        { title: "RedHat", level: 85 },
        { title: "Vite", level: 65 },
        { title: "Webpack", level: 60 },
    ],
    others: [
        { title: "Performance Optimization", level: 80 },
        { title: "Mobile-Responsive Development", level: 75 },
        { title: "Payment Processing", level: 55 },
        { title: "Pixel Perfect Implementation", level: 85 },
    ],
};

const SkillsSection = () => {
    return (
        <Section>
            <motion.div className="w-full" whileInView={"visible"}>
                <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Languages */}
                    <SkillCategory title="Languages" skills={skillCategories.languages} />
                    {/* Frameworks */}
                    <SkillCategory title="Frameworks" skills={skillCategories.frameworks} />
                    {/* Databases */}
                    <SkillCategory title="Databases" skills={skillCategories.databases} />
                    {/* Tools */}
                    <SkillCategory title="Tools" skills={skillCategories.tools} />
                    {/* Others */}
                    <SkillCategory title="Others" skills={skillCategories.others} />
                </div>
            </motion.div>
        </Section>
    );
};

// Skill Category Component
const SkillCategory = ({ title, skills }) => {
    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-100 mb-4">{title}</h3>
            {skills.map((skill, index) => (
                <div className="w-full" key={index}>
                    <motion.h4
                        className="text-lg font-bold text-gray-100"
                        initial={{ opacity: 0 }}
                        variants={{
                            visible: {
                                opacity: 1,
                                transition: { duration: 1, delay: 1 + index * 0.2 },
                            },
                        }}
                    >
                        {skill.title}
                    </motion.h4>
                    <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                        <motion.div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${skill.level}%` }}
                            initial={{ scaleX: 0, originX: 0 }}
                            variants={{
                                visible: {
                                    scaleX: 1,
                                    transition: { duration: 1, delay: 1 + index * 0.2 },
                                },
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

const ProjectsSection = () => {
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

    const nextProject = () => {
        setCurrentProject((currentProject + 1) % projects.length);
    };

    const previousProject = () => {
        setCurrentProject((currentProject - 1 + projects.length) % projects.length);
    };

    return (
        <Section>
            <div className="flex w-full h-full gap-8 items-center justify-center">
                <button
                    className="hover:text-indigo-600 transition-colors"
                    onClick={previousProject}
                >
                    ← Previous
                </button>
                <h2 className="text-3xl md:text-5xl font-bold">Projects</h2>
                <button
                    className="hover:text-indigo-600 transition-colors"
                    onClick={nextProject}
                >
                    Next →
                </button>
            </div>
        </Section>
    );
};

const ContactSection = () => {
    const [state, handleSubmit] = useForm("mayzgjbd");
    return (
        <Section>
            <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
            <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
                {state.succeeded ? (
                    <p className="text-gray-900 text-center">Thanks for your message !</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name" className="font-medium text-gray-900 block mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
                        />
                        <label
                            htmlFor="email"
                            className="font-medium text-gray-900 block mb-1 mt-8"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
                        />
                        <ValidationError
                            className="mt-1 text-red-500"
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                        />
                        <label
                            htmlFor="email"
                            className="font-medium text-gray-900 block mb-1 mt-8"
                        >
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
                        />
                        <ValidationError
                            className="mt-1 text-red-500"
                            errors={state.errors}
                        />
                        <button
                            disabled={state.submitting}
                            className={`w-full h-12 mt-8 text-white bg-indigo-600 font-bold rounded-md transition-colors hover:bg-indigo-700 disabled:opacity-75 disabled:bg-gray-600`}
                        >
                            Send message
                        </button>
                    </form>
                )}
            </div>
        </Section>
    );
};

