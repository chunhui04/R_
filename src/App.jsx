import { useState, useEffect, useRef } from "react";

const CARDS = [
  { id: 1,  name: "騎士",   emoji: "🐎", keywords: "消息、速度、行動" },
  { id: 2,  name: "苜蓿",   emoji: "🍀", keywords: "小運氣、機會、驚喜" },
  { id: 3,  name: "輪船",   emoji: "⛵", keywords: "旅行、遠方、移動" },
  { id: 4,  name: "房屋",   emoji: "🏠", keywords: "家庭、穩定、安全" },
  { id: 5,  name: "樹木",   emoji: "🌳", keywords: "健康、成長、生命力" },
  { id: 6,  name: "烏雲",   emoji: "☁️", keywords: "混亂、不確定、阻礙" },
  { id: 7,  name: "蛇",     emoji: "🐍", keywords: "複雜、誘惑、女性" },
  { id: 8,  name: "棺材",   emoji: "⚰️", keywords: "結束、轉化、告別" },
  { id: 9,  name: "花束",   emoji: "💐", keywords: "禮物、喜悅、驚喜" },
  { id: 10, name: "鐮刀",   emoji: "⚔️", keywords: "切斷、決定、收割" },
  { id: 11, name: "鞭子",   emoji: "🔥", keywords: "衝突、重複、激情" },
  { id: 12, name: "鳥",     emoji: "🕊️", keywords: "溝通、消息、焦慮" },
  { id: 13, name: "孩子",   emoji: "🧒", keywords: "新開始、純真、小事" },
  { id: 14, name: "狐狸",   emoji: "🦊", keywords: "聰明、狡詐、工作" },
  { id: 15, name: "熊",     emoji: "🐻", keywords: "力量、財務、保護" },
  { id: 16, name: "星星",   emoji: "⭐", keywords: "希望、靈感、引導" },
  { id: 17, name: "鸛鳥",   emoji: "🦢", keywords: "改變、移動、孕育" },
  { id: 18, name: "狗",     emoji: "🐕", keywords: "友誼、忠誠、信任" },
  { id: 19, name: "塔",     emoji: "🗼", keywords: "孤獨、機構、距離" },
  { id: 20, name: "花園",   emoji: "🌸", keywords: "社交、公眾、聚會" },
  { id: 21, name: "山",     emoji: "⛰️", keywords: "障礙、挑戰、延遲" },
  { id: 22, name: "十字路", emoji: "🔀", keywords: "選擇、方向、自由" },
  { id: 23, name: "老鼠",   emoji: "🐭", keywords: "損失、偷竊、焦慮" },
  { id: 24, name: "心",     emoji: "❤️", keywords: "愛情、感情、熱情" },
  { id: 25, name: "戒指",   emoji: "💍", keywords: "承諾、合約、循環" },
  { id: 26, name: "書",     emoji: "📖", keywords: "秘密、知識、學習" },
  { id: 27, name: "信件",   emoji: "📨", keywords: "文件、通訊、消息" },
  { id: 28, name: "男人",   emoji: "🧔", keywords: "男性人物、主角" },
  { id: 29, name: "女人",   emoji: "👩", keywords: "女性人物、主角" },
  { id: 30, name: "百合",   emoji: "🌷", keywords: "純潔、和諧、成熟" },
  { id: 31, name: "太陽",   emoji: "☀️", keywords: "成功、活力、清晰" },
  { id: 32, name: "月亮",   emoji: "🌙", keywords: "情感、直覺、榮耀" },
  { id: 33, name: "鑰匙",   emoji: "🗝️", keywords: "解答、開啟、確定" },
  { id: 34, name: "魚",     emoji: "🐟", keywords: "金錢、豐盛、流動" },
  { id: 35, name: "錨",     emoji: "⚓", keywords: "穩定、堅持、目標" },
  { id: 36, name: "十字架", emoji: "✝️", keywords: "命運、責任、試煉" },
];

