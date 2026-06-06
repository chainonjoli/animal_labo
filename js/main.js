// ============================================================
// 関係性ラボ - メインアプリケーションロジック
// ============================================================

let memberCount = 2;
const MAX_MEMBERS = 12;

document.addEventListener('DOMContentLoaded', () => {
  initMemberEvents();
  initPresetEvents();
  initFormControls();
});

// ============================================================
// 1. メンバー追加・削除・入力制御
// ============================================================

function initMemberEvents() {
  const addBtn = document.getElementById('addMemberBtn');
  if (addBtn) addBtn.addEventListener('click', addMemberRow);

  const analyzeBtn = document.getElementById('analyzeBtn');
  if (analyzeBtn) analyzeBtn.addEventListener('click', analyzeTeam);

  // 初期行のイベント設定
  setupRowListeners(1);
  setupRowListeners(2);
}

function setupRowListeners(idx) {
  const row = document.getElementById(`memberRow${idx}`);
  if (!row) return;

  const dateInput = row.querySelector('.date-input');
  const numInput = row.querySelector('.number-input');

  if (dateInput && numInput) {
    dateInput.addEventListener('change', () => {
      const dateVal = dateInput.value;
      if (!dateVal) return;

      const dateObj = new Date(dateVal);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();

      // data.js の算出ロジックでアニマル番号を計算
      const animNum = getCharacterNumber(year, month, day);
      numInput.value = animNum;
      
      showToast(`${idx}人目の生年月日からアニマル番号 ${animNum} を算出しました ✦`);
    });
  }
}

function addMemberRow() {
  if (memberCount >= MAX_MEMBERS) {
    showToast('メンバーの登録は最大12人までです');
    return;
  }
  memberCount++;
  
  const container = document.getElementById('memberInputs');
  const row = document.createElement('div');
  row.className = 'member-row';
  row.id = `memberRow${memberCount}`;
  
  const formattedNum = String(memberCount).padStart(2, '0');
  
  row.innerHTML = `
    <span class="member-num">${formattedNum}</span>
    <input type="text" class="form-input name-input" placeholder="名前" required data-idx="${memberCount}">
    <input type="number" class="form-input number-input" placeholder="番号(1-60)" min="1" max="60" data-idx="${memberCount}">
    <span style="font-size: 0.75rem; color: var(--text-muted);">または生年月日</span>
    <input type="date" class="form-input date-input" data-idx="${memberCount}" style="max-width: 140px; padding: 6px 8px;">
    <button type="button" class="remove-btn" onclick="removeMemberRow(${memberCount})">×</button>
  `;
  
  container.appendChild(row);
  setupRowListeners(memberCount);
  updateAddButton();
}

function removeMemberRow(idx) {
  const row = document.getElementById(`memberRow${idx}`);
  if (row) row.remove();
  renumberMembers();
  updateAddButton();
}

function renumberMembers() {
  const rows = document.querySelectorAll('#memberInputs .member-row');
  memberCount = rows.length;
  
  rows.forEach((row, i) => {
    const num = i + 1;
    const formattedNum = String(num).padStart(2, '0');
    row.querySelector('.member-num').textContent = formattedNum;
    row.id = `memberRow${num}`;
    
    // データインデックスの更新
    row.querySelectorAll('.form-input').forEach(input => {
      input.dataset.idx = num;
    });
    
    const removeBtn = row.querySelector('.remove-btn');
    if (removeBtn) {
      removeBtn.onclick = () => removeMemberRow(num);
    }
  });
}

function updateAddButton() {
  const btn = document.getElementById('addMemberBtn');
  if (btn) {
    btn.disabled = memberCount >= MAX_MEMBERS;
    btn.textContent = memberCount >= MAX_MEMBERS ? 'MAX MEMBERS REACHED' : `＋ メンバーを追加 (${memberCount}/${MAX_MEMBERS})`;
  }
}

// ============================================================
// 2. プリセット機能
// ============================================================

function initPresetEvents() {
  document.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('click', () => {
      loadPreset(card.dataset.preset);
    });
  });
}

