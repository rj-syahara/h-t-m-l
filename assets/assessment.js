'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
* 指定した要素の子どもを全て除去する
* @param {HTMLElement} element HTMLの要素
*/
function removeAllChildren(element) {
    while (element.firstChild) { // 子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) { // 名前が空の時は処理を終了する
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=My%E3%83%A9%E3%83%83%E3%82%AD%E3%83%BCHTML%E3%82%BF%E3%82%B0&text='
        + encodeURIComponent(result);
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.innerText = 'Tweet #My%E3%83%A9%E3%83%83%E3%82%AD%E3%83%BCHTML%E3%82%BF%E3%82%B0';
    tweetDivided.appendChild(anchor);

    twttr.widgets.load();
};

userNameInput.onkeydown = (event) => {
    if (event.keyCode === 13) {
        assessmentButton.onclick();
    }
};

const answers = [
    '{userName}さんのHAPPYタグは、　!DOCTYPE宣言　です。あなたがいるから全てが始まる、唯一無二の存在。積極的に前に出ていきましょう。',
    '{userName}さんのHAPPYタグは、　a　要素です。何かと何かを自在に繋ぐキーパーソン。視野を広く保ち、新しいことにチャレンジしてみてはいかがですか？',
    '{userName}さんのHAPPYタグは、　ul　順序なしリスト要素です。わかりやすく、普通がいちばん。協力して穏やかな1日にしましょう。',
    '{userName}さんのHAPPYタグは、　table　テーブル要素です。タテヨコ斜めの繋がりを大事に、一丸となって初めてチカラを発揮します。',
    '{userName}さんのHAPPYタグは、　video　ビデオ要素です。最新の技術を駆使した人気者。エネルギーの使い過ぎに注意。'
];
/**
* 名前の文字列を渡すと診断結果を返す関数
* @param {string} userName ユーザーの名前
* @return {string} 診断結果
*/
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfcharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
    }

    // 生年月日のYYYYMMDDを数字として取得する

    // 今日の日付のYYYYMMDDを数字として取得する

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfcharCode % answers.length;
    let result = answers[index];

    result = result.replace(/{userName}/g, userName);
    return result;
}

// テストコード
console.assert(
    assessment('太郎') === '太郎さんのHAPPYタグは、　a　要素です。何かと何かを自在に繋ぐキーパーソン。視野を広く保ち、新しいことにチャレンジしてみてはいかがですか？',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);