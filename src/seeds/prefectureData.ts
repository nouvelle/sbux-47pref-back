import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Pref } from '../entities/pref.entity';

const DATA = [
  { "id": 1, "name": "hokkaido", "nameJP": "北海道", "lat": 42.9970649, "lng": 141.5343337, "zoom": 7, "clusterZoom": 10, "drink": "北海道 とうきび クリーミー フラペチーノ"},
  { "id": 2, "name": "aomori", "nameJP": "青森", "lat": 40.8970649, "lng": 141.0343337, "zoom": 8.5, "clusterZoom": 9, "drink": "青森 じゃわめく りんご ストロベリー フラペチーノ"},
  { "id": 3, "name": "iwate", "nameJP": "岩手", "lat": 39.2970649, "lng": 141.1543337, "zoom": 8.6, "clusterZoom": 9, "drink": "岩手 めんこい 抹茶 ＆ ゴマ フラペチーノ"},
  { "id": 4, "name": "miyagi", "nameJP": "宮城", "lat": 38.3570649, "lng": 140.8543337, "zoom": 9, "clusterZoom": 10, "drink": "宮城 だっちゃ ずんだ抹茶 フラペチーノ"},
  { "id": 5, "name": "akita", "nameJP": "秋田", "lat": 39.5570649, "lng": 140.3543337, "zoom": 8, "clusterZoom": 9, "drink": "秋田 あまじょっぺ 塩キャラメル フラペチーノ"},
  { "id": 6, "name": "yamagata", "nameJP": "山形", "lat": 38.3570649, "lng": 140.1543337, "zoom": 8.3, "clusterZoom": 9, "drink": "山形 好きだず ラ・フランス フラペチーノ"},
  { "id": 7, "name": "fukushima", "nameJP": "福島", "lat": 37.3570649, "lng": 140.7543337, "zoom": 8.3, "clusterZoom": 9, "drink": "福島 いろどり フルーツ だっぱい フラペチーノ"},
  { "id": 8, "name": "ibaraki", "nameJP": "茨城", "lat": 36.1570649, "lng": 140.2543337, "zoom": 8.8, "clusterZoom": 10, "drink": "茨城 メロン いがっぺ クリーミー フラペチーノ"},
  { "id": 9, "name": "tochigi", "nameJP": "栃木", "lat": 36.60570649, "lng": 139.8543337, "zoom": 8.8, "clusterZoom": 10, "drink": "栃木 らいさま パチパチ チョコレート フラペチーノ"},
  { "id": 10, "name": "gunma", "nameJP": "群馬", "lat": 36.40570649, "lng": 139.1543337, "zoom": 8.8, "clusterZoom": 10, "drink": "群馬 だんべぇ ヨーグルト マンゴー フラペチーノ"},
  { "id": 11, "name": "saitama", "nameJP": "埼玉", "lat": 36.00570649, "lng": 139.5543337, "zoom": 9.2, "clusterZoom": 11, "drink": "埼玉 多彩玉 ストロベリー ＆ シトラス フラペチーノ"},
  { "id": 12, "name": "chiba", "nameJP": "千葉", "lat": 35.70570649, "lng": 140.2543337, "zoom": 8.8, "clusterZoom": 11, "drink": "千葉 なごみ みたらし コーヒー クリーム フラペチーノ"},
  { "id": 13, "name": "tokyo", "nameJP": "東京", "lat": 35.67570649, "lng": 139.6043337, "zoom": 10, "clusterZoom": 14, "drink": "東京 オリジン コーヒー ジェリー キャラメル フラペチーノ"},
  { "id": 14, "name": "kanagawa", "nameJP": "神奈川", "lat": 35.467570649, "lng": 139.4043337, "zoom": 9.8, "clusterZoom": 14, "drink": "神奈川 サマー ブルー クリーム フラペチーノ"},
  { "id": 15, "name": "niigata", "nameJP": "新潟", "lat": 37.567570649, "lng": 138.9043337, "zoom": 8.5, "clusterZoom": 10, "drink": "新潟 ばっかいい 柿の種 チョコレート フラペチーノ"},
  { "id": 16, "name": "toyama", "nameJP": "富山", "lat": 36.767570649, "lng": 137.0043337, "zoom": 8.8, "clusterZoom": 10, "drink": "富山 まるで スイカっちゃ フラペチーノ"},
  { "id": 17, "name": "ishikawa", "nameJP": "石川", "lat": 36.567570649, "lng": 136.5043337, "zoom": 9, "clusterZoom": 10, "drink": "石川 いいじ 棒ほうじ茶 フラペチーノ"},
  { "id": 18, "name": "fukui", "nameJP": "福井", "lat": 35.967570649, "lng": 136.4043337, "zoom": 9.5, "clusterZoom": 10, "drink": "福井 ほやほや 米ポン 抹茶 フラペチーノ"},
  { "id": 19, "name": "yamanashi", "nameJP": "山梨", "lat": 35.667570649, "lng": 138.8043337, "zoom": 9.3, "clusterZoom": 9, "drink": "山梨 ててっ!! ぶどう ホワイト チョコレート クリーム フラペチーノ"},
  { "id": 20, "name": "nagano", "nameJP": "長野", "lat": 36.367570649, "lng": 137.9043337, "zoom": 8, "clusterZoom": 9, "drink": "長野 まろやか りんごバター キャラメル フラペチーノ"},
  { "id": 21, "name": "gifu", "nameJP": "岐阜", "lat": 35.767570649, "lng": 136.7043337, "zoom": 8.5, "clusterZoom": 9, "drink": "岐阜 やおね 抹茶 コーヒージェリー フラペチーノ"},
  { "id": 22, "name": "shizuoka", "nameJP": "静岡", "lat": 35.007570649, "lng": 138.8043337, "zoom": 8.8, "clusterZoom": 10, "drink": "静岡 みかんシトラス だらーけ フラペチーノ"},
  { "id": 23, "name": "aichi", "nameJP": "愛知", "lat": 35.057570649, "lng": 137.0043337, "zoom": 9.2, "clusterZoom": 13, "drink": "愛知 でらうみゃ あんこコーヒー フラペチーノ"},
  { "id": 24, "name": "mie", "nameJP": "三重", "lat": 34.750570649, "lng": 136.6043337, "zoom": 9, "clusterZoom": 10, "drink": "三重 伊勢茶 ＆ シトラスやに！ フラペチーノ"},
  { "id": 25, "name": "shiga", "nameJP": "滋賀", "lat": 35.250570649, "lng": 136.0043337, "zoom": 9, "clusterZoom": 10, "drink": "滋賀 びわブルー シトラス クリームフラペチーノ"},
  { "id": 26, "name": "kyoto", "nameJP": "京都", "lat": 35.007570649, "lng": 135.6043337, "zoom": 9.2, "clusterZoom": 13, "drink": "京都 はんなり 抹茶きなこ フラペチーノ"},
  { "id": 27, "name": "osaka", "nameJP": "大阪", "lat": 34.650570649, "lng": 135.5043337, "zoom": 9.5, "clusterZoom": 13, "drink": "大阪 めっちゃ くだもん クリーム フラペチーノ"},
  { "id": 28, "name": "hyogo", "nameJP": "兵庫", "lat": 34.750570649, "lng": 135.0043337, "zoom": 9.5, "clusterZoom": 12, "drink": "兵庫 大人の ばりチョコ はいっとう クリーミー フラペチーノ"},
  { "id": 29, "name": "nara", "nameJP": "奈良", "lat": 34.600570649, "lng": 135.8043337, "zoom": 10, "clusterZoom": 11, "drink": "奈良 ならでは ほうじ茶 ホワイトチョコレート フラペチーノ"},
  { "id": 30, "name": "wakayama", "nameJP": "和歌山", "lat": 34.250570649, "lng": 135.2043337, "zoom": 10.5, "clusterZoom": 11, "drink": "和歌山 つれもてのもら みかんシトラス フラペチーノ"},
  { "id": 31, "name": "tottori", "nameJP": "鳥取", "lat": 35.450570649, "lng": 133.8043337, "zoom": 9.5, "clusterZoom": 9, "drink": "鳥取 がいな キャラメル クリーミー フラペチーノ"},
  { "id": 32, "name": "shimane", "nameJP": "島根", "lat": 35.350570649, "lng": 132.9043337, "zoom": 10, "clusterZoom": 9, "drink": "島根 クリーミー 抹茶 コーヒー ご縁 フラペチーノ"},
  { "id": 33, "name": "okayama", "nameJP": "岡山", "lat": 34.750570649, "lng": 133.8543337, "zoom": 9.2, "clusterZoom": 10, "drink": "岡山 でーれー フルーツ サンシャイン フラペチーノ"},
  { "id": 34, "name": "hiroshima", "nameJP": "広島", "lat": 34.350570649, "lng": 132.6543337, "zoom": 9.5, "clusterZoom": 12, "drink": "広島 瀬戸内レモン & シトラスじゃけえ フラペチーノ"},
  { "id": 35, "name": "yamaguchi", "nameJP": "山口", "lat": 34.050570649, "lng": 131.3543337, "zoom": 9.5, "clusterZoom": 10, "drink": "山口 かさねちょる ごまっちゃ フラペチーノ"},
  { "id": 36, "name": "tokushima", "nameJP": "徳島", "lat": 34.050570649, "lng": 134.3543337, "zoom": 9.5, "clusterZoom": 10, "drink": "徳島 ジューシー すだち シトラスやっとさー フラペチーノ"},
  { "id": 37, "name": "kagawa", "nameJP": "香川", "lat": 34.250570649, "lng": 134.0043337, "zoom": 10, "clusterZoom": 11, "drink": "香川 和三盆 抹茶にしぃまい フラペチーノ"},
  { "id": 38, "name": "ehime", "nameJP": "愛媛", "lat": 33.850570649, "lng": 132.8043337, "zoom": 9.7, "clusterZoom": 11, "drink": "愛媛 すごいけん! キウイフルーツ フラペチーノ"},
  { "id": 39, "name": "kochi", "nameJP": "高知", "lat": 33.550570649, "lng": 133.5043337, "zoom": 9, "clusterZoom": 10, "drink": "高知 ジンジャーシトラスやき フラペチーノ"},
  { "id": 40, "name": "fukuoka", "nameJP": "福岡", "lat": 33.450570649, "lng": 130.4043337, "zoom": 8.7, "clusterZoom": 14, "drink": "福岡 八女茶やけん フラペチーノ"},
  { "id": 41, "name": "saga", "nameJP": "佐賀", "lat": 33.350570649, "lng": 130.0043337, "zoom": 9.5, "clusterZoom": 10, "drink": "佐賀 ちかっと カリカリシュガー ＆ チョコレート フラペチーノ"},
  { "id": 42, "name": "nagasaki", "nameJP": "長崎", "lat": 33.000570649, "lng": 129.8043337, "zoom": 9.3, "clusterZoom": 11, "drink": "長崎 カステラコーヒーやん！ クリーム フラペチーノ"},
  { "id": 43, "name": "kumamoto", "nameJP": "熊本", "lat": 32.700570649, "lng": 130.7043337, "zoom": 9.5, "clusterZoom": 12, "drink": "熊本 ザクザクビスケットばい ＆ チョコレート フラペチーノ"},
  { "id": 44, "name": "oita", "nameJP": "大分", "lat": 33.250570649, "lng": 131.5043337, "zoom": 9.5, "clusterZoom": 10, "drink": "大分 ワクワク かぼす シトラスっちゃ フラペチーノ"},
  { "id": 45, "name": "miyazaki", "nameJP": "宮崎", "lat": 32.250570649, "lng": 131.4543337, "zoom": 8.8, "clusterZoom": 10, "drink": "宮崎 てげキラッキラ 日向夏 フラペチーノ"},
  { "id": 46, "name": "kagoshima", "nameJP": "鹿児島", "lat": 31.650570649, "lng": 130.4543337, "zoom": 9, "clusterZoom": 10, "drink": "鹿児島 ちゃいっぺ 黒蜜クリーム フラペチーノ"},
  { "id": 47, "name": "okinawa", "nameJP": "沖縄", "lat": 25.650570649, "lng": 125.6543337, "zoom": 7.5, "clusterZoom": 11, "drink": "沖縄 かりー ちんすこう バニラ キャラメル フラペチーノ"}
];

export default class CreatePref implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Pref)
      .values(DATA)
      .execute();
  }
}