function loadPreset(presetName) {
  // ビジネス向け架空チームデータ
  const presets = {
    'sales': [
      { name: '佐々木（部長）', number: 57 }, // ライオン (SUN)
      { name: '宮崎（営業）', number: 7 },   // チータ (SUN)
      { name: '鈴木（営業）', number: 15 },  // 猿 (EARTH)
      { name: '渡辺（営業アシ）', number: 40 } // たぬき (MOON)
    ],
    'dev': [
      { name: '小林（テック）', number: 24 }, // 狼 (EARTH)
      { name: '佐藤（PM）', number: 45 },    // 子守熊 (EARTH)
      { name: '田中（開発）', number: 36 },    // 虎 (EARTH)
      { name: '高橋（サポート）', number: 20 } // ひつじ (MOON)
    ],
    'pr': [
      { name: '松本（企画）', number: 22 },   // ペガサス (SUN)
      { name: '吉川（広報）', number: 5 },    // 黒ひょう (MOON)
      { name: '長谷川（広報）', number: 11 }, // こじか (MOON)
      { name: '山本（デザイナー）', number: 47 } // たぬき (MOON)
    ],
    'perfect': [
      { name: '林（ディレクター）', number: 6 }, // 虎 (EARTH)
      { name: '川島（デザイナー）', number: 21 }, // ペガサス (SUN)
      { name: '井上（エンジニア）', number: 12 }, // ゾウ (SUN)
      { name: '中村（調整役）', number: 2 },    // たぬき (MOON)
      { name: '森（サポート）', number: 26 }    // ひつじ (MOON)
    ]
  };

  const preset = presets[presetName];
  if (!preset) return;

  const container = document.getElementById('memberInputs');
  container.innerHTML = '';
  memberCount = 0;

  preset.forEach((m, i) => {
    memberCount = i + 1;
    const formattedNum = String(memberCount).padStart(2, '0');
    const row = document.createElement('div');
    row.className = 'member-row';
    row.id = `memberRow${memberCount}`;
    row.innerHTML = `
      <span class="member-num">${formattedNum}</span>
      <input type="text" class="form-input name-input" placeholder="名前" value="${m.name}" required data-idx="${memberCount}">
      <input type="number" class="form-input number-input" placeholder="番号(1-60)" value="${m.number}" min="1" max="60" data-idx="${memberCount}">
      <span style="font-size: 0.75rem; color: var(--text-muted);">または生年月日</span>
      <input type="date" class="form-input date-input" data-idx="${memberCount}" style="max-width: 140px; padding: 6px 8px;">
      <button type="button" class="remove-btn" onclick="removeMemberRow(${memberCount})">×</button>
    `;
    container.appendChild(row);
    setupRowListeners(memberCount);
  });

  updateAddButton();
  
  const presetTitles = {
    'sales': '新規開拓営業部',
    'dev': 'システム開発ユニット',
    'pr': 'クリエイティブ推進室',
    'perfect': 'バランス型PJチーム'
  };
  
  showToast(`プリセット「${presetTitles[presetName]}」をロードしました ✦`);
  
  // 自動分析実行
  analyzeTeam();
}

// ============================================================
// 3. チーム分析ロジックと結果描画
// ============================================================

function analyzeTeam() {
  const rows = document.querySelectorAll('#memberInputs .member-row');
  const members = [];

  rows.forEach(row => {
    const name = row.querySelector('.name-input').value.trim();
    const num = parseInt(row.querySelector('.number-input').value, 10);
    
    if (name && num >= 1 && num <= 60) {
      const info = getCharacterInfo(num);
      if (info) {
        members.push({ ...info, name });
      }
    }
  });

  if (members.length < 2) {
    showToast('分析には2人以上の有効なメンバー情報（名前とアニマル番号）が必要です');
    return;
  }

  // 結果セクションのアクティブ化
  const resultSec = document.getElementById('resultSection');
  resultSec.classList.add('active');

  // 1. 三分類バランス分析
  const balance = analyzeGroupBalance(members);
  renderBalanceDashboard(balance);

  // 2. チームアドバイスと警告
  const adviceList = getTeamAdvice(balance);
  renderAdviceContainer(adviceList);

  // 3. 相性ペアの計算
  const pairs = [];
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      const compat = calculateCompatibility(members[i], members[j]);
      pairs.push({
        member1: members[i],
        member2: members[j],
        ...compat
      });
    }
  }
  // 相性スコア降順
  pairs.sort((a, b) => b.score - a.score);

  // 4. シナジー相関図描画
  drawChemistryMap(members, pairs);

  // 5. 特筆タッグランキング描画 (Top 3)
  renderSynergyPairs(pairs);

  // 6. メンバー仕事特性詳細カード描画
  renderMemberCards(members);

  // スムーズスクロール
  resultSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 三分類ダッシュボードの描画
