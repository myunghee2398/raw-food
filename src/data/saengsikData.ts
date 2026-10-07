export interface Ingredient {
  id: number;
  name: string;
  category: 'grain' | 'vegetable' | 'special';
  categoryLabel: string;
  origin: string;
  character: string;
}

export const INGREDIENTS_50: Ingredient[] = [
  // 1. 국내산 통곡물류 (15종)
  { id: 1, name: '현미', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '고소한 풍미와 풍부한 식이섬유' },
  { id: 2, name: '발아현미', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '부드러운 식감과 알찬 곡물 영양' },
  { id: 3, name: '찰흑미', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '자연 안토시아닌과 은은한 단맛' },
  { id: 4, name: '통보리', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '구수한 맛과 담백한 포만감' },
  { id: 5, name: '율무', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '속을 편안하게 채워주는 맑은 곡물' },
  { id: 6, name: '수수', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '옛 선조들의 지혜가 담긴 전통 잡곡' },
  { id: 7, name: '차조', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '작지만 알찬 영양의 노란 곡식' },
  { id: 8, name: '백태(대두)', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '자연 식물성 단백질의 든든한 원천' },
  { id: 9, name: '서리태(검은콩)', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '진하고 고소한 블랙푸드의 정수' },
  { id: 10, name: '쥐눈이콩(약콩)', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '작고 단단한 국내산 토종 콩' },
  { id: 11, name: '녹두', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '산뜻하고 깨끗한 맛' },
  { id: 12, name: '팥', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '자연의 붉은 빛과 담백한 맛' },
  { id: 13, name: '기장', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '부드러운 소화감을 돕는 잡곡' },
  { id: 14, name: '메밀', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '시원하고 그윽한 전통 곡물 향' },
  { id: 15, name: '귀리(오트밀)', category: 'grain', categoryLabel: '국내산 통곡물', origin: '국내산 100%', character: '식이섬유가 가득한 대표 통곡물' },

  // 2. 국내산 신선 채소류 (20종)
  { id: 16, name: '케일', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '푸른 생명력의 대표 녹색 잎채소' },
  { id: 17, name: '신선초', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '신선하고 향긋한 자연의 향' },
  { id: 18, name: '시금치', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '비타민과 엽록소가 풍부한 잎채소' },
  { id: 19, name: '양배추', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '편안한 속을 지켜주는 순한 채소' },
  { id: 20, name: '브로콜리', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '신선하고 아삭한 초록 채소' },
  { id: 21, name: '당근', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '자연의 은은한 단맛과 베타카로틴' },
  { id: 22, name: '비트', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '붉은 생기를 머금은 뿌리채소' },
  { id: 23, name: '우엉', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '깊은 흙내음과 풍부한 이눌린' },
  { id: 24, name: '연근', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '맑은 연못의 영양을 품은 뿌리채소' },
  { id: 25, name: '단호박', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '달콤하고 부드러운 천연 풍미' },
  { id: 26, name: '무', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '시원하고 깔끔한 소화 친화 채소' },
  { id: 27, name: '토마토', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '상큼한 붉은 라이코펜 열매 채소' },
  { id: 28, name: '파프리카', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '알록달록 풍부한 비타민의 보고' },
  { id: 29, name: '미나리', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '청량하고 산뜻한 향의 대표 채소' },
  { id: 30, name: '취나물', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '우리 산야에서 자란 향긋한 산나물' },
  { id: 31, name: '쑥', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '따뜻한 봄기운을 품은 전통 약초 채소' },
  { id: 32, name: '더덕', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '진한 산의 정기를 담은 뿌리채소' },
  { id: 33, name: '생강', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '은은하게 몸을 덥혀주는 알싸한 풍미' },
  { id: 34, name: '마(산약)', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '부드럽고 든든하게 속을 감싸주는 뿌리' },
  { id: 35, name: '뽕잎', category: 'vegetable', categoryLabel: '국내산 채소', origin: '국내산 100%', character: '다양한 미네랄이 응축된 푸른 잎' },

  // 3. 국내산 과일·버섯·새싹류 (15종)
  { id: 36, name: '사과', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '자연의 상큼하고 달콤한 맛' },
  { id: 37, name: '배', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '시원하고 깔끔한 천연 과즙 풍미' },
  { id: 38, name: '유자', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '남해안 햇살을 머금은 싱그러운 향' },
  { id: 39, name: '감', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '자연의 온화한 단맛과 탄닌 성분' },
  { id: 40, name: '표고버섯', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '깊은 감칠맛의 대표 식용 버섯' },
  { id: 41, name: '영지버섯', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '자연 원목에서 자란 귀한 버섯' },
  { id: 42, name: '차가버섯', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '자작나무의 기운을 담은 버섯' },
  { id: 43, name: '다시마', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '청정 남해 바다의 풍부한 알긴산' },
  { id: 44, name: '미역', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '바다의 미네랄과 식이섬유의 조화' },
  { id: 45, name: '김', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '은은한 감칠맛과 필수 미량 영양소' },
  { id: 46, name: '스피루리나', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '클로로필과 단백질이 풍부한 미세조류' },
  { id: 47, name: '클로렐라', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '초록빛 자연 엽록소의 보고' },
  { id: 48, name: '연잎', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '맑고 그윽한 자연의 향기' },
  { id: 49, name: '솔잎', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '솔향 가득 청정한 숲의 기운' },
  { id: 50, name: '보리새싹', category: 'special', categoryLabel: '과일·버섯·새싹', origin: '국내산 100%', character: '봄철 어린 새싹의 파릇한 생명력' },
];