const THEMES = [
  { bg: "linear-gradient(160deg,#ffd6e7,#ffb3c6)", border: "#ff85a1", glow: "rgba(255,133,161,0.5)" },
  { bg: "linear-gradient(160deg,#d4f5d4,#b8edbe)", border: "#6fcf97", glow: "rgba(111,207,151,0.5)" },
  { bg: "linear-gradient(160deg,#c9e8ff,#a8d4f5)", border: "#56b3e0", glow: "rgba(86,179,224,0.5)" },
  { bg: "linear-gradient(160deg,#ffe8c2,#ffd49a)", border: "#f5a623", glow: "rgba(245,166,35,0.5)" },
  { bg: "linear-gradient(160deg,#d4edda,#b8dfc3)", border: "#52b788", glow: "rgba(82,183,136,0.5)" },
  { bg: "linear-gradient(160deg,#e8d5fe,#d4b8fd)", border: "#a78bfa", glow: "rgba(167,139,250,0.5)" },
  { bg: "linear-gradient(160deg,#fde2e2,#fbc4c4)", border: "#f87171", glow: "rgba(248,113,113,0.5)" },
  { bg: "linear-gradient(160deg,#e8eaf0,#d0d5e8)", border: "#94a3b8", glow: "rgba(148,163,184,0.5)" },
  { bg: "linear-gradient(160deg,#fdf2c0,#fde68a)", border: "#f59e0b", glow: "rgba(245,158,11,0.5)" },
  { bg: "linear-gradient(160deg,#fee2e2,#fca5a5)", border: "#ef4444", glow: "rgba(239,68,68,0.5)" },
  { bg: "linear-gradient(160deg,#ffe4d6,#ffcba4)", border: "#fb923c", glow: "rgba(251,146,60,0.5)" },
  { bg: "linear-gradient(160deg,#e0f2fe,#bae6fd)", border: "#38bdf8", glow: "rgba(56,189,248,0.5)" },
  { bg: "linear-gradient(160deg,#fce7f3,#fbcfe8)", border: "#f472b6", glow: "rgba(244,114,182,0.5)" },
  { bg: "linear-gradient(160deg,#fef9c3,#fef08a)", border: "#facc15", glow: "rgba(250,204,21,0.5)" },
  { bg: "linear-gradient(160deg,#fde8d0,#fbd3a8)", border: "#ea580c", glow: "rgba(234,88,12,0.5)" },
  { bg: "linear-gradient(160deg,#fefce8,#fef9c3)", border: "#eab308", glow: "rgba(234,179,8,0.5)" },
  { bg: "linear-gradient(160deg,#d1fae5,#a7f3d0)", border: "#10b981", glow: "rgba(16,185,129,0.5)" },
  { bg: "linear-gradient(160deg,#dbeafe,#bfdbfe)", border: "#3b82f6", glow: "rgba(59,130,246,0.5)" },
  { bg: "linear-gradient(160deg,#f1f5f9,#e2e8f0)", border: "#64748b", glow: "rgba(100,116,139,0.5)" },
  { bg: "linear-gradient(160deg,#fce7f3,#f9a8d4)", border: "#ec4899", glow: "rgba(236,72,153,0.5)" },
  { bg: "linear-gradient(160deg,#e0e7ff,#c7d2fe)", border: "#6366f1", glow: "rgba(99,102,241,0.5)" },
  { bg: "linear-gradient(160deg,#f0fdf4,#dcfce7)", border: "#22c55e", glow: "rgba(34,197,94,0.5)" },
  { bg: "linear-gradient(160deg,#f5f5f5,#e5e5e5)", border: "#737373", glow: "rgba(115,115,115,0.5)" },
  { bg: "linear-gradient(160deg,#ffe4e6,#fecdd3)", border: "#fb7185", glow: "rgba(251,113,133,0.5)" },
  { bg: "linear-gradient(160deg,#fdf4ff,#f5d0fe)", border: "#d946ef", glow: "rgba(217,70,239,0.5)" },
  { bg: "linear-gradient(160deg,#eff6ff,#dbeafe)", border: "#2563eb", glow: "rgba(37,99,235,0.5)" },
  { bg: "linear-gradient(160deg,#fefce8,#fef3c7)", border: "#d97706", glow: "rgba(217,119,6,0.5)" },
  { bg: "linear-gradient(160deg,#e0f2fe,#bae6fd)", border: "#0284c7", glow: "rgba(2,132,199,0.5)" },
  { bg: "linear-gradient(160deg,#fdf2f8,#fce7f3)", border: "#be185d", glow: "rgba(190,24,93,0.5)" },
  { bg: "linear-gradient(160deg,#f0fdf4,#dcfce7)", border: "#16a34a", glow: "rgba(22,163,74,0.5)" },
  { bg: "linear-gradient(160deg,#fffbeb,#fef3c7)", border: "#f59e0b", glow: "rgba(245,158,11,0.6)" },
  { bg: "linear-gradient(160deg,#f5f3ff,#ede9fe)", border: "#7c3aed", glow: "rgba(124,58,237,0.5)" },
  { bg: "linear-gradient(160deg,#fef9c3,#fde047)", border: "#ca8a04", glow: "rgba(202,138,4,0.5)" },
  { bg: "linear-gradient(160deg,#ecfdf5,#d1fae5)", border: "#059669", glow: "rgba(5,150,105,0.5)" },
  { bg: "linear-gradient(160deg,#eff6ff,#dbeafe)", border: "#1d4ed8", glow: "rgba(29,78,216,0.5)" },
  { bg: "linear-gradient(160deg,#f0f4f8,#d9e2ec)", border: "#486581", glow: "rgba(72,101,129,0.5)" },
];

