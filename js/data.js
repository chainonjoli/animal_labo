// ============================================================
// 関係性ラボ - データ & 算出ロジック
// ============================================================

// ---- グループ定義（三分類：MOON/EARTH/SUN）----
const GROUPS = {
  MOON: {
    id: 'MOON', name: '月グループ', emoji: '🌙',
    color: '#7c6dab', gradient: 'linear-gradient(135deg, #6254a0, #7c6dab)',
    tagline: '「誰と」を大切にする絆重視タイプ',
    description: '人との関係性やチームの雰囲気を重視するメンバーが属するグループ。コミュニケーションでは「共感」が最大の武器。話を聞いてもらえると安心し、信頼関係を土台に力を発揮します。',
    commStyle: '話が長くなりがち。頭に浮かんだことをそのまま口にするため、結論が見えにくいことも。最後まで聞いてもらえると大満足。',
    meetingTip: '発言を遮らず最後まで聞く。安心感のある場をつくると良いアイデアが出やすい。',
    members: ['こじか', 'たぬき', '黒ひょう', 'ひつじ'],
  },
  EARTH: {
    id: 'EARTH', name: '地球グループ', emoji: '🌍',
    color: '#5a8a6a', gradient: 'linear-gradient(135deg, #3d7a52, #5a8a6a)',
    tagline: '「何を」重視する実力派リアリスト',
    description: '目標達成やスキルアップなど「結果」にコミットするメンバーが属するグループ。無駄を嫌い、効率とクオリティを追求。論理的で信頼できるプロフェッショナル集団。',
    commStyle: '結論から話す。回りくどい表現や建前だけの会話は時間の無駄と感じる。短いセンテンスで要点を伝える。',
    meetingTip: 'アジェンダを事前に共有し、ゴールを明確に。感情論より数字やデータで議論すると生産的。',
    members: ['猿', '虎', '子守熊', '狼'],
  },
  SUN: {
    id: 'SUN', name: '太陽グループ', emoji: '☀️',
    color: '#d4944a', gradient: 'linear-gradient(135deg, #c07830, #d4944a)',
    tagline: '「どこで」にこだわる直感と感性のリーダー',
    description: '環境やシチュエーションを重視し、直感とひらめきで動くメンバーが属するグループ。場の空気を読む力に長け、ビジョンを描くのが得意。',
    commStyle: '感覚的に話すため、MOONやEARTHには伝わりにくいことも。擬音語が多く、大げさな表現が特徴。',
    meetingTip: 'ビジュアルやイメージで共有すると理解が早い。自由な発想の時間を確保するとイノベーションが生まれる。',
    members: ['チータ', 'ライオン', 'ゾウ', 'ペガサス'],
  }
};

// ---- 12動物キャラクター基本プロフィール ----
const ANIMAL_PROFILES = {
  '狼': { emoji: '🐺', group: 'EARTH', keyword: '一匹狼のこだわり派' },
  'こじか': { emoji: '🦌', group: 'MOON', keyword: 'いつも人のそばにいたい' },
  '猿': { emoji: '🐵', group: 'EARTH', keyword: '目の前のものに食らいつけ' },
  'チータ': { emoji: '🐆', group: 'SUN', keyword: '超ポジティブ' },
  '黒ひょう': { emoji: '🐈‍⬛', group: 'MOON', keyword: 'スマートでおしゃれな自信家' },
  'ライオン': { emoji: '🦁', group: 'SUN', keyword: 'オンリーワンよりナンバーワン' },
  '虎': { emoji: '🐯', group: 'EARTH', keyword: '有言実行' },
  'たぬき': { emoji: '🦝', group: 'MOON', keyword: '笑顔は敵をつくらない' },
  '子守熊': { emoji: '🐨', group: 'EARTH', keyword: '最後に勝つのは自分' },
  'ゾウ': { emoji: '🐘', group: 'SUN', keyword: '努力と根性のムードメーカー' },
  'ひつじ': { emoji: '🐑', group: 'MOON', keyword: '仲よきことは美しきかな' },
  'ペガサス': { emoji: '🦄', group: 'SUN', keyword: '自由奔放' },
};