export interface TargetAudience {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  iconName: string;
}

export const TARGET_AUDIENCES: TargetAudience[] = [
  {
    id: 1,
    title: '아침 식사를 자주 거르시는 분',
    subtitle: '출근 전·등교 전 바쁜 아침 30초',
    description: '빈속으로 하루를 시작하면 쉽게 지치기 마련입니다. 텀블러에 생식 1포를 넣고 흔들어 가볍게 마시면 속 든든하게 하루를 시작할 수 있습니다.',
    tag: '간편한 아침 시작',
    iconName: 'SunMedium',
  },
  {
    id: 2,
    title: '매번 끼니 챙기기 번거로우신 분',
    subtitle: '요리·설거지 걱정 없는 깨끗한 한 끼',
    description: '1인 가구, 맞벌이 가정, 수험생 등 매 끼니마다 장보고 요리하기 번거로울 때 50가지 국내산 원물의 균형 잡힌 영양을 간편하게 섭취하세요.',
    tag: '준비와 정리 30초',
    iconName: 'Clock',
  },
  {
    id: 3,
    title: '속 편하고 가벼운 식사를 원하시는 분',
    subtitle: '더부룩함 없이 담백하고 깔끔한 포만감',
    description: '기름진 음식이나 인스턴트 대신, 순수 100% 자연 통곡물과 채소를 동결건조해 담아 식사 후에도 더부룩함 없이 속이 가볍고 편안합니다.',
    tag: '편안하고 담백함',
    iconName: 'Sparkles',
  },
];

export interface HowToEatStep {
  step: number;
  title: string;
  description: string;
  highlight: string;
}

export const HOW_TO_EAT_STEPS: HowToEatStep[] = [
  {
    step: 1,
    title: '물이나 우유 200ml 준비',
    description: '보틀이나 컵에 물, 우유, 두유 중 기호에 맞게 약 200ml를 먼저 붓습니다.',
    highlight: '음료를 먼저 넣으면 가루가 뭉치지 않고 잘 섞여요!',
  },
  {
    step: 2,
    title: '하루생식 1포(30g) 넣기',
    description: '개별 스틱 포장된 하루생식 1포를 뜯어 보틀에 가볍게 털어 넣습니다.',
    highlight: '1회분씩 위생적으로 밀봉되어 휴대가 간편해요.',
  },
  {
    step: 3,
    title: '10초간 흔들어 고소하게 마시기',
    description: '뚜껑을 닫고 위아래로 가볍게 10초 흔든 뒤, 천천히 씹듯이 음미하며 드세요.',
    highlight: '물은 깔끔 담백한 맛, 우유·두유는 더욱 고소하고 든든해요!',
  },
];

