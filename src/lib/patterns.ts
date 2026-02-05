
import type React from 'react';

export interface Pattern {
  id: string;
  name?: string;
  category: string;
  badge?: string;
  description?: string;
  style: React.CSSProperties;
  code: string;
}

// 5% Noise Texture
const noise = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")";

const boxshadowStars = "367px 308px #FFF, 143px 1041px #FFF, 1979px 258px #FFF, 908px 1435px #FFF, 785px 1686px #FFF, 1861px 1408px #FFF, 646px 1295px #FFF, 1561px 1125px #FFF, 1709px 1874px #FFF, 129px 364px #FFF, 435px 842px #FFF, 1121px 1073px #FFF, 1425px 904px #FFF, 280px 823px #FFF, 147px 51px #FFF, 1538px 1865px #FFF, 1350px 255px #FFF, 1493px 683px #FFF, 258px 343px #FFF, 655px 1211px #FFF, 983px 1053px #FFF, 1554px 327px #FFF, 820px 268px #FFF, 1936px 1737px #FFF, 1547px 1454px #FFF, 1860px 1003px #FFF, 843px 531px #FFF, 585px 1043px #FFF, 1667px 41px #FFF, 1837px 1776px #FFF, 1766px 1161px #FFF, 1929px 416px #FFF, 736px 380px #FFF, 923px 153px #FFF, 787px 1686px #FFF, 251px 878px #FFF, 1372px 1099px #FFF, 1442px 501px #FFF, 1999px 1327px #FFF, 863px 819px #FFF, 153px 1204px #FFF, 1480px 1634px #FFF, 401px 1668px #FFF, 1175px 1529px #FFF, 43px 1464px #FFF, 685px 1222px #FFF, 1072px 680px #FFF, 1618px 254px #FFF, 1471px 400px #FFF, 1007px 495px #FFF, 522px 528px #FFF, 879px 1323px #FFF, 1043px 1165px #FFF, 247px 1146px #FFF, 1576px 1478px #FFF, 1603px 672px #FFF, 278px 1314px #FFF, 936px 652px #FFF, 1547px 259px #FFF, 1623px 1078px #FFF, 1838px 1849px #FFF, 1854px 596px #FFF, 757px 459px #FFF, 1497px 849px #FFF, 1788px 1267px #FFF, 1857px 19px #FFF, 1461px 1653px #FFF, 1948px 1239px #FFF, 248px 804px #FFF, 1499px 494px #FFF, 982px 1841px #FFF, 1767px 539px #FFF, 661px 1959px #FFF, 791px 377px #FFF, 672px 145px #FFF, 1154px 1985px #FFF, 1829px 33px #FFF, 1944px 1980px #FFF, 655px 1502px #FFF, 1092px 1904px #FFF, 1506px 1749px #FFF, 832px 1186px #FFF, 235px 1088px #FFF, 1899px 1783px #FFF, 1716px 1418px #FFF, 484px 705px #FFF, 804px 400px #FFF, 190px 1507px #FFF, 978px 581px #FFF, 1918px 834px #FFF, 827px 1977px #FFF, 531px 1244px #FFF, 1150px 518px #FFF, 1024px 1229px #FFF, 280px 575px #FFF, 1013px 1437px #FFF, 1419px 1437px #FFF, 928px 3px #FFF, 1544px 1547px #FFF, 587px 1799px #FFF, 1973px 1953px #FFF, 523px 170px #FFF, 243px 1317px #FFF, 1962px 1593px #FFF, 696px 1562px #FFF, 321px 298px #FFF, 1955px 797px #FFF, 1542px 1081px #FFF, 694px 266px #FFF, 789px 384px #FFF, 972px 257px #FFF, 56px 1833px #FFF, 5px 938px #FFF, 219px 64px #FFF, 1871px 957px #FFF, 771px 1318px #FFF, 535px 995px #FFF, 1043px 1158px #FFF, 1516px 1250px #FFF, 1750px 419px #FFF, 1672px 1308px #FFF";