// ---- ビジネス版プロフィール ----
const WORK_PROFILES = {
  '狼': {
    workStyle: '独自の世界を極める一匹狼型プロフェッショナル',
    strengths: ['圧倒的な集中力と没頭力', '独自の視点・こだわりの深さ', '約束を守る誠実さ'],
    weaknesses: ['報連相を忘れがち', 'チームのペースに合わせるのが苦手', '興味のないタスクへの意欲が低い'],
    communicationStyle: '要点だけ簡潔に伝えたい派。信頼関係ができると深い議論ができるが、表面的な雑談は避けたい。メールやチャットなど非同期コミュニケーションを好む。',
    bestBoss: '自由にやらせてくれるタイプ。口出しせず成果で評価してくれる上司。マイクロマネジメントは最悪。',
    bestSubordinate: '自立して動ける人。いちいち確認に来ない論理的な部下。指示待ちタイプは苦手。',
    meetingStyle: '必要最低限。アジェンダなしの会議は苦痛。自分のペースで準備した資料をもとに、要点だけ話したい。',
    stressSign: '無言になる。一人の時間が極端に減ると突然爆発する。デスク周りが荒れ始めたら要注意。',
    motivationTrigger: '「やっぱり変わってるね」— 独自性を認められると内心燃える。「さすがプロだね」も効く。',
    actionTip: '週1回だけチームとの共有タイムを設けてみる。15分でOK。自分のこだわりを共有すると意外と喜ばれる。',
    responsibility: '会社や仕事への責任感ではなく、人としてすべきことをしようとするタイプ。自分で納得しない限り責任は感じない。',
    teamRole: '独自の専門性でチームに替えの利かない価値を提供する「スペシャリスト」',
  },
  'こじか': {
    workStyle: '信頼関係をベースに力を発揮するサポート型リーダー',
    strengths: ['人の気持ちを察する力', '真面目で几帳面な仕事ぶり', '信頼した相手への圧倒的な忠誠心'],
    weaknesses: ['人見知りで初対面の場面が苦手', '裏切りや不義理に極端に弱い', 'NOと言えず抱え込みがち'],
    communicationStyle: '最初は慎重だが、信頼関係ができるとオープンに。相手の表情や声のトーンから気持ちを読み取るのが得意。1on1の対話で本領発揮。',
    bestBoss: '部下の成長を見守ってくれる温かい上司。「味方だよ」と言ってくれるタイプ。突然の方針転換は不安になる。',
    bestSubordinate: '素直で報連相をしっかりしてくれる人。こまめに相談してくれると安心して力を発揮できる。',
    meetingStyle: '少人数が理想。大人数の前で意見を求められると固まる。事前に議題を知らせてもらえると準備できる。',
    stressSign: 'いつもより口数が減る。一人でランチを取り始めたら要注意。信頼できる人にだけ本音を漏らす。',
    motivationTrigger: '「どんなときも味方だよ」— 安心感と絆を感じられる言葉が最大のモチベーション。',
    actionTip: '自分の意見を「まずは書き出してから伝える」習慣をつけてみる。話すのが苦手でも文章なら整理しやすい。',
    responsibility: '仕事は堅実に取り組むが、特に責任感という意識はない。真面目で几帳面なだけ。困った時は周囲が自然と助けてくれる。',
    teamRole: 'メンバーの心の変化にいち早く気づき、チームの心理的安全性を守る「メンタルケアの要」',
  },
  '猿': {
    workStyle: '臨機応変力No.1のムードメーカー型プレイヤー',
    strengths: ['頭の回転の早さと瞬発力', '場を盛り上げるコミュニケーション力', 'マルチタスクをこなす器用さ'],
    weaknesses: ['飽きっぽく、継続が苦手', '器用貧乏になりがち', '攻めには強いが守り（ルーティン）は逃げ腰'],
    communicationStyle: 'ノリと勢いで場を動かすのが得意。褒められるとどこまでも頑張れる。逆に無視されるとやる気を一気に失う。',
    bestBoss: 'ノリがよく、褒め上手な上司。「面白いね、やってみよう」と言ってくれるタイプ。',
    bestSubordinate: '一緒に楽しんでくれる明るい人。ノリが合わないと距離を置いてしまう。',
    meetingStyle: 'ブレストやアイデア出しの場では最強。ただしルーティンの進捗報告会議は集中力が持たない。',
    stressSign: 'いつものお調子者キャラが消える。テンションが落ちて口数が減ったら深刻なサイン。',
    motivationTrigger: '「一緒にいると楽しい」「さすが！」— おだてに弱く、褒め言葉は最高の燃料。',
    actionTip: '得意な「攻め」の仕事と苦手な「守り」の仕事を、チームメンバーと役割分担してみる。',
    responsibility: '責任感というより、目前の仕事に食いつくタイプ。攻めには強いが守りになると逃げ腰。責任の所在もうやむやにしがち。',
    teamRole: 'チームの空気を明るくし、新しいアイデアで閉塞感を打破する「ムードメーカー」',
  },
  'チータ': {
    workStyle: '超ポジティブ思考で切り拓くスタートダッシュ型リーダー',
    strengths: ['圧倒的なポジティブ思考と行動力', '新しいことへの挑戦スピード', '切り替えの早さと失敗への耐性'],
    weaknesses: ['飽きるのも早い（持続力に課題）', '守備的な仕事が苦手', '勢いで走り出し計画が甘いことも'],
    communicationStyle: '情熱的で前向きな言葉が多い。相手のモチベーションを上げるのが得意だが、具体的な指示は苦手な場合も。',
    bestBoss: '新しい挑戦を応援してくれる上司。「成功」「チャレンジ」というワードに反応。安全志向の上司とは合わない。',
    bestSubordinate: 'スピード感についてこれる人。細部を補完してくれる緻密なタイプとの組み合わせが最強。',
    meetingStyle: 'キックオフや戦略会議では主役級。ただし長時間の詰めの会議は集中力が切れる。',
    stressSign: 'いつもの前向きさが消え、愚痴が増える。「もう無理かも」と言い始めたら本当に限界。',
    motivationTrigger: '「キミならきっと成功する」— "成功"という言葉が世界でいちばん好き。',
    actionTip: '得意なスタートダッシュの後のフォローアップ担当を決めておく。「始める人」と「続ける人」でペアを組む。',
    responsibility: '成功願望や好奇心から仕事に着手。責任感からではない。攻撃時はパワフルだが、守備になると根気が続かない。',
    teamRole: 'チームに推進力とポジティブなエネルギーを注入する「起爆剤」',
  },
  '黒ひょう': {
    workStyle: 'センスと正義感で組織を動かすスタイリッシュ型リーダー',
    strengths: ['美意識の高さと洗練されたアウトプット', '正義感の強さと不正を許さない姿勢', '密かにトップを狙う野心'],
    weaknesses: ['プライドが高く、ミスを認めにくい', '失敗の責任を取りたがらない', '見栄を張りすぎて無理をすることも'],
    communicationStyle: 'クールで洗練された印象。努力を人に見せたくないタイプ。褒める時は「センスいいね」が最高の賛辞。',
    bestBoss: '実力を正当に評価してくれる上司。センスや美意識を認めてくれる人。雑な指示を出す上司は苦手。',
    bestSubordinate: '仕事の質にこだわりを持つ人。雑な仕事をする人には厳しくなる。',
    meetingStyle: 'プレゼンや企画会議で本領発揮。資料のクオリティにもこだわるため、準備時間が必要。',
    stressSign: 'いつも以上にピリピリして周囲に厳しくなる。一人で抱え込み「大丈夫」と言い張る。',
    motivationTrigger: '「センスいいね」— これに尽きる。具体的に何のセンスかは問わない。',
    actionTip: '完璧主義を少し緩め、「80%でまず出す」を試してみる。フィードバックをもらう方が結果的にクオリティが上がる。',
    responsibility: '密かにトップを狙う自信家ゆえ仕事はきちんとこなし任せて安心。ただしプライドが高く、失敗の責任を取りたがらない。',
    teamRole: 'アウトプットの質を高め、チーム全体の「見せ方」を格上げする「クオリティマネージャー」',
  },
  'ライオン': {
    workStyle: '完璧主義で責任感の強いカリスマ型リーダー',
    strengths: ['圧倒的な責任感とリーダーシップ', '味方を最後まで守り抜く義理堅さ', '大きなビジョンを描く力'],
    weaknesses: ['完璧主義すぎて周囲を振り回す', '弱みを見せられず一人で抱え込む', '「特別扱い」を求めがち'],
    communicationStyle: '堂々とした存在感。言葉に重みがあり、人を動かす力がある。ただし一方的になりがちなので対話の意識が大切。',
    bestBoss: '大きな裁量を任せてくれる上司。「特別な存在」として扱ってくれると忠誠を誓う。',
    bestSubordinate: '指示を忠実に実行してくれる人。ただし指示待ちではなく、自発的に動ける人が理想。',
    meetingStyle: '自然とファシリテーターになる。場を仕切る力は抜群だが、他のメンバーの発言機会を意識的に作ることが課題。',
    stressSign: 'さらに完璧主義が加速し、周囲への要求が厳しくなる。一人で残業が増えたら危険信号。',
    motivationTrigger: '「特別な人だもん」— 選ばれし存在として認められるとパフォーマンスが爆上がり。',
    actionTip: '週に1回「弱みを見せる練習」をしてみる。「ここは助けてほしい」と言えると、チームの結束力が上がる。',
    responsibility: '仕事に対する責任感が強く、けじめのない人が許せない完璧主義者。何が起きても弱音は吐かない。ただし人を振り回す。',
    teamRole: '大きなビジョンを掲げ、チーム全体を率いる「絶対的キャプテン」',
  },
  '虎': {
    workStyle: '有言実行で全体を支える頼れる大黒柱型マネージャー',
    strengths: ['12タイプ中No.1の責任感', '抜群のバランス感覚と面倒見の良さ', '仕事とプライベートを分ける切り替え力'],
    weaknesses: ['人に迷惑をかけたくない思いが強すぎて自分を追い詰める', '部下の失敗も全て背負い込む', '頼られすぎて疲弊することも'],
    communicationStyle: '面倒見が良く親分肌。頼られると力が湧くが、弱さを見せるのは苦手。公平性を重視し、えこひいきを嫌う。',
    bestBoss: '信頼して任せてくれる上司。結果で判断してくれるフェアな人。理不尽な指示には反発する。',
    bestSubordinate: '努力する姿を見せてくれる人。頑張っている姿に弱い。サボる人には厳しいが、失敗は許す。',
    meetingStyle: '進行管理が得意。会議の脱線を上手く戻し、全員が発言できるよう配慮する。',
    stressSign: '体調不良を隠して働き続ける。「大丈夫」が口癖になったら周囲が気づいてあげるべき。',
    motivationTrigger: '「キミにしか相談できない」— 頼られると親分肌が爆発。信頼の証としてこの上ない言葉。',
    actionTip: '「自分がやらなくてもいい仕事」を週に3つ見つけて、勇気を持って任せてみる。',
    responsibility: '責任感の強さは12タイプ中トップ。人に迷惑をかけたくない思いで自分を追い詰め、部下の責任もしっかり取るタイプ。',
    teamRole: 'チーム全体を見渡し、誰も取りこぼさない「最強のマネージャー」',
  },
  'たぬき': {
    workStyle: '誰とでも上手くやれる調整力No.1のハーモナイザー',
    strengths: ['誰とでも関係を築ける対人スキル', '場を和ませる天性の愛嬌', '歴史や前例から学ぶ知恵'],
    weaknesses: ['八方美人になりやすい', '頼まれると断れずキャパオーバーに', '優柔不断で意思決定が遅い'],
    communicationStyle: 'いつも笑顔で場を和ませる。相手に合わせるのが上手いが、本音が見えにくいことも。実は鋭い観察眼を持つ。',
    bestBoss: '穏やかで安定感のある上司。急な変更や感情的な指示を出す人は苦手。',
    bestSubordinate: '素直で明るい人。一緒に楽しく仕事ができる関係性を重視する。',
    meetingStyle: '調整役として力を発揮。対立する意見をまとめるのが上手い。ただし自分の意見を強く主張するのは苦手。',
    stressSign: 'いつもの笑顔が引きつり始める。「何でもいいよ」の頻度が上がったら限界のサイン。',
    motivationTrigger: '「一緒にいるとほっとする」— 存在そのものを肯定される言葉が最高のご褒美。',
    actionTip: '「今週断る練習を1回だけする」と決めてみる。「ちょっと考えさせて」は魔法の言葉。',
    responsibility: '真面目で適当ができないタイプ。期限管理が甘く、何でも引き受けてパニックになり、無責任と思われることも。',
    teamRole: 'どんな場面でもチームの空気を柔らかくする「究極の潤滑油」',
  },
  '子守熊': {
    workStyle: '戦略的に勝ちを拾うクレバーな参謀型プレイヤー',
    strengths: ['損得勘定と先読み力', 'サービス精神と人を喜ばせる力', '無駄を省く効率化の才能'],
    weaknesses: ['計算高く見られがち', '即断即決が苦手（じっくり考えたい）', '苦手な仕事を人に押し付けることも'],
    communicationStyle: 'サービス精神旺盛で相手を楽しませるのが得意。ただし本心は見せず、戦略的に関係を構築する面もある。',
    bestBoss: '実績を正当に評価してくれる上司。努力の過程より結果で判断してくれるリアリスト。',
    bestSubordinate: '能力が高く自走できる人。苦手な分野を任せられる優秀な部下がいると最強。',
    meetingStyle: 'コスト分析やリスク評価の議論で力を発揮。感情論だけの会議には興味が薄い。',
    stressSign: '効率へのこだわりが極端になる。「これ意味ある？」が口癖になったら疲れているサイン。',
    motivationTrigger: '「夢は叶うよ」— ロマンチストな一面があり、夢を肯定されるとモチベーションが上がる。',
    actionTip: '「勝てる勝負」だけでなく、たまには勝率の低いチャレンジにも手を挙げてみる。成長の幅が広がる。',
    responsibility: '評価のための仕事完遂が第一。負ける勝負はしないので失敗もなし。苦手な仕事は能力のある人に任せてしまう。',
    teamRole: '冷静な分析と先読みでチームのリスクを減らす「知恵袋参謀」',
  },
  'ゾウ': {
    workStyle: 'ストイックに努力を重ねるパワフルな実行者',
    strengths: ['圧倒的な行動力とリーダーシップ', '諦めない粘り強さと根性', '正直で裏表のない信頼感'],
    weaknesses: ['プライドが高く意見を曲げにくい', '繊細な一面を隠して無理をする', '自分を追い詰めすぎる'],
    communicationStyle: '正直で真っすぐ。裏表がないので信頼されやすいが、デリケートな一面もあり、意外と傷つきやすい。',
    bestBoss: '努力を見てくれている上司。結果だけでなくプロセスも評価してくれるタイプ。',
    bestSubordinate: '一生懸命な人。手を抜く人には厳しいが、全力で頑張る姿には優しくなる。',
    meetingStyle: '実行計画やアクションアイテムの議論で活躍。抽象的な議論だけでは物足りない。',
    stressSign: 'さらに働き詰めになる。休日出勤が増えたら周囲が止めるべき。',
    motivationTrigger: '「よく頑張ったね」— 努力を見てくれている人がいるとしみじみ嬉しい。',
    actionTip: '「頑張らない日」を意識的に作る。OFF の質を上げることで、ON のパフォーマンスも上がる。',
    responsibility: '手抜きせず今日のことは今日のうちに済ませるタイプ。プライドの高さから、受けた仕事は後には引けず慎重に熱心に打ち込む。',
    teamRole: 'どんな逆境でも前に進み続け、チームの実行力を支える「不屈のエンジン」',
  },
  'ひつじ': {
    workStyle: 'チームの調和を守る情報通のコーディネーター',
    strengths: ['人間関係を俯瞰して観察する力', '情報収集能力の高さ', '組織の調和を守る律儀さ'],
    weaknesses: ['一人でいるのが極端に苦手', '自分に非がないと思ったら絶対に責任を取らない', '多数派に流されやすい'],
    communicationStyle: '「みんなで一緒に」が基本スタンス。情報網が広く、社内の動向に詳しい。客観的に関係性を観察できる。',
    bestBoss: '公平でチーム全体を見てくれる上司。個人プレーを強要する人は苦手。',
    bestSubordinate: '協調性のある人。チームの輪を乱す人には距離を置く。',
    meetingStyle: '全員参加型の会議を好む。一人だけ蚊帳の外になるのは嫌い。根回しが得意。',
    stressSign: '愚痴が増える。普段は穏やかなのに、特定の人への不満を漏らし始めたら要注意。',
    motivationTrigger: '「みんなも行くよ」— "みんな"がつくと腰が上がる。一人だけの行動は不安。',
    actionTip: '「自分一人の意見」を持つ練習をする。周囲に流される前に「私はこう思う」を30秒だけ考える。',
    responsibility: '組織を重んじ律儀で義理堅い。責任感は強いが、自分に非がないと思ったら絶対に責任を取らない。',
    teamRole: 'メンバー間の情報を繋ぎ、チームの一体感を生み出す「ネットワーカー」',
  },
  'ペガサス': {
    workStyle: '型破りなひらめきで次元を超える天才型イノベーター',
    strengths: ['誰にも真似できない独自の感性', '天才的なひらめきとクリエイティビティ', '固定観念にとらわれない自由な発想'],
    weaknesses: ['気分のムラが激しい', '安請け合いして結果が出ないことも', 'ルーティンワークが極端に苦手'],
    communicationStyle: '感情の起伏が大きく、テンション次第で別人になる。自由を奪われると一気にパフォーマンスが落ちる。',
    bestBoss: '自由にやらせてくれて、型にはめない上司。スケジュール管理だけサポートしてくれると最高。',
    bestSubordinate: '柔軟に対応してくれる人。「でも普通は…」と言う人とは合わない。',
    meetingStyle: '新規企画やクリエイティブワークでは無敵。ただし定例の進捗報告会議は苦痛。テンションが低い日は欠席したくなる。',
    stressSign: 'テンションの落差が激しくなる。突然「もう辞めたい」と言い出すことも（本気度は半々）。',
    motivationTrigger: '「あなたの感性はスゴイ」— 何がどうスゴイかは具体的に言わなくてよい。自由を奪わないこと。',
    actionTip: '気分が乗らない日のための「最低限やることリスト」を作っておく。ハードルを下げることで継続できる。',
    responsibility: '働くこと自体は苦ではないが安請け合いしがち。成り行き任せで無理はしない。自分に責任があるかわからないことも。',
    teamRole: '既成概念を壊し、チームに想像を超えるアイデアをもたらす「イノベーター」',
  },
};

