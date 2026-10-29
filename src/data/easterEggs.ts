export interface EasterEgg {
  id: string;
  name: string;
  description: string;
  hint: string;
  unlocked: boolean;
  reward?: string;
}

export const easterEggs: EasterEgg[] = [
  {
    id: 'konami',
    name: 'Konami Code',
    description: 'Классический чит-код: ↑↑↓↓←→←→BA',
    hint: 'Попробуй ввести на клавиатуре...',
    unlocked: false,
    reward: 'Секретное письмо от создателя',
  },
  {
    id: 'title_clicker',
    name: 'Creative Mode',
    description: 'Кликни по заголовку 50 раз',
    hint: 'Заголовок секции музыки...',
    unlocked: false,
    reward: 'Режим "Творческий" — убрать CRT, включить чистые цвета',
  },
  {
    id: 'footer_gamepad',
    name: 'Hidden Gallery',
    description: 'Найди геймпад в футере',
    hint: 'Внизу страницы, справа...',
    unlocked: false,
    reward: 'Скрытая галерея пиксель-арта',
  },
  {
    id: 'dev_console',
    name: 'Dev Console',
    description: 'Открой консоль разработчика (F12)',
    hint: 'F12 → Console → введи "help()"',
    unlocked: false,
    reward: 'Смешные логи + секретные команды',
  },
  {
    id: 'beat_the_ex',
    name: 'Прибила бывшего',
    description: 'Отлупи Кайна в мини-игре',
    hint: 'В разделе поздравлений...',
    unlocked: false,
    reward: 'Поздравление + переход к подарку',
  },
];

export interface SecretLetter {
  id: string;
  title: string;
  content: string;
  unlockedBy: string;
}

export const secretLetters: SecretLetter[] = [
  {
    id: 'konami_letter',
    title: 'ТЫ НАШЛА СЕКРЕТ! 🎮',
    content: `
Поздравляю! Ты ввела Konami Code.
Это старый чит-код из 80-х: ↑↑↓↓←→←→BA

Использовали его в Contra, Gradius, Castlevania...
И теперь — здесь. В твоём поздравлении.

---

С днём рождения, fuga!

Помнишь, как мы только начинали играть вместе?
Minecraft: первый грязный дом, первый алмаз, первый крипер.
Skyrim RP: Лидия, драконы, даэдрики, свадьбы.
DRG: Haz 2 → Haz 5, промошены, "Rock and Stone!", закопанные выходы.

За эти годы ты стала не просто напарницей по играм.
Ты — тот самый игрок, с которым хочется пройти любую игру.
Которая смеётся, когда всё идет не так.
Которая поддерживает, когда сложно.
Которая делает любой рейд — лучшим рейдом.

Спасибо за:
• 100+ часов в Deep Rock Galactic
• Бесконечные ночи в Minecraft
• Эпические квесты в Skyrim RP
• Тысячи мемов и внутренних шуток
• Твой смех в голосовом чате
• Твоё терпение, когда я лагаю
• Просто за то, что ты ЕСТЬ

---

Rock and Stone, подруга! ⛏️
Fus Ro Dah твоим проблемам! ⚔️
Пусть алмазы будут вечными! 💎

С любовью,
Твой напарник по всем играм и жизни

P.S. В консоли разработчика (F12) введи "konami()" для ещё одного сюрприза!
    `,
    unlockedBy: 'konami',
  },
  {
    id: 'dev_console_letter',
    title: 'DEV CONSOLE ACTIVATED 🖥️',
    content: `
ВАУ! Ты открыла консоль разработчика!
Редкий навык для геймера. Уважаю. 🫡

Доступные секретные команды:

> konami()        // Показать секретное письмо
> creative_mode()  // Включить Creative Mode
> spawn_diamond()  // Появится алмаз на экране
> spawn_gold()     // Золотой слиток!
> party_mode()     // 🎉 РЕЖИМ ТУСОВКИ 🎉
> credits()        // Титры создания этого сайта
> help()           // Показать эту помощь

---

Ах да, Achievement Unlocked:
🏆 "Dev Console Explorer" — Легендарное

Rock and Stone! ⛏️
    `,
    unlockedBy: 'dev_console',
  },
];

export const devConsoleCommands = [
  { cmd: 'konami()', desc: 'Показать секретное письмо Konami' },
  { cmd: 'creative_mode()', desc: 'Переключить Creative Mode (без CRT)' },
  { cmd: 'spawn_diamond()', desc: 'Спавнить алмаз на экране' },
  { cmd: 'spawn_gold()', desc: 'Спавнить золотой слиток' },
  { cmd: 'party_mode()', desc: 'Включить Party Mode 🎉' },
  { cmd: 'credits()', desc: 'Показать титры' },
  { cmd: 'help()', desc: 'Показать список команд' },
];
