/*
  콘텐츠 파일
  [[키]]  → 엑셀 화면에 보이는 이름을 강조 표시로 (설정한 엑셀 언어에 맞춰 바뀜)
  {{키}}  → 같은 이름을 강조 없이 그대로 (수식 안에서 사용)

  엑셀 칸에 넣는 글자는 스페인어로 한다. 회사 컴퓨터에서 한글 입력이 안 될 수 있고,
  직원들도 스페인어로 읽기 때문. 설명은 한국어.
*/

// 엑셀 언어별 이름: es = 스페인어 엑셀, ko = 한국어 엑셀
const TERMS = {
  // 메뉴·버튼
  file:        { kind: 'ui', es: 'Archivo', ko: '파일' },
  home:        { kind: 'ui', es: 'Inicio', ko: '홈' },
  insert:      { kind: 'ui', es: 'Insertar', ko: '삽입' },
  data:        { kind: 'ui', es: 'Datos', ko: '데이터' },
  view:        { kind: 'ui', es: 'Vista', ko: '보기' },
  blank:       { kind: 'ui', es: 'Libro en blanco', ko: '새 통합 문서' },
  saveas:      { kind: 'ui', es: 'Guardar como', ko: '다른 이름으로 저장' },
  save:        { kind: 'ui', es: 'Guardar', ko: '저장' },
  browse:      { kind: 'ui', es: 'Examinar', ko: '찾아보기' },
  bold:        { kind: 'ui', es: 'Negrita (N)', ko: '굵게 (가)' },
  borders:     { kind: 'ui', es: 'Bordes', ko: '테두리' },
  allborders:  { kind: 'ui', es: 'Todos los bordes', ko: '모든 테두리' },
  freeze:      { kind: 'ui', es: 'Inmovilizar', ko: '틀 고정' },
  freezeTop:   { kind: 'ui', es: 'Inmovilizar fila superior', ko: '첫 행 고정' },
  fmtTable:    { kind: 'ui', es: 'Dar formato como tabla', ko: '표 서식' },
  hasHeaders:  { kind: 'ui', es: 'La tabla tiene encabezados', ko: '머리글 포함' },
  autosum:     { kind: 'ui', es: 'Autosuma (Σ)', ko: '자동 합계 (Σ)' },
  filter:      { kind: 'ui', es: 'Filtro', ko: '필터' },
  sortDesc:    { kind: 'ui', es: 'Ordenar de mayor a menor', ko: '숫자 내림차순 정렬' },
  selectAll:   { kind: 'ui', es: '(Seleccionar todo)', ko: '(모두 선택)' },
  clearFilter: { kind: 'ui', es: 'Borrar filtro', ko: '필터 해제' },
  validation:  { kind: 'ui', es: 'Validación de datos', ko: '데이터 유효성 검사' },
  allow:       { kind: 'ui', es: 'Permitir', ko: '제한 대상' },
  list:        { kind: 'ui', es: 'Lista', ko: '목록' },
  source:      { kind: 'ui', es: 'Origen', ko: '원본' },
  condFmt:     { kind: 'ui', es: 'Formato condicional', ko: '조건부 서식' },
  highlight:   { kind: 'ui', es: 'Resaltar reglas de celdas', ko: '셀 강조 규칙' },
  lessThan:    { kind: 'ui', es: 'Es menor que…', ko: '보다 작음…' },
  percent:     { kind: 'ui', es: 'Estilo porcentual (%)', ko: '백분율 스타일 (%)' },
  currency:    { kind: 'ui', es: 'Formato de número de contabilidad ($)', ko: '회계 표시 형식' },
  print:       { kind: 'ui', es: 'Imprimir', ko: '인쇄' },
  export:      { kind: 'ui', es: 'Exportar', ko: '내보내기' },
  pdf:         { kind: 'ui', es: 'Crear documento PDF/XPS', ko: 'PDF/XPS 문서 만들기' },
  charts:      { kind: 'ui', es: 'Gráficos recomendados', ko: '추천 차트' },
  colChart:    { kind: 'ui', es: 'Columna agrupada', ko: '묶은 세로 막대형' },
  rename:      { kind: 'ui', es: 'Cambiar nombre', ko: '이름 바꾸기' },

  // 단축키
  k_save:  { kind: 'key', es: 'Ctrl+G', ko: 'Ctrl+S' },
  k_bold:  { kind: 'key', es: 'Ctrl+N', ko: 'Ctrl+B' },
  k_undo:  { kind: 'key', es: 'Ctrl+Z', ko: 'Ctrl+Z' },
  k_redo:  { kind: 'key', es: 'Ctrl+Y', ko: 'Ctrl+Y' },
  k_copy:  { kind: 'key', es: 'Ctrl+C', ko: 'Ctrl+C' },
  k_paste: { kind: 'key', es: 'Ctrl+V', ko: 'Ctrl+V' },
  k_enter: { kind: 'key', es: 'Enter', ko: 'Enter' },
  k_tab:   { kind: 'key', es: 'Tab', ko: 'Tab' },
  k_f2:    { kind: 'key', es: 'F2', ko: 'F2' },
  k_f4:    { kind: 'key', es: 'F4', ko: 'F4' },
  k_del:   { kind: 'key', es: 'Supr', ko: 'Delete' },
  k_bksp:  { kind: 'key', es: '←', ko: '←' },
  k_esc:   { kind: 'key', es: 'Esc', ko: 'Esc' },
  k_shift: { kind: 'key', es: 'Shift (⇧)', ko: 'Shift (⇧)' },

  // 함수 이름
  SUM:     { kind: 'fn', es: 'SUMA', ko: 'SUM' },
  AVERAGE: { kind: 'fn', es: 'PROMEDIO', ko: 'AVERAGE' },
  MAX:     { kind: 'fn', es: 'MAX', ko: 'MAX' },
  MIN:     { kind: 'fn', es: 'MIN', ko: 'MIN' },
  IF:      { kind: 'fn', es: 'SI', ko: 'IF' },
  SUMIF:   { kind: 'fn', es: 'SUMAR.SI', ko: 'SUMIF' },
  COUNTIF: { kind: 'fn', es: 'CONTAR.SI', ko: 'COUNTIF' },

  // 기호
  sep: { kind: 'fn', es: ';', ko: ',' },  // 함수 안 구분 기호
  dec: { kind: 'fn', es: ',', ko: '.' },  // 소수점
};