// ---- チームアドバイス（バランス傾向別）----
const TEAM_ADVICE = {
  'MOON偏り': {
    title: '共感力が強みの「ファミリー型チーム」',
    strength: '心理的安全性が高く、メンバーが安心して意見を言える環境。困った時に助け合える信頼関係がある。',
    challenge: '意思決定が遅くなりがち。感情に配慮しすぎて、厳しいフィードバックを避ける傾向。',
    actions: [
      '会議の最初に「今日のゴールと終了時間」を必ず共有する',
      '意思決定の期限を事前に決めておく（「金曜までに決める」等）',
      'フィードバックは「相手のため」という前提を全員で共有する',
    ],
  },
  'EARTH偏り': {
    title: '結果にコミットする「プロフェッショナル集団」',
    strength: '目標に向かって一直線。効率と品質の両立ができ、成果を出す力が強い。',
    challenge: '人間関係がドライになりがち。メンバーの感情面のケアが手薄になる。',
    actions: [
      '月1回「雑談だけの時間」を設ける（成果報告なし）',
      '1on1ミーティングで「最近どう？」と聞く習慣をつける',
      '成果だけでなくプロセスも称える文化をつくる',
    ],
  },
  'SUN偏り': {
    title: 'ひらめきと爆発力の「イノベーションチーム」',
    strength: '常識にとらわれない発想力。新しいことへの挑戦スピードが速く、ワクワクするビジョンを生み出せる。',
    challenge: '計画性や継続力に課題。盛り上がった後のフォローアップが弱い。',
    actions: [
      'アイデア出しと実行計画は別の会議で行う',
      '「始める人」と「続ける人」を明確に分ける',
      '進捗の可視化ツール（カンバンボード等）を導入する',
    ],
  },
  'バランス型': {
    title: '死角のない「パーフェクトバランスチーム」',
    strength: '共感力（MOON）・実行力（EARTH）・発想力（SUN）が揃い、どんな局面にも対応できる最強のバランス。',
    challenge: '価値観の違いからコミュニケーションのすれ違いが起きやすい。「話し方」が三者三様。',
    actions: [
      '三分類の違いをチームで共有し「なぜ伝わらないか」を理解する',
      'MOONには共感から入り、EARTHには結論から入り、SUNにはビジョンから入る',
      '各タイプの強みを活かした役割分担を意識する',
    ],
  },
  'MOON不在': {
    title: '⚠️ MOONタイプ不在',
    warning: '共感やメンバーケアの機能が弱くなりがち。',
    actions: [
      '意識的に「相手の気持ちを聞く時間」を設ける',
      'チームの空気感や人間関係の変化に注目する役割を決める',
      '1on1ミーティングを定期的に実施する',
    ],
  },
  'EARTH不在': {
    title: '⚠️ EARTHタイプ不在',
    warning: '目標管理やスケジュールの仕組みが弱くなりがち。',
    actions: [
      'KPIやマイルストーンを明文化する習慣をつける',
      'タスク管理ツールを導入し「見える化」する',
      '数字やデータに基づく振り返りの場を定期的に設ける',
    ],
  },
  'SUN不在': {
    title: '⚠️ SUNタイプ不在',
    warning: '新しい発想や挑戦の推進力が弱くなりがち。',
    actions: [
      '月1回「自由にアイデアを出す時間」を設ける',
      '外部のイベントやセミナーに参加して刺激を取り入れる',
      '「前例がないから」で却下せず、まず小さく試す文化をつくる',
    ],
  },
};

