export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
}

// Главная тема сайта — играет на повторе, пока плеер не активен
export const mainTheme: Track = {
  id: 'main-theme',
  title: "fuga's birthday theme",
  artist: 'главная тема сайта',
  src: '/audio/main-theme.mp3',
};

// Все треки одним списком, без категорий
export const playlist: Track[] = [
  { id: 'zhmurki', title: 'Жмурки', artist: '163ONMYNECK', src: '/audio/163onmyneck-zhmurki.mp3' },
  { id: 'zanovo', title: 'Заново', artist: 'dabbackwood', src: '/audio/dabbackwood-zanovo.mp3' },
  { id: 'ne-popalsya', title: 'не попался', artist: 'Dabbackwood', src: '/audio/dabbackwood-ne-popalsya.mp3' },
  { id: 'ksb-wife', title: 'А ты будешь моей женой', artist: 'KSB muzic', src: '/audio/ksb-a-ty-budesh-moey-zhenoy.mp3' },
  { id: 'ksb-konets', title: 'Конец', artist: 'KSB muzic', src: '/audio/ksb-konets.mp3' },
  { id: 'ksb-pudra', title: 'Сахарная пудра', artist: 'KSB muzic', src: '/audio/ksb-sakharnaya-pudra.mp3' },
  { id: 'chetyre-tridtsat', title: 'Четыре тридцать', artist: 'Violetta Sokolova', src: '/audio/violetta-sokolova-chetyre-tridtsat.mp3' },
  { id: 'rassvet', title: 'Рассвет', artist: 'Какая разница', src: '/audio/kakaya-raznitsa-rassvet.mp3' },
  { id: 'pirat-911', title: '911', artist: 'Серега Пират', src: '/audio/serega-pirat-911.mp3' },
  { id: 'pirat-apelsin', title: 'Апельсин', artist: 'Серега Пират', src: '/audio/serega-pirat-apelsin.mp3' },
  { id: 'pirat-trava', title: 'В этой траве', artist: 'Серега Пират', src: '/audio/serega-pirat-v-etoy-trave.mp3' },
  { id: 'pirat-mutanty', title: 'Мутанты из канализации', artist: 'Серега Пират', src: '/audio/serega-pirat-mutanty-iz-kanalizatsii.mp3' },
  { id: 'pirat-noga', title: 'Ну где моя нога', artist: 'Серега Пират', src: '/audio/serega-pirat-nu-gde-moya-noga.mp3' },
  { id: 'pirat-zombi', title: 'Зомби Апокалипсис', artist: 'Серега Пират feat. Qeqoqeq', src: '/audio/serega-pirat-zombi-apokalipsis.mp3' },
  { id: 'suzuki', title: 'Suzuki', artist: 'Элджей', src: '/audio/alljey-suzuki.mp3' },
];
