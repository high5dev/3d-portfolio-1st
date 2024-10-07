const Section = (props) => {
    const children = props;
    return (
        <section className={`
        h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start justify-center`}>
            {children}
        </section>
    )
}
const AboutSection = () => {
    return (
        <Section>
            <h1 className="text-6xl font-extrabold leading-snug">
                Hi, I am
                <br />
                <span className="bg-white px-1 italic">Cory Mack.</span>
            </h1>
            <p className="text-lg text-gray-600 mt-4">
                Lorem Ipsum blar anything
                <br/>
                Lorem Ipsum blar another thing
            </p>
            <button className={`
                bg-indigo-600 text-white py-4 px-8
                rounded-lg font-bold text-lg mt-16`}>
                    Contact me
                </button>
        </Section>
    )
}

export const Interface = () => {
    return (
        <div className="flex flex-col items-center w-screen">
            <AboutSection/>
            <Section>
                <h1>Skill</h1>
            </Section>
            <Section>
                <h1>Project</h1>
            </Section>
            <Section>
                <h1>Contact</h1>
            </Section>
        </div>
    )
}