function renderBalanceDashboard(balance) {
  const barMoon = document.getElementById('barMoon');
  const barEarth = document.getElementById('barEarth');
  const barSun = document.getElementById('barSun');

  const countMoon = document.getElementById('countMoon');
  const countEarth = document.getElementById('countEarth');
  const countSun = document.getElementById('countSun');

  // バーの高さ更新（アニメーション効果を狙って少し遅らせる）
  setTimeout(() => {
    barMoon.style.height = `${balance.percentages.MOON}%`;
    barEarth.style.height = `${balance.percentages.EARTH}%`;
    barSun.style.height = `${balance.percentages.SUN}%`;
  }, 100);

  // 人数テキスト
  countMoon.textContent = `${balance.counts.MOON}人 (${balance.percentages.MOON}%)`;
  countEarth.textContent = `${balance.counts.EARTH}人 (${balance.percentages.EARTH}%)`;
  countSun.textContent = `${balance.counts.SUN}人 (${balance.percentages.SUN}%)`;

  // コメント
  const commentDiv = document.getElementById('teamVibeComment');
  const dominantName = GROUPS[balance.dominant].name;
  const dominantColor = GROUPS[balance.dominant].color;
  
  let vibeText = `チーム内では <strong style="color: ${dominantColor};">${dominantName} (${balance.dominant})</strong> が優勢なエネルギー比率となっています。`;
  
  if (balance.counts.MOON > 0 && balance.counts.EARTH > 0 && balance.counts.SUN > 0) {
    vibeText += `<br>全タイプが偏りなく揃っており、意思決定の多様性と完璧な補完体制をもつ、死角のないチーム編成です。`;
  } else {
    vibeText += `<br>特定のエネルギーが集中しているため、強みが極まる一方で、意思決定のスタイルやコミュニケーションのすれ違いに注意が必要です。`;
  }
  commentDiv.innerHTML = vibeText;
}

// チームアドバイスと不在属性の警告描画
function renderAdviceContainer(adviceList) {
  const container = document.getElementById('adviceContainer');
  container.innerHTML = '';

  adviceList.forEach(advice => {
    const isWarning = advice.warning !== undefined;
    const card = document.createElement('div');
    card.className = isWarning ? 'advice-card warning-card' : 'advice-card';
    
    // アイコンの選定
    let icon = '✦';
    if (advice.title.includes('ファミリー')) icon = '🌱';
    else if (advice.title.includes('プロフェッショナル')) icon = '💼';
    else if (advice.title.includes('イノベーション')) icon = '🚀';
    else if (advice.title.includes('パーフェクト')) icon = '🌟';
    else if (isWarning) icon = '⚠️';

    let contentHTML = `
      <div class="advice-card-header">
        <span class="advice-card-icon">${icon}</span>
        <h4 class="advice-card-title">${advice.title}</h4>
      </div>
    `;

    if (isWarning) {
      contentHTML += `<p class="advice-desc" style="font-weight: 500; color: var(--secondary);">${advice.warning}</p>`;
    } else {
      contentHTML += `
        <p class="advice-desc"><strong>強み:</strong> ${advice.strength}<br><strong>課題:</strong> ${advice.challenge}</p>
      `;
    }

    contentHTML += `
      <div class="advice-action-title">
        <span>💡 おすすめのチーム活性アクション</span>
      </div>
      <ul class="advice-action-list">
        ${advice.actions.map(act => `<li class="advice-action-item">${act}</li>`).join('')}
      </ul>
    `;

    card.innerHTML = contentHTML;
    container.appendChild(card);
  });
}

// ============================================================
// 4. SVG相関図 (Team Chemistry Map) の描画
// ============================================================

