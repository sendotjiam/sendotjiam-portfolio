'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface MockClip {
  id: string;
  badge: string; // "⌥1", "1", "2", ... "0"
  type: 'JSON' | 'SQL' | 'TS' | 'URL' | 'HEX' | 'CODE' | 'PY' | 'JWT' | 'RS' | 'TXT';
  title: string;
  rawContent: string;
  sourceApp: string;
  lineCount: number;
  charCount: number;
  formattedSize: string;
  isPinned: boolean;
  copyCount?: number;
}

export type TransformCategory = 'All' | 'JSON' | 'Case' | 'Encoding' | 'Clean';

export interface TransformActionDef {
  id: string;
  name: string;
  category: 'JSON' | 'Case' | 'Encoding' | 'Clean';
  shortcutHint?: string;
  execute: (input: string) => string;
}

const TRANSFORM_ACTIONS: TransformActionDef[] = [
  // JSON
  {
    id: 'json.prettify',
    name: 'Prettify JSON',
    category: 'JSON',
    shortcutHint: '⌘J',
    execute: (str) => {
      try {
        return JSON.stringify(JSON.parse(str), null, 2);
      } catch {
        return str;
      }
    },
  },
  {
    id: 'json.minify',
    name: 'Minify JSON',
    category: 'JSON',
    shortcutHint: '⇧⌘J',
    execute: (str) => {
      try {
        return JSON.stringify(JSON.parse(str));
      } catch {
        return str.replace(/\s+/g, ' ').trim();
      }
    },
  },

  // Case
  {
    id: 'case.camel',
    name: 'camelCase',
    category: 'Case',
    shortcutHint: '⌥C',
    execute: (str) =>
      str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^([A-Z])/, (m) => m.toLowerCase())
        .trim(),
  },
  {
    id: 'case.snake',
    name: 'snake_case',
    category: 'Case',
    shortcutHint: '⌥S',
    execute: (str) =>
      str
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .toLowerCase()
        .replace(/^_+|_+$/g, ''),
  },
  {
    id: 'case.kebab',
    name: 'kebab-case',
    category: 'Case',
    shortcutHint: '⌥K',
    execute: (str) =>
      str
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .toLowerCase()
        .replace(/^-+|-+$/g, ''),
  },
  {
    id: 'case.pascal',
    name: 'PascalCase',
    category: 'Case',
    execute: (str) =>
      str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^([a-z])/, (m) => m.toUpperCase())
        .trim(),
  },
  {
    id: 'case.constant',
    name: 'CONSTANT_CASE',
    category: 'Case',
    execute: (str) =>
      str
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .toUpperCase()
        .replace(/^_+|_+$/g, ''),
  },

  // Encoding
  {
    id: 'enc.b64encode',
    name: 'Base64 Encode',
    category: 'Encoding',
    execute: (str) => {
      try {
        return btoa(unescape(encodeURIComponent(str)));
      } catch {
        return str;
      }
    },
  },
  {
    id: 'enc.b64decode',
    name: 'Base64 Decode',
    category: 'Encoding',
    shortcutHint: '⌘D',
    execute: (str) => {
      try {
        return decodeURIComponent(escape(atob(str.trim())));
      } catch {
        return str;
      }
    },
  },
  {
    id: 'enc.urlencode',
    name: 'URL Encode',
    category: 'Encoding',
    execute: (str) => encodeURIComponent(str),
  },
  {
    id: 'enc.urldecode',
    name: 'URL Decode',
    category: 'Encoding',
    execute: (str) => {
      try {
        return decodeURIComponent(str);
      } catch {
        return str;
      }
    },
  },

  // Clean
  {
    id: 'clean.stripMarkdown',
    name: 'Strip Markdown',
    category: 'Clean',
    shortcutHint: '⌘M',
    execute: (str) => str.replace(/[*_#`~[\]()]/g, '').trim(),
  },
  {
    id: 'clean.collapseWhitespace',
    name: 'Single Line / Collapse',
    category: 'Clean',
    execute: (str) => str.replace(/\s+/g, ' ').trim(),
  },
];

const INITIAL_CLIPS: MockClip[] = [
  // Pinned Items (⌥1, ⌥2)
  {
    id: 'pin-1',
    badge: '⌥1',
    type: 'CODE',
    title: 'export DATABASE_URL="postgres://user:pass@localhost:5432/zest"',
    rawContent: 'export DATABASE_URL="postgres://user:pass@localhost:5432/zest"\nexport REDIS_URL="redis://127.0.0.1:6379/0"\nexport NODE_ENV="production"',
    sourceApp: 'Terminal',
    lineCount: 3,
    charCount: 124,
    formattedSize: '124 B',
    isPinned: true,
  },
  {
    id: 'pin-2',
    badge: '⌥2',
    type: 'HEX',
    title: '#007AFF - iOS System Blue Accent Token',
    rawContent: '#007AFF',
    sourceApp: 'Figma',
    lineCount: 1,
    charCount: 7,
    formattedSize: '7 B',
    isPinned: true,
  },

  // Recent Items (1 to 9, 0 for 10th item)
  {
    id: 'clip-1',
    badge: '1',
    type: 'JSON',
    title: '{ "status": 200, "user": "sendo", "role": "admin" }',
    rawContent: '{\n  "status": 200,\n  "user": "sendo",\n  "role": "admin",\n  "verified": true,\n  "session": "sess_89f02c"\n}',
    sourceApp: 'Arc',
    lineCount: 7,
    charCount: 94,
    formattedSize: '94 B',
    isPinned: false,
    copyCount: 3,
  },
  {
    id: 'clip-2',
    badge: '2',
    type: 'SQL',
    title: 'SELECT id, email, created_at FROM users WHERE active = true',
    rawContent: 'SELECT id, email, created_at\nFROM users\nWHERE active = true\nORDER BY created_at DESC\nLIMIT 50;',
    sourceApp: 'TablePlus',
    lineCount: 5,
    charCount: 98,
    formattedSize: '98 B',
    isPinned: false,
  },
  {
    id: 'clip-3',
    badge: '3',
    type: 'TS',
    title: 'interface UserConfig { host: string; port: number; }',
    rawContent: 'export interface UserConfig {\n  host: string;\n  port: number;\n  debug: boolean;\n  timeoutMs: number;\n}',
    sourceApp: 'VS Code',
    lineCount: 6,
    charCount: 88,
    formattedSize: '88 B',
    isPinned: false,
  },
  {
    id: 'clip-4',
    badge: '4',
    type: 'URL',
    title: 'https://github.com/sendotjiam/zest',
    rawContent: 'https://github.com/sendotjiam/zest',
    sourceApp: 'Arc',
    lineCount: 1,
    charCount: 34,
    formattedSize: '34 B',
    isPinned: false,
    copyCount: 2,
  },
  {
    id: 'clip-5',
    badge: '5',
    type: 'PY',
    title: 'def fetch_metrics(service_id: str) -> dict:',
    rawContent: 'def fetch_metrics(service_id: str) -> dict:\n    """Fetch sub-millisecond metrics from local cache."""\n    return {\n        "status": "active",\n        "latency_ms": 3.2,\n    }',
    sourceApp: 'PyCharm',
    lineCount: 6,
    charCount: 172,
    formattedSize: '172 B',
    isPinned: false,
  },
  {
    id: 'clip-6',
    badge: '6',
    type: 'CODE',
    title: 'brew install sendotjiam/tap/zest',
    rawContent: 'brew tap sendotjiam/tap\nbrew install --cask zest',
    sourceApp: 'Terminal',
    lineCount: 2,
    charCount: 48,
    formattedSize: '48 B',
    isPinned: false,
  },
  {
    id: 'clip-7',
    badge: '7',
    type: 'JWT',
    title: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    rawContent: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNlbmRvIFRqaWFtaXMiLCJpYXQiOjE1MTYyMzkwMjJ9.4S-bL8q39Y2k',
    sourceApp: 'Postman',
    lineCount: 1,
    charCount: 134,
    formattedSize: '134 B',
    isPinned: false,
  },
  {
    id: 'clip-8',
    badge: '8',
    type: 'RS',
    title: 'pub fn zero_latency_paste(clip: &ClipItem) -> Result<()>',
    rawContent: 'pub fn zero_latency_paste(clip: &ClipItem) -> Result<(), PasteError> {\n    let event = CGEvent::new_keyboard_event(None, 0x09, true)?;\n    event.post(CGEventTapLocation::HID);\n    Ok(())\n}',
    sourceApp: 'Zed',
    lineCount: 5,
    charCount: 186,
    formattedSize: '186 B',
    isPinned: false,
  },
  {
    id: 'clip-9',
    badge: '9',
    type: 'TXT',
    title: '| Service | Latency | Status | RAM Budget |',
    rawContent: '| Service | Latency | Status | RAM Budget |\n|---------|---------|--------|------------|\n| Zest    | < 5ms   | Active | < 20MB     |\n| Legacy  | > 80ms  | Heavy  | ~280MB     |',
    sourceApp: 'Notes',
    lineCount: 4,
    charCount: 156,
    formattedSize: '156 B',
    isPinned: false,
  },
  {
    id: 'clip-10',
    badge: '0',
    type: 'HEX',
    title: '#E53E3E, #38A169, #3182CE (Tailwind Triad)',
    rawContent: '#E53E3E, #38A169, #3182CE',
    sourceApp: 'Figma',
    lineCount: 1,
    charCount: 26,
    formattedSize: '26 B',
    isPinned: false,
  },
];

export default function ZestSimulator() {
  const [hudOpen, setHudOpen] = useState(true);
  const [clips, setClips] = useState<MockClip[]>(INITIAL_CLIPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Deck Modes
  const [previewItem, setPreviewItem] = useState<MockClip | null>(null);
  const [transformItem, setTransformItem] = useState<MockClip | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TransformCategory>('All');
  const [activeTransform, setActiveTransform] = useState<TransformActionDef | null>(null);
  const [transformedPreview, setTransformedPreview] = useState<string | null>(null);

  // Editor State
  const [pastedCode, setPastedCode] = useState<string>('// Target cursor ready for 1-tap paste...\n');
  const [lastPastedTime, setLastPastedTime] = useState<number | null>(null);
  const [audioMuted, setAudioMuted] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showPrefToast, setShowPrefToast] = useState(false);

  // Theme synchronization (Auto / Light / Dark)
  const [hudThemeMode, setHudThemeMode] = useState<'auto' | 'light' | 'dark'>('auto');
  const [isSiteDark, setIsSiteDark] = useState<boolean>(false);

  useEffect(() => {
    const checkDark = () => {
      setIsSiteDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const isDark = hudThemeMode === 'auto' ? isSiteDark : hudThemeMode === 'dark';

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize tactile switch thock using Web Audio API
  const playThock = useCallback(() => {
    if (audioMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext policy
    }
  }, [audioMuted]);

  // Execute paste
  const executePaste = useCallback(
    (textToPaste: string) => {
      playThock();
      setPastedCode((prev) => `${prev.trimEnd()}\n${textToPaste}\n`);
      setHudOpen(false);
      setPreviewItem(null);
      setTransformItem(null);
      setLastPastedTime(Number((Math.random() * 1.5 + 2.1).toFixed(1))); // 2.1 - 3.6ms
    },
    [playThock]
  );

  // Reset transforms
  const resetTransform = useCallback(() => {
    setTransformItem(null);
    setActiveTransform(null);
    setTransformedPreview(null);
    setSelectedCategory('All');
  }, []);

  // Filter clips
  const filteredItems = clips.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.rawContent.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q) ||
      c.sourceApp.toLowerCase().includes(q)
    );
  });

  const pinnedList = filteredItems.filter((c) => c.isPinned);
  const recentList = filteredItems.filter((c) => !c.isPinned);

  // Flat list for keyboard index resolution
  const flatVisibleClips = searchQuery.trim() ? filteredItems : [...pinnedList, ...recentList];

  // Keyboard navigation & Shortcuts handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow normal typing inside the search input
      if (e.target instanceof HTMLInputElement && e.key !== 'Escape' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') {
        return;
      }

      // If guide modal is open, Esc closes it
      if (showGuideModal) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setShowGuideModal(false);
        }
        return;
      }

      if (hudOpen) {
        // Esc: close preview, close transform, or dismiss HUD
        if (e.key === 'Escape') {
          e.preventDefault();
          if (previewItem) {
            setPreviewItem(null);
          } else if (transformItem) {
            resetTransform();
          } else {
            setHudOpen(false);
          }
          return;
        }

        // Down Arrow: navigate down
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (!previewItem && !transformItem) {
            setHighlightedIndex((prev) => Math.min(prev + 1, Math.max(0, flatVisibleClips.length - 1)));
          }
          return;
        }

        // Up Arrow: navigate up
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (!previewItem && !transformItem) {
            setHighlightedIndex((prev) => Math.max(0, prev - 1));
          }
          return;
        }

        // Space: Toggle Quick Look Preview
        if (e.key === ' ') {
          if (!(e.target instanceof HTMLInputElement)) {
            e.preventDefault();
            if (previewItem) {
              setPreviewItem(null);
            } else if (!transformItem) {
              const current = flatVisibleClips[highlightedIndex];
              if (current) setPreviewItem(current);
            }
            return;
          }
        }

        // Tab: Toggle Transform Deck
        if (e.key === 'Tab') {
          e.preventDefault();
          if (transformItem) {
            resetTransform();
          } else if (!previewItem) {
            const current = flatVisibleClips[highlightedIndex];
            if (current) {
              setTransformItem(current);
              setActiveTransform(null);
              setTransformedPreview(null);
            }
          }
          return;
        }

        // Return: Paste current item or transformed text
        if (e.key === 'Enter') {
          e.preventDefault();
          if (previewItem) {
            executePaste(previewItem.rawContent);
          } else if (transformItem) {
            executePaste(transformedPreview ?? transformItem.rawContent);
          } else {
            const current = flatVisibleClips[highlightedIndex];
            if (current) executePaste(current.rawContent);
          }
          return;
        }

        // Option + Digit: Instant Paste Pinned Items (⌥1..⌥9)
        if (e.altKey && !e.ctrlKey && !e.metaKey) {
          const digit = parseInt(e.key, 10);
          if (!isNaN(digit) && digit >= 1 && digit <= 9) {
            e.preventDefault();
            const target = pinnedList[digit - 1];
            if (target) executePaste(target.rawContent);
            return;
          }
        }

        // Raw Digits: Instant 1-tap paste (1..9, 0)
        if (!e.altKey && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
          if (e.key >= '1' && e.key <= '9') {
            const idx = parseInt(e.key, 10) - 1;
            const target = recentList[idx];
            if (target && !transformItem && !previewItem) {
              e.preventDefault();
              executePaste(target.rawContent);
              return;
            }
          } else if (e.key === '0') {
            const target = recentList[9]; // 10th item
            if (target && !transformItem && !previewItem) {
              e.preventDefault();
              executePaste(target.rawContent);
              return;
            }
          }
        }
      } else {
        // Closed state: ⌘ + ⇧ + V reopens HUD
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'v') {
          e.preventDefault();
          setHudOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    hudOpen,
    previewItem,
    transformItem,
    transformedPreview,
    flatVisibleClips,
    highlightedIndex,
    pinnedList,
    recentList,
    executePaste,
    resetTransform,
    showGuideModal,
  ]);

  // High-contrast content type styling for both light and dark backgrounds
  const getTypeBadgeStyle = (type: MockClip['type']) => {
    if (isDark) {
      switch (type) {
        case 'JSON':
          return 'text-amber-400 bg-amber-500/20 border-amber-500/35';
        case 'SQL':
          return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/35';
        case 'TS':
        case 'URL':
          return 'text-blue-400 bg-blue-500/20 border-blue-500/35';
        case 'HEX':
          return 'text-pink-400 bg-pink-500/20 border-pink-500/35';
        case 'CODE':
        case 'RS':
          return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/35';
        case 'PY':
          return 'text-sky-400 bg-sky-500/20 border-sky-500/35';
        case 'JWT':
          return 'text-purple-400 bg-purple-500/20 border-purple-500/35';
        default:
          return 'text-neutral-300 bg-white/10 border-white/15';
      }
    } else {
      switch (type) {
        case 'JSON':
          return 'text-amber-800 bg-amber-100 border-amber-300';
        case 'SQL':
          return 'text-teal-800 bg-teal-100 border-teal-300';
        case 'TS':
        case 'URL':
          return 'text-blue-800 bg-blue-100 border-blue-300';
        case 'HEX':
          return 'text-pink-800 bg-pink-100 border-pink-300';
        case 'CODE':
        case 'RS':
          return 'text-emerald-800 bg-emerald-100 border-emerald-300';
        case 'PY':
          return 'text-sky-800 bg-sky-100 border-sky-300';
        case 'JWT':
          return 'text-purple-800 bg-purple-100 border-purple-300';
        default:
          return 'text-neutral-700 bg-neutral-200 border-neutral-300';
      }
    }
  };

  // Toggle pin status
  const handleTogglePin = (id: string) => {
    setClips((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return { ...c, isPinned: !c.isPinned };
        }
        return c;
      })
    );
  };

  // Delete clip
  const handleDeleteClip = (id: string) => {
    setClips((prev) => prev.filter((c) => c.id !== id));
    if (previewItem?.id === id) setPreviewItem(null);
    if (transformItem?.id === id) resetTransform();
  };

  // Trigger simulated screen OCR
  const handleTriggerOCR = () => {
    playThock();
    const ocrSnippet: MockClip = {
      id: `ocr-${Date.now()}`,
      badge: '1',
      type: 'TXT',
      title: 'Recognized text from screen area selection',
      rawContent: 'struct ZeroLatencyHUD {\n    let windowLevel: NSWindow.Level = .statusBar\n    let styleMask: NSWindow.StyleMask = [.nonactivatingPanel]\n}',
      sourceApp: 'Vision OCR',
      lineCount: 4,
      charCount: 140,
      formattedSize: '140 B',
      isPinned: false,
    };
    setClips((prev) => [ocrSnippet, ...prev]);
    setHighlightedIndex(0);
  };

  return (
    <section id="simulator" className="py-16 sm:py-20 border-t border-[var(--separator)]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-6">
          <div>
            <h2 className="text-[14px] font-semibold text-apple-secondary flex items-center gap-1.5">
              <span className="font-mono text-[12px] font-bold text-[var(--shuiro)]">01</span>
              <span>Interactive Demo</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1 text-balance">
              Live HUD Simulator
            </h3>
            <p className="text-[14px] text-apple-secondary mt-1">
              Exact 1:1 SwiftUI HUD recreation. Press digits 1 to 9, 0 to paste directly, Space for Quick Look, or Tab for in-flight transforms.
            </p>
          </div>
          <span className="text-[13px] font-medium text-apple-secondary">
            Sub-5ms Execution
          </span>
        </div>

        {/* Workbench Container (Simulates Active Desktop/IDE) */}
        <div className="apple-card rounded-2xl overflow-hidden border border-[var(--separator)] shadow-apple-md">
          {/* Top Title Bar */}
          <div className="h-10 px-3 sm:px-4 bg-black/[0.03] dark:bg-white/[0.03] border-b border-[var(--separator)] flex items-center justify-between text-[12px] gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 overflow-hidden">
              <span aria-hidden="true" className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[var(--shuiro)] inline-block shrink-0" />
              <span aria-hidden="true" className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[var(--brass)] inline-block shrink-0" />
              <span aria-hidden="true" className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[var(--teal)] inline-block shrink-0" />
              <span className="ml-1 sm:ml-2 font-sans text-apple-tertiary truncate text-[11px] sm:text-[12px]">
                <span className="sm:hidden">Target IDE Window</span>
                <span className="hidden sm:inline">Active IDE Window (Target Workspace)</span>
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setAudioMuted(!audioMuted)}
                className="text-apple-secondary hover:text-apple-label text-[11px] font-medium flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded min-h-[44px] px-1.5 sm:px-2"
                title={audioMuted ? 'Unmute mechanical sound' : 'Mute mechanical sound'}
              >
                <span>{audioMuted ? 'Audio Off' : 'Tactile Thock On'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPastedCode('// Target cursor ready for 1-tap paste...\n');
                  setClips(INITIAL_CLIPS);
                  setSearchQuery('');
                  setHudOpen(true);
                  setLastPastedTime(null);
                  setPreviewItem(null);
                  resetTransform();
                }}
                className="text-apple-tint hover:underline text-[11px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded min-h-[44px] px-1.5 sm:px-2 flex items-center"
              >
                Reset Demo
              </button>
            </div>
          </div>

          {/* Workbench Body */}
          <div className="relative min-h-[460px] sm:min-h-[500px] p-5 sm:p-7 font-mono text-[13px] sm:text-[14px] bg-apple-bg-grouped flex flex-col justify-between">
            {/* Target Editor Text */}
            <div className="overflow-x-auto whitespace-pre-wrap sm:whitespace-pre break-words leading-relaxed text-apple-label">
              <div className="text-apple-tertiary select-none font-sans text-[11px] sm:text-[12px] truncate">// Active Document: ConfigurationService.swift</div>
              <div className="text-apple-tertiary select-none font-sans text-[11px] sm:text-[12px] truncate">// Target caret remains focused without window defocusing:</div>
              <br />
              <span className="text-[var(--tint)]">{pastedCode}</span>
              <span aria-hidden="true" className="inline-block w-2 h-4 bg-apple-tint animate-pulse ml-0.5 align-middle" />
            </div>

            {/* Bottom Status / Benchmark Bar */}
            <div className="mt-8 pt-4 border-t border-[var(--separator)] flex flex-wrap items-center justify-between gap-3 text-[12px] font-sans">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[var(--teal)]" />
                <span className="text-apple-secondary">
                  Target App Focus: <strong className="text-apple-label">Retained (.nonactivatingPanel)</strong>
                </span>
                {lastPastedTime && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-[var(--teal-soft)] text-[var(--teal)] font-sans font-bold text-[11px] border border-[var(--teal-border)]">
                    Pasted in {lastPastedTime}ms
                  </span>
                )}
              </div>

              {!hudOpen ? (
                <button
                  type="button"
                  onClick={() => setHudOpen(true)}
                  className="min-h-[44px] px-3.5 py-2 rounded-lg bg-apple-tint text-white font-medium text-[12px] hover:bg-apple-tint-hover transition-colors shadow-apple-sm flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
                >
                  <span>Summon Zest HUD</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-[10px]">⌘⇧V</kbd>
                </button>
              ) : (
                <span className="text-apple-tertiary text-[11px]">
                  HUD active • Press Esc or click outside to dismiss
                </span>
              )}
            </div>

            {/* FLOATING ZEST HUD (High-Contrast 1:1 SwiftUI Replica, 390px fixed width) */}
            {hudOpen && (
              <div className="absolute left-3 right-3 top-5 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 w-auto sm:w-[390px] z-30 transition-opacity duration-150">
                <div
                  className={`relative rounded-[14px] ${
                    isDark ? 'zest-hud-surface-dark' : 'zest-hud-surface-light'
                  } border border-[#ff8a00]/35 shadow-[inset_0_1px_0_rgba(255,169,77,0.28)] shadow-apple-md backdrop-blur-2xl overflow-hidden flex flex-col min-h-[220px] max-h-[410px]`}
                >
                  {/* Subtle Top Citrus Ambient Bloom */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-24 rounded-full bg-[#ff8a00]/[0.16] blur-2xl"
                  />

                  {/* Molded Glass Search Bar */}
                  <div className="relative p-2.5 pb-2">
                    <div
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#ff6b00]/35 focus-within:border-[#ff6b00]/65 focus-within:ring-2 focus-within:ring-[#ff6b00]/15 transition-colors ${
                        isDark ? 'bg-black/50' : 'bg-black/[0.05]'
                      }`}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-3.5 h-3.5 shrink-0 text-[#ff6b00]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setHighlightedIndex(0);
                        }}
                        placeholder="Search clipboard..."
                        className={`w-full bg-transparent text-[12px] font-sans focus:outline-none ${
                          isDark
                            ? 'text-neutral-100 placeholder:text-neutral-400'
                            : 'text-neutral-900 placeholder:text-neutral-500'
                        }`}
                      />
                      {searchQuery ? (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className={`min-w-[32px] min-h-[32px] flex items-center justify-center text-[12px] rounded ${
                            isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                          aria-label="Clear search"
                        >
                          <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                          </svg>
                        </button>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[5px] bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)] text-white text-[9px] font-bold tracking-wide shrink-0 font-sans"
                        >
                          ⚡ ZEST
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Glass Light Refraction Line */}
                  <div className={`h-[0.75px] w-full ${isDark ? 'bg-white/[0.10]' : 'bg-black/[0.08]'}`} />

                  {/* DECK 1: QUICK LOOK DECK (Space) */}
                  {previewItem ? (
                    <div className="p-3 flex flex-col gap-2.5 flex-1 min-h-[220px]">
                      {/* Quick Look Header */}
                      <div className="flex items-center justify-between text-[10px] font-sans">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-mono font-bold text-[9px] px-1.5 py-0.5 rounded border ${getTypeBadgeStyle(
                              previewItem.type
                            )}`}
                          >
                            {previewItem.type}
                          </span>
                          <span className={`font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                            {previewItem.sourceApp}
                          </span>
                        </div>
                        <span className={`font-sans text-[10px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          {previewItem.lineCount} lines • {previewItem.charCount} chars
                        </span>
                      </div>

                      {/* Monospace Code Preview Box */}
                      <div
                        className={`flex-1 max-h-[170px] overflow-y-auto p-2.5 rounded-lg border border-[#ff8a00]/25 text-[11px] font-mono leading-relaxed whitespace-pre-wrap select-text ${
                          isDark
                            ? 'bg-black/60 text-neutral-100'
                            : 'bg-black/[0.04] text-neutral-900'
                        }`}
                      >
                        {previewItem.rawContent}
                      </div>

                      {/* Quick Look Action Buttons */}
                      <div className="flex items-center justify-between gap-2 pt-1 font-sans">
                        <button
                          type="button"
                          onClick={() => setPreviewItem(null)}
                          className={`min-h-[36px] px-3 py-1.5 rounded-md text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b00] ${
                            isDark
                              ? 'text-neutral-300 hover:text-white bg-white/[0.08] hover:bg-white/[0.14]'
                              : 'text-neutral-700 hover:text-neutral-900 bg-black/[0.06] hover:bg-black/[0.10]'
                          }`}
                        >
                          Close (Space)
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              playThock();
                              setPreviewItem(null);
                            }}
                            className={`min-h-[36px] px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b00] ${
                              isDark
                                ? 'text-neutral-200 bg-white/[0.10] hover:bg-white/[0.16]'
                                : 'text-neutral-800 bg-black/[0.06] hover:bg-black/[0.10]'
                            }`}
                          >
                            Copy
                          </button>
                          <button
                            type="button"
                            onClick={() => executePaste(previewItem.rawContent)}
                            className="min-h-[36px] px-3.5 py-1.5 rounded-md text-[11px] font-semibold text-white bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)] border border-white/30 shadow-apple-sm hover:brightness-105 transition-[filter] flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b00]"
                          >
                            <span>Paste</span>
                            <span className="text-[10px] font-bold">↵</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : transformItem ? (
                    /* DECK 2: TRANSFORM DECK (Tab) */
                    <div className="p-3 flex flex-col gap-2 flex-1 min-h-[220px]">
                      {/* Category Filter Pills */}
                      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px] font-sans scrollbar-none">
                        {(['All', 'JSON', 'Case', 'Encoding', 'Clean'] as TransformCategory[]).map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`min-h-[32px] px-2.5 py-1 rounded-full border transition-colors shrink-0 ${
                              selectedCategory === cat
                                ? 'bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)] text-white border-white/40 font-semibold'
                                : isDark
                                ? 'bg-white/[0.06] text-neutral-300 border-white/[0.10] hover:bg-white/[0.10]'
                                : 'bg-black/[0.05] text-neutral-700 border-black/10 hover:bg-black/[0.08]'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Transform Actions Carousel */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-sans scrollbar-none">
                        {TRANSFORM_ACTIONS.filter(
                          (a) => selectedCategory === 'All' || a.category === selectedCategory
                        ).map((action) => (
                          <button
                            key={action.id}
                            type="button"
                            onClick={() => {
                              playThock();
                              setActiveTransform(action);
                              setTransformedPreview(action.execute(transformItem.rawContent));
                            }}
                            className={`min-h-[34px] px-3 py-1.5 rounded-md border text-[11px] shrink-0 font-medium transition-colors ${
                              activeTransform?.id === action.id
                                ? 'bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)] text-white border-white/40 shadow-apple-sm'
                                : isDark
                                ? 'bg-white/[0.08] text-neutral-200 border-white/[0.12] hover:bg-white/[0.14]'
                                : 'bg-black/[0.05] text-neutral-800 border-black/10 hover:bg-black/[0.08]'
                            }`}
                          >
                            {action.name}
                          </button>
                        ))}
                      </div>

                      {/* Transformed Preview Box */}
                      <div
                        className={`flex-1 max-h-[140px] overflow-y-auto p-2.5 rounded-lg border border-[#ff8a00]/25 text-[11px] font-mono leading-relaxed whitespace-pre-wrap select-text ${
                          isDark
                            ? 'bg-black/60 text-neutral-100'
                            : 'bg-black/[0.04] text-neutral-900'
                        }`}
                      >
                        {transformedPreview ?? transformItem.rawContent}
                      </div>

                      {/* Deck Action Buttons */}
                      <div className="flex items-center justify-between gap-2 pt-1 font-sans">
                        <button
                          type="button"
                          onClick={() => {
                            handleDeleteClip(transformItem.id);
                          }}
                          className="min-w-[36px] min-h-[36px] rounded-md flex items-center justify-center bg-red-500/15 text-red-500 border border-red-500/30 hover:bg-red-500/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          title="Delete clip from history"
                          aria-label="Delete clip from history"
                        >
                          <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              playThock();
                              resetTransform();
                            }}
                            className={`min-h-[36px] px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint ${
                              isDark
                                ? 'text-neutral-200 bg-white/[0.10] hover:bg-white/[0.16]'
                                : 'text-neutral-800 bg-black/[0.06] hover:bg-black/[0.10]'
                            }`}
                          >
                            Copy
                          </button>
                          <button
                            type="button"
                            onClick={() => executePaste(transformedPreview ?? transformItem.rawContent)}
                            className="min-h-[36px] px-3.5 py-1.5 rounded-md text-[11px] font-semibold text-white bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)] border border-white/30 shadow-apple-sm hover:brightness-105 transition-[filter] flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
                          >
                            <span>Paste</span>
                            <span className="text-[10px] font-bold">↵</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* DECK 0: MAIN CLIP LIST (PINNED + RECENT) */
                    <div className="flex-1 overflow-y-auto px-1.5 py-1 max-h-[270px] scrollbar-thin">
                      {flatVisibleClips.length === 0 ? (
                        <div
                          className={`py-8 flex flex-col items-center justify-center text-center gap-1.5 ${
                            isDark ? 'text-neutral-400' : 'text-neutral-500'
                          }`}
                        >
                          <svg aria-hidden="true" className="w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <span className="text-[11px]">No matching clipboard items</span>
                        </div>
                      ) : (
                        <>
                          {/* PINNED SECTION */}
                          {!searchQuery.trim() && pinnedList.length > 0 && (
                            <div className="mb-1">
                              <div className="px-2 pt-1.5 pb-0.5 text-[9px] font-bold font-sans text-amber-600 dark:text-amber-400">
                                Pinned
                              </div>
                              <div className="flex flex-col gap-0.5">
                                {pinnedList.map((clip, idx) => {
                                  const isHighlighted = highlightedIndex === idx;
                                  return (
                                    <div
                                      key={clip.id}
                                      onClick={() => executePaste(clip.rawContent)}
                                      onMouseEnter={() => setHighlightedIndex(idx)}
                                      className={`relative h-[34px] px-2 rounded-lg flex items-center justify-between gap-2 cursor-pointer transition-colors border select-none ${
                                        isHighlighted
                                          ? 'bg-gradient-to-r from-[#ff6b00]/[0.16] to-[#f59e0b]/[0.06] border-[#ff6b00]/45 shadow-apple-sm'
                                          : isDark
                                          ? 'bg-transparent border-transparent hover:bg-white/[0.06]'
                                          : 'bg-transparent border-transparent hover:bg-black/[0.04]'
                                      }`}
                                    >
                                      {isHighlighted && (
                                        <span
                                          aria-hidden="true"
                                          className="absolute left-0.5 top-1.5 bottom-1.5 w-[2.5px] rounded-full bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)]"
                                        />
                                      )}
                                      {/* Left: Shortcut Bead + Pin Icon + Type Badge + Title */}
                                      <div className="flex items-center gap-1.5 overflow-hidden">
                                        <span
                                          className={`w-[22px] h-[18px] text-[9px] font-bold font-mono rounded-[4px] flex items-center justify-center shrink-0 border ${
                                            isHighlighted
                                              ? 'bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)] text-white border-white/40 shadow-apple-sm'
                                              : isDark
                                              ? 'bg-orange-500/20 text-orange-400 border-orange-500/35'
                                              : 'bg-orange-500/15 text-orange-700 border-orange-500/30'
                                          }`}
                                        >
                                          {clip.badge}
                                        </span>

                                        <svg
                                          aria-hidden="true"
                                          className="w-3 h-3 text-orange-500 shrink-0 fill-current"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M16 9V4l1 0V2H7v2l1 0v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z" />
                                        </svg>

                                        <span
                                          className={`font-mono font-bold text-[9px] px-1 py-0.5 rounded border shrink-0 ${getTypeBadgeStyle(
                                            clip.type
                                          )}`}
                                        >
                                          {clip.type}
                                        </span>

                                        <span
                                          className={`text-[12px] truncate font-sans font-normal ${
                                            isDark ? 'text-neutral-100' : 'text-neutral-900'
                                          }`}
                                        >
                                          {clip.title}
                                        </span>
                                      </div>

                                      {/* Right: Actions or File Size */}
                                      {isHighlighted ? (
                                        <div
                                          onClick={(e) => e.stopPropagation()}
                                          className={`flex items-center gap-0.5 p-0.5 rounded border shrink-0 ${
                                            isDark
                                              ? 'bg-white/[0.08] border-white/10'
                                              : 'bg-black/[0.06] border-black/10'
                                          }`}
                                        >
                                          <button
                                            type="button"
                                            onClick={() => handleTogglePin(clip.id)}
                                            className="w-5 h-5 rounded flex items-center justify-center text-orange-500 hover:bg-black/10 dark:hover:bg-white/[0.14]"
                                            title="Unpin snippet"
                                            aria-label="Unpin snippet"
                                          >
                                            <svg aria-hidden="true" className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                              <path d="M16 9V4l1 0V2H7v2l1 0v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z" />
                                            </svg>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setPreviewItem(clip)}
                                            className={`w-5 h-5 rounded flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/[0.14] ${
                                              isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'
                                            }`}
                                            title="Quick Look Preview (Space)"
                                            aria-label="Quick Look Preview"
                                          >
                                            <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                              <circle cx="12" cy="12" r="3" />
                                            </svg>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setTransformItem(clip);
                                              setActiveTransform(null);
                                              setTransformedPreview(null);
                                            }}
                                            className="w-5 h-5 rounded flex items-center justify-center text-[#ff6b00] hover:bg-black/10 dark:hover:bg-white/[0.14]"
                                            title="Transform Deck (Tab)"
                                            aria-label="Transform Deck"
                                          >
                                            <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                              <line x1="4" y1="21" x2="4" y2="14" />
                                              <line x1="4" y1="10" x2="4" y2="3" />
                                              <line x1="12" y1="21" x2="12" y2="12" />
                                              <line x1="12" y1="8" x2="12" y2="3" />
                                              <line x1="20" y1="21" x2="20" y2="16" />
                                              <line x1="20" y1="12" x2="20" y2="3" />
                                            </svg>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleDeleteClip(clip.id)}
                                            className="w-5 h-5 rounded flex items-center justify-center text-red-500 hover:bg-red-500/15"
                                            title="Delete clip"
                                            aria-label="Delete clip"
                                          >
                                            <svg aria-hidden="true" className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                              <line x1="18" y1="6" x2="6" y2="18" />
                                              <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                          </button>
                                        </div>
                                      ) : (
                                        <span
                                          className={`text-[10px] font-mono shrink-0 ${
                                            isDark ? 'text-neutral-400' : 'text-neutral-500'
                                          }`}
                                        >
                                          {clip.formattedSize}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* RECENT SECTION */}
                          <div>
                            {!searchQuery.trim() && (
                              <div
                                className={`px-2 pt-1.5 pb-0.5 text-[9px] font-bold font-sans ${
                                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                              >
                                Recent
                              </div>
                            )}
                            <div className="flex flex-col gap-0.5">
                              {recentList.map((clip, idx) => {
                                const globalIdx = searchQuery.trim() ? idx : pinnedList.length + idx;
                                const isHighlighted = highlightedIndex === globalIdx;
                                return (
                                  <div
                                    key={clip.id}
                                    onClick={() => executePaste(clip.rawContent)}
                                    onMouseEnter={() => setHighlightedIndex(globalIdx)}
                                    className={`relative h-[34px] px-2 rounded-lg flex items-center justify-between gap-2 cursor-pointer transition-colors border select-none ${
                                      isHighlighted
                                        ? 'bg-gradient-to-r from-[#ff6b00]/[0.16] to-[#f59e0b]/[0.06] border-[#ff6b00]/45 shadow-apple-sm'
                                        : isDark
                                        ? 'bg-transparent border-transparent hover:bg-white/[0.06]'
                                        : 'bg-transparent border-transparent hover:bg-black/[0.04]'
                                    }`}
                                  >
                                    {isHighlighted && (
                                      <span
                                        aria-hidden="true"
                                        className="absolute left-0.5 top-1.5 bottom-1.5 w-[2.5px] rounded-full bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)]"
                                      />
                                    )}
                                    {/* Left: Shortcut Bead + Type Badge + Title */}
                                    <div className="flex items-center gap-1.5 overflow-hidden">
                                      <span
                                        className={`w-[18px] h-[18px] text-[11px] font-bold font-mono rounded-[4px] flex items-center justify-center shrink-0 border ${
                                          isHighlighted
                                            ? 'bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)] text-white border-white/40 shadow-apple-sm'
                                            : isDark
                                            ? 'bg-white/[0.10] text-neutral-200 border-white/[0.12]'
                                            : 'bg-black/[0.07] text-neutral-700 border-black/10'
                                        }`}
                                      >
                                        {clip.badge}
                                      </span>

                                      <span
                                        className={`font-mono font-bold text-[9px] px-1 py-0.5 rounded border shrink-0 ${getTypeBadgeStyle(
                                          clip.type
                                        )}`}
                                      >
                                        {clip.type}
                                      </span>

                                      <span
                                        className={`text-[12px] truncate font-sans font-normal ${
                                          isDark ? 'text-neutral-100' : 'text-neutral-900'
                                        }`}
                                      >
                                        {clip.title}
                                      </span>
                                    </div>

                                    {/* Right: Actions or File Size / Duplicate Count */}
                                    {isHighlighted ? (
                                      <div
                                        onClick={(e) => e.stopPropagation()}
                                        className={`flex items-center gap-0.5 p-0.5 rounded border shrink-0 ${
                                          isDark
                                            ? 'bg-white/[0.08] border-white/10'
                                            : 'bg-black/[0.06] border-black/10'
                                        }`}
                                      >
                                        <button
                                          type="button"
                                          onClick={() => handleTogglePin(clip.id)}
                                          className={`w-5 h-5 rounded flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/[0.14] ${
                                            isDark ? 'text-neutral-300 hover:text-orange-400' : 'text-neutral-700 hover:text-orange-600'
                                          }`}
                                          title="Pin snippet permanently (⌥)"
                                          aria-label="Pin snippet"
                                        >
                                          <svg aria-hidden="true" className="w-3 h-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                            <path d="M16 9V4l1 0V2H7v2l1 0v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z" />
                                          </svg>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setPreviewItem(clip)}
                                          className={`w-5 h-5 rounded flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/[0.14] ${
                                            isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'
                                          }`}
                                          title="Quick Look Preview (Space)"
                                          aria-label="Quick Look Preview"
                                        >
                                          <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                          </svg>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setTransformItem(clip);
                                            setActiveTransform(null);
                                            setTransformedPreview(null);
                                          }}
                                          className="w-5 h-5 rounded flex items-center justify-center text-[#ff6b00] hover:bg-black/10 dark:hover:bg-white/[0.14]"
                                          title="Transform Deck (Tab)"
                                          aria-label="Transform Deck"
                                        >
                                          <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="4" y1="21" x2="4" y2="14" />
                                            <line x1="4" y1="10" x2="4" y2="3" />
                                            <line x1="12" y1="21" x2="12" y2="12" />
                                            <line x1="12" y1="8" x2="12" y2="3" />
                                            <line x1="20" y1="21" x2="20" y2="16" />
                                            <line x1="20" y1="12" x2="20" y2="3" />
                                          </svg>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteClip(clip.id)}
                                          className="w-5 h-5 rounded flex items-center justify-center text-red-500 hover:bg-red-500/15"
                                          title="Delete clip"
                                          aria-label="Delete clip"
                                        >
                                          <svg aria-hidden="true" className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                          </svg>
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        {clip.copyCount && clip.copyCount > 1 && (
                                          <span
                                            className={`px-1.5 py-0.2 rounded-full text-[9px] font-sans ${
                                              isDark
                                                ? 'bg-white/[0.08] text-neutral-300'
                                                : 'bg-black/[0.06] text-neutral-600'
                                            }`}
                                          >
                                            {clip.copyCount}
                                          </span>
                                        )}
                                        <span
                                          className={`text-[10px] font-mono shrink-0 ${
                                            isDark ? 'text-neutral-400' : 'text-neutral-500'
                                          }`}
                                        >
                                          {clip.formattedSize}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Glass Light Refraction Line */}
                  <div className={`h-[0.75px] w-full ${isDark ? 'bg-white/[0.10]' : 'bg-black/[0.08]'}`} />

                  {/* LIQUID GLASS FOOTER BAR (Exact 1:1 SwiftUI Replica) */}
                  <div
                    className={`min-h-[36px] h-9 px-2.5 sm:px-3 flex items-center justify-between text-[11px] font-sans border-t gap-2 overflow-hidden shrink-0 ${
                      isDark
                        ? 'bg-black/50 border-white/[0.10] text-neutral-300'
                        : 'bg-black/[0.03] border-black/10 text-neutral-700'
                    }`}
                  >
                    {/* Left: Back button or Tap footer */}
                    {previewItem || transformItem ? (
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewItem(null);
                          resetTransform();
                        }}
                        className={`flex items-center gap-1 min-h-[30px] px-2.5 py-1 rounded-full font-semibold text-[11px] transition-colors border whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b00] ${
                          isDark
                            ? 'bg-white/[0.10] hover:bg-[#ff6b00]/15 text-neutral-200 border-white/[0.14] hover:border-[#ff6b00]/45'
                            : 'bg-black/[0.06] hover:bg-[#ff6b00]/15 text-neutral-800 border-black/10 hover:border-[#ff6b00]/45'
                        }`}
                      >
                        <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <span>Back</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                        <span className={`truncate ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                          <span className="hidden sm:inline">Tap 1-9, 0 to paste directly</span>
                          <span className="sm:hidden font-medium">1-9, 0 to paste</span>
                        </span>
                        <span className="opacity-40 select-none">•</span>
                        <button
                          type="button"
                          onClick={() => setClips([])}
                          className={`min-h-[30px] px-1 inline-flex items-center transition-colors whitespace-nowrap shrink-0 ${
                            isDark ? 'text-neutral-400 hover:text-red-400' : 'text-neutral-600 hover:text-red-600'
                          }`}
                        >
                          Clear
                        </button>
                      </div>
                    )}

                    {/* Right Utility Group: 5 Uniform Circle Buttons */}
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                      {/* 1. Theme Toggle (Emphasized Citrus Accent) */}
                      <button
                        type="button"
                        onClick={() => {
                          playThock();
                          setHudThemeMode((prev) => {
                            if (prev === 'auto') return 'dark';
                            if (prev === 'dark') return 'light';
                            return 'auto';
                          });
                        }}
                        className="w-[22px] h-[22px] relative before:absolute before:-inset-1.5 before:content-[''] rounded-full flex items-center justify-center border border-[#ff6b00]/35 bg-[#ff6b00]/10 text-[#ff6b00] hover:bg-[#ff6b00]/20 hover:border-[#ff6b00]/60 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b00]"
                        title={`Theme: ${hudThemeMode === 'auto' ? 'Auto (System)' : hudThemeMode === 'dark' ? 'Dark' : 'Light'} (Click to cycle)`}
                        aria-label="Toggle HUD Theme"
                      >
                        <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1 0-16z" />
                        </svg>
                      </button>

                      {/* 2. Screen OCR Snip */}
                      <button
                        type="button"
                        onClick={handleTriggerOCR}
                        className={`w-[22px] h-[22px] relative before:absolute before:-inset-1.5 before:content-[''] rounded-full flex items-center justify-center border transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b00] ${
                          isDark
                            ? 'bg-white/[0.08] hover:bg-[#ff6b00]/15 border-white/[0.14] hover:border-[#ff6b00]/50 text-neutral-300 hover:text-[#ff6b00]'
                            : 'bg-black/[0.06] hover:bg-[#ff6b00]/15 border-black/10 hover:border-[#ff6b00]/50 text-neutral-700 hover:text-[#ea580c]'
                        }`}
                        title="Capture Screen Text (Vision OCR)"
                        aria-label="Capture Screen Text"
                      >
                        <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                      </button>

                      {/* 3. Shortcuts & Guide */}
                      <button
                        type="button"
                        onClick={() => setShowGuideModal(true)}
                        className={`w-[22px] h-[22px] relative before:absolute before:-inset-1.5 before:content-[''] rounded-full flex items-center justify-center border transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b00] ${
                          isDark
                            ? 'bg-white/[0.08] hover:bg-[#ff6b00]/15 border-white/[0.14] hover:border-[#ff6b00]/50 text-neutral-300 hover:text-[#ff6b00]'
                            : 'bg-black/[0.06] hover:bg-[#ff6b00]/15 border-black/10 hover:border-[#ff6b00]/50 text-neutral-700 hover:text-[#ea580c]'
                        }`}
                        title="Keyboard Shortcuts & Guide"
                        aria-label="Keyboard Shortcuts and Guide"
                      >
                        <svg aria-hidden="true" className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .88-.36 1.68-.93 2.25z" />
                        </svg>
                      </button>

                      {/* 4. Preferences */}
                      <button
                        type="button"
                        onClick={() => {
                          setShowPrefToast(true);
                          setTimeout(() => setShowPrefToast(false), 2500);
                        }}
                        className={`w-[22px] h-[22px] relative before:absolute before:-inset-1.5 before:content-[''] rounded-full flex items-center justify-center border transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b00] ${
                          isDark
                            ? 'bg-white/[0.08] hover:bg-[#ff6b00]/15 border-white/[0.14] hover:border-[#ff6b00]/50 text-neutral-300 hover:text-[#ff6b00]'
                            : 'bg-black/[0.06] hover:bg-[#ff6b00]/15 border-black/10 hover:border-[#ff6b00]/50 text-neutral-700 hover:text-[#ea580c]'
                        }`}
                        title="Open Preferences (⌘,)"
                        aria-label="Open Preferences"
                      >
                        <svg aria-hidden="true" className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                        </svg>
                      </button>

                      {/* 5. Quit / Dismiss */}
                      <button
                        type="button"
                        onClick={() => setHudOpen(false)}
                        className={`w-[22px] h-[22px] relative before:absolute before:-inset-1.5 before:content-[''] rounded-full flex items-center justify-center border transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b00] ${
                          isDark
                            ? 'bg-white/[0.08] hover:bg-white/[0.16] border-white/[0.14] text-neutral-300 hover:text-red-400'
                            : 'bg-black/[0.06] hover:bg-black/[0.12] border-black/10 text-neutral-700 hover:text-red-600'
                        }`}
                        title="Dismiss HUD (Esc)"
                        aria-label="Dismiss HUD"
                      >
                        <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                          <line x1="12" y1="2" x2="12" y2="12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Simulated Preferences Toast */}
                  {showPrefToast && (
                    <div
                      className={`absolute inset-x-4 top-14 p-3 rounded-lg border text-[11px] shadow-apple-md z-40 animate-in fade-in ${
                        isDark ? 'bg-black/90 text-white border-white/20' : 'bg-white text-neutral-900 border-black/15'
                      }`}
                    >
                      <div className={`font-semibold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                        Zest Preferences
                      </div>
                      <div className={`mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        Shortcut: ⌘⇧V / Vision OCR: ⌘⇧2 / Limit: 50 clips
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Shortcuts Guide Modal (Matches ShortcutsGuideView.swift) */}
            {showGuideModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                <div
                  className={`w-full max-w-md rounded-2xl p-5 shadow-apple-md max-h-[85vh] overflow-y-auto font-sans border ${
                    isDark
                      ? 'bg-[var(--zest-guide)] text-white border-white/15'
                      : 'bg-white text-neutral-900 border-black/15'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between pb-3 border-b mb-4 ${
                      isDark ? 'border-white/10' : 'border-black/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#ff6b00]/15 text-[#ff6b00] flex items-center justify-center font-bold text-[13px]">
                        ⌘
                      </div>
                      <div>
                        <h3 className={`font-bold text-[15px] ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                          Keyboard Shortcuts & Guide
                        </h3>
                        <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          Master every keystroke and power feature in Zest
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowGuideModal(false)}
                      className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint ${
                        isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                      aria-label="Close guide"
                    >
                      <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4 text-[12px]">
                    {/* Section 1 */}
                    <div>
                      <div className="font-semibold text-amber-500 text-[11px] mb-2">
                        1-Tap Fast Pasting
                      </div>
                      <div className="space-y-1.5">
                        <div
                          className={`flex items-center justify-between py-1 border-b ${
                            isDark ? 'border-white/5' : 'border-black/5'
                          }`}
                        >
                          <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>Summon Zest HUD</span>
                          <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                            ⌘⇧V
                          </kbd>
                        </div>
                        <div
                          className={`flex items-center justify-between py-1 border-b ${
                            isDark ? 'border-white/5' : 'border-black/5'
                          }`}
                        >
                          <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>Instant paste clips 1 to 9</span>
                          <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                            1 - 9
                          </kbd>
                        </div>
                        <div
                          className={`flex items-center justify-between py-1 border-b ${
                            isDark ? 'border-white/5' : 'border-black/5'
                          }`}
                        >
                          <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>Instant paste 10th clip</span>
                          <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                            0
                          </kbd>
                        </div>
                        <div
                          className={`flex items-center justify-between py-1 border-b ${
                            isDark ? 'border-white/5' : 'border-black/5'
                          }`}
                        >
                          <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>Instant paste pinned snippets</span>
                          <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                            ⌥1 - ⌥9
                          </kbd>
                        </div>
                        <div
                          className={`flex items-center justify-between py-1 border-b ${
                            isDark ? 'border-white/5' : 'border-black/5'
                          }`}
                        >
                          <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>Paste highlighted item</span>
                          <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                            ↵ (Return)
                          </kbd>
                        </div>
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                      <div className="font-semibold text-[#ff6b00] text-[11px] mb-2">
                        Quick Look & Navigation
                      </div>
                      <div className="space-y-1.5">
                        <div
                          className={`flex items-center justify-between py-1 border-b ${
                            isDark ? 'border-white/5' : 'border-black/5'
                          }`}
                        >
                          <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>Toggle Quick Look monospace preview</span>
                          <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                            Space
                          </kbd>
                        </div>
                        <div
                          className={`flex items-center justify-between py-1 border-b ${
                            isDark ? 'border-white/5' : 'border-black/5'
                          }`}
                        >
                          <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>Open in-flight Transform Deck</span>
                          <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                            Tab
                          </kbd>
                        </div>
                        <div
                          className={`flex items-center justify-between py-1 border-b ${
                            isDark ? 'border-white/5' : 'border-black/5'
                          }`}
                        >
                          <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>Navigate clips up and down</span>
                          <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                            ↓ / ↑
                          </kbd>
                        </div>
                        <div
                          className={`flex items-center justify-between py-1 border-b ${
                            isDark ? 'border-white/5' : 'border-black/5'
                          }`}
                        >
                          <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>Dismiss deck or close HUD</span>
                          <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                            Esc
                          </kbd>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-5 pt-3 border-t flex justify-end ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                    <button
                      type="button"
                      onClick={() => setShowGuideModal(false)}
                      className="min-h-[44px] px-5 py-2 rounded-xl bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)] text-white font-semibold text-[13px] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b00]"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