// ---- 全60キャラクターデータ（番号順）----
const CHARACTER_TABLE = [
  { n:1,  animal:'チータ',  group:'SUN',   name:'長距離ランナーのチータ' },
  { n:2,  animal:'たぬき',  group:'MOON',  name:'社交家のたぬき' },
  { n:3,  animal:'猿',      group:'EARTH', name:'落ち着きのない猿' },
  { n:4,  animal:'子守熊',  group:'EARTH', name:'フットワークの軽い子守熊' },
  { n:5,  animal:'黒ひょう',group:'MOON',  name:'面倒見のいい黒ひょう' },
  { n:6,  animal:'虎',      group:'EARTH', name:'愛情あふれる虎' },
  { n:7,  animal:'チータ',  group:'SUN',   name:'全力疾走するチータ' },
  { n:8,  animal:'たぬき',  group:'MOON',  name:'磨き上げられたたぬき' },
  { n:9,  animal:'猿',      group:'EARTH', name:'大きな志をもった猿' },
  { n:10, animal:'子守熊',  group:'EARTH', name:'母性豊かな子守熊' },
  { n:11, animal:'こじか',  group:'MOON',  name:'正直なこじか' },
  { n:12, animal:'ゾウ',    group:'SUN',   name:'人気者のゾウ' },
  { n:13, animal:'狼',      group:'EARTH', name:'ネアカの狼' },
  { n:14, animal:'ひつじ',  group:'MOON',  name:'協調性のないひつじ' },
  { n:15, animal:'猿',      group:'EARTH', name:'どっしりとした猿' },
  { n:16, animal:'子守熊',  group:'EARTH', name:'コアラのなかの子守熊' },
  { n:17, animal:'こじか',  group:'MOON',  name:'強い意志をもったこじか' },
  { n:18, animal:'ゾウ',    group:'SUN',   name:'デリケートなゾウ' },
  { n:19, animal:'狼',      group:'EARTH', name:'放浪の狼' },
  { n:20, animal:'ひつじ',  group:'MOON',  name:'物静かなひつじ' },
  { n:21, animal:'ペガサス',group:'SUN',   name:'落ち着きのあるペガサス' },
  { n:22, animal:'ペガサス',group:'SUN',   name:'強靱な翼をもつペガサス' },
  { n:23, animal:'ひつじ',  group:'MOON',  name:'無邪気なひつじ' },
  { n:24, animal:'狼',      group:'EARTH', name:'クリエイティブな狼' },
  { n:25, animal:'狼',      group:'EARTH', name:'穏やかな狼' },
  { n:26, animal:'ひつじ',  group:'MOON',  name:'粘り強いひつじ' },
  { n:27, animal:'ペガサス',group:'SUN',   name:'波乱に満ちたペガサス' },
  { n:28, animal:'ペガサス',group:'SUN',   name:'優雅なペガサス' },
  { n:29, animal:'ひつじ',  group:'MOON',  name:'チャレンジ精神旺盛なひつじ' },
  { n:30, animal:'狼',      group:'EARTH', name:'順応性のある狼' },
  { n:31, animal:'ゾウ',    group:'SUN',   name:'リーダーとなるゾウ' },
  { n:32, animal:'こじか',  group:'MOON',  name:'しっかり者のこじか' },
  { n:33, animal:'子守熊',  group:'EARTH', name:'活動的な子守熊' },
  { n:34, animal:'猿',      group:'EARTH', name:'気分屋の猿' },
  { n:35, animal:'ひつじ',  group:'MOON',  name:'頼られると嬉しいひつじ' },
  { n:36, animal:'狼',      group:'EARTH', name:'好感のもたれる狼' },
  { n:37, animal:'ゾウ',    group:'SUN',   name:'まっしぐらに突き進むゾウ' },
  { n:38, animal:'こじか',  group:'MOON',  name:'華やかなこじか' },
  { n:39, animal:'子守熊',  group:'EARTH', name:'夢とロマンの子守熊' },
  { n:40, animal:'猿',      group:'EARTH', name:'尽くす猿' },
  { n:41, animal:'たぬき',  group:'MOON',  name:'大器晩成のたぬき' },
  { n:42, animal:'チータ',  group:'SUN',   name:'足腰の強いチータ' },
  { n:43, animal:'虎',      group:'EARTH', name:'動きまわる虎' },
  { n:44, animal:'黒ひょう',group:'MOON',  name:'情熱的な黒ひょう' },
  { n:45, animal:'子守熊',  group:'EARTH', name:'サービス精神旺盛な子守熊' },
  { n:46, animal:'猿',      group:'EARTH', name:'守りの猿' },
  { n:47, animal:'たぬき',  group:'MOON',  name:'人間味あふれるたぬき' },
  { n:48, animal:'チータ',  group:'SUN',   name:'品格のあるチータ' },
  { n:49, animal:'虎',      group:'EARTH', name:'ゆったりとした悠然の虎' },
  { n:50, animal:'黒ひょう',group:'MOON',  name:'落ち込みの激しい黒ひょう' },
  { n:51, animal:'ライオン',group:'SUN',   name:'我が道を行くライオン' },
  { n:52, animal:'ライオン',group:'SUN',   name:'統率力のあるライオン' },
  { n:53, animal:'黒ひょう',group:'MOON',  name:'感情豊かな黒ひょう' },
  { n:54, animal:'虎',      group:'EARTH', name:'楽天的な虎' },
  { n:55, animal:'虎',      group:'EARTH', name:'パワフルな虎' },
  { n:56, animal:'黒ひょう',group:'MOON',  name:'気取らない黒ひょう' },
  { n:57, animal:'ライオン',group:'SUN',   name:'悠然と構えるライオン' },
  { n:58, animal:'ライオン',group:'SUN',   name:'華やかなライオン' },
  { n:59, animal:'黒ひょう',group:'MOON',  name:'束縛を嫌う黒ひょう' },
  { n:60, animal:'虎',      group:'EARTH', name:'コートのなかの虎' },
];