// 사전 탭
const DICT = {
  keys: [
    ['k_undo', '방금 한 것 취소 (제일 중요!)'], ['k_save', '저장'], ['k_redo', '취소한 걸 다시'],
    ['k_copy', '복사'], ['k_paste', '붙여넣기'], ['k_bold', '글자 굵게'],
    ['k_f2', '칸 안의 글자 고치기'], ['k_f4', '수식에 $ 붙이기 (고정)'],
    ['k_enter', '입력하고 아래 칸으로'], ['k_tab', '입력하고 오른쪽 칸으로'],
    ['k_esc', '뜬 창 닫기, 하던 것 그만두기'],
  ],
  fns: [
    ['SUM', '더하기', '={{SUM}}(E2:E5)'],
    ['AVERAGE', '평균', '={{AVERAGE}}(B2:B13)'],
    ['MAX', '가장 큰 값', '={{MAX}}(C2:C9)'],
    ['MIN', '가장 작은 값', '={{MIN}}(C2:C9)'],
    ['IF', '만약 ~이면', '={{IF}}(C2<5{{sep}}"Pedir"{{sep}}"OK")'],
    ['SUMIF', '조건에 맞는 것만 더하기', '={{SUMIF}}(B:B{{sep}}"Moda Sur"{{sep}}D:D)'],
    ['COUNTIF', '조건에 맞는 것 세기', '={{COUNTIF}}(E:E{{sep}}"Pendiente")'],
  ],
  words: [
    ['딸깍', '마우스 왼쪽 버튼 한 번 (클릭)'],
    ['두 번 딸깍', '빠르게 두 번 (더블클릭)'],
    ['끌기', '누른 채로 움직이기 (드래그)'],
    ['셀(칸)', '네모 한 칸. B3처럼 이름이 있어'],
    ['열', '세로줄. 위에 A, B, C…'],
    ['행', '가로줄. 왼쪽에 1, 2, 3…'],
    ['범위', '여러 칸 묶음. B2:B6 = B2부터 B6까지'],
    ['수식', '= 로 시작하는 계산'],
    ['시트', '아래쪽 탭. 공책의 한 장'],
  ],
  // 엑셀에 쓰는 스페인어 낱말
  es: [
    ['Tela', '원단'], ['Color', '색상'], ['Rollos', '롤 수'], ['Metros', '미터'],
    ['Cliente', '고객'], ['Fecha', '날짜'], ['Estado', '상태'], ['Pendiente', '대기'],
    ['Entregado', '배송 완료'], ['Costo', '원가'], ['Margen', '마진'], ['Precio', '가격'],
    ['Ventas', '매출'], ['Gastos', '지출'], ['Ganancia', '이익'], ['Total', '합계'],
  ],
};

const UNITS = [
  { id: 0, title: '컴퓨터 준비운동' },
  { id: 1, title: '엑셀이랑 친해지기' },
  { id: 2, title: '원단 재고 관리' },
  { id: 3, title: '고객 주문 관리' },
  { id: 4, title: '가격과 견적서' },
  { id: 5, title: '매출과 지출' },
];

const PRACTICE_FILE = 'SolunaTex 연습 자료.xlsx';

const STOCK_HEAD = ['Tela', 'Color', 'Rollos', 'Metros x rollo', 'Metros total'];

