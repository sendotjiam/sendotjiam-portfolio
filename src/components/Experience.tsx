import Image from 'next/image';
import { experiences } from '@/data/experiences';

// Stitch high-res device previews corresponding to the top positions
const previewImages: Record<string, string> = {
  'Grab': 'https://lh3.googleusercontent.com/aida/AEtjO1UJ1kRLT8DLQOk-g1B0Pxpw7ZU_XbaV5D39yiOnwzzFrt9_WdxacdJA5976dYpu3yF1OhjOBFSw0A7MdiC0lCNXWTN_UVoqkEKjUuZuuNKg3a7kg4-6UFG-LTkREOxPGl7COfqTBv0i5d3skIlI4svOjUmMUf11B-AGtbo3il33Dwv7Fw2zv3kOtu6YBIa3_uNHcrcc-fWnAfzJuHzRLYnm7gx20DCK6ezDVZdf9bt2N_jD8KUx7Fcmtveu',
  'ByteDance (Tokopedia)': 'https://lh3.googleusercontent.com/aida/AEtjO1XZknxdcvirEKG9koalB2lBtK7YCrJC1BzQ_2zXixefCGRN-adb2eA3-K2rxKtKH8oAfepdZnnumeYNwL6-SiSaS2_owoz6Upa_ua8rwT8GIgVYxqrcnLQCZaBH4NySPnwjG_dv3laMpax3rBU4sHFBz1qErPh7bbL8ct4pHjOmTS_iKcg7zulQUkS1lh-FjakZFEoGEWO2Ilxn0dIoEDCki9CoB5QyBN0mFyf_8v_0dg38J4_HcTbmCf70',
  'Grab (OVO)': 'https://lh3.googleusercontent.com/aida/AEtjO1U8Ll5t568iwfDOFXNe_uEi6ts-JjT-tkmuOzqHoz4eAkyKz00ongYbqiF8dUaPaOfzCgKDqAtCKMG7s6HgLSmaJ55uAZbBYs0Xag6xfxPx8k5mNshGcdNnhg56mO6InVAfw8N6C0viSjMv0lVz_A5JnzfLqerdPHqMo6twDxHoiZWKVXpOSlgSuCLZyO5w-j8UR-z-M3vP7xXqOcuVRVTNaqFezgwzf3m6A8-TNj_NYKb0-2YoGDgmeB0O',
};

export default function Experience() {
  return (
    <section className="w-full pt-16 pb-12" id="experience">
      {/* Header Badge */}
      <div className="flex items-center justify-between gap-space-md mb-8">
        <div className="flex items-center gap-space-sm">
          <span className="font-mono-label text-mono-label text-primary dark:text-sky-400 font-semibold tracking-wider">
            01 / CAREER
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-white font-bold">
            Experience
          </h2>
        </div>
        <span className="font-mono-label text-mono-label text-slate-400 dark:text-slate-500 hidden sm:inline-block">
          2021 — PRESENT (3+ YEARS)
        </span>
      </div>

      {/* Career Timeline Stack */}
      <div className="relative flex flex-col gap-6 pl-4 md:pl-6">
        {/* Continuous Vertical Guide Line */}
        <div className="absolute left-[7px] md:left-[15px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

        {experiences.map((exp, index) => {
          const previewImg = previewImages[exp.company];
          const isLatest = index === 0;

          return (
            <div key={`${exp.company}-${exp.date}`} className="relative flex items-start gap-4 md:gap-6 group">
              {/* Concentric Timeline Node */}
              <div className="relative z-10 w-4 h-4 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center -ml-2 md:-ml-2 mt-1.5 shrink-0 ring-4 ring-white dark:ring-slate-900">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isLatest
                      ? 'bg-primary ring-2 ring-primary/20 dark:ring-sky-500/30'
                      : 'bg-slate-400 dark:bg-slate-600'
                  }`}
                ></div>
              </div>

              {/* Experience Card */}
              <div className="flex-1 p-6 sm:p-7 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200">
                {/* Header: Company & Title */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-3.5">
                    {/* Company Logo */}
                    <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800 shrink-0 shadow-sm relative">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-headline-sm text-headline-sm text-slate-900 dark:text-white font-bold">
                          {exp.company}
                        </span>
                        <span className="text-slate-400 dark:text-slate-600">•</span>
                        <span className="font-headline-sm text-headline-sm text-primary dark:text-sky-400 font-medium">
                          {exp.jobTitle}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Mobile Engineering
                      </p>
                    </div>
                  </div>

                  <span
                    className={`font-mono-label text-mono-label font-semibold px-2.5 py-1 rounded shrink-0 self-start border ${
                      isLatest
                        ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                        : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {exp.date.toUpperCase()}
                  </span>
                </div>

                {/* Content Layout: Details + Optional Device Mockup */}
                <div className={`grid grid-cols-1 ${previewImg ? 'md:grid-cols-12 gap-6' : ''} items-center`}>
                  <div className={`${previewImg ? 'md:col-span-7' : 'w-full'} flex flex-col justify-between gap-4`}>
                    <ul className="flex flex-col gap-2.5 font-body-md text-body-md text-slate-600 dark:text-slate-300">
                      {exp.desc.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${isLatest ? 'text-primary dark:text-sky-400' : 'text-slate-400 dark:text-slate-500'}`}>
                            check_circle
                          </span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono-label text-mono-label text-slate-700 dark:text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* App Store Link if available */}
                    {exp.appStoreLink && (
                      <div className="pt-1">
                        <a
                          href={exp.appStoreLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono-label text-mono-label text-primary dark:text-sky-400 hover:underline font-semibold"
                        >
                          <span>View on App Store</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Device Mockup Preview */}
                  {previewImg && (
                    <div className="md:col-span-5 flex justify-center mt-4 md:mt-0">
                      <div className="w-full max-w-[210px] rounded-2xl overflow-hidden border-2 border-slate-200/90 dark:border-slate-700 shadow-md bg-slate-50 dark:bg-slate-800 relative">
                        <img
                          src={previewImg}
                          alt={`${exp.company} mobile screen interface preview`}
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
