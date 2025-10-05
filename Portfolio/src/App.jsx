import Particles from "react-tsparticles";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

/* ===== Site-wide moving diagonal background ===== */
function BackgroundFX() {
  return (
    <div aria-hidden className="fixed inset-0 -z-20 overflow-hidden bg-[#0a0a0a]">
      <style>{`
        .diagonal-lines-dark {
          background: repeating-linear-gradient(
            135deg,
            rgba(255,255,255,0.07) 0px,
            rgba(255,255,255,0.07) 2px,
            transparent 2px,
            transparent 10px
          );
          animation: moveLines 12s linear infinite;
        }
        @keyframes moveLines {
          0% { background-position: 0 0; }
          100% { background-position: 320px 320px; }
        }
      `}</style>
      <div className="absolute inset-0 diagonal-lines-dark opacity-40" />
    </div>
  );
}

/* ===== Reusable Section Title (JSX) ===== */
const SectionTitle = ({ k, sub }) => (
  <div className="mb-8 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-orange-500">
      {k}
    </h2>
    {sub && <p className="mt-2 max-w-3xl mx-auto text-zinc-300">{sub}</p>}
  </div>
);

/* ===== Get in Touch (Formspree) ===== */
function GetInTouch() {
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErr("");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xkgqzjee", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const body = await res.json().catch(() => ({}));
        setErr(body?.errors?.[0]?.message || "Something went wrong.");
        setStatus("error");
      }
    } catch (e2) {
      setErr(e2?.message || "Network error.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 px-6">
      <SectionTitle
        k="Get in Touch"
        sub="I'd love to hear from you — drop me a message anytime."
      />
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            required
            className="w-full p-3 rounded-lg border outline-none bg-zinc-800 text-white border-zinc-700 focus:border-orange-500"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="w-full p-3 rounded-lg border outline-none bg-zinc-800 text-white border-zinc-700 focus:border-orange-500"
          />
        </div>

        <input
          type="email"
          name="_replyto"
          placeholder="Your Email"
          required
          className="w-full p-3 rounded-lg border outline-none bg-zinc-800 text-white border-zinc-700 focus:border-orange-500"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows="6"
          className="w-full p-3 rounded-lg border outline-none bg-zinc-800 text-white border-zinc-700 focus:border-orange-500"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-semibold"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-green-500 text-center">✅ Message sent! I’ll reply soon.</p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-center">❌ Couldn’t send. {err}</p>
        )}
      </form>
    </section>
  );
}