function drawChemistryMap(members, pairs) {
  const linesSvg = document.getElementById('chemistryLines');
  const nodesDiv = document.getElementById('mapNodesContainer');
  if (!linesSvg || !nodesDiv) return;

  const w = 550;
  const h = 480;
  linesSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  linesSvg.innerHTML = '';
  nodesDiv.innerHTML = '';

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.35;
  const positions = [];

  // 1. ノードの位置決定とHTML描画
  members.forEach((m, i) => {
    const angle = (i / members.length) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    positions.push({ x, y });

    const groupColors = { MOON: 'var(--moon)', EARTH: 'var(--earth)', SUN: 'var(--sun)' };
    const groupBg = { MOON: 'rgba(124, 109, 171, 0.08)', EARTH: 'rgba(90, 138, 106, 0.08)', SUN: 'rgba(212, 148, 74, 0.08)' };

    const node = document.createElement('div');
    node.className = 'map-node';
    node.style.left = `${x - 34}px`;
    node.style.top = `${y - 34}px`;
    node.innerHTML = `
      <div class="node-avatar-box" style="background-color: ${groupBg[m.group.id]}; border-color: ${groupColors[m.group.id]};">
        ${m.profile.emoji}
      </div>
      <div class="node-name">${m.name}</div>
      <div class="node-role-badge">${m.animal}</div>
    `;
    node.addEventListener('click', () => showMemberModal(m));
    nodesDiv.appendChild(node);
  });

  // 2. コネクションラインをSVGに描画
  pairs.forEach(p => {
    const idx1 = members.indexOf(p.member1);
    const idx2 = members.indexOf(p.member2);
    if (idx1 === -1 || idx2 === -1) return;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', positions[idx1].x);
    line.setAttribute('y1', positions[idx1].y);
    line.setAttribute('x2', positions[idx2].x);
    line.setAttribute('y2', positions[idx2].y);
    line.setAttribute('stroke', p.relationship.color);
    
    // スコアに応じた太さと透明度の可視化
    const isHighlight = p.score >= 80;
    line.setAttribute('class', `chemistry-line ${isHighlight ? 'highlight' : ''}`);
    line.setAttribute('stroke-width', isHighlight ? '3px' : '1px');
    line.setAttribute('stroke-opacity', Math.max(0.15, p.score / 150));
    linesSvg.appendChild(line);
  });
}

// 最強タッグの描画 (Top 3)
function renderSynergyPairs(pairs) {
  const container = document.getElementById('synergyPairsGrid');
  container.innerHTML = '';

  const topPairs = pairs.slice(0, 3);
  topPairs.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'pair-card';
    card.style.borderLeft = `3px solid ${p.relationship.color}`;
    card.innerHTML = `
      <div class="pair-left">
        <div class="pair-rank">No.${idx + 1}</div>
        <div class="pair-avatars">${p.member1.profile.emoji} ${p.member2.profile.emoji}</div>
        <div>
          <div class="pair-names">${p.member1.name} × ${p.member2.name}</div>
          <div class="pair-label" style="color: ${p.relationship.color};">${p.relationship.label}</div>
        </div>
      </div>
      <div class="pair-score" style="color: ${p.relationship.color};">${p.score}点</div>
    `;
    container.appendChild(card);
  });
}