// ---- 相性マトリクス（仕事文脈）----
const COMPATIBILITY = {
  groupCompat: {
    'MOON-MOON': { score: 85, label: '安心感のあるパートナー', desc: '互いの気持ちを自然に汲み取れる心地よい関係。チームの心理的安全性を一緒に高められる。' },
    'MOON-EARTH': { score: 65, label: '互いに学び合える関係', desc: 'MOONの共感力とEARTHの実行力が補い合う。テンポの違いを理解すれば最強の組み合わせ。' },
    'MOON-SUN': { score: 70, label: '刺激と安心のバランス', desc: 'SUNのビジョンにMOONが寄り添い、チームに温かさとエネルギーの両方を生む。' },
    'EARTH-EARTH': { score: 80, label: '実力派タッグ', desc: '互いの実力を認め合うプロフェッショナルな関係。目標に向かって無駄なく進める最強のビジネスパートナー。' },
    'EARTH-SUN': { score: 75, label: '化学反応を起こす組み合わせ', desc: 'SUNのひらめきをEARTHが実行計画に落とし込む。イノベーションと実現力のベストマッチ。' },
    'SUN-SUN': { score: 90, label: '爆発的シナジー', desc: '感性×感性で誰にも真似できない世界を生む。ノリと直感で突き抜けたアウトプットを出せる。' },
    'EARTH-MOON': { score: 65, label: '互いに学び合える関係', desc: 'MOONの共感力とEARTHの実行力が補い合う。テンポの違いを理解すれば最強の組み合わせ。' },
    'SUN-MOON': { score: 70, label: '刺激と安心のバランス', desc: 'SUNのビジョンにMOONが寄り添い、チームに温かさとエネルギーの両方を生む。' },
    'SUN-EARTH': { score: 75, label: '化学反応を起こす組み合わせ', desc: 'SUNのひらめきをEARTHが実行計画に落とし込む。イノベーションと実現力のベストマッチ。' },
  },
  animalBonus: {
    '狼-こじか': 10,   'こじか-狼': 10,
    'たぬき-ひつじ': 8, 'ひつじ-たぬき': 8,
    '虎-ゾウ': 7,       'ゾウ-虎': 7,
    'ライオン-チータ': 9, 'チータ-ライオン': 9,
    '猿-子守熊': 6,     '子守熊-猿': 6,
    '黒ひょう-ペガサス': 8, 'ペガサス-黒ひょう': 8,
    '狼-虎': 5,         '虎-狼': 5,
    'こじか-ひつじ': 7, 'ひつじ-こじか': 7,
    'ペガサス-ライオン': 6, 'ライオン-ペガサス': 6,
  }
};