const LESSONS = [
  /* ───────── 준비운동 ───────── */
  {
    id: 'mouse', unit: 0, title: '마우스랑 친해지기', time: 10,
    goal: '딸깍, 두 번 딸깍, 끌기, 오른쪽 딸깍을 할 수 있다.',
    steps: [
      {
        title: '친구, 반가워',
        body: `<p>나도 쉰 넘어서 컴퓨터를 제대로 배웠어. 처음엔 마우스도 어색하더라고.</p>
<p>엑셀 들어가기 전에 <b>손 풀기</b>부터 하자. 이미 잘하는 거면 금방 지나가니까 걱정 마.</p>
<p>방법은 늘 똑같아. <b>휴대폰으로 읽고, 컴퓨터로 따라 하기.</b></p>`,
        tip: '컴퓨터 앞에 앉아서 휴대폰을 옆에 세워 두면 제일 편해.',
      },
      {
        title: '딸깍 (한 번 누르기)',
        body: `<p>마우스를 손바닥으로 감싸고, <b>검지</b>를 왼쪽 버튼 위에 올려.</p>
<p>왼쪽 버튼을 <b>한 번 딸깍</b> = "이거 고를게".</p>
<p>화면의 아무 아이콘이나 한 번 딸깍해 봐. 파랗게 바뀌지? 그게 골랐다는 뜻이야.</p>`,
        tip: '이 앱에서 "누른다", "딸깍"은 전부 왼쪽 버튼 한 번이야. 오른쪽은 따로 말할게.',
      },
      {
        title: '두 번 딸깍',
        body: `<p>왼쪽 버튼을 <b>빠르게 두 번</b> 딸깍딸깍 = "이거 열어 줘".</p>
<p>파일 열 때 이미 해 봤을 거야. 엑셀에서는 <b>칸 안의 글자를 고칠 때</b> 써.</p>
<p>너무 천천히 누르면 그냥 딸깍 두 번이 돼. 안 열리면 조금 더 빠르게.</p>`,
      },
      {
        title: '누른 채로 끌기',
        body: `<p>엑셀에서 제일 많이 쓰는 동작이야.</p>
<ol>
<li>왼쪽 버튼을 <b>누르고</b>,</li>
<li><b>손가락을 떼지 않은 채</b> 마우스를 움직이고,</li>
<li>원하는 곳에서 <b>손가락을 떼.</b></li>
</ol>
<p>엑셀에서 <b>여러 칸을 한꺼번에 고를 때</b> 이렇게 해. 바탕화면 빈 곳에서 해 보면 파란 네모가 그려질 거야.</p>`,
        sheet: { rows: [['', '', ''], ['', '', ''], ['', '', '']], sel: ['A1', 'B1', 'A2', 'B2', 'A3', 'B3'] },
      },
      {
        title: '오른쪽 딸깍',
        body: `<p>오른쪽 버튼 한 번 = "여기서 뭘 할 수 있어?" 하고 <b>메뉴가 뜨는</b> 거야.</p>
<p>엑셀에서는 시트 이름 바꿀 때 정도만 써. 실수로 메뉴가 떴으면 [[k_esc]] 키를 누르거나 빈 곳을 딸깍하면 닫혀.</p>`,
      },
    ],
    practice: [
      '바탕화면 아이콘 하나를 딸깍해서 고른다',
      '폴더 하나를 두 번 딸깍해서 열고, 오른쪽 위 X로 닫는다',
      '바탕화면 빈 곳에서 누른 채로 끌어 파란 네모를 그린다',
      '빈 곳을 오른쪽 딸깍해서 메뉴를 띄우고, Esc로 닫는다',
    ],
    quiz: {
      q: '엑셀에서 여러 칸을 한꺼번에 고르려면?',
      options: ['한 칸씩 두 번 딸깍', '누른 채로 끌기', '오른쪽 딸깍', '마우스를 흔든다'],
      answer: 1,
      why: '첫 칸에서 누르고, 떼지 말고 끝 칸까지 끌고 가서 떼면 돼.',
    },
  },
  {
    id: 'keys', unit: 0, title: '키보드 꼭 필요한 키', time: 10,
    goal: '엑셀에서 쓰는 키 몇 개와, 두 키를 같이 누르는 법을 안다.',
    steps: [
      {
        title: '키보드, 다 알 필요 없어',
        body: `<p>키보드에 키가 백 개쯤 있지만 엑셀에서 쓰는 건 몇 개 안 돼.</p>
<table class="mini">
<tr><td>[[k_enter]]</td><td>다 썼어, 다음 칸으로 (오른쪽 큰 키)</td></tr>
<tr><td>[[k_bksp]]</td><td>방금 쓴 글자 한 자 지우기 (Enter 위쪽)</td></tr>
<tr><td>[[k_del]]</td><td>고른 칸 비우기</td></tr>
<tr><td>[[k_esc]]</td><td>그만둘래 (왼쪽 맨 위)</td></tr>
</table>`,
        tip: '스페인어 키보드는 Delete 키에 "Supr"라고 써 있어.',
      },
      {
        title: '두 키를 같이 누르기',
        body: `<p>[[k_undo]] 이런 걸 <b>단축키</b>라고 해. 동시에 누르는 게 아니라 <b>순서</b>가 있어.</p>
<ol>
<li>왼쪽 아래 <b>Ctrl</b>을 누르고 <b>그대로 있어.</b></li>
<li>누른 채로 <b>Z</b>를 톡.</li>
<li>둘 다 떼.</li>
</ol>
<p>Shift 누르고 글자 치면 대문자 나오는 거랑 같은 원리야.</p>`,
      },
      {
        title: '대문자와 스페인어 글자',
        body: `<p>엑셀 칸에는 <b>스페인어</b>로 쓸 거야. 회사 사람들이 다 읽을 수 있고, 회사 컴퓨터엔 한글 입력이 없을 수도 있으니까.</p>
<ul>
<li><b>대문자</b>: [[k_shift]] 누른 채로 글자. 예: T → <b>Tela</b></li>
<li><b>ó, á</b> 같은 글자: 먼저 <b>´</b> 키(Enter 옆)를 톡, 그다음 글자. 예: ´ + o → ó</li>
</ul>
<p>악센트를 빼먹어도 엑셀은 잘 돌아가. 너무 신경 쓰지 마.</p>`,
      },
    ],
    practice: [
      '메모장이나 메일 쓰기 창을 연다',
      'Shift를 써서 Tela, Color 라고 쳐 본다',
      '← 키로 한 글자 지워 본다',
      'Ctrl 누른 채 Z를 눌러서 지운 게 돌아오는지 본다',
    ],
    quiz: {
      q: 'Ctrl+Z는 어떻게 누를까?',
      options: ['Ctrl 한 번, Z 한 번 따로따로', 'Ctrl을 누른 채로 Z를 누른다', 'Z를 누른 채로 Ctrl', '둘 다 두 번씩'],
      answer: 1,
      why: 'Ctrl은 꾹 누르고 있고, 그 상태에서 Z를 톡. 모든 단축키가 이 방식이야.',
    },
  },

  /* ───────── 1부 ───────── */
  {
    id: 1, unit: 1, title: '엑셀이랑 인사하기', time: 15,
    goal: '엑셀을 켜고, 칸 이름을 알고, 파일을 저장할 수 있다.',
    steps: [
      {
        title: '엑셀은 계산하는 공책',
        body: `<p>엑셀은 <b>칸이 그려진 공책</b>이야. 공책이랑 다른 건 딱 하나, <b>계산을 대신 해 준다</b>는 거.</p>
<p>원단 몇 미터 남았는지, 이번 달에 얼마 팔았는지, 계산기 두드리던 걸 엑셀이 다 해 줘.</p>`,
      },
      {
        title: '엑셀 켜기',
        body: `<ol>
<li>화면 맨 아래 왼쪽, <b>창문 모양 버튼</b>을 딸깍.</li>
<li>키보드로 <b>excel</b>이라고 쳐. 초록색 <b>X</b> 그림이 나와. 딸깍.</li>
<li>처음 화면에서 [[blank]]을(를) 딸깍.</li>
</ol>
<p>하얀 바탕에 칸이 잔뜩 있는 화면이 나오면 성공이야.</p>`,
        tip: '화면 위쪽에 버튼이 엄청 많지? 다 몰라도 돼. 필요한 것만 하나씩 알려 줄게.',
      },
      {
        title: '칸마다 이름이 있어',
        body: `<p>위쪽에 <b>A, B, C…</b> 이게 <b>열</b>(세로줄). 왼쪽에 <b>1, 2, 3…</b> 이게 <b>행</b>(가로줄).</p>
<p>칸 하나를 <b>셀</b>이라고 불러. 이름은 <b>글자 + 숫자</b>. 아래 노란 칸은 B열 3행이니까 <b>B3</b>.</p>`,
        sheet: { rows: [['', '', ''], ['', '', ''], ['', 'B3', ''], ['', '', '']], hl: ['B3'] },
        tip: '바둑판 좌표랑 똑같아. 글자 먼저, 숫자 나중.',
      },
      {
        title: '저장하기',
        body: `<ol>
<li>왼쪽 맨 위 [[file]]을(를) 딸깍.</li>
<li>[[saveas]] → [[browse]] 순서로 딸깍.</li>
<li>파일 이름 칸에 <b>Mi Excel</b>이라고 쓰고 [[save]].</li>
</ol>
<p>한 번 저장한 뒤부터는 [[k_save]]만 누르면 돼. 작업하다 수시로 눌러 주는 습관, 이것만 들여도 반은 먹고 들어가.</p>`,
      },
    ],
    practice: [
      '엑셀을 켜고 새 파일을 만든다',
      '아무 칸이나 딸깍해서, 왼쪽 위 작은 칸에 이름(예: C5)이 나오는지 본다',
      '"Mi Excel"이라는 이름으로 저장한다',
    ],
    quiz: {
      q: '<b>D4</b>는 어디에 있는 칸일까?',
      options: ['D열(세로줄) 4행(가로줄)', '4열 D행', 'D열 전체', '4행 전체'],
      answer: 0,
      why: '글자가 먼저, 숫자가 나중. D열을 내려가다가 4행에서 만나는 칸.',
    },
  },
  {
    id: 2, unit: 1, title: '쓰고, 고치고, 지우기', time: 15,
    goal: '칸에 글자와 숫자를 넣고, 고치고, 실수를 되돌릴 수 있다.',
    steps: [
      {
        title: '칸에 쓰기',
        body: `<p>칸을 딸깍하고 그냥 쓰면 돼. 다 쓰면:</p>
<ul>
<li>[[k_enter]] → 아래 칸으로</li>
<li>[[k_tab]] → 오른쪽 칸으로</li>
</ul>
<p>A1부터 이렇게 써 봐. <b>Tela</b>=원단, <b>Color</b>=색상, <b>Metros</b>=미터.</p>`,
        sheet: { rows: [['Tela', 'Color', 'Metros'], ['Algodón', 'Blanco', 120], ['Lino', 'Beige', 80]], hl: ['A1', 'B1', 'C1'] },
      },
      {
        title: '숫자는 오른쪽, 글자는 왼쪽',
        body: `<p>잘 보면 <b>숫자는 칸 오른쪽</b>, <b>글자는 왼쪽</b>에 붙어. 엑셀이 "이건 숫자구나" 하고 알아본 거야.</p>
<p>그래서 <b>120m</b>처럼 단위를 붙이면 안 돼. 엑셀이 글자로 생각해서 계산을 못 해. 단위는 제목 칸(Metros)에 이미 있잖아.</p>`,
        tip: '숫자를 썼는데 왼쪽에 붙으면, 어딘가 글자가 섞였다는 신호야.',
      },
      {
        title: '고치기와 지우기',
        body: `<ul>
<li><b>통째로 바꾸기</b>: 칸 딸깍하고 새로 쓰면 덮어써져.</li>
<li><b>일부만 고치기</b>: 칸을 두 번 딸깍. 안에 깜빡이는 막대가 생겨.</li>
<li><b>칸 비우기</b>: 칸 딸깍하고 [[k_del]].</li>
</ul>`,
      },
      {
        title: '제일 중요한 단축키',
        body: `<p>실수했다? 걱정 마. [[k_undo]] 누르면 방금 한 게 취소돼. 여러 번 누르면 계속 뒤로 가.</p>
<p>엑셀에서 뭘 눌러도 망가지지 않아. 이거 하나 믿고 마음껏 눌러 봐.</p>`,
      },
    ],
    practice: [
      'A1에 Tela, B1에 Color, C1에 Metros를 쓴다',
      '아래에 원단 세 줄을 채운다 (숫자에 m 붙이지 않기!)',
      '한 칸을 Supr로 비웠다가 Ctrl+Z로 되살린다',
    ],
    quiz: {
      q: '중요한 칸을 실수로 지웠어. 어떻게 하지?',
      options: ['파일을 닫고 다시 연다', 'Ctrl+Z를 누른다', '처음부터 다시 쓴다', '컴퓨터를 껐다 켠다'],
      answer: 1,
      why: 'Ctrl+Z는 "방금 한 거 취소". 엑셀에서 제일 든든한 친구야.',
    },
  },
  {
    id: 3, unit: 1, title: '보기 좋게 꾸미기', time: 15,
    goal: '칸 너비를 맞추고, 제목을 굵게, 테두리를 넣을 수 있다.',
    steps: [
      {
        title: '칸 넓히기',
        body: `<p>글자가 잘리거나 숫자가 <b>####</b>으로 보이면 칸이 좁은 거야.</p>
<p>위쪽 <b>A와 B 사이 경계선</b>에 마우스를 대면 화살표 모양이 바뀌어. 그때 <b>두 번 딸깍</b>. 글자에 딱 맞게 넓어져.</p>`,
        tip: '#### 는 고장이 아니야. "칸이 좁아요" 하는 신호.',
      },
      {
        title: '제목은 굵게',
        body: `<ol>
<li>왼쪽 숫자 <b>1</b>을 딸깍하면 1행 전체가 골라져.</li>
<li>위쪽 [[home]] 탭에서 [[bold]] 버튼을 딸깍.</li>
</ol>`,
        sheet: { rows: [['Tela', 'Color', 'Metros'], ['Algodón', 'Blanco', 120], ['Lino', 'Beige', 80]], hl: ['A1', 'B1', 'C1'], bold: 1 },
      },
      {
        title: '테두리 넣기',
        body: `<p>화면의 회색 줄은 <b>인쇄하면 안 나와</b>. 종이로 뽑을 표에는 테두리를 넣어 줘.</p>
<ol>
<li>A1에서 누른 채로 표 오른쪽 아래 끝까지 끌기.</li>
<li>[[home]] → [[borders]] 옆 <b>작은 ▾</b> 딸깍 → [[allborders]].</li>
</ol>`,
      },
    ],
    practice: [
      '지난 강의 표의 칸 너비를 맞춘다',
      '1행을 굵게 한다',
      '표 전체에 모든 테두리를 넣는다',
    ],
    quiz: {
      q: '숫자 칸에 <b>####</b>이 보여. 무슨 뜻일까?',
      options: ['숫자가 틀렸다', '파일이 고장 났다', '칸이 좁아서 숫자가 다 안 보인다', '비밀번호가 걸렸다'],
      answer: 2,
      why: '칸 경계선을 두 번 딸깍하면 넓어지면서 다시 보여.',
    },
  },

  /* ───────── 2부: 재고 ───────── */
  {
    id: 4, unit: 2, title: '원단 재고표 만들기', time: 20,
    goal: 'SolunaTex 원단 재고표를 처음부터 만들 수 있다.',
    steps: [
      {
        title: '어떤 칸이 필요할까',
        body: `<p>창고에서 원단 확인할 때 뭘 보지? 원단, 색상, 몇 롤, 한 롤에 몇 미터.</p>
<p>그대로 제목 줄을 만들면 돼. 마지막 <b>Metros total</b>(총 미터)은 다음 강의에서 엑셀이 계산하게 할 거니까 비워 둬.</p>`,
        sheet: { rows: [STOCK_HEAD], hl: ['A1', 'B1', 'C1', 'D1', 'E1'], bold: 1 },
      },
      {
        title: '재고 채우기',
        body: `<p>아래처럼 채워 봐. 실제 창고에 있는 원단으로 써도 좋아.</p>`,
        sheet: {
          rows: [
            STOCK_HEAD,
            ['Algodón', 'Blanco', 12, 50, ''],
            ['Lino', 'Beige', 5, 40, ''],
            ['Poliéster', 'Negro', 8, 60, ''],
            ['Rayón', 'Azul', 3, 45, ''],
          ], bold: 1,
        },
        tip: '한 칸에 정보 하나만. "Algodón Blanco"처럼 둘을 한 칸에 넣으면 나중에 찾기 힘들어.',
      },
      {
        title: '한 번에 예쁘게: 표 서식',
        body: `<ol>
<li>표 안 아무 칸이나 딸깍.</li>
<li>[[home]] → [[fmtTable]] → 마음에 드는 색 하나 딸깍.</li>
<li>작은 창이 뜨면 [[hasHeaders]]에 체크가 있는지 보고 확인.</li>
</ol>
<p>줄마다 색이 번갈아 들어가고, 제목 칸에 작은 ▾ 도 생겨.</p>`,
      },
    ],
    practice: [
      '새 파일에 재고표 제목 줄 다섯 칸을 쓴다',
      '원단 네 줄 이상 채운다',
      '표 서식을 적용한다',
      '"Stock"이라는 이름으로 저장!',
    ],
    quiz: {
      q: 'Rollos(롤 수) 칸에 <b>12 rollos</b>라고 쓰면?',
      options: ['문제없다', '엑셀이 글자로 생각해서 계산을 못 한다', '자동으로 12가 된다', '빨간색으로 바뀐다'],
      answer: 1,
      why: '숫자 칸에는 숫자만. "rollos"는 제목 칸에 이미 있잖아.',
    },
  },
  {
    id: 5, unit: 2, title: '엑셀한테 계산 시키기', time: 20,
    goal: '= 로 시작하는 수식으로 총 미터를 계산할 수 있다.',
    steps: [
      {
        title: '계산은 = 로 시작',
        body: `<p>빈칸에 <b>=2+3</b> 쓰고 [[k_enter]]. <b>5</b>가 나오지?</p>
<p><b>=</b>는 "이제 계산해 줘" 하는 신호야. = 없이 2+3 쓰면 그냥 글자.</p>
<table class="mini"><tr><td><b>+</b></td><td>더하기</td></tr><tr><td><b>-</b></td><td>빼기</td></tr><tr><td><b>*</b></td><td>곱하기 (x 아님! Shift+8 또는 숫자판 *)</td></tr><tr><td><b>/</b></td><td>나누기</td></tr></table>`,
      },
      {
        title: '숫자 대신 칸 이름으로',
        body: `<p>여기가 진짜야. E2 칸에 <code>=C2*D2</code> 쓰고 [[k_enter]]. 롤 수 × 롤당 미터 = <b>600</b>.</p>`,
        sheet: {
          rows: [STOCK_HEAD, ['Algodón', 'Blanco', 12, 50, 600]],
          hl: ['E2'], ref: ['C2', 'D2'], bold: 1, bar: { cell: 'E2', f: '=C2*D2' },
        },
        tip: '= 를 쓰고 C2 칸을 딸깍하면 이름이 저절로 들어가. 손으로 안 써도 돼.',
      },
      {
        title: '왜 칸 이름을 쓸까',
        body: `<p>Algodón이 2롤 팔려서 C2를 <b>10</b>으로 고쳤다고 해 봐. E2가 저절로 <b>500</b>이 돼.</p>
<p>수식은 "C2 곱하기 D2"라는 <b>규칙</b>을 기억해서, 숫자가 바뀌면 답도 따라 바뀌어.</p>`,
        sheet: {
          rows: [STOCK_HEAD, ['Algodón', 'Blanco', 10, 50, 500]],
          hl: ['C2', 'E2'], bold: 1,
        },
      },
    ],
    practice: [
      '재고표 E2에 =C2*D2 를 쓴다',
      'C2 숫자를 바꿔 보고 E2가 따라 바뀌는지 본다',
      'E3에 =C3*D3, E4에 =C4*D4 … 줄마다 쓴다',
    ],
    quiz: {
      q: 'Lino가 3행에 있어. Lino 총 미터 수식은?',
      options: ['=C3xD3', 'C3*D3', '=C3*D3', '=5*40'],
      answer: 2,
      why: '= 로 시작, 곱하기는 *, 숫자 대신 칸 이름. =5*40도 답은 맞지만 롤 수가 바뀌면 안 따라와.',
    },
  },
  {
    id: 6, unit: 2, title: '합계와 자동 채우기', time: 20,
    goal: '수식을 한 번에 아래로 복사하고, 합계를 낼 수 있다.',
    steps: [
      {
        title: '채우기 핸들',
        body: `<p>E3, E4, E5 하나하나 쓰기 귀찮지? 방법이 있어.</p>
<ol>
<li>E2를 딸깍. 칸 <b>오른쪽 아래 모서리</b>에 아주 작은 초록 네모가 있어.</li>
<li>마우스를 거기 대면 <b>검은 +</b>로 바뀌어. 그때 <b>두 번 딸깍</b>.</li>
</ol>
<p>표 끝까지 수식이 쫙 채워져.</p>`,
        sheet: {
          rows: [
            STOCK_HEAD,
            ['Algodón', 'Blanco', 12, 50, 600],
            ['Lino', 'Beige', 5, 40, 200],
            ['Poliéster', 'Negro', 8, 60, 480],
            ['Rayón', 'Azul', 3, 45, 135],
          ], hl: ['E3', 'E4', 'E5'], bold: 1,
        },
        tip: '작은 네모가 잘 안 잡히면 천천히. 검은 + 가 보일 때만 두 번 딸깍.',
      },
      {
        title: '전부 더하기',
        body: `<p>창고 전체가 몇 미터인지 알고 싶어. 맨 아래 E6 칸을 딸깍하고, [[home]] 탭 오른쪽의 [[autosum]] 버튼을 딸깍. 그리고 [[k_enter]].</p>
<p>엑셀이 알아서 <code>={{SUM}}(E2:E5)</code>를 써 줘. <b>:</b> 는 "부터 까지". E2부터 E5까지 더하라는 말.</p>`,
        sheet: {
          rows: [
            STOCK_HEAD,
            ['Algodón', 'Blanco', 12, 50, 600],
            ['Lino', 'Beige', 5, 40, 200],
            ['Poliéster', 'Negro', 8, 60, 480],
            ['Rayón', 'Azul', 3, 45, 135],
            ['Total', '', '', '', 1415],
          ], hl: ['E6'], ref: ['E2', 'E3', 'E4', 'E5'], bold: 1, bar: { cell: 'E6', f: '={{SUM}}(E2:E5)' },
        },
      },
    ],
    practice: [
      'E2 수식을 채우기 핸들로 끝까지 채운다',
      '맨 아래 칸에서 자동 합계(Σ) 버튼으로 총 미터를 낸다',
      'Ctrl+G로 저장',
    ],
    quiz: {
      q: '<code>={{SUM}}(C2:C9)</code>는 무슨 뜻일까?',
      options: ['C2와 C9 두 칸만 더한다', 'C2부터 C9까지 전부 더한다', 'C2에서 C9를 뺀다', 'C열을 지운다'],
      answer: 1,
      why: '콜론(:)은 "부터 까지". C2, C3, … C9를 다 더해.',
    },
  },
  {
    id: 7, unit: 2, title: '줄 세우고 골라 보기', time: 15,
    goal: '재고를 많은 순으로 줄 세우고, 원하는 것만 볼 수 있다.',
    steps: [
      {
        title: '연습 자료 받기',
        body: `<p>원단이 네 줄뿐이면 줄 세우는 맛이 안 나지. 그래서 연습 자료를 <b>메일로</b> 보내 놨어.</p>
<ol>
<li>컴퓨터에서 메일을 열고 <b>SolunaTex 연습 자료</b> 첨부 파일을 찾아.</li>
<li>첨부 파일을 딸깍해서 내려받고, 두 번 딸깍해서 열어.</li>
<li>엑셀이 열리면 [[file]] → [[saveas]] → [[browse]] → 왼쪽에서 <b>Escritorio</b>(바탕화면) → [[save]].</li>
</ol>
<p>이제 바탕화면에 파일이 생겼어. 다음부터는 거기서 두 번 딸깍.</p>`,
        tip: '위쪽에 노란 줄이 뜨고 "Habilitar edición"(편집 사용)이라고 나오면 그걸 딸깍해야 고칠 수 있어.',
      },
      {
        title: '연습 자료 열기',
        body: `<p>아래쪽 탭 중에 <b>Stock</b>을 딸깍. 원단이 15가지 들어 있어.</p>
<p>제목 칸마다 작은 <b>▾</b>가 보이면 준비 끝.</p>`,
        tip: '메일이 안 보이면 스팸함(Spam, Correo no deseado)도 열어 봐.',
      },
      {
        title: '많은 순서로',
        body: `<p><b>Metros total</b> 제목의 ▾ 를 딸깍 → [[sortDesc]].</p>
<p>제일 많이 남은 원단이 맨 위로 와. 줄 전체가 같이 움직이니까 이름이랑 숫자가 섞일 걱정은 없어.</p>`,
        sheet: {
          rows: [
            ['Tela', 'Color', 'Metros total ▾'],
            ['Algodón', 'Blanco', 600],
            ['Poliéster', 'Negro', 480],
            ['Lino', 'Beige', 200],
            ['Rayón', 'Azul', 135],
          ], hl: ['C1'], bold: 1,
        },
      },
      {
        title: '원하는 것만 보기',
        body: `<p>Negro(검정)만 보고 싶으면: <b>Color</b> ▾ → [[selectAll]] 체크를 딸깍해서 풀고 → <b>Negro</b>만 체크 → 확인.</p>
<p>다시 다 보려면 ▾ → [[clearFilter]].</p>`,
        tip: '필터는 숨기는 거지 지우는 게 아니야. 다 돌아오니까 걱정 마.',
      },
    ],
    practice: [
      '연습 자료의 Stock 시트를 연다',
      'Metros total 많은 순으로 정렬한다',
      'Color로 한 가지 색만 본다',
      '필터를 해제해서 다시 전부 본다',
    ],
    quiz: {
      q: '필터로 Negro만 보이게 했어. 나머지 원단은?',
      options: ['삭제됐다', '잠깐 숨겨졌을 뿐이다', '다른 파일로 갔다', '맨 아래로 갔다'],
      answer: 1,
      why: '필터를 해제하면 다 돌아와.',
    },
  },

  /* ───────── 3부: 주문 ───────── */
  {
    id: 8, unit: 3, title: '주문표와 선택 목록', time: 20,
    goal: '주문표를 만들고, 상태를 목록에서 고르게 할 수 있다.',
    steps: [
      {
        title: '주문표 모양',
        body: `<p>연습 자료의 <b>Pedidos</b>(주문) 탭을 열어 봐. 이렇게 생겼어.</p>
<p><b>Fecha</b> 날짜 · <b>Cliente</b> 고객 · <b>Tela</b> 원단 · <b>Metros</b> 미터 · <b>Estado</b> 상태</p>`,
        sheet: {
          rows: [
            ['Fecha', 'Cliente', 'Tela', 'Metros', 'Estado'],
            ['2026-10-01', 'Moda Sur', 'Algodón', 150, 'Entregado'],
            ['2026-10-03', 'Textil Norte', 'Lino', 60, 'Pendiente'],
            ['2026-10-05', 'Moda Sur', 'Rayón', 90, 'Pendiente'],
          ], bold: 1,
        },
      },
      {
        title: '고객 이름은 늘 똑같이',
        body: `<p>"Moda Sur", "moda sur", "ModaSur"… 사람 눈엔 같아도 엑셀한텐 <b>세 명의 다른 고객</b>이야.</p>
<p>나중에 고객별 합계를 낼 때 이게 중요해. 한 가지로 정해서 늘 똑같이.</p>`,
      },
      {
        title: '상태는 골라서 넣기',
        body: `<p>상태를 매번 손으로 쓰면 오타가 나. 목록에서 고르게 만들자.</p>
<ol>
<li>위쪽 <b>E</b> 글자를 딸깍. E열 전체가 골라져.</li>
<li>[[data]] → [[validation]].</li>
<li>[[allow]]에서 [[list]].</li>
<li>[[source]] 칸에 <code>Pendiente{{sep}}En corte{{sep}}Enviado{{sep}}Entregado</code> 쓰고 확인.</li>
</ol>
<p>이제 E열 칸을 딸깍하면 ▾ 가 생겨. 고르기만 하면 돼.</p>`,
        tip: 'Pendiente=대기, En corte=재단 중, Enviado=보냄, Entregado=배송 완료.',
      },
    ],
    practice: [
      '연습 자료의 Pedidos 시트를 연다',
      'Estado 열에 선택 목록을 만든다',
      '주문 하나의 상태를 목록에서 골라 바꿔 본다',
    ],
    quiz: {
      q: '선택 목록의 제일 좋은 점은?',
      options: ['파일이 작아진다', '오타 없이 늘 같은 말로 들어간다', '자동 저장된다', '색이 예뻐진다'],
      answer: 1,
      why: '"Entregado", "entregado", "Entregao"가 섞이면 나중에 셀 때 다 틀어져.',
    },
  },
  {
    id: 9, unit: 3, title: '만약에: {{IF}}', time: 15,
    goal: '조건에 따라 다른 말이 나오게 할 수 있다.',
    steps: [
      {
        title: '{{IF}}는 "만약에"',
        body: `<p>Stock 시트로 가자. 롤이 5개보다 적으면 "Pedir"(주문해)라고 알려 주면 좋겠지?</p>
<p>F2에 이렇게 써.</p>
<p><code>={{IF}}(C2&lt;5{{sep}}"Pedir"{{sep}}"OK")</code></p>`,
        sheet: {
          cols: ['A', 'C', 'F'],
          rows: [['Tela', 'Rollos', 'Aviso'], ['Algodón', 12, 'OK'], ['Lino', 5, 'OK'], ['Rayón', 3, 'Pedir']],
          hl: ['F4'], ref: ['C4'], bold: 1, bar: { cell: 'F4', f: '={{IF}}(C4<5{{sep}}"Pedir"{{sep}}"OK")' },
        },
      },
      {
        title: '말로 읽으면 쉬워',
        body: `<p>"<b>만약</b> C2가 5보다 작으면 → <b>Pedir</b>, <b>아니면</b> → <b>OK</b>."</p>
<p>괄호 안이 {{sep}} 로 세 칸이야.</p>
<table class="mini"><tr><td>① <b>C2&lt;5</b></td><td>조건</td></tr><tr><td>② <b>"Pedir"</b></td><td>맞을 때</td></tr><tr><td>③ <b>"OK"</b></td><td>아닐 때</td></tr></table>
<p>글자는 큰따옴표 " " 안에 넣어. <b>&lt;</b> 는 "보다 작다".</p>`,
        tip: 'F2에 다 썼으면 채우기 핸들로 두 번 딸깍. 원단마다 다 나와.',
      },
    ],
    practice: [
      'Stock 시트 F1에 Aviso(알림)라고 쓴다',
      'F2에 {{IF}} 수식을 쓴다',
      '채우기 핸들로 끝까지 채운다',
    ],
    quiz: {
      q: 'C2가 <b>8</b>이면 <code>={{IF}}(C2&lt;5{{sep}}"Pedir"{{sep}}"OK")</code> 는?',
      options: ['Pedir', 'OK', '8', '오류'],
      answer: 1,
      why: '8은 5보다 작지 않으니까 "아닐 때" 쪽, OK가 나와.',
    },
  },
  {
    id: '9b', unit: 3, title: '빨간불 켜기', time: 10,
    goal: '숫자가 적으면 칸이 빨갛게 되도록 할 수 있다.',
    steps: [
      {
        title: '색이 더 눈에 띄어',
        body: `<p>롤 수가 적으면 칸이 저절로 빨갛게 되게 하자.</p>
<ol>
<li>Rollos 칸들을 누른 채로 끌어서 골라.</li>
<li>[[home]] → [[condFmt]] → [[highlight]] → [[lessThan]].</li>
<li>숫자 <b>5</b>를 쓰고 확인.</li>
</ol>`,
        sheet: {
          rows: [['Tela', 'Rollos'], ['Algodón', 12], ['Lino', 5], ['Rayón', 3]],
          warn: ['B4'], bold: 1,
        },
      },
      {
        title: '아침 루틴',
        body: `<p>이제 아침마다 Stock 시트 열어서 <b>빨간 칸만</b> 보면 돼. 그게 오늘 주문할 원단이야.</p>
<p>롤 수를 고치면 색도 저절로 바뀌어.</p>`,
      },
    ],
    practice: [
      'Rollos 칸에 빨간 경고를 건다',
      '숫자 하나를 2로 바꿔서 빨개지는지 본다',
      'Ctrl+Z로 되돌린다',
    ],
    quiz: {
      q: '롤 수를 3에서 10으로 고쳤어. 빨간색은?',
      options: ['그대로 빨갛다', '저절로 없어진다', '파랗게 바뀐다', '다시 설정해야 한다'],
      answer: 1,
      why: '조건부 서식은 숫자를 계속 지켜봐. 5보다 크면 색이 빠져.',
    },
  },
  {
    id: 10, unit: 3, title: '고객별 합계', time: 15,
    goal: '한 고객의 주문만 골라 더할 수 있다.',
    steps: [
      {
        title: '조건 맞는 것만 더하기',
        body: `<p>"이번 달 Moda Sur가 몇 미터 가져갔지?" 이걸 한 줄로. Pedidos 시트 빈칸에:</p>
<p><code>={{SUMIF}}(B:B{{sep}}"Moda Sur"{{sep}}D:D)</code></p>`,
        sheet: {
          rows: [
            ['Fecha', 'Cliente', 'Tela', 'Metros'],
            ['2026-10-01', 'Moda Sur', 'Algodón', 150],
            ['2026-10-03', 'Textil Norte', 'Lino', 60],
            ['2026-10-05', 'Moda Sur', 'Rayón', 90],
          ], hl: ['D2', 'D4'], ref: ['B2', 'B4'], bold: 1,
        },
      },
      {
        title: '말로 읽으면',
        body: `<p>"<b>B열</b>에서 <b>Moda Sur</b>를 찾아서, 그 줄의 <b>D열</b>만 더해."</p>
<table class="mini"><tr><td>① <b>B:B</b></td><td>어디서 찾을까 (고객 열 전체)</td></tr><tr><td>② <b>"Moda Sur"</b></td><td>뭘 찾을까</td></tr><tr><td>③ <b>D:D</b></td><td>뭘 더할까 (미터 열)</td></tr></table>`,
        tip: 'B:B 는 "B열 전체". 주문이 늘어나도 수식을 안 고쳐도 돼.',
      },
    ],
    practice: [
      'Pedidos 시트 빈칸에 Moda Sur 합계를 낸다',
      '"Moda Sur"를 다른 고객 이름으로 바꿔 본다',
    ],
    quiz: {
      q: '합계가 이상하게 작아. 제일 의심스러운 건?',
      options: ['엑셀이 낡았다', '어떤 줄에 고객 이름이 다르게(띄어쓰기·오타) 적혀 있다', '컴퓨터가 느리다', '숫자가 크다'],
      answer: 1,
      why: '"Moda Sur"와 "ModaSur"는 엑셀한테 다른 사람이야.',
    },
  },
  {
    id: '10b', unit: 3, title: '몇 건인지 세기', time: 10,
    goal: '조건에 맞는 주문이 몇 건인지 셀 수 있다.',
    steps: [
      {
        title: '세는 함수',
        body: `<p>아직 안 끝난 주문이 몇 건일까?</p>
<p><code>={{COUNTIF}}(E:E{{sep}}"Pendiente")</code></p>
<p>"E열에서 <b>Pendiente</b>가 몇 번 나오나 세어 줘."</p>
<p>선택 목록으로 상태를 늘 똑같이 넣어 둔 덕을 여기서 봐.</p>`,
      },
      {
        title: '더하기랑 세기',
        body: `<table class="mini">
<tr><td>[[SUMIF]]</td><td>맞는 줄의 숫자를 <b>더해</b> → 몇 미터?</td></tr>
<tr><td>[[COUNTIF]]</td><td>맞는 줄이 몇 개인지 <b>세</b> → 몇 건?</td></tr>
</table>`,
      },
    ],
    practice: [
      'Pendiente 주문 수를 센다',
      'Entregado 주문 수도 센다',
    ],
    quiz: {
      q: 'Moda Sur 주문이 <b>몇 건</b>인지 알고 싶어. 어떤 함수?',
      options: ['{{SUM}}', '{{SUMIF}}', '{{COUNTIF}}', '{{MAX}}'],
      answer: 2,
      why: '"몇 건" = 세기. ={{COUNTIF}}(B:B{{sep}}"Moda Sur")',
    },
  },

  /* ───────── 4부: 가격 ───────── */
  {
    id: 11, unit: 4, title: '원가에 마진 붙이기', time: 15,
    goal: '원가와 마진율로 판매가를 계산할 수 있다.',
    steps: [
      {
        title: '가격표',
        body: `<p>연습 자료의 <b>Precios</b>(가격) 탭. 미터당 원가(<b>Costo x m</b>)와 마진율(<b>Margen</b>)이 있어.</p>
<p>마진율은 <b>30%</b>처럼 % 까지 쳐서 넣으면 돼. (Shift+5 = %)</p>`,
        sheet: {
          rows: [['Tela', 'Costo x m', 'Margen', 'Precio venta'], ['Algodón', 2800, '30%', ''], ['Lino', 5200, '35%', '']],
          bold: 1,
        },
      },
      {
        title: '마진 붙이기',
        body: `<p>D2에:</p>
<p><code>=B2*(1+C2)</code></p>
<p>원가 × 1.3. 원가에 30%를 더한 값이야. 괄호 안을 먼저 계산하는 건 학교 수학이랑 같아.</p>`,
        sheet: {
          rows: [['Tela', 'Costo x m', 'Margen', 'Precio venta'], ['Algodón', 2800, '30%', 3640], ['Lino', 5200, '35%', 7020]],
          hl: ['D2'], ref: ['B2', 'C2'], bold: 1, bar: { cell: 'D2', f: '=B2*(1+C2)' },
        },
      },
    ],
    practice: [
      'Precios 시트 D2에 =B2*(1+C2) 를 쓴다',
      '채우기 핸들로 끝까지',
      '마진율 하나를 바꿔서 가격이 따라 바뀌는지 본다',
    ],
    quiz: {
      q: '원가 1000, 마진 20%면 판매가는?',
      options: ['1020', '1200', '200', '800'],
      answer: 1,
      why: '1000 × (1 + 0.2) = 1200.',
    },
  },
  {
    id: '11b', unit: 4, title: 'IVA와 $ 고정', time: 15,
    goal: 'IVA 21%를 한 칸에 두고, 모든 가격에 붙일 수 있다.',
    steps: [
      {
        title: 'IVA는 한 칸에만',
        body: `<p>IVA 21%를 수식마다 써 넣으면, 세율이 바뀌는 날 다 고쳐야 해.</p>
<p>그래서 <b>H1 한 칸에만</b> 21%를 적어 두고, 다들 거기를 보게 하자. E2에:</p>
<p><code>=D2*(1+$H$1)</code></p>`,
        sheet: {
          cols: ['D', 'E', 'F', 'G', 'H'],
          rows: [['Precio venta', 'Con IVA', '', 'IVA', '21%'], [3640, 4404.4, '', '', ''], [7020, 8494.2, '', '', '']],
          hl: ['E2'], ref: ['H1'], bold: 1, bar: { cell: 'E2', f: '=D2*(1+$H$1)' },
        },
      },
      {
        title: '$ 는 "움직이지 마"',
        body: `<p>채우기 핸들로 끌어내리면 칸 이름도 따라 내려가지? D2→D3→D4. 보통은 그게 편해.</p>
<p>근데 IVA는 <b>늘 H1</b>이어야 해. 그래서 <b>$</b>를 붙여 붙잡아 두는 거야.</p>
<p>수식에서 H1을 쓴 바로 다음 [[k_f4]]를 한 번 누르면 $H$1로 바뀌어.</p>`,
        tip: '$ 는 돈 표시가 아니야. "고정" 표시.',
      },
    ],
    practice: [
      'G1에 IVA, H1에 21%를 쓴다',
      'E2에 =D2*(1+$H$1) 를 쓴다 (H1 쓰고 F4)',
      '끝까지 채우고, H1을 바꿔서 전부 바뀌는지 본다',
    ],
    quiz: {
      q: '<code>$H$1</code>에서 $ 는 왜 붙일까?',
      options: ['돈이라는 표시', '수식을 끌어내려도 H1에서 안 움직이게', '달러로 바꾸려고', '굵게 하려고'],
      answer: 1,
      why: '$ 는 "고정". F4 한 번이면 붙어.',
    },
  },
  {
    id: 12, unit: 4, title: '견적서 만들어 보내기', time: 25,
    goal: '견적서를 PDF로 만들어 보낼 수 있다.',
    steps: [
      {
        title: '견적서 모양',
        body: `<p>연습 자료의 <b>Presupuesto</b>(견적서) 탭을 열어. 틀은 만들어 놨어. 품목, 미터, 단가만 채우면 돼.</p>`,
        sheet: {
          rows: [
            ['SolunaTex — Presupuesto', '', '', ''],
            ['Cliente', 'Moda Sur', 'Fecha', '2026-10-13'],
            ['Tela', 'Metros', 'Precio', 'Importe'],
            ['Algodón', 100, 3640, 364000],
            ['Lino', 40, 7020, 280800],
            ['', '', '', 0],
            ['', '', '', 0],
            ['', '', '', 0],
            ['', '', 'Subtotal', 644800],
            ['', '', 'IVA 21%', 135408],
            ['', '', 'Total', 780208],
          ], hl: ['D11'], bold: 3,
        },
      },
      {
        title: '계산은 이미 들어 있어',
        body: `<p>Importe(금액), Subtotal(소계), IVA, Total(합계)에는 수식을 미리 넣어 뒀어. 칸을 딸깍해서 위쪽 긴 칸을 보면 수식이 보여.</p>
<ul>
<li>Importe: <code>=B4*C4</code></li>
<li>Subtotal: <code>={{SUM}}(D4:D8)</code></li>
<li>IVA: <code>=D9*0{{dec}}21</code></li>
<li>Total: <code>=D9+D10</code></li>
</ul>
<p>전부 배운 거야. 이제 읽을 수 있지?</p>`,
      },
      {
        title: 'PDF로 저장해서 보내기',
        body: `<ol>
<li>[[file]] → [[export]] → [[pdf]].</li>
<li>이름을 <b>Presupuesto Moda Sur</b>처럼 쓰고 저장.</li>
</ol>
<p>이 PDF를 왓츠앱이나 메일로 보내면 끝. PDF는 고객이 숫자를 실수로 고칠 일도 없어.</p>`,
        tip: '견적서 쓸 때마다 [[saveas]]로 새 이름 저장. 원래 틀은 깨끗하게 남겨 둬.',
      },
    ],
    practice: [
      'Presupuesto 시트에 고객 이름과 원단 두 줄을 채운다',
      'Total이 저절로 계산되는지 본다',
      'PDF로 내보내서 열어 본다',
    ],
    quiz: {
      q: '견적서를 고객한테 보낼 때 제일 좋은 건?',
      options: ['엑셀 파일 그대로', 'PDF로 내보내서', '화면을 휴대폰으로 찍어서', '팩스'],
      answer: 1,
      why: 'PDF는 어떤 휴대폰에서도 똑같이 보이고, 고칠 수도 없어.',
    },
  },

  /* ───────── 5부: 매출 ───────── */
  {
    id: 13, unit: 5, title: '월별 매출과 차트', time: 20,
    goal: '월별 매출·지출·이익을 정리하고 차트로 볼 수 있다.',
    steps: [
      {
        title: '월별 장부',
        body: `<p>연습 자료의 <b>Ventas</b>(매출) 탭. <b>Ventas</b> 매출 · <b>Gastos</b> 지출 · <b>Ganancia</b> 이익.</p>
<p>D2에 <code>=B2-C2</code> 쓰고 채우기 핸들로 두 번 딸깍.</p>`,
        sheet: {
          rows: [
            ['Mes', 'Ventas', 'Gastos', 'Ganancia'],
            ['Julio', 8200000, 6100000, 2100000],
            ['Agosto', 9100000, 6500000, 2600000],
            ['Septiembre', 7600000, 6300000, 1300000],
          ], hl: ['D2'], bold: 1, bar: { cell: 'D2', f: '=B2-C2' },
        },
      },
      {
        title: '차트 한 방',
        body: `<ol>
<li>A1에서 누른 채로 C열 마지막 달까지 끌기.</li>
<li>[[insert]] → [[charts]] → [[colChart]] → 확인.</li>
<li>차트 제목을 딸깍해서 <b>Ventas SolunaTex</b>로 바꿔.</li>
</ol>
<p>숫자 줄보다 막대 하나가 훨씬 빨리 말해 줘. 어느 달이 좋았고 어느 달이 힘들었는지.</p>`,
        chart: [['7월', 82, 61], ['8월', 91, 65], ['9월', 76, 63], ['10월', 98, 69]],
      },
    ],
    practice: [
      'Ventas 시트에 이익 수식을 넣는다',
      '세로 막대 차트를 넣는다',
      '차트 제목을 바꾼다',
    ],
    quiz: {
      q: '이익(Ganancia) 수식은? (B=매출, C=지출)',
      options: ['=B2+C2', '=C2-B2', '=B2-C2', '=B2*C2'],
      answer: 2,
      why: '번 돈에서 쓴 돈을 빼면 남는 돈.',
    },
  },
  {
    id: 14, unit: 5, title: '나만의 SolunaTex 장부', time: 20,
    goal: '배운 걸 매일 쓰는 습관으로 만든다.',
    steps: [
      {
        title: '이제 진짜 파일로',
        body: `<p>연습 자료로 다 해 봤지? 이제 그 파일을 [[saveas]]로 <b>SolunaTex 2026</b>이라는 이름으로 저장해.</p>
<p>연습용 원단·주문을 지우고 진짜 숫자를 넣으면, 그게 회사 장부야. 수식은 그대로 살아 있어.</p>`,
      },
      {
        title: '하루, 한 주, 한 달',
        body: `<table class="mini routine">
<tr><td><b>매일</b></td><td>새 주문 넣기, 상태 고르기</td></tr>
<tr><td><b>매주</b></td><td>Stock 빨간 칸 보고 원단 주문</td></tr>
<tr><td><b>필요할 때</b></td><td>견적서 → PDF 보내기</td></tr>
<tr><td><b>매달 말</b></td><td>Ventas에 한 줄, 차트 보기</td></tr>
</table>
<p>그리고 언제나 [[k_save]].</p>`,
      },
      {
        title: '친구, 수고했어',
        body: `<p>처음에 마우스 딸깍부터 했던 거 기억나? 이제 재고 경고, 고객별 합계, 견적서 PDF, 매출 차트까지 직접 해.</p>
<p>까먹으면 <b>사전</b> 탭을 열거나, 그 강의로 다시 가 봐. 다시 보는 건 부끄러운 게 아니라 제대로 하는 거야.</p>`,
      },
    ],
    practice: [
      '연습 자료를 "SolunaTex 2026"으로 저장한다',
      '진짜 원단 하나, 진짜 주문 하나를 넣어 본다',
    ],
    quiz: {
      q: '작업하다가 제일 자주 눌러야 하는 건?',
      options: ['[[k_save]] (저장)', '[[k_esc]]', '[[k_f4]]', '전원 버튼'],
      answer: 0,
      why: '저장은 아무리 자주 해도 손해가 없어.',
    },
  },
];