export interface ProductOption {
  id: string;
  name: string;
  countText: string;
  regularPrice: number;
  salePrice: number;
  discountRate: number;
  badge?: string;
  bonusText?: string;
  isPopular?: boolean;
}

export const PRODUCT_OPTIONS: ProductOption[] = [
  {
    id: 'box-1',
    name: '하루생식 1박스 (30포 / 1개월분)',
    countText: '30g × 30포',
    regularPrice: 55000,
    salePrice: 48000,
    discountRate: 12,
    bonusText: '입문용 추천 (배송비 3,000원)',
    isPopular: false,
  },
  {
    id: 'box-2',
    name: '하루생식 2박스 (60포 / 2개월분)',
    countText: '30g × 60포',
    regularPrice: 110000,
    salePrice: 89000,
    discountRate: 19,
    badge: '가장 많이 찾는 실속구성',
    bonusText: '무료배송 + 친환경 에코 쉐이커 보틀(500ml) 무료 증정',
    isPopular: true,
  },
  {
    id: 'box-3',
    name: '하루생식 3박스 온가족 세트 (90포 / 3개월분)',
    countText: '30g × 90포',
    regularPrice: 165000,
    salePrice: 128000,
    discountRate: 22,
    badge: '최대 혜택 세트',
    bonusText: '무료배송 + 친환경 에코 쉐이커 보틀 2개 무료 증정',
    isPopular: false,
  },
];

export const FAQS = [
  {
    question: '생식과 선식은 무엇이 다른가요?',
    answer: '선식(禪食)은 곡물을 볶거나 열을 가해 빻은 가공식품인 반면, 생식(生食)은 원재료에 열을 가하지 않고 영하 35℃ 이하에서 급속 동결건조하여 분말화한 식품입니다. 원물 본연의 영양소와 효소 손실을 최소화하여 자연 그대로의 담백한 맛과 영양을 섭취할 수 있습니다.',
  },
  {
    question: '원재료는 정말 전부 국내산인가요?',
    answer: '네, 100% 대한민국 산지에서 재배된 통곡물 15종, 밭 채소 20종, 과일 및 해조류 15종 등 총 50가지 원료만을 엄선하여 사용합니다. 수입산이나 합성 착색료, 합성 보존료는 일절 첨가하지 않았습니다.',
  },
  {
    question: '어떻게 보관해야 하나요?',
    answer: '방부제가 들어가지 않은 순수 자연 분말 식품이므로, 직사광선과 고온다습한 곳을 피해 서늘하고 건조한 실온에 보관해 주세요. 개별 스틱 포장으로 뜯지 않은 상태에서는 유통기한(제조일로부터 12개월) 동안 안심하고 드실 수 있습니다.',
  },
  {
    question: '뜨거운 물에 타서 마셔도 되나요?',
    answer: '열을 가하지 않은 동결건조 생식의 특성상, 40℃ 이상의 뜨거운 물에 타면 열에 약한 영양소가 변성되거나 가루가 엉길 수 있습니다. 미온수, 시원한 물, 차가운 우유나 두유에 타서 드시는 것을 권장합니다.',
  },
  {
    question: '일반 식품인가요?',
    answer: '네, 본 제품은 식품위생법상 일반식품(생식가공품)에 해당합니다. 질병의 예방 및 치료를 위한 의약품이나 건강기능식품이 아니며, 바쁜 현대인을 위한 건강하고 간편한 식사대용 자연 식품입니다.',
  },
];