// ---- 関係性タイプ（仕事文脈）----
const RELATIONSHIP_TYPES = {
  soulmate: { label: '🤝 ベストパートナー', color: '#2d6a7a', minScore: 90 },
  bestPartner: { label: '💼 最強タッグ', color: '#7c6dab', minScore: 80 },
  goodVibes: { label: '☕ 心地よい関係', color: '#5a8a6a', minScore: 70 },
  learning: { label: '📚 成長し合える', color: '#d4944a', minScore: 60 },
  challenge: { label: '⚡ スパイスの関係', color: '#c0392b', minScore: 0 },
};

// ============================================================
// 算出ロジック
// ============================================================

function getCharacterNumber(year, month, day) {
  const base = Date.UTC(1926, 0, 1);
  const target = Date.UTC(year, month - 1, day);
  const diffMs = target - base;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const idx0 = ((26 + diffDays) % 60 + 60) % 60;
  return idx0 + 1;
}

function getCharacterInfo(charNum) {
  const num = parseInt(charNum, 10);
  if (isNaN(num) || num < 1 || num > 60) return null;
  const data = CHARACTER_TABLE[num - 1];
  const profile = ANIMAL_PROFILES[data.animal];
  const workProfile = WORK_PROFILES[data.animal];
  const group = GROUPS[data.group];
  return { number: num, ...data, profile, workProfile, group };
}