/* ===== App (dark mode only) ===== */
export default function App() {
  return (
    <main className="relative min-h-screen text-white">
      <BackgroundFX />

      {/* ===== HERO : background, top-right controls, left text / right photo ===== */}
      <section className="relative min-h-[70vh]">
        {/* Background image + veil */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/keyboard-bg.jpg" /* make sure this file is in /public */
            alt="Background keyboard"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top-right: About • Let’s Connect */}
        <div className="fixed top-6 right-6 z-50 flex items-center gap-6">
          <nav className="flex items-center gap-6 text-base font-semibold">
            <a
              href="#education"
              className="text-orange-500 text-lg border border-zinc-500 px-3 py-1 rounded-md hover:bg-orange-500 hover:text-black transition"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-orange-500 text-lg border border-zinc-500 px-3 py-1 rounded-md hover:bg-orange-500 hover:text-black transition"
            >
              Let’s Connect
            </a>
          </nav>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-28 pb-20">
          <div className="grid grid-cols-12 gap-10 items-center">
            {/* Left: Name + intro */}
            <div className="col-span-12 md:col-span-7">
              <h1 className="text-orange-500 leading-tight tracking-tight font-extrabold text-[42px] sm:text-5xl lg:text-6xl">
                Hi, I’m <span className="whitespace-nowrap">Siri Mallipeddi</span>
              </h1>

              <p className="mt-6 text-zinc-100/95 text-lg leading-8 max-w-3xl">
                I am a <span className="text-orange-400 font-semibold">Data Analyst</span> passionate
                about uncovering insights that drive smarter decisions. My expertise spans
                <span className="font-semibold"> SQL, Python, Excel, Power BI, Tableau,</span> and
                <span className="font-semibold"> Snowflake</span>, with a strong focus on data
                visualization, reporting, and advanced analytics. I’ve delivered solutions that improved
                reporting efficiency, reduced manual errors, and enabled business teams to act on timely
                insights. In addition to core analytics, I bring experience in AI-driven analysis from
                traditional Machine Learning to modern Generative AI applying these technologies to make
                analytics more predictive, adaptive, and impactful.
              </p>

              {/* Social icons */}
              <div className="flex gap-6 mt-6">
                <a
                  href="https://github.com/Saisirimallipeddi333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-orange-500 text-black hover:bg-orange-600 transition"
                  title="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://leetcode.com/u/Siri_Mallipeddi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-orange-500 text-black hover:bg-orange-600 transition"
                  title="LeetCode"
                >
                  <SiLeetcode size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/sai-siri-mallipeddi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-orange-500 text-black hover:bg-orange-600 transition"
                  title="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>

            {/* Right: Profile photo */}
            <div className="col-span-12 md:col-span-5 flex justify-center md:justify-end">
              <img
                src="/myphoto.jpg" /* place your photo in /public */
                alt="Siri Mallipeddi"
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover ring-4 ring-white/90 shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section id="education" className="pt-36 pb-20 px-6">
        <SectionTitle k="Education" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-orange-500">University of Central Missouri</h3>
            <p className="text-zinc-300">M.S. in Computer Science (2023 – 2025) · GPA: 3.7/4.0</p>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-orange-500">JNTU Kakinada</h3>
            <p className="text-zinc-300">B.Tech in Computer Science (2019 – 2023) · GPA: 3.1/4.0</p>
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section id="experience" className="py-20 px-6">
        <SectionTitle k="Experience" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-orange-500">Data Analyst · MTA New York</h3>
            <p className="text-zinc-400 text-sm">Jan 2025 – Present</p>
            <p className="text-zinc-300 mt-2">
              Working on analytics & reporting systems, optimizing dashboards and ensuring data quality across multiple domains.
            </p>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-orange-500">Data Analyst · BluePal</h3>
            <p className="text-zinc-400 text-sm">2023 – 2024</p>
            <p className="text-zinc-300 mt-2">
              Built data pipelines, created business dashboards, and collaborated with stakeholders for reporting automation.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="py-20 px-6">
        <SectionTitle k="Projects" />
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { t: "CampusConnect", d: "Spring Boot, React, MySQL, JWT", g: "https://github.com/Saisirimallipeddi333" },
            { t: "Job Market Analyzer", d: "Python, Pandas, Power BI", g: "https://github.com/Saisirimallipeddi333" },
          ].map((p) => (
            <div key={p.t} className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-orange-500">{p.t}</h3>
              <p className="text-zinc-300">{p.d}</p>
              <a
                href={p.g}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block hover:underline text-orange-400"
              >
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills" className="py-20 px-6">
        <SectionTitle k="Technical Skills" />
        <div className="max-w-4xl mx-auto space-y-2">
          <p><span className="text-orange-500 font-semibold">Languages:</span> Java, Python, SQL, JavaScript</p>
          <p><span className="text-orange-500 font-semibold">Frameworks:</span> Spring Boot, React, Node.js</p>
          <p><span className="text-orange-500 font-semibold">Databases:</span> MySQL, PostgreSQL, Snowflake</p>
          <p><span className="text-orange-500 font-semibold">Visualization:</span> Power BI, Tableau</p>
          <p><span className="text-orange-500 font-semibold">Cloud & DevOps:</span> AWS, Docker, GitHub</p>
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section id="certs" className="py-20 px-6">
        <SectionTitle k="Certifications" />
        <div className="max-w-3xl mx-auto space-y-3">
          <p>✔ AWS Certified Cloud Practitioner</p>
          <p>✔ Google Data Analytics Professional Certificate</p>
        </div>
      </section>

      {/* ===== GET IN TOUCH ===== */}
      <GetInTouch />

      {/* ===== FOOTER ===== */}
      <footer className="py-10 border-t text-center border-zinc-800 text-zinc-400">
        © {new Date().getFullYear()} Siri Mallipeddi · Built with React & Tailwind
      </footer>
    </main>
  );
}