const SPREADS = [
  { id: "one",   name: "單張牌", count: 1, desc: "今日指引 / 簡單問題" },
  { id: "three", name: "三張牌", count: 3, desc: "過去 · 現在 · 未來" },
  { id: "five",  name: "五張牌", count: 5, desc: "深度主題探索" },
  { id: "nine",  name: "九宮格", count: 9, desc: "大牌陣 · 全面分析" },
];

const LABELS = {
  1: ["核心"],
  3: ["過去", "現在", "未來"],
  5: ["根源", "阻力", "核心", "建議", "結果"],
  9: ["過去", "現在", "未來", "潛意識", "核心課題", "外在環境", "希望/恐懼", "他人影響", "結果"],
};

// Breathing ritual steps
const BREATH_STEPS = [
  { text: "閉上眼睛", sub: "讓思緒慢慢沉澱…", icon: "🌙", duration: 2200 },
  { text: "深吸一口氣", sub: "吸… 吸… 吸…", icon: "🌬️", duration: 2800 },
  { text: "屏住呼吸", sub: "感受心中的問題…", icon: "✨", duration: 2000 },
  { text: "緩緩吐氣", sub: "呼… 呼… 呼…", icon: "🍃", duration: 2800 },
  { text: "再做一次", sub: "讓意識與牌連結…", icon: "🔮", duration: 2000 },
  { text: "深吸", sub: "將問題注入每一個呼吸…", icon: "💫", duration: 2500 },
  { text: "緩吐", sub: "釋放，交給宇宙…", icon: "🌸", duration: 2500 },
  { text: "準備好了", sub: "感受牌在向你招喚…", icon: "⭐", duration: 1800 },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function CuteCard({ card, isCenter, small }) {
  const theme = THEMES[(card.id - 1) % THEMES.length];
  const w = small ? 80 : 104;
  const emojiSize = small ? 26 : 36;
  const nameSize = small ? 11 : 14;
  const kwSize = small ? 8 : 10;
  const pad = small ? "10px 6px 8px" : "18px 10px 14px";
  return (
    <div style={{
      width: w, borderRadius: 20,
      background: theme.bg,
      border: "2px solid " + theme.border,
      boxShadow: isCenter
        ? "0 0 26px " + theme.glow + ", 0 6px 18px rgba(0,0,0,0.2)"
        : "0 4px 16px rgba(0,0,0,0.15), 0 0 10px " + theme.glow,
      padding: pad,
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: small ? 4 : 6, position: "relative", overflow: "hidden",
      animation: "floatCard " + (2.8 + (card.id % 5) * 0.3) + "s ease-in-out infinite",
    }}>
      <span style={{ position:"absolute", top:4, left:6, fontSize:8, opacity:0.6, color: theme.border }}>✦</span>
      <span style={{ position:"absolute", top:4, right:6, fontSize:8, opacity:0.6, color: theme.border }}>✦</span>
      <span style={{
        position:"absolute", top:0, right:0,
        background: theme.border, color:"#fff", fontSize:8, fontWeight:700,
        borderRadius:"0 18px 0 10px", padding:"2px 6px", lineHeight:1.6,
      }}>{card.id}</span>
      <div style={{ fontSize: emojiSize, lineHeight:1, filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.12))", marginTop:4 }}>
        {card.emoji}
      </div>
      <div style={{ fontSize: nameSize, fontWeight:700, color:"#3d2525", letterSpacing:0.5, textAlign:"center" }}>
        {card.name}
      </div>
      <div style={{
        fontSize: kwSize, color:"#6b4f4f", textAlign:"center", lineHeight:1.5,
        background:"rgba(255,255,255,0.5)", borderRadius:8,
        padding: small ? "2px 4px" : "3px 7px", width:"100%",
      }}>{card.keywords}</div>
      <div style={{ display:"flex", gap:3, marginTop:1 }}>
        {[0,1,2].map(d => (
          <span key={d} style={{ width:4, height:4, borderRadius:"50%", background: theme.border, opacity:0.55, display:"inline-block" }} />
        ))}
      </div>
    </div>
  );
}

// Mini card back for shuffle display
function CardBack({ idx, total }) {
  const angle = ((idx - Math.floor(total / 2)) * 6);
  const yOff = Math.abs(idx - Math.floor(total / 2)) * 3;
  return (
    <div style={{
      width: 52, height: 74, borderRadius: 10,
      background: "linear-gradient(145deg,#2a1550,#1a0a35)",
      border: "1.5px solid rgba(201,169,110,0.5)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      transform: "rotate(" + angle + "deg) translateY(" + yOff + "px)",
      transition: "transform 0.35s ease",
      fontSize: 20,
    }}>
      <span style={{ opacity: 0.6 }}>🔮</span>
    </div>
  );
}

export default function LenormandApp() {
  const [question, setQuestion]   = useState("");
  const [spread, setSpread]       = useState("three");
  const [drawn, setDrawn]         = useState([]);
  const [revealed, setRevealed]   = useState([]);
  const [reading, setReading]     = useState("");
  const [loading, setLoading]     = useState(false);
  const [phase, setPhase]         = useState("input");
  // Ritual states
  const [breathStep, setBreathStep]     = useState(0);
  const [shuffleCards, setShuffleCards] = useState([]);
  const [shuffleTick, setShuffleTick]   = useState(0);
  const [breathProg, setBreathProg]     = useState(0); // 0-100 progress bar
  const shuffleRef = useRef(null);
  const breathProgRef = useRef(null);

  const selectedSpread = SPREADS.find(s => s.id === spread);
  const labels = LABELS[drawn.length] || [];

  // ── BREATH PHASE ──────────────────────────────────────────
  function startRitual() {
    if (!question.trim()) return;
    setPhase("breath");
    setBreathStep(0);
    setBreathProg(0);
    runBreathStep(0);
  }

  function runBreathStep(step) {
    if (step >= BREATH_STEPS.length) {
      // Breath done → shuffle phase
      setPhase("shuffle");
      setShuffleCards(shuffle(CARDS).slice(0, 7));
      return;
    }
    setBreathStep(step);
    setBreathProg(0);
    const dur = BREATH_STEPS[step].duration;

    // Animate progress bar
    const start = Date.now();
    if (breathProgRef.current) clearInterval(breathProgRef.current);
    breathProgRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / dur) * 100, 100);
      setBreathProg(pct);
      if (pct >= 100) clearInterval(breathProgRef.current);
    }, 30);

    setTimeout(() => runBreathStep(step + 1), dur);
  }

  // ── SHUFFLE PHASE ─────────────────────────────────────────
  useEffect(() => {
    if (phase !== "shuffle") {
      if (shuffleRef.current) clearInterval(shuffleRef.current);
      return;
    }
    shuffleRef.current = setInterval(() => {
      setShuffleCards(shuffle(CARDS).slice(0, 7));
      setShuffleTick(t => t + 1);
    }, 600);
    return () => clearInterval(shuffleRef.current);
  }, [phase]);

  // ── LOCK CARDS ────────────────────────────────────────────
  function lockCards() {
    if (shuffleRef.current) clearInterval(shuffleRef.current);
    const cards = shuffle(CARDS).slice(0, selectedSpread.count);
    setDrawn(cards);
    setRevealed([]);
    setReading("");
    setPhase("cards");
    cards.forEach((_, i) => {
      setTimeout(() => setRevealed(prev => [...prev, i]), i * 400 + 200);
    });
    setTimeout(() => fetchReading(cards), cards.length * 400 + 700);
  }

  // ── READING ───────────────────────────────────────────────
  async function fetchReading(cards) {
    setLoading(true);
    const count = cards.length;
    const lbls = LABELS[count];
    const cardList = cards.map((c, i) => "【" + lbls[i] + "】" + c.name + "（" + c.keywords + "）").join("、");
    const isNine = count === 9;
    const prompt = isNine
      ? "你是一位溫柔又深刻的雷諾曼占卜師。問卜者的問題是：「" + question + "」\n這是九宮格大牌陣，抽到的牌為：" + cardList + "\n\n九宮格解讀：上排(過去/現在/未來)為時間軸，中排(潛意識/核心課題/外在環境)為當下狀態，下排(希望恐懼/他人影響/結果)為趨勢走向，中心牌「核心課題」是靈魂。\n請用繁體中文給出深度融合所有牌義的整體解讀（約250字），涵蓋各區域主題，語氣溫暖有智慧。結尾給一句深刻的提醒或鼓勵。"
      : "你是一位溫柔又深刻的雷諾曼占卜師。問卜者的問題是：「" + question + "」\n抽到的牌為：" + cardList + "\n請用繁體中文給出一段融合所有牌義的整體解讀（約180字），語氣溫暖而有智慧，像在對話一樣自然。結尾給一句鼓勵或提醒的話。";
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content ? data.content.map(b => b.text || "").join("") : "";
      setReading(text || "無法取得解讀，請稍後再試。");
    } catch (e) {
      setReading("連線錯誤，請稍後重試。");
    }
    setLoading(false);
    setPhase("reading");
  }

  function reset() {
    if (shuffleRef.current) clearInterval(shuffleRef.current);
    if (breathProgRef.current) clearInterval(breathProgRef.current);
    setQuestion(""); setDrawn([]); setRevealed([]);
    setReading(""); setPhase("input");
    setBreathStep(0); setBreathProg(0);
  }

  const curBreath = BREATH_STEPS[breathStep] || BREATH_STEPS[BREATH_STEPS.length - 1];

  return (
    <div style={S.root}>
      <div style={S.bg} />
      <div style={S.container}>

        {/* ── HEADER ── */}
        <div style={S.header}>
          <div style={S.orn}>✦ ✦ ✦</div>
          <h1 style={S.title}>雷諾曼神諭</h1>
          <p style={S.subtitle}>Lenormand Oracle</p>
          <div style={S.orn}>✦ ✦ ✦</div>
        </div>

        {/* ── INPUT ── */}
        {phase === "input" && (
          <div style={S.section}>
            <p style={S.secLabel}>選擇牌陣</p>
            <div style={S.spreadRow}>
              {SPREADS.map(s => (
                <button key={s.id} onClick={() => setSpread(s.id)}
                  style={Object.assign({}, S.spreadBtn, spread === s.id ? S.spreadActive : {})}>
                  <span style={S.spreadName}>{s.name}</span>
                  <span style={S.spreadDesc}>{s.desc}</span>
                </button>
              ))}
            </div>
            <p style={S.secLabel}>你的問題</p>
            <textarea value={question} onChange={e => setQuestion(e.target.value)}
              placeholder="靜下心來，寫下你最想詢問的問題…" style={S.textarea} rows={3} />
            <button onClick={startRitual} disabled={!question.trim()}
              style={Object.assign({}, S.drawBtn, !question.trim() ? S.drawBtnOff : {})}>
              ✦ 開始問卦儀式 ✦
            </button>
          </div>
        )}

        {/* ── BREATH RITUAL ── */}
        {phase === "breath" && (
          <div style={S.ritualBox}>
            <div style={S.breathIcon}>{curBreath.icon}</div>
            <div style={S.breathText}>{curBreath.text}</div>
            <div style={S.breathSub}>{curBreath.sub}</div>

            {/* Progress bar */}
            <div style={S.progTrack}>
              <div style={Object.assign({}, S.progBar, { width: breathProg + "%" })} />
            </div>

            {/* Step dots */}
            <div style={S.stepDots}>
              {BREATH_STEPS.map((_, i) => (
                <span key={i} style={Object.assign({}, S.stepDot, i <= breathStep ? S.stepDotActive : {})} />
              ))}
            </div>

            <p style={S.breathHint}>跟著節奏呼吸，讓思緒與問題合而為一…</p>
          </div>
        )}

        {/* ── SHUFFLE PHASE ── */}
        {phase === "shuffle" && (
          <div style={S.ritualBox}>
            <p style={S.questionDisplay}>「{question}」</p>

            {/* Animated card fan */}
            <div style={S.cardFan}>
              {shuffleCards.map((card, i) => (
                <CardBack key={card.id + "-" + shuffleTick} idx={i} total={shuffleCards.length} />
              ))}
            </div>

            <p style={S.shuffleText}>牌正在為你洗牌…</p>
            <p style={S.shuffleSub}>感受能量的流動，當你感覺對了</p>
            <p style={S.shuffleSub}>按下按鈕，定住屬於你的牌</p>

            <button onClick={lockCards} style={S.lockBtn}>
              ✦ 就是現在，定牌 ✦
            </button>

            <button onClick={reset} style={S.ghostBtn}>← 重新來過</button>
          </div>
        )}

        {/* ── CARDS + READING ── */}
        {(phase === "cards" || phase === "reading") && (
          <div style={S.section}>
            <p style={S.questionDisplay}>「{question}」</p>

            {drawn.length === 9 ? (
              <div style={S.nineGrid}>
                {drawn.map((card, i) => {
                  const vis = revealed.includes(i);
                  return (
                    <div key={card.id} style={Object.assign({}, S.cardWrap, {
                      opacity: vis ? 1 : 0,
                      transform: vis ? "translateY(0) scale(1)" : "translateY(18px) scale(0.88)",
                      transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                    })}>
                      <div style={Object.assign({}, S.cardLabel, { color: i === 4 ? "#ff85a1" : "#c9a96e", fontSize: 9 })}>{labels[i]}</div>
                      <CuteCard card={card} isCenter={i === 4} small />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={Object.assign({}, S.cardsRow, { flexWrap: drawn.length > 3 ? "wrap" : "nowrap" })}>
                {drawn.map((card, i) => {
                  const vis = revealed.includes(i);
                  return (
                    <div key={card.id} style={Object.assign({}, S.cardWrap, {
                      opacity: vis ? 1 : 0,
                      transform: vis ? "translateY(0) scale(1)" : "translateY(18px) scale(0.88)",
                      transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                    })}>
                      <div style={S.cardLabel}>{labels[i]}</div>
                      <CuteCard card={card} />
                    </div>
                  );
                })}
              </div>
            )}

            {loading && (
              <div style={S.loadingWrap}>
                <div style={S.dots}>
                  {[0,1,2].map(i => <span key={i} style={Object.assign({}, S.dot, { animationDelay: (i*0.22) + "s" })} />)}
                </div>
                <p style={S.loadingText}>占卜師正在解讀牌義…</p>
              </div>
            )}

            {reading && (
              <div style={S.readingBox}>
                <div style={S.readingOrn}>✦ 解讀 ✦</div>
                <p style={S.readingText}>{reading}</p>
              </div>
            )}

            {phase === "reading" && (
              <button onClick={reset} style={S.resetBtn}>↩ 重新問卦</button>
            )}
          </div>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700&family=Cinzel:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0412; }
        textarea::placeholder { color: #7a6a9a; }
        textarea:focus { outline: none; border-color: #c9a96e !important; box-shadow: 0 0 0 2px rgba(201,169,110,0.2); }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) rotate(-0.5deg); }
          50% { transform: translateY(-5px) rotate(0.5deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.45); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes breathPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fanShuffle {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const S = {
  root: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at 50% 0%,#1a0a2e 0%,#0a0412 60%)",
    fontFamily: "'Noto Serif TC', serif",
    color: "#e8d5b0",
    position: "relative",
    overflow: "hidden",
  },
  bg: {
    position: "fixed", inset: 0, pointerEvents: "none",
    backgroundImage: [
      "radial-gradient(1px 1px at 20% 30%,rgba(255,255,255,0.8) 0%,transparent 100%)",
      "radial-gradient(1px 1px at 80% 10%,rgba(255,255,255,0.6) 0%,transparent 100%)",
      "radial-gradient(1px 1px at 50% 60%,rgba(255,255,255,0.5) 0%,transparent 100%)",
      "radial-gradient(1px 1px at 10% 80%,rgba(255,255,255,0.7) 0%,transparent 100%)",
      "radial-gradient(2px 2px at 35% 15%,rgba(201,169,110,0.5) 0%,transparent 100%)",
      "radial-gradient(2px 2px at 65% 85%,rgba(201,169,110,0.4) 0%,transparent 100%)",
    ].join(","),
  },
  container: { maxWidth: 700, margin: "0 auto", padding: "40px 20px 60px", position: "relative", zIndex: 1 },
  header: { textAlign: "center", marginBottom: 40, animation: "fadeIn 0.8s ease both" },
  orn: { fontSize: 12, letterSpacing: 8, color: "#c9a96e", marginBottom: 10 },
  title: {
    fontFamily: "'Cinzel', serif", fontSize: 38, fontWeight: 600,
    background: "linear-gradient(135deg,#c9a96e 0%,#f0d898 50%,#c9a96e 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    letterSpacing: 4, marginBottom: 6,
  },
  subtitle: { fontSize: 13, letterSpacing: 6, color: "#8a7ab0", textTransform: "uppercase", marginBottom: 10 },
  section: { animation: "fadeIn 0.6s ease both" },
  secLabel: { fontSize: 12, letterSpacing: 4, color: "#c9a96e", textTransform: "uppercase", marginBottom: 12, textAlign: "center" },
  spreadRow: { display: "flex", gap: 12, justifyContent: "center", marginBottom: 32, flexWrap: "wrap" },
  spreadBtn: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: 12, padding: "14px 20px", cursor: "pointer",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
    transition: "all 0.2s", minWidth: 110,
  },
  spreadActive: { background: "rgba(201,169,110,0.12)", border: "1px solid #c9a96e", boxShadow: "0 0 20px rgba(201,169,110,0.15)" },
  spreadName: { fontSize: 15, color: "#e8d5b0", fontWeight: 600 },
  spreadDesc: { fontSize: 11, color: "#8a7ab0" },
  textarea: {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,169,110,0.25)",
    borderRadius: 12, padding: "16px 18px", fontSize: 15, color: "#e8d5b0",
    resize: "none", fontFamily: "'Noto Serif TC', serif", lineHeight: 1.8, marginBottom: 24,
  },
  drawBtn: {
    width: "100%", padding: "16px",
    background: "linear-gradient(135deg,#8b6914 0%,#c9a96e 50%,#8b6914 100%)",
    border: "none", borderRadius: 12, color: "#1a0a2e", fontSize: 16, fontWeight: 700,
    letterSpacing: 3, cursor: "pointer", fontFamily: "'Noto Serif TC', serif",
    boxShadow: "0 4px 24px rgba(201,169,110,0.3)",
  },
  drawBtnOff: { opacity: 0.4, cursor: "not-allowed", boxShadow: "none" },

  // ── Ritual styles ──
  ritualBox: {
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 20, padding: "20px 0", animation: "fadeIn 0.6s ease both",
    textAlign: "center",
  },
  breathIcon: {
    fontSize: 64, lineHeight: 1,
    animation: "breathPulse 2.5s ease-in-out infinite",
    filter: "drop-shadow(0 0 20px rgba(201,169,110,0.5))",
  },
  breathText: {
    fontSize: 28, fontWeight: 700, color: "#f0d898", letterSpacing: 4,
    textShadow: "0 0 30px rgba(201,169,110,0.4)",
  },
  breathSub: { fontSize: 15, color: "#b8a8d0", letterSpacing: 2, lineHeight: 1.8 },
  breathHint: { fontSize: 12, color: "#6a5a8a", letterSpacing: 1, marginTop: 8 },
  progTrack: {
    width: "80%", height: 4, background: "rgba(201,169,110,0.15)",
    borderRadius: 2, overflow: "hidden",
  },
  progBar: {
    height: "100%", borderRadius: 2,
    background: "linear-gradient(90deg,#8b6914,#f0d898,#8b6914)",
    backgroundSize: "200% auto",
    animation: "shimmer 1.5s linear infinite",
    transition: "width 0.03s linear",
  },
  stepDots: { display: "flex", gap: 8 },
  stepDot: { width: 6, height: 6, borderRadius: "50%", background: "rgba(201,169,110,0.2)", display: "inline-block" },
  stepDotActive: { background: "#c9a96e", boxShadow: "0 0 6px rgba(201,169,110,0.6)" },

  cardFan: {
    display: "flex", justifyContent: "center", alignItems: "flex-end",
    gap: -8, height: 100, marginBottom: 8,
    animation: "fanShuffle 0.35s ease both",
  },
  shuffleText: { fontSize: 18, color: "#f0d898", letterSpacing: 3, fontWeight: 600 },
  shuffleSub: { fontSize: 13, color: "#8a7ab0", letterSpacing: 1 },
  lockBtn: {
    marginTop: 8, padding: "16px 40px",
    background: "linear-gradient(135deg,#5a1a8a 0%,#9b59b6 50%,#5a1a8a 100%)",
    border: "1px solid rgba(155,89,182,0.6)", borderRadius: 14,
    color: "#f0d0ff", fontSize: 17, fontWeight: 700,
    letterSpacing: 3, cursor: "pointer", fontFamily: "'Noto Serif TC', serif",
    boxShadow: "0 4px 28px rgba(155,89,182,0.4)",
    animation: "breathPulse 2s ease-in-out infinite",
  },
  ghostBtn: {
    background: "transparent", border: "none", color: "#5a4a7a",
    fontSize: 13, cursor: "pointer", letterSpacing: 1,
    fontFamily: "'Noto Serif TC', serif", marginTop: 4,
  },

  questionDisplay: { textAlign: "center", fontSize: 15, color: "#b8a8d0", marginBottom: 32, fontStyle: "italic", letterSpacing: 1 },
  nineGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, justifyItems: "center", marginBottom: 36 },
  cardsRow: { display: "flex", gap: 16, marginBottom: 36, alignItems: "flex-start", justifyContent: "center" },
  cardWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  cardLabel: { fontSize: 11, letterSpacing: 3, color: "#c9a96e", textTransform: "uppercase" },
  loadingWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "24px 0" },
  dots: { display: "flex", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: "50%", background: "#c9a96e", display: "inline-block", animation: "pulse 1.2s ease-in-out infinite" },
  loadingText: { fontSize: 13, color: "#8a7ab0", letterSpacing: 2 },
  readingBox: {
    background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.25)",
    borderRadius: 16, padding: "28px", marginBottom: 28, animation: "fadeIn 0.8s ease both",
  },
  readingOrn: { fontSize: 12, letterSpacing: 6, color: "#c9a96e", textAlign: "center", marginBottom: 18 },
  readingText: { fontSize: 15, lineHeight: 2.2, color: "#d8c8e8", textAlign: "justify" },
  resetBtn: {
    display: "block", margin: "0 auto", background: "transparent",
    border: "1px solid rgba(201,169,110,0.3)", borderRadius: 10,
    padding: "12px 32px", color: "#c9a96e", fontSize: 14,
    letterSpacing: 2, cursor: "pointer", fontFamily: "'Noto Serif TC', serif",
  },
};