function diagnoseByBirthday(year, month, day) {
  const charNum = getCharacterNumber(year, month, day);
  return getCharacterInfo(charNum);
}

function calculateCompatibility(char1, char2) {
  const groupKey = `${char1.group.id}-${char2.group.id}`;
  const baseCompat = COMPATIBILITY.groupCompat[groupKey] || { score: 50, label: '未知', desc: '' };
  const animalKey = `${char1.animal}-${char2.animal}`;
  const bonus = COMPATIBILITY.animalBonus[animalKey] || 0;
  const finalScore = Math.min(100, baseCompat.score + bonus);

  let relType = RELATIONSHIP_TYPES.challenge;
  for (const [key, type] of Object.entries(RELATIONSHIP_TYPES)) {
    if (finalScore >= type.minScore) {
      relType = type;
      break;
    }
  }

  return {
    score: finalScore,
    label: baseCompat.label,
    description: baseCompat.desc,
    relationship: relType,
    bonus: bonus > 0 ? `${char1.animal}×${char2.animal}の特別シナジー +${bonus}` : null,
  };
}

function analyzeGroupBalance(members) {
  const balance = { MOON: 0, EARTH: 0, SUN: 0 };
  members.forEach(m => {
    if (m && m.group) balance[m.group.id]++;
  });
  const total = members.length;
  return {
    counts: balance,
    percentages: {
      MOON: Math.round((balance.MOON / total) * 100),
      EARTH: Math.round((balance.EARTH / total) * 100),
      SUN: Math.round((balance.SUN / total) * 100),
    },
    dominant: Object.entries(balance).sort((a, b) => b[1] - a[1])[0][0],
  };
}

function getTeamAdvice(balance) {
  const { counts } = balance;
  const total = counts.MOON + counts.EARTH + counts.SUN;
  const adviceList = [];

  // メインバランス
  if (counts.MOON > 0 && counts.EARTH > 0 && counts.SUN > 0) {
    adviceList.push(TEAM_ADVICE['バランス型']);
  } else {
    const dominant = balance.dominant;
    const dominantPct = Math.round((counts[dominant] / total) * 100);
    if (dominantPct >= 50) {
      const key = dominant === 'MOON' ? 'MOON偏り' : dominant === 'EARTH' ? 'EARTH偏り' : 'SUN偏り';
      adviceList.push(TEAM_ADVICE[key]);
    }
  }

  // 不在チェック
  if (counts.MOON === 0) adviceList.push(TEAM_ADVICE['MOON不在']);
  if (counts.EARTH === 0) adviceList.push(TEAM_ADVICE['EARTH不在']);
  if (counts.SUN === 0) adviceList.push(TEAM_ADVICE['SUN不在']);

  return adviceList;
}
