# HashtagTweetToDiscord
This is a script for GAS that forwards the specified user's hashtag tweets to Discord.

日本語解説記事はワイのブログ残照
https://kanoe.studio/archives/1460


## お知らせ
2021.10.20 に改良し、以前より簡単に設定できるようになりました。

## 使い方
function getMyHashTweets()関数の下に新しく以下のような関数を作成します。<br>
雛形として @PlayApexを対象とした、apexOfficial() 関数を記載しています。
```
function apexOfficial(){
	const webhook = "WEBHOOK_URL";
	
	//getMyHashTweets("アカウント名", "絞りたいワード", 最大件数, webhook );
	getMyHashTweets("PlayApex", "", 10, webhook );
}
```
絞りたいワードにハッシュタグを含める場合は、#の代わりに%23をつけてください。<br>
例: #Apex の場合は %23Apex 

出来上がった関数をトリガーに設定します。

## 事前準備
このスクリプトはTwitterのコールバックURLやbearerトークンが必要になります。
Twitter Developper でAPIの利用申請を行なって設定してください。
認証関連につきましては、こちらの記事を参考にしました。
[https://qiita.com/akkey2475/items/ad190a507b4a7b7dc17c](https://qiita.com/akkey2475/items/ad190a507b4a7b7dc17c)

## Q&A
### RTを除く方法はありますか？
Wikiに方法を記載しました。-> [RTを除外する方法 - Wiki](https://github.com/KanoeGitHub/HashtagTweetToDiscord/wiki/RT%E3%82%92%E9%99%A4%E5%A4%96%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95)