export const gridPatterns: Pattern[] = [
  {
    id: "synthetic-aurora",
    name: "Synthetic Aurora",
    category: "mesh",
    badge: "2026",
    description: "Deep, shifting mesh gradient with neon accents.",
    style: {
      backgroundColor: "rgb(var(--color-background))",
      backgroundImage: `
        ${noise},
        radial-gradient(at 0% 0%, rgb(var(--color-accent) / 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgb(var(--chart-2) / 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgb(var(--chart-5) / 0.15) 0px, transparent 50%),
        radial-gradient(at 0% 100%, rgb(var(--chart-1) / 0.15) 0px, transparent 50%)
      `,
    },
    code: `<div className="w-full min-h-screen" style={{
      backgroundColor: "rgb(var(--color-background))",
      backgroundImage: \`
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
        radial-gradient(at 0% 0%, rgba(var(--color-accent), 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(var(--chart-2), 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(var(--chart-5), 0.15) 0px, transparent 50%),
        radial-gradient(at 0% 100%, rgba(var(--chart-1), 0.15) 0px, transparent 50%)
      \`
    }} />`,
  },
  {
    id: "holographic-pearl",
    name: "Holographic Pearl",
    category: "mesh",
    badge: "2026",
    description: "Subtle, iridescent mesh for light mode.",
    style: {
      backgroundColor: "rgb(var(--color-background))",
      backgroundImage: `
        ${noise},
        radial-gradient(circle at 50% 50%, rgb(var(--color-surface) / 1) 0%, transparent 100%),
        radial-gradient(at 0% 0%, rgb(var(--chart-2) / 0.1) 0px, transparent 40%),
        radial-gradient(at 50% 100%, rgb(var(--chart-3) / 0.1) 0px, transparent 40%),
        radial-gradient(at 100% 0%, rgb(var(--chart-4) / 0.1) 0px, transparent 40%)
      `,
    },
    code: `<div className="w-full min-h-screen" style={{
      backgroundColor: "rgb(var(--color-background))",
      backgroundImage: \`
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
        radial-gradient(circle at 50% 50%, rgba(var(--color-surface), 1) 0%, transparent 100%),
        radial-gradient(at 0% 0%, rgba(var(--chart-2), 0.1) 0px, transparent 40%),
        radial-gradient(at 50% 100%, rgba(var(--chart-3), 0.1) 0px, transparent 40%),
        radial-gradient(at 100% 0%, rgba(var(--chart-4), 0.1) 0px, transparent 40%)
      \`
    }} />`,
  },
  {
    id: "neon-nebula",
    name: "Neon Nebula",
    category: "mesh",
    badge: "2026",
    description: "Centralized intense glow.",
    style: {
      backgroundColor: "rgb(var(--color-background))",
      backgroundImage: `
            ${noise},
            radial-gradient(circle at 50% 50%, rgb(var(--color-accent) / 0.2) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgb(var(--chart-5) / 0.15) 0%, transparent 40%)
          `
    },
    code: `<div className="w-full min-h-screen" style={{
        backgroundColor: "rgb(var(--color-background))",
        backgroundImage: \`
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
          radial-gradient(circle at 50% 50%, rgba(var(--color-accent), 0.2) 0%, transparent 60%),
          radial-gradient(circle at 80% 20%, rgba(var(--chart-5), 0.15) 0%, transparent 40%)
        \`
      }} />`
  },
  {
    id: "cyber-grid-2026",
    name: "Cyber Grid 2026",
    category: "geometric",
    badge: "Structure",
    style: {
      backgroundColor: "rgb(var(--color-background))",
      backgroundImage: `
            linear-gradient(rgb(var(--color-border) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgb(var(--color-border) / 0.1) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgb(var(--color-background) / 0) 0%, rgb(var(--color-background) / 1) 100%)
          `,
      backgroundSize: "40px 40px, 40px 40px, 100% 100%"
    },
    code: `<div className="w-full min-h-screen" style={{
       backgroundColor: "rgb(var(--color-background))",
       backgroundImage: \`
         linear-gradient(rgba(var(--color-border), 0.1) 1px, transparent 1px),
         linear-gradient(90deg, rgba(var(--color-border), 0.1) 1px, transparent 1px),
         radial-gradient(circle at 50% 50%, rgba(var(--color-background), 0) 0%, rgba(var(--color-background), 1) 100%)
       \`,
       backgroundSize: "40px 40px, 40px 40px, 100% 100%"
      }} />`
  },
  {
    id: "porcelain-network",
    name: "Porcelain Network",
    category: "mesh",
    badge: "Light",
    description: "Subtle, clean white pattern with tech feel.",
    style: {
      backgroundColor: "rgb(var(--color-surface))",
      backgroundImage: `
             radial-gradient(at 100% 0%, rgb(var(--color-secondary) / 0.5) 0px, transparent 50%),
             radial-gradient(at 0% 100%, rgb(var(--color-border) / 0.5) 0px, transparent 50%)
          `
    },
    code: `<div className="w-full min-h-screen bg-surface relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" 
              style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "32px 32px"
              }} 
          />
      </div>`
  },
  {
    id: "galactic-night",
    name: "Galactic Night",
    category: "animated",
    badge: "2026",
    description: "Interactive drifting starfield (CSS Box Shadow).",
    style: {
      backgroundColor: "rgb(var(--color-background))",
      backgroundImage: "radial-gradient(ellipse at bottom, rgb(var(--color-surface)), rgb(var(--color-background)))",
    },
    code: `<div className="w-full min-h-screen bg-background relative overflow-hidden">
        <style>{\`
          @keyframes animStar {
            from { transform: translateY(0px); }
            to { transform: translateY(-2000px); }
          }
        \`}</style>
        <div style={{
            width: '1px',
            height: '1px',
            background: 'transparent',
            boxShadow: '${boxshadowStars}',
            animation: 'animStar 50s linear infinite'
        }} />
      </div>`
  },
  {
    id: "neural-noise",
    name: "Neural Noise",
    category: "animated",
    badge: "2026",
    description: "Animated SVG noise overlay for organic feel.",
    style: {
      backgroundColor: "rgb(var(--color-background))",
    },
    code: `<div className="w-full min-h-screen relative bg-background">
      <svg className="opacity-20 fixed inset-0 w-full h-full pointer-events-none">
        <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>`
  }
];
