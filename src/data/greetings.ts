export interface Wish {
  id: number;
  text: string;
}

// 6 карт пожеланий — из context/wishes.txt
export const wishes: Wish[] = [
  { id: 1, text: 'Здоровье ментальное и физическое' },
  { id: 2, text: 'Счастья' },
  { id: 3, text: 'Деняг' },
  { id: 4, text: 'Постоянного исполнения хотелок' },
  { id: 5, text: 'Душевного и искреннего позитивного окружения' },
  { id: 6, text: 'Ну и чо там еще.. Крутых моментов побольше' },
];

// === Блок «Подарочки»: один подарок, открывается в пиксельный Steam ===
export const steamGift = {
  text: "С Озон как знаешь проебались, но уже летит :'')",
};

// === Мини-игра-сюрприз (до нажатия «ИГРАТЬ» непонятно, про что она) ===
export interface SurpriseGameConfig {
  id: string;
  introTitle: string;
  introDescription: string;
  introEmoji: string;
  duration: number; // seconds
  winMessage: string;
  exImage: string; // бывший (крот в игре + фото под winMessage)
  goodText: string; // подпись под картинкой Кайна
  goodImage: string; // Кайн — статичная картинка в финале
}

export const surpriseGame: SurpriseGameConfig = {
  id: 'secret-game',
  introTitle: 'СЕКРЕТНАЯ МИНИ-ИГРА',
  introDescription: 'Что внутри — сюрприз. Нажми играть и узнаешь.',
  introEmoji: '🎁',
  duration: 30,
  winMessage: 'Желаю никогда не встречать таких типов! 💅',
  exImage: 'mini-game/ex.webp',
  goodText: 'А вот таких бы побольше)',
  goodImage: 'mini-game/kain.webp',
};

// === Личное длинное поздравление — из context/wishes.txt ===
export interface PersonalMessage {
  id: string;
  title: string;
  content: string;
  signature: string;
}

export const personalMessage: PersonalMessage = {
  id: 'personal',
  title: 'ОТ МЕНЯ ЛИЧНО',
  content: `С еще одним прожитым годом Фуга-чан~ Ладно не буду тут эту аниме фигню сильно стебать, просто от всей души поздравляю тебя с днем рождения. Пожелание там уже были в виде кринж карточек, так что тут лишь скажу что мне было безумно приятно проводить с тобой этот год. Желаю тебе в будущем достигнуть абсолютно всех целей в жизни, всегда иметь возможность комфортно делать то что нравится, минимум стресса и вообще я мент, как тебе туса. Вообщем спасибо за этот проведенный год, было очень весело запечатлить тебя в своей памяти. Надеюсь и следюущий год будет таким же приятным, ярким и наполненным ярких воспоминаний... Но что это мы о нас да о нас, сегодня же твой день! Ну короче как сказал великий - Не напрягайся и открывай подарочек чо.`,
  signature: '— Клей выпей баночку соплей',
};
