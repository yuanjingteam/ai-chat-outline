import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// --- TYPE DEFINITIONS FOR PROPS ---
interface NavLink {
  label: string;
  href: string;
}
interface Project {
  title: string;
  description: string;
  tags: string[];
  imageContent?: React.ReactNode;
}
interface Stat {
  value: string;
  label: string;
}

export interface PortfolioPageProps {
  logo?: { initials: React.ReactNode; name: React.ReactNode };
  navLinks?: NavLink[];
  resume?: { label: string; onClick?: () => void };
  hero?: {
    titleLine1: React.ReactNode;
    titleLine2Gradient: React.ReactNode;
    subtitle: React.ReactNode;
  };
  ctaButtons?: {
    primary: { label: string; onClick?: () => void };
    secondary: { label: string; onClick?: () => void };
  };
  projects?: Project[];
  stats?: Stat[];
  showAnimatedBackground?: boolean;
}

// --- INTERNAL ANIMATED BACKGROUND COMPONENT ---
const AuroraBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "0";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "none";
    currentMount.appendChild(renderer.domElement);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
                uniform float iTime; uniform vec2 iResolution;
                #define NUM_OCTAVES 3
                float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
                float noise(vec2 p){ vec2 ip=floor(p);vec2 u=fract(p);u=u*u*(3.0-2.0*u);float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);return res*res; }
                float fbm(vec2 x) { float v=0.0;float a=0.3;vec2 shift=vec2(100);mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));for(int i=0;i<NUM_OCTAVES;++i){v+=a*noise(x);x=rot*x*2.0+shift;a*=0.4;}return v;}
                void main() {
                    vec2 p=((gl_FragCoord.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.,-4.,4.,6.);vec4 o=vec4(0.);float f=2.+fbm(p+vec2(iTime*5.,0.))*.5;
                    for(float i=0.;i++<35.;){vec2 v=p+cos(i*i+(iTime+p.x*.08)*.025+i*vec2(13.,11.))*3.5;float tailNoise=fbm(v+vec2(iTime*.5,i))*.3*(1.-(i/35.));vec4 auroraColors=vec4(.1+.3*sin(i*.2+iTime*.4),.3+.5*cos(i*.3+iTime*.5),.7+.3*sin(i*.4+iTime*.3),1.);vec4 currentContribution=auroraColors*exp(sin(i*i+iTime*.8))/length(max(v,vec2(v.x*f*.015,v.y*1.5)));float thinnessFactor=smoothstep(0.,1.,i/35.)*.6;o+=currentContribution*(1.+tailNoise*.8)*thinnessFactor;}
                    o=tanh(pow(o/100.,vec4(1.6)));gl_FragColor=o*1.5;
                }`,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
    };
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(
        window.innerWidth,
        window.innerHeight,
      );
    };
    window.addEventListener("resize", handleResize);
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (currentMount.contains(renderer.domElement))
        currentMount.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);
  return <div ref={mountRef} />;
};

// --- DEFAULT DATA ---
const defaultData = {
  logo: { initials: "MT", name: "Meng To" },
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
  ],
  resume: { label: "Resume", onClick: () => {} },
  hero: {
    titleLine1: "Creative Developer &",
    titleLine2Gradient: "Digital Designer",
    subtitle:
      "I craft beautiful digital experiences through code and design. Specializing in modern web development, UI/UX design, and bringing innovative ideas to life.",
  },
  ctaButtons: {
    primary: { label: "View My Work", onClick: () => {} },
    secondary: { label: "Get In Touch", onClick: () => {} },
  },
  projects: [
    {
      title: "FinTech Mobile App",
      description: "React Native app with AI-powered financial insights.",
      tags: ["React Native", "Node.js"],
      imageContent: null,
    },
    {
      title: "Data Visualization Platform",
      description: "Interactive dashboard for complex data analysis.",
      tags: ["D3.js", "Python"],
      imageContent: null,
    },
    {
      title: "3D Portfolio Site",
      description: "Immersive WebGL experience with 3D elements.",
      tags: ["Three.js", "WebGL"],
      imageContent: null,
    },
  ],
  stats: [
    { value: "50+", label: "Projects Completed" },
    { value: "5+", label: "Years Experience" },
    { value: "15+", label: "Happy Clients" },
  ],
};

// --- MAIN CUSTOMIZABLE PORTFOLIO COMPONENT ---
export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  logo = defaultData.logo,
  navLinks = defaultData.navLinks,
  resume = defaultData.resume,
  hero = defaultData.hero,
  ctaButtons = defaultData.ctaButtons,
  projects = defaultData.projects,
  stats = defaultData.stats,
  showAnimatedBackground = true,
}) => {
  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-white/10">
      {showAnimatedBackground && <AuroraBackground />}
      <div className="relative z-10">
        <nav className="w-full px-6 py-6 backdrop-blur-sm border-b border-white/5 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                <span className="text-sm font-bold text-white tracking-tighter">
                  {logo.initials}
                </span>
              </div>
              <span className="text-lg font-medium text-white tracking-tight">
                {logo.name}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/50 hover:text-white transition-all duration-300 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={resume.onClick}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all duration-300 backdrop-blur-md active:scale-95"
            >
              {resume.label}
            </button>
          </div>
        </nav>

        <main
          id="install"
          className="w-full flex flex-col items-center justify-center px-6 pt-32"
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-8 leading-[1.05]">
                {hero.titleLine1}
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium italic">
                  {hero.titleLine2Gradient}
                </span>
              </h1>
              <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-white/60 mx-auto font-light">
                {hero.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              <button
                onClick={ctaButtons.primary.onClick}
                className="px-8 py-4 bg-white text-black rounded-2xl font-semibold text-sm transition-all duration-300 hover:bg-white/90 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                {ctaButtons.primary.label}
              </button>
              <button
                onClick={ctaButtons.secondary.onClick}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-semibold text-sm transition-all duration-300 backdrop-blur-md active:scale-95"
              >
                {ctaButtons.secondary.label}
              </button>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-24" />
          </div>
        </main>

        <section
          id="projects"
          className="w-full flex flex-col items-center justify-center px-6 py-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 text-left transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-2"
              >
                <div className="aspect-video rounded-2xl bg-white/5 mb-6 flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors">
                  {project.imageContent || (
                    <div className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      ✨
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 font-light">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/40 group-hover:text-white/60 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-24" />
        </section>

        <section
          id="skills"
          className="w-full flex flex-col items-center justify-center px-6 py-20"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-16 md:gap-24 text-center pb-20">
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-medium text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500">
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-xs uppercase tracking-[0.2em] font-bold">
                    {stat.label}
                  </div>
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        <footer className="w-full py-12 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs tracking-widest uppercase font-bold">
            © {new Date().getFullYear()} {logo.name} • Built with Passion
          </p>
        </footer>
      </div>
    </div>
  );
};