// メンバー仕事特性詳細カードの描画
function renderMemberCards(members) {
  const container = document.getElementById('membersCardsContainer');
  container.innerHTML = '';

  members.forEach(m => {
    const card = document.createElement('div');
    card.className = 'member-card-mini';
    card.addEventListener('click', () => showMemberModal(m));
    
    const grpClass = m.group.id.toLowerCase();
    
    card.innerHTML = `
      <div class="mini-avatar">${m.profile.emoji}</div>
      <div class="mini-detail">
        <div class="mini-title">${m.name}さん</div>
        <div class="mini-animal">${m.animal} (No.${m.number})</div>
        <span class="badge-group ${grpClass}">${m.group.name}</span>
        <div class="mini-role">役割: ${m.workProfile.teamRole.split('「')[1]?.split('」')[0] || m.workProfile.teamRole}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ============================================================
// 5. 詳細モーダルの制御
// ============================================================

function showMemberModal(member) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  if (!overlay || !content) return;

  const m = member;
  const grpClass = m.group.id.toLowerCase();

  content.innerHTML = `
    <button class="modal-close" id="modalCloseBtn">×</button>
    
    <div class="modal-header-section">
      <div class="modal-avatar">${m.profile.emoji}</div>
      <div class="modal-name-row">
        <span class="modal-name">${m.name}さん</span>
      </div>
      <div class="modal-animal">${m.animal} (No.${m.number}) | ${m.group.name}</div>
      <p style="font-size:0.75rem; color:var(--text-muted); margin-top: 6px;">本質美学: 「${m.profile.keyword}」</p>
    </div>
    
    <div class="modal-details">
      <div class="modal-detail-item">
        <div class="modal-detail-label">✦ WORK STYLE / 仕事スタイル</div>
        <div class="modal-detail-text" style="font-weight: 700; color: var(--primary);">${m.workProfile.workStyle}</div>
      </div>
      
      <div class="modal-detail-item">
        <div class="modal-detail-label">✦ STRENGTHS / 主な強み</div>
        <div class="modal-detail-text">
          <ul style="padding-left: 16px;">
            ${m.workProfile.strengths.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="modal-detail-item">
        <div class="modal-detail-label">✦ WEAKNESSES / 気をつけたいポイント</div>
        <div class="modal-detail-text">
          <ul style="padding-left: 16px;">
            ${m.workProfile.weaknesses.map(w => `<li>${w}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="modal-detail-item">
        <div class="modal-detail-label">✦ MOTIVATION / モチベーションの源泉</div>
        <div class="modal-detail-text">🔑 ${m.workProfile.motivationTrigger}</div>
      </div>

      <div class="modal-detail-item">
        <div class="modal-detail-label">✦ STRESS SIGN / 限界ストレスサイン</div>
        <div class="modal-detail-text">⚠️ ${m.workProfile.stressSign}</div>
      </div>

      <div class="modal-detail-item">
        <div class="modal-detail-label">✦ BOSS & SUBORDINATE / コミュニケーションの組み合わせ</div>
        <div class="modal-tags-grid">
          <div class="modal-tag-item">
            <strong style="color: var(--secondary);">👍 活きる上司タイプ:</strong><br>
            ${m.workProfile.bestBoss}
          </div>
          <div class="modal-tag-item">
            <strong style="color: var(--secondary);">🤝 活きる部下タイプ:</strong><br>
            ${m.workProfile.bestSubordinate}
          </div>
        </div>
      </div>
      
      <div class="modal-detail-item" style="border-top: 1px dashed var(--border-color); padding-top: 16px;">
        <div class="modal-detail-label">✦ ACTION TIP / 本人への仕事アドバイス</div>
        <div class="modal-detail-text" style="font-style: italic; color: var(--text-sub);">${m.workProfile.actionTip}</div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // 閉じるイベントの設定
  document.getElementById('modalCloseBtn').onclick = closeModal;
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initFormControls() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal();
    };
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ============================================================
// 6. テキストレポートコピー機能
// ============================================================

function copyTeamAnalysisReport() {
  const rows = document.querySelectorAll('#memberInputs .member-row');
  const members = [];
  rows.forEach(row => {
    const name = row.querySelector('.name-input').value.trim();
    const num = parseInt(row.querySelector('.number-input').value, 10);
    if (name && num) {
      const info = getCharacterInfo(num);
      if (info) members.push({ name, animal: info.animal, group: info.group.name });
    }
  });

  if (members.length === 0) return;

  const namesList = members.map(m => `${m.name}(${m.animal})`).join(', ');
  
  let reportText = `✦ RELATIONSHIP LAB - チーム分析結果 ✦\n`;
  reportText += `■ 分析メンバー: ${namesList}\n\n`;
  reportText += `チーム構成比や関係性の詳細、各メンバーの「仕事スタイル」や「相乗効果を最大化するマネジメント方法」は、関係性ラボのダッシュボードで確認できます。\n`;
  reportText += `#チームビルディング #個性心理学 #組織分析`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(reportText).then(() => {
      showToast('分析サマリーをクリップボードにコピーしました！ ✦');
    });
  }
}

// ============================================================
// 7. トーストアラート
// ============================================================

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="color:var(--secondary);margin-right:6px;">✦</span> ${message}`;
  
  document.body.appendChild(toast);
  
  // アニメーション表示
  requestAnimationFrame(() => {
    toast.classList.add('active');
  });

  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
